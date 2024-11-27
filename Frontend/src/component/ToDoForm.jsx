import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTodo } from '../store/todoActions'; // Import the action for adding a todo
import { useNavigate } from 'react-router-dom';
import '../styles/NewTodoForm.css'; // You can import styles here

const NewTodoForm = () => {
  // Setting initial state for form inputs
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);
  const dispatch = useDispatch();
  const navigate=useNavigate()

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if inputs are not empty
    if (name.trim() === '' || description.trim() === '') {
      alert('Please provide both title and description.');
      return;
    }

    // Create the new todo object
    const newTodo = {
      name,
      description,
      completed
    };

    // Dispatch the addTodo action
    const res=await dispatch(createTodo(newTodo));
    
    // Clear form after submission
    setName('');
    setDescription('');
    setCompleted(false);
    navigate('/todopage')
  };

  return (
    <div className="new-todo-form">
      <h2>Create a New Todo</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Todo Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Todo name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter Todo description"
            required
          />
        </div>
        
        <button type="submit" className="submit-btn">Add Todo</button>
      </form>
    </div>
  );
};

export default NewTodoForm;
