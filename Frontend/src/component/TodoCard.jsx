import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import '../styles/TodoCard.css'; // Import the CSS file for styling
import { deleteTodo, updateTodo } from '../store/todoActions';

const TodoCard = ({ todo, onComplete }) => {


  const dispatch = useDispatch();



  return (
    <div className='todo-card'>
      <h2 className='todo-title'>{todo.name}</h2>
      <h5 className='todo-description'>{todo.description}</h5>
      <h3 className={`todo-status ${todo.completed ? 'completed' : 'pending'}`}>
        {todo.completed ? 'Completed' : 'Pending'}
      </h3>
      
      {/* Conditionally render the 'Complete' button if the todo is pending */}
      {!todo.completed && (
        <button className="complete-btn" onClick={async () => {
          console.log( await dispatch(updateTodo({ todoId:todo._id, name:todo.name, description:todo.description, completed:true })))
          window.location.reload();

        }}>
          Mark as Complete
        </button>
      )}
      <button className="delete-btn" onClick={async () => {
          console.log(await dispatch(deleteTodo(todo._id)))
          window.location.reload();

        }}>
          Delete
        </button>
    </div>
  );
};

export default TodoCard;
