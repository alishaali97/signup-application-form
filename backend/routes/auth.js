const express = require('express');
const { supabase } = require('../supabaseClient');

const router = express.Router();

// POST /api/auth/signup
router.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) return res.status(400).json({ error: error.message });

  return res.status(201).json({
    message: 'Signup successful. Check your email if confirmation is required.',
    user: data.user,
  });
});

// POST /api/auth/signin
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return res.status(401).json({ error: error.message });

  return res.status(200).json({
    message: 'Signin successful',
    session: data.session, // contains access_token, refresh_token
    user: data.user,
  });
});

// POST /api/auth/signout
router.post('/signout', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Missing authorization header' });

  const token = authHeader.replace('Bearer ', '');
  const { error } = await supabase.auth.signOut(token);
  if (error) return res.status(400).json({ error: error.message });

  return res.status(200).json({ message: 'Signed out successfully' });
});

// GET /api/auth/me - verify token and return user (protected example)
router.get('/me', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Missing authorization header' });

  const token = authHeader.replace('Bearer ', '');
  const { data, error } = await supabase.auth.getUser(token);
  if (error) return res.status(401).json({ error: error.message });

  return res.status(200).json({ user: data.user });
});

module.exports = router;
