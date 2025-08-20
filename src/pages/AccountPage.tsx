import React, { useState } from 'react';
import { User, Settings, ShoppingBag, Heart, LogOut, Edit } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { useLanguage } from '../contexts/LanguageContext';

export const AccountPage: React.FC = () => {
  const { currentUser, isAuthenticated, logout } = useAuth();
  const { orders } = useCart();
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState('profile');

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            {language === 'ar' ? 'يجب تسجيل الدخول أولاً' : 'Vous devez vous connecter d\'abord'}
          </h1>
          <p className="text-gray-600">
            {language === 'ar' ? 'يرجى تسجيل الدخول للوصول إلى حسابك' : 'Veuillez vous connecter pour accéder à votre compte'}
          </p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'profile', label: language === 'ar' ? 'الملف الشخصي' : 'Profil', icon: User },
    { id: 'orders', label: language === 'ar' ? 'طلباتي' : 'Mes commandes', icon: ShoppingBag },
    { id: 'wishlist', label: language === 'ar' ? 'قائمة الرغبات' : 'Liste de souhaits', icon: Heart },
    { id: 'settings', label: language === 'ar' ? 'الإعدادات' : 'Paramètres', icon: Settings },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {language === 'ar' ? 'الملف الشخصي' : 'Profil'}
              </h2>
              <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
                <Edit size={18} />
                {language === 'ar' ? 'تعديل' : 'Modifier'}
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-orange-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {currentUser?.fullName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{currentUser?.fullName}</h3>
                  <p className="text-gray-600">@{currentUser?.username}</p>
                  <p className="text-gray-600">{currentUser?.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    {language === 'ar' ? 'الاسم الكامل' : 'Nom complet'}
                  </h4>
                  <p className="text-gray-600">{currentUser?.fullName}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    {language === 'ar' ? 'اسم المستخدم' : 'Nom d\'utilisateur'}
                  </h4>
                  <p className="text-gray-600">{currentUser?.username}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                  </h4>
                  <p className="text-gray-600">{currentUser?.email}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    {language === 'ar' ? 'نوع الحساب' : 'Type de compte'}
                  </h4>
                  <p className="text-gray-600">
                    {currentUser?.role === 'admin' 
                      ? (language === 'ar' ? 'مدير' : 'Administrateur')
                      : (language === 'ar' ? 'مستخدم' : 'Utilisateur')
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'orders':
        return (
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {language === 'ar' ? 'طلباتي' : 'Mes commandes'}
            </h2>
            
            {orders.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📦</div>
                <p className="text-gray-500 text-xl">
                  {language === 'ar' ? 'لا توجد طلبات بعد' : 'Aucune commande pour le moment'}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map(order => (
                  <div key={order.id} className="border border-gray-200 rounded-xl p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {language === 'ar' ? 'طلب رقم' : 'Commande n°'} #{order.id.slice(-6)}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {new Date(order.createdAt).toLocaleDateString(language === 'ar' ? 'ar-DZ' : 'fr-FR')}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600 text-lg">
                          {order.total.toLocaleString()} دج
                        </p>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          order.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                          order.status === 'shipped' ? 'bg-orange-100 text-orange-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {order.status === 'pending' ? (language === 'ar' ? 'في الانتظار' : 'En attente') :
                           order.status === 'confirmed' ? (language === 'ar' ? 'مؤكد' : 'Confirmé') :
                           order.status === 'shipped' ? (language === 'ar' ? 'تم الشحن' : 'Expédié') :
                           (language === 'ar' ? 'تم التسليم' : 'Livré')}
                        </span>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      {order.items.length} {language === 'ar' ? 'منتج' : 'produit(s)'}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 'wishlist':
        return (
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {language === 'ar' ? 'قائمة الرغبات' : 'Liste de souhaits'}
            </h2>
            <div className="text-center py-12">
              <div className="text-6xl mb-4">💝</div>
              <p className="text-gray-500 text-xl">
                {language === 'ar' ? 'قائمة الرغبات فارغة' : 'Liste de souhaits vide'}
              </p>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {language === 'ar' ? 'الإعدادات' : 'Paramètres'}
            </h2>
            
            <div className="space-y-6">
              <div className="p-4 border border-gray-200 rounded-xl">
                <h3 className="font-semibold text-gray-800 mb-2">
                  {language === 'ar' ? 'تغيير كلمة المرور' : 'Changer le mot de passe'}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {language === 'ar' ? 'قم بتحديث كلمة المرور الخاصة بك' : 'Mettez à jour votre mot de passe'}
                </p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  {language === 'ar' ? 'تغيير كلمة المرور' : 'Changer le mot de passe'}
                </button>
              </div>

              <div className="p-4 border border-gray-200 rounded-xl">
                <h3 className="font-semibold text-gray-800 mb-2">
                  {language === 'ar' ? 'الإشعارات' : 'Notifications'}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {language === 'ar' ? 'إدارة تفضيلات الإشعارات' : 'Gérer les préférences de notification'}
                </p>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span className="text-sm">
                      {language === 'ar' ? 'إشعارات الطلبات' : 'Notifications de commandes'}
                    </span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span className="text-sm">
                      {language === 'ar' ? 'إشعارات العروض' : 'Notifications d\'offres'}
                    </span>
                  </label>
                </div>
              </div>

              <div className="p-4 border border-red-200 rounded-xl bg-red-50">
                <h3 className="font-semibold text-red-800 mb-2">
                  {language === 'ar' ? 'حذف الحساب' : 'Supprimer le compte'}
                </h3>
                <p className="text-red-600 text-sm mb-4">
                  {language === 'ar' ? 'حذف حسابك نهائياً' : 'Supprimer définitivement votre compte'}
                </p>
                <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                  {language === 'ar' ? 'حذف الحساب' : 'Supprimer le compte'}
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {language === 'ar' ? 'حسابي' : 'Mon compte'}
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-orange-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-orange-500 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-3">
                  {currentUser?.fullName.charAt(0).toUpperCase()}
                </div>
                <h3 className="font-bold text-gray-800">{currentUser?.fullName}</h3>
                <p className="text-gray-600 text-sm">@{currentUser?.username}</p>
              </div>

              <nav className="space-y-2">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-right ${
                      activeTab === tab.id
                        ? 'bg-blue-100 text-blue-700 border-r-4 border-blue-700'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <tab.icon size={20} />
                    {tab.label}
                  </button>
                ))}
                
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors text-right"
                >
                  <LogOut size={20} />
                  {language === 'ar' ? 'تسجيل الخروج' : 'Déconnexion'}
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};