import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ArrowLeft } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useStore } from '../contexts/StoreContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Checkout } from './Checkout';

interface CartProps {
  onClose: () => void;
}

export const Cart: React.FC<CartProps> = ({ onClose }) => {
  const { items, updateQuantity, removeFromCart, getCartTotal } = useCart();
  const { settings } = useStore();
  const { language, t } = useLanguage();
  const [showCheckout, setShowCheckout] = useState(false);

  if (showCheckout) {
    return <Checkout onBack={() => setShowCheckout(false)} onClose={onClose} />;
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="absolute top-0 right-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-bold text-gray-800">{t('cart.title')}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X size={24} />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <div className="text-6xl mb-4">🛒</div>
                <p className="text-lg">{t('cart.empty')}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex gap-3">
                      <img
                        src={item.image}
                        alt={item.name[language]}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-800 truncate">
                          {item.name[language]}
                        </h4>
                        {item.selectedFlavor && (
                          <p className="text-sm text-gray-600">النكهة: {item.selectedFlavor}</p>
                        )}
                        {item.selectedSize && (
                          <p className="text-sm text-gray-600">الحجم: {item.selectedSize}</p>
                        )}
                        <p className="font-bold text-green-600">
                          {item.price.toLocaleString()} دج
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-white"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-white"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-800">
                          {(item.price * item.quantity).toLocaleString()} دج
                        </span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-1 text-red-500 hover:bg-red-50 rounded"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t p-4 space-y-4">
              <div className="flex justify-between items-center text-xl font-bold">
                <span>{t('cart.total')}</span>
                <span className="text-green-600">{getCartTotal().toLocaleString()} دج</span>
              </div>
              
              <button
                onClick={() => setShowCheckout(true)}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-medium transition-colors"
              >
                {t('cart.checkout')}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};