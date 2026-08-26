import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMe, signOut } from '../lib/api';
import { useAuth } from '../lib/AuthContext';

export default function Dashboard() {
  const { session, setSession } = useAuth();
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!session) {
      navigate('/signin');
      return;
    }
    getMe(session.access_token)
      .then((data) => setUser(data.user))
      .catch((err) => setError(err.message));
  }, [session]);

  async function handleSignOut() {
    try {
      await signOut(session.access_token);
    } catch (e) {
      // proceed with local sign-out even if the server call fails
    }
    setSession(null);
    navigate('/signin');
  }

  const fullName = user?.user_metadata?.full_name;
  const phone = user?.user_metadata?.phone;
  const initial = (fullName || user?.email || '?').charAt(0).toUpperCase();

  return (
    <div className="dashboard-page">
      <nav className="topbar">
        <div className="topbar-brand">
          <div className="brand-mark small">A</div>
          <span>My App</span>
        </div>
        <button className="ghost-btn" onClick={handleSignOut}>Sign out</button>
      </nav>

      <div className="dashboard-content">
        <div className="profile-card">
          <div className="avatar">{initial}</div>
          <h1>Welcome{fullName ? `, ${fullName.split(' ')[0]}` : ''}</h1>
          <p className="dashboard-subtitle">Here's your account overview</p>

          {error && <div className="alert alert-error">{error}</div>}

          {user && (
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Email</span>
                <span className="info-value">{user.email}</span>
              </div>
              {fullName && (
                <div className="info-item">
                  <span className="info-label">Full name</span>
                  <span className="info-value">{fullName}</span>
                </div>
              )}
              {phone && (
                <div className="info-item">
                  <span className="info-label">Phone</span>
                  <span className="info-value">{phone}</span>
                </div>
              )}
              <div className="info-item">
                <span className="info-label">User ID</span>
                <span className="info-value mono">{user.id}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
