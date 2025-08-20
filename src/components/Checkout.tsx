import React, { useState } from 'react';
import { ArrowRight, Check, Phone } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useStore } from '../contexts/StoreContext';
import { useLanguage } from '../contexts/LanguageContext';
import { WILAYAS, getCommunes } from '../data/algerianCities';

interface CheckoutProps {
  onBack: () => void;
  onClose: () => void;
}

export const Checkout: React.FC<CheckoutProps> = ({ onBack, onClose }) => {
  const { items, getCartTotal, createOrder } = useCart();
  const { settings } = useStore();
  const { language, t } = useLanguage();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    wilaya: '',
    commune: ''
  });

  const [shippingType, setShippingType] = useState<'home' | 'office'>('home');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const availableCommunes = formData.wilaya ? getCommunes(formData.wilaya) : [];
  const shippingCost = shippingType === 'home' ? settings.homeDeliveryPrice : settings.officeDeliveryPrice;
  const totalAmount = getCartTotal() + shippingCost;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
      ...(field === 'wilaya' ? { commune: '' } : {})
    }));
  };

  const isFormValid = formData.fullName.trim() && formData.phone.trim() && formData.wilaya && formData.commune;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsSubmitting(true);

    try {
      // Create the order
      createOrder({
        fullName: formData.fullName,
        phone: formData.phone,
        wilaya: WILAYAS.find(w => w.code === formData.wilaya)?.name || '',
        commune: formData.commune
      }, shippingType, shippingCost);

      // Send WhatsApp message
      const wilayaName = WILAYAS.find(w => w.code === formData.wilaya)?.name || '';
      const orderText = `طلب جديد من متجر GYM DADA STORE\n\n` +
                       `الاسم: ${formData.fullName}\n` +
                       `الهاتف: ${formData.phone}\n` +
                       `الولاية: ${wilayaName}\n` +
                       `البلدية: ${formData.commune}\n` +
                       `نوع التوصيل: ${shippingType === 'home' ? 'توصيل للمنزل' : 'توصيل لمكتب التوصيل'}\n\n` +
                       `المنتجات:\n` +
                       items.map(item => `- ${item.name[language]} (${item.quantity}x) - ${(item.price * item.quantity).toLocaleString()} دج`).join('\n') +
                       `\n\nسعر المنتجات: ${getCartTotal().toLocaleString()} دج\n` +
                       `سعر التوصيل: ${shippingCost.toLocaleString()} دج\n` +
                       `المجموع الكلي: ${totalAmount.toLocaleString()} دج`;

      const whatsappUrl = `https://wa.me/${settings.contactWhatsApp.replace('+', '')}?text=${encodeURIComponent(orderText)}`;
      window.open(whatsappUrl, '_blank');

      setOrderPlaced(true);

      setTimeout(() => {
        onClose();
      }, 3000);

    } catch (error) {
      console.error('Error placing order:', error);
      alert('حدث خطأ في إرسال الطلب. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="fixed inset-0 z-50 overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="absolute top-0 right-0 h-full w-full max-w-md bg-white shadow-xl flex items-center justify-center">
          <div className="text-center p-8">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="text-white" size={32} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">تم إرسال الطلب!</h2>
            <p className="text-gray-600 mb-4">
              تم توجيهك لتطبيق WhatsApp لتأكيد الطلب
            </p>
            <p className="text-sm text-gray-500">
              سيتم إغلاق هذه النافذة تلقائياً...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="absolute top-0 right-0 h-full w-full max-w-md bg-white shadow-xl overflow-y-auto">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center gap-4 p-4 border-b bg-blue-600 text-white">
            <button
              onClick={onBack}
              className="p-2 hover:bg-blue-700 rounded-lg"
            >
              <ArrowRight size={20} />
            </button>
            <h2 className="text-xl font-bold">{t('checkout.title')}</h2>
          </div>

          <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
            <div className="flex-1 p-4 space-y-6">
              {/* Order Summary */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-3">ملخص الطلب</h3>
                <div className="space-y-2 mb-3">
                  {items.map(item => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>{item.name[language]} ({item.quantity}x)</span>
                      <span>{(item.price * item.quantity).toLocaleString()} دج</span>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-2 space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>سعر المنتجات</span>
                    <span>{getCartTotal().toLocaleString()} دج</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>{t('checkout.shipping.cost')}</span>
                    <span>{shippingCost.toLocaleString()} دج</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t pt-1">
                    <span>المجموع الكلي</span>
                    <span className="text-green-600">{totalAmount.toLocaleString()} دج</span>
                  </div>
                </div>
              </div>

              {/* Personal Information */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-4">{t('checkout.personal.info')}</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('checkout.full.name')} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="الاسم الكامل"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      رقم الهاتف *
                    </label>
                    <div className="relative">
                      <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="0555123456"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('checkout.wilaya')} *
                    </label>
                    <select
                      required
                      value={formData.wilaya}
                      onChange={(e) => handleInputChange('wilaya', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">{t('checkout.select.wilaya')}</option>
                      {WILAYAS.map(wilaya => (
                        <option key={wilaya.code} value={wilaya.code}>
                          {wilaya.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('checkout.commune')} *
                    </label>
                    <select
                      required
                      value={formData.commune}
                      onChange={(e) => handleInputChange('commune', e.target.value)}
                      disabled={!formData.wilaya}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                    >
                      <option value="">{t('checkout.select.commune')}</option>
                      {availableCommunes.map(commune => (
                        <option key={commune} value={commune}>
                          {commune}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Shipping Options */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-4">{t('checkout.shipping')}</h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="shipping"
                      value="home"
                      checked={shippingType === 'home'}
                      onChange={(e) => setShippingType(e.target.value as 'home')}
                      className="text-blue-600"
                    />
                    <div className="flex-1">
                      <div className="font-medium">{t('checkout.home.delivery')}</div>
                      <div className="text-sm text-gray-600">{settings.homeDeliveryPrice} دج</div>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="shipping"
                      value="office"
                      checked={shippingType === 'office'}
                      onChange={(e) => setShippingType(e.target.value as 'office')}
                      className="text-blue-600"
                    />
                    <div className="flex-1">
                      <div className="font-medium">{t('checkout.office.delivery')}</div>
                      <div className="text-sm text-gray-600">{settings.officeDeliveryPrice} دج</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-4">{t('checkout.payment')}</h3>
                <div className="p-4 border border-gray-300 rounded-lg bg-green-50">
                  <div className="flex items-center gap-2 text-green-700 font-medium">
                    <Check size={20} />
                    {t('checkout.cash.delivery')}
                  </div>
                  <p className="text-sm text-green-600 mt-1">
                    ادفع عند استلام الطلب
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="p-4 border-t bg-white">
              <button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    جاري إرسال الطلب...
                  </>
                ) : (
                  <>
                    <Check size={20} />
                    {t('checkout.submit')} ({totalAmount.toLocaleString()} دج)
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};