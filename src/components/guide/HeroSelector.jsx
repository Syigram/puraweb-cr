import React, { useState, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
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

  const floatingSelector = createPortal(
    <>
      {/* Close overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[998]" onClick={() => setIsOpen(false)} />
      )}

      {/* Floating button */}
      <div className="fixed bottom-6 left-6 z-[999]">
        <div className="relative">
          <button
            onClick={() => setIsOpen(prev => !prev)}
            className="flex items-center gap-2 bg-blue-900 hover:bg-blue-800 text-white px-4 py-2.5 rounded-2xl shadow-xl text-sm font-semibold transition-colors"
          >
            <span className="hidden sm:inline">{language === 'es' ? 'Estilo Hero:' : 'Hero Style:'}</span>
            <span className="max-w-[120px] truncate">{selectedHero.name}</span>
            <ChevronDown className={`w-4 h-4 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>

          {isOpen && (
            <div className="absolute bottom-full left-0 mb-2 w-52 bg-white border border-gray-200 rounded-2xl shadow-2xl max-h-72 overflow-y-auto">
              <div className="p-1.5 space-y-0.5">
                {heroVariants.map((hero) => (
                  <button
                    key={hero.id}
                    onClick={() => handleSelectHero(hero.id)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-all ${
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
    </>,
    document.body
  );

  return (
    <div className="w-full">
      {selectedHero.render(t, language)}
      {floatingSelector}
    </div>
  );
}

export default HeroSelector;