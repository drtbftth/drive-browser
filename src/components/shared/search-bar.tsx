"use client";

import { useStore } from "@/store/use-store";
import { Search, Grid, List } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function SearchBar() {
  const { searchQuery, setSearchQuery, viewMode, setViewMode } = useStore();

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="w-5 h-5 text-muted-foreground" />
        </div>
        <Input
          type="text"
          className="w-full pl-10 pr-4 py-6 rounded-2xl border-border/50 bg-card/50 backdrop-blur-sm shadow-sm focus-visible:ring-primary/20 text-base"
          placeholder="Search files..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-2 bg-card/50 p-1 rounded-xl border border-border/50 backdrop-blur-sm shadow-sm self-end sm:self-auto">
        <Button
          variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
          size="icon"
          onClick={() => setViewMode('grid')}
          className="rounded-lg h-10 w-10"
        >
          <Grid className="w-5 h-5" />
          <span className="sr-only">Grid View</span>
        </Button>
        <Button
          variant={viewMode === 'list' ? 'secondary' : 'ghost'}
          size="icon"
          onClick={() => setViewMode('list')}
          className="rounded-lg h-10 w-10"
        >
          <List className="w-5 h-5" />
          <span className="sr-only">List View</span>
        </Button>
      </div>
    </div>
  );
}
