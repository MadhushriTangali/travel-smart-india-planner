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
      chennai: {
        overview: 'Chennai is the cultural capital of South India, known for classical Carnatic music, Bharatanatyam dance, and Tamil literature. The city perfectly blends ancient Tamil traditions with modern cosmopolitan lifestyle.',
        dressing: [
          'Traditional: Silk sarees and veshtis for cultural events',
          'Daily wear: Light cotton clothing due to humid climate',
          'Business: Formal western attire in IT corridors',
          'Festivals: Kanchipuram silk sarees and traditional jewelry'
        ],
        festivals: [
          { name: 'Pongal', month: 'January', description: 'Tamil harvest festival celebrating nature and agriculture' },
          { name: 'Navaratri', month: 'September-October', description: 'Nine nights of classical music and dance performances' },
          { name: 'Chennai Music Season', month: 'December-January', description: 'World\'s largest cultural festival of Indian classical music' }
        ],
        traditions: [
          'Classical Carnatic music concerts and sabhas',
          'Traditional Bharatanatyam dance performances',
          'Filter coffee culture and evening beach walks',
          'Kolam (rangoli) art drawn at house entrances',
          'Temple visits and religious processions'
        ],
        language: 'Tamil is the primary language, English widely spoken in business areas, Hindi understood.',
        etiquette: [
          'Remove shoes before entering temples and homes',
          'Dress modestly when visiting religious places',
          'Respect classical music venues with silence during performances',
          'Try authentic South Indian breakfast at local eateries',
          'Be mindful of Tamil pride and cultural sensitivities'
        ]
      },
      pune: {
        overview: 'Pune is known as the "Oxford of the East" and cultural capital of Maharashtra. The city has a rich Maratha heritage and is famous for its educational institutions, IT industry, and vibrant youth culture.',
        dressing: [
          'Traditional: Nauvari sarees and dhoti-kurta for festivals',
          'Daily wear: Casual western and Indo-western attire',
          'Business: Corporate formal wear in IT hubs',
          'Monsoon: Light rain gear during heavy rains'
        ],
        festivals: [
          { name: 'Ganesh Chaturthi', month: 'August-September', description: 'Grand celebration with elaborate Ganpati processions' },
          { name: 'Gudi Padwa', month: 'March-April', description: 'Marathi New Year with traditional decorations' },
          { name: 'Sawai Gandharva Music Festival', month: 'December', description: 'Classical music festival honoring great musicians' }
        ],
        traditions: [
          'Marathi theater and cultural programs',
          'Traditional bhajan-kirtan singing',
          'Visiting ashrams and spiritual centers',
          'Celebrating Maratha warrior heritage',
          'Educational excellence and student culture'
        ],
        language: 'Marathi is the local language, Hindi and English widely spoken, especially in IT areas.',
        etiquette: [
          'Respect Marathi culture and language',
          'Be mindful during Ganesh festival processions',
          'Dress appropriately when visiting spiritual centers',
          'Try local Maharashtrian cuisine',
          'Be courteous in educational and IT environments'
        ]
      },
      jaipur: {
        overview: 'Jaipur, the "Pink City," is the capital of Rajasthan and epitomizes royal Rajasthani culture. Known for magnificent palaces, vibrant traditions, handicrafts, and hospitality.',
        dressing: [
          'Traditional: Colorful lehengas, bandhani sarees, and pagris',
          'Royal occasions: Heavy silk with traditional jewelry',
          'Desert climate: Light cotton during day, warm clothes in winter',
          'Festivals: Bright colors reflecting Rajasthani vibrancy'
        ],
        festivals: [
          { name: 'Teej', month: 'July-August', description: 'Monsoon festival celebrating marital bliss' },
          { name: 'Diwali', month: 'October-November', description: 'Festival of lights celebrated with great grandeur' },
          { name: 'Jaipur Literature Festival', month: 'January', description: 'World\'s largest free literary festival' }
        ],
        traditions: [
          'Royal hospitality and "Padharo Mhare Desh" welcome',
          'Traditional folk music and Kalbeliya dance',
          'Handicrafts including block printing and jewelry making',
          'Puppet shows (Kathputli) and folk storytelling',
          'Camel rides and desert cultural experiences'
        ],
        language: 'Hindi and Rajasthani dialects, English in tourist areas, Marwari widely spoken.',
        etiquette: [
          'Dress modestly, especially at religious places',
          'Bargain respectfully in traditional markets',
          'Respect royal heritage and monuments',
          'Try traditional Rajasthani thali',
          'Be mindful of desert climate and stay hydrated'
        ]
      },
      ahmedabad: {
        overview: 'Ahmedabad is Gujarat\'s commercial capital with rich textile heritage and Gandhian philosophy. The city blends traditional Gujarati culture with modern business sensibilities.',
        dressing: [
          'Traditional: Chaniya choli for women, kurta-dhoti for men',
          'Business: Formal attire in commercial districts',
          'Festivals: Bright colors during Navratri celebrations',
          'Daily wear: Conservative clothing respecting local customs'
        ],
        festivals: [
          { name: 'Navratri', month: 'September-October', description: 'Nine nights of garba and dandiya dancing' },
          { name: 'Uttarayan', month: 'January', description: 'International kite festival with colorful skies' },
          { name: 'Gandhi Jayanti', month: 'October', description: 'Mahatma Gandhi\'s birthday celebrated at Sabarmati Ashram' }
        ],
        traditions: [
          'Gujarati thali dining tradition',
          'Joint family system and business community values',
          'Garba and dandiya raas folk dances',
          'Textile and handicraft production',
          'Jain and Hindu religious practices'
        ],
        language: 'Gujarati is primary language, Hindi widely understood, English in business.',
        etiquette: [
          'Respect vegetarian food culture',
          'Dress conservatively, especially during religious festivals',
          'Participate respectfully in garba celebrations',
          'Visit Sabarmati Ashram with reverence',
          'Be mindful of dry state alcohol policies'
        ]
      },
      kochi: {
        overview: 'Kochi (Cochin) is Kerala\'s commercial capital known as the "Queen of the Arabian Sea." The city showcases a unique blend of Indian, Portuguese, Dutch, and British influences.',
        dressing: [
          'Traditional: Kerala sarees (set mundu) and kasavu borders',
          'Coastal climate: Light cotton and linen clothing',
          'Monsoon: Waterproof clothing during heavy rains',
          'Business: Formal wear in marine trade and IT sectors'
        ],
        festivals: [
          { name: 'Onam', month: 'August-September', description: 'Kerala\'s harvest festival with boat races and cultural programs' },
          { name: 'Cochin Carnival', month: 'December-January', description: 'New Year celebration with Portuguese influence' },
          { name: 'Ernakulam Shiva Ratri', month: 'February-March', description: 'Grand temple festival with elephants and music' }
        ],
        traditions: [
          'Kathakali and Mohiniyattam classical dance forms',
          'Traditional Ayurvedic medicine and treatments',
          'Coconut-based cuisine and spice trading',
          'Chinese fishing nets and fishing community culture',
          'Backwater cruises and houseboat experiences'
        ],
        language: 'Malayalam is the local language, English widely spoken in business, Hindi understood.',
        etiquette: [
          'Respect local Christian, Hindu, and Muslim communities',
          'Dress modestly when visiting churches and temples',
          'Try authentic Kerala cuisine with banana leaf serving',
          'Be mindful of monsoon season travel plans',
          'Respect fishing community activities at beaches'
        ]
      },
      thiruvananthapuram: {
        overview: 'Thiruvananthapuram (Trivandrum) is Kerala\'s capital city, known for its rich cultural heritage, classical arts, and being the center of Kerala\'s academic and cultural activities.',
        dressing: [
          'Traditional: White mundu with gold border, kasavu sarees',
          'Formal: Business attire for government and IT sectors',
          'Temple visits: Conservative traditional clothing',
          'Coastal weather: Light cotton suitable for humidity'
        ],
        festivals: [
          { name: 'Attukal Pongala', month: 'February-March', description: 'Women\'s festival with millions of participants cooking rice' },
          { name: 'Navaratri at Padmanabhaswamy', month: 'September-October', description: 'Grand classical music and dance festival' },
          { name: 'Onam', month: 'August-September', description: 'State festival celebrated with traditional fervor' }
        ],
        traditions: [
          'Classical Carnatic music and temple concerts',
          'Traditional Kerala architecture with wooden houses',
          'Ayurvedic treatments and wellness practices',
          'Government administrative culture',
          'Academic excellence and research institutions'
        ],
        language: 'Malayalam primary language, English in government offices, Tamil understood due to proximity.',
        etiquette: [
          'Dress very conservatively for Padmanabhaswamy Temple',
          'Respect government protocols in capital city',
          'Participate respectfully in cultural programs',
          'Try traditional sadya (feast) during festivals',
          'Be mindful of academic and cultural sensitivities'
        ]
      },
      lucknow: {
        overview: 'Lucknow, the "City of Nawabs," is renowned for its refined culture, Urdu poetry, classical music, elaborate cuisine, and exemplary etiquette called "Lucknowi tehzeeb."',
        dressing: [
          'Traditional: Chikankari kurtas, sherwanis for men, Lucknowi suits for women',
          'Formal: Business attire with traditional touch',
          'Cultural events: Elegant traditional wear with intricate embroidery',
          'Daily wear: Modest clothing respecting local customs'
        ],
        festivals: [
          { name: 'Lucknow Mahotsav', month: 'November-December', description: 'Cultural festival showcasing arts, crafts, and cuisine' },
          { name: 'Dussehra', month: 'September-October', description: 'Traditional celebration with elaborate Ramlila performances' },
          { name: 'Diwali', month: 'October-November', description: 'Festival of lights celebrated with traditional grandeur' }
        ],
        traditions: [
          'Lucknowi tehzeeb (refined etiquette and manners)',
          'Urdu poetry (shayari) and mushaira gatherings',
          'Classical music and thumri singing',
          'Chikankari embroidery craftsmanship',
          'Elaborate hospitality and nawabi culture'
        ],
        language: 'Hindi and Urdu widely spoken, refined Lucknowi dialect, English in business areas.',
        etiquette: [
          'Practice refined manners and polite conversation',
          'Appreciate Urdu poetry and cultural programs',
          'Try authentic Awadhi cuisine with proper etiquette',
          'Respect historical monuments and heritage sites',
          'Use respectful language and formal greetings'
        ]
      },
      bhopal: {
        overview: 'Bhopal, the "City of Lakes," is Madhya Pradesh\'s capital known for its rich history, beautiful lakes, and harmonious blend of Hindu and Islamic cultures.',
        dressing: [
          'Traditional: Mix of Hindu and Muslim traditional wear',
          'Formal: Government and business formal attire',
          'Cultural events: Traditional MP attire with local crafts',
          'Lake visits: Comfortable casual wear for outdoor activities'
        ],
        festivals: [
          { name: 'Ijtema', month: 'November', description: 'Large Islamic gathering with religious significance' },
          { name: 'Diwali', month: 'October-November', description: 'Festival celebrated by Hindu community with lights' },
          { name: 'Lok Rang', month: 'February', description: 'Folk festival showcasing Madhya Pradesh culture' }
        ],
        traditions: [
          'Harmonious Hindu-Muslim cultural coexistence',
          'Traditional handicrafts and tribal art',
          'Lake-centered recreational activities',
          'Government administrative culture',
          'MP folk music and dance traditions'
        ],
        language: 'Hindi primary language, Urdu understood, English in government and business.',
        etiquette: [
          'Respect both Hindu and Islamic customs equally',
          'Dress modestly when visiting religious places',
          'Enjoy lake activities while maintaining cleanliness',
          'Try local MP cuisine and specialties',
          'Be mindful of government capital protocols'
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
