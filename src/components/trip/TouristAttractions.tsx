import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { TripData } from '@/components/TripPlanningForm';

interface Attraction {
  id: string;
  name: string;
  type: string;
  rating: number;
  entry_fee: string;
  timings: string;
  description: string;
}

interface TouristAttractionsProps {
  tripData: TripData;
  onNext: () => void;
}

export const TouristAttractions = ({ tripData, onNext }: TouristAttractionsProps) => {
  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const [loading, setLoading] = useState(true);

  const getAttractionsForCity = (city: string): Attraction[] => {
    // Return minimal sample attractions - this will be populated with real data in future updates
    return [
      {
        id: '1',
        name: 'Popular Local Attraction',
        type: 'Tourist Spot',
        rating: 4.5,
        entry_fee: '₹50',
        timings: '9:00 AM - 6:00 PM',
        description: 'Famous local tourist attraction'
      },
      {
        id: '2',
        name: 'Cultural Site',
        type: 'Historical',
        rating: 4.3,
        entry_fee: '₹30',
        timings: '10:00 AM - 5:00 PM',
        description: 'Important cultural and historical site'
      }
    ];
  };

  useEffect(() => {
    const cityAttractions = getAttractionsForCity(tripData.destination);
    
    setTimeout(() => {
      setAttractions(cityAttractions);
      setLoading(false);
    }, 1000);
  }, [tripData]);

  const handleNext = () => {
    console.log('Tourist attractions viewed for:', tripData.destination);
    onNext();
  };

  if (loading) {
    return (
      <Card className="shadow-xl border-t-4 border-t-orange-500">
        <CardHeader>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent">
            Finding Tourist Attractions in {tripData.destination}...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 h-24 rounded-lg mb-4"></div>
                <div className="bg-gray-200 h-4 rounded mb-2"></div>
                <div className="bg-gray-200 h-4 rounded w-3/4"></div>
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
          Tourist Attractions in {tripData.destination}
        </CardTitle>
        <p className="text-gray-600 font-semibold">
          Explore the must-visit places in {tripData.destination}
        </p>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid md:grid-cols-2 gap-6">
          {attractions.map((attraction) => (
            <Card key={attraction.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-2 text-gray-800">{attraction.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{attraction.description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold">Type:</span>
                    <span>{attraction.type}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold">Entry Fee:</span>
                    <span>{attraction.entry_fee}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold">Timings:</span>
                    <span>{attraction.timings}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold">Rating:</span>
                    <span className="text-yellow-500">★ {attraction.rating}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-end mt-8">
          <Button onClick={handleNext} className="bg-gradient-to-r from-orange-500 to-blue-600 hover:from-orange-600 hover:to-blue-700 text-white font-bold px-8 py-3 text-lg">
            Next: Famous Dishes
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};