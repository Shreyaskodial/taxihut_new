import React, { useState } from 'react';
import axios from 'axios';
import './Register.css'; // Custom CSS file for design
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Register() {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [message, setMessage] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false); 

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form Data:", formData); // Log form data
        try {
            const response = await axios.post('/api/auth/register', formData);
            console.log("Server Response:", response); // Log server response
            setMessage(`Registration successful! Welcome`);
        } catch (error) {
            console.error("Error:", error); // Log error
            setMessage(error.response?.data?.message || 'Registration failed');
        }
    };
    const togglePasswordVisibility = () => {
        setPasswordVisible((prev) => !prev); // Toggle password visibility
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
                            <div className="password-field-wrapper" style={{ position: 'relative' }}>
               <input
                  type={passwordVisible ? 'text' : 'password'}
                  name="password"
                  className="form-control input-field"
                  placeholder="Password"
                  onChange={handleChange}
                  required
                  style={{ paddingRight: '40px' }} // Add space for the eye icon
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary eye-button"
                  onClick={togglePasswordVisibility}
                  style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                }}
             >
        {passwordVisible ? <FaEyeSlash /> : <FaEye />}
    </button>
</div>

                            <button type="submit" className="btn btn-primary w-100">Register</button>
                        </form>
                        <div className="mt-3 text-center">
                            <a href="/login" className="btn btn-link text-decoration-none">Already have an account? Login</a>
                            <br />
                            <a href="/forgot-password" className="btn btn-link text-decoration-none">Forgot Password?</a>
                        </div>
                        {message && <div className="mt-3 text-center text-success">{message}</div>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;