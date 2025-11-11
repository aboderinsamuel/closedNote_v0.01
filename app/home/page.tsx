"use client";

import { UseCasesShowcase } from "@/components/UseCasesShowcase";
import { PoweredByCarousel } from "@/components/PoweredByCarousel";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Layout } from "@/components/Layout";
import { usePrompts } from "@/lib/hooks/usePrompts";

export default function MarketingHome() {
  const { prompts } = usePrompts();
  return (
    <Layout header={<Header promptCount={prompts.length} />} sidebar={null}>
      <div className="max-w-3xl mx-auto py-8">
        <div className="text-center mb-10">
          <h1 className="font-serif-title text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-neutral-900 dark:text-neutral-100 mb-4">
            closedNote
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto">
            Your personal prompt notebook. Create, organize, and refine AI
            prompts with speed and clarity.
          </p>
        </div>
        <div className="mb-8">
          <div className="text-center mb-2 text-xs uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
            Powered by
          </div>
          <PoweredByCarousel />
        </div>
        <UseCasesShowcase />
      </div>
    </Layout>
  );
}
