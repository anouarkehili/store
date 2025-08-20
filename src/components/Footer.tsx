import React from 'react';
import { MapPin, Phone, Shield, Truck, Headphones, Star, MessageCircle, ExternalLink, Award, CreditCard, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useStore } from '../contexts/StoreContext';
import { useLanguage } from '../contexts/LanguageContext';

export const Footer: React.FC = () => {
  const { settings, pages } = useStore();
  const { language, t } = useLanguage();

  // Get pages that are marked to be shown in the footer from the store
  const footerPages = pages?.filter(page => page.showInFooter && page.isPublished) || [];

  const features = [
    {
      icon: CreditCard,
      title: language === 'ar' ? 'الدفع عند الاستلام' : 'Paiement à la livraison',
      description: language === 'ar' ? 'ادفع عند وصول طلبك بأمان تام' : 'Payez en toute sécurité à la réception'
    },
    {
      icon: Award,
      title: language === 'ar' ? 'منتجات أصلية 100%' : 'Produits 100% authentiques',
      description: language === 'ar' ? 'جميع منتجاتنا أصلية ومضمونة الجودة' : 'Tous nos produits sont authentiques et garantis'
    },
    {
      icon: Truck,
      title: language === 'ar' ? 'توصيل مجاني' : 'Livraison gratuite',
      description: language === 'ar' ? 'توصيل مجاني لأي طلبية تحتوي على 4 منتجات أو أكثر' : 'Livraison gratuite pour 4 produits ou plus'
    }
  ];

  const handleWhatsAppContact = () => {
    const message = language === 'ar' 
      ? 'مرحباً، أريد الاستفسار عن منتجاتكم'
      : 'Bonjour, je voudrais me renseigner sur vos produits';
    const whatsappUrl = `https://wa.me/${settings.contactWhatsApp.replace('+', '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Features Section */}
      <div className="border-b border-gray-700">
        <div className="container mx-auto px-4 py-8">
          <h3 className="text-2xl font-bold text-center mb-8">
            {language === 'ar' ? '🌟 مميزات متجرنا' : '🌟 Nos avantages'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <feature.icon size={24} />
                </div>
                <h4 className="font-bold text-lg mb-2 group-hover:text-blue-400 transition-colors">{feature.title}</h4>
                <p className="text-gray-300 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Store Info */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-6 group">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-orange-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl group-hover:scale-110 transition-transform duration-300 shadow-lg">
                GYM
              </div>
              <div>
                <h3 className="text-2xl font-bold group-hover:text-blue-400 transition-colors">{settings.storeName[language]}</h3>
                <p className="text-orange-400 text-sm font-medium">Your Fitness Partner</p>
              </div>
            </Link>
            <p className="text-gray-300 leading-relaxed text-sm">
              {language === 'ar' 
                ? 'متجرك المتخصص في المكملات الغذائية والمنتجات الرياضية عالية الجودة. نوفر لك كل ما تحتاجه لتحقيق أهدافك الرياضية.'
                : 'Votre magasin spécialisé dans les compléments alimentaires et les produits sportifs de haute qualité. Nous vous fournissons tout ce dont vous avez besoin pour atteindre vos objectifs sportifs.'
              }
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-xl mb-6 text-blue-400">
              {language === 'ar' ? 'معلومات التواصل' : 'Informations de contact'}
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 group">
                <Phone className="text-orange-400 group-hover:scale-110 transition-transform" size={18} />
                <div>
                  <p className="font-semibold">{settings.contactPhone}</p>
                  <p className="text-gray-400 text-xs">
                    {language === 'ar' ? 'اتصل بنا في أي وقت' : 'Appelez-nous à tout moment'}
                  </p>
                </div>
              </div>

              <button
                onClick={handleWhatsAppContact}
                className="flex items-center gap-3 w-full text-right hover:bg-gray-700 p-3 rounded-xl transition-all duration-300 group"
              >
                <MessageCircle className="text-green-400 group-hover:scale-110 transition-transform" size={18} />
                <div>
                  <p className="font-semibold">WhatsApp</p>
                  <p className="text-gray-400 text-xs">
                    {language === 'ar' ? 'راسلنا عبر واتساب' : 'Contactez-nous sur WhatsApp'}
                  </p>
                </div>
              </button>

              <div className="flex items-start gap-3 group">
                <MapPin className="text-red-400 mt-1 group-hover:scale-110 transition-transform" size={18} />
                <div>
                  <p className="font-semibold">
                    {language === 'ar' ? 'الموقع الجغرافي' : 'Localisation'}
                  </p>
                  <p className="text-gray-400 text-xs">{settings.address[language]}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-xl mb-6 text-blue-400">
              {language === 'ar' ? 'حسابي' : 'Mon compte'}
            </h4>
            <ul className="space-y-3">
              {footerPages.map(page => (
                <li key={page.id}>
                  <Link
                    to={`/${page.slug}`}
                    className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2 group"
                  >
                    <ExternalLink size={14} className="group-hover:scale-110 transition-transform" />
                    {page.title[language]}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/account" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2 group">
                  <ExternalLink size={14} className="group-hover:scale-110 transition-transform" />
                  {language === 'ar' ? 'حسابي' : 'Mon compte'}
                </Link>
              </li>
              <li>
                <Link to="/best-sellers" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2 group">
                  <ExternalLink size={14} className="group-hover:scale-110 transition-transform" />
                  {language === 'ar' ? 'الأكثر مبيعاً' : 'Meilleures ventes'}
                </Link>
              </li>
              <li>
                <Link to="/special-offers" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2 group">
                  <ExternalLink size={14} className="group-hover:scale-110 transition-transform" />
                  {language === 'ar' ? 'العروض الخاصة' : 'Offres spéciales'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Business Hours & Guarantees */}
          <div>
            <h4 className="font-bold text-xl mb-6 text-blue-400">
              {language === 'ar' ? 'ساعات العمل والضمانات' : 'Heures et garanties'}
            </h4>
            <div className="space-y-4">
              <div>
                <h5 className="font-bold text-orange-400 mb-3">
                  {language === 'ar' ? 'ساعات العمل' : 'Heures d\'ouverture'}
                </h5>
                <p className="text-gray-300 text-sm mb-1">
                  {language === 'ar' ? 'الأحد - الخميس: 8:00 - 20:00' : 'Dimanche - Jeudi: 8h00 - 20h00'}
                </p>
                <p className="text-gray-300 text-sm">
                  {language === 'ar' ? 'الجمعة - السبت: 9:00 - 18:00' : 'Vendredi - Samedi: 9h00 - 18h00'}
                </p>
              </div>

              <div>
                <h5 className="font-bold text-orange-400 mb-3">
                  {language === 'ar' ? 'ضماناتنا' : 'Nos garanties'}
                </h5>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li className="flex items-center gap-2 group">
                    <Shield size={14} className="text-green-400 group-hover:scale-110 transition-transform" />
                    {language === 'ar' ? 'منتجات أصلية 100%' : 'Produits 100% authentiques'}
                  </li>
                  <li className="flex items-center gap-2 group">
                    <RefreshCw size={14} className="text-green-400 group-hover:scale-110 transition-transform" />
                    {language === 'ar' ? 'استبدال في حالة العيب' : 'Échange en cas de défaut'}
                  </li>
                  <li className="flex items-center gap-2 group">
                    <Headphones size={14} className="text-green-400 group-hover:scale-110 transition-transform" />
                    {language === 'ar' ? 'دعم فني مجاني' : 'Support technique gratuit'}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-700 bg-gray-900">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>
              © {new Date().getFullYear()} {settings.storeName[language]}. 
              {language === 'ar' ? ' جميع الحقوق محفوظة.' : ' Tous droits réservés.'}
            </p>
            <p className="mt-2 md:mt-0 flex items-center gap-1">
              {language === 'ar' ? 'صُنع بـ' : 'Fait avec'} ❤️ 
              {language === 'ar' ? ' في الجزائر' : ' en Algérie'}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};