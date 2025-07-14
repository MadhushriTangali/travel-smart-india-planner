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
    
    const cultureData: { [key: string]: CultureData } = {
      mumbai: {
        languages: ['Hindi', 'Marathi', 'English', 'Gujarati'],
        festivals: [
          { name: 'Ganesh Chaturthi', month: 'August/September', description: 'Grand celebration of Lord Ganesha with elaborate pandals' },
          { name: 'Navratri', month: 'September/October', description: 'Nine nights of dance and devotion to Goddess Durga' },
          { name: 'Gudi Padwa', month: 'March/April', description: 'Marathi New Year celebration' }
        ],
        traditions: [
          'Dabbawalas lunch delivery system',
          'Mumbai local train culture',
          'Bollywood film industry heritage',
          'Street food culture'
        ],
        etiquette: [
          'Stand on left side of escalators',
          'Give way to people getting off trains first',
          'Dress modestly when visiting religious places',
          'Bargaining is common in local markets'
        ],
        clothing: 'Cotton clothes recommended due to humidity. Western wear widely accepted.',
        art_forms: ['Warli painting', 'Bollywood dance', 'Theater (Marathi and Hindi)', 'Street art']
      },
      delhi: {
        languages: ['Hindi', 'Punjabi', 'Urdu', 'English'],
        festivals: [
          { name: 'Dussehra', month: 'September/October', description: 'Celebration of good over evil with Ramlila performances' },
          { name: 'Karva Chauth', month: 'October/November', description: 'Married women fast for husbands\' long life' },
          { name: 'Lohri', month: 'January', description: 'Punjabi harvest festival celebrated with bonfires' }
        ],
        traditions: [
          'Mughal architectural heritage',
          'Traditional Delhi 6 market culture',
          'Punjabi wedding celebrations',
          'Political and administrative center traditions'
        ],
        etiquette: [
          'Dress conservatively in religious places',
          'Remove shoes before entering temples and homes',
          'Use both hands when giving or receiving something',
          'Avoid pointing feet towards people or religious items'
        ],
        clothing: 'Layer clothing for extreme weather. Traditional wear appreciated during festivals.',
        art_forms: ['Kathak dance', 'Hindustani classical music', 'Urdu poetry', 'Miniature painting']
      },
      bangalore: {
        languages: ['Kannada', 'Tamil', 'Telugu', 'Hindi', 'English'],
        festivals: [
          { name: 'Karaga', month: 'March/April', description: 'Unique festival honoring Goddess Draupadi' },
          { name: 'Mysore Dasara', month: 'September/October', description: 'Grand celebration with royal processions' },
          { name: 'Ugadi', month: 'March/April', description: 'Telugu and Kannada New Year' }
        ],
        traditions: [
          'Garden city heritage with numerous parks',
          'IT hub modern work culture',
          'South Indian classical music and dance',
          'Coffee culture and filter coffee tradition'
        ],
        etiquette: [
          'Learning basic Kannada phrases is appreciated',
          'Respect for elders is very important',
          'Eat with right hand traditionally',
          'Dress modestly in traditional areas'
        ],
        clothing: 'Pleasant weather allows varied clothing. Cotton recommended during summers.',
        art_forms: ['Bharatanatyam', 'Carnatic music', 'Mysore painting', 'Sandalwood carving']
      },
      chennai: {
        languages: ['Tamil', 'Telugu', 'English', 'Hindi'],
        festivals: [
          { name: 'Tamil New Year', month: 'April', description: 'Celebration with traditional kolam and feast' },
          { name: 'Chennai Music Season', month: 'December/January', description: 'World\'s largest cultural festival of Indian classical music' },
          { name: 'Marina Beach Festival', month: 'January', description: 'Cultural festival on the famous beach' }
        ],
        traditions: [
          'Classical Tamil literature and poetry',
          'Traditional temple architecture',
          'Bharatanatyam dance heritage',
          'Temple festival processions'
        ],
        etiquette: [
          'Learning basic Tamil is highly appreciated',
          'Touch feet of elders to show respect',
          'Dress very modestly in temples',
          'Remove footwear before entering homes and temples'
        ],
        clothing: 'Light cotton clothes for hot humid weather. Traditional wear for temple visits.',
        art_forms: ['Bharatanatyam', 'Carnatic music', 'Tanjore painting', 'Bronze sculpture']
      },
      kolkata: {
        languages: ['Bengali', 'Hindi', 'English', 'Urdu'],
        festivals: [
          { name: 'Durga Puja', month: 'September/October', description: 'Grandest festival with elaborate pandals and cultural programs' },
          { name: 'Kali Puja', month: 'October/November', description: 'Worship of Goddess Kali with beautiful decorations' },
          { name: 'Poila Boishakh', month: 'April', description: 'Bengali New Year with cultural programs' }
        ],
        traditions: [
          'Intellectual and cultural capital heritage',
          'Adda (informal chatting) culture',
          'Traditional Bengali joint family system',
          'Rich literary and artistic traditions'
        ],
        etiquette: [
          'Greeting with "Namaskar" is appreciated',
          'Show respect for elders and scholars',
          'Participate in cultural discussions',
          'Dress modestly during religious occasions'
        ],
        clothing: 'Cotton clothes for humid weather. Traditional Bengali attire during festivals.',
        art_forms: ['Rabindra Sangeet', 'Bengali classical dance', 'Patachitra painting', 'Terracotta art']
      },
      jaipur: {
        languages: ['Hindi', 'Rajasthani', 'English'],
        festivals: [
          { name: 'Teej', month: 'July/August', description: 'Monsoon festival celebrated by women with swings and songs' },
          { name: 'Jaipur Literature Festival', month: 'January', description: 'World\'s largest free literary festival' },
          { name: 'Gangaur', month: 'March/April', description: 'Festival celebrating marital bliss and devotion' }
        ],
        traditions: [
          'Royal Rajput heritage and palace culture',
          'Traditional puppet shows (Kathputli)',
          'Block printing and textile crafts',
          'Camel and horse culture'
        ],
        etiquette: [
          'Greet with folded hands and "Namaste"',
          'Show respect to elders and traditional customs',
          'Dress conservatively, especially in rural areas',
          'Ask permission before photographing people'
        ],
        clothing: 'Light cotton for hot weather. Traditional Rajasthani attire appreciated during festivals.',
        art_forms: ['Kathak dance', 'Folk music', 'Blue pottery', 'Bandhani tie-dye']
      },
      goa: {
        languages: ['Konkani', 'Marathi', 'Hindi', 'English', 'Portuguese'],
        festivals: [
          { name: 'Carnival', month: 'February/March', description: 'Colorful street festival with parades and music' },
          { name: 'Shigmo', month: 'March', description: 'Spring festival with traditional folk dances' },
          { name: 'Feast of St. Francis Xavier', month: 'December', description: 'Christian festival honoring the patron saint' }
        ],
        traditions: [
          'Portuguese colonial heritage',
          'Susegad (relaxed) lifestyle',
          'Beach and sea-faring culture',
          'Fusion of Indian and Portuguese customs'
        ],
        etiquette: [
          'Relaxed and casual approach to life',
          'Respect for both Hindu and Christian traditions',
          'Beach etiquette - dress appropriately',
          'Environmental consciousness important'
        ],
        clothing: 'Casual beach wear acceptable. Light cotton clothes for tropical climate.',
        art_forms: ['Fado music influence', 'Traditional folk dances', 'Azulejo tiles', 'Contemporary art']
      }
    };

    return cultureData[cityLower] || {
      languages: ['Hindi', 'English', 'Local language'],
      festivals: [
        { name: 'Diwali', month: 'October/November', description: 'Festival of lights celebrated across India' },
        { name: 'Local Festival', month: 'Varies', description: 'Regional festival specific to the area' }
      ],
      traditions: [
        'Traditional Indian customs and practices',
        'Regional cultural heritage',
        'Local artisan crafts'
      ],
      etiquette: [
        'Greet with "Namaste" and folded hands',
        'Remove shoes before entering temples and homes',
        'Dress modestly in religious places',
        'Use right hand for eating and greeting'
      ],
      clothing: 'Modest clothing recommended. Traditional wear appreciated during festivals.',
      art_forms: ['Local folk music', 'Traditional crafts', 'Regional dance forms']
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