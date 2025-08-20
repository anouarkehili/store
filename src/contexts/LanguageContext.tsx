import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'ar' | 'fr';

interface LanguageContextType {
language: Language;
setLanguage: (lang: Language) => void;
t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  ar: {
    // Header
    'search.placeholder': 'ابحث عن المنتجات...',
    'cart': 'السلة',
    'contact.phone': 'اتصل بنا: ',
    'language.switch': 'Français',
    
// New Login/Signup Translations
'login.title': 'تسجيل الدخول',
'login.usernameOrEmailPlaceholder': 'اسم المستخدم أو البريد الإلكتروني',
'login.passwordPlaceholder': 'كلمة السر',
'login.button': 'دخول',
'login.noAccountYet': 'ليس لديك حساب؟',
'login.signUpLink': 'سجل الآن',
'login.successMessage': 'تم تسجيل الدخول بنجاح!',
'login.invalidCredentials': 'اسم المستخدم أو كلمة المرور غير صحيحة',
'login.error': 'حدث خطأ أثناء تسجيل الدخول',

'signup.title': 'إنشاء حساب',
'signup.fullNamePlaceholder': 'الاسم الكامل',
'signup.usernamePlaceholder': 'اسم المستخدم',
'signup.emailPlaceholder': 'البريد الإلكتروني',
'signup.button': 'إنشاء حساب',
'signup.alreadyHaveAccount': 'هل لديك حساب بالفعل؟',
'signup.loginLink': 'تسجيل الدخول',
'signup.successMessage': 'تم إنشاء الحساب بنجاح!',
'signup.userExists': 'اسم المستخدم أو البريد الإلكتروني مستخدم بالفعل',
'signup.error': 'حدث خطأ أثناء إنشاء الحساب',

// Logout
'logout.title': 'تسجيل الخروج',
'logout.confirm': 'هل أنت متأكد أنك تريد تسجيل الخروج؟',
    
    // Categories
    'categories.title': 'التصنيفات',
    'categories.supplements': 'المكملات الغذائية',
    'categories.clothing': 'الملابس الرياضية',
    'categories.protein': 'البروتين',
    'categories.vitamins': 'الفيتامينات',
    'categories.equipment': 'معدات التدريب',
    
    // Products
    'products.title': 'المنتجات',
    'products.add.cart': 'أضف إلى السلة',
    'products.order.now': 'اطلب الآن',
    'products.price': 'السعر',
    'products.old.price': 'السعر السابق',
    'products.details': 'تفاصيل المنتج',
    'products.usage': 'طريقة الاستعمال',
    'products.flavors': 'النكهات المتوفرة',
    'products.sizes': 'الأحجام المتوفرة',
    'products.back': 'العودة للمنتجات',
    
    // Cart
    'cart.title': 'سلة التسوق',
    'cart.empty': 'السلة فارغة',
    'cart.quantity': 'الكمية',
    'cart.remove': 'إزالة',
    'cart.total': 'الإجمالي',
    'cart.checkout': 'إتمام الطلب',
    'cart.close': 'إغلاق',
    
    // Checkout
    'checkout.title': 'إتمام الطلب',
    'checkout.personal.info': 'المعلومات الشخصية',
    'checkout.full.name': 'الاسم الكامل',
    'checkout.wilaya': 'الولاية',
    'checkout.commune': 'البلدية',
    'checkout.select.wilaya': 'اختر الولاية',
    'checkout.select.commune': 'اختر البلدية',
    'checkout.shipping': 'خيارات التوصيل',
    'checkout.home.delivery': 'توصيل للمنزل',
    'checkout.office.delivery': 'توصيل لمكتب التوصيل',
    'checkout.shipping.cost': 'تكلفة التوصيل',
    'checkout.payment': 'طريقة الدفع',
    'checkout.cash.delivery': 'الدفع عند الاستلام',
    'checkout.submit': 'تأكيد الطلب',
    'checkout.back': 'العودة للسلة',
    
    // Footer
    'footer.features': 'مميزات المتجر',
    'footer.quality': 'منتجات عالية الجودة',
    'footer.shipping': 'شحن سريع وآمن',
    'footer.support': 'دعم فني متواصل',
    'footer.quality.desc': 'منتجات أصلية ومضمونة',
    'footer.shipping.desc': 'توصيل سريع لجميع أنحاء الجزائر',
    'footer.support.desc': 'خدمة عملاء متواصلة',
    'footer.location': 'الموقع الجغرافي',
    'footer.contact': 'معلومات التواصل',
    'footer.store.desc': 'متجرك المتخصص في المكملات الغذائية والمنتجات الرياضية عالية الجودة. نوفر لك كل ما تحتاجه لتحقيق أهدافك الرياضية.',
    'footer.contact.call.anytime': 'اتصل بنا في أي وقت',
    'footer.contact.whatsapp.cta': 'راسلنا عبر واتساب',
    'footer.quick.links': 'روابط سريعة',
    'footer.categories.link': 'التصنيفات',
    'footer.products.link': 'المنتجات',
    'footer.hours.and.guarantees': 'ساعات العمل والضمانات',
    'footer.working.hours': 'ساعات العمل',
    'footer.our.guarantees': 'ضماناتنا',
    'footer.guarantee1': 'منتجات أصلية 100%',
    'footer.guarantee2': 'استبدال في حالة العيب',
    'footer.guarantee3': 'دعم فني مجاني',
    'footer.copyright': '© {year} {storeName}. جميع الحقوق محفوظة.',
    'footer.made.with.love': 'صُنع بـ ❤️ في الجزائر',
    // Admin
    'admin.title': 'لوحة التحكم',
    'admin.orders': 'إدارة الطلبيات',
    'admin.products': 'إدارة المنتجات',
    'admin.categories': 'إدارة الأصناف',
    'admin.advertisements': 'إدارة الإعلانات',
    'admin.settings': 'الإعدادات',
    'admin.back': 'العودة للمتجر',
  },
  fr: {
    // Header
    'search.placeholder': 'Rechercher des produits...',
    'cart': 'Panier',
    'contact.phone': 'Appelez-nous: ',
    'language.switch': 'العربية',
    
// New Login/Signup Translations
'login.title': 'Connexion',
'login.usernameOrEmailPlaceholder': 'Nom d\'utilisateur ou email',
'login.passwordPlaceholder': 'Mot de passe',
'login.button': 'Se connecter',
'login.noAccountYet': 'Pas encore de compte ?',
'login.signUpLink': 'Inscrivez-vous',
'login.successMessage': 'Connexion réussie !',
'login.invalidCredentials': 'Nom d\'utilisateur ou mot de passe incorrect',
'login.error': 'Une erreur s\'est produite lors de la connexion',

'signup.title': 'Créer un compte',
'signup.fullNamePlaceholder': 'Nom complet',
'signup.usernamePlaceholder': 'Nom d\'utilisateur',
'signup.emailPlaceholder': 'Email',
'signup.button': 'S\'inscrire',
'signup.alreadyHaveAccount': 'Vous avez déjà un compte ?',
'signup.loginLink': 'Se connecter',
'signup.successMessage': 'Compte créé avec succès !',
'signup.userExists': 'Nom d\'utilisateur ou email déjà utilisé',
'signup.error': 'Une erreur s\'est produite lors de la création du compte',

// Logout
'logout.title': 'Déconnexion',
'logout.confirm': 'Êtes-vous sûr de vouloir vous déconnecter ?',
    
    // Categories
    'categories.title': 'Catégories',
    'categories.supplements': 'Suppléments',
    'categories.clothing': 'Vêtements de sport',
    'categories.protein': 'Protéine',
    'categories.vitamins': 'Vitamines',
    'categories.equipment': 'Équipement',
    
    // Products
    'products.title': 'Produits',
    'products.add.cart': 'Ajouter au panier',
    'products.order.now': 'Commander maintenant',
    'products.price': 'Prix',
    'products.old.price': 'Ancien prix',
    'products.details': 'Détails du produit',
    'products.usage': 'Mode d\'emploi',
    'products.flavors': 'Saveurs disponibles',
    'products.sizes': 'Tailles disponibles',
    'products.back': 'Retour aux produits',
    
    // Cart
    'cart.title': 'Panier d\'achat',
    'cart.empty': 'Le panier est vide',
    'cart.quantity': 'Quantité',
    'cart.remove': 'Retirer',
    'cart.total': 'Total',
    'cart.checkout': 'Passer commande',
    'cart.close': 'Fermer',
    
    // Checkout
    'checkout.title': 'Finaliser la commande',
    'checkout.personal.info': 'Informations personnelles',
    'checkout.full.name': 'Nom complet',
    'checkout.wilaya': 'Wilaya',
    'checkout.commune': 'Commune',
    'checkout.select.wilaya': 'Sélectionner la wilaya',
    'checkout.select.commune': 'Sélectionner la commune',
    'checkout.shipping': 'Options de livraison',
    'checkout.home.delivery': 'Livraison à domicile',
    'checkout.office.delivery': 'Livraison au bureau',
    'checkout.shipping.cost': 'Coût de livraison',
    'checkout.payment': 'Mode de paiement',
    'checkout.cash.delivery': 'Paiement à la livraison',
    'checkout.submit': 'Confirmer la commande',
    'checkout.back': 'Retour au panier',
    
    // Footer
    'footer.features': 'Avantages du magasin',
    'footer.quality': 'Produits de haute qualité',
    'footer.shipping': 'Livraison rapide et sûre',
    'footer.support': 'Support continu',
    'footer.quality.desc': 'Produits authentiques et garantis',
    'footer.shipping.desc': 'Livraison rapide dans toute l\'Algérie',
    'footer.support.desc': 'Service client continu',
    'footer.location': 'Localisation',
    'footer.contact': 'Informations de contact',
    'footer.store.desc': 'Votre magasin spécialisé dans les compléments alimentaires et les produits sportifs de haute qualité. Nous vous fournissons tout ce dont vous avez besoin pour atteindre vos objectifs sportifs.',
    'footer.contact.call.anytime': 'Appelez-nous à tout moment',
    'footer.contact.whatsapp.cta': 'Contactez-nous sur WhatsApp',
    'footer.quick.links': 'Liens rapides',
    'footer.categories.link': 'Catégories',
    'footer.products.link': 'Produits',
    'footer.hours.and.guarantees': 'Horaires et garanties',
    'footer.working.hours': 'Heures d\'ouverture',
    'footer.our.guarantees': 'Nos garanties',
    'footer.guarantee1': 'Produits 100% authentiques',
    'footer.guarantee2': 'Échange en cas de défaut',
    'footer.guarantee3': 'Support technique gratuit',
    'footer.copyright': '© {year} {storeName}. Tous droits réservés.',
    'footer.made.with.love': 'Fait avec ❤️ en Algérie',
    // Admin
    'admin.title': 'Panneau d\'administration',
    'admin.orders': 'Gestion des commandes',
    'admin.products': 'Gestion des produits',
    'admin.categories': 'Gestion des catégories',
    'admin.advertisements': 'Gestion des publicités',
    'admin.settings': 'Paramètres',
    'admin.back': 'Retour au magasin',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
const [language, setLanguage] = useState<Language>('ar');

const t = (key: string, params?: Record<string, string | number>): string => {
    let translation = translations[language][key] || key;
    if (params) {
      Object.keys(params).forEach(pKey => {
        translation = translation.replace(`{${pKey}}`, String(params[pKey]));
      });
    }
    return translation;
};

return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      <div dir={language === 'ar' ? 'rtl' : 'ltr'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};