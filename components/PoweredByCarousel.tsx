"use client";

import Image from "next/image";
import React from "react";

// Inline Supabase SVG to avoid external loading issues
const SupabaseLogo = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className="h-10 w-10"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5.474 2.132C3.54 1.273 1.273 3.09 2.132 5.026l7.474 16.842c.632 1.423 2.683 1.52 3.447.162l2.21-3.937 4.632-8.26c1.096-1.955-.315-4.36-2.53-4.36H13.25c-.74 0-1.414-.416-1.75-1.077l-1.37-2.63c-.314-.603-.81-1.058-1.655-1.594Z"
      fill="#3ECF8E"
    />
  </svg>
);

type Logo = {
  name: string;
  element: React.ReactNode;
};

const logos: Logo[] = [
    {
    name: "Tesseract.js",
    element: (
      <svg viewBox="0 0 128 128" fill="none" className="h-10 w-10">
        <circle cx="64" cy="64" r="60" stroke="#4B5563" strokeWidth="8" />
        <path d="M88 46 60 74l-16-16-8 8 24 24 36-36-8-8Z" fill="#10B981" />
      </svg>
    ),
  },
  {
    name: "Supabase",
    element: <SupabaseLogo />,
  },
  {
    name: "Next.js",
    element: (
      <Image
        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg"
        alt="Next.js"
        width={40}
        height={40}
        className="h-10 w-10 dark:invert"
        unoptimized
      />
    ),
  },
  {
    name: "React",
    element: (
      <Image
        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
        alt="React"
        width={40}
        height={40}
        className="h-10 w-10"
        unoptimized
      />
    ),
  },
  {
    name: "TypeScript",
    element: (
      <Image
        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"
        alt="TypeScript"
        width={40}
        height={40}
        className="h-10 w-10"
        unoptimized
      />
    ),
  },
    {
    name: "Hugging Face",
    element: (
      <Image
        src="https://huggingface.co/front/assets/huggingface_logo-noborder.svg"
        alt="Hugging Face"
        width={40}
        height={40}
        className="h-10 w-10"
        unoptimized
      />
    ),
  },
  {
    name: "Tailwind CSS",
    element: (
      <Image
        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg"
        alt="Tailwind CSS"
        width={40}
        height={40}
        className="h-10 w-10"
        unoptimized
      />
    ),
  },
  {
    name: "PostgreSQL",
    element: (
      <Image
        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg"
        alt="PostgreSQL"
        width={40}
        height={40}
        className="h-10 w-10"
        unoptimized
      />
    ),
  },
  {
    name: "Vercel",
    element: (
      <Image
        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg"
        alt="Vercel"
        width={40}
        height={40}
        className="h-10 w-10 dark:invert"
        unoptimized
      />
    ),
  },
];

export const PoweredByCarousel: React.FC = () => {
  // Duplicate logos array to create seamless infinite scroll effect
  const scrollLogos = [...logos, ...logos, ...logos];

  return (
    <div className="relative w-full overflow-hidden py-6">
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-neutral-50 via-transparent to-neutral-50 dark:from-neutral-950 dark:to-neutral-950" />
      <div
        className="flex animate-[marquee_30s_linear_infinite] whitespace-nowrap"
        aria-label="Technology stack logos scrolling"
      >
        {scrollLogos.map((logo, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center justify-center mx-8 group"
          >
            <div className="transition-transform group-hover:scale-110 drop-shadow-sm">
              {logo.element}
            </div>
            <span className="mt-2 text-xs font-medium text-neutral-500 dark:text-neutral-400">
              {logo.name}
            </span>
          </div>
        ))}
      </div>
      {/* subtle top border */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neutral-200 dark:via-neutral-800 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neutral-200 dark:via-neutral-800 to-transparent" />
      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
      `}</style>
    </div>
  );
};

export default PoweredByCarousel;
