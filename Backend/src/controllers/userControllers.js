// Import necessary libraries and models
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import validator from 'validator';

// Register a new user
export const registerUser = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  console.log('Request Body:', req.body);

  // Input validation
  if (!name || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: 'All fields (name, email, password, confirmPassword) are required.' });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: 'Invalid email format.' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters long.' });
  }

  // Check if password and confirmPassword match
  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match.' });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User is already registered.' });
    }

    // Create a new user
    const newUser = new User({ name, email, password, confirmPassword });

    await newUser.save(); // The password will be hashed in the pre-save hook

    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Log in an existing user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Input validation
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if the password matches the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // Send response with token and user data
    res.status(200).json({
      message: 'Login successful',
      
      user: {
        token:token,
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
