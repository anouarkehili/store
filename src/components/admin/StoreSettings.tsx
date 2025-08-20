import React, { useState } from 'react';
import { Save, Upload, Phone, MapPin, Palette, Truck } from 'lucide-react';
import { useStore } from '../../contexts/StoreContext';
import { useLanguage } from '../../contexts/LanguageContext';

export const StoreSettings: React.FC = () => {
  const { settings, updateSettings } = useStore();
  const { language } = useLanguage();
  
  const [formData, setFormData] = useState({
    storeName: settings.storeName,
    logo: settings.logo,
    contactPhone: settings.contactPhone,
    contactWhatsApp: settings.contactWhatsApp,
    address: settings.address,
    primaryColor: settings.primaryColor,
    secondaryColor: settings.secondaryColor,
    homeDeliveryPrice: settings.homeDeliveryPrice,
    officeDeliveryPrice: settings.officeDeliveryPrice
  });

  const [activeTab, setActiveTab] = useState<'general' | 'contact' | 'design' | 'shipping'>('general');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
    alert('تم حفظ الإعدادات بنجاح');
  };

  const updateFormField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const tabs = [
    { id: 'general', label: 'معلومات عامة', icon: Upload },
    { id: 'contact', label: 'التواصل', icon: Phone },
    { id: 'design', label: 'التصميم', icon: Palette },
    { id: 'shipping', label: 'التوصيل', icon: Truck }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">إعدادات المتجر</h2>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
        {/* General Settings */}
        {activeTab === 'general' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">المعلومات العامة</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  اسم المتجر بالعربية
                </label>
                <input
                  type="text"
                  value={formData.storeName.ar}
                  onChange={(e) => updateFormField('storeName', { ...formData.storeName, ar: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  اسم المتجر بالفرنسية
                </label>
                <input
                  type="text"
                  value={formData.storeName.fr}
                  onChange={(e) => updateFormField('storeName', { ...formData.storeName, fr: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                رابط الشعار
              </label>
              <input
                type="url"
                value={formData.logo}
                onChange={(e) => updateFormField('logo', e.target.value)}
                placeholder="https://example.com/logo.png"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )}

        {/* Contact Settings */}
        {activeTab === 'contact' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">معلومات التواصل</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  رقم الهاتف
                </label>
                <input
                  type="tel"
                  value={formData.contactPhone}
                  onChange={(e) => updateFormField('contactPhone', e.target.value)}
                  placeholder="+213555123456"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  رقم واتساب
                </label>
                <input
                  type="tel"
                  value={formData.contactWhatsApp}
                  onChange={(e) => updateFormField('contactWhatsApp', e.target.value)}
                  placeholder="+213555123456"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  العنوان بالعربية
                </label>
                <textarea
                  value={formData.address.ar}
                  onChange={(e) => updateFormField('address', { ...formData.address, ar: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  العنوان بالفرنسية
                </label>
                <textarea
                  value={formData.address.fr}
                  onChange={(e) => updateFormField('address', { ...formData.address, fr: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Design Settings */}
        {activeTab === 'design' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">تصميم المتجر</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  اللون الأساسي
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={formData.primaryColor}
                    onChange={(e) => updateFormField('primaryColor', e.target.value)}
                    className="w-16 h-10 border border-gray-300 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={formData.primaryColor}
                    onChange={(e) => updateFormField('primaryColor', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  اللون الثانوي
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={formData.secondaryColor}
                    onChange={(e) => updateFormField('secondaryColor', e.target.value)}
                    className="w-16 h-10 border border-gray-300 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={formData.secondaryColor}
                    onChange={(e) => updateFormField('secondaryColor', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-3">معاينة الألوان</h4>
              <div className="flex gap-4">
                <div
                  className="flex-1 h-20 rounded-lg flex items-center justify-center text-white font-medium"
                  style={{ backgroundColor: formData.primaryColor }}
                >
                  اللون الأساسي
                </div>
                <div
                  className="flex-1 h-20 rounded-lg flex items-center justify-center text-white font-medium"
                  style={{ backgroundColor: formData.secondaryColor }}
                >
                  اللون الثانوي
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Shipping Settings */}
        {activeTab === 'shipping' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">إعدادات التوصيل</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  سعر التوصيل للمنزل (بالدينار الجزائري)
                </label>
                <input
                  type="number"
                  value={formData.homeDeliveryPrice}
                  onChange={(e) => updateFormField('homeDeliveryPrice', Number(e.target.value))}
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  سعر التوصيل لمكتب التوصيل (بالدينار الجزائري)
                </label>
                <input
                  type="number"
                  value={formData.officeDeliveryPrice}
                  onChange={(e) => updateFormField('officeDeliveryPrice', Number(e.target.value))}
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <Truck className="text-blue-600 mt-1" size={20} />
                <div>
                  <h4 className="font-medium text-blue-800 mb-1">ملاحظة حول أسعار التوصيل</h4>
                  <p className="text-blue-700 text-sm">
                    يمكنك تعديل أسعار التوصيل حسب الولايات والمناطق. هذه الأسعار ستظهر للعملاء عند اختيار طريقة التوصيل.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Save Button */}
        <div className="flex justify-end pt-6 border-t border-gray-200">
          <button
            type="submit"
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Save size={18} />
            حفظ الإعدادات
          </button>
        </div>
      </form>
    </div>
  );
};