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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Check, Link2, QrCode } from "lucide-react";
import { toast } from "sonner";

interface ShareModalProps {
  file: DriveFile;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ShareModal({ file, open, onOpenChange }: ShareModalProps) {
  const [copied, setCopied] = React.useState(false);
  const [showQr, setShowQr] = React.useState(false);

  const shareUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/api/files/${file.id}`
    : `https://drive.google.com/file/d/${file.id}/view`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    toast.success("Link copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-2xl bg-card/95 backdrop-blur-xl border-border/50">
        <DialogHeader>
          <DialogTitle>Share File</DialogTitle>
          <DialogDescription>
            Anyone with this link will be able to download {file.name}.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col space-y-4 py-4">
          {showQr ? (
            <div className="flex flex-col items-center justify-center space-y-4 bg-white p-4 rounded-xl">
              {/* Fallback QR since we don't have a library right now */}
              <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(shareUrl)}`} 
                alt="QR Code" 
                className="w-32 h-32"
              />
              <p className="text-sm text-center text-zinc-500 font-mono break-all max-w-full">
                {shareUrl}
              </p>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <label htmlFor="link" className="sr-only">
                  Link
                </label>
                <Input
                  id="link"
                  defaultValue={shareUrl}
                  readOnly
                  className="rounded-xl border-border/50"
                />
              </div>
              <Button type="button" size="icon" onClick={handleCopy} className="rounded-xl px-3 flex-shrink-0">
                <span className="sr-only">Copy</span>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          )}
        </div>
        
        <div className="flex justify-between items-center pt-2">
          <Button variant="ghost" className="rounded-xl text-muted-foreground" onClick={() => setShowQr(!showQr)}>
            {showQr ? <Link2 className="w-4 h-4 mr-2" /> : <QrCode className="w-4 h-4 mr-2" />}
            {showQr ? "Show Link" : "Show QR Code"}
          </Button>
          <Button type="button" variant="secondary" onClick={() => onOpenChange(false)} className="rounded-xl">
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
