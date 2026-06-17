"use client";

import { Hero } from "@/components/shared/hero";
import { StatsCards } from "@/components/shared/stats-cards";
import { SearchBar } from "@/components/shared/search-bar";
import { FileExplorer } from "@/components/shared/file-explorer";
import { ThemeToggle } from "@/components/shared/theme-toggle";

export default function Home() {
  return (
    <div className="min-h-screen pb-20">
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-7xl">
          <div className="flex items-center gap-2 font-semibold text-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6 text-blue-500"
            >
              <path d="M2 12l5.25 5 2.625-3 2.625 3L22 12" />
              <path d="M4 12l3 5" />
              <path d="M20 12l-3 5" />
            </svg>
            Drive Browser
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 max-w-7xl space-y-12 py-12">
        <Hero />
        <StatsCards />
        
        <div className="space-y-6">
          <div className="sticky top-20 z-40 bg-background/80 backdrop-blur-md py-4 -mx-4 px-4 sm:mx-0 sm:px-0">
            <SearchBar />
          </div>
          <FileExplorer />
        </div>
      </main>
    </div>
  );
}
