import React from 'react';
import { AdvertisementSlider } from '../components/AdvertisementSlider';
import { CategorySection } from '../components/CategorySection';
import { ProductGrid } from '../components/ProductGrid';

interface HomePageProps {
  onCategoryClick: (categoryId: string) => void;
  onProductClick: (productId: string) => void;
  selectedCategory: string | null;
}

export const HomePage: React.FC<HomePageProps> = ({ onCategoryClick, onProductClick, selectedCategory }) => {
  return (
    <main>
      <AdvertisementSlider />
      <section id="categories-section">
        <CategorySection onCategoryClick={onCategoryClick} />
      </section>
      <section id="products-section">
        <ProductGrid
          selectedCategory={selectedCategory}
          onProductClick={onProductClick}
        />
      </section>
    </main>
  );
};