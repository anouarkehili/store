import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, ShoppingCart, Zap, Percent } from 'lucide-react';
import { useStore } from '../contexts/StoreContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';

export const SpecialOffersSection: React.FC = () => {
  const { products } = useStore();
  const { language, t } = useLanguage();
  const { addToCart } = useCart();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Get products with special offers (products with oldPrice)
  const specialOffers = products.filter(product => product.oldPrice && product.oldPrice > product.price);

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

  if (specialOffers.length === 0) return null;

  return (
    <section className="container mx-auto px-4 py-12 bg-gradient-to-br from-red-50 to-pink-50 rounded-3xl my-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-4xl font-bold text-gray-800 mb-2">🎉 العروض الخاصة</h2>
          <p className="text-gray-600">خصومات حصرية لفترة محدودة</p>
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
        {specialOffers.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="flex-shrink-0 w-80 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group hover:-translate-y-2 border-2 border-red-200"
          >
            <div className="relative">
              <img
                src={product.image}
                alt={product.name[language]}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 right-3 bg-red-500 text-white px-4 py-2 rounded-full text-lg font-bold animate-pulse">
                خصم {Math.round(((product.oldPrice! - product.price) / product.oldPrice!) * 100)}%
              </div>
              <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                <Percent size={14} />
                عرض خاص
              </div>
            </div>

            <div className="p-6">
              <h3 className="font-bold text-xl text-gray-800 mb-2 line-clamp-2 group-hover:text-red-600 transition-colors">
                {product.name[language]}
              </h3>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {product.description[language]}
              </p>

              <div className="mb-4">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl font-bold text-green-600">
                    {product.price.toLocaleString()} دج
                  </span>
                  <span className="text-lg text-gray-400 line-through">
                    {product.oldPrice!.toLocaleString()} دج
                  </span>
                </div>
                <div className="text-sm text-red-600 font-semibold">
                  وفر {(product.oldPrice! - product.price).toLocaleString()} دج
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={(e) => handleAddToCart(product, e)}
                  className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-xl transition-colors font-medium"
                >
                  <ShoppingCart size={18} />
                  أضف للسلة
                </button>
                <button
                  onClick={(e) => handleAddToCart(product, e)}
                  className="flex items-center justify-center gap-2 bg-pink-500 hover:bg-pink-600 text-white py-3 px-4 rounded-xl transition-colors font-medium"
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
          to="/special-offers"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-pink-500 text-white px-8 py-3 rounded-full font-bold hover:from-red-700 hover:to-pink-600 transition-all transform hover:scale-105"
        >
          عرض جميع العروض الخاصة
          <ChevronLeft size={20} />
        </Link>
      </div>
    </section>
  );
};