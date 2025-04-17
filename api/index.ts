import { Hono } from 'hono';
import { handle } from '@hono/node-server/vercel';
import usersRouter from '../src/routes/users';

const app = new Hono();

// Root route
app.get('/', (c) => c.json({ message: 'Welcome to Hono API' }));

// Mount users router
app.route('/users', usersRouter);

export default handle(app);
