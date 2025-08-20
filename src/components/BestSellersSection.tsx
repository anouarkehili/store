import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, ShoppingCart, Zap, Star } from 'lucide-react';
import { useStore } from '../contexts/StoreContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';

export const BestSellersSection: React.FC = () => {
  const { products } = useStore();
  const { language, t } = useLanguage();
  const { addToCart } = useCart();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Get best selling products (first 8 products for demo)
  const bestSellers = products.slice(0, 8);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const handleAddToCart = (product: any, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  if (bestSellers.length === 0) return null;

  return (
    <section className="container mx-auto px-4 py-12 bg-gradient-to-br from-blue-50 to-orange-50 rounded-3xl my-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-4xl font-bold text-gray-800 mb-2">🔥 الأكثر مبيعاً</h2>
          <p className="text-gray-600">المنتجات الأكثر طلباً من عملائنا</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={scrollLeft}
            className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110"
          >
            <ChevronRight className="text-gray-600" size={24} />
          </button>
          <button
            onClick={scrollRight}
            className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110"
          >
            <ChevronLeft className="text-gray-600" size={24} />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {bestSellers.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="flex-shrink-0 w-80 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group hover:-translate-y-2"
          >
            <div className="relative">
              <img
                src={product.image}
                alt={product.name[language]}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {product.oldPrice && (
                <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  خصم {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                </div>
              )}
              <div className="absolute top-3 left-3 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                <Star size={14} fill="currentColor" />
                الأكثر مبيعاً
              </div>
            </div>

            <div className="p-6">
              <h3 className="font-bold text-xl text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                {product.name[language]}
              </h3>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {product.description[language]}
              </p>

              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-2xl font-bold text-green-600">
                    {product.price.toLocaleString()} دج
                  </span>
                  {product.oldPrice && (
                    <span className="text-sm text-gray-400 line-through mr-2">
                      {product.oldPrice.toLocaleString()} دج
                    </span>
                  )}
                </div>
                <div className="flex text-yellow-400">
                  {[1,2,3,4,5].map(star => (
                    <Star key={star} size={16} fill="currentColor" />
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={(e) => handleAddToCart(product, e)}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-xl transition-colors font-medium"
                >
                  <ShoppingCart size={18} />
                  أضف للسلة
                </button>
                <button
                  onClick={(e) => handleAddToCart(product, e)}
                  className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-xl transition-colors font-medium"
                >
                  <Zap size={18} />
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="text-center mt-8">
        <Link
          to="/best-sellers"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-orange-500 text-white px-8 py-3 rounded-full font-bold hover:from-blue-700 hover:to-orange-600 transition-all transform hover:scale-105"
        >
          عرض جميع المنتجات الأكثر مبيعاً
          <ChevronLeft size={20} />
        </Link>
      </div>
    </section>
  );
};