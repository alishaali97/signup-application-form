import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signIn } from '../lib/api';
import { useAuth } from '../lib/AuthContext';

function Icon({ path }) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d={path} />
    </svg>
  );
}

const ICONS = {
  mail: 'M4 4h16v16H4V4Z M4 6l8 7 8-7',
  lock: 'M5 11h14v10H5V11Z M8 11V7a4 4 0 0 1 8 0v4',
};

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { setSession } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await signIn(email, password);
      setSession(data.session);
      navigate('/dashboard');
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
        <h1>Welcome back</h1>
        <p className="glass-subtitle">Sign in to your account</p>

        {error && <div className="glass-alert glass-alert-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="glass-input">
            <span className="glass-icon"><Icon path={ICONS.mail} /></span>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" required />
          </div>

          <div className="glass-input">
            <span className="glass-icon"><Icon path={ICONS.lock} /></span>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
          </div>

          <button type="submit" className="glass-btn" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <p className="glass-switch">No account? <Link to="/signup">Create one</Link></p>
      </div>
    </div>
  );
}
