import React, { useState, useCallback, useMemo } from 'react';
import { ChevronDown } from 'lucide-react';
import { heroVariants } from './HeroVariants';

function HeroSelector({ title, subtitle, language }) {
  const [selectedHeroId, setSelectedHeroId] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  const selectedHero = useMemo(() => 
    heroVariants.find(h => h.id === selectedHeroId) || heroVariants[0],
    [selectedHeroId]
  );

  const handleSelectHero = useCallback((id) => {
    setSelectedHeroId(id);
    setIsOpen(false);
  }, []);

  const t = { title, subtitle };

  return (
    <div className="w-full">
      {/* Hero Display */}
      <div className="w-full">
        {selectedHero.render(t, language)}
      </div>

      {/* Floating selector — bottom-left */}
      <div className="fixed bottom-6 left-6 z-50">
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 bg-white border border-gray-200 shadow-lg rounded-xl px-4 py-2.5 text-sm font-medium text-gray-800 hover:border-blue-500 transition-colors"
          >
            <span className="text-xs text-gray-500 font-normal">{language === 'es' ? 'Hero:' : 'Hero:'}</span>
            <span>{selectedHero.name}</span>
            <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>

          {isOpen && (
            <div className="absolute bottom-full left-0 mb-2 w-56 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 max-h-72 overflow-y-auto">
              <div className="p-1.5 space-y-0.5">
                {heroVariants.map((hero) => (
                  <button
                    key={hero.id}
                    onClick={() => handleSelectHero(hero.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedHeroId === hero.id
                        ? 'bg-blue-900 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {hero.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Close dropdown when clicking outside */}
      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
      )}
    </div>
  );
}

export default HeroSelector;