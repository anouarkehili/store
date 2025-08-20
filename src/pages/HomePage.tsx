import React from 'react';
import { AdvertisementSlider } from '../components/AdvertisementSlider';
import { CategorySection } from '../components/CategorySection';
import { BestSellersSection } from '../components/BestSellersSection';
import { SpecialOffersSection } from '../components/SpecialOffersSection';
import { ProductGrid } from '../components/ProductGrid';
import { StoreFeatures } from '../components/StoreFeatures';
import { useNavigate } from 'react-router-dom';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/category/${categoryId}`);
  };

  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  return (
    <main>
      <AdvertisementSlider />
      <section id="categories-section">
        <CategorySection onCategoryClick={handleCategoryClick} />
      </section>
      
      <BestSellersSection />
      <SpecialOffersSection />
      <StoreFeatures />
      
      <section id="products-section">
        <ProductGrid
          selectedCategory={null}
          onProductClick={handleProductClick}
          showPagination={true}
          productsPerPage={25}
        />
      </section>
    </main>
  );
};