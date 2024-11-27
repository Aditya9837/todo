import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import TodoCard from '../component/TodoCard';
import '../styles/TodoPage.css';
import { getAllTodo } from '../store/todoActions';

const TodoList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Initialize todos as an empty array and add loading state
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch todos when the component mounts
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true); // Set loading to true when fetching starts
        const res = await dispatch(getAllTodo());
        const todos = res['payload']; // Assuming the todos are in the 'payload'
        console.log(todos); // Logging the fetched todos
        setTodos(todos); // Set todos to state
      } catch (error) {
        console.error('Error fetching todos:', error);
      } finally {
        setLoading(false); // Stop loading after fetching is done
      }
    };

    fetchTodos();
  }, [dispatch]);

  // Navigate to the create todo form
  const createTodoForm = () => {
    navigate('/todoform');
  };

  return (
    <>
      <button className="todo-btn" onClick={createTodoForm}>Create Todo</button>
      
      {/* Display loading message or todos list */}
      {loading ? (
        <div>Loading todos...</div>
      ) : (
        <div className="todo-list">
          {todos && todos.length > 0 ? (
            todos.map(todo => (
              <TodoCard key={todo._id} todo={todo} />
            ))
          ) : (
            <div>No Todos available</div>
          )}
        </div>
      )}
    </>
  );
};

export default TodoList;
