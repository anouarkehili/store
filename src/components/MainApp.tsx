import React, { useState } from 'react';
import { Header } from './Header';
import { AdvertisementSlider } from './AdvertisementSlider';
import { CategorySection } from './CategorySection';
import { ProductGrid } from './ProductGrid';
import { ProductDetail } from './ProductDetail';
import { Cart } from './Cart';
import { Footer } from './Footer';
import { AdminPanel } from './AdminPanel';
import { useAuth } from '../contexts/AuthContext';

interface MainAppProps {
  currentView: 'store' | 'product' | 'cart' | 'admin';
  setCurrentView: React.Dispatch<React.SetStateAction<'store' | 'product' | 'cart' | 'admin'>>;
  selectedProductId: string | null;
  setSelectedProductId: React.Dispatch<React.SetStateAction<string | null>>;
  selectedCategory: string | null;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string | null>>;
  isCartOpen: boolean;
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MainApp: React.FC<MainAppProps> = ({
  currentView,
  setCurrentView,
  selectedProductId,
  setSelectedProductId,
  selectedCategory,
  setSelectedCategory,
  isCartOpen,
  setIsCartOpen
}) => {
  const { isAdmin } = useAuth();

  const handleProductSelect = (productId: string) => {
    setSelectedProductId(productId);
    setCurrentView('product');
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    // Scroll to products section when category is selected
    const productsSection = document.getElementById('products-section');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBackToStore = () => {
    setCurrentView('store');
    setSelectedProductId(null);
    setSelectedCategory(null);
  };

  const handleCartOpen = () => {
    setIsCartOpen(true);
  };

  const handleCartClose = () => {
    setIsCartOpen(false);
  };

  const handleAdminAccess = () => {
    // Only allow admin users to access the admin panel
    if (isAdmin) {
      setCurrentView('admin');
    } else {
      // Optionally show a message that admin access is required
      alert('Admin access required');
    }
  };

  return (
    <>
      {currentView === 'admin' ? (
        <AdminPanel onBack={() => setCurrentView('store')} />
      ) : (
        <>
          <Header 
            onCartClick={handleCartOpen}
            onAdminAccess={handleAdminAccess}
          />
          
          {currentView === 'store' && (
            <main>
              <AdvertisementSlider />
              <section id="categories-section">
                <CategorySection onCategoryClick={handleCategorySelect} />
              </section>
              <section id="products-section">
                <ProductGrid 
                  selectedCategory={selectedCategory}
                  onProductClick={handleProductSelect}
                />
              </section>
            </main>
          )}

          {currentView === 'product' && selectedProductId && (
            <ProductDetail 
              productId={selectedProductId}
              onBack={handleBackToStore}
            />
          )}

          <Footer />

          {isCartOpen && (
            <Cart onClose={handleCartClose} />
          )}
        </>
      )}
    </>
  );
};