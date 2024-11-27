import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import TodoPage from './pages/TodoPage';
import ToDoForm from './component/ToDoForm'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/todopage" element={<TodoPage/>} />
        <Route path="/todoform" element={<ToDoForm/>} />
      </Routes>
    </Router>
  );
}

export default App;
