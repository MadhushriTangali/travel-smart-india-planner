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
    // Return default minimal data - this will be populated with real data in future updates
    return {
      languages: ['Hindi', 'English'],
      festivals: [
        { name: 'Diwali', month: 'October/November', description: 'Festival of lights' },
        { name: 'Holi', month: 'March', description: 'Festival of colors' }
      ],
      traditions: [
        'Local cultural traditions',
        'Regional customs and practices'
      ],
      etiquette: [
        'Respect local customs', 
        'Dress modestly in religious places',
        'Remove shoes before entering homes'
      ],
      clothing: 'Casual and comfortable clothing recommended',
      art_forms: ['Local art forms', 'Traditional crafts']
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