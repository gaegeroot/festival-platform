import { db } from './client.js'
import { artists, festivals, sets, stages } from './schema.js'

const existingFestivals = await db.select().from(festivals)

if (existingFestivals.length > 0) {
  console.log('Database already contains seed data. Skipping seed.')
  process.exit(0)
}

await db.insert(festivals).values([
  {
    id: 'fest_001',
    name: 'Desert Sound Festival',
    timezone: 'America/Phoenix',
    startTime: '2027-04-16T10:00:00-07:00',
    endTime: '2027-04-18T23:00:00-07:00',
  },
  {
    id: 'fest_002',
    name: 'Mountain Music Festival',
    timezone: 'America/Denver',
    startTime: '2027-06-11T12:00:00-06:00',
    endTime: '2027-06-13T23:00:00-06:00',
  },
])

await db.insert(stages).values([
  {
    id: 'stage_001',
    festivalId: 'fest_001',
    name: 'Main Stage',
  },
  {
    id: 'stage_002',
    festivalId: 'fest_001',
    name: 'Secondary Stage',
  },
  {
    id: 'stage_003',
    festivalId: 'fest_002',
    name: 'Mountain Stage',
  },
])

await db.insert(artists).values([
  {
    id: 'artist_001',
    name: 'John Summit',
  },
  {
    id: 'artist_002',
    name: 'HVDES',
  },
  {
    id: 'artist_003',
    name: 'Artist C',
  },
  {
    id: 'artist_004',
    name: 'Artist D',
  },
  {
    id: 'artist_005',
    name: 'Artist F',
  },
  {
    id: 'artist_006',
    name: 'Mountain Artist',
  },
])

await db.insert(sets).values([
  {
    id: 'set_001',
    stageId: 'stage_001',
    artistId: 'artist_004',
    startTime: '2027-04-16T18:00:00-07:00',
    endTime: '2027-04-16T19:00:00-07:00',
  },
  {
    id: 'set_002',
    stageId: 'stage_001',
    artistId: 'artist_001',
    startTime: '2027-04-16T20:30:00-07:00',
    endTime: '2027-04-16T21:30:00-07:00',
  },
  {
    id: 'set_003',
    stageId: 'stage_001',
    artistId: 'artist_003',
    startTime: '2027-04-16T21:30:00-07:00',
    endTime: '2027-04-16T22:30:00-07:00',
  },
  {
    id: 'set_004',
    stageId: 'stage_002',
    artistId: 'artist_004',
    startTime: '2027-04-16T19:00:00-07:00',
    endTime: '2027-04-16T20:00:00-07:00',
  },
  {
    id: 'set_005',
    stageId: 'stage_002',
    artistId: 'artist_002',
    startTime: '2027-04-16T21:00:00-07:00',
    endTime: '2027-04-16T22:00:00-07:00',
  },
  {
    id: 'set_006',
    stageId: 'stage_002',
    artistId: 'artist_005',
    startTime: '2027-04-16T22:00:00-07:00',
    endTime: '2027-04-16T23:00:00-07:00',
  },
  {
    id: 'set_007',
    stageId: 'stage_003',
    artistId: 'artist_006',
    startTime: '2027-06-11T18:00:00-06:00',
    endTime: '2027-06-11T19:00:00-06:00',
  },
])

console.log('Database seeded.')