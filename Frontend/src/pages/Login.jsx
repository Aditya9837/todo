import React, { useState } from 'react';
import '../styles/Login.css'; // Importing the CSS file for styling
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login, clearError } from '../store/authActions.js'; // Import actions

const Login = () => {
  // State to store form values and error messages
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Validate form fields
  const validate = () => {
    const errors = {};

    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is not valid';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    }

    return errors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      // Dispatch the login action
      dispatch(login(formData));
    }
  };

  // Navigate if the user is authenticated
  if (isAuthenticated) {
    navigate('/');
  }

  // Navigate to the registration page
  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login to ToDo</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
            {error && error.includes('email') && <span className="error">{error}</span>}
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
            {error && error.includes('password') && <span className="error">{error}</span>}
          </div>

          {error && !error.includes('email') && !error.includes('password') && (
            <span className="error">{error}</span>
          )}

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Logging In...' : 'Login'}
          </button>

          {/* Register Button */}
          <p className="register-text">Not registered yet?</p>
          <button type="button" className="register-button" onClick={handleRegisterClick}>
            Register Here
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
