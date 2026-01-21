# Supabase Database Setup for Phase 1.5

## 🗄️ Profiles Table SQL Script

Copy and paste this into your Supabase SQL Editor to create the required table structure:

```sql
-- Create the profiles table
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('student', 'mentor')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Add helpful comments
COMMENT ON TABLE profiles IS 'User profiles with role information';
COMMENT ON COLUMN profiles.id IS 'Foreign key to auth.users';
COMMENT ON COLUMN profiles.email IS 'User email address';
COMMENT ON COLUMN profiles.name IS 'Full name of the user';
COMMENT ON COLUMN profiles.role IS 'User role: student or mentor';

-- Enable Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only read their own profile
CREATE POLICY "Users can read own profile"
  ON profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Policy: Users can only update their own profile
CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Policy: Service role can insert profiles (for signup flow)
CREATE POLICY "Service role can insert profiles"
  ON profiles
  FOR INSERT
  WITH CHECK (TRUE);

-- Create indexes for performance
CREATE INDEX idx_profiles_email ON profiles(email);
CREATE INDEX idx_profiles_role ON profiles(role);

-- Create a function to update updated_at automatically
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to call the function
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

---

## ✅ How to Apply

### Via Supabase Dashboard:

1. Go to [app.supabase.com](https://app.supabase.com)
2. Select your project
3. Go to **SQL Editor**
4. Click **New Query**
5. Paste the SQL above
6. Click **Run**

You should see: `Query executed successfully`

---

## 🔍 Verify Setup

After running the SQL, verify the table was created:

```sql
-- Check table exists
SELECT * FROM information_schema.tables
WHERE table_name = 'profiles';

-- Check columns
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'profiles';

-- Check Row Level Security is enabled
SELECT schemaname, tablename, rowsecurity
FROM pg_tables
WHERE tablename = 'profiles';
```

---

## 📝 Test the Setup

### 1. Create a Test User (Manual)

In Supabase Dashboard → Authentication → Users:

1. Click **Add User**
2. Enter email: `test@vorko.com`
3. Enter password: `TestPassword123`
4. Click **Create User**

### 2. Insert Test Profile

Run this in SQL Editor:

```sql
-- Get the user ID from auth.users first
SELECT id FROM auth.users WHERE email = 'test@vorko.com';

-- Insert profile (replace UUID with the id from above)
INSERT INTO profiles (id, email, name, role)
VALUES (
  'YOUR_USER_UUID_HERE',
  'test@vorko.com',
  'Test Student',
  'student'
);

-- Verify it was inserted
SELECT * FROM profiles WHERE email = 'test@vorko.com';
```

### 3. Test RLS Policies

```sql
-- As authenticated user (automatic in Supabase client)
-- Should see own profile
SELECT * FROM profiles WHERE email = 'test@vorko.com';

-- Should NOT see other profiles (RLS enforced)
SELECT * FROM profiles;  -- Will be empty or only show own profile
```

---

## 🎯 Demo Users Setup

Create these test users for development:

### Student Account

```sql
-- Run this after creating user in Auth Dashboard
INSERT INTO profiles (id, email, name, role)
SELECT id, email, 'Demo Student', 'student'
FROM auth.users
WHERE email = 'student@vorko.com';
```

### Mentor Account

```sql
-- Run this after creating user in Auth Dashboard
INSERT INTO profiles (id, email, name, role)
SELECT id, email, 'Demo Mentor', 'mentor'
FROM auth.users
WHERE email = 'mentor@vorko.com';
```

---

## 🔑 Enable Email Provider

Make sure Email authentication is enabled:

1. Go to **Authentication** → **Providers**
2. Click **Email**
3. Make sure "Email" is **Enabled**
4. Leave "Confirm email" OFF (for development)

---

## 📊 Profiles Table Schema

```
┌─────────────────────────────────────────┐
│            profiles                     │
├─────────────────────────────────────────┤
│ id              UUID (PK, FK)           │
│ email           TEXT (NOT NULL)         │
│ name            TEXT (NOT NULL)         │
│ role            TEXT (NOT NULL)         │
│                 CHECK: 'student'|'mentor'│
│ created_at      TIMESTAMP               │
│ updated_at      TIMESTAMP               │
├─────────────────────────────────────────┤
│ Indexes:                                │
│ - id (Primary Key)                      │
│ - email                                 │
│ - role                                  │
├─────────────────────────────────────────┤
│ RLS Policies:                           │
│ - SELECT: Users read own profile        │
│ - UPDATE: Users update own profile      │
│ - INSERT: Service role only             │
└─────────────────────────────────────────┘
```

---

## 🚨 Troubleshooting

### Profile not created after signup

- Check if `profiles` table exists
- Verify auth.users has the user
- Check RLS policies allow inserts

### Can't read profile after login

- Verify user has a profile record
- Check email matches auth.users
- Try running SELECT with id directly

### RLS policy blocking reads

- Ensure you're authenticated as the user
- Check the policy uses `auth.uid()`
- Verify policy has SELECT permission

### Signup fails silently

- Check Supabase logs
- Verify email provider is enabled
- Check password meets requirements (6+ chars)

---

## 🔐 Security Notes

✅ **RLS Enabled**: Users can only access their own data  
✅ **Foreign Key**: Profiles linked to auth.users  
✅ **Updated At**: Automatically maintained  
✅ **Email Index**: Fast lookups by email  
✅ **Role Check**: Only valid roles allowed

---

## ✅ Verification Checklist

- [ ] Profiles table created
- [ ] RLS policies applied
- [ ] Email provider enabled
- [ ] Test user created
- [ ] Profile inserted for test user
- [ ] Can query profile as authenticated user
- [ ] Cannot query other profiles (RLS blocks)
- [ ] Signup creates profile automatically

---

## 📚 Related Documentation

- [Full Auth Implementation](PHASE_1_5_AUTH_IMPLEMENTATION.md)
- [Quick Reference Guide](PHASE_1_5_QUICK_REFERENCE.md)
- [Architecture Diagrams](PHASE_1_5_ARCHITECTURE.md)

---

## 🎓 Next Steps

Once profiles table is set up:

1. ✅ Add Supabase credentials to `.env`
2. ✅ Start dev server: `npm run dev`
3. ✅ Test signup on `/signup`
4. ✅ Test login on `/login`
5. ✅ Verify session persists on refresh
6. ✅ Test role-based redirects

**You're ready for Phase 2!**
