# Quick Start - Supabase Setup

## 🚀 5-Minute Setup

### 1. Create Supabase Project
1. Go to https://app.supabase.com
2. Click "New Project"
3. Name it `closednote` and choose a password
4. Wait ~2 minutes for provisioning

### 2. Get Credentials
1. Go to **Settings** → **API**
2. Copy:
   - Project URL
   - anon/public key

### 3. Configure Environment
```bash
# Copy the example file
cp .env.local.example .env.local

# Edit .env.local and add your credentials:
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...
```

### 4. Run Database Migration
1. Go to Supabase Dashboard → **SQL Editor**
2. Click "New Query"
3. Copy ALL of `supabase/migrations/001_initial_schema.sql`
4. Paste and click "Run"

### 5. Start Development
```bash
npm install
npm run dev
```

### 6. Test
1. Open http://localhost:3000
2. Click "Sign up"
3. Create an account
4. Start creating prompts!


