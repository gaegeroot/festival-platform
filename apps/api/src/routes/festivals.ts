import { Hono } from 'hono'
import {
  FestivalListResponseSchema,
  FestivalResponseSchema,
  FestivalSchema,
  FestivalSummarySchema,
} from '@festival/contracts'
import { db } from '../db/client.js'
import { artists, festivals, sets, stages } from '../db/schema.js'
import { eq } from 'drizzle-orm'

const festivalsRoute = new Hono()

festivalsRoute.get('/', async (c) => {
  const results = await db.select().from(festivals)

  const data = results.map((festival) =>
    FestivalSummarySchema.parse(festival),
  )

  const response = FestivalListResponseSchema.parse({
        data,
    })

    return c.json(response)
})

festivalsRoute.get('/:festivalId', async (c) => {
  const festivalId = c.req.param('festivalId')

  const festivalResults = await db
    .select()
    .from(festivals)
    .where(eq(festivals.id, festivalId))

  const festival = festivalResults[0]

  if (!festival) {
    return c.json(
      {
        error: {
          code: 'FESTIVAL_NOT_FOUND',
          message: 'Festival not found.',
        },
      },
      404,
    )
  }

  const stageResults = await db
    .select()
    .from(stages)
    .where(eq(stages.festivalId, festivalId))

  const schedule = await Promise.all(
    stageResults.map(async (stage) => {
      const setResults = await db
        .select({
          id: sets.id,
          startTime: sets.startTime,
          endTime: sets.endTime,
          artistId: artists.id,
          artistName: artists.name,
        })
        .from(sets)
        .innerJoin(artists, eq(sets.artistId, artists.id))
        .where(eq(sets.stageId, stage.id))

      return {
        id: stage.id,
        name: stage.name,
        sets: setResults
          .sort((a, b) => a.startTime.localeCompare(b.startTime))
          .map((set) => ({
            id: set.id,
            artist: {
              id: set.artistId,
              name: set.artistName,
            },
            startTime: set.startTime,
            endTime: set.endTime,
          })),
      }
    }),
  )

  const data = FestivalSchema.parse({
    id: festival.id,
    name: festival.name,
    timezone: festival.timezone,
    startTime: festival.startTime,
    endTime: festival.endTime,
    stages: schedule,
  })

  const response = FestivalResponseSchema.parse({
        data,
    })

    return c.json(response)
})

export default festivalsRoute