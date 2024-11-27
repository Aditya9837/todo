import Todo from "../models/todoModel.js";

export const createTodo = async (req, res) => {
    const userId = req.user._id; // Assuming you attach user data to req.user in the auth middleware
    const { name, description, completed } = req.body;
  
    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }
    console.log(userId)
  
    try {
      const newTodo = new Todo({
        userId: userId,
        name,
        description,
        completed: completed || false,
      });
  
      await newTodo.save();
      res.status(201).json({ message: 'Todo created successfully', todo: newTodo });
    } catch (error) {
      console.error('Error creating todo:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };


  // Get a specific Todo by ID
export const getTodo = async (req, res) => {
    const { id } = req.params;
  
    try {
      const todo = await Todo.findById(id);
  
      if (!todo) {
        return res.status(404).json({ message: 'Todo not found' });
      }
  
      res.status(200).json(todo);
    } catch (error) {
      console.error('Error fetching todo:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  
  // Get all Todos for a user
export const getAllTodos = async (req, res) => {
    const userId = req.user._id;
  
    try {
      const todos = await Todo.find({ userId: userId });
      console.log('todos',todos)
      res.status(200).json(todos);
    } catch (error) {
      console.error('Error fetching todos:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  // Update a Todo
export const updateTodo = async (req, res) => {
    const { id } = req.params;
    const { name, description, completed } = req.body;
  
    try {
      const todo = await Todo.findById(id);
  
      if (!todo) {
        return res.status(404).json({ message: 'Todo not found' });
      }
  
      // Only update the fields that are provided
      if (name) todo.name = name;
      if (description) todo.description = description;
      if (typeof completed === 'boolean') todo.completed = completed;
  
      await todo.save();
      res.status(200).json({ message: 'Todo updated successfully', todo });
    } catch (error) {
      console.error('Error updating todo:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  // Delete a Todo
export const deleteTodo = async (req, res) => {
    const { id } = req.params;
  
    try {
      const todo = await Todo.findByIdAndDelete(id);
  
      if (!todo) {
        return res.status(404).json({ message: 'Todo not found' });
      }
  
      res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (error) {
      console.error('Error deleting todo:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  