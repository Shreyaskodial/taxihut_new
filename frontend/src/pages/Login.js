// import React, { useState } from 'react';
// import axios from 'axios';

// function Login() {
//     const [formData, setFormData] = useState({ email: '', password: '' });
//     const [message, setMessage] = useState('');

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post('/api/auth/login', formData);
//             setMessage(`Welcome back, ${response.data.user.name}`);
//             // Save the token, e.g., in localStorage or context
//         } catch (error) {
//             setMessage(error.response.data.message || 'Login failed');
//         }
//     };

//     return (
//         <div>
//             <h2>Login</h2>
//             <form onSubmit={handleSubmit}>
//                 <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
//                 <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
//                 <button type="submit">Login</button>
//             </form>
//             {message && <p>{message}</p>}
//         </div>
//     );
// }

// export default Login;


// src/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // email='user@e
    // You can add authentication logic here
    if (email === 'user@example.com' && password === 'password') {
      navigate('/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email: </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
