import React, { useState } from 'react';
import { Phone, MessageCircle, MapPin, Clock, Mail, Send } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useStore } from '../contexts/StoreContext';

export const ContactPage: React.FC = () => {
  const { language } = useLanguage();
  const { settings } = useStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission - could send to WhatsApp or email
    const whatsappMessage = `الاسم: ${formData.name}\nالبريد الإلكتروني: ${formData.email}\nالموضوع: ${formData.subject}\nالرسالة: ${formData.message}`;
    const whatsappUrl = `https://wa.me/${settings.contactWhatsApp.replace('+', '')}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleWhatsAppContact = () => {
    const message = language === 'ar' 
      ? 'مرحباً، أريد الاستفسار عن منتجاتكم'
      : 'Bonjour, je voudrais me renseigner sur vos produits';
    const whatsappUrl = `https://wa.me/${settings.contactWhatsApp.replace('+', '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            {language === 'ar' ? 'اتصل بنا' : 'Contactez-nous'}
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-orange-500 mx-auto rounded-full mb-8"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {language === 'ar'
              ? 'نحن هنا لمساعدتك! تواصل معنا في أي وقت للاستفسار عن منتجاتنا أو خدماتنا'
              : 'Nous sommes là pour vous aider ! Contactez-nous à tout moment pour vous renseigner sur nos produits ou services'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {language === 'ar' ? 'معلومات التواصل' : 'Informations de contact'}
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Phone className="text-white" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {language === 'ar' ? 'رقم الهاتف' : 'Numéro de téléphone'}
                    </h3>
                    <p className="text-gray-600">{settings.contactPhone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 group cursor-pointer" onClick={handleWhatsAppContact}>
                  <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MessageCircle className="text-white" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">WhatsApp</h3>
                    <p className="text-gray-600">{settings.contactWhatsApp}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MapPin className="text-white" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {language === 'ar' ? 'العنوان' : 'Adresse'}
                    </h3>
                    <p className="text-gray-600">{settings.address[language]}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Clock className="text-white" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {language === 'ar' ? 'ساعات العمل' : 'Heures d\'ouverture'}
                    </h3>
                    <div className="text-gray-600 space-y-1">
                      <p>{language === 'ar' ? 'الأحد - الخميس: 8:00 - 20:00' : 'Dimanche - Jeudi: 8h00 - 20h00'}</p>
                      <p>{language === 'ar' ? 'الجمعة - السبت: 9:00 - 18:00' : 'Vendredi - Samedi: 9h00 - 18h00'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-blue-600 to-orange-500 p-8 rounded-2xl text-white">
              <h3 className="text-2xl font-bold mb-4">
                {language === 'ar' ? 'تواصل سريع' : 'Contact rapide'}
              </h3>
              <p className="mb-6 opacity-90">
                {language === 'ar'
                  ? 'للحصول على رد سريع، تواصل معنا عبر واتساب'
                  : 'Pour une réponse rapide, contactez-nous via WhatsApp'
                }
              </p>
              <button
                onClick={handleWhatsAppContact}
                className="bg-white text-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors flex items-center gap-2"
              >
                <MessageCircle size={20} />
                {language === 'ar' ? 'راسلنا على واتساب' : 'Contactez-nous sur WhatsApp'}
              </button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {language === 'ar' ? 'أرسل لنا رسالة' : 'Envoyez-nous un message'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'ar' ? 'الاسم الكامل' : 'Nom complet'}
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder={language === 'ar' ? 'أدخل اسمك الكامل' : 'Entrez votre nom complet'}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder={language === 'ar' ? 'أدخل بريدك الإلكتروني' : 'Entrez votre email'}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'ar' ? 'الموضوع' : 'Sujet'}
                </label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder={language === 'ar' ? 'موضوع الرسالة' : 'Sujet du message'}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'ar' ? 'الرسالة' : 'Message'}
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                  placeholder={language === 'ar' ? 'اكتب رسالتك هنا...' : 'Écrivez votre message ici...'}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-orange-500 text-white py-3 px-6 rounded-xl font-bold hover:from-blue-700 hover:to-orange-600 transition-all transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <Send size={20} />
                {language === 'ar' ? 'إرسال الرسالة' : 'Envoyer le message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};