import { Hono } from 'hono';
import * as authController from '../controllers/auth.js';

const authRouter = new Hono();

// Login route
authRouter.post('/login', async (c) => {
  try {
    const { email, password } = await c.req.json();
    
    if (!email || !password) {
      return c.json({ error: 'Email and password are required' }, 400);
    }

    const user = await authController.login(email, password);
    if (!user) {
      return c.json({ error: 'Invalid email or password' }, 401);
    }

    return c.json(user);
  } catch (error) {
    return c.json({ error: 'Invalid request body' }, 400);
  }
});

// Register route
authRouter.post('/register', async (c) => {
  try {
    const { email, password, name } = await c.req.json();
    
    if (!email || !password || !name) {
      return c.json({ error: 'Email, password, and name are required' }, 400);
    }

    const user = await authController.register(email, password, name);
    if (!user) {
      return c.json({ error: 'Email already exists' }, 409);
    }

    return c.json(user, 201);
  } catch (error) {
    return c.json({ error: 'Invalid request body' }, 400);
  }
});

export default authRouter; 