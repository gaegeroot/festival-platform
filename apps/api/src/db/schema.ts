import { sqliteTable, text, unique } from 'drizzle-orm/sqlite-core'

export const festivals = sqliteTable('festivals', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  timezone: text('timezone').notNull(),
  startTime: text('start_time').notNull(),
  endTime: text('end_time').notNull(),
})

export const stages = sqliteTable('stages', {
    id: text('id').primaryKey(),
    festivalId: text('festival_id')
      .notNull()
      .references(() => festivals.id),
    name: text('name').notNull(),
  },
  (table) => [
    unique('stages_festival_name_unique').on(
      table.festivalId,
      table.name,
    ),
  ],
)

export const artists = sqliteTable('artists', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
})

export const sets = sqliteTable('sets', {
  id: text('id').primaryKey(),
  stageId: text('stage_id')
    .notNull()
    .references(() => stages.id),
  artistId: text('artist_id')
    .notNull()
    .references(() => artists.id),
  startTime: text('start_time').notNull(),
  endTime: text('end_time').notNull(),
})