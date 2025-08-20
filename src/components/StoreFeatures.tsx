import React from 'react';
import { Shield, Truck, CreditCard, Award, Phone, RefreshCw } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const StoreFeatures: React.FC = () => {
  const { language } = useLanguage();

  const features = [
    {
      icon: CreditCard,
      title: language === 'ar' ? 'الدفع عند الاستلام' : 'Paiement à la livraison',
      description: language === 'ar' ? 'ادفع عند وصول طلبك بأمان تام' : 'Payez en toute sécurité à la réception',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Award,
      title: language === 'ar' ? 'منتجات أصلية 100%' : 'Produits 100% authentiques',
      description: language === 'ar' ? 'جميع منتجاتنا أصلية ومضمونة الجودة' : 'Tous nos produits sont authentiques et garantis',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Truck,
      title: language === 'ar' ? 'توصيل مجاني' : 'Livraison gratuite',
      description: language === 'ar' ? 'توصيل مجاني لأي طلبية تحتوي على 4 منتجات أو أكثر' : 'Livraison gratuite pour 4 produits ou plus',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Phone,
      title: language === 'ar' ? 'دعم فني 24/7' : 'Support 24/7',
      description: language === 'ar' ? 'فريق الدعم متاح لمساعدتك في أي وقت' : 'Notre équipe est disponible à tout moment',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: RefreshCw,
      title: language === 'ar' ? 'ضمان الاستبدال' : 'Garantie d\'échange',
      description: language === 'ar' ? 'إمكانية الاستبدال في حالة وجود عيب في المنتج' : 'Échange possible en cas de défaut',
      color: 'from-indigo-500 to-blue-500'
    },
    {
      icon: Shield,
      title: language === 'ar' ? 'تسوق آمن' : 'Achat sécurisé',
      description: language === 'ar' ? 'معلوماتك محمية بأعلى معايير الأمان' : 'Vos informations sont protégées',
      color: 'from-teal-500 to-green-500'
    }
  ];

  return (
    <section className="container mx-auto px-4 py-16 bg-gradient-to-br from-gray-50 to-white rounded-3xl my-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          {language === 'ar' ? '🌟 مميزات متجرنا' : '🌟 Nos avantages'}
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          {language === 'ar' 
            ? 'نقدم لك أفضل تجربة تسوق مع ضمانات وخدمات متميزة'
            : 'Nous vous offrons la meilleure expérience d\'achat avec des garanties et services exceptionnels'
          }
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-orange-500 mx-auto rounded-full mt-4"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="group relative p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-transparent overflow-hidden transform hover:-translate-y-2"
          >
            {/* Background gradient effect */}
            <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl`} />
            
            <div className="relative z-10">
              <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                <feature.icon size={32} />
              </div>
              
              <h3 className="text-xl font-bold text-gray-800 mb-4 text-center group-hover:text-gray-900 transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 text-center leading-relaxed group-hover:text-gray-700 transition-colors">
                {feature.description}
              </p>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
            <div className="absolute bottom-4 left-4 w-2 h-2 rounded-full bg-gradient-to-br from-orange-400 to-red-400 opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="text-center mt-12">
        <div className="inline-flex items-center gap-4 bg-gradient-to-r from-blue-600 to-orange-500 text-white px-8 py-4 rounded-2xl shadow-lg">
          <Truck size={24} />
          <span className="text-lg font-bold">
            {language === 'ar' 
              ? 'اطلب الآن واستمتع بالتوصيل المجاني للطلبيات الكبيرة!'
              : 'Commandez maintenant et profitez de la livraison gratuite!'
            }
          </span>
        </div>
      </div>
    </section>
  );
};