import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
    return (
        <Router>
            <div className="App">
                <nav>
                    <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
                </nav>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/dashboard" element={<Dashboard/>} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
