"use client";

import * as React from "react";
import { useFiles } from "@/hooks/use-files";
import { useStore } from "@/store/use-store";
import { DriveFile } from "@/lib/drive";
import { FileItem } from "@/components/shared/file-item";
import { PreviewModal } from "@/components/shared/preview-modal";
import { ShareModal } from "@/components/shared/share-modal";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Fuse from "fuse.js";
import { AnimatePresence, motion } from "framer-motion";

export function FileExplorer() {
  const { data, isLoading, isError } = useFiles();
  const { viewMode, searchQuery, favorites, recentFiles } = useStore();

  const [selectedFile, setSelectedFile] = React.useState<DriveFile | null>(null);
  const [shareFile, setShareFile] = React.useState<DriveFile | null>(null);
  const [activeTab, setActiveTab] = React.useState("all");

  const filteredFiles = React.useMemo(() => {
    if (!data?.files) return [];
    
    let baseFiles = data.files;
    
    if (activeTab === "favorites") {
      baseFiles = baseFiles.filter(f => favorites.includes(f.id));
    } else if (activeTab === "recent") {
      baseFiles = recentFiles;
    }

    if (searchQuery.trim() !== '') {
      const fuse = new Fuse(baseFiles, {
        keys: ['name', 'mimeType'],
        threshold: 0.3,
      });
      return fuse.search(searchQuery).map(result => result.item);
    }
    
    return baseFiles;
  }, [data?.files, searchQuery, activeTab, favorites, recentFiles]);

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center text-destructive">
        <p>Failed to load files.</p>
        <p className="text-sm text-muted-foreground mt-2">Please check your configuration or try again later.</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-1 h-auto mb-6">
          <TabsTrigger value="all" className="rounded-lg py-2 px-4">All Files</TabsTrigger>
          <TabsTrigger value="favorites" className="rounded-lg py-2 px-4">Favorites</TabsTrigger>
          <TabsTrigger value="recent" className="rounded-lg py-2 px-4">Recent</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-0 outline-none">
          {isLoading ? (
            <FileExplorerSkeleton viewMode={viewMode} />
          ) : filteredFiles.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 text-center text-muted-foreground">
          <svg className="w-16 h-16 mb-4 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" />
          </svg>
          <p className="text-lg font-medium">No files found</p>
          {searchQuery && <p className="text-sm">We couldn't find anything matching "{searchQuery}"</p>}
        </div>
      ) : (
        <motion.div
          layout
          className={
            viewMode === "grid"
              ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
              : "flex flex-col space-y-2"
          }
        >
          <AnimatePresence>
            {filteredFiles.map((file) => (
              <FileItem
                key={file.id}
                file={file}
                viewMode={viewMode}
                onPreview={() => setSelectedFile(file)}
                onShare={() => setShareFile(file)}
                isFavorite={favorites.includes(file.id)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
        </TabsContent>
      </Tabs>

      {selectedFile && (
        <PreviewModal
          file={selectedFile}
          open={!!selectedFile}
          onOpenChange={(open) => !open && setSelectedFile(null)}
        />
      )}

      {shareFile && (
        <ShareModal
          file={shareFile}
          open={!!shareFile}
          onOpenChange={(open) => !open && setShareFile(null)}
        />
      )}
    </div>
  );
}

function FileExplorerSkeleton({ viewMode }: { viewMode: 'grid' | 'list' }) {
  if (viewMode === 'grid') {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-48 w-full rounded-2xl" />
        ))}
      </div>
    );
  }
  return (
    <div className="flex flex-col space-y-2">
      {Array.from({ length: 8 }).map((_, i) => (
        <Skeleton key={i} className="h-16 w-full rounded-xl" />
      ))}
    </div>
  );
}
