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

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      {error && <p className="error">{error}</p>}
      {user && <p>Signed in as <strong>{user.email}</strong></p>}
      <button onClick={handleSignOut}>Sign out</button>
    </div>
  );
}
