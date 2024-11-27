import React, { useState, useEffect } from 'react';
import '../styles/Register.css'; // Importing CSS for styling
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { register, clearError } from '../store/authActions';

const Register = () => {
  // State to store form values and error messages
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({}); // State for form errors

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

    if (!formData.name) {
      errors.name = 'Name is required';
    }

    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is not valid';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Confirm Password is required';
    } else if (formData.confirmPassword !== formData.password) {
      errors.confirmPassword = 'Passwords do not match';
    }

    return errors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      dispatch(register(formData));
    }
  };

  // Navigate if the user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Clear errors on new form submission or input change
  useEffect(() => {
    if (error) {
      setErrors((prev) => ({ ...prev, submit: error }));
    }
    return () => {
      dispatch(clearError()); // Clear errors when component unmounts or on a new render
    };
  }, [error, dispatch]);

  const handleLoginClick = () => {
    navigate('/login')
  }

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Create Your Account</h2>
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>

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
            {errors.email && <span className="error">{errors.email}</span>}
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
            {errors.password && <span className="error">{errors.password}</span>}
          </div>

          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
            />
            {errors.confirmPassword && (
              <span className="error">{errors.confirmPassword}</span>
            )}
          </div>

          {errors.submit && <span className="error">{errors.submit}</span>}

          <button type="submit" className="register-button" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
          <p className="login-text"> if user already registered</p>
          <button type="button" className="login-button" onClick={handleLoginClick}>
            Login Here
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
