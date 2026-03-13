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

      {/* Floating Hero Style Selector — bottom-left */}
      <div className="fixed bottom-6 left-6 z-50">
        <div className="relative">
          {isOpen && (
            <div className="absolute bottom-full left-0 mb-3 w-56 bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden">
              <div className="p-2 space-y-0.5 max-h-72 overflow-y-auto">
                {heroVariants.map((hero) => (
                  <button
                    key={hero.id}
                    onClick={() => handleSelectHero(hero.id)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all ${
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

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 bg-blue-900 hover:bg-blue-800 text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-lg transition-colors"
          >
            <span>{language === 'es' ? 'Estilo Hero' : 'Hero Style'}</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>
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