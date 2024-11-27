import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie'
// Initial state for the todo slice
const initialState = {
    user: Cookies.get('user'),
    loading: false,
    error: null,
    isAuthenticated: (Cookies.get('user')==null)?false:true,
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    // Reducers for adding, removing, toggling todos would go here
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
    toggleTodo: (state, action) => {
      const todo = state.todos.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { addTodo, removeTodo, toggleTodo, setLoading, setError } = todoSlice.actions;

export default todoSlice.reducer;
