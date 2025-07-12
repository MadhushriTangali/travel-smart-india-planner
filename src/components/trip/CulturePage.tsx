
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Calendar, Shirt, ArrowRight, Heart } from 'lucide-react';
import { TripData } from '@/components/TripPlanningForm';

interface CultureInfo {
  overview: string;
  dressing: string[];
  festivals: Array<{
    name: string;
    month: string;
    description: string;
  }>;
  traditions: string[];
  language: string;
  etiquette: string[];
}

interface CulturePageProps {
  tripData: TripData;
  onNext: () => void;
}

export const CulturePage = ({ tripData, onNext }: CulturePageProps) => {
  const [cultureInfo, setCultureInfo] = useState<CultureInfo | null>(null);
  const [loading, setLoading] = useState(true);

  const getCultureForCity = (city: string): CultureInfo => {
    const cityLower = city.toLowerCase();
    
    const cultureData: { [key: string]: CultureInfo } = {
      hyderabad: {
        overview: 'Hyderabad is a cultural melting pot known as the "City of Pearls" and "City of Nizams". The city beautifully blends Mughal, Persian, Turkish, and Arabic influences with South Indian traditions, creating a unique Deccan culture.',
        dressing: [
          'Traditional: Sherwanis and lehengas for festivals',
          'Daily wear: Light cotton clothing due to warm climate',
          'Business: Formal western attire in IT corridors',
          'Festivals: Silk sarees and traditional jewelry'
        ],
        festivals: [
          { name: 'Bonalu', month: 'July-August', description: 'Folk festival dedicated to Goddess Mahakali' },
          { name: 'Bathukamma', month: 'September-October', description: 'Floral festival celebrating feminine divinity' },
          { name: 'Ramadan & Eid', month: 'Varies', description: 'Major Islamic celebrations with grand festivities' }
        ],
        traditions: [
          'Greeting with "Adab" or "Namaste"',
          'Sharing Irani chai and Osmania biscuits',
          'Celebrating both Hindu and Islamic festivals',
          'Traditional Qawwali and classical music',
          'Pearl trading and jewelry craftsmanship'
        ],
        language: 'Telugu, Urdu, and Hindi are widely spoken. English is common in business areas.',
        etiquette: [
          'Respect both Hindu temples and Islamic monuments',
          'Dress modestly when visiting religious sites',
          'Try local Hyderabadi cuisine as a cultural experience',
          'Be mindful during prayer times near mosques',
          'Bargain respectfully in traditional markets like Laad Bazaar'
        ]
      },
      mumbai: {
        overview: 'Mumbai is India\'s financial capital and the "City of Dreams". It\'s a cosmopolitan metropolis where people from all over India come to pursue their aspirations, creating a vibrant multicultural environment.',
        dressing: [
          'Casual: Western wear is widely accepted',
          'Monsoon: Waterproof clothing essential during rains',
          'Business: Corporate formal attire in business districts',
          'Traditional: Ethnic wear during festivals like Ganesh Chaturthi'
        ],
        festivals: [
          { name: 'Ganesh Chaturthi', month: 'August-September', description: 'Grand celebration of Lord Ganesha with elaborate processions' },
          { name: 'Navratri', month: 'September-October', description: 'Nine nights of dance and devotion' },
          { name: 'Kala Ghoda Arts Festival', month: 'February', description: 'Celebration of arts, culture, and heritage' }
        ],
        traditions: [
          'Local train commuting culture and etiquette',
          'Street food exploration as social activity',
          'Bollywood film culture and celebrity worship',
          'Community celebrations in housing societies',
          'Late-night lifestyle and 24/7 city culture'
        ],
        language: 'Marathi is the local language, Hindi is widely spoken, English is common in business.',
        etiquette: [
          'Stand right on escalators, walk left',
          'Give priority seats to women and elderly in trains',
          'Don\'t photograph people without permission',
          'Tip service staff appropriately (10-15%)',
          'Be patient with traffic and crowds'
        ]
      },
      delhi: {
        overview: 'Delhi, the capital of India, is a city where ancient history meets modernity. From Red Fort to Connaught Place, it showcases 1000+ years of Indian history and serves as the political and cultural center.',
        dressing: [
          'Winter: Heavy woolens and jackets (December-February)',
          'Summer: Light cotton clothing (April-June)',
          'Traditional: Salwar kameez, kurtas for cultural events',
          'Formal: Business suits in corporate areas like Gurgaon'
        ],
        festivals: [
          { name: 'Diwali', month: 'October-November', description: 'Festival of lights celebrated grandly across the city' },
          { name: 'Dussehra', month: 'September-October', description: 'Victory of good over evil with Ramlila performances' },
          { name: 'Holi', month: 'March', description: 'Festival of colors celebrated with enthusiasm' }
        ],
        traditions: [
          'Street food culture in Old Delhi and Khan Market',
          'Sunday visits to India Gate and Lodhi Gardens',
          'Shopping in traditional markets like Chandni Chowk',
          'Classical music and dance performances',
          'Political consciousness and debate culture'
        ],
        language: 'Hindi is primary, Punjabi is common, English widely understood in New Delhi areas.',
        etiquette: [
          'Dress modestly when visiting Red Fort and Jama Masjid',
          'Remove shoes before entering temples and mosques',
          'Be prepared for security checks at monuments',
          'Bargain in Old Delhi markets but pay fixed prices in malls',
          'Respect traffic rules as they\'re strictly enforced'
        ]
      },
      goa: {
        overview: 'Goa is known for its laid-back coastal culture, Portuguese colonial heritage, and vibrant beach lifestyle. It perfectly blends Indian traditions with Portuguese influences, creating a unique Konkani culture.',
        dressing: [
          'Beach wear: Light, casual clothing and swimwear',
          'Evening: Smart casual for beach shacks and restaurants',
          'Church visits: Modest clothing covering shoulders and knees',
          'Festivals: Traditional Konkani attire and bright colors'
        ],
        festivals: [
          { name: 'Carnival', month: 'February-March', description: 'Portuguese-influenced celebration with parades and music' },
          { name: 'Shigmo', month: 'March', description: 'Goan version of Holi with traditional dances' },
          { name: 'Feast of St. Francis Xavier', month: 'December', description: 'Major Christian pilgrimage and celebration' }
        ],
        traditions: [
          'Siesta culture - afternoon rest during hot hours',
          'Feni drinking and cashew cultivation',
          'Beach shack culture with live music',
          'Catholic and Hindu festival celebrations',
          'Traditional fishing community customs'
        ],
        language: 'Konkani is local language, Portuguese influence remains, Hindi and English widely spoken.',
        etiquette: [
          'Respect beach cleanliness and local environment',
          'Dress appropriately when visiting churches',
          'Be mindful of local fishing activities on beaches',
          'Negotiate prices respectfully with taxi drivers',
          'Enjoy responsibly - Goa has relaxed alcohol laws but be sensible'
        ]
      }
    };

    return cultureData[cityLower] || {
      overview: `${city} has a rich cultural heritage that reflects the diverse traditions of India. The city showcases local customs, festivals, and lifestyle that have evolved over centuries.`,
      dressing: [
        'Traditional: Local ethnic wear during festivals',
        'Casual: Cotton clothing suitable for the climate',
        'Formal: Western attire in business areas',
        'Religious sites: Modest clothing covering shoulders and legs'
      ],
      festivals: [
        { name: 'Local Festival', month: 'Varies', description: 'Traditional celebration specific to the region' },
        { name: 'Diwali', month: 'October-November', description: 'Festival of lights celebrated across India' },
        { name: 'Holi', month: 'March', description: 'Festival of colors marking spring arrival' }
      ],
      traditions: [
        'Respect for elders and traditional values',
        'Community celebrations during festivals',
        'Local cuisine and food sharing customs',
        'Traditional art and craft practices',
        'Regional music and dance forms'
      ],
      language: 'Local regional language, Hindi widely understood, English in urban areas.',
      etiquette: [
        'Dress modestly when visiting religious places',
        'Remove shoes before entering temples and homes',
        'Use right hand for eating and greeting',
        'Ask permission before photographing people',
        'Respect local customs and traditions'
      ]
    };
  };

  useEffect(() => {
    const cityCulture = getCultureForCity(tripData.destination);

    setTimeout(() => {
      setCultureInfo(cityCulture);
      setLoading(false);
    }, 800);
  }, [tripData]);

  if (loading) {
    return (
      <Card className="shadow-xl border-t-4 border-t-orange-500">
        <CardHeader>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent">
            Learning about {tripData.destination} Culture...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 h-6 rounded mb-2"></div>
                <div className="bg-gray-200 h-4 rounded w-3/4 mb-4"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!cultureInfo) return null;

  return (
    <Card className="shadow-xl border-t-4 border-t-orange-500">
      <CardHeader className="bg-gradient-to-r from-orange-50 to-blue-50">
        <CardTitle className="flex items-center gap-2 text-2xl font-bold text-gray-800">
          <Heart className="h-6 w-6 text-orange-500" />
          Culture & Traditions of {tripData.destination}
        </CardTitle>
        <p className="text-gray-600 font-semibold">
          Understanding local culture enhances your travel experience
        </p>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        {/* Overview */}
        <Card className="border-2 border-orange-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl font-bold text-gray-800">
              <Users className="h-5 w-5 text-orange-500" />
              Cultural Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 font-medium leading-relaxed">{cultureInfo.overview}</p>
          </CardContent>
        </Card>

        {/* Festivals */}
        <Card className="border-2 border-blue-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl font-bold text-gray-800">
              <Calendar className="h-5 w-5 text-blue-500" />
              Popular Festivals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {cultureInfo.festivals.map((festival, index) => (
                <Card key={index} className="border-2 border-orange-200 hover:shadow-lg transition-all">
                  <CardContent className="p-4">
                    <h4 className="font-bold mb-2 text-gray-800">{festival.name}</h4>
                    <Badge className="mb-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold">{festival.month}</Badge>
                    <p className="text-sm text-gray-600 font-medium">{festival.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Dressing Style */}
        <Card className="border-2 border-purple-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl font-bold text-gray-800">
              <Shirt className="h-5 w-5 text-purple-500" />
              Dressing Style
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {cultureInfo.dressing.map((style, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                  <Badge variant="outline" className="mt-1 font-semibold">
                    {index + 1}
                  </Badge>
                  <p className="text-sm font-medium">{style}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Traditions */}
        <Card className="border-2 border-green-100">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-800">Local Traditions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {cultureInfo.traditions.map((tradition, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-gradient-to-r from-green-50 to-teal-50 rounded-lg">
                  <span className="text-green-500 font-bold text-lg">•</span>
                  <p className="text-sm font-medium">{tradition}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Language & Etiquette */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-2 border-indigo-100">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-800">Language</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700 font-medium leading-relaxed">{cultureInfo.language}</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-rose-100">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-800">Cultural Etiquette</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {cultureInfo.etiquette.map((rule, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <span className="text-rose-500 font-bold">•</span>
                    <p className="text-sm font-medium">{rule}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end mt-8">
          <Button onClick={onNext} className="bg-gradient-to-r from-orange-500 to-blue-600 hover:from-orange-600 hover:to-blue-700 text-white font-bold px-8 py-3 text-lg">
            Next: Transport Options
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
