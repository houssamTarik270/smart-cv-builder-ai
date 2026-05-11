import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc'; // ✅ Darori t-installi react-icons
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // 1️⃣ L-Logic bach n-ch-dou l-Token mlli Google k-t-rje3na l-hna
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');

    if (token) {
      localStorage.setItem('token', token); // 🔑 Khzen s-sarout dyal l-session 
      alert("Welcome back! Login Successful.");
      navigate('/builder'); // 🚀 Duz nichan l-builder [cite: 201]
    }
  }, [location, navigate]);

  // 2️⃣ Handle Login l-3adi (Email/Password)
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      alert("Welcome back, " + res.data.user.name + "!");
      navigate('/builder');
    } catch (err) {
      alert("email or password is incorrect. Please try again.");
    }
  };

  // 3️⃣ Fonction dyal Google Login
  const handleGoogleLogin = () => {
    // 🌐 Sift l-user l-Backend li ghadi y-sifto l-Google
    window.location.href = 'http://localhost:5000/api/auth/google';
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleLogin} className="auth-form">
        <h2>Login to Smart CV Builder AI 🦾</h2>
        
        <div className="input-group">
          <input 
            type="email" 
            placeholder="Email Address" 
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>

        <div className="input-group">
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>

        <button type="submit" className="primary-btn">Login</button>

        <div className="auth-divider">
          <span>OR</span>
        </div>

        {/* 🌈 Google Login Button */}
        <button 
          type="button" 
          className="google-btn" 
          onClick={handleGoogleLogin}
        >
          <FcGoogle size={22} />
          Continue with Google
        </button>

        <p className="auth-footer">
          Don't have an account? <span onClick={() => navigate('/register')}>Sign Up</span>
        </p>
      </form>
    </div>
  );
}