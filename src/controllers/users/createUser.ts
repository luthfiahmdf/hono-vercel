import { db } from '../../db';
import { users } from '../../db/schema';
import type { User } from '../../db/schema';

export const createUser = async (data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) => {
  const newUser = await db.insert(users).values(data).returning();
  return newUser[0];
}; 