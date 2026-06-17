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
          Your Files, <span className="text-muted-foreground">Evidence. Knowledge. Practice.</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Cuộc đời thì ngắn, mà nghề thì miên man; cơn bệnh phập phù; kinh nghiệm hiểm nguy, còn quyết định thì thật khó. Người thầy thuốc không phải chỉ chuẩn bị để tự mình làm những gì là đúng, mà còn làm cho bệnh nhân, người đi theo và các yếu tố xung quanh hợp tác hài hòa.”
        </p>
      </motion.div>
    </section>
  );
}
