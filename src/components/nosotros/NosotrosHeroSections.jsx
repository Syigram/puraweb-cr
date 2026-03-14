import React from "react";
import { motion } from "framer-motion";

function GearAnimation() {
  return (
    <svg viewBox="0 0 200 200" width="180" height="180" aria-hidden="true">
      {/* Large gear - center */}
      <motion.g
        style={{ originX: "100px", originY: "100px" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      >
        <Gear cx={100} cy={100} r={38} teeth={12} toothSize={10} color="rgba(255,255,255,0.95)" />
      </motion.g>

      {/* Medium gear - top right */}
      <motion.g
        style={{ originX: "158px", originY: "58px" }}
        animate={{ rotate: -360 }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "linear" }}
      >
        <Gear cx={158} cy={58} r={24} teeth={8} toothSize={8} color="rgba(255,255,255,0.65)" />
      </motion.g>

      {/* Small gear - bottom left */}
      <motion.g
        style={{ originX: "52px", originY: "152px" }}
        animate={{ rotate: -360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      >
        <Gear cx={52} cy={152} r={18} teeth={6} toothSize={7} color="rgba(255,255,255,0.5)" />
      </motion.g>

      {/* Tiny gear - bottom right */}
      <motion.g
        style={{ originX: "158px", originY: "148px" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      >
        <Gear cx={158} cy={148} r={14} teeth={6} toothSize={5} color="rgba(255,255,255,0.4)" />
      </motion.g>
    </svg>
  );
}

function Gear({ cx, cy, r, teeth, toothSize, color }) {
  const points = [];
  for (let i = 0; i < teeth; i++) {
    const angle = (i / teeth) * 2 * Math.PI;
    const nextAngle = ((i + 0.5) / teeth) * 2 * Math.PI;
    const outerAngle = ((i + 0.25) / teeth) * 2 * Math.PI;
    const outerAngle2 = ((i + 0.75) / teeth) * 2 * Math.PI;
    const inner = r;
    const outer = r + toothSize;
    points.push(
      `${cx + inner * Math.cos(angle)},${cy + inner * Math.sin(angle)}`,
      `${cx + outer * Math.cos(outerAngle)},${cy + outer * Math.sin(outerAngle)}`,
      `${cx + outer * Math.cos(outerAngle2)},${cy + outer * Math.sin(outerAngle2)}`,
      `${cx + inner * Math.cos(nextAngle)},${cy + inner * Math.sin(nextAngle)}`
    );
  }
  return (
    <g>
      <polygon points={points.join(" ")} fill={color} />
      <circle cx={cx} cy={cy} r={r * 0.38} fill="rgba(0,43,127,0.6)" />
    </g>
  );
}

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
        <motion.div variants={fadeIn} initial="hidden" animate="visible" transition={{ delay: 0.2 }}
          className="hidden lg:flex items-center justify-center w-64 h-64 rounded-3xl bg-gradient-to-br from-blue-900 to-blue-700 shadow-2xl flex-shrink-0 overflow-hidden">
          <GearAnimation />
        </motion.div>
      </div>
    </section>
  );
}