import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signIn } from '../lib/api';
import { useAuth } from '../lib/AuthContext';

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
    <div className="split-page">
      <div className="brand-panel">
        <div className="brand-content">
          <div className="brand-mark">A</div>
          <h2>Welcome back</h2>
          <p>Sign in to continue to your dashboard and pick up right where you left off.</p>
          <ul className="brand-points">
            <li>Secure, encrypted authentication</li>
            <li>Your session, your data</li>
            <li>One click sign out, anytime</li>
          </ul>
        </div>
      </div>

      <div className="form-panel">
        <form className="form-card" onSubmit={handleSubmit}>
          <h1>Sign in</h1>
          <p className="form-subtitle">Enter your credentials to continue</p>

          {error && <div className="alert alert-error">{error}</div>}

          <div className="field-row">
            <label>
              Email address
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
            </label>
          </div>

          <div className="field-row">
            <label>
              Password
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </label>
          </div>

          <button type="submit" className="primary-btn" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign in'}
          </button>

          <p className="switch-link">No account? <Link to="/signup">Create one</Link></p>
        </form>
      </div>
    </div>
  );
}
