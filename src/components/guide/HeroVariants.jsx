import React from 'react';
import { motion } from 'framer-motion';

// Acento Rojo — única variante usada en ComoTrabajamos
export function HeroAcentoRojo({ title, subtitle }) {
  return (
    <motion.div className="relative pt-28 pb-16 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-red-50 to-transparent" />
      <div className="max-w-5xl mx-auto px-8 md:px-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
          className="border-l-4 border-red-600 pl-8"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-red-600 block mb-3">
            Cómo Trabajamos
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-5">
            {title}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            {subtitle}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}