import React from 'react';
import '../styles/Home.css'; // Importing CSS for styling
import Navbar from '../component/Navbar';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Home = () => {

  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const getStarted = () => {
    {
      isAuthenticated?(navigate('/todopage')):(navigate('/login'))
    }
  }

  return (

   <>
   <Navbar/>
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <h1 className="hero-title">Welcome to Your ToDo List</h1>
        <p className="hero-description">
          Organize your tasks efficiently with our interactive ToDo list.
        </p>
        <button className="hero-button" onClick={() => getStarted()}>Get Started</button>
      </section>


      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">Features</h2>
        <div className="features">
          <div className="feature-card">
            <h3>Easy to Use</h3>
            <p>Quickly add, edit, and delete tasks in just a few clicks.</p>
          </div>
          <div className="feature-card">
            <h3>Responsive Design</h3>
            <p>Access your ToDo list on any device, anytime, anywhere.</p>
          </div>
          <div className="feature-card">
            <h3>Organize Tasks</h3>
            <p>Keep track of your progress and manage your time effectively.</p>
          </div>
        </div>
      </section>
    </div>
   </>
  );
};

export default Home;
