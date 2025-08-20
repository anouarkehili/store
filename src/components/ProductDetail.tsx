import React, { useState } from 'react';
import { ArrowRight, ShoppingCart, Zap, Star } from 'lucide-react';
import { useStore } from '../contexts/StoreContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';

interface ProductDetailProps {
  productId: string;
  onBack: () => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ productId, onBack }) => {
  const { products } = useStore();
  const { language, t } = useLanguage();
  const { addToCart } = useCart();

  const product = products.find(p => p.id === productId);
  const [selectedFlavor, setSelectedFlavor] = useState(product?.flavors?.[0] || '');
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || '');
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-gray-500">المنتج غير موجود</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      selectedFlavor: selectedFlavor || undefined,
      selectedSize: selectedSize || undefined,
    });
  };

  const handleOrderNow = () => {
    handleAddToCart();
    // Could navigate to cart or checkout
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 font-medium"
      >
        <ArrowRight size={20} />
        {t('products.back')}
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="space-y-4">
          <div className="relative overflow-hidden rounded-xl">
            <img 
              src={product.image} 
              alt={product.name[language]}
              className="w-full h-96 object-cover"
            />
            {product.oldPrice && (
              <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full font-bold">
                تخفيض {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
              </div>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name[language]}</h1>
            
            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex text-yellow-400">
                {[1,2,3,4,5].map(star => (
                  <Star key={star} size={20} fill="currentColor" />
                ))}
              </div>
              <span className="text-gray-600">(4.8)</span>
            </div>

            <p className="text-gray-600 text-lg leading-relaxed">{product.description[language]}</p>
          </div>

          {/* Price */}
          <div className="border-t border-b py-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-green-600">
                {product.price.toLocaleString()} دج
              </span>
              {product.oldPrice && (
                <span className="text-xl text-gray-400 line-through">
                  {product.oldPrice.toLocaleString()} دج
                </span>
              )}
            </div>
          </div>

          {/* Variants */}
          <div className="space-y-4">
            {/* Flavors */}
            {product.flavors && product.flavors.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">{t('products.flavors')}</h3>
                <div className="flex flex-wrap gap-2">
                  {product.flavors.map(flavor => (
                    <button
                      key={flavor}
                      onClick={() => setSelectedFlavor(flavor)}
                      className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                        selectedFlavor === flavor
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {flavor}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">{t('products.sizes')}</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                        selectedSize === size
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">{t('cart.quantity')}</h3>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                >
                  -
                </button>
                <span className="w-12 text-center font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {product.inStock ? (
            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition-colors font-medium"
              >
                <ShoppingCart size={20} />
                {t('products.add.cart')}
              </button>
              <button
                onClick={handleOrderNow}
                className="flex-1 flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-lg transition-colors font-medium"
              >
                <Zap size={20} />
                {t('products.order.now')}
              </button>
            </div>
          ) : (
            <div className="bg-gray-100 text-gray-600 py-3 px-6 rounded-lg text-center font-medium">
              نفد المخزون
            </div>
          )}

          {/* Usage Instructions */}
          <div className="bg-blue-50 p-6 rounded-xl">
            <h3 className="font-semibold text-gray-800 mb-3">{t('products.usage')}</h3>
            <p className="text-gray-700 leading-relaxed">{product.usage[language]}</p>
          </div>
        </div>
      </div>
    </div>
  );
};