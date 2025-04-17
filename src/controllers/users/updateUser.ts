import { db } from '../../db';
import { users } from '../../db/schema';
import { eq } from 'drizzle-orm';
import type { User } from '../../db/schema';

export const updateUser = async (id: number, data: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>) => {
  const updatedUser = await db.update(users)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(users.id, id))
    .returning();
  return updatedUser[0];
}; 