import { Hono } from 'hono';
import type { User } from '../db/schema.js';
import * as userController from '../controllers/users.js';

const usersRouter = new Hono();

// Get all users
usersRouter.get('/', async (c) => {
  const allUsers = await userController.getAllUsers();
  return c.json(allUsers);
});

// Get user by id
usersRouter.get('/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const user = await userController.getUserById(id);
  if (!user) {
    return c.json({ error: 'User not found' }, 404);
  }
  return c.json(user);
});

// Create user
usersRouter.post('/', async (c) => {
  try {
    const body = await c.req.json<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>();
    const newUser = await userController.createUser(body);
    return c.json(newUser, 201);
  } catch (error) {
    return c.json({ error: 'Invalid request body' }, 400);
  }
});

// Update user
usersRouter.put('/:id', async (c) => {
  try {
    const id = parseInt(c.req.param('id'));
    const body = await c.req.json<Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>>();
    const updatedUser = await userController.updateUser(id, body);
    if (!updatedUser) {
      return c.json({ error: 'User not found' }, 404);
    }
    return c.json(updatedUser);
  } catch (error) {
    return c.json({ error: 'Invalid request body' }, 400);
  }
});

// Delete user
usersRouter.delete('/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const deletedUser = await userController.deleteUser(id);
  if (!deletedUser) {
    return c.json({ error: 'User not found' }, 404);
  }
  return c.json({ message: 'User deleted successfully' });
});

export default usersRouter; 