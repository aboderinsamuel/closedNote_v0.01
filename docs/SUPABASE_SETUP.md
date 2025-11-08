# Supabase Setup (short + friendly)

Here is the quick path to get Supabase talking to closedNote.

## 1. Spin up Supabase

- Sign in at https://app.supabase.com and create a project. Name, database password, and region are the only fields that really matter. Supabase takes a minute or two to provision the instance.

## 2. Grab the keys

- In **Settings → API** copy the **Project URL** and the **anon/public key**. These two values are the only secrets we need on the frontend.

## 3. Wire up `.env.local`

```bash
cp .env.example .env.local
```

Drop the two values into that file:

```
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

`.env.local` stays on your machine (it is already in `.gitignore`). Restart `npm run dev` after changing it so Next.js picks up the new values.

## 4. Run our migration script

1. Open Supabase **SQL Editor** → **New Query**.
2. Paste in `supabase/migrations/001_initial_schema.sql`.
3. Hit **Run**.

That script drops in three tables (`users`, `prompts`, `tags`), links them to Supabase Auth, and turns on Row Level Security so each person only sees their own prompts.

## 5. Smoke-test it

- Back in the repo, install and run the app:

```bash
npm install
npm run dev
```

- Visit http://localhost:3000, sign up with an email + password, and add a prompt. In the Supabase dashboard you should see the user in **Authentication → Users** and the prompt rows in **Table Editor**.

## What Row Level Security is doing

- Prompts: only the owner can read/write them (`user_id = auth.uid()`).
- Tags: follow the same rule because they join back to prompts.
- Users: each person only sees their own profile row.

Because the database enforces those rules you do not need extra filters in the React code.

## Troubleshooting cheatsheet

- **Cannot fetch** → double-check the URL/key in `.env.local`, then restart the dev server.
- **JWT expired** → log out/in; Supabase will refresh the session afterward.
- **No rows appearing** → confirm the migration ran and that you are logged in with the same account you expect.

## Ready for production?

- Add the two environment variables in your hosting platform (Vercel, Netlify, etc.).
- Turn on email confirmations in Supabase when you are ready for real users.
- Keep database credentials strong and back up the project if you are on a paid plan.

Need more depth? Hit the official docs:

- https://supabase.com/docs
- https://supabase.com/docs/guides/auth

That’s it—short and sweet. Happy building! 🎉
