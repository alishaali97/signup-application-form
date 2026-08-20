const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Public client - used for signup/signin/signout (respects Supabase auth rules)
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Admin client - used for privileged server-side operations (verifying tokens, admin tasks)
const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

module.exports = { supabase, supabaseAdmin };
