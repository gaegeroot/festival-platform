import { db } from './client.js';
import { festivals } from './schema.js';

const existingFestivals = await db.select().from(festivals);

if (existingFestivals.length > 0) {
  console.log('Database already contains seed data. Skipping seed.');
  process.exit(0);
}

await db.insert(festivals).values([
  {
    id: 'fest_001',
    name: 'Desert Sound Festival',
    city: 'Phoenix',
    state: 'AZ',
    startDate: '2027-04-16',
    endDate: '2027-04-18',
  },
  {
    id: 'fest_002',
    name: 'Mountain Music Festival',
    city: 'Denver',
    state: 'CO',
    startDate: '2027-06-11',
    endDate: '2027-06-13',
  },
]);

console.log('Database seeded.');