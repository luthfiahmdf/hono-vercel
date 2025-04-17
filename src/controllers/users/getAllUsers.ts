import { db } from '../../db';
import { users } from '../../db/schema';

export const getAllUsers = async () => {
  return await db.select().from(users);
}; 