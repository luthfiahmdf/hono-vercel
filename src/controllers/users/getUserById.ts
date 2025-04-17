import { db } from '../../db';
import { users } from '../../db/schema';
import { eq } from 'drizzle-orm';

export const getUserById = async (id: number) => {
  const user = await db.select().from(users).where(eq(users.id, id));
  return user[0];
}; 