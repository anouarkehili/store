import React, { useState } from 'react';
import { Plus, Edit, Trash2, FileImage, ExternalLink } from 'lucide-react';
import { useStore, Advertisement } from '../../contexts/StoreContext';
import { useLanguage } from '../../contexts/LanguageContext';

export const AdvertisementManagement: React.FC = () => {
  const { advertisements, addAdvertisement, updateAdvertisement, deleteAdvertisement } = useStore();
  const { language } = useLanguage();
  const [showForm, setShowForm] = useState(false);
  const [editingAd, setEditingAd] = useState<Advertisement | null>(null);
  const [formData, setFormData] = useState({
    image: '',
    title: { ar: '', fr: '' },
    link: ''
  });

  const resetForm = () => {
    setFormData({
      image: '',
      title: { ar: '', fr: '' },
      link: ''
    });
    setEditingAd(null);
    setShowForm(false);
  };

  const handleEdit = (ad: Advertisement) => {
    setFormData({
      image: ad.image,
      title: ad.title,
      link: ad.link || ''
    });
    setEditingAd(ad);
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.image.trim() || !formData.title.ar.trim() || !formData.title.fr.trim()) {
      alert('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    const adData = {
      ...formData,
      link: formData.link.trim() || undefined
    };

    if (editingAd) {
      updateAdvertisement(editingAd.id, adData);
    } else {
      addAdvertisement({
        id: Date.now().toString(),
        ...adData
      });
    }

    resetForm();
  };

  const handleDelete = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا الإعلان؟')) {
      deleteAdvertisement(id);
    }
  };

  const updateFormField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">إدارة الإعلانات</h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <Plus size={20} />
          إضافة إعلان
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">
              {editingAd ? 'تعديل الإعلان' : 'إضافة إعلان جديد'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Image URL */}
              <div>
                <label className="block text-sm font-medium mb-1">رابط الصورة *</label>
                <input
                  type="url"
                  required
                  value={formData.image}
                  onChange={(e) => updateFormField('image', e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Preview */}
              {formData.image && (
                <div className="border rounded-lg p-4">
                  <label className="block text-sm font-medium mb-2">معاينة الصورة</label>
                  <img
                    src={formData.image}
                    alt="معاينة"
                    className="w-full h-48 object-cover rounded-lg"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
              )}

              {/* Titles */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">العنوان بالعربية *</label>
                  <input
                    type="text"
                    required
                    value={formData.title.ar}
                    onChange={(e) => updateFormField('title', { ...formData.title, ar: e.target.value })}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">العنوان بالفرنسية *</label>
                  <input
                    type="text"
                    required
                    value={formData.title.fr}
                    onChange={(e) => updateFormField('title', { ...formData.title, fr: e.target.value })}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Link */}
              <div>
                <label className="block text-sm font-medium mb-1">رابط الإعلان (اختياري)</label>
                <input
                  type="url"
                  value={formData.link}
                  onChange={(e) => updateFormField('link', e.target.value)}
                  placeholder="https://example.com"
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  {editingAd ? 'تحديث الإعلان' : 'إضافة الإعلان'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Advertisements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {advertisements.map(ad => (
          <div key={ad.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow overflow-hidden">
            <div className="relative">
              <img
                src={ad.image}
                alt={ad.title[language]}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x200?text=صورة+غير+متاحة';
                }}
              />
              {ad.link && (
                <div className="absolute top-2 right-2 bg-blue-600 text-white p-2 rounded-full">
                  <ExternalLink size={16} />
                </div>
              )}
            </div>
            
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{ad.title[language]}</h3>
              <p className="text-sm text-gray-600 mb-4">{ad.title[language === 'ar' ? 'fr' : 'ar']}</p>
              
              {ad.link && (
                <div className="mb-4">
                  <a
                    href={ad.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 text-sm break-all"
                  >
                    {ad.link}
                  </a>
                </div>
              )}

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(ad)}
                  className="flex-1 flex items-center justify-center gap-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 text-sm"
                >
                  <Edit size={16} />
                  تعديل
                </button>
                <button
                  onClick={() => handleDelete(ad.id)}
                  className="flex-1 flex items-center justify-center gap-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 text-sm"
                >
                  <Trash2 size={16} />
                  حذف
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {advertisements.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg">
          <FileImage size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500">لا توجد إعلانات حالياً</p>
        </div>
      )}
    </div>
  );
};