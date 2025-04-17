import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { handle } from '@hono/node-server/vercel';
import { cors } from 'hono/cors';
import usersRouter from './routes/users.js';

const app = new Hono();

// Enable CORS
app.use('/*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  exposeHeaders: ['Content-Length', 'X-Requested-With'],
  maxAge: 600,
  credentials: true,
}));

// Root route
app.get('/', (c) => c.json({ message: 'Welcome to Hono API' }));

// Mount users router
app.route('/users', usersRouter);

// Development server
if (process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT ? parseInt(process.env.PORT) : 3001;
  serve({
    fetch: app.fetch,
    port
  });
  console.log(`Server is running on port ${port}`);
}

// Export for Vercel
export default handle(app);
