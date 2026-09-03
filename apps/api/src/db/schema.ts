import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const festivals = sqliteTable('festivals', {
    id: text('id').primaryKey(),
    name: text('name').notNull(),
    city: text('city').notNull(),
    state: text('state').notNull(),
    startDate: text('start_date').notNull(),
    endDate: text('end_date').notNull(),
});