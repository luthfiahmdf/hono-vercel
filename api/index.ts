import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { handle } from '@hono/node-server/vercel';
import { cors } from 'hono/cors';
import usersRouter from './routes/users.ts';
import authRouter from './routes/auth.ts';
import booksRouter from './routes/books.ts';
import categoriesRouter from './routes/categories.ts';
import bookSourcesRouter from './routes/bookSources.ts';


const app = new Hono();

// Enable CORS untuk semua route
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

// Mount routers
app.route('/api/auth', authRouter);
app.route('/api/users', usersRouter);
app.route('/api/books', booksRouter);
app.route('/api/categories', categoriesRouter);
app.route('/api/book-sources', bookSourcesRouter);

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
