import React, { useState, useRef, useEffect } from 'react';
import { Search, ShoppingCart, Menu, Heart, UserCircle, X, ChevronDown, ChevronUp, LogOut, Settings } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useStore, Category } from '../contexts/StoreContext';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

interface HeaderProps {
  onCartClick: () => void;
  onAdminAccess: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onCartClick, onAdminAccess }) => {
  const { language, setLanguage, t } = useLanguage();
  const { settings, categories } = useStore();
  const { getCartItemsCount } = useCart();
  const { currentUser, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isCategoriesMenuOpen, setIsCategoriesMenuOpen] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  const accountMenuRef = useRef<HTMLDivElement>(null);
  const categoriesMenuRef = useRef<HTMLDivElement>(null);
  const cartItemsCount = getCartItemsCount();

  const mockWishlistItems = [
    { id: 1, name: 'بروتين واي', price: '2500 دج' },
    { id: 2, name: 'حذاء رياضي', price: '7000 دج' },
    { id: 3, name: 'قفازات رفع الأثقال', price: '1500 دج' },
  ];

  const handleSearchClick = () => {
    setIsSearchModalOpen(true);
  };

  const closeSearchModal = () => {
    setIsSearchModalOpen(false);
    setSearchQuery('');
  };

  const handleAccountClick = () => {
    setIsAccountMenuOpen(!isAccountMenuOpen);
  };

  const handleCategoriesClick = () => {
    setIsCategoriesMenuOpen(!isCategoriesMenuOpen);
  };
  
  const handleWishlistClick = () => {
    setIsWishlistOpen(true);
  };

  const closeWishlistSidebar = () => {
    setIsWishlistOpen(false);
  };

  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
    setIsLoginMode(true);
    setIsAccountMenuOpen(false);
  };

  const handleSignupClick = () => {
    setIsLoginModalOpen(true);
    setIsLoginMode(false);
    setIsAccountMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsAccountMenuOpen(false);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const toggleSideMenu = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };

  const handleLanguageSwitch = () => {
    setLanguage(language === 'ar' ? 'fr' : 'ar');
  };

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (accountMenuRef.current && !accountMenuRef.current.contains(event.target as Node)) {
        setIsAccountMenuOpen(false);
      }
      if (categoriesMenuRef.current && !categoriesMenuRef.current.contains(event.target as Node)) {
        setIsCategoriesMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const logo = (
    <Link to="/" className="flex items-center gap-2">
      <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
        GYM
      </div>
      <div>
        <h1 className="text-xl font-bold text-gray-900">GYM DADA STORE</h1>
        <p className="text-xs text-orange-500">Your Fitness Partner</p>
      </div>
    </Link>
  );

  // Login/Signup Form Modal
  const LoginSignupForm = ({ isLoginMode, onClose }) => {
    const [formData, setFormData] = useState({
      fullName: '',
      username: '',
      email: '',
      password: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const { login, signup } = useAuth();

    const handleSubmit = (e) => {
      e.preventDefault();
      setIsLoading(true);
      setError('');

      if (isLoginMode) {
        login(formData.username, formData.password).then(success => {
          if (success) {
            onClose();
          } else {
            setError('اسم المستخدم أو كلمة المرور غير صحيحة');
          }
          setIsLoading(false);
        });
      } else {
        if (!formData.fullName || !formData.username || !formData.email || !formData.password) {
          setError('يرجى ملء جميع الحقول');
          setIsLoading(false);
          return;
        }
        signup(formData.fullName, formData.username, formData.email, formData.password).then(success => {
          if (success) {
            setIsLoginMode(true);
            setError('');
            alert('تم إنشاء الحساب بنجاح! يمكنك الآن تسجيل الدخول');
          } else {
            setError('اسم المستخدم أو البريد الإلكتروني مستخدم بالفعل');
          }
          setIsLoading(false);
        });
      }
    };

    return (
      <div className="fixed inset-0 z-[100] bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-300">
        <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg w-11/12 max-w-md relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors">
            <X size={24} />
          </button>
          {isLoginMode ? (
            <div className="w-full">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">تسجيل الدخول</h2>
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  {error}
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-4">
                <input 
                  type="text" 
                  placeholder="اسم المستخدم أو البريد الإلكتروني" 
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400" 
                  required
                />
                <input 
                  type="password" 
                  placeholder="كلمة المرور" 
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400" 
                  required
                />
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full py-3 bg-gray-900 text-white font-bold rounded-lg hover:bg-gray-700 transition-colors disabled:bg-gray-400"
                >
                  {isLoading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
                </button>
              </form>
              <p className="text-sm text-center text-gray-500 mt-4">
                لا يوجد لديك حساب بعد؟ <button type="button" onClick={() => setIsLoginMode(false)} className="text-gray-900 font-semibold hover:underline">إنشاء حساب</button>
              </p>
            </div>
          ) : (
            <div className="w-full">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">إنشاء حساب</h2>
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  {error}
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-4">
                <input 
                  type="text" 
                  placeholder="الاسم الكامل" 
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400" 
                  required
                />
                <input 
                  type="text" 
                  placeholder="اسم المستخدم" 
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400" 
                  required
                />
                <input 
                  type="email" 
                  placeholder="البريد الإلكتروني" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400" 
                  required
                />
                <input 
                  type="password" 
                  placeholder="كلمة المرور" 
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400" 
                  required
                />
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full py-3 bg-gray-900 text-white font-bold rounded-lg hover:bg-gray-700 transition-colors disabled:bg-gray-400"
                >
                  {isLoading ? 'جاري إنشاء الحساب...' : 'إنشاء حساب'}
                </button>
              </form>
              <p className="text-sm text-center text-gray-500 mt-4">
                لديك حساب بالفعل؟ <button type="button" onClick={() => setIsLoginMode(true)} className="text-gray-900 font-semibold hover:underline">تسجيل الدخول</button>
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Search Modal
  const SearchModal = ({ onClose }) => (
    <div className="fixed inset-0 z-[100] bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-300">
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg w-11/12 max-w-lg relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors">
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">البحث عن المنتجات</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="البحث عن منتجات..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
      </div>
    </div>
  );

  // Mobile Side Menu
  const SideMenu = ({ isOpen, onClose }) => {
    return (
      <div className={`fixed top-0 ${language === 'ar' ? 'right-0' : 'left-0'} z-[110] h-full w-80 max-w-full bg-white shadow-xl transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : language === 'ar' ? 'translate-x-full' : '-translate-x-full'}`}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">القائمة</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-800 transition-colors">
              <X size={24} />
            </button>
          </div>
          <nav className="flex flex-col space-y-4 border-b pb-4">
            <Link to="/" onClick={onClose} className="flex items-center gap-4 text-gray-700 hover:text-blue-600 transition-colors">
              الصفحة الرئيسية
            </Link>
            <Link to="/best-sellers" onClick={onClose} className="flex items-center gap-4 text-gray-700 hover:text-blue-600 transition-colors">
              الأكثر مبيعاً
            </Link>
            <Link to="/special-offers" onClick={onClose} className="flex items-center gap-4 text-gray-700 hover:text-blue-600 transition-colors">
              العروض الخاصة
            </Link>
            <button onClick={handleWishlistClick} className="flex items-center gap-4 text-gray-700 hover:text-blue-600 transition-colors">
              <Heart size={20} />
              <span>قائمة الرغبات</span>
            </button>
            <button onClick={onCartClick} className="flex items-center gap-4 text-gray-700 hover:text-blue-600 transition-colors">
              <ShoppingCart size={20} />
              <span>السلة ({cartItemsCount})</span>
            </button>
          </nav>
          <div className="mt-4">
            <h3 className="text-sm font-semibold text-gray-500 mb-2">الأصناف</h3>
            <ul className="space-y-2">
              {categories.map((category: Category) => (
                <li key={category.id}>
                  <Link 
                    to={`/category/${category.id}`} 
                    onClick={onClose}
                    className="block p-2 rounded-md hover:bg-gray-100 transition-colors text-gray-800"
                  >
                    {category.name[language]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  };

  const WishlistSidebar = ({ isOpen, onClose, items }) => {
    return (
      <>
        {isOpen && <div className="fixed inset-0 z-[105] bg-black bg-opacity-50 transition-opacity duration-300" onClick={onClose}></div>}
        
        <div className={`fixed top-0 right-0 z-[110] h-full w-80 max-w-full bg-white shadow-xl transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">قائمة الرغبات</h2>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-800 transition-colors">
                <X size={24} />
              </button>
            </div>
            <div className="space-y-4">
              {items.length > 0 ? (
                items.map(item => (
                  <div key={item.id} className="flex items-center justify-between p-3 border-b border-gray-200">
                    <div>
                      <h3 className="font-semibold text-gray-800">{item.name}</h3>
                      <p className="text-sm text-gray-500">{item.price}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">قائمة الرغبات فارغة.</p>
              )}
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <header className="bg-white shadow-lg sticky top-0 z-50">
        {/* Top Bar */}
        <div className="bg-gradient-to-r from-blue-600 to-orange-500 text-white py-2 px-4">
          <div className="container mx-auto flex justify-between items-center text-sm">
            {/* Left side: Language & Wishlist & Account */}
            <div className="flex items-center gap-4">
              {/* Language Switcher */}
              <button
                onClick={handleLanguageSwitch}
                className="flex items-center gap-2 hover:bg-white hover:bg-opacity-20 px-3 py-1 rounded-full transition-colors"
              >
                <span className="text-xl">
                  {language === 'ar' ? '🇫🇷' : '🇩🇿'}
                </span>
                <span className="hidden sm:inline">
                  {language === 'ar' ? 'Français' : 'العربية'}
                </span>
              </button>

              <button onClick={handleWishlistClick} className="flex items-center gap-1 hover:bg-white hover:bg-opacity-20 px-3 py-1 rounded-full transition-colors">
                <Heart size={18} />
                <span className="hidden sm:inline">قائمة الرغبات</span>
              </button>

              <div className="relative" ref={accountMenuRef}>
                <button
                  onClick={handleAccountClick}
                  className="flex items-center gap-1 hover:bg-white hover:bg-opacity-20 px-3 py-1 rounded-full transition-colors focus:outline-none"
                >
                  <UserCircle size={18} />
                  <span className="hidden sm:inline">حسابي</span>
                  {isAccountMenuOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {isAccountMenuOpen && (
                  <div className={`absolute top-full mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20 ${language === 'ar' ? 'right-0' : 'left-0'}`}>
                    <div className="py-1" role="menu">
                      {isAuthenticated ? (
                        <>
                          <div className="px-4 py-2 text-sm text-gray-700 border-b">
                            مرحباً، {currentUser?.fullName}
                          </div>
                          <Link
                            to="/account"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setIsAccountMenuOpen(false)}
                          >
                            حسابي
                          </Link>
                          {isAdmin && (
                            <Link
                              to="/admin"
                              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => setIsAccountMenuOpen(false)}
                            >
                              <Settings size={16} />
                              لوحة التحكم
                            </Link>
                          )}
                          <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <LogOut size={16} />
                            تسجيل الخروج
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={handleLoginClick}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            تسجيل الدخول
                          </button>
                          <button
                            onClick={handleSignupClick}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            إنشاء حساب
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right side: Welcome message & phone */}
            <div className="text-center">
              <span className="text-white hidden sm:inline">
                {isAuthenticated ? `مرحباً ${currentUser?.fullName} | ` : 'مرحباً بكم في GYM DADA STORE | '}
              </span>
              <span className="text-white font-medium">📞 0699446868</span>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            {logo}
          </div>
          
          {/* Navigation Menu (Desktop) - Centered */}
          <nav className="hidden lg:flex flex-grow justify-center gap-8 text-lg font-medium">
            <Link to="/" className="text-gray-800 hover:text-blue-600 transition-colors px-4 py-2 rounded-lg hover:bg-blue-50">
              الصفحة الرئيسية
            </Link>
            <Link to="/best-sellers" className="text-gray-800 hover:text-blue-600 transition-colors px-4 py-2 rounded-lg hover:bg-blue-50">
              الأكثر مبيعاً
            </Link>
            <Link to="/special-offers" className="text-gray-800 hover:text-blue-600 transition-colors px-4 py-2 rounded-lg hover:bg-blue-50">
              العروض الخاصة
            </Link>
            
            {/* Categories Dropdown */}
            <div className="relative" ref={categoriesMenuRef}>
              <button
                onClick={handleCategoriesClick}
                className="flex items-center gap-1 text-gray-800 hover:text-blue-600 transition-colors px-4 py-2 rounded-lg hover:bg-blue-50"
              >
                الأصناف
                {isCategoriesMenuOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              {isCategoriesMenuOpen && (
                <div className="absolute top-full mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20 right-0">
                  <div className="py-2">
                    {categories.map((category) => (
                      <Link
                        key={category.id}
                        to={`/category/${category.id}`}
                        className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={() => setIsCategoriesMenuOpen(false)}
                      >
                        <span className="text-xl">{category.icon}</span>
                        <span>{category.name[language]}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Icons (Desktop) */}
          <div className="flex items-center gap-4 flex-shrink-0">
            {/* Search Icon */}
            <button
              onClick={handleSearchClick}
              className="p-2 rounded-full text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <Search size={24} />
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={onCartClick}
              className="relative p-2 rounded-full bg-gradient-to-r from-blue-600 to-orange-500 text-white hover:from-blue-700 hover:to-orange-600 transition-all transform hover:scale-105"
            >
              <ShoppingCart size={24} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold border-2 border-white animate-pulse">
                  {cartItemsCount}
                </span>
              )}
            </button>
            
            {/* Hamburger Menu (Mobile) */}
            <button onClick={toggleSideMenu} className="lg:hidden p-3 text-gray-600 hover:text-gray-900">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>
      
      {/* Modals and Side Menu */}
      {isSearchModalOpen && <SearchModal onClose={closeSearchModal} />}
      {isLoginModalOpen && <LoginSignupForm isLoginMode={isLoginMode} onClose={closeLoginModal} />}
      {isSideMenuOpen && <SideMenu isOpen={isSideMenuOpen} onClose={toggleSideMenu} />}
      <WishlistSidebar isOpen={isWishlistOpen} onClose={closeWishlistSidebar} items={mockWishlistItems} />
    </>
  );
};

export default Header;