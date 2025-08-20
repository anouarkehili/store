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
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">{t('categories.title')}</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-orange-500 mx-auto rounded-full"></div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryClick(category.id)}
            className="group relative p-8 bg-gradient-to-br from-white via-gray-50 to-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-transparent overflow-hidden transform hover:-translate-y-3 hover:rotate-1"
            style={{ '--category-color': category.color } as React.CSSProperties}
          >
            {/* Background gradient effect */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-500 rounded-3xl"
              style={{ background: `linear-gradient(135deg, ${category.color}30, ${category.color}10, ${category.color}30)` }}
            />
            
            <div className="text-center">
              <div 
                className="w-28 h-28 mx-auto mb-6 rounded-3xl flex items-center justify-center text-6xl group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-2xl"
                style={{ 
                  background: `linear-gradient(135deg, ${category.color}25, ${category.color}15, ${category.color}25)`,
                  border: `4px solid ${category.color}50`,
                  boxShadow: `0 12px 40px ${category.color}30`
                }}
              >
                {category.icon}
              </div>
              <h3 
                className="font-bold text-2xl text-gray-800 group-hover:scale-110 transition-all duration-300 mb-3"
                style={{ color: category.color }}
              >
                {category.name[language]}
              </h3>
              <div className="mt-4 h-2 w-0 group-hover:w-full bg-gradient-to-r transition-all duration-500 mx-auto rounded-full"
                   style={{ backgroundImage: `linear-gradient(90deg, ${category.color}, ${category.color}80)` }}
              />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-6 right-6 w-5 h-5 rounded-full opacity-20 group-hover:opacity-50 transition-all duration-300 group-hover:scale-150"
                 style={{ backgroundColor: category.color }}
            />
            <div className="absolute bottom-6 left-6 w-4 h-4 rounded-full opacity-20 group-hover:opacity-50 transition-all duration-300 group-hover:scale-150"
                 style={{ backgroundColor: category.color }}
            />
            <div className="absolute top-1/2 left-3 w-3 h-3 rounded-full opacity-10 group-hover:opacity-30 transition-all duration-300"
                 style={{ backgroundColor: category.color }}
            />
          </button>
        ))}
      </div>
    </section>
  );
};