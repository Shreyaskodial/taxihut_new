import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';

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
                </Routes>
            </div>
        </Router>
    );
}

export default App;
