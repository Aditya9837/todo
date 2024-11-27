import express from 'express';

// Import the user controller functions
import { registerUser, loginUser  } from '../controllers/userControllers.js';


// Initialize the router
const router = express.Router();

// Route for user registration
router.post('/register', registerUser);

// Route for user login
router.post('/login', loginUser);




export default router;
