import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signUp } from '../lib/api';

function Icon({ path }) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d={path} />
    </svg>
  );
}

const ICONS = {
  user: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z',
  mail: 'M4 4h16v16H4V4Z M4 6l8 7 8-7',
  phone: 'M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.5 2.1L8 9.7a16 16 0 0 0 6.3 6.3l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.7 2Z',
  lock: 'M5 11h14v10H5V11Z M8 11V7a4 4 0 0 1 8 0v4',
};

export default function SignUp() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    setLoading(true);
    try {
      const data = await signUp(email, password, fullName, phone);
      setMessage(data.message);
      setTimeout(() => navigate('/signin'), 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="glass-page">
      <div className="glass-orb orb-1" />
      <div className="glass-orb orb-2" />
      <div className="glass-orb orb-3" />

      <div className="glass-card">
        <div className="glass-logo">◆</div>
        <h1>Create account</h1>
        <p className="glass-subtitle">Start your journey with us</p>

        {error && <div className="glass-alert glass-alert-error">{error}</div>}
        {message && <div className="glass-alert glass-alert-success">{message}</div>}

        <form onSubmit={handleSubmit}>
          <div className="glass-input">
            <span className="glass-icon"><Icon path={ICONS.user} /></span>
            <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Full name" required />
          </div>

          <div className="glass-input">
            <span className="glass-icon"><Icon path={ICONS.mail} /></span>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" required />
          </div>

          <div className="glass-input">
            <span className="glass-icon"><Icon path={ICONS.phone} /></span>
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone (optional)" />
          </div>

          <div className="glass-input">
            <span className="glass-icon"><Icon path={ICONS.lock} /></span>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required minLength={6} />
          </div>

          <div className="glass-input">
            <span className="glass-icon"><Icon path={ICONS.lock} /></span>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm password" required minLength={6} />
          </div>

          <button type="submit" className="glass-btn" disabled={loading}>
            {loading ? 'Creating account...' : 'Sign up'}
          </button>
        </form>

        <p className="glass-switch">Already have an account? <Link to="/signin">Sign in</Link></p>
      </div>
    </div>
  );
}
