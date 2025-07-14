import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TripData } from '@/components/TripPlanningForm';
import { ArrowRight } from 'lucide-react';

interface Dish {
  id: string;
  name: string;
  price: string;
  type: string;
  description: string;
  rating: number;
  restaurant: string;
}

interface FamousDishesProps {
  tripData: TripData;
  onNext: () => void;
}

export const FamousDishes = ({ tripData, onNext }: FamousDishesProps) => {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [loading, setLoading] = useState(true);

  const getDishesForCity = (city: string): Dish[] => {
    // Return minimal sample dishes - this will be populated with real data in future updates
    return [
      {
        id: '1',
        name: 'Local Specialty',
        price: '₹50-150',
        type: 'Main Course',
        description: 'Popular local dish',
        rating: 4.5,
        restaurant: 'Local restaurants'
      },
      {
        id: '2',
        name: 'Regional Snack',
        price: '₹30-80',
        type: 'Snack',
        description: 'Traditional regional snack',
        rating: 4.3,
        restaurant: 'Street vendors'
      }
    ];
  };

  useEffect(() => {
    const localDishes = getDishesForCity(tripData.destination);
    
    setTimeout(() => {
      setDishes(localDishes);
      setLoading(false);
    }, 1000);
  }, [tripData]);

  const handleNext = () => {
    console.log('Famous dishes viewed for:', tripData.destination);
    onNext();
  };

  if (loading) {
    return (
      <Card className="shadow-xl border-t-4 border-t-orange-500">
        <CardHeader>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent">
            Discovering Local Cuisine in {tripData.destination}...
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
          Famous Dishes of {tripData.destination}
        </CardTitle>
        <p className="text-gray-600 font-semibold">
          Taste the authentic flavors of {tripData.destination}
        </p>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid md:grid-cols-2 gap-6">
          {dishes.map((dish) => (
            <Card key={dish.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-2 text-gray-800">{dish.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{dish.description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold">Type:</span>
                    <span>{dish.type}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold">Price:</span>
                    <span>{dish.price}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold">Where to try:</span>
                    <span>{dish.restaurant}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold">Rating:</span>
                    <span className="text-yellow-500">★ {dish.rating}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-end mt-8">
          <Button onClick={handleNext} className="bg-gradient-to-r from-orange-500 to-blue-600 hover:from-orange-600 hover:to-blue-700 text-white font-bold px-8 py-3 text-lg">
            Next: Culture
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};