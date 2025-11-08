"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { getPromptById, getAllPrompts } from "@/lib/promptData";
import { Prompt } from "@/lib/types";
import { PromptDetail } from "@/components/PromptDetail";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Layout } from "@/components/Layout";

export default function PromptPage({ params }: { params: { id: string } }) {
  const [prompt, setPrompt] = useState<Prompt | undefined>(undefined);
  const [allPrompts, setAllPrompts] = useState<Prompt[]>([]);

  useEffect(() => {
    const foundPrompt = getPromptById(params.id);
    setPrompt(foundPrompt);
    setAllPrompts(getAllPrompts());
  }, [params.id]);

  if (prompt === undefined) {
    return null;
  }

  if (!prompt) {
    notFound();
  }

  return (
    <Layout
      header={<Header promptCount={allPrompts.length} />}
      sidebar={<Sidebar prompts={allPrompts} activeTag={prompt.collection} />}
    >
      <div className="max-w-2xl mx-auto">
        <PromptDetail prompt={prompt} />
      </div>
    </Layout>
  );
}
