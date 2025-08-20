import React from 'react';
import { Percent, ShoppingCart, Zap } from 'lucide-react';
import { useStore } from '../contexts/StoreContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';

export const SpecialOffersPage: React.FC = () => {
  const { products } = useStore();
  const { language } = useLanguage();
  const { addToCart } = useCart();

  // Get products with special offers (products with oldPrice)
  const specialOffers = products.filter(product => product.oldPrice && product.oldPrice > product.price);

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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Percent className="text-red-500" size={40} />
            <h1 className="text-4xl font-bold text-gray-800">العروض الخاصة</h1>
            <Percent className="text-red-500" size={40} />
          </div>
          <p className="text-xl text-gray-600 mb-4">خصومات حصرية لفترة محدودة</p>
          <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-pink-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {specialOffers.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group hover:-translate-y-2 border-2 border-red-200"
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name[language]}
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 bg-red-500 text-white px-4 py-2 rounded-full text-lg font-bold animate-pulse">
                  خصم {Math.round(((product.oldPrice! - product.price) / product.oldPrice!) * 100)}%
                </div>
                <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                  <Percent size={14} />
                  عرض خاص
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-bold text-lg text-gray-800 mb-3 line-clamp-2 group-hover:text-red-600 transition-colors">
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

                {product.inStock && (
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => handleAddToCart(product, e)}
                      className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-3 px-3 rounded-xl transition-colors text-sm font-medium"
                    >
                      <ShoppingCart size={16} />
                      أضف للسلة
                    </button>
                    <button
                      onClick={(e) => handleAddToCart(product, e)}
                      className="flex-1 flex items-center justify-center gap-2 bg-pink-500 hover:bg-pink-600 text-white py-3 px-3 rounded-xl transition-colors text-sm font-medium"
                    >
                      <Zap size={16} />
                      اطلب الآن
                    </button>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>

        {specialOffers.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎉</div>
            <p className="text-gray-500 text-xl">لا توجد عروض خاصة حالياً</p>
          </div>
        )}
      </div>
    </div>
  );
};