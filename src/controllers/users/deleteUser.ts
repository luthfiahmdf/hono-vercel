import { db } from '../../db';
import { users } from '../../db/schema';
import { eq } from 'drizzle-orm';

export const deleteUser = async (id: number) => {
  const deletedUser = await db.delete(users).where(eq(users.id, id)).returning();
  return deletedUser[0];
}; 