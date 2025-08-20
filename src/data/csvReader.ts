// CSV Reader utility for Algerian cities
export interface AlgerianCity {
  wilaya_code: string;
  wilaya_name: string;
  commune_name: string;
  daira_name: string;
}

export interface Wilaya {
  code: string;
  name: string;
  communes: string[];
}

// Function to parse CSV data
export const parseCSVData = (csvText: string): AlgerianCity[] => {
  const lines = csvText.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
  
  return lines.slice(1).map(line => {
    const values = line.split(',').map(v => v.trim().replace(/"/g, ''));
    return {
      wilaya_code: values[0],
      wilaya_name: values[1],
      commune_name: values[2],
      daira_name: values[3]
    };
  });
};

// Function to get unique wilayas from CSV data
export const getWilayasFromCSV = (cities: AlgerianCity[]): Wilaya[] => {
  const wilayaMap = new Map<string, Set<string>>();
  
  cities.forEach(city => {
    if (!wilayaMap.has(city.wilaya_code)) {
      wilayaMap.set(city.wilaya_code, new Set());
    }
    wilayaMap.get(city.wilaya_code)!.add(city.commune_name);
  });
  
  return Array.from(wilayaMap.entries()).map(([code, communes]) => {
    const wilayaName = cities.find(c => c.wilaya_code === code)?.wilaya_name || '';
    return {
      code,
      name: wilayaName,
      communes: Array.from(communes).sort()
    };
  }).sort((a, b) => parseInt(a.code) - parseInt(b.code));
};

// Function to get communes for a specific wilaya
export const getCommunesForWilaya = (cities: AlgerianCity[], wilayaCode: string): string[] => {
  return cities
    .filter(city => city.wilaya_code === wilayaCode)
    .map(city => city.commune_name)
    .filter((commune, index, arr) => arr.indexOf(commune) === index)
    .sort();
};

// Load CSV data from the file
export const loadAlgerianCitiesData = async (): Promise<AlgerianCity[]> => {
  try {
    const response = await fetch('/src/data/algeria_cities.csv');
    const csvText = await response.text();
    return parseCSVData(csvText);
  } catch (error) {
    console.error('Error loading Algerian cities data:', error);
    // Fallback data in case CSV loading fails
    return [
      { wilaya_code: '01', wilaya_name: 'أدرار', commune_name: 'أدرار', daira_name: 'أدرار' },
      { wilaya_code: '02', wilaya_name: 'الشلف', commune_name: 'الشلف', daira_name: 'الشلف' },
      { wilaya_code: '03', wilaya_name: 'الأغواط', commune_name: 'الأغواط', daira_name: 'الأغواط' },
      { wilaya_code: '04', wilaya_name: 'أم البواقي', commune_name: 'أم البواقي', daira_name: 'أم البواقي' },
      { wilaya_code: '05', wilaya_name: 'باتنة', commune_name: 'باتنة', daira_name: 'باتنة' },
      { wilaya_code: '06', wilaya_name: 'بجاية', commune_name: 'بجاية', daira_name: 'بجاية' },
      { wilaya_code: '07', wilaya_name: 'بسكرة', commune_name: 'بسكرة', daira_name: 'بسكرة' },
      { wilaya_code: '08', wilaya_name: 'بشار', commune_name: 'بشار', daira_name: 'بشار' },
      { wilaya_code: '09', wilaya_name: 'البليدة', commune_name: 'البليدة', daira_name: 'البليدة' },
      { wilaya_code: '10', wilaya_name: 'البويرة', commune_name: 'البويرة', daira_name: 'البويرة' },
      { wilaya_code: '11', wilaya_name: 'تمنراست', commune_name: 'تمنراست', daira_name: 'تمنراست' },
      { wilaya_code: '12', wilaya_name: 'تبسة', commune_name: 'تبسة', daira_name: 'تبسة' },
      { wilaya_code: '13', wilaya_name: 'تلمسان', commune_name: 'تلمسان', daira_name: 'تلمسان' },
      { wilaya_code: '14', wilaya_name: 'تيارت', commune_name: 'تيارت', daira_name: 'تيارت' },
      { wilaya_code: '15', wilaya_name: 'تيزي وزو', commune_name: 'تيزي وزو', daira_name: 'تيزي وزو' },
      { wilaya_code: '16', wilaya_name: 'الجزائر', commune_name: 'الجزائر الوسطى', daira_name: 'سيدي أمحمد' },
      { wilaya_code: '17', wilaya_name: 'الجلفة', commune_name: 'الجلفة', daira_name: 'الجلفة' },
      { wilaya_code: '18', wilaya_name: 'جيجل', commune_name: 'جيجل', daira_name: 'جيجل' },
      { wilaya_code: '19', wilaya_name: 'سطيف', commune_name: 'سطيف', daira_name: 'سطيف' },
      { wilaya_code: '20', wilaya_name: 'سعيدة', commune_name: 'سعيدة', daira_name: 'سعيدة' },
      { wilaya_code: '21', wilaya_name: 'سكيكدة', commune_name: 'سكيكدة', daira_name: 'سكيكدة' },
      { wilaya_code: '22', wilaya_name: 'سيدي بلعباس', commune_name: 'سيدي بلعباس', daira_name: 'سيدي بلعباس' },
      { wilaya_code: '23', wilaya_name: 'عنابة', commune_name: 'عنابة', daira_name: 'عنابة' },
      { wilaya_code: '24', wilaya_name: 'قالمة', commune_name: 'قالمة', daira_name: 'قالمة' },
      { wilaya_code: '25', wilaya_name: 'قسنطينة', commune_name: 'قسنطينة', daira_name: 'قسنطينة' },
      { wilaya_code: '26', wilaya_name: 'المدية', commune_name: 'المدية', daira_name: 'المدية' },
      { wilaya_code: '27', wilaya_name: 'مستغانم', commune_name: 'مستغانم', daira_name: 'مستغانم' },
      { wilaya_code: '28', wilaya_name: 'المسيلة', commune_name: 'المسيلة', daira_name: 'المسيلة' },
      { wilaya_code: '29', wilaya_name: 'معسكر', commune_name: 'معسكر', daira_name: 'معسكر' },
      { wilaya_code: '30', wilaya_name: 'ورقلة', commune_name: 'ورقلة', daira_name: 'ورقلة' },
      { wilaya_code: '31', wilaya_name: 'وهران', commune_name: 'وهران', daira_name: 'وهران' },
      { wilaya_code: '32', wilaya_name: 'البيض', commune_name: 'البيض', daira_name: 'البيض' },
      { wilaya_code: '33', wilaya_name: 'إليزي', commune_name: 'إليزي', daira_name: 'إليزي' },
      { wilaya_code: '34', wilaya_name: 'برج بوعريريج', commune_name: 'برج بوعريريج', daira_name: 'برج بوعريريج' },
      { wilaya_code: '35', wilaya_name: 'بومرداس', commune_name: 'بومرداس', daira_name: 'بومرداس' },
      { wilaya_code: '36', wilaya_name: 'الطارف', commune_name: 'الطارف', daira_name: 'الطارف' },
      { wilaya_code: '37', wilaya_name: 'تندوف', commune_name: 'تندوف', daira_name: 'تندوف' },
      { wilaya_code: '38', wilaya_name: 'تيسمسيلت', commune_name: 'تيسمسيلت', daira_name: 'تيسمسيلت' },
      { wilaya_code: '39', wilaya_name: 'الوادي', commune_name: 'الوادي', daira_name: 'الوادي' },
      { wilaya_code: '40', wilaya_name: 'خنشلة', commune_name: 'خنشلة', daira_name: 'خنشلة' },
      { wilaya_code: '41', wilaya_name: 'سوق أهراس', commune_name: 'سوق أهراس', daira_name: 'سوق أهراس' },
      { wilaya_code: '42', wilaya_name: 'تيبازة', commune_name: 'تيبازة', daira_name: 'تيبازة' },
      { wilaya_code: '43', wilaya_name: 'ميلة', commune_name: 'ميلة', daira_name: 'ميلة' },
      { wilaya_code: '44', wilaya_name: 'عين الدفلى', commune_name: 'عين الدفلى', daira_name: 'عين الدفلى' },
      { wilaya_code: '45', wilaya_name: 'النعامة', commune_name: 'النعامة', daira_name: 'النعامة' },
      { wilaya_code: '46', wilaya_name: 'عين تيموشنت', commune_name: 'عين تيموشنت', daira_name: 'عين تيموشنت' },
      { wilaya_code: '47', wilaya_name: 'غرداية', commune_name: 'غرداية', daira_name: 'غرداية' },
      { wilaya_code: '48', wilaya_name: 'غليزان', commune_name: 'غليزان', daira_name: 'غليزان' }
    ];
  }
};