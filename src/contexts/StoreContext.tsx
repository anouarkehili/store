import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AlgerianCity, loadAlgerianCitiesData, getWilayasFromCSV, getCommunesForWilaya } from '../data/csvReader';

export interface Product {
  id: string;
  name: { ar: string; fr: string };
  description: { ar: string; fr: string };
  usage: { ar: string; fr: string };
  price: number;
  oldPrice?: number;
  image: string;
  categoryId: string;
  flavors?: string[];
  sizes?: string[];
  inStock: boolean;
}

export interface Category {
  id: string;
  name: { ar: string; fr: string };
  icon: string;
  color: string;
}

export interface Advertisement {
  id: string;
  image: string;
  title: { ar: string; fr: string };
  link?: string;
}

export interface Page {
  id: string;
  title: { ar: string; fr: string };
  slug: string;
  content: { ar: string; fr: string };
  isPublished: boolean;
  showInFooter: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface WilayaShipping {
  wilayaCode: string;
  wilayaName: string;
  homeDeliveryPrice: number;
  officeDeliveryPrice: number;
}

interface StoreSettings {
  storeName: { ar: string; fr: string };
  logo: string;
  contactPhone: string;
  contactWhatsApp: string;
  address: { ar: string; fr: string };
  primaryColor: string;
  secondaryColor: string;
  homeDeliveryPrice: number;
  officeDeliveryPrice: number;
  freeShippingThreshold: number; // Number of products for free shipping
}

interface StoreContextType {
  products: Product[];
  categories: Category[];
  advertisements: Advertisement[];
  pages: Page[];
  settings: StoreSettings;
  algerianCities: AlgerianCity[];
  wilayaShipping: WilayaShipping[];
  addProduct: (product: Product) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addCategory: (category: Category) => void;
  updateCategory: (id: string, category: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  addAdvertisement: (ad: Advertisement) => void;
  updateAdvertisement: (id: string, ad: Partial<Advertisement>) => void;
  deleteAdvertisement: (id: string) => void;
  addPage: (page: Omit<Page, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updatePage: (id: string, page: Partial<Page>) => void;
  deletePage: (id: string) => void;
  updateSettings: (settings: Partial<StoreSettings>) => void;
  updateWilayaShipping: (wilayaCode: string, shipping: Partial<WilayaShipping>) => void;
  getWilayaShipping: (wilayaCode: string) => WilayaShipping | undefined;
  getCommunesForWilaya: (wilayaCode: string) => string[];
}

const defaultSettings: StoreSettings = {
  storeName: { ar: 'GYM DADA STORE', fr: 'GYM DADA STORE' },
  logo: '/logo.png',
  contactPhone: '+213555123456',
  contactWhatsApp: '+213555123456',
  address: { ar: 'الجزائر العاصمة، الجزائر', fr: 'Alger, Algérie' },
  primaryColor: '#1e40af',
  secondaryColor: '#ea580c',
  homeDeliveryPrice: 400,
  officeDeliveryPrice: 200,
  freeShippingThreshold: 4,
};

const defaultPages: Page[] = [
  {
    id: '1',
    title: { ar: 'عن الموقع', fr: 'À propos' },
    slug: 'about',
    content: { 
      ar: 'نحن متجر متخصص في بيع المكملات الغذائية والمنتجات الرياضية عالية الجودة. نهدف إلى مساعدة عملائنا في تحقيق أهدافهم الرياضية والصحية.',
      fr: 'Nous sommes un magasin spécialisé dans la vente de compléments alimentaires et de produits sportifs de haute qualité. Nous visons à aider nos clients à atteindre leurs objectifs sportifs et de santé.'
    },
    isPublished: true,
    showInFooter: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    title: { ar: 'اتصل بنا', fr: 'Contactez-nous' },
    slug: 'contact',
    content: { 
      ar: 'يمكنكم التواصل معنا عبر الهاتف أو واتساب للاستفسار عن المنتجات أو للحصول على المساعدة.',
      fr: 'Vous pouvez nous contacter par téléphone ou WhatsApp pour vous renseigner sur les produits ou obtenir de l\'aide.'
    },
    isPublished: true,
    showInFooter: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '3',
    title: { ar: 'سياسة الخصوصية', fr: 'Politique de confidentialité' },
    slug: 'privacy',
    content: { 
      ar: 'نحن نحترم خصوصيتكم ونلتزم بحماية معلوماتكم الشخصية. لا نشارك معلوماتكم مع أطراف ثالثة دون موافقتكم.',
      fr: 'Nous respectons votre vie privée et nous nous engageons à protéger vos informations personnelles. Nous ne partageons pas vos informations avec des tiers sans votre consentement.'
    },
    isPublished: true,
    showInFooter: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '4',
    title: { ar: 'اتفاقية الموقع', fr: 'Conditions d\'utilisation' },
    slug: 'terms',
    content: { 
      ar: 'باستخدام موقعنا، فإنكم توافقون على الشروط والأحكام المذكورة. يرجى قراءة هذه الشروط بعناية قبل استخدام الموقع.',
      fr: 'En utilisant notre site, vous acceptez les termes et conditions mentionnés. Veuillez lire attentivement ces conditions avant d\'utiliser le site.'
    },
    isPublished: true,
    showInFooter: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const defaultCategories: Category[] = [
  {
    id: '1',
    name: { ar: 'البروتين', fr: 'Protéines' },
    icon: '💪',
    color: '#ef4444',
  },
  {
    id: '2',
    name: { ar: 'المكملات الغذائية', fr: 'Suppléments' },
    icon: '🧬',
    color: '#10b981',
  },
  {
    id: '3',
    name: { ar: 'الملابس الرياضية', fr: 'Vêtements' },
    icon: '🏃',
    color: '#8b5cf6',
  },
  {
    id: '4',
    name: { ar: 'الفيتامينات', fr: 'Vitamines' },
    icon: '⚡',
    color: '#f59e0b',
  },
];

const defaultProducts: Product[] = [
  {
    id: '1',
    name: { ar: 'واي بروتين جولد ستاندرد', fr: 'Whey Protein Gold Standard' },
    description: { ar: 'أفضل بروتين واي لبناء العضلات وزيادة القوة. منتج عالي الجودة من أفضل الماركات العالمية، يحتوي على جميع الأحماض الأمينية الأساسية', fr: 'Meilleure protéine whey pour la construction musculaire et l\'augmentation de la force. Produit de haute qualité des meilleures marques mondiales' },
    usage: { ar: 'خذ مغرفة واحدة مع 200 مل من الماء أو الحليب', fr: 'Prendre 1 dose avec 200ml d\'eau ou de lait' },
    price: 8500,
    oldPrice: 10000,
    image: 'https://images.pexels.com/photos/4162584/pexels-photo-4162584.jpeg?auto=compress&cs=tinysrgb&w=400',
    categoryId: '1',
    flavors: ['شوكولا', 'فانيلا', 'فراولة', 'موز'],
    sizes: ['1كغ', '2.5كغ', '5كغ'],
    inStock: true,
  },
  {
    id: '2',
    name: { ar: 'كرياتين مونوهيدرات', fr: 'Créatine Monohydrate' },
    description: { ar: 'كرياتين عالي الجودة لزيادة القوة والطاقة أثناء التمرين. يساعد على تحسين الأداء الرياضي وزيادة الكتلة العضلية', fr: 'Créatine de haute qualité pour plus de force et d\'énergie pendant l\'entraînement' },
    usage: { ar: 'خذ 5 جرام يومياً مع الماء', fr: 'Prendre 5g par jour avec de l\'eau' },
    price: 3500,
    image: 'https://images.pexels.com/photos/4162485/pexels-photo-4162485.jpeg?auto=compress&cs=tinysrgb&w=400',
    categoryId: '2',
    sizes: ['300جرام', '500جرام', '1كغ'],
    inStock: true,
  },
  {
    id: '3',
    name: { ar: 'تي شيرت تدريب رياضي', fr: 'T-shirt d\'entraînement' },
    description: { ar: 'تي شيرت مريح ومناسب للتدريب الرياضي، مصنوع من أقمشة عالية الجودة تمتص العرق وتوفر الراحة أثناء التمرين', fr: 'T-shirt confortable pour l\'entraînement, fabriqué avec des tissus de haute qualité' },
    usage: { ar: 'مناسب للتدريب اليومي والرياضة، يُنصح بغسله في ماء بارد', fr: 'Parfait pour l\'entraînement quotidien, lavage à l\'eau froide recommandé' },
    price: 2500,
    image: 'https://images.pexels.com/photos/8844892/pexels-photo-8844892.jpeg?auto=compress&cs=tinysrgb&w=400',
    categoryId: '3',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
  },
  {
    id: '4',
    name: { ar: 'فيتامين د3', fr: 'Vitamine D3' },
    description: { ar: 'فيتامين د3 عالي الجودة لتقوية العظام ودعم جهاز المناعة. ضروري للصحة العامة وامتصاص الكالسيوم', fr: 'Vitamine D3 de haute qualité pour renforcer les os et soutenir le système immunitaire' },
    usage: { ar: 'حبة واحدة يومياً مع الطعام', fr: 'Prendre 1 comprimé par jour avec un repas' },
    price: 1500,
    image: 'https://images.pexels.com/photos/3683107/pexels-photo-3683107.jpeg?auto=compress&cs=tinysrgb&w=400',
    categoryId: '4',
    sizes: ['60 كبسولة', '120 كبسولة'],
    inStock: true,
  },
  {
    id: '5',
    name: { ar: 'BCAA أحماض أمينية', fr: 'BCAA Acides Aminés' },
    description: { ar: 'مكمل الأحماض الأمينية المتفرعة السلسلة لتسريع الاستشفاء العضلي ومنع تكسر العضلات أثناء التمرين', fr: 'Supplément d\'acides aminés à chaîne ramifiée pour accélérer la récupération musculaire' },
    usage: { ar: 'خذ 10 جرام قبل أو أثناء أو بعد التمرين', fr: 'Prendre 10g avant, pendant ou après l\'entraînement' },
    price: 4200,
    oldPrice: 5000,
    image: 'https://images.pexels.com/photos/4162519/pexels-photo-4162519.jpeg?auto=compress&cs=tinysrgb&w=400',
    categoryId: '2',
    flavors: ['فواكه مشكلة', 'عنب', 'تفاح أخضر', 'برتقال'],
    sizes: ['300جرام', '500جرام'],
    inStock: true,
  },
  {
    id: '6',
    name: { ar: 'شورت رياضي للرجال', fr: 'Short de sport pour hommes' },
    description: { ar: 'شورت رياضي مريح للرجال، مصنوع من أقمشة مرنة وخفيفة الوزن، مثالي لجميع أنواع التمارين الرياضية', fr: 'Short de sport confortable pour hommes, fabriqué avec des tissus élastiques et légers' },
    usage: { ar: 'مناسب لجميع أنواع الرياضة والتمارين، يُنصح بغسله في ماء بارد', fr: 'Convient à tous les types de sports et d\'exercices' },
    price: 1800,
    image: 'https://images.pexels.com/photos/8844891/pexels-photo-8844891.jpeg?auto=compress&cs=tinysrgb&w=400',
    categoryId: '3',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
  },
];

const defaultAdvertisements: Advertisement[] = [
  {
    id: '1',
    image: 'https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=1200',
    title: { ar: 'خصم 30% على جميع البروتينات', fr: '30% de réduction sur toutes les protéines' },
  },
  {
    id: '2',
    image: 'https://images.pexels.com/photos/1552103/pexels-photo-1552103.jpeg?auto=compress&cs=tinysrgb&w=1200',
    title: { ar: 'مجموعة جديدة من الملابس الرياضية', fr: 'Nouvelle collection de vêtements de sport' },
  },
];

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(defaultProducts);
  const [categories, setCategories] = useState<Category[]>(defaultCategories);
  const [advertisements, setAdvertisements] = useState<Advertisement[]>(defaultAdvertisements);
  const [pages, setPages] = useState<Page[]>(defaultPages);
  const [settings, setSettings] = useState<StoreSettings>(defaultSettings);
  const [algerianCities, setAlgerianCities] = useState<AlgerianCity[]>([]);
  const [wilayaShipping, setWilayaShipping] = useState<WilayaShipping[]>([]);

  // Load Algerian cities data on component mount
  React.useEffect(() => {
    loadAlgerianCitiesData().then(cities => {
      setAlgerianCities(cities);
      
      // Initialize wilaya shipping with default prices
      const wilayas = getWilayasFromCSV(cities);
      const defaultShipping = wilayas.map(wilaya => ({
        wilayaCode: wilaya.code,
        wilayaName: wilaya.name,
        homeDeliveryPrice: settings.homeDeliveryPrice,
        officeDeliveryPrice: settings.officeDeliveryPrice
      }));
      setWilayaShipping(defaultShipping);
    });
  }, []);

  const addProduct = (product: Product) => {
    setProducts(prev => [...prev, product]);
  };

  const updateProduct = (id: string, productUpdate: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...productUpdate } : p));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const addCategory = (category: Category) => {
    setCategories(prev => [...prev, category]);
  };

  const updateCategory = (id: string, categoryUpdate: Partial<Category>) => {
    setCategories(prev => prev.map(c => c.id === id ? { ...c, ...categoryUpdate } : c));
  };

  const deleteCategory = (id: string) => {
    setCategories(prev => prev.filter(c => c.id !== id));
  };

  const addAdvertisement = (ad: Advertisement) => {
    setAdvertisements(prev => [...prev, ad]);
  };

  const updateAdvertisement = (id: string, adUpdate: Partial<Advertisement>) => {
    setAdvertisements(prev => prev.map(a => a.id === id ? { ...a, ...adUpdate } : a));
  };

  const deleteAdvertisement = (id: string) => {
    setAdvertisements(prev => prev.filter(a => a.id !== id));
  };

  const addPage = (pageData: Omit<Page, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newPage: Page = {
      ...pageData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setPages(prev => [...prev, newPage]);
  };

  const updatePage = (id: string, pageUpdate: Partial<Page>) => {
    setPages(prev => prev.map(p => 
      p.id === id 
        ? { ...p, ...pageUpdate, updatedAt: new Date() }
        : p
    ));
  };

  const deletePage = (id: string) => {
    setPages(prev => prev.filter(p => p.id !== id));
  };

  const updateSettings = (settingsUpdate: Partial<StoreSettings>) => {
    setSettings(prev => ({ ...prev, ...settingsUpdate }));
  };

  const updateWilayaShipping = (wilayaCode: string, shippingUpdate: Partial<WilayaShipping>) => {
    setWilayaShipping(prev => prev.map(w => 
      w.wilayaCode === wilayaCode 
        ? { ...w, ...shippingUpdate }
        : w
    ));
  };

  const getWilayaShipping = (wilayaCode: string): WilayaShipping | undefined => {
    return wilayaShipping.find(w => w.wilayaCode === wilayaCode);
  };

  const getCommunesForWilayaFunc = (wilayaCode: string): string[] => {
    return getCommunesForWilaya(algerianCities, wilayaCode);
  };

  return (
    <StoreContext.Provider value={{
      products,
      categories,
      advertisements,
      pages,
      settings,
      algerianCities,
      wilayaShipping,
      addProduct,
      updateProduct,
      deleteProduct,
      addCategory,
      updateCategory,
      deleteCategory,
      addAdvertisement,
      updateAdvertisement,
      deleteAdvertisement,
      addPage,
      updatePage,
      deletePage,
      updateSettings,
      updateWilayaShipping,
      getWilayaShipping,
      getCommunesForWilaya: getCommunesForWilayaFunc,
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};