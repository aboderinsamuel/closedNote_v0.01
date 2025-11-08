"use client";

import { Suspense } from "react";
import { useState, useMemo, useEffect } from "react";
import {
  getAllPrompts,
  groupPromptsByCollection,
  filterPrompts,
} from "@/lib/promptData";
import { Prompt, PromptModel } from "@/lib/types";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Layout } from "@/components/Layout";
import { PromptCollection } from "@/components/PromptCollection";
import { UseCasesShowcase } from "@/components/UseCasesShowcase";

function HomeContent() {
  const [allPrompts, setAllPrompts] = useState<Prompt[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<{
    query: string;
    model: PromptModel | "";
  }>({ query: "", model: "" });
  const [activeCollection, setActiveCollection] = useState<
    string | undefined
  >();
  const [activeTag, setActiveTag] = useState<string | undefined>();

  useEffect(() => {
    const loadPrompts = () => {
      setAllPrompts(getAllPrompts());
    };

    loadPrompts();

    const handleFocus = () => {
      loadPrompts();
    };

    const urlParams = new URLSearchParams(window.location.search);
    const collection = urlParams.get("collection");
    if (collection) setActiveCollection(collection);
    const tag = urlParams.get("tag");
    if (tag) setActiveTag(tag);

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  useEffect(() => {
    setFilters((prev) => ({ ...prev, query: searchQuery }));
  }, [searchQuery]);

  const filteredPrompts = useMemo(() => {
    return filterPrompts(allPrompts, {
      query: filters.query || undefined,
      model: filters.model || undefined,
      collection: activeCollection,
      tag: activeTag,
    });
  }, [filters, allPrompts, activeCollection, activeTag]);

  const promptsByCollection = useMemo(() => {
    return groupPromptsByCollection(filteredPrompts);
  }, [filteredPrompts]);

  const collections = Object.keys(promptsByCollection).sort();

  return (
    <Layout
      header={
        <Header onSearch={setSearchQuery} promptCount={allPrompts.length} />
      }
      sidebar={
        allPrompts.length > 0 ? (
          <Sidebar prompts={allPrompts} activeTag={activeTag} />
        ) : null
      }
    >
      {allPrompts.length === 0 ? (
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="font-serif-title text-5xl font-normal text-neutral-900 dark:text-neutral-100 mb-4">
              closedNote
            </h1>
          </div>
          <UseCasesShowcase />
        </div>
      ) : (
        <div>
          {collections.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-neutral-500 dark:text-neutral-400">
                No prompts found matching your filters.
              </p>
            </div>
          ) : (
            <div>
              {collections.map((collection) => (
                <PromptCollection
                  key={collection}
                  collection={collection}
                  prompts={promptsByCollection[collection]}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </Layout>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
