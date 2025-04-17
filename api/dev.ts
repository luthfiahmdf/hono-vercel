import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import usersRouter from './routes/users.js';

const app = new Hono();

// Root route
app.get('/', (c) => c.json({ message: 'Welcome to Hono API' }));

// Mount users router
app.route('/users', usersRouter);

const port = process.env.PORT ? parseInt(process.env.PORT) : 3001;

serve({
  fetch: app.fetch,
  port
});

console.log(`Server is running on port ${port}`); 