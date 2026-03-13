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
      {/* Selector Dropdown — above the Hero, below the nav */}
      <div className="relative bg-white border-b border-gray-200 px-6 py-3 pt-20">
        <div className="max-w-5xl mx-auto flex items-center gap-4">
          <p className="text-sm font-semibold text-gray-600 whitespace-nowrap">
            {language === 'es' ? 'Estilo del Hero:' : 'Hero Style:'}
          </p>

          <div className="relative w-full max-w-xs">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-full px-4 py-2 bg-white border-2 border-gray-300 rounded-xl text-left font-medium text-gray-900 flex items-center justify-between hover:border-blue-500 transition-colors text-sm"
            >
              <span>{selectedHero.name}</span>
              <ChevronDown 
                className={`w-4 h-4 text-gray-600 transition-transform ${isOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {isOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-gray-300 rounded-xl shadow-2xl z-50 max-h-80 overflow-y-auto">
                <div className="p-2 space-y-1">
                  {heroVariants.map((hero) => (
                    <button
                      key={hero.id}
                      onClick={() => handleSelectHero(hero.id)}
                      className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                        selectedHeroId === hero.id
                          ? 'bg-blue-900 text-white'
                          : 'text-gray-900 hover:bg-gray-100'
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
      </div>

      {/* Hero Display */}
      <div className="w-full">
        {selectedHero.render(t, language)}
      </div>

      {/* Close dropdown when clicking outside */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}

export default HeroSelector;