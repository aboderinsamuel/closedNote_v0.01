import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import type { Database } from "@/lib/database.types";

// Always render fresh so publishing / unpublishing takes effect immediately
// and we never statically cache a prompt that was later made private.
export const dynamic = "force-dynamic";

interface PublicPrompt {
  id: string;
  title: string;
  content: string;
  model: string;
  collection: string;
  updated_at: string;
}

async function getPublicPrompt(id: string): Promise<PublicPrompt | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
  if (!url || !key) return null;

  const supabase = createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  // RLS only returns this row to the anonymous key when is_public = true.
  const { data, error } = await supabase
    .from("prompts")
    .select("id, title, content, model, collection, updated_at")
    .eq("id", id)
    .eq("is_public", true)
    .maybeSingle();

  if (error || !data) return null;
  return data as PublicPrompt;
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const prompt = await getPublicPrompt(params.id);
  if (!prompt) return { title: "Prompt not found · closedNote" };

  const description = prompt.content.replace(/\s+/g, " ").slice(0, 160);
  return {
    title: `${prompt.title} · closedNote`,
    description,
    openGraph: {
      title: prompt.title,
      description,
      type: "article",
    },
    twitter: {
      card: "summary",
      title: prompt.title,
      description,
    },
  };
}

const badgeStyle: React.CSSProperties = {
  padding: "3px 10px",
  background: "var(--cn-bg-s2)",
  border: "1px solid var(--cn-border-s)",
  color: "var(--cn-muted)",
  fontSize: 11,
  fontWeight: 600,
  borderRadius: 6,
};

export default async function PublicPromptPage({
  params,
}: {
  params: { id: string };
}) {
  const prompt = await getPublicPrompt(params.id);
  if (!prompt) notFound();

  return (
    <div style={{ minHeight: "100vh", background: "var(--cn-bg)", display: "flex", flexDirection: "column" }}>
      {/* Top bar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 24px", borderBottom: "1px solid var(--cn-border-s)" }}>
        <Link href="/" style={{ fontSize: 15, fontWeight: 800, color: "var(--cn-text)", textDecoration: "none", letterSpacing: "-0.02em" }}>
          closedNote
        </Link>
        <Link
          href="/signup"
          style={{ fontSize: 13, fontWeight: 600, color: "var(--cn-btn-tx)", background: "var(--cn-btn-bg)", padding: "7px 14px", borderRadius: 8, textDecoration: "none" }}
        >
          Try it free
        </Link>
      </div>

      {/* Content */}
      <div style={{ flex: 1, width: "100%", maxWidth: 680, margin: "0 auto", padding: "40px 24px" }}>
        <div style={{ background: "var(--cn-bg-card)", border: "1px solid var(--cn-border)", borderRadius: 16, boxShadow: "0 8px 32px rgba(0,0,0,0.08)", overflow: "hidden" }}>
          <div style={{ padding: "28px 28px 16px" }}>
            <h1 style={{ fontSize: 24, fontWeight: 900, color: "var(--cn-text)", letterSpacing: "-0.025em", lineHeight: 1.3 }}>
              {prompt.title}
            </h1>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8, padding: "0 28px 20px" }}>
            <span style={{ ...badgeStyle, textTransform: "capitalize" }}>{prompt.collection}</span>
            <span style={badgeStyle}>{prompt.model || "-"}</span>
          </div>

          <div style={{ margin: "0 20px 20px", borderRadius: 10, background: "var(--cn-bg-s1)", border: "1px solid var(--cn-border)", overflow: "hidden" }}>
            <pre style={{ padding: "16px 20px", fontSize: 15, fontFamily: "inherit", color: "var(--cn-text)", whiteSpace: "pre-wrap", overflowX: "auto", lineHeight: 1.75, margin: 0 }}>
              {prompt.content}
            </pre>
          </div>
        </div>

        {/* Made-with footer / soft CTA */}
        <div style={{ textAlign: "center", marginTop: 24, fontSize: 13, color: "var(--cn-muted)" }}>
          Shared with{" "}
          <Link href="/" style={{ color: "var(--cn-accent)", fontWeight: 600, textDecoration: "none" }}>
            closedNote
          </Link>
          {" · version control for your AI prompts"}
        </div>
      </div>
    </div>
  );
}
