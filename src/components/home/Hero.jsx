import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Globe, ShoppingCart, Code, Zap } from "lucide-react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useLanguage } from "@/components/LanguageContext";
import { translations } from "@/components/translations";

const Typewriter = ({ words }) => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const handleType = () => {
      const i = loopNum % words.length;
      const fullText = words[i];

      setText(isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1));

      setTypingSpeed(isDeleting ? 30 : 150);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, words, typingSpeed]);

  return (
    <span>
      {text}
      <span className="animate-pulse border-r-2 border-red-600 ml-1 h-full inline-block align-middle">&nbsp;</span>
    </span>
  );
};

export default function Hero({ onGetStarted }) {
  const { language } = useLanguage();
  const t = translations[language].hero;
  
  // Mouse parallax effect
  const ref = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const springConfig = { damping: 25, stiffness: 150 };
  const x1 = useSpring(useTransform(mouseX, [-0.5, 0.5], [-20, 20]), springConfig);
  const y1 = useSpring(useTransform(mouseY, [-0.5, 0.5], [-20, 20]), springConfig);
  const x2 = useSpring(useTransform(mouseX, [-0.5, 0.5], [30, -30]), springConfig); // Reverse direction for depth
  const y2 = useSpring(useTransform(mouseY, [-0.5, 0.5], [30, -30]), springConfig);

  return (
    <section 
      ref={ref}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center overflow-hidden bg-slate-50"
    >
      {/* Tech Grid Background */}
      <div className="absolute inset-0 z-0 opacity-[0.03]" 
        style={{ 
          backgroundImage: `linear-gradient(#002B7F 1px, transparent 1px), linear-gradient(90deg, #002B7F 1px, transparent 1px)`, 
          backgroundSize: '40px 40px' 
        }} 
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white z-0" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute top-20 right-10 w-96 h-96 bg-blue-900 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="absolute bottom-20 left-10 w-96 h-96 bg-red-600 rounded-full blur-3xl"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-32 md:py-40">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-blue-100 text-blue-900 px-4 py-2 rounded-full mb-6"
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">{t.badge}</span>
            </motion.div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 bg-clip-text text-transparent">
                {t.title1}
              </span>
              <br />
              <span className="bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent min-h-[1.2em] block md:inline-block">
                <Typewriter words={t.typewriterWords || [t.title2]} />
              </span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-xl">
              {t.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button
                onClick={onGetStarted}
                size="lg"
                className="bg-gradient-to-r from-blue-900 to-blue-700 hover:from-blue-800 hover:to-blue-600 text-white text-lg px-8 py-6 shadow-xl hover:shadow-2xl transition-all"
              >
                {t.getStarted}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                onClick={() => {
                  const el = document.getElementById("pricing");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                size="lg"
                variant="outline"
                className="border-2 border-blue-900 text-blue-900 hover:bg-blue-50 text-lg px-8 py-6"
              >
                {t.viewPlans}
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div>
                <div className="text-3xl font-bold text-blue-900 mb-1">150+</div>
                <div className="text-sm text-gray-600">{t.stat1}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-900 mb-1">98%</div>
                <div className="text-sm text-gray-600">{t.stat2}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-900 mb-1">24/7</div>
                <div className="text-sm text-gray-600">{t.stat3}</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:block relative perspective-1000"
          >
            <div className="relative h-[500px] w-full flex items-center justify-center">
              {/* Floating Code Element - Background */}
              <motion.div 
                 style={{ x: x2, y: y2 }}
                 className="absolute z-10 w-64 h-64 bg-gradient-to-br from-blue-900 to-red-600 rounded-full flex items-center justify-center shadow-2xl opacity-20 blur-2xl"
              />
              
              {/* Central Hub */}
              <motion.div 
                style={{ x: mouseX, y: mouseY }}
                className="relative z-20 w-48 h-48 bg-white rounded-3xl shadow-xl flex items-center justify-center border border-gray-100"
              >
                <div className="text-center">
                  <div className="bg-blue-50 p-4 rounded-2xl inline-block mb-2">
                    <Code className="w-10 h-10 text-blue-900" />
                  </div>
                  <p className="font-bold text-blue-900 text-sm">WebCraft OS</p>
                  <p className="text-xs text-green-500 font-medium flex items-center justify-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    Online
                  </p>
                </div>
              </motion.div>

              {/* Card 1: Web Dev */}
              <motion.div
                style={{ x: x1, y: y1 }}
                className="absolute top-10 right-0 bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-5 w-60 border-l-4 border-blue-900 z-30"
              >
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Globe className="w-6 h-6 text-blue-900" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm mb-1">
                      {translations[language].services.webDev.title}
                    </h3>
                    <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 w-[85%] rounded-full" />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Card 2: E-Commerce */}
              <motion.div
                style={{ x: x2, y: y2 }}
                className="absolute bottom-20 left-0 bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-5 w-60 border-l-4 border-red-600 z-30"
              >
                <div className="flex items-start gap-3">
                  <div className="bg-red-100 p-2 rounded-lg">
                    <ShoppingCart className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm mb-1">
                      {translations[language].services.ecommerce.title}
                    </h3>
                    <div className="flex gap-1 mt-1">
                      <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-medium">$ Revenue</span>
                      <span className="text-xs bg-red-100 text-red-700 px-1.5 py-0.5 rounded font-medium">+125%</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Card 3: Performance (New) */}
              <motion.div
                 style={{ x: useSpring(useTransform(mouseX, [-0.5, 0.5], [-40, 40])), y: useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10])) }}
                 className="absolute top-40 -right-10 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-4 border border-gray-100 z-20 hidden xl:block"
              >
                 <div className="flex items-center gap-3">
                    <Zap className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    <div>
                       <p className="text-xs text-gray-500 uppercase font-bold">Speed Score</p>
                       <p className="text-xl font-black text-gray-900">100/100</p>
                    </div>
                 </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-blue-900 rounded-full flex items-start justify-center p-2"
        >
          <div className="w-1 h-2 bg-blue-900 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}