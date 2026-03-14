import React from "react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }
};
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } }
};

function GearsIcon() {
  return (
    <motion.div
      variants={fadeIn} initial="hidden" animate="visible" transition={{ delay: 0.2 }}
      className="hidden lg:flex items-center justify-center flex-shrink-0 w-72 h-72"
    >
      <svg viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Large gear - blue */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          style={{ originX: "95px", originY: "95px" }}
        >
          <g transform="translate(95,95)">
            {/* Gear teeth */}
            {[0,30,60,90,120,150,180,210,240,270,300,330].map((angle, i) => (
              <rect
                key={i}
                x="-7" y="-78"
                width="14" height="18"
                rx="3"
                fill="#1e3a8a"
                transform={`rotate(${angle})`}
              />
            ))}
            {/* Gear body */}
            <circle r="62" fill="#1e3a8a" />
            <circle r="52" fill="#dbeafe" />
            <circle r="18" fill="#1e3a8a" />
            <circle r="10" fill="#dbeafe" />
          </g>
        </motion.g>

        {/* Small gear - red */}
        <motion.g
          animate={{ rotate: -360 }}
          transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
          style={{ originX: "158px", originY: "148px" }}
        >
          <g transform="translate(158,148)">
            {/* Gear teeth */}
            {[0,45,90,135,180,225,270,315].map((angle, i) => (
              <rect
                key={i}
                x="-5" y="-50"
                width="10" height="13"
                rx="2"
                fill="#b91c1c"
                transform={`rotate(${angle})`}
              />
            ))}
            {/* Gear body */}
            <circle r="40" fill="#b91c1c" />
            <circle r="32" fill="#fee2e2" />
            <circle r="11" fill="#b91c1c" />
            <circle r="6" fill="#fee2e2" />
          </g>
        </motion.g>

        {/* Small accent gear - slate */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          style={{ originX: "60px", originY: "158px" }}
        >
          <g transform="translate(60,158)">
            {[0,60,120,180,240,300].map((angle, i) => (
              <rect
                key={i}
                x="-4" y="-36"
                width="8" height="10"
                rx="2"
                fill="#475569"
                transform={`rotate(${angle})`}
              />
            ))}
            <circle r="28" fill="#475569" />
            <circle r="22" fill="#f1f5f9" />
            <circle r="8" fill="#475569" />
            <circle r="4" fill="#f1f5f9" />
          </g>
        </motion.g>
      </svg>
    </motion.div>
  );
}

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

      </div>
    </section>
  );
}