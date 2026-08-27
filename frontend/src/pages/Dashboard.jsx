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
    <div className="glass-page">
      <div className="glass-orb orb-1" />
      <div className="glass-orb orb-2" />
      <div className="glass-orb orb-3" />

      <div className="glass-dashboard">
        <div className="glass-avatar-ring">
          <div className="glass-avatar">{initial}</div>
        </div>
        <h1>Welcome{fullName ? `, ${fullName.split(' ')[0]}` : ''}</h1>
        <p className="glass-subtitle">You're signed in</p>

        {error && <div className="glass-alert glass-alert-error">{error}</div>}

        {user && (
          <div className="glass-detail-list">
            <div className="glass-detail-row">
              <span className="glass-detail-label">Email</span>
              <span className="glass-detail-value">{user.email}</span>
            </div>
            {fullName && (
              <div className="glass-detail-row">
                <span className="glass-detail-label">Full name</span>
                <span className="glass-detail-value">{fullName}</span>
              </div>
            )}
            {phone && (
              <div className="glass-detail-row">
                <span className="glass-detail-label">Phone</span>
                <span className="glass-detail-value">{phone}</span>
              </div>
            )}
          </div>
        )}

        <button className="glass-btn glass-btn-outline" onClick={handleSignOut}>Sign out</button>
      </div>
    </div>
  );
}
