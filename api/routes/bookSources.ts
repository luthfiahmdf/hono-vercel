import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import * as bookSourceController from '../controllers/bookSources.ts';

const bookSourcesRouter = new Hono();

// Get all book sources
bookSourcesRouter.get('/', async (c) => {
  try {
    const allSources = await bookSourceController.getAllBookSources();
    return c.json(allSources);
  } catch (error) {
    throw new HTTPException(500, { message: 'Internal server error' });
  }
});

// Get book source by id
bookSourcesRouter.get('/:id', async (c) => {
  const id = c.req.param('id');
  const source = await bookSourceController.getBookSourceById(id);
  if (!source) {
    return c.json({ error: 'Book source not found' }, 404);
  }
  return c.json(source);
});

// Create book source
bookSourcesRouter.post('/', async (c) => {
  try {
    const body = await c.req.json();
    const newSource = await bookSourceController.createBookSource(body);
    return c.json(newSource, 201);
  } catch (error) {
    return c.json({ error: 'Invalid request body' }, 400);
  }
});

// Update book source (PATCH)
bookSourcesRouter.patch('/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const body = await c.req.json();
    const updatedSource = await bookSourceController.updateBookSource(id, body);
    if (!updatedSource) {
      return c.json({ error: 'Book source not found' }, 404);
    }
    return c.json(updatedSource);
  } catch (error) {
    return c.json({ error: 'Invalid request body' }, 400);
  }
});

// Delete book source
bookSourcesRouter.delete('/:id', async (c) => {
  const id = c.req.param('id');
  const deletedSource = await bookSourceController.deleteBookSource(id);
  if (!deletedSource) {
    return c.json({ error: 'Book source not found' }, 404);
  }
  return c.json({ message: 'Book source deleted successfully' });
});

export default bookSourcesRouter; 