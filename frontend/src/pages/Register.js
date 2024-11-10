import React, { useState } from 'react';
import axios from 'axios';
import './Register.css'; // Custom CSS file for design

function Register() {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form Data:", formData); // Log form data
        try {
            const response = await axios.post('/api/auth/register', formData);
            console.log("Server Response:", response); // Log server response
            setMessage(`Registration successful! Welcome, ${response.data.user.name}`);
        } catch (error) {
            console.error("Error:", error); // Log error
            setMessage(error.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="register-container">
            <div className="row justify-content-center">
                <div className="col-md-12 col-12">
                    <div className="card p-4">
                        <h2 className="text-center mb-4">Create an Account</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control input-field"
                                    placeholder="Full Name"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control input-field"
                                    placeholder="Email Address"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control input-field"
                                    placeholder="Password"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary w-100">Register</button>
                        </form>
                        {message && <div className="mt-3 text-center text-danger">{message}</div>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
