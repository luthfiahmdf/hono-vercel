import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import * as categoryController from '../controllers/categories.js';

const categoriesRouter = new Hono();

// Get all categories
categoriesRouter.get('/', async (c) => {
  try {
    const allCategories = await categoryController.getAllCategories();
    return c.json(allCategories);
  } catch (error) {
    throw new HTTPException(500, { message: 'Internal server error' });
  }
});

// Get category by id
categoriesRouter.get('/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const category = await categoryController.getCategoryById(id);
    if (!category) {
      throw new HTTPException(404, { message: 'Category not found' });
    }
    return c.json(category);
  } catch (error) {
    if (error instanceof HTTPException) throw error;
    throw new HTTPException(500, { message: 'Internal server error' });
  }
});

// Create category
categoriesRouter.post('/', async (c) => {
  try {
    const body = await c.req.json();
    const newCategory = await categoryController.createCategory(body);
    return c.json(newCategory, 201);
  } catch (error) {
    return c.json({ error: 'Invalid request body' }, 400);
  }
});

// Update category (PATCH)
categoriesRouter.patch('/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const body = await c.req.json();
    const updatedCategory = await categoryController.updateCategory(id, body);
    if (!updatedCategory) {
      return c.json({ error: 'Category not found' }, 404);
    }
    return c.json(updatedCategory);
  } catch (error) {
    return c.json({ error: 'Invalid request body' }, 400);
  }
});

// Delete category
categoriesRouter.delete('/:id', async (c) => {
  const id = c.req.param('id');
  const deletedCategory = await categoryController.deleteCategory(id);
  if (!deletedCategory) {
    return c.json({ error: 'Category not found' }, 404);
  }
  return c.json({ message: 'Category deleted successfully' });
});

export default categoriesRouter; 