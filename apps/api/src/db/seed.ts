import { db } from './client.js';
import { festivals } from './schema.js';

await db.delete(festivals);

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