import React from 'react';
import { ShoppingCart, Zap } from 'lucide-react';
import { useStore } from '../contexts/StoreContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';

interface ProductGridProps {
  selectedCategory: string | null;
  onProductClick: (productId: string) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ selectedCategory, onProductClick }) => {
  const { products } = useStore();
  const { language, t } = useLanguage();
  const { addToCart } = useCart();

  const filteredProducts = selectedCategory 
    ? products.filter(product => product.categoryId === selectedCategory)
    : products;

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
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">{t('products.title')}</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div 
            key={product.id}
            onClick={() => onProductClick(product.id)}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group"
          >
            {/* Product Image */}
            <div className="relative overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name[language]}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {product.oldPrice && (
                <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                  تخفيض
                </div>
              )}
              {!product.inStock && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <span className="text-white font-bold">نفد المخزون</span>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="p-4">
              <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                {product.name[language]}
              </h3>
              
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {product.description[language]}
              </p>

              {/* Price */}
              <div className="mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-green-600">
                    {product.price.toLocaleString()} دج
                  </span>
                  {product.oldPrice && (
                    <span className="text-sm text-gray-400 line-through">
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
                    className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg transition-colors text-sm font-medium"
                  >
                    <ShoppingCart size={16} />
                    {t('products.add.cart')}
                  </button>
                  <button
                    onClick={(e) => handleOrderNow(product, e)}
                    className="flex-1 flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white py-2 px-3 rounded-lg transition-colors text-sm font-medium"
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

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">لا توجد منتجات في هذا القسم</p>
        </div>
      )}
    </section>
  );
};