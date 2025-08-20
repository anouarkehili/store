import React, { useState } from 'react';
import { Plus, Edit, Trash2, Package, ImageIcon } from 'lucide-react';
import { useStore, Product } from '../../contexts/StoreContext';
import { useLanguage } from '../../contexts/LanguageContext';

export const ProductManagement: React.FC = () => {
  const { products, categories, addProduct, updateProduct, deleteProduct } = useStore();
  const { language } = useLanguage();
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: { ar: '', fr: '' },
    description: { ar: '', fr: '' },
    usage: { ar: '', fr: '' },
    price: 0,
    oldPrice: 0,
    image: '',
    categoryId: '',
    flavors: [] as string[],
    sizes: [] as string[],
    inStock: true
  });

  const resetForm = () => {
    setFormData({
      name: { ar: '', fr: '' },
      description: { ar: '', fr: '' },
      usage: { ar: '', fr: '' },
      price: 0,
      oldPrice: 0,
      image: '',
      categoryId: '',
      flavors: [],
      sizes: [],
      inStock: true
    });
    setEditingProduct(null);
    setShowForm(false);
  };

  const handleEdit = (product: Product) => {
    setFormData({
      name: product.name,
      description: product.description,
      usage: product.usage,
      price: product.price,
      oldPrice: product.oldPrice || 0,
      image: product.image,
      categoryId: product.categoryId,
      flavors: product.flavors || [],
      sizes: product.sizes || [],
      inStock: product.inStock
    });
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.ar.trim() || !formData.name.fr.trim()) {
      alert('يرجى ملء اسم المنتج بكلا اللغتين');
      return;
    }

    const productData = {
      ...formData,
      oldPrice: formData.oldPrice > 0 ? formData.oldPrice : undefined
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
    } else {
      addProduct({
        id: Date.now().toString(),
        ...productData
      });
    }

    resetForm();
  };

  const handleDelete = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
      deleteProduct(id);
    }
  };

  const updateFormField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addFlavor = (flavor: string) => {
    if (flavor.trim() && !formData.flavors.includes(flavor.trim())) {
      updateFormField('flavors', [...formData.flavors, flavor.trim()]);
    }
  };

  const removeFlavor = (flavor: string) => {
    updateFormField('flavors', formData.flavors.filter(f => f !== flavor));
  };

  const addSize = (size: string) => {
    if (size.trim() && !formData.sizes.includes(size.trim())) {
      updateFormField('sizes', [...formData.sizes, size.trim()]);
    }
  };

  const removeSize = (size: string) => {
    updateFormField('sizes', formData.sizes.filter(s => s !== size));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">إدارة المنتجات</h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <Plus size={20} />
          إضافة منتج
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">
              {editingProduct ? 'تعديل المنتج' : 'إضافة منتج جديد'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Names */}
              <div className="grid grid-cols-2 gap-4">
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
              </div>

              {/* Descriptions */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">الوصف بالعربية</label>
                  <textarea
                    value={formData.description.ar}
                    onChange={(e) => updateFormField('description', { ...formData.description, ar: e.target.value })}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 h-20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">الوصف بالفرنسية</label>
                  <textarea
                    value={formData.description.fr}
                    onChange={(e) => updateFormField('description', { ...formData.description, fr: e.target.value })}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 h-20"
                  />
                </div>
              </div>

              {/* Usage Instructions */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">طريقة الاستعمال بالعربية</label>
                  <textarea
                    value={formData.usage.ar}
                    onChange={(e) => updateFormField('usage', { ...formData.usage, ar: e.target.value })}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 h-16"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">طريقة الاستعمال بالفرنسية</label>
                  <textarea
                    value={formData.usage.fr}
                    onChange={(e) => updateFormField('usage', { ...formData.usage, fr: e.target.value })}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 h-16"
                  />
                </div>
              </div>

              {/* Price and Category */}
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">السعر *</label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => updateFormField('price', Number(e.target.value))}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">السعر السابق</label>
                  <input
                    type="number"
                    value={formData.oldPrice}
                    onChange={(e) => updateFormField('oldPrice', Number(e.target.value))}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">القسم *</label>
                  <select
                    required
                    value={formData.categoryId}
                    onChange={(e) => updateFormField('categoryId', e.target.value)}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">اختر القسم</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name.ar}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.inStock}
                      onChange={(e) => updateFormField('inStock', e.target.checked)}
                      className="rounded"
                    />
                    متوفر
                  </label>
                </div>
              </div>

              {/* Image */}
              <div>
                <label className="block text-sm font-medium mb-1">رابط الصورة</label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => updateFormField('image', e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Flavors */}
              <div>
                <label className="block text-sm font-medium mb-2">النكهات المتوفرة</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.flavors.map(flavor => (
                    <span
                      key={flavor}
                      className="bg-blue-100 text-blue-800 px-2 py-1 rounded-lg text-sm flex items-center gap-1"
                    >
                      {flavor}
                      <button
                        type="button"
                        onClick={() => removeFlavor(flavor)}
                        className="text-red-500 hover:text-red-700"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="إضافة نكهة"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addFlavor(e.currentTarget.value);
                        e.currentTarget.value = '';
                      }
                    }}
                    className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Sizes */}
              <div>
                <label className="block text-sm font-medium mb-2">الأحجام المتوفرة</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.sizes.map(size => (
                    <span
                      key={size}
                      className="bg-green-100 text-green-800 px-2 py-1 rounded-lg text-sm flex items-center gap-1"
                    >
                      {size}
                      <button
                        type="button"
                        onClick={() => removeSize(size)}
                        className="text-red-500 hover:text-red-700"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="إضافة حجم"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addSize(e.currentTarget.value);
                        e.currentTarget.value = '';
                      }
                    }}
                    className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  {editingProduct ? 'تحديث المنتج' : 'إضافة المنتج'}
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

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <div key={product.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="relative">
              <img
                src={product.image || 'https://via.placeholder.com/300x200'}
                alt={product.name[language]}
                className="w-full h-48 object-cover rounded-t-lg"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x200?text=No+Image';
                }}
              />
              {!product.inStock && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-t-lg">
                  <span className="text-white font-bold">نفد المخزون</span>
                </div>
              )}
            </div>
            
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{product.name[language]}</h3>
              <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description[language]}</p>
              
              <div className="flex items-center justify-between mb-3">
                <div>
                  <span className="text-lg font-bold text-green-600">
                    {product.price.toLocaleString()} دج
                  </span>
                  {product.oldPrice && (
                    <span className="text-sm text-gray-400 line-through ml-2">
                      {product.oldPrice.toLocaleString()} دج
                    </span>
                  )}
                </div>
                <span className="text-sm text-gray-500">
                  {categories.find(c => c.id === product.categoryId)?.name[language]}
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(product)}
                  className="flex-1 flex items-center justify-center gap-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 text-sm"
                >
                  <Edit size={16} />
                  تعديل
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
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

      {products.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg">
          <Package size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500">لا توجد منتجات حالياً</p>
        </div>
      )}
    </div>
  );
};