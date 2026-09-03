import { Hono } from 'hono';
import { db } from '../db/client.js';
import { festivals } from '../db/schema.js';

const festivalsRoute = new Hono();

festivalsRoute.get('/', async (c) => {
    const results = await db.select().from(festivals);

    return c.json({
        data: results,
    });
});

export default festivalsRoute;