import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import './Login.css';

const API = 'http://localhost:5000/api/auth';

// ─── tiny helpers ────────────────────────────────────────────────────────────
const post = (path, data) => axios.post(`${API}${path}`, data);
const errMsg = (e) =>
  e?.response?.data?.message || 'Something went wrong. Please try again.';

// ─── VIEWS ───────────────────────────────────────────────────────────────────
const VIEWS = {
  LOGIN: 'login',
  SIGNUP: 'signup',
  VERIFY_EMAIL: 'verify_email',
  FORGOT: 'forgot',
  VERIFY_RESET: 'verify_reset',
  NEW_PASSWORD: 'new_password',
};

// ─── OTP Input Component ─────────────────────────────────────────────────────
function OtpInput({ value, onChange }) {
  const inputs = useRef([]);
  const digits = value.padEnd(6, ' ').split('').map((c) => (c === ' ' ? '' : c));

  const handleKey = (i, e) => {
    if (e.key === 'Backspace') {
      const next = [...digits];
      next[i] = '';
      onChange(next.join('').trimEnd());
      if (i > 0) inputs.current[i - 1]?.focus();
    }
  };

  const handleChange = (i, e) => {
    const char = e.target.value.replace(/\D/g, '').slice(-1);
    const next = [...digits];
    next[i] = char;
    const joined = next.join('');
    onChange(joined);
    if (char && i < 5) inputs.current[i + 1]?.focus();
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    onChange(pasted);
    inputs.current[Math.min(pasted.length, 5)]?.focus();
  };

  return (
    <div className="otp-row">
      {Array.from({ length: 6 }).map((_, i) => (
        <input
          key={i}
          ref={(el) => (inputs.current[i] = el)}
          className="otp-cell"
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digits[i]}
          onChange={(e) => handleChange(i, e)}
          onKeyDown={(e) => handleKey(i, e)}
          onPaste={handlePaste}
        />
      ))}
    </div>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function Login() {
  const navigate  = useNavigate();
  const location  = useLocation();

  const [view, setView]       = useState(VIEWS.LOGIN);
  const [loading, setLoading] = useState(false);
  const [notice, setNotice]   = useState({ text: '', type: '' }); 

  // shared fields
  const [email, setEmail]         = useState('');
  const [password, setPassword]   = useState('');
  const [name, setName]           = useState('');
  const [otp, setOtp]             = useState('');
  const [newPass, setNewPass]     = useState('');
  const [confirmPass, setConfirm] = useState('');

  const notify = (text, type = 'error') => setNotice({ text, type });
  const clear  = () => setNotice({ text: '', type: '' });

  // ── Google callback (existing logic — untouched) ────────────────────────
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token  = params.get('token');
    if (token) {
      localStorage.setItem('token', token);
      notify('Welcome back! Login Successful.', 'success');
      setTimeout(() => navigate('/builder'), 800);
    }
  }, [location, navigate]);

  // ── Reset fields when switching views ───────────────────────────────────
  const goTo = (v) => { clear(); setOtp(''); setView(v); };

  // ── HANDLERS ────────────────────────────────────────────────────────────

  const handleLogin = async (e) => {
    e.preventDefault(); clear(); setLoading(true);
    try {
      const res = await post('/login', { email, password });
      localStorage.setItem('token', res.data.token);
      notify(`Welcome back, ${res.data.user.name}! 🎉`, 'success');
      setTimeout(() => navigate('/builder'), 700);
    } catch (err) {
      const d = err?.response?.data;
      if (d?.needsVerification) {
        notify('Please verify your email first.', 'error');
        setTimeout(() => goTo(VIEWS.VERIFY_EMAIL), 1200);
      } else {
        notify(errMsg(err));
      }
    } finally { setLoading(false); }
  };

  const handleRegister = async (e) => {
    e.preventDefault(); clear();
    if (!name.trim()) return notify('Please enter your full name.');
    if (password.length < 6) return notify('Password must be at least 6 characters.');
    setLoading(true);
    try {
      await post('/register', { name, email, password });
      notify('Account created! Check your email for the verification code.', 'success');
      setTimeout(() => goTo(VIEWS.VERIFY_EMAIL), 800);
    } catch (err) { notify(errMsg(err)); }
    finally { setLoading(false); }
  };

  const handleVerifyEmail = async (e) => {
    e.preventDefault(); clear();
    if (otp.length < 6) return notify('Please enter the full 6-digit code.');
    setLoading(true);
    try {
      const res = await post('/verify-otp', { email, otp });
      localStorage.setItem('token', res.data.token);
      notify('Email verified! Redirecting…', 'success');
      setTimeout(() => navigate('/builder'), 800);
    } catch (err) { notify(errMsg(err)); }
    finally { setLoading(false); }
  };

  const handleResendVerify = async () => {
    clear(); setLoading(true);
    try {
      await post('/resend-otp', { email });
      notify('New code sent to your email.', 'success');
    } catch (err) { notify(errMsg(err)); }
    finally { setLoading(false); }
  };

  const handleForgot = async (e) => {
    e.preventDefault(); clear(); setLoading(true);
    try {
      await post('/forgot-password', { email });
      notify('If this email exists, a reset code has been sent.', 'success');
      setTimeout(() => goTo(VIEWS.VERIFY_RESET), 800);
    } catch (err) { notify(errMsg(err)); }
    finally { setLoading(false); }
  };

  const handleVerifyReset = async (e) => {
    e.preventDefault(); clear();
    if (otp.length < 6) return notify('Please enter the full 6-digit code.');
    setLoading(true);
    try {
      await post('/verify-reset-otp', { email, otp });
      notify('Code verified. Set your new password.', 'success');
      setTimeout(() => goTo(VIEWS.NEW_PASSWORD), 700);
    } catch (err) { notify(errMsg(err)); }
    finally { setLoading(false); }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault(); clear();
    if (newPass.length < 6) return notify('Password must be at least 6 characters.');
    if (newPass !== confirmPass) return notify('Passwords do not match.');
    setLoading(true);
    try {
      await post('/reset-password', { email, otp, newPassword: newPass });
      notify('Password reset! You can now log in.', 'success');
      setTimeout(() => goTo(VIEWS.LOGIN), 1000);
    } catch (err) { notify(errMsg(err)); }
    finally { setLoading(false); }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${API}/google`;
  };

  // ── RENDER ────────────────────────────────────────────────────────────────

  const titles = {
    [VIEWS.LOGIN]:        { h: 'Welcome Back 👋', sub: 'Sign in to your account' },
    [VIEWS.SIGNUP]:       { h: 'Create Account ✨', sub: 'Join Smart CV Builder AI' },
    [VIEWS.VERIFY_EMAIL]: { h: 'Verify Your Email 📬', sub: `Code sent to ${email}` },
    [VIEWS.FORGOT]:       { h: 'Forgot Password 🔑', sub: 'We\'ll send you a reset code' },
    [VIEWS.VERIFY_RESET]: { h: 'Enter Reset Code 🔐', sub: `Code sent to ${email}` },
    [VIEWS.NEW_PASSWORD]: { h: 'New Password 🛡️', sub: 'Choose a strong password' },
  };

  const { h, sub } = titles[view];

  return (
    <div className="auth-bg">
      {/* animated background blobs */}
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />

      <div className="auth-container glass">
        {/* Logo / brand */}
        <div className="brand">
          <span className="brand-icon">🦾</span>
          <span className="brand-name">Smart CV Builder AI</span>
        </div>

        <h2 className="auth-title">{h}</h2>
        <p className="auth-sub">{sub}</p>

        {/* Notice */}
        {notice.text && (
          <div className={`notice ${notice.type}`}>
            {notice.type === 'success' ? '✅' : '⚠️'} {notice.text}
          </div>
        )}

        {/* ── LOGIN ── */}
        {view === VIEWS.LOGIN && (
          <form onSubmit={handleLogin} className="auth-form">
            <div className="field">
              <label>Email</label>
              <input type="email" placeholder="you@example.com" value={email}
                onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="field">
              <label>Password</label>
              <input type="password" placeholder="••••••••" value={password}
                onChange={(e) => setPassword(e.target.value)} required />
            </div>

            <button type="button" className="link-btn forgot-link"
              onClick={() => goTo(VIEWS.FORGOT)}>
              Forgot Password?
            </button>

            <button type="submit" className="primary-btn" disabled={loading}>
              {loading ? <span className="spinner" /> : 'Login'}
            </button>

            <div className="divider"><span>OR</span></div>

            <button type="button" className="google-btn" onClick={handleGoogleLogin}>
              <FcGoogle size={22} /> Continue with Google
            </button>

            <p className="auth-footer">
              Don't have an account?{' '}
              <span className="link-span" onClick={() => goTo(VIEWS.SIGNUP)}>Sign Up</span>
            </p>
          </form>
        )}

        {/* ── SIGN UP ── */}
        {view === VIEWS.SIGNUP && (
          <form onSubmit={handleRegister} className="auth-form">
            <div className="field">
              <label>Full Name</label>
              <input type="text" placeholder="John Doe" value={name}
                onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="field">
              <label>Email</label>
              <input type="email" placeholder="you@example.com" value={email}
                onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="field">
              <label>Password</label>
              <input type="password" placeholder="Min. 6 characters" value={password}
                onChange={(e) => setPassword(e.target.value)} required />
            </div>

            <button type="submit" className="primary-btn" disabled={loading}>
              {loading ? <span className="spinner" /> : 'Create Account'}
            </button>

            <div className="divider"><span>OR</span></div>

            <button type="button" className="google-btn" onClick={handleGoogleLogin}>
              <FcGoogle size={22} /> Continue with Google
            </button>

            <p className="auth-footer">
              Already have an account?{' '}
              <span className="link-span" onClick={() => goTo(VIEWS.LOGIN)}>Login</span>
            </p>
          </form>
        )}

        {/* ── VERIFY EMAIL OTP ── */}
        {view === VIEWS.VERIFY_EMAIL && (
          <form onSubmit={handleVerifyEmail} className="auth-form">
            <p className="otp-hint">Enter the 6-digit code we sent to your inbox.</p>
            <OtpInput value={otp} onChange={setOtp} />

            <button type="submit" className="primary-btn" disabled={loading || otp.length < 6}>
              {loading ? <span className="spinner" /> : 'Verify Email'}
            </button>

            <p className="auth-footer">
              Didn't receive it?{' '}
              <span className="link-span" onClick={handleResendVerify}>Resend Code</span>
            </p>
            <p className="auth-footer">
              <span className="link-span" onClick={() => goTo(VIEWS.LOGIN)}>← Back to Login</span>
            </p>
          </form>
        )}

        {/* ── FORGOT PASSWORD ── */}
        {view === VIEWS.FORGOT && (
          <form onSubmit={handleForgot} className="auth-form">
            <div className="field">
              <label>Email Address</label>
              <input type="email" placeholder="you@example.com" value={email}
                onChange={(e) => setEmail(e.target.value)} required />
            </div>

            <button type="submit" className="primary-btn" disabled={loading}>
              {loading ? <span className="spinner" /> : 'Send Reset Code'}
            </button>

            <p className="auth-footer">
              <span className="link-span" onClick={() => goTo(VIEWS.LOGIN)}>← Back to Login</span>
            </p>
          </form>
        )}

        {/* ── VERIFY RESET OTP ── */}
        {view === VIEWS.VERIFY_RESET && (
          <form onSubmit={handleVerifyReset} className="auth-form">
            <p className="otp-hint">Enter the 6-digit reset code from your email.</p>
            <OtpInput value={otp} onChange={setOtp} />

            <button type="submit" className="primary-btn" disabled={loading || otp.length < 6}>
              {loading ? <span className="spinner" /> : 'Verify Code'}
            </button>

            <p className="auth-footer">
              <span className="link-span" onClick={() => goTo(VIEWS.FORGOT)}>← Resend Code</span>
            </p>
          </form>
        )}

        {/* ── NEW PASSWORD ── */}
        {view === VIEWS.NEW_PASSWORD && (
          <form onSubmit={handleResetPassword} className="auth-form">
            <div className="field">
              <label>New Password</label>
              <input type="password" placeholder="Min. 6 characters" value={newPass}
                onChange={(e) => setNewPass(e.target.value)} required />
            </div>
            <div className="field">
              <label>Confirm Password</label>
              <input type="password" placeholder="Repeat password" value={confirmPass}
                onChange={(e) => setConfirm(e.target.value)} required />
            </div>

            <button type="submit" className="primary-btn" disabled={loading}>
              {loading ? <span className="spinner" /> : 'Reset Password'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
