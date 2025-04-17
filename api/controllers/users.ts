import { db } from '../db';
import { users } from '../db/schema';
import type { NewUser, User } from '../db/schema';
import { eq } from 'drizzle-orm';

export async function getAllUsers(): Promise<User[]> {
  return await db.select().from(users);
}

export async function getUserById(id: number): Promise<User | null> {
  const result = await db.select().from(users).where(eq(users.id, id));
  return result[0] || null;
}

export async function createUser(userData: Omit<NewUser, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
  const result = await db.insert(users).values(userData).returning();
  return result[0];
}

export async function updateUser(id: number, userData: Partial<Omit<NewUser, 'id' | 'createdAt' | 'updatedAt'>>): Promise<User | null> {
  const result = await db.update(users)
    .set({ ...userData, updatedAt: new Date() })
    .where(eq(users.id, id))
    .returning();
  return result[0] || null;
}

export async function deleteUser(id: number): Promise<User | null> {
  const result = await db.delete(users).where(eq(users.id, id)).returning();
  return result[0] || null;
} 