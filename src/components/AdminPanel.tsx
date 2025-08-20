import React, { useState } from 'react';
import { ArrowLeft, Package, ShoppingBag, Settings, FileImage, Palette, Truck, BarChart3, Users } from 'lucide-react';
import { useStore } from '../contexts/StoreContext';
import { useCart } from '../contexts/CartContext';
import { useLanguage } from '../contexts/LanguageContext';
import { OrderManagement } from './admin/OrderManagement';
import { ProductManagement } from './admin/ProductManagement';
import { CategoryManagement } from './admin/CategoryManagement';
import { AdvertisementManagement } from './admin/AdvertisementManagement';
import { StoreSettings } from './admin/StoreSettings';
import { UserManagement } from './admin/UserManagement';
import { PageManagement } from './admin/PageManagement';

interface AdminPanelProps {
  onBack: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onBack }) => {
  const [activeSection, setActiveSection] = useState<string>('orders');
  const { t } = useLanguage();
  const { orders } = useCart();
  const { products, categories, advertisements } = useStore();

  const menuItems = [
    {
      id: 'orders',
      label: t('admin.orders'),
      icon: ShoppingBag,
      count: orders.filter(o => o.status === 'pending').length,
      color: 'bg-red-500'
    },
    {
      id: 'products',
      label: t('admin.products'),
      icon: Package,
      count: products.length,
      color: 'bg-blue-500'
    },
    {
      id: 'categories',
      label: t('admin.categories'),
      icon: BarChart3,
      count: categories.length,
      color: 'bg-green-500'
    },
    {
      id: 'advertisements',
      label: t('admin.advertisements'),
      icon: FileImage,
      count: advertisements.length,
      color: 'bg-purple-500'
    },
    {
      id: 'pages',
      label: 'إدارة الصفحات',
      icon: FileImage,
      count: null,
      color: 'bg-indigo-500'
    },
    {
      id: 'settings',
      label: t('admin.settings'),
      icon: Settings,
      count: null,
      color: 'bg-gray-500'
    }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'orders':
        return <OrderManagement />;
      case 'products':
        return <ProductManagement />;
      case 'categories':
        return <CategoryManagement />;
      case 'advertisements':
        return <AdvertisementManagement />;
      case 'settings':
        return <StoreSettings />;
      case 'pages':
        return <PageManagement />;
      default:
        return <OrderManagement />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6 border-b">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4"
          >
            <ArrowLeft size={20} />
            {t('admin.back')}
          </button>
          <h1 className="text-2xl font-bold text-gray-800">{t('admin.title')}</h1>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeSection === item.id
                      ? 'bg-blue-100 text-blue-700 border-r-4 border-blue-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <item.icon size={20} />
                  <span className="flex-1 text-right">{item.label}</span>
                  {item.count !== null && item.count > 0 && (
                    <span className={`px-2 py-1 rounded-full text-xs text-white font-bold ${item.color}`}>
                      {item.count}
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {renderContent()}
      </div>
    </div>
  );
};