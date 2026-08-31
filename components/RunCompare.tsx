"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { PromptVersion, RunResult } from "@/lib/types";
import { supabase } from "@/lib/supabase";
import { getUserApiKey, getUserHfKey } from "@/lib/userApiKey";

interface RunCompareProps {
  promptId: string;
  currentTitle: string;
  currentContent: string;
  defaultModel: string;
}

interface SideOption {
  key: string;
  label: string;
  content: string;
}

const CURRENT_KEY = "current";

export function RunCompare({
  promptId,
  currentContent,
  defaultModel,
}: RunCompareProps) {
  const [versions, setVersions] = useState<PromptVersion[]>([]);
  const [versionsLoading, setVersionsLoading] = useState(true);

  const [sideA, setSideA] = useState<string>(CURRENT_KEY);
  const [sideB, setSideB] = useState<string>(CURRENT_KEY);
  const [input, setInput] = useState("");
  const [model, setModel] = useState(defaultModel || "gpt-4o-mini");

  const [running, setRunning] = useState(false);
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [resultA, setResultA] = useState<RunResult | null>(null);
  const [resultB, setResultB] = useState<RunResult | null>(null);
  const [errorA, setErrorA] = useState<string | null>(null);
  const [errorB, setErrorB] = useState<string | null>(null);

  useEffect(() => {
    const fetchVersions = async () => {
      setVersionsLoading(true);
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        const res = await fetch(`/api/prompts/${promptId}/versions`, {
          headers: session?.access_token
            ? { Authorization: `Bearer ${session.access_token}` }
            : {},
        });
        if (res.ok) {
          const data: PromptVersion[] = await res.json();
          setVersions(data);
          // Default to comparing the latest saved version against current.
          if (data.length > 0) setSideA(data[0].id);
        }
      } catch (err) {
        console.error("[RunCompare] Failed to fetch versions:", err);
      } finally {
        setVersionsLoading(false);
      }
    };
    fetchVersions();
  }, [promptId]);

  const options = useMemo<SideOption[]>(() => {
    const versionOptions = versions.map((v) => ({
      key: v.id,
      label: `v${v.versionNumber}`,
      content: v.content,
    }));
    return [{ key: CURRENT_KEY, label: "Current", content: currentContent }, ...versionOptions];
  }, [versions, currentContent]);

  const getContent = (key: string): string =>
    options.find((o) => o.key === key)?.content ?? currentContent;

  const runOne = async (content: string, token: string): Promise<RunResult> => {
    const res = await fetch("/api/run", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        promptContent: content,
        input: input.trim(),
        model: model.trim() || "gpt-4o-mini",
        userApiKey: getUserApiKey(),
        userHfKey: getUserHfKey(),
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || `Run failed (${res.status})`);
    return data as RunResult;
  };

  const handleRun = async () => {
    setErrorA(null);
    setErrorB(null);
    setResultA(null);
    setResultB(null);

    if (!getUserApiKey() && !getUserHfKey()) {
      setGlobalError("no-key");
      return;
    }
    setGlobalError(null);

    const {
      data: { session },
    } = await supabase.auth.getSession();
    const token = session?.access_token;
    if (!token) {
      setGlobalError("Your session expired. Please sign in again.");
      return;
    }

    setRunning(true);
    const [a, b] = await Promise.allSettled([
      runOne(getContent(sideA), token),
      runOne(getContent(sideB), token),
    ]);
    if (a.status === "fulfilled") setResultA(a.value);
    else setErrorA(a.reason instanceof Error ? a.reason.message : "Run failed");
    if (b.status === "fulfilled") setResultB(b.value);
    else setErrorB(b.reason instanceof Error ? b.reason.message : "Run failed");
    setRunning(false);
  };

  const selectStyle: React.CSSProperties = {
    padding: "6px 10px",
    fontSize: 12,
    fontWeight: 600,
    background: "var(--cn-bg-s2)",
    color: "var(--cn-text)",
    border: "1px solid var(--cn-border)",
    borderRadius: 8,
    outline: "none",
    cursor: "pointer",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Controls */}
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 11, color: "var(--cn-muted)", fontWeight: 600 }}>A</span>
          <select value={sideA} onChange={(e) => setSideA(e.target.value)} style={selectStyle} disabled={versionsLoading}>
            {options.map((o) => (
              <option key={o.key} value={o.key}>{o.label}</option>
            ))}
          </select>
        </div>
        <span style={{ fontSize: 12, color: "var(--cn-dim)" }}>vs</span>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 11, color: "var(--cn-muted)", fontWeight: 600 }}>B</span>
          <select value={sideB} onChange={(e) => setSideB(e.target.value)} style={selectStyle} disabled={versionsLoading}>
            {options.map((o) => (
              <option key={o.key} value={o.key}>{o.label}</option>
            ))}
          </select>
        </div>
        <input
          type="text"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          placeholder="model"
          style={{ ...selectStyle, cursor: "text", width: 150 }}
        />
        <button
          onClick={handleRun}
          disabled={running}
          style={{
            padding: "6px 16px",
            fontSize: 12,
            fontWeight: 700,
            background: "var(--cn-btn-bg)",
            color: "var(--cn-btn-tx)",
            border: "none",
            borderRadius: 8,
            cursor: running ? "default" : "pointer",
            opacity: running ? 0.6 : 1,
            transition: "opacity 0.15s",
          }}
        >
          {running ? "Running…" : "Run both"}
        </button>
      </div>

      {/* Optional test input */}
      <div>
        <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "var(--cn-text2)", marginBottom: 6 }}>
          Test input <span style={{ fontWeight: 400, color: "var(--cn-dim)" }}>(optional — leave blank to run each prompt as-is)</span>
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Text to feed both versions, e.g. the article to summarize"
          rows={2}
          style={{
            width: "100%",
            padding: "10px 12px",
            background: "var(--cn-bg-s1)",
            color: "var(--cn-text)",
            border: "1px solid var(--cn-border)",
            borderRadius: 8,
            fontSize: 13,
            lineHeight: 1.6,
            resize: "vertical",
            outline: "none",
            boxSizing: "border-box",
          }}
        />
      </div>

      {globalError === "no-key" ? (
        <div style={{ fontSize: 13, color: "var(--cn-muted)", padding: "10px 12px", background: "var(--cn-bg-s2)", border: "1px solid var(--cn-border-s)", borderRadius: 8 }}>
          Add your OpenAI or HuggingFace key in{" "}
          <Link href="/settings" style={{ color: "var(--cn-accent)", fontWeight: 600 }}>Settings</Link>{" "}
          to run prompts. Everything else works without a key.
        </div>
      ) : globalError ? (
        <div style={{ fontSize: 13, color: "#ef4444", padding: "10px 12px", background: "rgba(220,38,38,0.06)", border: "1px solid rgba(220,38,38,0.2)", borderRadius: 8 }}>
          {globalError}
        </div>
      ) : null}

      {/* Side-by-side outputs */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <OutputPanel label={`A · ${options.find((o) => o.key === sideA)?.label ?? ""}`} result={resultA} error={errorA} running={running} />
        <OutputPanel label={`B · ${options.find((o) => o.key === sideB)?.label ?? ""}`} result={resultB} error={errorB} running={running} />
      </div>
    </div>
  );
}

function OutputPanel({
  label,
  result,
  error,
  running,
}: {
  label: string;
  result: RunResult | null;
  error: string | null;
  running: boolean;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, minWidth: 0 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: "var(--cn-text2)" }}>{label}</span>
        {result && (
          <span style={{ fontSize: 10, color: "var(--cn-dim)", fontVariantNumeric: "tabular-nums" }}>
            {result.model} · {result.completionTokens ?? "?"} tok · {result.latencyMs}ms
          </span>
        )}
      </div>
      <div
        style={{
          minHeight: 120,
          padding: "12px 14px",
          background: "var(--cn-bg-s1)",
          border: `1px solid ${error ? "rgba(220,38,38,0.3)" : "var(--cn-border)"}`,
          borderRadius: 8,
          fontSize: 13,
          lineHeight: 1.7,
          whiteSpace: "pre-wrap",
          overflowX: "auto",
          color: error ? "#ef4444" : "var(--cn-text)",
        }}
      >
        {running && !result && !error ? (
          <span style={{ color: "var(--cn-dim)" }}>Running…</span>
        ) : error ? (
          error
        ) : result ? (
          result.output
        ) : (
          <span style={{ color: "var(--cn-dim)" }}>Output will appear here.</span>
        )}
      </div>
    </div>
  );
}
