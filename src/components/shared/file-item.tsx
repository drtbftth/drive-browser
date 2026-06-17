"use client";

import * as React from "react";
import Image from "next/image";
import { DriveFile } from "@/lib/drive";
import { useStore } from "@/store/use-store";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { 
  FileText, FileImage, FileCode, Film, Folder, File, 
  MoreVertical, Star, Share2, Download, Eye
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { buttonVariants } from "@/components/ui/button";

interface FileItemProps {
  file: DriveFile;
  viewMode: 'grid' | 'list';
  onPreview: () => void;
  onShare: () => void;
  isFavorite: boolean;
}

export function FileItem({ file, viewMode, onPreview, onShare, isFavorite }: FileItemProps) {
  const { toggleFavorite, addRecentFile } = useStore();

  const handlePreview = () => {
    addRecentFile(file);
    onPreview();
  };

  const Icon = getFileIcon(file.mimeType);
  const formattedDate = file.modifiedTime ? format(new Date(file.modifiedTime), "MMM d, yyyy") : "";
  const formattedSize = file.size ? formatBytes(parseInt(file.size)) : "";

  if (viewMode === 'list') {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        whileHover={{ y: -1 }}
        className="group flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 border border-transparent hover:border-border/50 transition-all cursor-pointer"
        onClick={handlePreview}
      >
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center shrink-0">
            {file.thumbnailLink ? (
              <img src={file.thumbnailLink} alt={file.name} className="w-8 h-8 object-cover rounded-md" />
            ) : (
              <Icon className="w-5 h-5 text-primary/60" />
            )}
          </div>
          <div className="truncate pr-4 flex-1">
            <p className="font-medium text-sm truncate">{file.name}</p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
              <span>{formattedDate}</span>
              {formattedSize && (
                <>
                  <span>•</span>
                  <span>{formattedSize}</span>
                </>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => e.stopPropagation()}>
          {isFavorite && <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-2 opacity-100" />}
          
          <DropdownMenu>
            <DropdownMenuTrigger className={buttonVariants({ variant: "ghost", size: "icon", className: "h-8 w-8 rounded-full" })}>
                <MoreVertical className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 rounded-xl">
              <DropdownMenuItem onClick={handlePreview}>
                <Eye className="w-4 h-4 mr-2" /> Preview
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onShare}>
                <Share2 className="w-4 h-4 mr-2" /> Share
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toggleFavorite(file.id)}>
                <Star className={`w-4 h-4 mr-2 ${isFavorite ? "fill-yellow-500 text-yellow-500" : ""}`} /> 
                {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => { const a = document.createElement('a'); a.href = `/api/files/${file.id}`; a.download = ''; a.click(); }}>
                  <Download className="w-4 h-4 mr-2" /> Download
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </motion.div>
    );
  }

  // Grid view
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4, scale: 1.01 }}
      className="h-full"
    >
      <Card 
        className="group h-full overflow-hidden rounded-2xl border-border/50 bg-card/50 backdrop-blur-sm cursor-pointer hover:shadow-md transition-all flex flex-col"
        onClick={handlePreview}
      >
        <div className="relative aspect-[4/3] w-full bg-muted/20 flex items-center justify-center p-4 border-b border-border/50 overflow-hidden">
          {file.thumbnailLink ? (
            <img 
              src={file.thumbnailLink} 
              alt={file.name} 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <Icon className="w-16 h-16 text-primary/20 transition-transform duration-500 group-hover:scale-110" />
          )}
          
          {isFavorite && (
            <div className="absolute top-3 left-3 bg-background/80 backdrop-blur-sm p-1.5 rounded-full shadow-sm z-10">
              <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
            </div>
          )}
          
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10" onClick={(e) => e.stopPropagation()}>
            <DropdownMenu>
              <DropdownMenuTrigger className={buttonVariants({ variant: "secondary", size: "icon", className: "h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background shadow-sm" })}>
                  <MoreVertical className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 rounded-xl">
                <DropdownMenuItem onClick={handlePreview}>
                  <Eye className="w-4 h-4 mr-2" /> Preview
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onShare}>
                  <Share2 className="w-4 h-4 mr-2" /> Share
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => toggleFavorite(file.id)}>
                  <Star className={`w-4 h-4 mr-2 ${isFavorite ? "fill-yellow-500 text-yellow-500" : ""}`} /> 
                  {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => { const a = document.createElement('a'); a.href = `/api/files/${file.id}`; a.download = ''; a.click(); }}>
                    <Download className="w-4 h-4 mr-2" /> Download
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        <CardContent className="p-4 flex-1 flex flex-col justify-between">
          <p className="font-medium text-sm line-clamp-2 leading-tight" title={file.name}>{file.name}</p>
          <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
            <span>{formattedDate}</span>
            <span>{formattedSize}</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function getFileIcon(mimeType: string) {
  if (mimeType.includes('pdf')) return FileText;
  if (mimeType.includes('word') || mimeType.includes('document')) return FileText;
  if (mimeType.includes('excel') || mimeType.includes('spreadsheet')) return FileCode;
  if (mimeType.includes('powerpoint') || mimeType.includes('presentation')) return FileCode;
  if (mimeType.startsWith('image/')) return FileImage;
  if (mimeType.startsWith('video/')) return Film;
  if (mimeType === 'application/vnd.google-apps.folder') return Folder;
  return File;
}

function formatBytes(bytes: number, decimals = 1) {
  if (!+bytes) return '0 B';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}
