import React from 'react';
import { useState } from 'react';
import { ShoppingCart, Zap } from 'lucide-react';
import { useStore } from '../contexts/StoreContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';

interface ProductGridProps {
  selectedCategory: string | null;
  onProductClick: (productId: string) => void;
  showPagination?: boolean;
  productsPerPage?: number;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ 
  selectedCategory, 
  onProductClick, 
  showPagination = true,
  productsPerPage = 25 
}) => {
  const { products } = useStore();
  const { language, t } = useLanguage();
  const { addToCart } = useCart();
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProducts = selectedCategory 
    ? products.filter(product => product.categoryId === selectedCategory)
    : products;

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = showPagination 
    ? filteredProducts.slice(startIndex, endIndex)
    : filteredProducts;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (product: any, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  const handleOrderNow = (product: any, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    // Could open cart or checkout directly
  };

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">{t('products.title')}</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-orange-500 mx-auto rounded-full"></div>
        {showPagination && (
          <p className="text-gray-600 mt-4">
            عرض {startIndex + 1} - {Math.min(endIndex, filteredProducts.length)} من {filteredProducts.length} منتج
          </p>
        )}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {currentProducts.map((product) => (
          <div 
            key={product.id}
            onClick={() => onProductClick(product.id)}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer group hover:-translate-y-2"
          >
            {/* Product Image */}
            <div className="relative overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name[language]}
                className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              {product.oldPrice && (
                <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                  خصم {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                </div>
              )}
              {!product.inStock && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <span className="text-white font-bold">نفد المخزون</span>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="p-5">
              <h3 className="font-bold text-lg text-gray-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                {product.name[language]}
              </h3>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {product.description[language]}
              </p>

              {/* Price */}
              <div className="mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-green-600">
                    {product.price.toLocaleString()} دج
                  </span>
                  {product.oldPrice && (
                    <span className="text-lg text-gray-400 line-through">
                      {product.oldPrice.toLocaleString()} دج
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              {product.inStock && (
                <div className="flex gap-2">
                  <button
                    onClick={(e) => handleAddToCart(product, e)}
                    className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-3 rounded-xl transition-colors text-sm font-medium"
                  >
                    <ShoppingCart size={16} />
                    {t('products.add.cart')}
                  </button>
                  <button
                    onClick={(e) => handleOrderNow(product, e)}
                    className="flex-1 flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white py-3 px-3 rounded-xl transition-colors text-sm font-medium"
                  >
                    <Zap size={16} />
                    {t('products.order.now')}
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {showPagination && totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-12">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-6 py-3 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            السابق
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-3 rounded-xl transition-colors font-medium ${
                currentPage === page
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white border border-gray-300 hover:bg-gray-50 hover:border-blue-300'
              }`}
            >
              {page}
            </button>
          ))}
          
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-6 py-3 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            التالي
          </button>
        </div>
      )}
      {currentProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📦</div>
          <p className="text-gray-500 text-xl">لا توجد منتجات في هذا القسم</p>
        </div>
      )}
    </section>
  );
};