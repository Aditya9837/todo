# MERN ToDo App

This is a MERN stack (MongoDB, Express, React, Node) ToDo application with separate frontend and backend. The app is built using Vite for the frontend and Node.js for the backend. MongoDB is used for local database storage.

## Project Structure

The project has the following directory structure:

todo/ ├── server/ # Backend (Node.js with Express) │ ├── public/ # Served static frontend files │ ├── routes/ # API routes for handling todos │ ├── models/ # MongoDB models for todos │ ├── controllers/ # Logic for API endpoints │ └── index.js # Entry point for the backend (server) │ ├── frontend/ # Frontend (React app with Vite) │ ├── src/ # React source code │ ├── public/ # Static files for frontend │ ├── index.html # Main HTML file for Vite │ └── vite.config.js # Vite configuration file │ ├── copy-frontend.js # Script to copy frontend build to server ├── README.md # Project documentation └── package.json # Root package.json with scripts

markdown
Copy code

## Prerequisites

Make sure you have the following installed:

- **Node.js** (Recommended version: 14.x or higher)
- **MongoDB** (Running locally for the database)

## Setup and Installation

### 1. Clone the Repository

Clone the repository to your local machine:

```bash
git clone <repository_url>
cd todo
2. Backend Setup
Navigate to the server directory and install the required dependencies:

bash
Copy code
cd Backend
npm install
3. Frontend Setup
Navigate to the frontend directory and install the required dependencies:

bash
Copy code
cd Frontend
npm install
4. Environment Variables (Backend)
Create a .env file in the server directory with the following variables:

env
Copy code
PORT=5000
MONGO_URI=mongodb://localhost:27017/todo-app
JWT_SECRET=your_jwt_secret
5. Running the Application
Run the Backend Server
Start the backend server in the server directory:

bash
Copy code
cd Backend
nodemon server.js
The backend server will run on http://localhost:5000.

Run the Frontend Development Server
To run the frontend in development mode, use the following command in the frontend directory:

bash
Copy code
cd Frontend
npm run dev
The frontend development server will run on http://localhost:5173 (by default).

6. Build and Deploy the Frontend
When you're ready to deploy the frontend, you need to build the production-ready files. Run the following command in the frontend directory:

bash
Copy code
cd Frontend
npm run build
This will create the build files in the frontend/dist directory.

7. Copy Frontend to Backend (Production Setup)
To serve the frontend from the backend in production, you can copy the build files to the backend's public folder. Run the following script from the root directory:

bash
Copy code
node copy-frontend.js
This script will copy the contents of the frontend/dist directory to the server/public directory.

8. Start Backend with Frontend
Once the frontend build is copied to the backend, you can start the backend server to serve both frontend and backend from a single server:

bash
Copy code
cd Backend
nodemon server.js
The app will be accessible at http://localhost:5000 and will serve both the backend API and the frontend.

Scripts
Frontend Scripts
dev: Start the Vite development server for frontend.

bash
Copy code
npm run dev
build: Build the production-ready frontend files.

bash
Copy code
npm run build
Backend Scripts
start: Start the backend server.

bash
Copy code
npm start