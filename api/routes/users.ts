import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import type { User } from '../db/schema.js';
import * as userController from '../controllers/users.js';

const usersRouter = new Hono();

// Get all users
usersRouter.get('/', async (c) => {
  try {
    const allUsers = await userController.getAllUsers();
    return c.json(allUsers);
  } catch (error) {
    throw new HTTPException(500, { message: 'Internal server error' });
  }
});

// Get user by id
usersRouter.get('/:id', async (c) => {
  try {
    const id = parseInt(c.req.param('id'));
    const user = await userController.getUserById(id);
    if (!user) {
      throw new HTTPException(404, { message: 'User not found' });
    }
    return c.json(user);
  } catch (error) {
    if (error instanceof HTTPException) throw error;
    throw new HTTPException(500, { message: 'Internal server error' });
  }
});

// Create user
usersRouter.post('/', async (c) => {
  try {
    const body = await c.req.json<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>();
    const newUser = await userController.createUser(body);
    return c.json(newUser, 201);
  } catch (error) {
    if (error instanceof HTTPException) throw error;
    throw new HTTPException(400, { message: 'Invalid request body' });
  }
});

// Update user (PATCH)
usersRouter.patch('/:id', async (c) => {
  try {
    const id = parseInt(c.req.param('id'));
    const body = await c.req.json<Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>>();
    const updatedUser = await userController.updateUser(id, body);
    if (!updatedUser) {
      throw new HTTPException(404, { message: 'User not found' });
    }
    return c.json(updatedUser);
  } catch (error) {
    if (error instanceof HTTPException) throw error;
    throw new HTTPException(400, { message: 'Invalid request body' });
  }
});

// Delete user
usersRouter.delete('/:id', async (c) => {
  try {
    const id = parseInt(c.req.param('id'));
    const deletedUser = await userController.deleteUser(id);
    if (!deletedUser) {
      throw new HTTPException(404, { message: 'User not found' });
    }
    return c.json({ message: 'User deleted successfully' });
  } catch (error) {
    if (error instanceof HTTPException) throw error;
    throw new HTTPException(500, { message: 'Internal server error' });
  }
});

export default usersRouter; 