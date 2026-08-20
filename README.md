# App

- `backend/` — Express API using Supabase for auth (signup/signin/signout)
- `frontend/` — React (Vite) app with signin/signup/dashboard(signout)

## Local setup
1. `cd backend && cp .env.example .env` then fill in Supabase values → `npm install && npm run dev`
2. `cd frontend && cp .env.example .env` then set `VITE_API_URL=http://localhost:5000/api` → `npm install && npm run dev`

See deployment steps provided separately for AWS EC2 + nginx + pm2 + Supabase.
