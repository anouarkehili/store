import React, { useState } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import { StoreProvider } from './contexts/StoreContext';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import { MainApp } from './components/MainApp';

function App() {
  const [currentView, setCurrentView] = useState<'store' | 'product' | 'cart' | 'admin'>('store');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleProductSelect = (productId: string) => {
    setSelectedProductId(productId);
    setCurrentView('product');
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentView('store');
  };

  const handleBackToStore = () => {
    setCurrentView('store');
    setSelectedProductId(null);
  };

  const handleCartOpen = () => {
    setIsCartOpen(true);
  };

  const handleCartClose = () => {
    setIsCartOpen(false);
  };

  const handleAdminAccess = () => {
    setCurrentView('admin');
  };

  return (
    <AuthProvider>
      <LanguageProvider>
        <StoreProvider>
          <CartProvider>
            <div className="min-h-screen bg-gray-50" dir="rtl">
              <MainApp
                currentView={currentView}
                setCurrentView={setCurrentView}
                selectedProductId={selectedProductId}
                setSelectedProductId={setSelectedProductId}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                isCartOpen={isCartOpen}
                setIsCartOpen={setIsCartOpen}
              />
            </div>
          </CartProvider>
        </StoreProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;