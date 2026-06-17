"use client";

import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="flex flex-col items-center justify-center text-center space-y-6 py-12 lg:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="space-y-4 max-w-3xl"
      >
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
          Your Files, <span className="text-muted-foreground">Beautifully Organized.</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Experience a lightning-fast, premium interface for your Google Drive. Preview, search, and share files with ease.
        </p>
      </motion.div>
    </section>
  );
}
