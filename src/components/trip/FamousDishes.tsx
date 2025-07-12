
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Utensils, IndianRupee, ArrowRight, Star } from 'lucide-react';
import { TripData } from '@/components/TripPlanningForm';

interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  spiceLevel: string;
  image: string;
  rating: number;
  isVegetarian: boolean;
}

interface FamousDishesProps {
  tripData: TripData;
  onNext: () => void;
}

export const FamousDishes = ({ tripData, onNext }: FamousDishesProps) => {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mockDishes: Dish[] = [
      {
        id: '1',
        name: `${tripData.destination} Special Biryani`,
        description: 'Aromatic rice dish with tender meat and authentic spices',
        price: 250,
        category: 'Main Course',
        spiceLevel: 'Medium',
        image: '/placeholder.svg',
        rating: 4.7,
        isVegetarian: false
      },
      {
        id: '2',
        name: `Traditional ${tripData.destination} Thali`,
        description: 'Complete meal with variety of local curries, rice, and bread',
        price: 180,
        category: 'Traditional',
        spiceLevel: 'Medium',
        image: '/placeholder.svg',
        rating: 4.5,
        isVegetarian: true
      },
      {
        id: '3',
        name: `${tripData.destination} Street Chaat`,
        description: 'Popular street snack with tangy and spicy flavors',
        price: 80,
        category: 'Street Food',
        spiceLevel: 'High',
        image: '/placeholder.svg',
        rating: 4.3,
        isVegetarian: true
      },
      {
        id: '4',
        name: `${tripData.destination} Sweet Delicacy`,
        description: 'Traditional sweet made with milk, sugar, and local ingredients',
        price: 120,
        category: 'Dessert',
        spiceLevel: 'None',
        image: '/placeholder.svg',
        rating: 4.6,
        isVegetarian: true
      },
      {
        id: '5',
        name: `${tripData.destination} Fish Curry`,
        description: 'Fresh fish cooked in coconut-based spicy curry',
        price: 320,
        category: 'Main Course',
        spiceLevel: 'High',
        image: '/placeholder.svg',
        rating: 4.4,
        isVegetarian: false
      },
      {
        id: '6',
        name: `${tripData.destination} Lassi`,
        description: 'Refreshing yogurt-based drink, perfect for hot weather',
        price: 60,
        category: 'Beverage',
        spiceLevel: 'None',
        image: '/placeholder.svg',
        rating: 4.2,
        isVegetarian: true
      }
    ];

    setTimeout(() => {
      setDishes(mockDishes);
      setLoading(false);
    }, 800);
  }, [tripData]);

  const getSpiceLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Discovering Famous Dishes of {tripData.destination}...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Utensils className="h-5 w-5" />
          Famous Dishes of {tripData.destination}
        </CardTitle>
        <p className="text-gray-600">
          Explore the authentic flavors and must-try local specialties
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dishes.map((dish) => (
            <Card key={dish.id} className="hover:shadow-lg transition-all">
              <div className="relative">
                <img 
                  src={dish.image} 
                  alt={dish.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <Badge className="absolute top-2 right-2 bg-green-600">
                  ₹{dish.price}
                </Badge>
                <Badge className="absolute top-2 left-2 bg-purple-600">
                  {dish.category}
                </Badge>
                {dish.isVegetarian && (
                  <Badge className="absolute bottom-2 left-2 bg-green-500">
                    Veg
                  </Badge>
                )}
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2">{dish.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{dish.description}</p>
                
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${
                          i < Math.floor(dish.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`} 
                      />
                    ))}
                    <span className="ml-1 text-sm text-gray-600">{dish.rating}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <IndianRupee className="h-4 w-4 text-gray-500" />
                    <span className="font-semibold">₹{dish.price}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <Badge 
                    className={`${getSpiceLevelColor(dish.spiceLevel)} text-white`}
                  >
                    {dish.spiceLevel} Spice
                  </Badge>
                  <span className="text-sm text-gray-500">{dish.category}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6 p-4 bg-orange-50 rounded-lg border border-orange-200">
          <h4 className="font-semibold text-lg mb-2">💡 Food Tips for {tripData.destination}:</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Try local street food for authentic flavors</li>
            <li>• Budget ₹300-500 per person for a good meal</li>
            <li>• Ask locals for the best food spots</li>
            <li>• Carry water if you're not used to spicy food</li>
          </ul>
        </div>

        <div className="flex justify-end mt-6">
          <Button onClick={onNext} className="bg-gradient-to-r from-orange-500 to-blue-600">
            Next: Culture & Traditions
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
