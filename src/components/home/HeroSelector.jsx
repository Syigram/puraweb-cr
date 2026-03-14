import React, { useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown } from "lucide-react";

const HeroSelector = memo(function HeroSelector({ currentVariant, onVariantChange }) {
  const [isOpen, setIsOpen] = useState(false);
  
  const variants = Array.from({ length: 25 }, (_, i) => i + 1);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      <motion.div
        className="fixed bottom-6 left-6 z-50"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex flex-col-reverse gap-3">
          {/* Selector Grid */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-2xl shadow-2xl p-4 border-2 border-blue-900 grid grid-cols-5 gap-2 w-80 md:w-96"
              >
                {variants.map((variant) => (
                  <motion.button
                    key={variant}
                    onClick={() => {
                      onVariantChange(variant);
                      setIsOpen(false);
                    }}
                    className={`
                      w-full aspect-square rounded-lg font-bold text-sm transition-all
                      ${
                        currentVariant === variant
                          ? "bg-red-600 text-white shadow-lg scale-105"
                          : "bg-gray-100 text-gray-700 hover:bg-blue-100"
                      }
                    `}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {variant}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Toggle Button */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-900 to-blue-700 hover:from-blue-800 hover:to-blue-600 text-white rounded-full p-4 shadow-lg flex items-center justify-center"
          >
            <div className="flex flex-col items-center gap-1">
              <span className="text-xs font-semibold">Estilo</span>
              <span className="text-lg font-bold">{currentVariant}</span>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronUp className="w-4 h-4" />
              </motion.div>
            </div>
          </motion.button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
});

export default HeroSelector;