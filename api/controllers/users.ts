import { db } from "../db/index.ts";
import { users } from "../db/schema.ts";
import type { NewUser, User } from "../db/schema.ts";
import { eq } from "drizzle-orm";
import { hash } from "bcrypt";

export async function getAllUsers(): Promise<User[]> {
  return await db.select().from(users);
}

export async function getUserById(id: string): Promise<User | null> {
  const [user] = await db.select().from(users).where(eq(users.id, id));
  return user || null;
}

export async function createUser(
  userData: Omit<NewUser, "id" | "createdAt" | "updatedAt">
): Promise<User> {
  // Hash password with bcrypt
  const saltRounds = 10;
  const hashedPassword = await hash(userData.password, saltRounds);

  // Create new user with hashed password
  const [newUser] = await db
    .insert(users)
    .values({
      ...userData,
      password: hashedPassword,
    })
    .returning();

  return newUser;
}

export async function updateUser(
  id: string,
  userData: Partial<Omit<NewUser, "id" | "createdAt" | "updatedAt">>
): Promise<User | null> {
  // If password is being updated, hash it
  if (userData.password) {
    const saltRounds = 10;
    userData.password = await hash(userData.password, saltRounds);
  }

  const [updatedUser] = await db
    .update(users)
    .set({ ...userData, updatedAt: new Date() })
    .where(eq(users.id, id))
    .returning();
  return updatedUser || null;
}

export async function deleteUser(id: string): Promise<User | null> {
  const [deletedUser] = await db.delete(users).where(eq(users.id, id)).returning();
  return deletedUser || null;
}
