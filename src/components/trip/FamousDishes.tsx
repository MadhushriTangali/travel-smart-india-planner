
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

  const getDishesForCity = (city: string): Dish[] => {
    const cityLower = city.toLowerCase();
    
    const dishesData: { [key: string]: Dish[] } = {
      hyderabad: [
        { id: '1', name: 'Hyderabadi Biryani', description: 'Aromatic basmati rice with tender mutton cooked in dum style', price: 350, category: 'Main Course', spiceLevel: 'Medium', rating: 4.8, isVegetarian: false },
        { id: '2', name: 'Haleem', description: 'Slow-cooked lentils with meat, traditional Ramadan delicacy', price: 180, category: 'Main Course', spiceLevel: 'Medium', rating: 4.7, isVegetarian: false },
        { id: '3', name: 'Lukhmi', description: 'Square-shaped samosa filled with spiced minced meat', price: 25, category: 'Snack', spiceLevel: 'Medium', rating: 4.5, isVegetarian: false },
        { id: '4', name: 'Double Ka Meetha', description: 'Bread pudding with milk, nuts and saffron', price: 120, category: 'Dessert', spiceLevel: 'None', rating: 4.6, isVegetarian: true },
        { id: '5', name: 'Irani Chai', description: 'Strong tea with milk served with Osmania biscuits', price: 15, category: 'Beverage', spiceLevel: 'None', rating: 4.4, isVegetarian: true },
        { id: '6', name: 'Nihari', description: 'Slow-cooked beef stew with aromatic spices', price: 280, category: 'Main Course', spiceLevel: 'High', rating: 4.7, isVegetarian: false }
      ],
      mumbai: [
        { id: '1', name: 'Vada Pav', description: 'Mumbai\'s iconic street food - spiced potato fritter in bread', price: 15, category: 'Street Food', spiceLevel: 'Medium', rating: 4.5, isVegetarian: true },
        { id: '2', name: 'Pav Bhaji', description: 'Spicy vegetable curry served with buttered bread rolls', price: 80, category: 'Street Food', spiceLevel: 'Medium', rating: 4.6, isVegetarian: true },
        { id: '3', name: 'Bhel Puri', description: 'Crunchy snack mix with sev, chutneys and vegetables', price: 40, category: 'Chaat', spiceLevel: 'Medium', rating: 4.4, isVegetarian: true },
        { id: '4', name: 'Bombay Duck Curry', description: 'Local fish curry with coconut and spices', price: 250, category: 'Main Course', spiceLevel: 'High', rating: 4.3, isVegetarian: false },
        { id: '5', name: 'Solkadhi', description: 'Refreshing drink made with coconut milk and kokum', price: 50, category: 'Beverage', spiceLevel: 'None', rating: 4.2, isVegetarian: true },
        { id: '6', name: 'Modak', description: 'Steamed dumplings filled with jaggery and coconut', price: 60, category: 'Dessert', spiceLevel: 'None', rating: 4.5, isVegetarian: true }
      ],
      delhi: [
        { id: '1', name: 'Butter Chicken', description: 'Creamy tomato-based chicken curry, Delhi\'s pride', price: 320, category: 'Main Course', spiceLevel: 'Medium', rating: 4.7, isVegetarian: false },
        { id: '2', name: 'Chole Bhature', description: 'Spicy chickpea curry with deep-fried bread', price: 150, category: 'Main Course', spiceLevel: 'Medium', rating: 4.6, isVegetarian: true },
        { id: '3', name: 'Paranthe Wali Gali Parathas', description: 'Stuffed flatbreads from the famous lane in Old Delhi', price: 80, category: 'Street Food', spiceLevel: 'Medium', rating: 4.5, isVegetarian: true },
        { id: '4', name: 'Rajma Chawal', description: 'Kidney bean curry with steamed rice', price: 120, category: 'Main Course', spiceLevel: 'Medium', rating: 4.4, isVegetarian: true },
        { id: '5', name: 'Kulfi Faluda', description: 'Traditional ice cream with vermicelli and rose syrup', price: 70, category: 'Dessert', spiceLevel: 'None', rating: 4.3, isVegetarian: true },
        { id: '6', name: 'Aloo Tikki Chaat', description: 'Spiced potato patties with tangy chutneys', price: 50, category: 'Chaat', spiceLevel: 'Medium', rating: 4.5, isVegetarian: true }
      ],
      goa: [
        { id: '1', name: 'Fish Curry Rice', description: 'Coconut-based fish curry with steamed rice', price: 220, category: 'Main Course', spiceLevel: 'Medium', rating: 4.7, isVegetarian: false },
        { id: '2', name: 'Vindaloo', description: 'Spicy and tangy pork curry with vinegar', price: 280, category: 'Main Course', spiceLevel: 'High', rating: 4.6, isVegetarian: false },
        { id: '3', name: 'Bebinca', description: 'Traditional layered dessert with coconut milk', price: 150, category: 'Dessert', spiceLevel: 'None', rating: 4.5, isVegetarian: true },
        { id: '4', name: 'Prawn Balchão', description: 'Pickled prawns in spicy tomato sauce', price: 320, category: 'Main Course', spiceLevel: 'High', rating: 4.4, isVegetarian: false },
        { id: '5', name: 'Cashew Feni', description: 'Traditional Goan spirit made from cashew', price: 200, category: 'Beverage', spiceLevel: 'None', rating: 4.2, isVegetarian: true },
        { id: '6', name: 'Solkadhi', description: 'Pink drink made with kokum and coconut milk', price: 60, category: 'Beverage', spiceLevel: 'None', rating: 4.3, isVegetarian: true }
      ]
    };

    return dishesData[cityLower] || [
      { id: '1', name: `${city} Special Curry`, description: 'Local specialty curry with regional spices', price: 200, category: 'Main Course', spiceLevel: 'Medium', rating: 4.4, isVegetarian: true },
      { id: '2', name: `Traditional ${city} Sweet`, description: 'Famous local dessert made with milk and sugar', price: 120, category: 'Dessert', spiceLevel: 'None', rating: 4.3, isVegetarian: true },
      { id: '3', name: `${city} Street Snack`, description: 'Popular local street food snack', price: 80, category: 'Street Food', spiceLevel: 'Medium', rating: 4.2, isVegetarian: true },
      { id: '4', name: `${city} Tea`, description: 'Local style tea preparation', price: 20, category: 'Beverage', spiceLevel: 'None', rating: 4.1, isVegetarian: true }
    ];
  };

  useEffect(() => {
    const cityDishes = getDishesForCity(tripData.destination);

    setTimeout(() => {
      setDishes(cityDishes);
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
      <Card className="shadow-xl border-t-4 border-t-orange-500">
        <CardHeader>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent">
            Discovering Famous Dishes of {tripData.destination}...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gradient-to-r from-gray-200 to-gray-300 h-32 rounded-lg mb-4"></div>
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
        <CardTitle className="flex items-center gap-2 text-2xl font-bold text-gray-800">
          <Utensils className="h-6 w-6 text-orange-500" />
          Famous Dishes of {tripData.destination}
        </CardTitle>
        <p className="text-gray-600 font-semibold">
          Explore the authentic flavors and must-try local specialties
        </p>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dishes.map((dish) => (
            <Card key={dish.id} className="hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-gray-100">
              <div className="p-1">
                <div className="bg-gradient-to-br from-orange-100 to-blue-100 p-4 rounded-t-lg">
                  <div className="flex justify-between items-start mb-2">
                    <Badge className="bg-green-600 hover:bg-green-700 text-white font-semibold">
                      ₹{dish.price}
                    </Badge>
                    <Badge className="bg-purple-500 hover:bg-purple-600 text-white font-semibold">
                      {dish.category}
                    </Badge>
                  </div>
                  {dish.isVegetarian && (
                    <Badge className="bg-green-500 hover:bg-green-600 text-white font-semibold">
                      Veg
                    </Badge>
                  )}
                </div>
              </div>
              
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-2 text-gray-800">{dish.name}</h3>
                <p className="text-sm text-gray-600 mb-3 font-medium">{dish.description}</p>
                
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
                    <span className="ml-1 text-sm text-gray-600 font-medium">{dish.rating}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <IndianRupee className="h-4 w-4 text-gray-500" />
                    <span className="font-semibold">₹{dish.price}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <Badge 
                    className={`${getSpiceLevelColor(dish.spiceLevel)} text-white font-semibold`}
                  >
                    {dish.spiceLevel} Spice
                  </Badge>
                  <span className="text-sm text-gray-500 font-medium">{dish.category}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 p-6 bg-gradient-to-r from-orange-50 to-blue-50 rounded-xl border-2 border-orange-200">
          <h4 className="font-bold text-xl mb-4 text-gray-800">💡 Food Tips for {tripData.destination}:</h4>
          <ul className="text-sm text-gray-700 space-y-2 font-medium">
            <li>• Try local street food for authentic flavors</li>
            <li>• Budget ₹300-500 per person for a good meal</li>
            <li>• Ask locals for the best food spots</li>
            <li>• Carry water if you're not used to spicy food</li>
          </ul>
        </div>

        <div className="flex justify-end mt-8">
          <Button onClick={onNext} className="bg-gradient-to-r from-orange-500 to-blue-600 hover:from-orange-600 hover:to-blue-700 text-white font-bold px-8 py-3 text-lg">
            Next: Culture & Traditions
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
