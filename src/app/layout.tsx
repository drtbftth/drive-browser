import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Drive Browser | Premium File Manager",
  description: "A modern, lightning-fast file browser for your Google Drive.",
  keywords: ["Google Drive", "File Manager", "Cloud Storage", "Next.js"],
  authors: [{ name: "Your Name" }],
  openGraph: {
    title: "Drive Browser | Premium File Manager",
    description: "A modern, lightning-fast file browser for your Google Drive.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Drive Browser",
    description: "A modern, lightning-fast file browser for your Google Drive.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-primary selection:text-primary-foreground min-h-screen`}
      >
        <Providers>
          {children}
          <Toaster position="bottom-right" />
        </Providers>
      </body>
    </html>
  );
}
