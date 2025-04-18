import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import * as bookController from "../controllers/books.ts";
import { requireAuth } from "../middleware/jwt.ts";

const booksRouter = new Hono();

// Get all books - tidak memerlukan autentikasi
booksRouter.get("/", async (c) => {
  try {
    const allBooks = await bookController.getAllBooks();
    return c.json(allBooks);
  } catch (error) {
    throw new HTTPException(500, { message: "Internal server error" });
  }
});

// Get book by id - tidak memerlukan autentikasi
booksRouter.get("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const book = await bookController.getBookById(id);
    if (!book) {
      throw new HTTPException(404, { message: "Book not found" });
    }
    return c.json(book);
  } catch (error) {
    if (error instanceof HTTPException) throw error;
    throw new HTTPException(500, { message: "Internal server error" });
  }
});

// Create book - memerlukan autentikasi
booksRouter.post("/", requireAuth, async (c) => {
  try {
    const body = await c.req.json();
    const newBook = await bookController.createBook(body);
    return c.json(newBook, 201);
  } catch (error) {
    if (error instanceof HTTPException) throw error;
    throw new HTTPException(400, { message: "Invalid request body" });
  }
});

// Update book - memerlukan autentikasi
booksRouter.patch("/:id", requireAuth, async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    const updatedBook = await bookController.updateBook(id, body);
    if (!updatedBook) {
      throw new HTTPException(404, { message: "Book not found" });
    }
    return c.json(updatedBook);
  } catch (error) {
    if (error instanceof HTTPException) throw error;
    throw new HTTPException(400, { message: "Invalid request body" });
  }
});

// Delete book - memerlukan autentikasi
booksRouter.delete("/:id", requireAuth, async (c) => {
  try {
    const id = c.req.param("id");
    const deletedBook = await bookController.deleteBook(id);
    if (!deletedBook) {
      throw new HTTPException(404, { message: "Book not found" });
    }
    return c.json({ message: "Book deleted successfully" });
  } catch (error) {
    if (error instanceof HTTPException) throw error;
    throw new HTTPException(500, { message: "Internal server error" });
  }
});

// Get books by category
booksRouter.get("/category/:categoryId", async (c) => {
  const categoryId = c.req.param("categoryId");
  const booksByCategory = await bookController.getBooksByCategory(categoryId);
  return c.json(booksByCategory);
});

// Get books by source
booksRouter.get("/source/:sourceId", async (c) => {
  const sourceId = c.req.param("sourceId");
  const booksBySource = await bookController.getBooksBySource(sourceId);
  return c.json(booksBySource);
});

export default booksRouter;
