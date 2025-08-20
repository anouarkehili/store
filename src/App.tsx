import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { StoreProvider } from './contexts/StoreContext';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { CategoryPage } from './pages/CategoryPage';
import { BestSellersPage } from './pages/BestSellersPage';
import { SpecialOffersPage } from './pages/SpecialOffersPage';
import { ProductPage } from './pages/ProductPage';
import { CartPage } from './pages/CartPage';
import { AdminPage } from './pages/AdminPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { AccountPage } from './pages/AccountPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { Cart } from './components/Cart';
import { useState } from 'react';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <AuthProvider>
      <LanguageProvider>
        <StoreProvider>
          <CartProvider>
            <Router>
              <div className="min-h-screen bg-gray-50" dir="rtl">
                <Header 
                  onCartClick={() => setIsCartOpen(true)}
                  onAdminAccess={() => {}}
                />
                
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/category/:id" element={<CategoryPage />} />
                  <Route path="/best-sellers" element={<BestSellersPage />} />
                  <Route path="/special-offers" element={<SpecialOffersPage />} />
                  <Route path="/product/:id" element={<ProductPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/admin" element={<AdminPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/account" element={<AccountPage />} />
                  <Route path="/privacy" element={<PrivacyPage />} />
                  <Route path="/terms" element={<TermsPage />} />
                </Routes>

                <Footer />

                {isCartOpen && (
                  <Cart onClose={() => setIsCartOpen(false)} />
                )}
              </div>
            </Router>
          </CartProvider>
        </StoreProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;