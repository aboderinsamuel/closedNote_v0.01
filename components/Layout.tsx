"use client"

import { SparkleBackground } from "./SparkleBackground"
import { InfinityLogo } from "./InfinityLogo"

interface LayoutProps {
  children: React.ReactNode
  header?: React.ReactNode
  sidebar?: React.ReactNode
}

export function Layout({ children, header, sidebar }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 dark:bg-neutral-950 relative">
      <SparkleBackground />
      {header}
      <div className="flex-1 flex">
        {sidebar}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
      <InfinityLogo />
    </div>
  )
}
