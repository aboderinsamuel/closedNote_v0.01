"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { PromptForm } from "@/components/PromptForm";
import { Header } from "@/components/Header";
import { Layout } from "@/components/Layout";
import { getAllPrompts } from "@/lib/promptData";

export default function NewPromptPage() {
  const [promptCount, setPromptCount] = useState(0);

  useEffect(() => {
    setPromptCount(getAllPrompts().length);
  }, []);

  return (
    <Layout header={<Header promptCount={promptCount} />} sidebar={null}>
      <div className="max-w-2xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors mb-8"
        >
          ← Back
        </Link>
        <h1 className="text-2xl font-medium text-neutral-900 dark:text-neutral-100 mb-8">
          New prompt
        </h1>
        <PromptForm />
      </div>
    </Layout>
  );
}
