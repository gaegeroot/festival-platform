import { Hono } from 'hono';
import { db } from './db/client.js';
import { festivals } from './db/schema.js';
import festivalsRoute from './routes/festivals.js';

const app = new Hono();

app.get('/api/health', (c) => {
    try {
        db.run('SELECT 1');

        return c.json({
            status: 'ok',
            database: 'ok',
        });
    } catch {
        return c.json(
            {
                status: 'error',
                database: 'error',
            },
            503,
        );
    }
});

app.route('/api/festivals', festivalsRoute);

export default {
    port: 3000,
    fetch: app.fetch,
};