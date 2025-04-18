import { eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { books, type TBook, type NewBook } from "../db/schema.js";

export const createBook = async (bookData: Omit<NewBook, "id" | "createdAt" | "updatedAt">) => {
  const newBook = await db.insert(books).values(bookData).returning();
  return newBook[0];
};

export const getAllBooks = async (): Promise<TBook[]> => {
  const allBooks = await db.query.books.findMany({
    with: {
      category: true,
      bookSource: true
    }
  });
  return allBooks;
};

export const getBookById = async (id: string): Promise<TBook | null> => {
  const book = await db.query.books.findFirst({
    where: eq(books.id, id),
    with: {
      category: true,
      bookSource: true
    }
  });
  return book || null;
};

export const updateBook = async (id: string, bookData: Partial<Omit<NewBook, "id" | "createdAt" | "updatedAt">>) => {
  const updatedBook = await db.update(books)
    .set({ 
      ...bookData,
      updatedAt: new Date() 
    })
    .where(eq(books.id, id))
    .returning();
  return updatedBook[0];
};

export const deleteBook = async (id: string): Promise<TBook | null> => {
  const deletedBook = await db.delete(books).where(eq(books.id, id)).returning();
  return deletedBook[0] || null;
};

// Get books by category
export const getBooksByCategory = async (categoryId: string): Promise<TBook[]> => {
  const booksByCategory = await db.query.books.findMany({
    where: eq(books.categoryId, categoryId),
    with: {
      category: true,
      bookSource: true
    }
  });
  return booksByCategory;
};

// Get books by source
export const getBooksBySource = async (bookSourcesId: string): Promise<TBook[]> => {
  const booksBySource = await db.query.books.findMany({
    where: eq(books.bookSourcesId, bookSourcesId),
    with: {
      category: true,
      bookSource: true
    }
  });
  return booksBySource;
};