import React from 'react';
import { Shield, Eye, Lock, UserCheck } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const PrivacyPage: React.FC = () => {
  const { language } = useLanguage();

  const sections = [
    {
      icon: Shield,
      title: language === 'ar' ? 'حماية البيانات' : 'Protection des données',
      content: language === 'ar' 
        ? 'نحن نلتزم بحماية معلوماتكم الشخصية وفقاً لأعلى معايير الأمان. جميع البيانات التي تقدمونها محمية بتقنيات التشفير المتقدمة.'
        : 'Nous nous engageons à protéger vos informations personnelles selon les plus hauts standards de sécurité. Toutes les données que vous fournissez sont protégées par des technologies de cryptage avancées.'
    },
    {
      icon: Eye,
      title: language === 'ar' ? 'جمع المعلومات' : 'Collecte d\'informations',
      content: language === 'ar'
        ? 'نجمع المعلومات الضرورية فقط لتقديم خدماتنا، مثل الاسم ومعلومات الاتصال وعنوان التوصيل. لا نجمع معلومات غير ضرورية.'
        : 'Nous ne collectons que les informations nécessaires pour fournir nos services, telles que le nom, les informations de contact et l\'adresse de livraison. Nous ne collectons pas d\'informations inutiles.'
    },
    {
      icon: Lock,
      title: language === 'ar' ? 'استخدام المعلومات' : 'Utilisation des informations',
      content: language === 'ar'
        ? 'نستخدم معلوماتكم فقط لمعالجة طلباتكم وتحسين خدماتنا. لا نبيع أو نشارك معلوماتكم مع أطراف ثالثة دون موافقتكم.'
        : 'Nous utilisons vos informations uniquement pour traiter vos commandes et améliorer nos services. Nous ne vendons ni ne partageons vos informations avec des tiers sans votre consentement.'
    },
    {
      icon: UserCheck,
      title: language === 'ar' ? 'حقوقكم' : 'Vos droits',
      content: language === 'ar'
        ? 'لديكم الحق في الوصول إلى معلوماتكم الشخصية وتعديلها أو حذفها في أي وقت. يمكنكم التواصل معنا لممارسة هذه الحقوق.'
        : 'Vous avez le droit d\'accéder à vos informations personnelles, de les modifier ou de les supprimer à tout moment. Vous pouvez nous contacter pour exercer ces droits.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Shield className="text-blue-600" size={48} />
            <h1 className="text-5xl font-bold text-gray-800">
              {language === 'ar' ? 'سياسة الخصوصية' : 'Politique de confidentialité'}
            </h1>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-orange-500 mx-auto rounded-full mb-8"></div>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {language === 'ar'
              ? 'نحن نحترم خصوصيتكم ونلتزم بحماية معلوماتكم الشخصية. هذه السياسة توضح كيفية جمع واستخدام وحماية بياناتكم.'
              : 'Nous respectons votre vie privée et nous nous engageons à protéger vos informations personnelles. Cette politique explique comment nous collectons, utilisons et protégeons vos données.'
            }
          </p>
        </div>

        {/* Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {sections.map((section, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <section.icon size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 text-center group-hover:text-blue-600 transition-colors">
                {section.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-center">
                {section.content}
              </p>
            </div>
          ))}
        </div>

        {/* Detailed Policy */}
        <div className="bg-white rounded-3xl shadow-lg p-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            {language === 'ar' ? 'تفاصيل السياسة' : 'Détails de la politique'}
          </h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                {language === 'ar' ? '1. المعلومات التي نجمعها' : '1. Informations que nous collectons'}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {language === 'ar'
                  ? 'نجمع المعلومات التالية عندما تستخدمون موقعنا: الاسم الكامل، رقم الهاتف، عنوان التوصيل، البريد الإلكتروني (إذا تم تقديمه). هذه المعلومات ضرورية لمعالجة طلباتكم وتوصيل المنتجات إليكم.'
                  : 'Nous collectons les informations suivantes lorsque vous utilisez notre site : nom complet, numéro de téléphone, adresse de livraison, email (si fourni). Ces informations sont nécessaires pour traiter vos commandes et livrer les produits.'
                }
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                {language === 'ar' ? '2. كيف نستخدم معلوماتكم' : '2. Comment nous utilisons vos informations'}
              </h3>
              <ul className="text-gray-700 leading-relaxed space-y-2">
                <li>• {language === 'ar' ? 'معالجة وتنفيذ طلباتكم' : 'Traitement et exécution de vos commandes'}</li>
                <li>• {language === 'ar' ? 'التواصل معكم بخصوص الطلبات' : 'Communication avec vous concernant les commandes'}</li>
                <li>• {language === 'ar' ? 'تحسين خدماتنا ومنتجاتنا' : 'Amélioration de nos services et produits'}</li>
                <li>• {language === 'ar' ? 'إرسال عروض خاصة (بموافقتكم)' : 'Envoi d\'offres spéciales (avec votre consentement)'}</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                {language === 'ar' ? '3. مشاركة المعلومات' : '3. Partage des informations'}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {language === 'ar'
                  ? 'لا نبيع أو نؤجر أو نشارك معلوماتكم الشخصية مع أطراف ثالثة إلا في الحالات التالية: عند الحاجة لتوصيل الطلبات (مع شركات التوصيل)، أو عند وجود التزام قانوني، أو بموافقتكم الصريحة.'
                  : 'Nous ne vendons, ne louons ni ne partageons vos informations personnelles avec des tiers, sauf dans les cas suivants : lorsque nécessaire pour la livraison des commandes (avec les entreprises de livraison), en cas d\'obligation légale, ou avec votre consentement explicite.'
                }
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                {language === 'ar' ? '4. أمان المعلومات' : '4. Sécurité des informations'}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {language === 'ar'
                  ? 'نتخذ إجراءات أمنية متقدمة لحماية معلوماتكم من الوصول غير المصرح به أو التعديل أو الكشف أو التدمير. نستخدم تقنيات التشفير وبروتوكولات الأمان المعتمدة عالمياً.'
                  : 'Nous prenons des mesures de sécurité avancées pour protéger vos informations contre l\'accès non autorisé, la modification, la divulgation ou la destruction. Nous utilisons des technologies de cryptage et des protocoles de sécurité reconnus mondialement.'
                }
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                {language === 'ar' ? '5. حقوقكم' : '5. Vos droits'}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {language === 'ar'
                  ? 'لديكم الحق في: الوصول إلى معلوماتكم الشخصية، تصحيح المعلومات غير الصحيحة، حذف معلوماتكم (في ظروف معينة), الاعتراض على معالجة معلوماتكم، طلب نقل معلوماتكم. للممارسة هذه الحقوق، يرجى التواصل معنا.'
                  : 'Vous avez le droit de : accéder à vos informations personnelles, corriger les informations incorrectes, supprimer vos informations (dans certaines circonstances), vous opposer au traitement de vos informations, demander le transfert de vos informations. Pour exercer ces droits, veuillez nous contacter.'
                }
              </p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-orange-500 text-white p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-4">
              {language === 'ar' ? 'أسئلة حول الخصوصية؟' : 'Questions sur la confidentialité ?'}
            </h3>
            <p className="mb-6 opacity-90">
              {language === 'ar'
                ? 'إذا كان لديكم أي أسئلة حول سياسة الخصوصية، لا تترددوا في التواصل معنا'
                : 'Si vous avez des questions sur notre politique de confidentialité, n\'hésitez pas à nous contacter'
              }
            </p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors">
              {language === 'ar' ? 'اتصل بنا' : 'Contactez-nous'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};