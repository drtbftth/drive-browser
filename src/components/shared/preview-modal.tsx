"use client";

import * as React from "react";
import { DriveFile } from "@/lib/drive";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { Download, ExternalLink } from "lucide-react";

interface PreviewModalProps {
  file: DriveFile;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PreviewModal({ file, open, onOpenChange }: PreviewModalProps) {
  const isImage = file.mimeType.startsWith("image/");
  const isVideo = file.mimeType.startsWith("video/");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden rounded-2xl bg-card/95 backdrop-blur-xl border-border/50">
        <DialogHeader className="p-4 sm:p-6 border-b border-border/50">
          <DialogTitle className="text-xl font-semibold truncate pr-8">{file.name}</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground flex items-center gap-4">
            <span>{file.size ? formatBytes(parseInt(file.size)) : "Unknown size"}</span>
            <span>{file.mimeType}</span>
          </DialogDescription>
        </DialogHeader>
        
        <div className="relative w-full aspect-video bg-muted/10 flex items-center justify-center overflow-hidden min-h-[300px]">
          {isImage && file.webContentLink ? (
            <img 
              src={`/api/files/${file.id}`} 
              alt={file.name}
              className="max-w-full max-h-full object-contain"
            />
          ) : isVideo && file.webContentLink ? (
            <video 
              src={`/api/files/${file.id}`}
              controls
              className="w-full h-full"
            />
          ) : (
            <div className="text-center p-8">
              <p className="text-muted-foreground mb-4">
                Preview not available for this file type natively.
              </p>
              <a href={file.webViewLink} target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "secondary", className: "rounded-xl" })}>
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Open in Google Drive
              </a>
            </div>
          )}
        </div>

        <div className="p-4 sm:p-6 bg-card/50 flex justify-end gap-3 border-t border-border/50">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="rounded-xl">
            Close
          </Button>
          <a href={`/api/files/${file.id}`} download className={buttonVariants({ className: "rounded-xl" })}>
              <Download className="w-4 h-4 mr-2" />
              Download File
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function formatBytes(bytes: number, decimals = 1) {
  if (!+bytes) return '0 B';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}
