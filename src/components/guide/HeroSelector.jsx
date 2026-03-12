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

  const t = {
    title,
    subtitle
  };

  return (
    <div className="w-full">
      {/* Hero Display */}
      <div className="w-full">
        {selectedHero.render(t, language)}
      </div>

      {/* Selector Dropdown */}
      <div className="relative pt-8 pb-8 px-6 bg-white border-t border-gray-200">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
              {language === 'es' ? 'Cambiar Estilo del Hero' : 'Change Hero Style'}
            </p>
            <span className="text-xs bg-blue-100 text-blue-900 px-3 py-1 rounded-full font-medium">
              {selectedHeroId}/20
            </span>
          </div>

          {/* Dropdown */}
          <div className="relative w-full md:w-64">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-xl text-left font-medium text-gray-900 flex items-center justify-between hover:border-blue-500 transition-colors"
            >
              <span>{selectedHero.name}</span>
              <ChevronDown 
                className={`w-5 h-5 text-gray-600 transition-transform ${isOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-gray-300 rounded-xl shadow-2xl z-50 max-h-96 overflow-y-auto">
                <div className="p-2 space-y-1">
                  {heroVariants.map((hero) => (
                    <button
                      key={hero.id}
                      onClick={() => handleSelectHero(hero.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all ${
                        selectedHeroId === hero.id
                          ? 'bg-blue-900 text-white'
                          : 'text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      <span className="text-sm font-semibold opacity-75">
                        {String(hero.id).padStart(2, '0')}
                      </span>
                      <span className="ml-3">{hero.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Grid View Alternative */}
          <div className="mt-8">
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-4">
              {language === 'es' ? 'o selecciona un estilo rápidamente' : 'or select a style quickly'}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2">
              {heroVariants.map((hero) => (
                <button
                  key={hero.id}
                  onClick={() => handleSelectHero(hero.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                    selectedHeroId === hero.id
                      ? 'bg-blue-900 text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                  title={hero.name}
                >
                  {String(hero.id).padStart(2, '0')}
                </button>
              ))}
            </div>
          </div>
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