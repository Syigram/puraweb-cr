import React, { memo } from "react";
import { motion } from "framer-motion";

const fade = { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 } };

const heroes = [
  // 1 — Gradient title centered
  ({ t }) => (
    <section className="pt-28 pb-12 text-center">
      <motion.div {...fade} className="max-w-3xl mx-auto px-6">
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-blue-500 mb-4 block">{t.eyebrow}</span>
        <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-blue-900 via-blue-700 to-indigo-500 bg-clip-text text-transparent leading-tight mb-4">
          {t.title}
        </h1>
        <p className="text-gray-500 text-lg max-w-xl mx-auto">{t.desc}</p>
      </motion.div>
    </section>
  ),

  // 2 — Split: title left, desc right
  ({ t }) => (
    <section className="pt-28 pb-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row md:items-end gap-6 md:gap-16">
        <motion.div {...fade} className="flex-1">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-red-500 mb-3 block">{t.eyebrow}</span>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">{t.title}</h1>
        </motion.div>
        <motion.p {...{ ...fade, transition: { duration: 0.5, delay: 0.15 } }} className="flex-1 text-gray-500 text-base md:text-lg md:pb-2">
          {t.desc}
        </motion.p>
      </div>
    </section>
  ),

  // 3 — Dark background minimal
  ({ t }) => (
    <section className="pt-28 pb-14 bg-gray-950 text-center">
      <motion.div {...fade} className="max-w-3xl mx-auto px-6">
        <span className="text-xs font-semibold uppercase tracking-[0.35em] text-gray-400 mb-5 block">{t.eyebrow}</span>
        <h1 className="text-4xl md:text-6xl font-black text-white mb-4">{t.title}</h1>
        <div className="w-12 h-1 bg-red-500 mx-auto mb-5" />
        <p className="text-gray-400 text-base max-w-lg mx-auto">{t.desc}</p>
      </motion.div>
    </section>
  ),

  // 4 — Oversized number accent
  ({ t }) => (
    <section className="pt-28 pb-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative">
        <motion.span
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}
          className="absolute -top-6 left-4 text-[10rem] md:text-[16rem] font-black text-gray-100 select-none leading-none pointer-events-none"
        >
          PW
        </motion.span>
        <motion.div {...{ ...fade, transition: { duration: 0.5, delay: 0.2 } }} className="relative z-10 text-center py-4">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-blue-500 mb-3 block">{t.eyebrow}</span>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-3">{t.title}</h1>
          <p className="text-gray-500 max-w-xl mx-auto">{t.desc}</p>
        </motion.div>
      </div>
    </section>
  ),

  // 5 — Dot grid background
  ({ t }) => (
    <section className="pt-28 pb-12 relative text-center"
      style={{ backgroundImage: "radial-gradient(circle, #d1d5db 1px, transparent 1px)", backgroundSize: "28px 28px" }}>
      <div className="absolute inset-0 bg-white/80" />
      <motion.div {...fade} className="relative max-w-3xl mx-auto px-6">
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-indigo-500 mb-4 block">{t.eyebrow}</span>
        <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-4">{t.title}</h1>
        <p className="text-gray-600 max-w-lg mx-auto">{t.desc}</p>
      </motion.div>
    </section>
  ),

  // 6 — Thick bottom border + left-aligned
  ({ t }) => (
    <section className="pt-28 pb-12">
      <motion.div {...fade} className="max-w-7xl mx-auto px-6">
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400 mb-3 block">{t.eyebrow}</span>
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 pb-6 border-b-4 border-blue-900 inline-block">
          {t.title}
        </h1>
        <p className="text-gray-500 text-base max-w-2xl mt-4">{t.desc}</p>
      </motion.div>
    </section>
  ),

  // 7 — Color block left
  ({ t }) => (
    <section className="pt-28 pb-0">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex">
          <motion.div
            initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.4 }}
            className="w-1.5 bg-red-500 rounded-full mr-8 origin-top flex-shrink-0"
          />
          <motion.div {...{ ...fade, transition: { duration: 0.5, delay: 0.1 } }} className="py-4">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400 mb-2 block">{t.eyebrow}</span>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">{t.title}</h1>
            <p className="text-gray-500 max-w-2xl">{t.desc}</p>
          </motion.div>
        </div>
      </div>
    </section>
  ),

  // 8 — Monospace / terminal style
  ({ t }) => (
    <section className="pt-28 pb-12 bg-gray-950">
      <motion.div {...fade} className="max-w-4xl mx-auto px-6">
        <p className="font-mono text-green-400 text-sm mb-3">$ ls ./portfolio</p>
        <h1 className="font-mono text-3xl md:text-5xl font-bold text-white mb-3">
          <span className="text-green-400">{">"}</span> {t.title}
        </h1>
        <p className="font-mono text-gray-400 text-sm md:text-base">{t.desc}</p>
        <span className="font-mono text-green-400 animate-pulse">_</span>
      </motion.div>
    </section>
  ),

  // 9 — Vertical rotated label
  ({ t }) => (
    <section className="pt-28 pb-12">
      <div className="max-w-7xl mx-auto px-6 flex items-center gap-8">
        <motion.div
          initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}
          className="hidden md:block"
        >
          <span className="text-xs font-bold uppercase tracking-[0.35em] text-blue-500 block"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
            {t.eyebrow}
          </span>
        </motion.div>
        <motion.div {...{ ...fade, transition: { duration: 0.5, delay: 0.1 } }} className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-4">{t.title}</h1>
          <p className="text-gray-500 max-w-xl">{t.desc}</p>
        </motion.div>
      </div>
    </section>
  ),

  // 10 — Stats row
  ({ t }) => (
    <section className="pt-28 pb-12">
      <motion.div {...fade} className="max-w-7xl mx-auto px-6 text-center">
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-red-500 mb-4 block">{t.eyebrow}</span>
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-8">{t.title}</h1>
        <div className="flex justify-center gap-10 md:gap-20 border-t border-b border-gray-100 py-6">
          {[["6+", t.stat1], ["100%", t.stat2], ["3", t.stat3]].map(([num, label]) => (
            <div key={label} className="text-center">
              <p className="text-3xl font-black text-blue-900">{num}</p>
              <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">{label}</p>
            </div>
          ))}
        </div>
        <p className="text-gray-500 mt-6 max-w-xl mx-auto">{t.desc}</p>
      </motion.div>
    </section>
  ),

  // 11 — Outline / stroke title
  ({ t }) => (
    <section className="pt-28 pb-12 bg-blue-950 text-center">
      <motion.div {...fade} className="max-w-4xl mx-auto px-6">
        <span className="text-xs font-bold uppercase tracking-[0.35em] text-blue-400 mb-4 block">{t.eyebrow}</span>
        <h1 className="text-5xl md:text-7xl font-black mb-4"
          style={{ WebkitTextStroke: "2px white", color: "transparent" }}>
          {t.title}
        </h1>
        <p className="text-blue-300 max-w-xl mx-auto">{t.desc}</p>
      </motion.div>
    </section>
  ),

  // 12 — Two-tone background
  ({ t }) => (
    <section className="pt-28 pb-0">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 overflow-hidden rounded-2xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
            className="bg-blue-900 p-10 md:p-14 flex flex-col justify-center"
          >
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-blue-300 mb-3 block">{t.eyebrow}</span>
            <h1 className="text-3xl md:text-4xl font-black text-white leading-tight">{t.title}</h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.15 }}
            className="bg-gray-50 p-10 md:p-14 flex items-center"
          >
            <p className="text-gray-600 text-base leading-relaxed">{t.desc}</p>
          </motion.div>
        </div>
      </div>
    </section>
  ),

  // 13 — Corner brackets decoration
  ({ t }) => (
    <section className="pt-28 pb-12">
      <motion.div {...fade} className="max-w-3xl mx-auto px-6 text-center">
        <div className="relative inline-block px-10 py-8">
          <span className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-blue-900" />
          <span className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-blue-900" />
          <span className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-blue-900" />
          <span className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-blue-900" />
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400 mb-3 block">{t.eyebrow}</span>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900">{t.title}</h1>
        </div>
        <p className="text-gray-500 mt-4 max-w-lg mx-auto">{t.desc}</p>
      </motion.div>
    </section>
  ),

  // 14 — Horizontal rule accent
  ({ t }) => (
    <section className="pt-28 pb-12">
      <motion.div {...fade} className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400">{t.eyebrow}</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-gray-900 text-center mb-4">{t.title}</h1>
        <div className="flex items-center gap-4 mt-4">
          <div className="h-px flex-1 bg-gray-200" />
        </div>
        <p className="text-gray-500 text-center mt-6 max-w-xl mx-auto">{t.desc}</p>
      </motion.div>
    </section>
  ),

  // 15 — Minimal white ultra-clean
  ({ t }) => (
    <section className="pt-32 pb-10">
      <motion.div {...fade} className="max-w-5xl mx-auto px-6">
        <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-none tracking-tight mb-6">
          {t.title}
        </h1>
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-12">
          <div className="w-16 h-1 bg-red-500" />
          <p className="text-gray-400 text-base md:text-lg max-w-2xl">{t.desc}</p>
        </div>
      </motion.div>
    </section>
  ),

  // 16 — Stacked small-caps labels
  ({ t }) => (
    <section className="pt-28 pb-12 text-center">
      <motion.div {...fade} className="max-w-3xl mx-auto px-6">
        <div className="inline-flex gap-2 mb-5">
          {["Design", "Dev", "Web"].map((tag) => (
            <span key={tag} className="text-xs font-bold uppercase tracking-wider border border-gray-300 px-3 py-1 rounded-full text-gray-500">
              {tag}
            </span>
          ))}
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-4">{t.title}</h1>
        <p className="text-gray-500 max-w-lg mx-auto">{t.desc}</p>
      </motion.div>
    </section>
  ),

  // 17 — Gradient background soft
  ({ t }) => (
    <section className="pt-28 pb-14" style={{ background: "linear-gradient(135deg, #eff6ff 0%, #f0fdf4 100%)" }}>
      <motion.div {...fade} className="max-w-4xl mx-auto px-6 text-center">
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-green-600 mb-4 block">{t.eyebrow}</span>
        <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-4">{t.title}</h1>
        <p className="text-gray-600 max-w-xl mx-auto">{t.desc}</p>
      </motion.div>
    </section>
  ),

  // 18 — Left border timeline accent
  ({ t }) => (
    <section className="pt-28 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="border-l-4 border-blue-900 pl-8">
          <motion.div {...fade}>
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-blue-500 mb-2 block">{t.eyebrow}</span>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">{t.title}</h1>
            <p className="text-gray-500 max-w-2xl">{t.desc}</p>
          </motion.div>
        </div>
      </div>
    </section>
  ),

  // 19 — Red accent block
  ({ t }) => (
    <section className="pt-28 pb-0">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-red-600 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <motion.div {...fade}>
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-red-200 mb-2 block">{t.eyebrow}</span>
            <h1 className="text-3xl md:text-4xl font-black text-white">{t.title}</h1>
          </motion.div>
          <motion.p {...{ ...fade, transition: { duration: 0.5, delay: 0.15 } }}
            className="text-red-100 text-base md:max-w-sm">
            {t.desc}
          </motion.p>
        </div>
      </div>
    </section>
  ),

  // 20 — Newspaper / editorial
  ({ t }) => (
    <section className="pt-28 pb-10 border-b-4 border-gray-900">
      <motion.div {...fade} className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-4">
          <span className="text-xs font-bold uppercase tracking-[0.5em] text-gray-400 border-b border-gray-300 pb-1">{t.eyebrow}</span>
        </div>
        <h1 className="text-5xl md:text-8xl font-black text-gray-900 text-center leading-none mb-6">
          {t.title}
        </h1>
        <div className="grid md:grid-cols-3 gap-4 border-t border-gray-200 pt-4">
          <p className="text-gray-500 text-sm col-span-2">{t.desc}</p>
          <p className="text-gray-300 text-xs hidden md:block text-right font-mono">PuraWeb CR © 2025</p>
        </div>
      </motion.div>
    </section>
  ),
];

export const heroCount = heroes.length;

const PortfolioHero = memo(function PortfolioHero({ index, language }) {
  const content = {
    es: {
      eyebrow: "Nuestro Portafolio",
      title: "Proyectos que Inspiran",
      desc: "Descubre los sitios web que hemos creado para nuestros clientes. Cada proyecto refleja nuestra pasión por el diseño y la funcionalidad.",
      stat1: "Proyectos", stat2: "Satisfacción", stat3: "Industrias",
    },
    en: {
      eyebrow: "Our Portfolio",
      title: "Projects That Inspire",
      desc: "Discover the websites we've crafted for our clients. Every project reflects our passion for design and functionality.",
      stat1: "Projects", stat2: "Satisfaction", stat3: "Industries",
    },
  };

  const t = content[language] || content.es;
  const Hero = heroes[index] || heroes[0];
  return <Hero t={t} />;
});

export default PortfolioHero;