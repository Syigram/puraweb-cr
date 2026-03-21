import React, { memo } from "react";
import { motion } from "framer-motion";

// All 20 hero variants for the Portfolio page
// Each receives: language ("es" | "en")

const fade = { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 } };

// ── 1. Clean Centered ──────────────────────────────────────────────
const Hero1 = memo(({ language: l }) => (
  <section className="pt-28 pb-12 bg-white">
    <motion.div {...fade} className="max-w-7xl mx-auto px-6 text-center">
      <span className="inline-block text-xs font-bold tracking-widest uppercase text-red-600 mb-4">
        {l === "es" ? "Nuestro Trabajo" : "Our Work"}
      </span>
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
        {l === "es" ? "Proyectos que hablan por sí solos" : "Projects That Speak for Themselves"}
      </h1>
      <p className="text-gray-500 max-w-xl mx-auto text-base">
        {l === "es"
          ? "Cada sitio que construimos es una historia de éxito digital."
          : "Every site we build is a story of digital success."}
      </p>
    </motion.div>
  </section>
));

// ── 2. Left Aligned with Red Accent ───────────────────────────────
const Hero2 = memo(({ language: l }) => (
  <section className="pt-28 pb-12 bg-gray-50">
    <motion.div {...fade} className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-8">
      <div className="flex-1">
        <div className="w-12 h-1 bg-red-600 mb-5" />
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          {l === "es" ? "Diseño con propósito, código con precisión" : "Design with purpose, code with precision"}
        </h1>
        <p className="text-gray-500 max-w-lg">
          {l === "es"
            ? "Soluciones web a medida para empresas que quieren destacar."
            : "Custom web solutions for businesses that want to stand out."}
        </p>
      </div>
      <div className="hidden md:flex items-center justify-center w-40 h-40 rounded-full border-4 border-blue-900/10 flex-shrink-0">
        <span className="text-6xl font-black text-blue-900/10 select-none">PW</span>
      </div>
    </motion.div>
  </section>
));

// ── 3. Dark Blue ───────────────────────────────────────────────────
const Hero3 = memo(({ language: l }) => (
  <section className="pt-28 pb-14 bg-gradient-to-br from-blue-950 to-blue-900">
    <motion.div {...fade} className="max-w-7xl mx-auto px-6 text-center">
      <p className="text-blue-300 text-sm tracking-widest uppercase mb-4">
        {l === "es" ? "Portafolio" : "Portfolio"}
      </p>
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-5">
        {l === "es" ? "Transformamos ideas en experiencias digitales" : "We Transform Ideas into Digital Experiences"}
      </h1>
      <div className="w-20 h-0.5 bg-red-500 mx-auto" />
    </motion.div>
  </section>
));

// ── 4. Typographic Bold ────────────────────────────────────────────
const Hero4 = memo(({ language: l }) => (
  <section className="pt-28 pb-10 bg-white overflow-hidden">
    <div className="max-w-7xl mx-auto px-6">
      <motion.p {...fade} className="text-xs font-bold tracking-widest uppercase text-blue-900/30 mb-2">
        PuraWeb CR
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.55 }}
        className="text-6xl md:text-8xl font-black text-gray-900 leading-none mb-4"
      >
        {l === "es" ? "PORT\nFOLIO" : "PORT\nFOLIO"}
      </motion.h1>
      <motion.p {...fade} className="text-gray-500 max-w-md text-sm mt-4">
        {l === "es"
          ? "Una muestra de los proyectos que hemos desarrollado con dedicación y excelencia técnica."
          : "A showcase of the projects we have built with dedication and technical excellence."}
      </motion.p>
    </div>
  </section>
));

// ── 5. Minimal Lines ───────────────────────────────────────────────
const Hero5 = memo(({ language: l }) => (
  <section className="pt-28 pb-12 bg-white">
    <motion.div {...fade} className="max-w-7xl mx-auto px-6 text-center">
      <div className="flex items-center justify-center gap-4 mb-6">
        <div className="flex-1 max-w-[80px] h-px bg-gray-300" />
        <span className="text-xs text-gray-400 uppercase tracking-widest">{l === "es" ? "Casos de Éxito" : "Success Cases"}</span>
        <div className="flex-1 max-w-[80px] h-px bg-gray-300" />
      </div>
      <h1 className="text-3xl md:text-5xl font-bold text-blue-900 mb-4">
        {l === "es" ? "Resultados reales para negocios reales" : "Real Results for Real Businesses"}
      </h1>
      <p className="text-gray-500 max-w-lg mx-auto">
        {l === "es"
          ? "Del concepto al lanzamiento, cada proyecto es entregado con calidad garantizada."
          : "From concept to launch, every project is delivered with guaranteed quality."}
      </p>
    </motion.div>
  </section>
));

// ── 6. Grid Pattern ────────────────────────────────────────────────
const Hero6 = memo(({ language: l }) => (
  <section className="pt-28 pb-14 bg-gray-50 relative overflow-hidden">
    <div
      className="absolute inset-0 opacity-[0.04]"
      style={{ backgroundImage: "linear-gradient(#002B7F 1px, transparent 1px), linear-gradient(90deg, #002B7F 1px, transparent 1px)", backgroundSize: "40px 40px" }}
    />
    <motion.div {...fade} className="relative max-w-7xl mx-auto px-6 text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
        {l === "es" ? "Sitios web que generan resultados" : "Websites That Generate Results"}
      </h1>
      <p className="text-gray-500 max-w-xl mx-auto">
        {l === "es"
          ? "Explora nuestra colección de proyectos y encuentra inspiración para el tuyo."
          : "Explore our project collection and find inspiration for yours."}
      </p>
    </motion.div>
  </section>
));

// ── 7. Number Accent ───────────────────────────────────────────────
const Hero7 = memo(({ language: l }) => (
  <section className="pt-28 pb-12 bg-white relative overflow-hidden">
    <span className="absolute right-6 top-16 text-[160px] font-black text-blue-900/5 select-none leading-none">
      {portfolioProjects_count}
    </span>
    <motion.div {...fade} className="max-w-7xl mx-auto px-6">
      <p className="text-red-600 font-semibold text-sm mb-3 uppercase tracking-widest">
        {l === "es" ? "Proyectos realizados" : "Completed Projects"}
      </p>
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 max-w-2xl">
        {l === "es" ? "Calidad visible en cada entrega" : "Quality Visible in Every Delivery"}
      </h1>
      <p className="text-gray-500 max-w-lg">
        {l === "es"
          ? "Desde e-commerce hasta portales corporativos, nuestros proyectos generan impacto."
          : "From e-commerce to corporate portals, our projects create impact."}
      </p>
    </motion.div>
  </section>
));

// ── 8. Badge Style ─────────────────────────────────────────────────
const Hero8 = memo(({ language: l }) => (
  <section className="pt-28 pb-12 bg-white">
    <motion.div {...fade} className="max-w-7xl mx-auto px-6 text-center">
      <span className="inline-flex items-center gap-2 bg-blue-50 text-blue-800 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 border border-blue-100">
        <span className="w-1.5 h-1.5 bg-blue-700 rounded-full animate-pulse" />
        {l === "es" ? "Disponible para nuevos proyectos" : "Available for new projects"}
      </span>
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
        {l === "es" ? "Lo que construimos, funciona" : "What We Build, Works"}
      </h1>
      <p className="text-gray-500 max-w-xl mx-auto">
        {l === "es"
          ? "Evidencia real de nuestra metodología y nivel de ejecución."
          : "Real evidence of our methodology and execution level."}
      </p>
    </motion.div>
  </section>
));

// ── 9. Side Border ─────────────────────────────────────────────────
const Hero9 = memo(({ language: l }) => (
  <section className="pt-28 pb-12 bg-gray-50">
    <motion.div {...fade} className="max-w-7xl mx-auto px-6">
      <div className="border-l-4 border-red-600 pl-8 max-w-2xl">
        <p className="text-xs uppercase tracking-widest text-gray-400 mb-3">
          {l === "es" ? "Portafolio de proyectos" : "Project Portfolio"}
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          {l === "es" ? "Construimos el web de tu negocio con estándares de clase mundial" : "We Build Your Business Website to World-Class Standards"}
        </h1>
        <p className="text-gray-500 text-sm">
          {l === "es"
            ? "Cada proyecto refleja meses de experiencia y un equipo comprometido con la excelencia."
            : "Every project reflects months of experience and a team committed to excellence."}
        </p>
      </div>
    </motion.div>
  </section>
));

// ── 10. Minimal Words ──────────────────────────────────────────────
const Hero10 = memo(({ language: l }) => (
  <section className="pt-28 pb-16 bg-white">
    <motion.div {...fade} className="max-w-7xl mx-auto px-6 text-center">
      <h1 className="text-5xl md:text-7xl font-black tracking-tight text-blue-900 mb-4">
        {l === "es" ? "Ver para creer." : "Seeing is believing."}
      </h1>
      <p className="text-gray-400 max-w-sm mx-auto">
        {l === "es" ? "Nuestro trabajo habla." : "Our work speaks."}
      </p>
    </motion.div>
  </section>
));

// ── 11. Dot Pattern ────────────────────────────────────────────────
const Hero11 = memo(({ language: l }) => (
  <section className="pt-28 pb-12 bg-white relative overflow-hidden">
    <div
      className="absolute inset-0 opacity-[0.06]"
      style={{ backgroundImage: "radial-gradient(#002B7F 1px, transparent 1px)", backgroundSize: "24px 24px" }}
    />
    <motion.div {...fade} className="relative max-w-7xl mx-auto px-6 text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
        {l === "es" ? "Proyectos que definen estándares" : "Projects That Define Standards"}
      </h1>
      <p className="text-gray-500 max-w-xl mx-auto">
        {l === "es"
          ? "Descubre la diversidad de soluciones que hemos creado para clientes de múltiples industrias."
          : "Discover the diversity of solutions we've created for clients across multiple industries."}
      </p>
    </motion.div>
  </section>
));

// ── 12. Split with Color Block ─────────────────────────────────────
const Hero12 = memo(({ language: l }) => (
  <section className="pt-20 pb-0 bg-white">
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row items-stretch min-h-[180px] rounded-2xl overflow-hidden shadow-sm border border-gray-100">
        <motion.div {...fade} className="flex-1 bg-blue-900 p-10 flex flex-col justify-center">
          <p className="text-blue-300 text-xs uppercase tracking-widest mb-3">{l === "es" ? "Portafolio" : "Portfolio"}</p>
          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
            {l === "es" ? "Del prototipo al producto final" : "From Prototype to Final Product"}
          </h1>
        </motion.div>
        <div className="md:w-64 bg-red-600 p-8 flex items-center justify-center">
          <p className="text-white font-medium text-sm text-center leading-relaxed">
            {l === "es" ? "Diseño · Desarrollo · Lanzamiento" : "Design · Development · Launch"}
          </p>
        </div>
      </div>
    </div>
    <div className="h-10" />
  </section>
));

// ── 13. Gradient Text ──────────────────────────────────────────────
const Hero13 = memo(({ language: l }) => (
  <section className="pt-28 pb-12 bg-gray-50">
    <motion.div {...fade} className="max-w-7xl mx-auto px-6 text-center">
      <h1 className="text-4xl md:text-6xl font-black mb-5 bg-gradient-to-r from-blue-900 via-blue-700 to-red-600 bg-clip-text text-transparent leading-tight">
        {l === "es" ? "Excelencia en cada píxel" : "Excellence in Every Pixel"}
      </h1>
      <p className="text-gray-500 max-w-xl mx-auto">
        {l === "es"
          ? "Mira los proyectos que hemos construido y comprueba nuestra calidad por ti mismo."
          : "Look at the projects we've built and see our quality for yourself."}
      </p>
    </motion.div>
  </section>
));

// ── 14. Stacked Headline ───────────────────────────────────────────
const Hero14 = memo(({ language: l }) => (
  <section className="pt-28 pb-10 bg-white">
    <div className="max-w-7xl mx-auto px-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <p className="text-red-600 font-bold text-xs tracking-widest uppercase mb-5">
          PuraWeb CR — {l === "es" ? "Portafolio" : "Portfolio"}
        </p>
        <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-none">
          {l === "es" ? (
            <><span className="block">Diseño.</span><span className="block text-blue-900">Funcionalidad.</span><span className="block text-gray-300">Resultados.</span></>
          ) : (
            <><span className="block">Design.</span><span className="block text-blue-900">Function.</span><span className="block text-gray-300">Results.</span></>
          )}
        </h1>
      </motion.div>
    </div>
  </section>
));

// ── 15. Code Monospace ─────────────────────────────────────────────
const Hero15 = memo(({ language: l }) => (
  <section className="pt-28 pb-12 bg-gray-900">
    <motion.div {...fade} className="max-w-7xl mx-auto px-6">
      <div className="font-mono">
        <p className="text-green-400 text-sm mb-1">// {l === "es" ? "portafolio.js" : "portfolio.js"}</p>
        <p className="text-gray-500 text-sm mb-4">
          <span className="text-blue-400">const</span> <span className="text-white">portfolio</span> <span className="text-gray-400">= {`{`}</span>
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 pl-4">
          <span className="text-yellow-400">title</span>
          <span className="text-gray-400">: </span>
          <span className="text-green-300">
            "{l === "es" ? "Proyectos que resuelven problemas reales" : "Projects That Solve Real Problems"}"
          </span>
        </h1>
        <p className="text-gray-500 text-sm pl-4">
          <span className="text-yellow-400">quality</span>
          <span className="text-gray-400">: </span>
          <span className="text-blue-300">"world-class"</span>
        </p>
        <p className="text-gray-400 text-sm mt-2">{`}`}</p>
      </div>
    </motion.div>
  </section>
));

// ── 16. Diagonal Accent ────────────────────────────────────────────
const Hero16 = memo(({ language: l }) => (
  <section className="pt-28 pb-14 bg-white relative overflow-hidden">
    <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/5 transform rotate-45 translate-x-20 -translate-y-20 rounded-3xl" />
    <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-900/5 transform rotate-45 -translate-x-16 translate-y-16 rounded-3xl" />
    <motion.div {...fade} className="relative max-w-7xl mx-auto px-6 text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
        {l === "es" ? "Sitios web que convierten visitantes en clientes" : "Websites That Convert Visitors into Clients"}
      </h1>
      <p className="text-gray-500 max-w-xl mx-auto">
        {l === "es"
          ? "Cada proyecto está diseñado estratégicamente para generar valor real al negocio."
          : "Every project is strategically designed to generate real business value."}
      </p>
    </motion.div>
  </section>
));

// ── 17. Minimal Dark Split ─────────────────────────────────────────
const Hero17 = memo(({ language: l }) => (
  <section className="pt-28 pb-12 bg-gradient-to-r from-blue-950 via-blue-950 to-gray-900">
    <motion.div {...fade} className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-end gap-8">
      <div className="flex-1">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
          {l === "es" ? "Nuestro trabajo en números" : "Our Work in Numbers"}
        </h1>
        <p className="text-blue-300">
          {l === "es" ? "Proyectos reales. Clientes reales. Resultados medibles." : "Real projects. Real clients. Measurable results."}
        </p>
      </div>
      <div className="flex gap-8 flex-shrink-0">
        <div className="text-center">
          <p className="text-3xl font-black text-red-500">6+</p>
          <p className="text-blue-300 text-xs mt-1">{l === "es" ? "Proyectos" : "Projects"}</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-black text-white">100%</p>
          <p className="text-blue-300 text-xs mt-1">{l === "es" ? "Satisfacción" : "Satisfaction"}</p>
        </div>
      </div>
    </motion.div>
  </section>
));

// ── 18. Overline Style ─────────────────────────────────────────────
const Hero18 = memo(({ language: l }) => (
  <section className="pt-28 pb-12 bg-gray-50">
    <motion.div {...fade} className="max-w-7xl mx-auto px-6 text-center">
      <div className="inline-block mb-6">
        <span className="block text-xs text-blue-700 font-bold uppercase tracking-[0.2em] mb-2">
          {l === "es" ? "Trabajo destacado" : "Featured Work"}
        </span>
        <div className="h-0.5 bg-gradient-to-r from-blue-900 to-red-600" />
      </div>
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
        {l === "es" ? "Proyectos que superan expectativas" : "Projects That Exceed Expectations"}
      </h1>
      <p className="text-gray-500 max-w-xl mx-auto">
        {l === "es"
          ? "Descubre cómo ayudamos a empresas costarricenses a destacar en el mundo digital."
          : "Discover how we help Costa Rican businesses stand out in the digital world."}
      </p>
    </motion.div>
  </section>
));

// ── 19. Corner Mark ────────────────────────────────────────────────
const Hero19 = memo(({ language: l }) => (
  <section className="pt-28 pb-12 bg-white relative">
    <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-blue-900 via-blue-700 to-transparent" />
    <motion.div {...fade} className="max-w-7xl mx-auto px-8">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 max-w-2xl">
        {l === "es" ? "Cada proyecto, un reto superado" : "Every Project, a Challenge Overcome"}
      </h1>
      <p className="text-gray-500 max-w-lg">
        {l === "es"
          ? "Construimos experiencias web que combinan estética, velocidad y conversión."
          : "We build web experiences that combine aesthetics, speed, and conversion."}
      </p>
    </motion.div>
  </section>
));

// ── 20. Wave Divider ───────────────────────────────────────────────
const Hero20 = memo(({ language: l }) => (
  <section className="pt-28 bg-blue-900 relative">
    <motion.div {...fade} className="max-w-7xl mx-auto px-6 text-center pb-14">
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
        {l === "es" ? "Innovación digital, impacto real" : "Digital Innovation, Real Impact"}
      </h1>
      <p className="text-blue-200 max-w-xl mx-auto">
        {l === "es"
          ? "Proyectos construidos con pasión, entregados con precisión."
          : "Projects built with passion, delivered with precision."}
      </p>
    </motion.div>
    <svg viewBox="0 0 1440 60" className="block w-full" preserveAspectRatio="none" style={{ height: 60 }}>
      <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="white" />
    </svg>
  </section>
));

const portfolioProjects_count = "06";

export const heroVariants = [
  { id: 1, label: "I",    component: Hero1  },
  { id: 2, label: "II",   component: Hero2  },
  { id: 3, label: "III",  component: Hero3  },
  { id: 4, label: "IV",   component: Hero4  },
  { id: 5, label: "V",    component: Hero5  },
  { id: 6, label: "VI",   component: Hero6  },
  { id: 7, label: "VII",  component: Hero7  },
  { id: 8, label: "VIII", component: Hero8  },
  { id: 9, label: "IX",   component: Hero9  },
  { id: 10, label: "X",   component: Hero10 },
  { id: 11, label: "XI",  component: Hero11 },
  { id: 12, label: "XII", component: Hero12 },
  { id: 13, label: "XIII",component: Hero13 },
  { id: 14, label: "XIV", component: Hero14 },
  { id: 15, label: "XV",  component: Hero15 },
  { id: 16, label: "XVI", component: Hero16 },
  { id: 17, label: "XVII",component: Hero17 },
  { id: 18, label: "XVIII",component: Hero18 },
  { id: 19, label: "XIX", component: Hero19 },
  { id: 20, label: "XX",  component: Hero20 },
];