
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

  useEffect(() => {
    const mockCultureInfo: CultureInfo = {
      overview: `${tripData.destination} is known for its rich cultural heritage, blending traditional values with modern influences. The region has a unique identity shaped by centuries of history, art, and diverse communities.`,
      dressing: [
        'Traditional: Sarees and dhotis for formal occasions',
        'Casual: Cotton clothing preferred due to climate',
        'Festivals: Colorful ethnic wear with jewelry',
        'Modern: Western clothes widely accepted in cities'
      ],
      festivals: [
        {
          name: `${tripData.destination} Cultural Festival`,
          month: 'October-November',
          description: 'Grand celebration featuring local music, dance, and arts'
        },
        {
          name: 'Harvest Festival',
          month: 'January',
          description: 'Traditional celebration of agricultural abundance'
        },
        {
          name: 'Spring Festival',
          month: 'March',
          description: 'Colorful celebration welcoming the spring season'
        }
      ],
      traditions: [
        'Greeting with "Namaste" with folded hands',
        'Removing shoes before entering homes and temples',
        'Respecting elders and seeking their blessings',
        'Community gatherings during festivals',
        'Traditional music and dance performances'
      ],
      language: 'Hindi and local regional language widely spoken, English understood in tourist areas',
      etiquette: [
        'Dress modestly when visiting religious places',
        'Use right hand for eating and greeting',
        'Avoid pointing feet towards people or religious items',
        'Ask permission before photographing people',
        'Bargaining is common in local markets'
      ]
    };

    setTimeout(() => {
      setCultureInfo(mockCultureInfo);
      setLoading(false);
    }, 800);
  }, [tripData]);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Learning about {tripData.destination} Culture...</CardTitle>
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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="h-5 w-5" />
          Culture & Traditions of {tripData.destination}
        </CardTitle>
        <p className="text-gray-600">
          Understanding local culture enhances your travel experience
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Users className="h-5 w-5" />
              Cultural Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">{cultureInfo.overview}</p>
          </CardContent>
        </Card>

        {/* Festivals */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Calendar className="h-5 w-5" />
              Popular Festivals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {cultureInfo.festivals.map((festival, index) => (
                <Card key={index} className="border border-orange-200">
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-2">{festival.name}</h4>
                    <Badge className="mb-2 bg-orange-500">{festival.month}</Badge>
                    <p className="text-sm text-gray-600">{festival.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Dressing Style */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Shirt className="h-5 w-5" />
              Dressing Style
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {cultureInfo.dressing.map((style, index) => (
                <div key={index} className="flex items-start gap-2">
                  <Badge variant="outline" className="mt-1">
                    {index + 1}
                  </Badge>
                  <p className="text-sm">{style}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Traditions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Local Traditions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {cultureInfo.traditions.map((tradition, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="text-orange-500 font-bold">•</span>
                  <p className="text-sm">{tradition}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Language & Etiquette */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Language</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700">{cultureInfo.language}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Cultural Etiquette</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {cultureInfo.etiquette.map((rule, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold">•</span>
                    <p className="text-sm">{rule}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end">
          <Button onClick={onNext} className="bg-gradient-to-r from-orange-500 to-blue-600">
            Next: Transport Options
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
