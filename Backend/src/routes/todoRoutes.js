import express from 'express';
import { createTodo, getAllTodos, getTodo, updateTodo, deleteTodo } from '../controllers/todoControllers.js';
import { authenticateUser } from '../middlewares/authmiddleware.js';

const router = express.Router();

// POST: Create a new todo
router.post('/createtodo',authenticateUser, createTodo);


// GET: Get all todos
router.get('/getalltodos', authenticateUser, getAllTodos);

// GET: Get a specific todo by ID
router.get('/gettodo/:id', authenticateUser, getTodo);

// PUT: Update a specific todo by ID
router.put('/updatetodo/:id', authenticateUser, updateTodo);

// DELETE: Delete a specific todo by ID
router.delete('/deletetodo/:id', authenticateUser, deleteTodo);

export default router;
