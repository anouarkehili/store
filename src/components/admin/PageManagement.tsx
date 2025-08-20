import React, { useState } from 'react';
import { Plus, Edit, Trash2, FileText, Eye } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useStore, Page } from '../../contexts/StoreContext'; // Assuming Page type is exported from StoreContext

interface Page {
  id: string;
  title: { ar: string; fr: string };
  slug: string;
  content: { ar: string; fr: string };
  isPublished: boolean;
  showInFooter: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const PageManagement: React.FC = () => {
  // Assume pages and their management functions come from the store
  const { pages, addPage, updatePage, deletePage } = useStore();
  const { language } = useLanguage();

  const [showForm, setShowForm] = useState(false);
  const [editingPage, setEditingPage] = useState<Page | null>(null);
  const [formData, setFormData] = useState({
    title: { ar: '', fr: '' },
    slug: '',
    content: { ar: '', fr: '' },
    isPublished: true,
    showInFooter: false
  });

  const resetForm = () => {
    setFormData({
      title: { ar: '', fr: '' },
      slug: '',
      content: { ar: '', fr: '' },
      isPublished: true,
      showInFooter: false
    });
    setEditingPage(null);
    setShowForm(false);
  };

  const handleEdit = (page: Page) => {
    setFormData({
      title: page.title,
      slug: page.slug,
      content: page.content,
      isPublished: page.isPublished,
      showInFooter: page.showInFooter
    });
    setEditingPage(page);
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.ar.trim() || !formData.title.fr.trim() || !formData.slug.trim()) {
      alert('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    const pageData = {
      slug: formData.slug.toLowerCase().replace(/\s+/g, '-'),
      ...formData
    };

    if (editingPage) {
      updatePage(editingPage.id, pageData);
    } else {
      // The context should handle id, createdAt, updatedAt
      addPage(pageData);
    }

    resetForm();
  };

  const handleDelete = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذه الصفحة؟')) {
      deletePage(id);
    }
  };

  const updateFormField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateSlug = (title: string) => {
    return title.toLowerCase()
      .replace(/[أإآا]/g, 'a')
      .replace(/[ة]/g, 'h')
      .replace(/[ي]/g, 'y')
      .replace(/[و]/g, 'w')
      .replace(/[ء]/g, '')
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">إدارة الصفحات</h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <Plus size={20} />
          إضافة صفحة جديدة
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-screen overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">
              {editingPage ? 'تعديل الصفحة' : 'إضافة صفحة جديدة'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">العنوان بالعربية *</label>
                  <input
                    type="text"
                    required
                    value={formData.title.ar}
                    onChange={(e) => {
                      updateFormField('title', { ...formData.title, ar: e.target.value });
                      if (!editingPage && !formData.slug) {
                        updateFormField('slug', generateSlug(e.target.value));
                      }
                    }}
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

              {/* Slug */}
              <div>
                <label className="block text-sm font-medium mb-1">الرابط (Slug) *</label>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) => updateFormField('slug', e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="privacy-policy"
                />
                <p className="text-xs text-gray-500 mt-1">
                  سيكون الرابط: /page/{formData.slug}
                </p>
              </div>

              {/* Content */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">المحتوى بالعربية</label>
                  <textarea
                    value={formData.content.ar}
                    onChange={(e) => updateFormField('content', { ...formData.content, ar: e.target.value })}
                    rows={12}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="اكتب محتوى الصفحة هنا..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">المحتوى بالفرنسية</label>
                  <textarea
                    value={formData.content.fr}
                    onChange={(e) => updateFormField('content', { ...formData.content, fr: e.target.value })}
                    rows={12}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Écrivez le contenu de la page ici..."
                  />
                </div>
              </div>

              {/* Settings */}
              <div className="flex gap-6">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.isPublished}
                    onChange={(e) => updateFormField('isPublished', e.target.checked)}
                    className="rounded"
                  />
                  <span>نشر الصفحة</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.showInFooter}
                    onChange={(e) => updateFormField('showInFooter', e.target.checked)}
                    className="rounded"
                  />
                  <span>إظهار في الفوتر</span>
                </label>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  {editingPage ? 'تحديث الصفحة' : 'إضافة الصفحة'}
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

      {/* Pages List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">العنوان</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الرابط</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الحالة</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">في الفوتر</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">آخر تحديث</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {pages.map(page => (
                <tr key={page.id}>
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-900">{page.title[language]}</div>
                      <div className="text-sm text-gray-500">{page.title[language === 'ar' ? 'fr' : 'ar']}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">/page/{page.slug}</code>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      page.isPublished 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {page.isPublished ? 'منشور' : 'مسودة'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      page.showInFooter 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {page.showInFooter ? 'نعم' : 'لا'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {page.updatedAt.toLocaleDateString('ar-DZ')}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(page)}
                        className="text-blue-600 hover:text-blue-900"
                        title="تعديل"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(page.id)}
                        className="text-red-600 hover:text-red-900"
                        title="حذف"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {pages.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg">
          <FileText size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500">لا توجد صفحات حالياً</p>
        </div>
      )}
    </div>
  );
};