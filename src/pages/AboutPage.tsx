import React from 'react';
import { Shield, Award, Users, Target } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const AboutPage: React.FC = () => {
  const { language } = useLanguage();

  const features = [
    {
      icon: Shield,
      title: language === 'ar' ? 'الثقة والأمان' : 'Confiance et sécurité',
      description: language === 'ar' 
        ? 'نضمن لك تجربة تسوق آمنة ومنتجات أصلية 100%'
        : 'Nous vous garantissons une expérience d\'achat sécurisée et des produits 100% authentiques'
    },
    {
      icon: Award,
      title: language === 'ar' ? 'الجودة العالية' : 'Haute qualité',
      description: language === 'ar'
        ? 'نختار منتجاتنا بعناية من أفضل الماركات العالمية'
        : 'Nous sélectionnons soigneusement nos produits des meilleures marques mondiales'
    },
    {
      icon: Users,
      title: language === 'ar' ? 'خدمة العملاء' : 'Service client',
      description: language === 'ar'
        ? 'فريق دعم متخصص متاح لمساعدتك في أي وقت'
        : 'Équipe de support spécialisée disponible pour vous aider à tout moment'
    },
    {
      icon: Target,
      title: language === 'ar' ? 'تحقيق الأهداف' : 'Atteindre les objectifs',
      description: language === 'ar'
        ? 'نساعدك في الوصول لأهدافك الرياضية والصحية'
        : 'Nous vous aidons à atteindre vos objectifs sportifs et de santé'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            {language === 'ar' ? 'عن GYM DADA STORE' : 'À propos de GYM DADA STORE'}
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-orange-500 mx-auto rounded-full mb-8"></div>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {language === 'ar'
              ? 'نحن متجر متخصص في بيع المكملات الغذائية والمنتجات الرياضية عالية الجودة. منذ تأسيسنا، نهدف إلى مساعدة عملائنا في تحقيق أهدافهم الرياضية والصحية من خلال توفير أفضل المنتجات بأسعار تنافسية وخدمة عملاء متميزة.'
              : 'Nous sommes un magasin spécialisé dans la vente de compléments alimentaires et de produits sportifs de haute qualité. Depuis notre création, nous visons à aider nos clients à atteindre leurs objectifs sportifs et de santé en fournissant les meilleurs produits à des prix compétitifs et un service client exceptionnel.'
            }
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 text-center group hover:-translate-y-2"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-blue-600 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-3xl shadow-lg p-12 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              {language === 'ar' ? 'رسالتنا' : 'Notre mission'}
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-orange-500 mx-auto rounded-full"></div>
          </div>
          <p className="text-lg text-gray-700 text-center max-w-4xl mx-auto leading-relaxed">
            {language === 'ar'
              ? 'رسالتنا هي أن نكون الشريك الموثوق لكل من يسعى لتحسين لياقته البدنية وصحته. نؤمن بأن الرياضة والتغذية السليمة هما أساس الحياة الصحية، ولذلك نعمل جاهدين لتوفير أفضل المنتجات والخدمات التي تساعد عملاءنا على تحقيق أهدافهم.'
              : 'Notre mission est d\'être le partenaire de confiance de tous ceux qui cherchent à améliorer leur forme physique et leur santé. Nous croyons que le sport et une nutrition appropriée sont la base d\'une vie saine, c\'est pourquoi nous travaillons dur pour fournir les meilleurs produits et services qui aident nos clients à atteindre leurs objectifs.'
            }
          </p>
        </div>

        {/* Values Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            {language === 'ar' ? 'قيمنا' : 'Nos valeurs'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-blue-800 mb-4">
                {language === 'ar' ? 'الجودة' : 'Qualité'}
              </h3>
              <p className="text-blue-700">
                {language === 'ar'
                  ? 'نختار منتجاتنا بعناية فائقة لضمان أعلى معايير الجودة'
                  : 'Nous sélectionnons nos produits avec un soin extrême pour garantir les plus hauts standards de qualité'
                }
              </p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-orange-800 mb-4">
                {language === 'ar' ? 'الشفافية' : 'Transparence'}
              </h3>
              <p className="text-orange-700">
                {language === 'ar'
                  ? 'نؤمن بالشفافية الكاملة في التعامل مع عملائنا'
                  : 'Nous croyons en la transparence totale dans nos relations avec nos clients'
                }
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-green-800 mb-4">
                {language === 'ar' ? 'الالتزام' : 'Engagement'}
              </h3>
              <p className="text-green-700">
                {language === 'ar'
                  ? 'نلتزم بتقديم أفضل خدمة ودعم لعملائنا'
                  : 'Nous nous engageons à fournir le meilleur service et support à nos clients'
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};