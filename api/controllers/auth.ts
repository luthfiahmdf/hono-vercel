import { db } from '../db/index.ts';
import { users } from '../db/schema.ts';
import { eq } from 'drizzle-orm';
import { compare, hash } from 'bcrypt';

export async function login(email: string, password: string) {
  const result = await db.select().from(users).where(eq(users.email, email));
  const user = result[0];

  if (!user) {
    return null;
  }

  const isValidPassword = await compare(password, user.password);
  if (!isValidPassword) {
    return null;
  }

  // Remove password from response
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

export async function register(email: string, password: string, name: string) {
  try {
    // Check if user already exists
    const existingUser = await db.select().from(users).where(eq(users.email, email));
    if (existingUser.length > 0) {
      return null;
    }

    // Hash password with bcrypt
    const saltRounds = 10;
    const hashedPassword = await hash(password, saltRounds);

    // Create new user with hashed password
    const result = await db.insert(users).values({
      email,
      password: hashedPassword,
      name
    }).returning();

    // Remove password from response
    const { password: _, ...userWithoutPassword } = result[0];
    return userWithoutPassword;
  } catch (error) {
    console.error('Error in register:', error);
    return null;
  }
} 