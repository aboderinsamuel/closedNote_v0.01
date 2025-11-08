import Link from "next/link";

const useCases = [
  {
    title: "Code & Development",
    description:
      "Save prompts for code reviews, debugging, and architecture discussions.",
  },
  {
    title: "Writing & Content",
    description:
      "Store your best prompts for blog posts, emails, and creative writing.",
  },
  {
    title: "Analysis & Research",
    description:
      "Keep prompts for data analysis, research summaries, and insights.",
  },
  {
    title: "Communication",
    description:
      "Organize prompts for professional emails, messages, and presentations.",
  },
];

export function UseCasesShowcase() {
  return (
    <div>
      <div className="flex items-start justify-between mb-12 max-w-xl mx-auto w-full">
        <p className="text-lg text-neutral-600 dark:text-neutral-400 mr-6">
          Your personal vault for AI prompts. Save, organize, and never lose
          your best prompts again.
        </p>
        <Link
          href="/prompts/new"
          className="inline-flex shrink-0 items-center px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:hover:bg-neutral-200 dark:text-neutral-900 text-white font-medium rounded-full transition-colors text-sm"
        >
          + First prompt
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 max-w-2xl mx-auto text-left">
        {useCases.map((useCase) => (
          <div
            key={useCase.title}
            className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg p-5"
          >
            <h3 className="font-medium text-neutral-900 dark:text-neutral-100 mb-2">
              {useCase.title}
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              {useCase.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
