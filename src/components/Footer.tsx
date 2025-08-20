import React from 'react';
import { MapPin, Phone, Shield, Truck, Headphones, Star, MessageCircle, ExternalLink } from 'lucide-react';
import { useStore } from '../contexts/StoreContext';
import { useLanguage } from '../contexts/LanguageContext';

export const Footer: React.FC = () => {
  const { settings, pages } = useStore();
  const { language, t } = useLanguage();

  // Get pages that are marked to be shown in the footer from the store
  const footerPages = pages?.filter(page => page.showInFooter && page.isPublished) || [];

  const features = [
    {
      icon: Star,
      title: t('footer.quality'),
      description: language === 'ar' ? 'منتجات أصلية ومضمونة' : 'Produits authentiques et garantis'
    },
    {
      icon: Truck,
      title: t('footer.shipping'),
      description: language === 'ar' ? 'توصيل سريع لجميع أنحاء الجزائر' : 'Livraison rapide dans toute l\'Algérie'
    },
    {
      icon: Headphones,
      title: t('footer.support'),
      description: language === 'ar' ? 'خدمة عملاء متواصلة' : 'Service client continu'
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
    <footer className="bg-gray-900 text-white">
      {/* Features Section */}
      <div className="border-b border-gray-800">
        <div className="container mx-auto px-4 py-8">
          <h3 className="text-xl font-bold text-center mb-8">{t('footer.features')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon size={24} />
                </div>
                <h4 className="font-semibold mb-2">{feature.title}</h4>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Store Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                GYM
              </div>
              <div>
                <h3 className="text-xl font-bold">{settings.storeName[language]}</h3>
                <p className="text-orange-400 text-sm">Your Fitness Partner</p>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed">
              {t('footer.store.desc')}
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-lg mb-4">{t('footer.contact')}</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="text-orange-400" size={18} />
                <div>
                  <p className="font-medium">{settings.contactPhone}</p>
                  <p className="text-gray-400 text-sm">{t('footer.contact.call.anytime')}</p>
                </div>
              </div>

              <button
                onClick={handleWhatsAppContact}
                className="flex items-center gap-3 w-full text-right hover:bg-gray-800 p-2 rounded-lg transition-colors"
              >
                <MessageCircle className="text-green-400" size={18} />
                <div>
                  <p className="font-medium">WhatsApp</p>
                  <p className="text-gray-400 text-sm">{t('footer.contact.whatsapp.cta')}</p>
                </div>
              </button>

              <div className="flex items-start gap-3">
                <MapPin className="text-red-400 mt-1" size={18} />
                <div>
                  <p className="font-medium">{t('footer.location')}</p>
                  <p className="text-gray-400 text-sm">{settings.address[language]}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">{t('footer.quick.links')}</h4>
            <ul className="space-y-3">
              {footerPages.map(page => (
                <li key={page.id}>
                  <a
                    href={`/page/${page.slug}`}
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                  >
                    <ExternalLink size={14} />
                    {page.title[language]}
                  </a>
                </li>
              ))}
              <li>
                <a href="#categories" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                  <ExternalLink size={14} />
                  {t('footer.categories.link')}
                </a>
              </li>
              <li>
                <a href="#products" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                  <ExternalLink size={14} />
                  {t('footer.products.link')}
                </a>
              </li>
            </ul>
          </div>

          {/* Business Hours & Guarantees */}
          <div>
            <h4 className="font-bold text-lg mb-4">{t('footer.hours.and.guarantees')}</h4>
            <div className="space-y-4">
              <div>
                <h5 className="font-semibold text-orange-400 mb-2">
                  {language === 'ar' ? 'ساعات العمل' : 'Heures d\'ouverture'}
                </h5>
                <p className="text-gray-400 text-sm">
                  {language === 'ar' ? 'الأحد - الخميس: 8:00 - 20:00' : 'Dimanche - Jeudi: 8h00 - 20h00'}
                </p>
                <p className="text-gray-400 text-sm">
                  {language === 'ar' ? 'الجمعة - السبت: 9:00 - 18:00' : 'Vendredi - Samedi: 9h00 - 18h00'}
                </p>
              </div>

              <div>
                <h5 className="font-semibold text-orange-400 mb-2">
                  {t('footer.our.guarantees')}
                </h5>
                <ul className="text-gray-400 text-sm space-y-1">
                  <li className="flex items-center gap-2">
                    <Shield size={14} className="text-green-400" />
                    {t('footer.guarantee1')}
                  </li>
                  <li className="flex items-center gap-2">
                    <Shield size={14} className="text-green-400" />
                    {t('footer.guarantee2')}
                  </li>
                  <li className="flex items-center gap-2">
                    <Shield size={14} className="text-green-400" />
                    {t('footer.guarantee3')}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>
              {t('footer.copyright', { year: new Date().getFullYear(), storeName: settings.storeName[language] })}
            </p>
            <p className="mt-2 md:mt-0">{t('footer.made.with.love')}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};