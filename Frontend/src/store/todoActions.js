import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

// Create an Axios instance with a base URL
const api = axios.create({
  baseURL: 'http://localhost:4001/api/todo', // Base URL for your API
});

// Utility function to get the token from Cookies
const getToken = () => {
  return JSON.parse(Cookies.get('user'))?.token;
};

// Create Todo
export const createTodo = createAsyncThunk(
  'todos/createtodo',
  async ({ name, description, completed }, { rejectWithValue }) => {
    try {
      const response = await api.post('/createtodo', { name, description, completed }, {
        headers: {
          Authorization: `Bearer ${getToken()}`, // Include the JWT token here
        },
      });
      return response.data; // Return the response from the backend
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

// Delete Todo
export const deleteTodo = createAsyncThunk(
  'todos/deletetodo',
  async (todoId, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/deletetodo/${todoId}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`, // Include the JWT token
        },
      });
      return response.data; // Return the response data from deletion
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

// Get All Todos
export const getAllTodo = createAsyncThunk(
  'todos/getalltodos',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/getalltodos', {
        headers: {
          Authorization: `Bearer ${getToken()}`, // Include the JWT token
        },
      });
    
      return response.data; // Return the list of todos
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

// Get Todo by ID
export const getTodo = createAsyncThunk(
  'todos/gettodo',
  async (todoId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/gettodolist/${todoId}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`, // Include the JWT token
        },
      });
      return response.data; // Return the todo data
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

// Update Todo
export const updateTodo = createAsyncThunk(
  'todos/updatetodo',
  async ({ todoId, name, description, completed }, { rejectWithValue }) => {
    try {
      const response = await api.put(
        `/updatetodo/${todoId}`,
        { name, description, completed },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`, // Include the JWT token
          },
        }
      );
      return response.data; // Return the updated todo data
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);
