import React from 'react';
import { useStore } from '../contexts/StoreContext';
import { useLanguage } from '../contexts/LanguageContext';

interface CategorySectionProps {
  onCategoryClick: (categoryId: string) => void;
}

export const CategorySection: React.FC<CategorySectionProps> = ({ onCategoryClick }) => {
  const { categories } = useStore();
  const { language, t } = useLanguage();

  return (
    <section className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">{t('categories.title')}</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryClick(category.id)}
            className="group relative p-8 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-transparent overflow-hidden transform hover:-translate-y-2"
            style={{ '--category-color': category.color } as React.CSSProperties}
          >
            {/* Background gradient effect */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
              style={{ background: `linear-gradient(135deg, ${category.color}20, ${category.color}40)` }}
            />
            
            <div className="text-center">
              <div 
                className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center text-4xl group-hover:scale-110 transition-all duration-500 shadow-lg"
                style={{ backgroundColor: `${category.color}15`, border: `2px solid ${category.color}30` }}
              >
                {category.icon}
              </div>
              <h3 
                className="font-bold text-lg text-gray-800 group-hover:scale-105 transition-all duration-300"
                style={{ color: category.color }}
              >
                {category.name[language]}
              </h3>
              <div className="mt-2 h-1 w-0 group-hover:w-full bg-gradient-to-r transition-all duration-500 mx-auto rounded-full"
                   style={{ backgroundImage: `linear-gradient(90deg, ${category.color}, ${category.color}80)` }}
              />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-2 right-2 w-3 h-3 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300"
                 style={{ backgroundColor: category.color }}
            />
            <div className="absolute bottom-2 left-2 w-2 h-2 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300"
                 style={{ backgroundColor: category.color }}
            />
          </button>
        ))}
      </div>
    </section>
  );
};