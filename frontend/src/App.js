import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
// import './App.css';  // Importing external CSS file for styling
import Bookings from './pages/Bookings';

function App() {
    return (
        <Router>
            <div className="App">
                {/* <nav className="navbar">
                    <Link to="/login" className="nav-link">Login</Link>
                    <span className="separator">|</span>
                    <Link to="/register" className="nav-link">Register</Link>
                </nav> */}
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/booking" element={<Bookings />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
