import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }
};
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } }
};

// Nodos fijos de la red neuronal
const NODES = [
  { id: 0, cx: 128, cy: 60 },
  { id: 1, cx: 50,  cy: 120 },
  { id: 2, cx: 200, cy: 115 },
  { id: 3, cx: 85,  cy: 185 },
  { id: 4, cx: 165, cy: 190 },
  { id: 5, cx: 128, cy: 250 },
  { id: 6, cx: 35,  cy: 220 },
  { id: 7, cx: 220, cy: 240 },
];

const EDGES = [
  [0,1],[0,2],[1,3],[2,4],[3,5],[4,5],[1,6],[2,7],[3,4],[5,7],[6,3],[4,7],[0,4],[1,2],
];

function NeuralNetworkIcon() {
  return (
    <div className="w-64 h-64 relative">
      <svg viewBox="0 0 256 300" className="w-full h-full" fill="none">
        {/* Aristas con animación de pulso */}
        {EDGES.map(([a, b], i) => {
          const n1 = NODES[a], n2 = NODES[b];
          const len = Math.hypot(n2.cx - n1.cx, n2.cy - n1.cy);
          return (
            <motion.line
              key={i}
              x1={n1.cx} y1={n1.cy}
              x2={n2.cx} y2={n2.cy}
              stroke="rgba(255,255,255,0.25)"
              strokeWidth="1.2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.06, ease: "easeOut" }}
            />
          );
        })}

        {/* Partículas viajando por las aristas */}
        {EDGES.map(([a, b], i) => {
          const n1 = NODES[a], n2 = NODES[b];
          return (
            <motion.circle
              key={`p-${i}`}
              r="3"
              fill="rgba(239,68,68,0.9)"
              initial={{ x: n1.cx, y: n1.cy, opacity: 0, scale: 0 }}
              animate={{
                x: [n1.cx, n2.cx],
                y: [n1.cy, n2.cy],
                opacity: [0, 1, 1, 0],
                scale: [0, 1, 1, 0],
              }}
              transition={{
                duration: 1.8,
                delay: 1 + i * 0.22,
                repeat: Infinity,
                repeatDelay: EDGES.length * 0.22 + 0.5,
                ease: "easeInOut",
              }}
            />
          );
        })}

        {/* Nodos */}
        {NODES.map((n, i) => (
          <g key={n.id}>
            {/* Halo pulsante */}
            <motion.circle
              cx={n.cx} cy={n.cy} r="14"
              fill="rgba(255,255,255,0.06)"
              animate={{ r: [12, 18, 12], opacity: [0.3, 0.08, 0.3] }}
              transition={{ duration: 2.5, delay: i * 0.3, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Nodo base */}
            <motion.circle
              cx={n.cx} cy={n.cy} r="8"
              fill="white"
              fillOpacity="0.15"
              stroke="rgba(255,255,255,0.7)"
              strokeWidth="1.5"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.08, type: "spring", stiffness: 200 }}
            />
            {/* Punto interior */}
            <motion.circle
              cx={n.cx} cy={n.cy} r="3"
              fill="white"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, delay: i * 0.25, repeat: Infinity, ease: "easeInOut" }}
            />
          </g>
        ))}
      </svg>
    </div>
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
        <motion.div
          variants={fadeIn} initial="hidden" animate="visible" transition={{ delay: 0.2 }}
          className="hidden lg:flex items-center justify-center w-64 h-64 rounded-3xl bg-gradient-to-br from-blue-900 to-blue-700 shadow-2xl flex-shrink-0 overflow-hidden"
        >
          <NeuralNetworkIcon />
        </motion.div>
      </div>
    </section>
  );
}