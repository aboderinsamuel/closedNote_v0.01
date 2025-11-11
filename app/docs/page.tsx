import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Layout } from "@/components/Layout";

// Prevent caching
export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Documentation | closedNote",
  description: "Project overview, architecture, and demo for closedNote.",
};

export default function DocsPage() {
  return (
    <Layout header={<Header promptCount={0} />} sidebar={null}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Hero */}
        <div className="mb-12">
          <h1 className="font-serif-title text-4xl sm:text-5xl font-normal text-neutral-900 dark:text-neutral-100 mb-4">
            Project Documentation
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400">
            Everything you need to know about closedNote: why it exists, how it
            works under the hood, and what makes it special.
          </p>
        </div>

        {/* Tech Stack Logos */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-6 text-center">
            Built With Modern Tech
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 items-center justify-items-center">
            <div className="flex flex-col items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg"
                alt="Next.js"
                className="w-16 h-16 dark:invert"
              />
              <span className="text-xs text-neutral-600 dark:text-neutral-400">
                Next.js
              </span>
            </div>
            <div className="flex flex-col items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
                alt="React"
                className="w-16 h-16"
              />
              <span className="text-xs text-neutral-600 dark:text-neutral-400">
                React
              </span>
            </div>
            <div className="flex flex-col items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"
                alt="TypeScript"
                className="w-16 h-16"
              />
              <span className="text-xs text-neutral-600 dark:text-neutral-400">
                TypeScript
              </span>
            </div>
            <div className="flex flex-col items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg"
                alt="PostgreSQL"
                className="w-16 h-16"
              />
              <span className="text-xs text-neutral-600 dark:text-neutral-400">
                PostgreSQL
              </span>
            </div>
            <div className="flex flex-col items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg"
                alt="Tailwind CSS"
                className="w-16 h-16"
              />
              <span className="text-xs text-neutral-600 dark:text-neutral-400">
                Tailwind
              </span>
            </div>
            <div className="flex flex-col items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://supabase.com/brand-assets/supabase-logo-icon.svg"
                alt="Supabase"
                className="w-16 h-16"
              />
              <span className="text-xs text-neutral-600 dark:text-neutral-400">
                Supabase
              </span>
            </div>
            <div className="flex flex-col items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://huggingface.co/front/assets/huggingface_logo-noborder.svg"
                alt="Hugging Face"
                className="w-16 h-16"
              />
              <span className="text-xs text-neutral-600 dark:text-neutral-400">
                Hugging Face
              </span>
            </div>
            <div className="flex flex-col items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg"
                alt="Vercel"
                className="w-16 h-16 dark:invert"
              />
              <span className="text-xs text-neutral-600 dark:text-neutral-400">
                Vercel
              </span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <svg
                className="w-16 h-16"
                viewBox="0 0 128 128"
                fill="currentColor"
              >
                <path
                  d="M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64 64-28.7 64-64S99.3 0 64 0zm0 120C33.1 120 8 94.9 8 64S33.1 8 64 8s56 25.1 56 56-25.1 56-56 56z"
                  className="text-neutral-400"
                />
                <path
                  d="M85.3 42.7l-32 32-14.6-14.6-5.7 5.7 20.3 20.3 37.7-37.7z"
                  className="text-green-500"
                />
              </svg>
              <span className="text-xs text-neutral-600 dark:text-neutral-400">
                Tesseract.js
              </span>
            </div>
          </div>
        </section>

        <div className="space-y-16">
          {/* Why This Exists */}
          <section>
            <h2 className="text-3xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
              Why closedNote?
            </h2>
            <div className="space-y-4 text-neutral-700 dark:text-neutral-300">
              <p>
                I built closedNote because I was tired of losing my best
                prompts. You know that feeling when you craft the perfect
                ChatGPT prompt, get amazing results, then two weeks later
                you&apos;re desperately scrolling through chat history trying to
                find it again? Yeah, that.
              </p>
              <p>
                Then I noticed my classmates doing the same thing. Then my mum
                (don&apos;t ask how she got into AI prompts). Then my grandma.
                Meanwhile, prompt engineers on Twitter were dropping fire tips,
                and I had nowhere to save them properly.
              </p>
              <p>
                So I built one place for all of it. A calm, focused space where
                your prompts live, organized and ready to use. No distractions,
                no subscriptions, just you and your creativity.
              </p>
            </div>
          </section>

          {/* Architecture Overview */}
          <section>
            <h2 className="text-3xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
              How It Works
            </h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Frontend */}
                <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 p-6">
                  <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                    Frontend
                  </h3>
                  <ul className="space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
                    <li>
                      <span className="font-medium">Next.js 14</span> with App
                      Router for server-side rendering
                    </li>
                    <li>
                      <span className="font-medium">React 18</span> with hooks
                      and client components
                    </li>
                    <li>
                      <span className="font-medium">TailwindCSS</span> for
                      styling (no spaghetti CSS)
                    </li>
                    <li>
                      <span className="font-medium">TypeScript</span> for type
                      safety
                    </li>
                  </ul>
                </div>

                {/* Backend */}
                <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 p-6">
                  <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                    Backend
                  </h3>
                  <ul className="space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
                    <li>
                      <span className="font-medium">Supabase</span> for
                      PostgreSQL database
                    </li>
                    <li>
                      <span className="font-medium">Auth</span> via Supabase
                      (email + JWT)
                    </li>
                    <li>
                      <span className="font-medium">RLS</span> (Row Level
                      Security) on all tables
                    </li>
                    <li>
                      <span className="font-medium">Hugging Face</span> for AI
                      OCR and chat models
                    </li>
                    <li>
                      <span className="font-medium">Real-time sync</span>{" "}
                      between devices
                    </li>
                  </ul>
                </div>
              </div>

              {/* Data Flow */}
              <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20 p-6">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                  Data Flow (Simple Version)
                </h3>
                <ol className="space-y-3 text-neutral-700 dark:text-neutral-300">
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-yellow-400 text-neutral-900 text-sm font-semibold">
                      1
                    </span>
                    <span>
                      You sign in, Supabase creates a session and stores it
                      securely
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-yellow-400 text-neutral-900 text-sm font-semibold">
                      2
                    </span>
                    <span>
                      Prompts load from PostgreSQL using{" "}
                      <code className="px-1.5 py-0.5 rounded bg-neutral-900 dark:bg-neutral-800 text-neutral-100 text-xs">
                        usePrompts()
                      </code>{" "}
                      hook
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-yellow-400 text-neutral-900 text-sm font-semibold">
                      3
                    </span>
                    <span>
                      Search across everything with Cmd/Ctrl+K (global search
                      palette)
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-yellow-400 text-neutral-900 text-sm font-semibold">
                      4
                    </span>
                    <span>
                      Create, edit, or delete prompts with instant UI updates
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-yellow-400 text-neutral-900 text-sm font-semibold">
                      5
                    </span>
                    <span>
                      Everything syncs to the cloud, accessible from any device
                    </span>
                  </li>
                </ol>
              </div>
            </div>
          </section>

          {/* OCR Feature */}
          <section>
            <h2 className="text-3xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
              🖼️ Image to Text (OCR)
            </h2>
            <div className="space-y-6">
              <p className="text-neutral-700 dark:text-neutral-300">
                Ever screenshot a great prompt from Twitter or Discord and then
                have to retype the whole thing? That&apos;s over. closedNote can
                read text from images and turn them into prompts instantly.
              </p>

              {/* How It Works */}
              <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 p-6">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                  How It Works
                </h3>
                <ol className="space-y-3 text-neutral-700 dark:text-neutral-300">
                  <li>
                    • You upload an image (screenshot, photo, handwritten notes)
                  </li>
                  <li>
                    • The app tries to send it to{" "}
                    <span className="font-medium">Hugging Face OCR API</span>{" "}
                    (our planned primary engine)
                  </li>
                  <li>
                    • If that fails or isn&apos;t configured, it falls back to{" "}
                    <span className="font-medium">Tesseract.js</span> running
                    locally in your browser
                  </li>
                  <li>
                    • The extracted text shows up. You can edit it if needed.
                  </li>
                  <li>
                    • One click saves it as a prompt in your library, tagged
                    with &quot;ocr&quot;
                  </li>
                </ol>
              </div>

              {/* Current Status */}
              <div className="rounded-xl border border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950/20 p-6">
                <h3 className="text-lg font-semibold text-orange-900 dark:text-orange-100 mb-3">
                  ⚡ Current Status
                </h3>
                <p className="text-orange-800 dark:text-orange-200 mb-3">
                  Right now, <span className="font-semibold">Tesseract.js</span>{" "}
                  is the stable workhorse doing most of the heavy lifting. The
                  Hugging Face integration is built and ready, but we&apos;re
                  still working through some API hiccups on their end.
                </p>
                <p className="text-orange-800 dark:text-orange-200">
                  The cool part? The code is structured with a{" "}
                  <span className="font-semibold">primary + fallback</span>{" "}
                  mindset. When Hugging Face stabilizes, everything will
                  seamlessly switch over. Until then, Tesseract handles it
                  beautifully (and it works offline too, which is a nice bonus).
                </p>
              </div>

              {/* Technical Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-4">
                  <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                    Online Mode (Hugging Face)
                  </h4>
                  <ul className="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
                    <li>• Microsoft TrOCR models</li>
                    <li>• Handles printed + handwritten text</li>
                    <li>• Fast, accurate, multilingual</li>
                    <li>• Free API (no billing required)</li>
                  </ul>
                </div>
                <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-4">
                  <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                    Offline Mode (Tesseract)
                  </h4>
                  <ul className="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
                    <li>• Runs 100% in your browser</li>
                    <li>• No internet needed</li>
                    <li>• No server calls, totally private</li>
                    <li>• Works even if APIs are down</li>
                  </ul>
                </div>
              </div>

              {/* Why This Architecture */}
              <div className="rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/20 p-6">
                <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
                  Why This Architecture Matters
                </h3>
                <p className="text-blue-800 dark:text-blue-200">
                  Most apps pick one OCR engine and call it a day. If it&apos;s
                  down, you&apos;re stuck. We built closedNote with{" "}
                  <span className="font-semibold">
                    no single point of failure
                  </span>
                  . Hugging Face down? Tesseract takes over. Offline on a plane?
                  Still works. Bad internet? No problem. Your workflow never
                  stops.
                </p>
              </div>
            </div>
          </section>

          {/* Security & Privacy */}
          <section>
            <h2 className="text-3xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
              🔒 Security & Privacy
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-lg border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/20 p-4">
                <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2 flex items-center gap-2">
                  <span>✓</span> Row Level Security (RLS)
                </h4>
                <p className="text-sm text-green-800 dark:text-green-200">
                  Every prompt is tied to your user ID. No one can see your data
                  but you.
                </p>
              </div>
              <div className="rounded-lg border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/20 p-4">
                <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2 flex items-center gap-2">
                  <span>✓</span> JWT Authentication
                </h4>
                <p className="text-sm text-green-800 dark:text-green-200">
                  Secure token-based auth via Supabase. No passwords stored
                  locally.
                </p>
              </div>
              <div className="rounded-lg border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/20 p-4">
                <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2 flex items-center gap-2">
                  <span>✓</span> HTTPS Everywhere
                </h4>
                <p className="text-sm text-green-800 dark:text-green-200">
                  All connections encrypted. Enforced on production (Vercel).
                </p>
              </div>
              <div className="rounded-lg border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/20 p-4">
                <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2 flex items-center gap-2">
                  <span>✓</span> Minimal Data Collection
                </h4>
                <p className="text-sm text-green-800 dark:text-green-200">
                  We only store your email and prompts. That&apos;s it. No
                  tracking, no analytics.
                </p>
              </div>
            </div>
          </section>

          {/* Database Schema */}
          <section>
            <h2 className="text-3xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
              🗄️ Database Structure
            </h2>
            <div className="space-y-4">
              <p className="text-neutral-700 dark:text-neutral-300">
                Three simple tables. That&apos;s all we need.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-4">
                  <h4 className="font-mono text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                    users
                  </h4>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400">
                    Links to Supabase auth. Stores email and creation date.
                  </p>
                </div>
                <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-4">
                  <h4 className="font-mono text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                    prompts
                  </h4>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400">
                    Your actual prompts. Title, content, collection, model,
                    user_id.
                  </p>
                </div>
                <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-4">
                  <h4 className="font-mono text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                    tags
                  </h4>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400">
                    Many-to-many relationship. Prompts can have multiple tags.
                  </p>
                </div>
              </div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                RLS policies ensure your prompts are only visible to you.
                Deleting a user cascades to all their prompts and tags
                automatically.
              </p>
            </div>
          </section>

          {/* Developer Notes */}
          <section>
            <h2 className="text-3xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
              🧑‍💻 Developer Notes
            </h2>
            <div className="space-y-4 text-neutral-700 dark:text-neutral-300">
              <p>
                closedNote is built to be{" "}
                <span className="font-semibold">developer-friendly</span>. Clean
                React hooks, modular components, minimal Tailwind classes (no
                spaghetti CSS), and straightforward Supabase calls.
              </p>
              <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 p-4">
                <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                  Key Files
                </h4>
                <ul className="space-y-2 text-sm font-mono">
                  <li>
                    <span className="text-yellow-600 dark:text-yellow-400">
                      lib/hooks/usePrompts.ts
                    </span>{" "}
                    - Data fetching logic
                  </li>
                  <li>
                    <span className="text-yellow-600 dark:text-yellow-400">
                      lib/promptData.ts
                    </span>{" "}
                    - CRUD operations
                  </li>
                  <li>
                    <span className="text-yellow-600 dark:text-yellow-400">
                      components/PromptForm.tsx
                    </span>{" "}
                    - Create/edit UI
                  </li>
                  <li>
                    <span className="text-yellow-600 dark:text-yellow-400">
                      app/api/ocr/route.ts
                    </span>{" "}
                    - OCR endpoint
                  </li>
                  <li>
                    <span className="text-yellow-600 dark:text-yellow-400">
                      lib/supabase.ts
                    </span>{" "}
                    - Database client
                  </li>
                </ul>
              </div>
              <p className="text-sm">
                Everything is TypeScript, so you get type safety and
                autocomplete out of the box. Easy to extend, easy to fork, easy
                to self-host.
              </p>
            </div>
          </section>

          {/* Deployment */}
          <section>
            <h2 className="text-3xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
              🚀 Deployment
            </h2>
            <div className="space-y-4">
              <p className="text-neutral-700 dark:text-neutral-300">
                closedNote is optimized for{" "}
                <span className="font-semibold">Vercel</span>, but you can host
                it anywhere that supports Next.js.
              </p>
              <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-6 space-y-4">
                <h4 className="font-semibold text-neutral-900 dark:text-neutral-100">
                  Quick Steps:
                </h4>
                <ol className="space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
                  <li>1. Fork this repo</li>
                  <li>2. Connect to Vercel (or your hosting platform)</li>
                  <li>
                    3. Add environment variables:
                    <ul className="ml-6 mt-2 space-y-1 text-xs font-mono text-neutral-600 dark:text-neutral-400">
                      <li>• NEXT_PUBLIC_SUPABASE_URL</li>
                      <li>• NEXT_PUBLIC_SUPABASE_ANON_KEY</li>
                      <li>• HUGGINGFACE_API_KEY (optional for OCR)</li>
                    </ul>
                  </li>
                  <li>4. Deploy!</li>
                  <li>5. Update Supabase redirect URLs to your domain</li>
                </ol>
              </div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                See{" "}
                <Link
                  href="/docs"
                  className="underline decoration-yellow-400 underline-offset-2"
                >
                  VERCEL_DEPLOYMENT.md
                </Link>{" "}
                for detailed instructions.
              </p>
            </div>
          </section>

          {/* Contributing */}
          <section>
            <h2 className="text-3xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
              🤝 Contributing
            </h2>
            <div className="space-y-4 text-neutral-700 dark:text-neutral-300">
              <p>
                closedNote is{" "}
                <span className="font-semibold">completely open source</span>{" "}
                and open for contributions. Whether you&apos;re a student, a
                senior engineer, or somewhere in between, you&apos;re welcome
                here.
              </p>
              <div className="rounded-xl border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-950/20 p-6">
                <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-3">
                  Ideas We&apos;d Love Help With:
                </h4>
                <ul className="space-y-2 text-purple-800 dark:text-purple-200">
                  <li>• Dark mode improvements</li>
                  <li>• AI-powered tag suggestions</li>
                  <li>• Team sharing features</li>
                  <li>• Prompt version history</li>
                  <li>• Export to PDF/Markdown</li>
                  <li>• Browser extension</li>
                </ul>
              </div>
              <p className="text-sm">
                Check out{" "}
                <Link
                  href="https://github.com/aboderinsamuel/closedNote"
                  className="underline decoration-yellow-400 underline-offset-2"
                >
                  CODE_OF_CONDUCT.md
                </Link>{" "}
                and the issue tracker to get started.
              </p>
            </div>
          </section>

          {/* Footer Links */}
          <section className="border-t border-neutral-200 dark:border-neutral-800 pt-8">
            <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
              Quick Links
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <Link
                href="/"
                className="text-neutral-700 dark:text-neutral-300 hover:text-yellow-600 dark:hover:text-yellow-400 underline decoration-yellow-400 underline-offset-2"
              >
                → Home
              </Link>
              <Link
                href="/prompts/new"
                className="text-neutral-700 dark:text-neutral-300 hover:text-yellow-600 dark:hover:text-yellow-400 underline decoration-yellow-400 underline-offset-2"
              >
                → Create Prompt
              </Link>
              <Link
                href="/ocr"
                className="text-neutral-700 dark:text-neutral-300 hover:text-yellow-600 dark:hover:text-yellow-400 underline decoration-yellow-400 underline-offset-2"
              >
                → OCR Feature
              </Link>
              <Link
                href="/settings"
                className="text-neutral-700 dark:text-neutral-300 hover:text-yellow-600 dark:hover:text-yellow-400 underline decoration-yellow-400 underline-offset-2"
              >
                → Settings
              </Link>
              <Link
                href="https://github.com/aboderinsamuel/closedNote"
                className="text-neutral-700 dark:text-neutral-300 hover:text-yellow-600 dark:hover:text-yellow-400 underline decoration-yellow-400 underline-offset-2"
              >
                → GitHub Repo
              </Link>
              <Link
                href="https://www.linkedin.com/in/samuelaboderin"
                className="text-neutral-700 dark:text-neutral-300 hover:text-yellow-600 dark:hover:text-yellow-400 underline decoration-yellow-400 underline-offset-2"
              >
                → Contact
              </Link>
            </div>
          </section>

          {/* Final Note */}
          <section className="rounded-2xl border-2 border-yellow-400 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/30 dark:to-orange-950/30 p-8 text-center">
            <p className="text-lg text-neutral-800 dark:text-neutral-200 mb-2">
              <span className="font-semibold">closedNote</span> is built with
              care by{" "}
              <Link
                href="https://github.com/aboderinsamuel"
                className="underline decoration-yellow-400 underline-offset-2 font-semibold"
              >
                Samuel Aboderin
              </Link>
            </p>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Computer Engineering student at UNILAG 🇳🇬
            </p>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-4">
              Because your prompts deserve better than browser history. ✨
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
}
