import React from "react";
import { motion } from "framer-motion";
import HeroIconPicker from "./HeroIconPicker";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }
};
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } }
};

export function Hero1({ t, language }) {
  return (
    <section className="pt-32 pb-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center gap-12">
        <div className="flex-1">
          <motion.div variants={fadeIn} initial="hidden" animate="visible" className="flex items-center gap-3 mb-6">
            <div className="w-1 h-14 bg-red-600 rounded-full" />
            <span className="text-red-600 text-sm font-semibold uppercase tracking-widest">
              {language === 'es' ? 'Quiénes Somos' : 'Who We Are'}
            </span>
          </motion.div>
          <motion.h1 variants={fadeUp} initial="hidden" animate="visible"
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-900 leading-tight mb-6">
            {t.heroTitle}
          </motion.h1>
          <motion.p variants={fadeUp} initial="hidden" animate="visible"
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-500 max-w-2xl leading-relaxed">
            {t.heroSubtitle}
          </motion.p>
        </div>

        <motion.div
          variants={fadeIn} initial="hidden" animate="visible"
          transition={{ delay: 0.2 }}
          className="hidden lg:flex items-center justify-center flex-shrink-0"
        >
          <TechGlobeIcon />
        </motion.div>
      </div>
    </section>
  );
}