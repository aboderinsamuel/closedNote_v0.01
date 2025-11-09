# 🗒️ closedNote

> *"Because even ChatGPT forgets sometimes…"*

---

### 👋 What is closedNote?

closedNote is a simple web app for **saving, organizing, and re-using your best prompts**, built for *students, teachers, engineers, prompt engineers, prompt tutors, and even regular folks like my mum 😅.*

It's the one place you can finally dump all your fire prompts without digging through old chats or screenshots.
A calm home for all your creativity.

---

### 💡 The Story

I got tired of re-engineering my "perfect ChatGPT prompts" every time I needed a particular kind of answer.
Then my mum started doing the same thing (don't ask how she got into it 😭).
Then my grandma.
Then my classmates.

Meanwhile, prompt engineers were dropping crazy tips on X (Twitter) and Stack Overflow, but I had nowhere to store them neatly.

So, I built one.
That's what **closedNote** is all about, a small home to make **prompt saving easier for everyone**. 🙂🙂

Completely open source, open to contributions, and continuously improving.

---

### ⚙️ Tech Stack

| Part     | Tool / Framework                            |
| -------- | ------------------------------------------- |
| Frontend | Next.js + TailwindCSS                       |
| Backend  | Supabase (PostgreSQL + Auth + RLS)          |
| Hosting  | Vercel                                      |
| Auth     | Supabase Magic Links / Email                |
| Storage  | Browser localStorage + Supabase sync        |
| Database | Postgres tables: `users`, `prompts`, `tags` |

---

### 🖥️ Desktop View

![Desktop Screenshot 1](./screenshots/desktop1.png)

![Desktop Screenshot 2](./screenshots/desktop2.png)

![Desktop Screenshot 3](./screenshots/desktop3.png)

> clean, minimal, and distraction-free, because prompts deserve peace too 😌

---

### 📱 Mobile View

|                                                   |                                                   |
| ------------------------------------------------- | ------------------------------------------------- |
| ![Mobile Screenshot 1](./screenshots/mobile1.png) | ![Mobile Screenshot 2](./screenshots/mobile2.png) |

> fully responsive, works smoothly on mobile for on-the-go creativity

---

### 🗄️ Database Setup (Supabase + PostgreSQL)

closedNote runs on **Supabase**, which provides both authentication and secure cloud storage using **Row Level Security (RLS)**, meaning no one can see your notes but you.

#### 🧾 Example Schema Snippets

![SQL Screenshot 1](./screenshots/sql1.png)

![SQL Screenshot 2](./screenshots/sql2.png)

> Every user's data is tied to their `auth.uid()`. No mix-ups, no leaks.

---

### 🧠 Features

* 🏠 **Local + Cloud Storage**, works offline, syncs later
* 🔍 **Search & Filter**, find prompts in seconds
* 🏷️ **Tag System**, group prompts by category or mood
* 💾 **One-Click Copy**, paste straight into ChatGPT, Claude, Cursor, etc.
* 🔒 **Private by Default**, RLS ensures your data stays yours
* 🌍 **Open Source Forever**, fork it, remix it, teach with it

---

### 🧪 How to Run Locally

```bash
git clone https://github.com/aboderinsamuel/closedNote.git
cd closedNote
npm install
cp .env.example .env.local
# Add your Supabase keys inside .env.local
npm run dev
```

Then visit 👉 **[http://localhost:3000](http://localhost:3000)**

---

### 🚀 Deploy to Production

#### Quick Deploy with Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/aboderinsamuel/closedNote)

**Important Steps:**
1. Click the button above or go to [Vercel](https://vercel.com)
2. Import your forked repository
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy!

**After Deployment:**
- Go to your Supabase Dashboard → Authentication → URL Configuration
- Add your Vercel domain to **Redirect URLs**: `https://your-app.vercel.app/**`
- Update **Site URL** to: `https://your-app.vercel.app`

📖 **Detailed deployment guide:** See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)

---

### 🧰 Developer Notes

closedNote is **developer-friendly**:

* Uses clean React hooks and modular components
* Minimal Tailwind classes (no spaghetti CSS)
* Supabase client handles all Auth + DB calls
* Easy to self-host or extend

---

### 🔒 Security Highlights

* ✅ Row Level Security (RLS) enabled on all tables
* ✅ Auth via Supabase (JWT-secured)
* ✅ `.env.local` excluded from Git (already in `.gitignore`)
* ✅ HTTPS enforced on production (Vercel)
* ✅ Minimal data collection — only email + prompts

---

### 🧑🏽‍💻 Contributing

closedNote is **completely open source** and **open for amendments**.
The goal is to make prompt saving easier for *everyone*, not just developers.

If you've got ideas, dark mode, AI tag suggestions, team sharing, prompt history, whatever, you're welcome to hop in!

#### 📚 Contributing Resources

- **[Code of Conduct](./docs/CODE_OF_CONDUCT.md)** - Our community standards
- **[Roadmap](./docs/ROADMAP.md)** - Future features and project vision
- **[Release Strategy](./docs/RELEASES.md)** - How we ship updates
- **[Issue Templates](./.github/ISSUE_TEMPLATE/)** - Report bugs or request features
- **[Pull Request Template](./.github/PULL_REQUEST_TEMPLATE.md)** - Submit your changes

```bash
# Steps to contribute
1. Fork this repo 🍴
2. Create a branch (feature/my-new-idea)
3. Commit & push
4. Open a pull request 🚀
```

---

### 👨🏽‍🎓 About the Developer

Built by [**Samuel Aboderin**](https://github.com/aboderinsamuel),
Computer Engineering student at **UNILAG 🇳🇬**,
who just got tired of losing his prompts (and decided to fix it for everyone else too).

Reach me on [LinkedIn](https://www.linkedin.com/in/samuelaboderin).

---

### 🧾 License

MIT License, use it, remix it, or improve it.
Just don't lock it behind a paywall. 🙏🏽

---

**closedNote**, *because your prompts deserve better than browser history.* ✨
