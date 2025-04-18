import { eq } from "drizzle-orm";
import { db } from "../db/index.ts";
import { categories, type Category, type NewCategory } from "../db/schema.ts";

export const createCategory = async (categoryData: Omit<NewCategory, "id" | "createdAt" | "updatedAt">) => {
  const newCategory = await db.insert(categories).values(categoryData).returning();
  return newCategory[0];
};

export const getAllCategories = async (): Promise<Category[]> => {
  const allCategories = await db.select().from(categories);
  return allCategories;
};

export const getCategoryById = async (id: string): Promise<Category | null> => {
  const category = await db.select().from(categories).where(eq(categories.id, id));
  return category[0] || null;
};

export const updateCategory = async (id: string, categoryData: Partial<Omit<NewCategory, "id" | "createdAt" | "updatedAt">>) => {
  const updatedCategory = await db.update(categories)
    .set({ 
      ...categoryData,
      updatedAt: new Date() 
    })
    .where(eq(categories.id, id))
    .returning();
  return updatedCategory[0];
};

export const deleteCategory = async (id: string): Promise<Category | null> => {
  const deletedCategory = await db.delete(categories).where(eq(categories.id, id)).returning();
  return deletedCategory[0] || null;
}; 