import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useStore } from '../contexts/StoreContext';
import { useLanguage } from '../contexts/LanguageContext';

export const AdvertisementSlider: React.FC = () => {
  const { advertisements } = useStore();
  const { language } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (advertisements.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % advertisements.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [advertisements.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % advertisements.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + advertisements.length) % advertisements.length);
  };

  if (advertisements.length === 0) return null;

  return (
    <div className="relative w-full h-96 md:h-[600px] overflow-hidden bg-gray-200 rounded-3xl mx-4 my-8 shadow-2xl">
      {/* Slides */}
      <div 
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(${-currentSlide * 100}%)` }}
      >
        {advertisements.map((ad, index) => (
          <div key={ad.id} className="w-full flex-shrink-0 relative">
            <img
              src={ad.image}
              alt={ad.title[language]}
              className="w-full h-full object-cover rounded-3xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent rounded-3xl flex items-end justify-center pb-16">
              <h2 className="text-white text-4xl md:text-6xl font-bold text-center px-8 drop-shadow-2xl">
                {ad.title[language]}
              </h2>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      {advertisements.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-8 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-4 transition-all shadow-xl hover:scale-110"
          >
            <ChevronLeft className="text-gray-800" size={28} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-4 transition-all shadow-xl hover:scale-110"
          >
            <ChevronRight className="text-gray-800" size={28} />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4">
            {advertisements.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-5 h-5 rounded-full transition-all ${
                  currentSlide === index ? 'bg-white scale-125 shadow-lg' : 'bg-white/60 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};