import { Hono } from 'hono';
import usersRouter from './routes/users';

const app = new Hono();

// Root route
app.get('/', (c) => c.json({ message: 'Welcome to Hono API' }));

// Mount users router
app.route('/users', usersRouter);

const port = process.env.PORT ? parseInt(process.env.PORT) : 3001;

export default {
  port,
  fetch: app.fetch,
}; 