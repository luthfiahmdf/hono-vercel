import { Hono } from 'hono';
import * as bookController from '../controllers/books.js';

const booksRouter = new Hono();

// Get all books
booksRouter.get('/', async (c) => {
  const allBooks = await bookController.getAllBooks();
  return c.json(allBooks);
});

// Get book by id
booksRouter.get('/:id', async (c) => {
  const id = c.req.param('id');
  const book = await bookController.getBookById(id);
  if (!book) {
    return c.json({ error: 'Book not found' }, 404);
  }
  return c.json(book);
});

// Create book
booksRouter.post('/', async (c) => {
  try {
    const body = await c.req.json();
    const newBook = await bookController.createBook(body);
    return c.json(newBook, 201);
  } catch (error) {
    return c.json({ error: 'Invalid request body' }, 400);
  }
});

// Update book (PATCH)
booksRouter.patch('/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const body = await c.req.json();
    const updatedBook = await bookController.updateBook(id, body);
    if (!updatedBook) {
      return c.json({ error: 'Book not found' }, 404);
    }
    return c.json(updatedBook);
  } catch (error) {
    return c.json({ error: 'Invalid request body' }, 400);
  }
});

// Delete book
booksRouter.delete('/:id', async (c) => {
  const id = c.req.param('id');
  const deletedBook = await bookController.deleteBook(id);
  if (!deletedBook) {
    return c.json({ error: 'Book not found' }, 404);
  }
  return c.json({ message: 'Book deleted successfully' });
});

// Get books by category
booksRouter.get('/category/:categoryId', async (c) => {
  const categoryId = c.req.param('categoryId');
  const booksByCategory = await bookController.getBooksByCategory(categoryId);
  return c.json(booksByCategory);
});

// Get books by source
booksRouter.get('/source/:sourceId', async (c) => {
  const sourceId = c.req.param('sourceId');
  const booksBySource = await bookController.getBooksBySource(sourceId);
  return c.json(booksBySource);
});

export default booksRouter;
