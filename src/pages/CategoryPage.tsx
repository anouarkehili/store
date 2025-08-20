import React from 'react';
import { useParams } from 'react-router-dom';
import { ProductGrid } from '../components/ProductGrid';
import { useStore } from '../contexts/StoreContext';
import { useLanguage } from '../contexts/LanguageContext';

export const CategoryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { categories } = useStore();
  const { language } = useLanguage();

  const category = categories.find(c => c.id === id);

  if (!category) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-gray-500">التصنيف غير موجود</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div 
            className="w-24 h-24 mx-auto mb-4 rounded-2xl flex items-center justify-center text-4xl shadow-lg"
            style={{ 
              background: `linear-gradient(135deg, ${category.color}20, ${category.color}10)`,
              border: `3px solid ${category.color}40`
            }}
          >
            {category.icon}
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">{category.name[language]}</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-orange-500 mx-auto rounded-full"></div>
        </div>
        
        <ProductGrid 
          selectedCategory={id || null}
          onProductClick={(productId) => window.location.href = `/product/${productId}`}
          showPagination={true}
          productsPerPage={25}
        />
      </div>
    </div>
  );
};