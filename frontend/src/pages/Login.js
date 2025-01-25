import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css'; // Reusing the same Register.css for design

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // For demonstration purposes, you can replace with actual authentication logic
    if (email === 'user@example.com' && password === 'password') {
      navigate('/dashboard'); // Redirect to dashboard after successful login
    } else {
      alert('Invalid credentials'); // Show error if credentials don't match
    }
  };

  return (
    <div className="register-container">
      <div className="row justify-content-center">
        <div className="col-md-12 col-12">
          <div className="card p-4">
            <h2 className="text-center mb-4">Login</h2>
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control input-field"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control input-field"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">Login</button>
            </form>
            <div className="mt-3 text-center">
                            <a href="/register" className="btn btn-link text-decoration-none">Sign up</a>
                            <br />
                            <a href="/forgot-password" className="btn btn-link text-decoration-none">Forgot Password?</a>
                        </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
