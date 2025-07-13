import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { TripData } from '@/components/TripPlanningForm';
import { Badge } from '@/components/ui/badge';

interface Festival {
  name: string;
  month: string;
  description: string;
}

interface CultureData {
  languages: string[];
  festivals: Festival[];
  traditions: string[];
  etiquette: string[];
  clothing: string;
  art_forms: string[];
}

interface CulturePageProps {
  tripData: TripData;
  onNext: () => void;
}

export const CulturePage = ({ tripData, onNext }: CulturePageProps) => {
  const [cultureData, setCultureData] = useState<CultureData | null>(null);
  const [loading, setLoading] = useState(true);

  const getCultureForCity = (city: string): CultureData => {
    const cityLower = city.toLowerCase();
    
    const cultureInfo: { [key: string]: CultureData } = {
      hyderabad: {
        languages: ['Telugu', 'Urdu', 'Hindi', 'English'],
        festivals: [
          { name: 'Bathukamma', month: 'September/October', description: 'Floral festival of Telangana' },
          { name: 'Bonalu', month: 'June/July', description: 'Goddess Mahakali festival' },
          { name: 'Diwali', month: 'October/November', description: 'Festival of lights' },
          { name: 'Eid ul-Fitr', month: 'Variable', description: 'Islamic festival' }
        ],
        traditions: [
          'Deccani Tehzeeb (culture)',
          'Hyderabadi cuisine',
          'Nizami architecture',
          'Telugu and Urdu literature'
        ],
        etiquette: [
          'Respect elders',
          'Remove shoes before entering homes',
          'Use right hand for eating',
          'Dress modestly in religious places'
        ],
        clothing: 'Sarees, salwar kameez, sherwani, kurta pajama',
        art_forms: ['Bidri art', 'Lac bangles', 'Kuchipudi dance', 'Deccani painting']
      },
      chennai: {
        languages: ['Tamil', 'English'],
        festivals: [
          { name: 'Pongal', month: 'January', description: 'Harvest festival' },
          { name: 'Tamil New Year', month: 'April', description: 'Tamil New Year' },
          { name: 'Diwali', month: 'October/November', description: 'Festival of lights' },
          { name: 'Navratri', month: 'September/October', description: 'Nine nights of goddess worship' }
        ],
        traditions: [
          'Carnatic music',
          'Bharatanatyam dance',
          'Tamil literature',
          'Temple architecture'
        ],
        etiquette: [
          'Respect elders',
          'Remove shoes before entering homes',
          'Dress modestly in temples',
          'Use right hand for eating'
        ],
        clothing: 'Sarees, salwar kameez, dhotis, shirts',
        art_forms: ['Bharatanatyam', 'Carnatic music', 'Kolam art', 'Tamil literature']
      },
      pune: {
        languages: ['Marathi', 'Hindi', 'English'],
        festivals: [
          { name: 'Ganesh Chaturthi', month: 'August/September', description: 'Lord Ganesha festival' },
          { name: 'Diwali', month: 'October/November', description: 'Festival of lights' },
          { name: 'Holi', month: 'March', description: 'Festival of colors' },
          { name: 'Gudi Padwa', month: 'March/April', description: 'Marathi New Year' }
        ],
        traditions: [
          'Marathi literature',
          'Lavani dance',
          'Warkari tradition',
          'Maratha history'
        ],
        etiquette: [
          'Respect elders',
          'Remove shoes before entering homes',
          'Greet with "Namaste"',
          'Dress modestly in temples'
        ],
        clothing: 'Sarees, salwar kameez, kurta pajama, dhoti',
        art_forms: ['Lavani', 'Marathi literature', 'Warli painting', 'Powada singing']
      },
      jaipur: {
        languages: ['Hindi', 'Rajasthani', 'English'],
        festivals: [
          { name: 'Diwali', month: 'October/November', description: 'Festival of lights' },
          { name: 'Holi', month: 'March', description: 'Festival of colors' },
          { name: 'Teej', month: 'July/August', description: 'Festival for married women' },
          { name: 'Gangaur', month: 'March/April', description: 'Festival of Goddess Gauri' }
        ],
        traditions: [
          'Rajputana culture',
          'Rajasthani folk music and dance',
          'Handicrafts and textiles',
          'Royal cuisine'
        ],
        etiquette: [
          'Respect elders',
          'Dress modestly in religious places',
          'Remove shoes before entering homes',
          'Greet with "Namaste"'
        ],
        clothing: 'Sarees, lehenga choli, dhoti kurta, safa',
        art_forms: ['Miniature painting', 'Block printing', 'Bandhani tie-dye', 'Rajasthani folk music']
      },
      ahmedabad: {
        languages: ['Gujarati', 'Hindi', 'English'],
        festivals: [
          { name: 'Navratri', month: 'September/October', description: 'Nine nights of dance and worship' },
          { name: 'Diwali', month: 'October/November', description: 'Festival of lights' },
          { name: 'Uttarayan', month: 'January', description: 'Kite flying festival' },
          { name: 'Holi', month: 'March', description: 'Festival of colors' }
        ],
        traditions: [
          'Gujarati cuisine',
          'Garba and Dandiya dance',
          'Textile industry',
          'Jainism influence'
        ],
        etiquette: [
          'Remove shoes before entering homes',
          'Greet with "Kem chho"',
          'Respect vegetarianism',
          'Dress modestly in religious places'
        ],
        clothing: 'Sarees, salwar kameez, kurta pajama, dhoti',
        art_forms: ['Bandhani tie-dye', 'Patola silk', 'Garba dance', 'Gujarati literature']
      },
      kochi: {
        languages: ['Malayalam', 'English'],
        festivals: [
          { name: 'Onam', month: 'August/September', description: 'Harvest festival' },
          { name: 'Vishu', month: 'April', description: 'Malayalam New Year' },
          { name: 'Christmas', month: 'December', description: 'Christian festival' },
          { name: 'Diwali', month: 'October/November', description: 'Festival of lights' }
        ],
        traditions: [
          'Kathakali dance',
          'Ayurveda',
          'Backwater tourism',
          'Spice trade'
        ],
        etiquette: [
          'Remove shoes before entering homes',
          'Dress modestly in religious places',
          'Respect elders',
          'Use right hand for eating'
        ],
        clothing: 'Sarees, mundu, shirts, trousers',
        art_forms: ['Kathakali', 'Theyyam', 'Mohiniyattam', 'Kerala mural painting']
      },
      thiruvananthapuram: {
        languages: ['Malayalam', 'English'],
        festivals: [
          { name: 'Onam', month: 'August/September', description: 'Harvest festival' },
          { name: 'Aattukal Pongala', month: 'February/March', description: 'Women\'s festival at Attukal Temple' },
          { name: 'Vishu', month: 'April', description: 'Malayalam New Year' },
          { name: 'Christmas', month: 'December', description: 'Christian festival' }
        ],
        traditions: [
          'Kathakali dance',
          'Ayurveda',
          'Beach tourism',
          'Nair community traditions'
        ],
        etiquette: [
          'Remove shoes before entering homes',
          'Dress modestly in temples',
          'Respect elders',
          'Use right hand for eating'
        ],
        clothing: 'Sarees, mundu, shirts, trousers',
        art_forms: ['Kathakali', 'Mohiniyattam', 'Kerala mural painting', 'Theyyam']
      },
      lucknow: {
        languages: ['Hindi', 'Urdu', 'English'],
        festivals: [
          { name: 'Eid ul-Fitr', month: 'Variable', description: 'Islamic festival' },
          { name: 'Muharram', month: 'Variable', description: 'Islamic mourning period' },
          { name: 'Diwali', month: 'October/November', description: 'Festival of lights' },
          { name: 'Holi', month: 'March', description: 'Festival of colors' }
        ],
        traditions: [
          'Tehzeeb (etiquette)',
          'Urdu poetry',
          'Awadhi cuisine',
          'Chikankari embroidery'
        ],
        etiquette: [
          'Respect elders',
          'Greet with "Adaab"',
          'Speak softly and politely',
          'Dress modestly in religious places'
        ],
        clothing: 'Sherwani, kurta pajama, sarees, salwar kameez',
        art_forms: ['Chikankari', 'Kathak dance', 'Urdu poetry', 'Awadhi cuisine']
      },
      bhopal: {
        languages: ['Hindi', 'Urdu', 'English'],
        festivals: [
          { name: 'Eid ul-Fitr', month: 'Variable', description: 'Islamic festival' },
          { name: 'Diwali', month: 'October/November', description: 'Festival of lights' },
          { name: 'Holi', month: 'March', description: 'Festival of colors' },
          { name: 'Ijtima', month: 'November', description: 'Islamic congregation' }
        ],
        traditions: [
          'Islamic culture',
          'Urdu poetry',
          'Bhopali cuisine',
          'Lake culture'
        ],
        etiquette: [
          'Respect elders',
          'Greet with "Adaab"',
          'Speak softly and politely',
          'Dress modestly in religious places'
        ],
        clothing: 'Sherwani, kurta pajama, sarees, salwar kameez',
        art_forms: ['Urdu poetry', 'Islamic calligraphy', 'Zardozi embroidery', 'Bhopali cuisine']
      },
      chandigarh: {
        languages: ['Hindi', 'Punjabi', 'English'],
        festivals: [
          { name: 'Baisakhi', month: 'April', description: 'Punjabi New Year and harvest festival' },
          { name: 'Karva Chauth', month: 'October/November', description: 'Festival for married women' },
          { name: 'Diwali', month: 'October/November', description: 'Festival of lights' },
          { name: 'Holi', month: 'March', description: 'Festival of colors' }
        ],
        traditions: [
          'Bhangra and Gidda folk dances',
          'Punjabi wedding ceremonies with multiple rituals',
          'Gurudwara langar (community kitchen) tradition',
          'Traditional Punjabi music and instruments like dhol'
        ],
        etiquette: [
          'Remove shoes before entering homes and religious places',
          'Cover head when visiting Gurudwaras',
          'Use both hands when giving or receiving items',
          'Respect for elders is paramount in Punjabi culture'
        ],
        clothing: 'Traditional Punjabi suits for women, kurta-pajama for men, turbans for Sikh men',
        art_forms: ['Phulkari embroidery', 'Wood carving', 'Punjabi folk music', 'Traditional pottery']
      },
      indore: {
        languages: ['Hindi', 'Malvi', 'English'],
        festivals: [
          { name: 'Navratri', month: 'September/October', description: 'Nine-day festival dedicated to Goddess Durga' },
          { name: 'Diwali', month: 'October/November', description: 'Festival of lights' },
          { name: 'Ganesh Chaturthi', month: 'August/September', description: 'Festival celebrating Lord Ganesha' },
          { name: 'Makar Sankranti', month: 'January', description: 'Kite flying festival' }
        ],
        traditions: [
          'Night food culture at Sarafa Bazaar',
          'Traditional Malwa folk songs and dances',
          'Joint family system and respect for elders',
          'Business community traditions and values'
        ],
        etiquette: [
          'Touch feet of elders as a sign of respect',
          'Remove shoes before entering homes',
          'Offer water to guests immediately upon arrival',
          'Use right hand for eating and giving items'
        ],
        clothing: 'Sarees and salwar kameez for women, kurta-dhoti or shirt-pant for men',
        art_forms: ['Malwa painting', 'Folk music', 'Traditional crafts', 'Batik printing']
      },
      nagpur: {
        languages: ['Marathi', 'Hindi', 'English'],
        festivals: [
          { name: 'Ganesh Chaturthi', month: 'August/September', description: 'Grand celebration of Lord Ganesha' },
          { name: 'Navratri', month: 'September/October', description: 'Nine nights of goddess worship' },
          { name: 'Gudi Padwa', month: 'March/April', description: 'Marathi New Year' },
          { name: 'Diwali', month: 'October/November', description: 'Festival of lights' }
        ],
        traditions: [
          'Saoji cuisine culture with extremely spicy food',
          'Traditional Marathi folk dances like Lavani',
          'Orange cultivation and marketing traditions',
          'Vidarbha cultural heritage and customs'
        ],
        etiquette: [
          'Greet with "Namaskar" with folded hands',
          'Respect for elders and touching their feet',
          'Remove footwear before entering homes',
          'Offer food and water to guests'
        ],
        clothing: 'Nauvari saree for women, kurta-pajama or dhoti for men',
        art_forms: ['Warli painting', 'Traditional Marathi music', 'Folk dances', 'Handloom weaving']
      },
      vadodara: {
        languages: ['Gujarati', 'Hindi', 'English'],
        festivals: [
          { name: 'Navratri', month: 'September/October', description: 'Nine nights of dance and devotion to Goddess Durga' },
          { name: 'Diwali', month: 'October/November', description: 'Festival of lights with elaborate decorations' },
          { name: 'Makar Sankranti', month: 'January', description: 'Kite flying festival' },
          { name: 'Janmashtami', month: 'August/September', description: 'Lord Krishna\'s birthday celebration' }
        ],
        traditions: [
          'Garba and Dandiya Raas during Navratri',
          'Vegetarian food culture and Jain influence',
          'Business community values and entrepreneurship',
          'Traditional joint family system'
        ],
        etiquette: [
          'Remove shoes before entering homes and temples',
          'Greet with "Namaste" or "Kem cho"',
          'Respect for vegetarian dietary preferences',
          'Touch feet of elders as blessing'
        ],
        clothing: 'Chaniya choli during festivals, sarees and salwar kameez regularly for women',
        art_forms: ['Traditional Gujarati embroidery', 'Bandhani tie-dye', 'Folk music', 'Classical dance forms']
      },
      agra: {
        languages: ['Hindi', 'Urdu', 'English'],
        festivals: [
          { name: 'Taj Mahotsav', month: 'February', description: 'Cultural festival celebrating Mughal heritage' },
          { name: 'Diwali', month: 'October/November', description: 'Festival of lights' },
          { name: 'Eid ul-Fitr', month: 'Variable', description: 'Islamic festival marking end of Ramadan' },
          { name: 'Ram Navami', month: 'March/April', description: 'Birth of Lord Rama' }
        ],
        traditions: [
          'Mughal architectural appreciation and heritage',
          'Urdu poetry and ghazal culture',
          'Traditional crafts like marble inlay work',
          'Hindu-Muslim cultural synthesis'
        ],
        etiquette: [
          'Dress modestly when visiting religious sites',
          'Remove shoes before entering tombs and mosques',
          'Respect photography restrictions at monuments',
          'Bargaining is expected in local markets'
        ],
        clothing: 'Traditional Indian wear preferred at religious sites, modest western wear acceptable',
        art_forms: ['Marble inlay work (Pietra Dura)', 'Carpet weaving', 'Leather crafts', 'Urdu calligraphy']
      },
      varanasi: {
        languages: ['Hindi', 'Bhojpuri', 'Sanskrit', 'English'],
        festivals: [
          { name: 'Dev Deepawali', month: 'November', description: 'Festival of lights on Ganga ghats' },
          { name: 'Mahashivratri', month: 'February/March', description: 'Great night of Lord Shiva' },
          { name: 'Ganga Aarti', month: 'Daily', description: 'Daily evening prayer ceremony at Dashashwamedh Ghat' },
          { name: 'Buddha Purnima', month: 'May', description: 'Buddha\'s birthday celebration' }
        ],
        traditions: [
          'Daily Ganga Aarti and spiritual rituals',
          'Classical music and dance traditions',
          'Ancient Gurukul education system',
          'Pilgrimage and spiritual tourism'
        ],
        etiquette: [
          'Maintain silence during prayers and ceremonies',
          'Do not point feet towards deities or sacred spaces',
          'Photography may be restricted in some areas',
          'Respect the sanctity of cremation ghats'
        ],
        clothing: 'Traditional Indian attire preferred, especially whites and light colors',
        art_forms: ['Classical Hindustani music', 'Kathak dance', 'Banarasi silk weaving', 'Sanskrit literature']
      },
      amritsar: {
        languages: ['Punjabi', 'Hindi', 'English'],
        festivals: [
          { name: 'Baisakhi', month: 'April', description: 'Sikh New Year and formation of Khalsa' },
          { name: 'Guru Nanak Jayanti', month: 'November', description: 'Birth anniversary of Guru Nanak Dev Ji' },
          { name: 'Diwali (Bandi Chhor Divas)', month: 'October/November', description: 'Sikh festival of freedom' },
          { name: 'Hola Mohalla', month: 'March', description: 'Sikh martial arts festival' }
        ],
        traditions: [
          'Langar (community kitchen) service at Golden Temple',
          'Kirtan (devotional music) and daily prayers',
          'Seva (selfless service) culture',
          'Martial arts and physical fitness traditions'
        ],
        etiquette: [
          'Cover head and remove shoes at Golden Temple',
          'Wash hands and feet before entering temple complex',
          'Maintain respectful behavior during prayers',
          'Participate in langar with respect and gratitude'
        ],
        clothing: 'Head covering mandatory at religious sites, modest traditional wear preferred',
        art_forms: ['Sikh devotional music', 'Punjabi folk dances', 'Traditional Punjabi crafts', 'Gatka martial arts']
      }
    };

    return cultureInfo[cityLower] || {
      languages: ['Hindi', 'English', 'Local Language'],
      festivals: [
        { name: 'Diwali', month: 'October/November', description: 'Festival of lights' },
        { name: 'Holi', month: 'March', description: 'Festival of colors' },
        { name: 'Local Festival', month: 'Various', description: 'Regional celebration' }
      ],
      traditions: [
        'Local folk traditions and customs',
        'Traditional music and dance forms',
        'Regional cuisine and cooking methods',
        'Community festivals and celebrations'
      ],
      etiquette: [
        'Respect for elders and traditional values',
        'Remove shoes before entering homes',
        'Greet with traditional salutations',
        'Modest dress code in religious places'
      ],
      clothing: 'Traditional regional attire with modern influences',
      art_forms: ['Local folk art', 'Traditional crafts', 'Regional music', 'Dance forms']
    };
  };

  useEffect(() => {
    const culture = getCultureForCity(tripData.destination);
    
    setTimeout(() => {
      setCultureData(culture);
      setLoading(false);
    }, 1000);
  }, [tripData]);

  const handleNext = () => {
    console.log('Culture information viewed for:', tripData.destination);
    onNext();
  };

  if (loading) {
    return (
      <Card className="shadow-xl border-t-4 border-t-orange-500">
        <CardHeader>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent">
            Exploring Culture of {tripData.destination}...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 h-4 rounded mb-2"></div>
                <div className="bg-gray-200 h-4 rounded w-3/4"></div>
                <div className="bg-gray-200 h-4 rounded mt-2"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-xl border-t-4 border-t-orange-500">
      <CardHeader className="bg-gradient-to-r from-orange-50 to-blue-50">
        <CardTitle className="text-2xl font-bold text-gray-800">
          Culture and Traditions of {tripData.destination}
        </CardTitle>
        <p className="text-gray-600 font-semibold">
          Discover the cultural richness of {tripData.destination}
        </p>
      </CardHeader>
      <CardContent className="p-6">
        {cultureData && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Languages Spoken</h3>
              <p className="text-gray-700">{cultureData.languages.join(', ')}</p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Major Festivals</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {cultureData.festivals.map((festival, index) => (
                  <div key={index} className="p-4 bg-white rounded-lg shadow-md">
                    <h4 className="font-semibold text-gray-800">{festival.name}</h4>
                    <p className="text-gray-600">{festival.month}: {festival.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Traditions</h3>
              <ul className="list-disc list-inside text-gray-700">
                {cultureData.traditions.map((tradition, index) => (
                  <li key={index}>{tradition}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Etiquette</h3>
              <ul className="list-disc list-inside text-gray-700">
                {cultureData.etiquette.map((etiquette, index) => (
                  <li key={index}>{etiquette}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Clothing</h3>
              <p className="text-gray-700">{cultureData.clothing}</p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Art Forms</h3>
              <div className="flex flex-wrap gap-2">
                {cultureData.art_forms.map((art, index) => (
                  <Badge key={index} variant="secondary">
                    {art}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end mt-8">
          <Button onClick={handleNext} className="bg-gradient-to-r from-orange-500 to-blue-600 hover:from-orange-600 hover:to-blue-700 text-white font-bold px-8 py-3 text-lg">
            Next: Transportation
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
