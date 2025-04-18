import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import usersRouter from './routes/users.js';
import authRouter from './routes/auth.js';
import booksRouter from './routes/books.js';
import categoriesRouter from './routes/categories.js';
import bookSourcesRouter from './routes/bookSources.js';

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

// Mount routers
app.route('/auth', authRouter);
app.route('/users', usersRouter);
app.route('/books', booksRouter);
app.route('/categories', categoriesRouter);
app.route('/book-sources', bookSourcesRouter);

const port = process.env.PORT ? parseInt(process.env.PORT) : 3001;

serve({
  fetch: app.fetch,
  port
});

console.log(`Server is running on port ${port}`); 