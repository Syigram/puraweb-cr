import React, { useState, useCallback, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TRANSPARENCY_ICONS } from "./TransparencyIcons";

export default function IconSelector({ selectedId = "network", onSelect = () => {} }) {
  const [currentIndex, setCurrentIndex] = useState(
    TRANSPARENCY_ICONS.findIndex(icon => icon.id === selectedId) || 0
  );

  const currentIcon = useMemo(() => TRANSPARENCY_ICONS[currentIndex], [currentIndex]);
  const IconComponent = currentIcon.component;

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? TRANSPARENCY_ICONS.length - 1 : prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === TRANSPARENCY_ICONS.length - 1 ? 0 : prev + 1));
  }, []);

  const handleSelectDot = useCallback((index) => {
    setCurrentIndex(index);
  }, []);

  // Update parent when selection changes
  React.useEffect(() => {
    onSelect(currentIcon.id);
  }, [currentIndex, currentIcon.id, onSelect]);

  return (
    <div className="w-full flex flex-col items-center gap-8">
      {/* Icon Display */}
      <div className="relative h-64 w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <IconComponent />
        </div>
      </div>

      {/* Icon Label */}
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          {currentIcon.label}
        </h3>
        <p className="text-sm text-gray-500">
          {currentIndex + 1} / {TRANSPARENCY_ICONS.length}
        </p>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-4 justify-center w-full px-4">
        {/* Previous Button */}
        <button
          onClick={handlePrevious}
          className="p-2 rounded-full hover:bg-blue-100 transition-colors text-blue-900"
          aria-label="Previous icon"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Dot Indicators */}
        <div className="flex gap-2 flex-wrap justify-center max-w-xs">
          {TRANSPARENCY_ICONS.map((icon, index) => (
            <button
              key={icon.id}
              onClick={() => handleSelectDot(index)}
              className={`h-2.5 rounded-full transition-all ${
                index === currentIndex
                  ? "w-8 bg-blue-900"
                  : "w-2.5 bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Select ${icon.label}`}
            />
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="p-2 rounded-full hover:bg-blue-100 transition-colors text-blue-900"
          aria-label="Next icon"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Icon List */}
      <div className="hidden sm:grid grid-cols-5 gap-3 w-full">
        {TRANSPARENCY_ICONS.map((icon, index) => (
          <button
            key={icon.id}
            onClick={() => handleSelectDot(index)}
            className={`p-3 rounded-lg transition-all text-sm font-medium ${
              index === currentIndex
                ? "bg-blue-900 text-white shadow-lg"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {icon.label}
          </button>
        ))}
      </div>
    </div>
  );
}