import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signUp } from '../lib/api';

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
    <div className="split-page">
      <div className="brand-panel">
        <div className="brand-content">
          <div className="brand-mark">A</div>
          <h2>Join us today</h2>
          <p>Create an account to get started. It only takes a minute.</p>
          <ul className="brand-points">
            <li>Secure, encrypted authentication</li>
            <li>Fast and simple sign-up</li>
            <li>Your data stays private</li>
          </ul>
        </div>
      </div>

      <div className="form-panel">
        <form className="form-card" onSubmit={handleSubmit}>
          <h1>Create your account</h1>
          <p className="form-subtitle">Fill in your details below</p>

          {error && <div className="alert alert-error">{error}</div>}
          {message && <div className="alert alert-success">{message}</div>}

          <div className="field-row">
            <label>
              Full name
              <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Jane Doe" required />
            </label>
          </div>

          <div className="field-row">
            <label>
              Email address
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
            </label>
          </div>

          <div className="field-row">
            <label>
              Phone <span className="optional">(optional)</span>
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 555 000 0000" />
            </label>
          </div>

          <div className="field-row two-col">
            <label>
              Password
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
            </label>
            <label>
              Confirm password
              <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required minLength={6} />
            </label>
          </div>

          <button type="submit" className="primary-btn" disabled={loading}>
            {loading ? 'Creating account...' : 'Create account'}
          </button>

          <p className="switch-link">Already have an account? <Link to="/signin">Sign in</Link></p>
        </form>
      </div>
    </div>
  );
}
