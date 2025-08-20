import React, { useState } from 'react';
import { Plus, Edit, Trash2, BarChart3 } from 'lucide-react';
import { useStore, Category } from '../../contexts/StoreContext';
import { useLanguage } from '../../contexts/LanguageContext';

export const CategoryManagement: React.FC = () => {
  const { categories, addCategory, updateCategory, deleteCategory } = useStore();
  const { language } = useLanguage();
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({
    name: { ar: '', fr: '' },
    icon: '',
    color: '#3B82F6'
  });

  const resetForm = () => {
    setFormData({
      name: { ar: '', fr: '' },
      icon: '',
      color: '#3B82F6'
    });
    setEditingCategory(null);
    setShowForm(false);
  };

  const handleEdit = (category: Category) => {
    setFormData({
      name: category.name,
      icon: category.icon,
      color: category.color
    });
    setEditingCategory(category);
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.ar.trim() || !formData.name.fr.trim() || !formData.icon.trim()) {
      alert('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    if (editingCategory) {
      updateCategory(editingCategory.id, formData);
    } else {
      addCategory({
        id: Date.now().toString(),
        ...formData
      });
    }

    resetForm();
  };

  const handleDelete = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا القسم؟')) {
      deleteCategory(id);
    }
  };

  const updateFormField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const commonIcons = ['🏋️', '💊', '👕', '🍊', '⚡', '🥤', '🍖', '🥜', '🏃', '🚴', '🤸', '🧘'];
  const commonColors = ['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899', '#6366F1', '#14B8A6'];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">إدارة الأقسام</h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <Plus size={20} />
          إضافة قسم
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">
              {editingCategory ? 'تعديل القسم' : 'إضافة قسم جديد'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Names */}
              <div>
                <label className="block text-sm font-medium mb-1">الاسم بالعربية *</label>
                <input
                  type="text"
                  required
                  value={formData.name.ar}
                  onChange={(e) => updateFormField('name', { ...formData.name, ar: e.target.value })}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">الاسم بالفرنسية *</label>
                <input
                  type="text"
                  required
                  value={formData.name.fr}
                  onChange={(e) => updateFormField('name', { ...formData.name, fr: e.target.value })}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Icon */}
              <div>
                <label className="block text-sm font-medium mb-2">الأيقونة *</label>
                <div className="grid grid-cols-6 gap-2 mb-2">
                  {commonIcons.map(icon => (
                    <button
                      key={icon}
                      type="button"
                      onClick={() => updateFormField('icon', icon)}
                      className={`p-3 text-2xl border rounded-lg hover:bg-gray-50 ${
                        formData.icon === icon ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                      }`}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  required
                  value={formData.icon}
                  onChange={(e) => updateFormField('icon', e.target.value)}
                  placeholder="أو اكتب إيموجي مخصص"
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Color */}
              <div>
                <label className="block text-sm font-medium mb-2">اللون</label>
                <div className="grid grid-cols-4 gap-2 mb-2">
                  {commonColors.map(color => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => updateFormField('color', color)}
                      className={`h-10 rounded-lg border-2 ${
                        formData.color === color ? 'border-gray-800' : 'border-gray-300'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <input
                  type="color"
                  value={formData.color}
                  onChange={(e) => updateFormField('color', e.target.value)}
                  className="w-full h-10 rounded-lg border border-gray-300"
                />
              </div>

              {/* Preview */}
              <div className="border rounded-lg p-4">
                <label className="block text-sm font-medium mb-2">معاينة</label>
                <div className="flex items-center gap-3">
                  <div 
                    className="w-16 h-16 rounded-lg flex items-center justify-center text-2xl"
                    style={{ backgroundColor: formData.color + '20' }}
                  >
                    {formData.icon}
                  </div>
                  <div>
                    <p className="font-medium">{formData.name.ar || 'اسم القسم'}</p>
                    <p className="text-sm text-gray-600">{formData.name.fr || 'Category Name'}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  {editingCategory ? 'تحديث القسم' : 'إضافة القسم'}
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

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories.map(category => (
          <div
            key={category.id}
            className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-6"
          >
            <div className="text-center mb-4">
              <div
                className="w-16 h-16 mx-auto rounded-lg flex items-center justify-center text-3xl mb-3"
                style={{ backgroundColor: category.color + '20' }}
              >
                {category.icon}
              </div>
              <h3 className="font-semibold text-lg">{category.name[language]}</h3>
              <p className="text-sm text-gray-500">{category.name[language === 'ar' ? 'fr' : 'ar']}</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(category)}
                className="flex-1 flex items-center justify-center gap-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 text-sm"
              >
                <Edit size={16} />
                تعديل
              </button>
              <button
                onClick={() => handleDelete(category.id)}
                className="flex-1 flex items-center justify-center gap-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 text-sm"
              >
                <Trash2 size={16} />
                حذف
              </button>
            </div>
          </div>
        ))}
      </div>

      {categories.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg">
          <BarChart3 size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500">لا توجد أقسام حالياً</p>
        </div>
      )}
    </div>
  );
};