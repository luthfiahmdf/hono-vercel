import { eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { bookSources, type BookSource, type NewBookSource } from "../db/schema.js";

export const createBookSource = async (sourceData: Omit<NewBookSource, "id" | "createdAt" | "updatedAt">) => {
  const newSource = await db.insert(bookSources).values(sourceData).returning();
  return newSource[0];
};

export const getAllBookSources = async (): Promise<BookSource[]> => {
  const allSources = await db.select().from(bookSources);
  return allSources;
};

export const getBookSourceById = async (id: string): Promise<BookSource | null> => {
  const source = await db.select().from(bookSources).where(eq(bookSources.id, id));
  return source[0] || null;
};

export const updateBookSource = async (id: string, sourceData: Partial<Omit<NewBookSource, "id" | "createdAt" | "updatedAt">>) => {
  const updatedSource = await db.update(bookSources)
    .set({ 
      ...sourceData,
      updatedAt: new Date() 
    })
    .where(eq(bookSources.id, id))
    .returning();
  return updatedSource[0];
};

export const deleteBookSource = async (id: string): Promise<BookSource | null> => {
  const deletedSource = await db.delete(bookSources).where(eq(bookSources.id, id)).returning();
  return deletedSource[0] || null;
}; 