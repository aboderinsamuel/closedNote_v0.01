"use client";

import React, { useState, useCallback } from "react";
import { Header } from "@/components/Header";
import { Layout } from "@/components/Layout";
import { usePrompts } from "@/lib/hooks/usePrompts";
import { useAuth } from "@/components/AuthProvider";
import { savePrompt } from "@/lib/promptData";
import { PromptModel } from "@/lib/types";

interface RefinementState {
  loading: boolean;
  error: string | null;
  answer: string;
}

export default function OCRPage() {
  const { prompts } = usePrompts();
  const { user } = useAuth();

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [ocrLoading, setOcrLoading] = useState(false);
  const [ocrError, setOcrError] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState("");
  const [mode, setMode] = useState<"printed" | "handwritten">("printed");
  const [chatState, setChatState] = useState<RefinementState>({
    loading: false,
    error: null,
    answer: "",
  });
  const [selectedModel, setSelectedModel] = useState<PromptModel>("zephyr");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOcrError(null);
    setExtractedText("");
    setChatState({ loading: false, error: null, answer: "" });
    const file = e.target.files?.[0] || null;
    setImageFile(file);
  };

  const runOCR = useCallback(async () => {
    if (!imageFile) return;
    setOcrLoading(true);
    setOcrError(null);
    setExtractedText("");
    try {
      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append("mode", mode);
      const res = await fetch("/api/ocr", {
        method: "POST",
        body: formData,
        cache: "no-store",
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "OCR failed");
      }
      if (data.text && data.text.trim()) {
        setExtractedText(data.text.trim());
      } else {
        throw new Error("Empty OCR result");
      }
    } catch (err) {
      console.warn("Online OCR failed, attempting offline fallback", err);
      // Offline fallback with tesseract.js
      try {
        const Tesseract = await import("tesseract.js");
        const result = await Tesseract.recognize(imageFile!, "eng", {
          logger: (m) => {
            if (m.status === "recognizing text") {
              // could add progress UI here
            }
          },
        });
        setExtractedText(result.data.text.trim());
      } catch (offlineErr) {
        setOcrError(
          offlineErr instanceof Error ? offlineErr.message : "Offline OCR error"
        );
      }
    } finally {
      setOcrLoading(false);
    }
  }, [imageFile, mode]);

  const refineWithChat = async () => {
    setChatState({ loading: true, error: null, answer: "" });
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: extractedText, model: selectedModel }),
        cache: "no-store",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Chat refinement failed");
      setChatState({ loading: false, error: null, answer: data.answer });
    } catch (err) {
      setChatState({
        loading: false,
        error: err instanceof Error ? err.message : "Unknown error",
        answer: "",
      });
    }
  };

  const saveRefined = async () => {
    const content = chatState.answer || extractedText;
    if (!content.trim() || !user) return;
    try {
      const now = new Date().toISOString();
      await savePrompt({
        id: crypto.randomUUID(),
        title: content.substring(0, 60) || "OCR Prompt", // naive title from content
        content,
        model: selectedModel,
        collection: "ocr",
        tags: ["ocr", mode],
        createdAt: now,
        updatedAt: now,
      });
      alert("Saved as prompt.");
    } catch (err) {
      alert(
        `Failed to save prompt: ${
          err instanceof Error ? err.message : "Unknown error"
        }`
      );
    }
  };

  return (
    <Layout header={<Header promptCount={prompts.length} />} sidebar={null}>
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
          OCR & Prompt Refinement
        </h1>
        {!user && (
          <div className="p-4 rounded-md bg-yellow-100 text-yellow-900 dark:bg-yellow-900/30 dark:text-yellow-200 text-sm">
            You are not logged in. Login to save extracted prompts.
          </div>
        )}
        <div className="space-y-4">
          <label className="block">
            <span className="text-sm mb-1 block">Upload image (JPEG/PNG)</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm"
            />
          </label>
          <div className="flex items-center gap-4 flex-wrap">
            <div>
              <label className="text-xs uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                Mode
              </label>
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value as any)}
                className="mt-1 px-3 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm"
              >
                <option value="printed">Printed</option>
                <option value="handwritten">Handwritten</option>
              </select>
            </div>
            <div>
              <label className="text-xs uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                Chat Model
              </label>
              <select
                value={selectedModel}
                onChange={(e) =>
                  setSelectedModel(e.target.value as PromptModel)
                }
                className="mt-1 px-3 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm"
              >
                <option value="zephyr">Zephyr</option>
                <option value="mixtral">Mixtral</option>
                <option value="mistral">Mistral (generic)</option>
              </select>
            </div>
          </div>
          <button
            disabled={!imageFile || ocrLoading}
            onClick={runOCR}
            className="px-4 py-2 rounded-full bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            {ocrLoading ? "Running OCR..." : "Extract Text"}
          </button>
          {ocrError && (
            <p className="text-sm text-red-600 dark:text-red-400">{ocrError}</p>
          )}
        </div>
        {extractedText && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Extracted Text
              </label>
              <textarea
                value={extractedText}
                onChange={(e) => setExtractedText(e.target.value)}
                rows={8}
                className="w-full px-3 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm font-mono"
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={refineWithChat}
                disabled={chatState.loading}
                className="px-4 py-2 rounded-full bg-neutral-800 text-white dark:bg-neutral-100 dark:text-neutral-900 text-sm disabled:opacity-50"
              >
                {chatState.loading ? "Refining..." : "Refine with Chat"}
              </button>
              <button
                onClick={saveRefined}
                disabled={!user || (!chatState.answer && !extractedText)}
                className="px-4 py-2 rounded-full bg-green-600 hover:bg-green-700 text-white text-sm disabled:opacity-50"
              >
                Save as Prompt
              </button>
            </div>
            {chatState.error && (
              <p className="text-sm text-red-600 dark:text-red-400">
                {chatState.error}
              </p>
            )}
            {chatState.answer && (
              <div>
                <label className="block text-sm font-medium mb-1">
                  Refined Prompt
                </label>
                <textarea
                  value={chatState.answer}
                  onChange={(e) =>
                    setChatState({ ...chatState, answer: e.target.value })
                  }
                  rows={8}
                  className="w-full px-3 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm font-mono"
                />
              </div>
            )}
          </div>
        )}
        <div className="prose dark:prose-invert max-w-none text-sm">
          <h2>How it works</h2>
          <ul>
            <li>
              Online OCR first calls Hugging Face TrOCR (printed or
              handwritten).
            </li>
            <li>
              If model is warming or fails, it falls back to offline Tesseract
              (English).
            </li>
            <li>
              Refinement sends the extracted text to a small chat model to
              produce a cleaner reusable prompt.
            </li>
            <li>You can edit either text area before saving.</li>
          </ul>
          <p className="italic">
            No cost: both OCR and chat use free Hugging Face Inference with a
            personal token.
          </p>
        </div>
      </div>
    </Layout>
  );
}
