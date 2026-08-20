const API_URL = import.meta.env.VITE_API_URL;

async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data;
}

export const signUp = (email, password) =>
  request('/auth/signup', { method: 'POST', body: JSON.stringify({ email, password }) });

export const signIn = (email, password) =>
  request('/auth/signin', { method: 'POST', body: JSON.stringify({ email, password }) });

export const signOut = (token) =>
  request('/auth/signout', { method: 'POST', headers: { Authorization: `Bearer ${token}` } });

export const getMe = (token) =>
  request('/auth/me', { headers: { Authorization: `Bearer ${token}` } });
