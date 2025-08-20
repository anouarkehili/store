import React from 'react';
import { FileText, CheckCircle, AlertTriangle, Scale } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const TermsPage: React.FC = () => {
  const { language } = useLanguage();

  const highlights = [
    {
      icon: CheckCircle,
      title: language === 'ar' ? 'قبول الشروط' : 'Acceptation des conditions',
      description: language === 'ar' 
        ? 'باستخدام موقعنا، فإنكم توافقون على جميع الشروط والأحكام'
        : 'En utilisant notre site, vous acceptez tous les termes et conditions'
    },
    {
      icon: AlertTriangle,
      title: language === 'ar' ? 'المسؤولية' : 'Responsabilité',
      description: language === 'ar'
        ? 'نحن غير مسؤولين عن أي أضرار ناتجة عن سوء الاستخدام'
        : 'Nous ne sommes pas responsables des dommages résultant d\'une mauvaise utilisation'
    },
    {
      icon: Scale,
      title: language === 'ar' ? 'القانون المطبق' : 'Loi applicable',
      description: language === 'ar'
        ? 'تخضع هذه الاتفاقية للقوانين الجزائرية'
        : 'Cet accord est soumis aux lois algériennes'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <FileText className="text-blue-600" size={48} />
            <h1 className="text-5xl font-bold text-gray-800">
              {language === 'ar' ? 'اتفاقية الموقع' : 'Conditions d\'utilisation'}
            </h1>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-orange-500 mx-auto rounded-full mb-8"></div>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {language === 'ar'
              ? 'يرجى قراءة هذه الشروط والأحكام بعناية قبل استخدام موقعنا. استخدامكم للموقع يعني موافقتكم على هذه الشروط.'
              : 'Veuillez lire attentivement ces termes et conditions avant d\'utiliser notre site. Votre utilisation du site implique votre acceptation de ces conditions.'
            }
          </p>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {highlights.map((highlight, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 text-center group"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <highlight.icon size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-blue-600 transition-colors">
                {highlight.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {highlight.description}
              </p>
            </div>
          ))}
        </div>

        {/* Detailed Terms */}
        <div className="bg-white rounded-3xl shadow-lg p-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            {language === 'ar' ? 'الشروط والأحكام التفصيلية' : 'Conditions détaillées'}
          </h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                {language === 'ar' ? '1. قبول الشروط' : '1. Acceptation des conditions'}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {language === 'ar'
                  ? 'باستخدام موقع GYM DADA STORE، فإنكم توافقون على الالتزام بهذه الشروط والأحكام. إذا كنتم لا توافقون على أي من هذه الشروط، يرجى عدم استخدام الموقع.'
                  : 'En utilisant le site GYM DADA STORE, vous acceptez de vous conformer à ces termes et conditions. Si vous n\'acceptez pas l\'une de ces conditions, veuillez ne pas utiliser le site.'
                }
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                {language === 'ar' ? '2. استخدام الموقع' : '2. Utilisation du site'}
              </h3>
              <ul className="text-gray-700 leading-relaxed space-y-2">
                <li>• {language === 'ar' ? 'يجب استخدام الموقع للأغراض القانونية فقط' : 'Le site doit être utilisé uniquement à des fins légales'}</li>
                <li>• {language === 'ar' ? 'ممنوع نشر محتوى مسيء أو غير قانوني' : 'Il est interdit de publier du contenu offensant ou illégal'}</li>
                <li>• {language === 'ar' ? 'يجب عدم محاولة اختراق أو إلحاق الضرر بالموقع' : 'Il ne faut pas tenter de pirater ou d\'endommager le site'}</li>
                <li>• {language === 'ar' ? 'يجب احترام حقوق الملكية الفكرية' : 'Les droits de propriété intellectuelle doivent être respectés'}</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                {language === 'ar' ? '3. الطلبات والمدفوعات' : '3. Commandes et paiements'}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {language === 'ar'
                  ? 'جميع الطلبات تخضع للتوفر والتأكيد. نحتفظ بالحق في رفض أي طلب لأي سبب. الأسعار قابلة للتغيير دون إشعار مسبق. الدفع يتم عند الاستلام للطلبات المحلية.'
                  : 'Toutes les commandes sont soumises à disponibilité et confirmation. Nous nous réservons le droit de refuser toute commande pour quelque raison que ce soit. Les prix peuvent changer sans préavis. Le paiement se fait à la livraison pour les commandes locales.'
                }
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                {language === 'ar' ? '4. التوصيل والإرجاع' : '4. Livraison et retours'}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {language === 'ar'
                  ? 'نسعى لتوصيل الطلبات في الوقت المحدد، لكننا غير مسؤولين عن التأخير خارج سيطرتنا. يمكن إرجاع المنتجات المعيبة خلال 7 أيام من الاستلام. المنتجات المستهلكة أو المفتوحة غير قابلة للإرجاع.'
                  : 'Nous nous efforçons de livrer les commandes à temps, mais nous ne sommes pas responsables des retards hors de notre contrôle. Les produits défectueux peuvent être retournés dans les 7 jours suivant la réception. Les produits consommés ou ouverts ne peuvent pas être retournés.'
                }
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                {language === 'ar' ? '5. إخلاء المسؤولية' : '5. Limitation de responsabilité'}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {language === 'ar'
                  ? 'نحن غير مسؤولين عن أي أضرار مباشرة أو غير مباشرة ناتجة عن استخدام الموقع أو المنتجات. استخدام المنتجات على مسؤوليتكم الشخصية. يُنصح باستشارة طبيب قبل استخدام المكملات الغذائية.'
                  : 'Nous ne sommes pas responsables des dommages directs ou indirects résultant de l\'utilisation du site ou des produits. L\'utilisation des produits est sous votre propre responsabilité. Il est conseillé de consulter un médecin avant d\'utiliser des compléments alimentaires.'
                }
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                {language === 'ar' ? '6. تعديل الشروط' : '6. Modification des conditions'}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {language === 'ar'
                  ? 'نحتفظ بالحق في تعديل هذه الشروط في أي وقت دون إشعار مسبق. التعديلات تصبح سارية فور نشرها على الموقع. استمراركم في استخدام الموقع يعني موافقتكم على الشروط المعدلة.'
                  : 'Nous nous réservons le droit de modifier ces conditions à tout moment sans préavis. Les modifications entrent en vigueur dès leur publication sur le site. Votre utilisation continue du site implique votre acceptation des conditions modifiées.'
                }
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                {language === 'ar' ? '7. القانون المطبق' : '7. Loi applicable'}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {language === 'ar'
                  ? 'تخضع هذه الاتفاقية وتفسر وفقاً للقوانين الجزائرية. أي نزاع ينشأ عن هذه الاتفاقية يخضع للاختصاص الحصري للمحاكم الجزائرية.'
                  : 'Cet accord est régi et interprété conformément aux lois algériennes. Tout litige découlant de cet accord relève de la compétence exclusive des tribunaux algériens.'
                }
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                {language === 'ar' ? '8. معلومات الاتصال' : '8. Informations de contact'}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {language === 'ar'
                  ? 'لأي أسئلة حول هذه الشروط والأحكام، يرجى التواصل معنا عبر الهاتف أو واتساب. نحن متاحون لمساعدتكم وتوضيح أي استفسارات.'
                  : 'Pour toute question concernant ces termes et conditions, veuillez nous contacter par téléphone ou WhatsApp. Nous sommes disponibles pour vous aider et clarifier toute question.'
                }
              </p>
            </div>
          </div>
        </div>

        {/* Last Updated */}
        <div className="text-center mt-12">
          <p className="text-gray-500">
            {language === 'ar' 
              ? `آخر تحديث: ${new Date().toLocaleDateString('ar-DZ')}`
              : `Dernière mise à jour : ${new Date().toLocaleDateString('fr-FR')}`
            }
          </p>
        </div>
      </div>
    </div>
  );
};