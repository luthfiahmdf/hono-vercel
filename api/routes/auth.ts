import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import * as authController from '../controllers/auth.js';

const authRouter = new Hono();

// Login route
authRouter.post('/login', async (c) => {
  try {
    const { email, password } = await c.req.json();
    
    if (!email || !password) {
      throw new HTTPException(400, { message: 'Email and password are required' });
    }

    const user = await authController.login(email, password);
    if (!user) {
      throw new HTTPException(401, { message: 'Invalid email or password' });
    }

    return c.json(user);
  } catch (error) {
    if (error instanceof HTTPException) throw error;
    throw new HTTPException(400, { message: 'Invalid request body' });
  }
});

// Register route
authRouter.post('/register', async (c) => {
  try {
    const { email, password, name } = await c.req.json();
    
    if (!email || !password || !name) {
      throw new HTTPException(400, { message: 'Email, password, and name are required' });
    }

    const user = await authController.register(email, password, name);
    if (!user) {
      throw new HTTPException(409, { message: 'Email already exists' });
    }

    return c.json(user, 201);
  } catch (error) {
    if (error instanceof HTTPException) throw error;
    throw new HTTPException(400, { message: 'Invalid request body' });
  }
});

export default authRouter; 