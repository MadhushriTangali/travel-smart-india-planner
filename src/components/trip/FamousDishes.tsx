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
      chennai: [
        { id: '1', name: 'Chettinad Chicken', description: 'Spicy chicken curry with aromatic Chettinad spices', price: 280, category: 'Main Course', spiceLevel: 'High', rating: 4.7, isVegetarian: false },
        { id: '2', name: 'Dosa', description: 'Crispy fermented crepe made from rice and lentil batter', price: 80, category: 'Main Course', spiceLevel: 'Low', rating: 4.6, isVegetarian: true },
        { id: '3', name: 'Idli Sambar', description: 'Steamed rice cakes served with lentil curry', price: 60, category: 'Breakfast', spiceLevel: 'Medium', rating: 4.5, isVegetarian: true },
        { id: '4', name: 'Rasam', description: 'Tangy tamarind-based soup with spices', price: 40, category: 'Soup', spiceLevel: 'Medium', rating: 4.4, isVegetarian: true },
        { id: '5', name: 'Payasam', description: 'Sweet rice pudding with cardamom and nuts', price: 100, category: 'Dessert', spiceLevel: 'None', rating: 4.3, isVegetarian: true },
        { id: '6', name: 'Filter Coffee', description: 'Strong coffee brewed in traditional filter', price: 25, category: 'Beverage', spiceLevel: 'None', rating: 4.5, isVegetarian: true }
      ],
      pune: [
        { id: '1', name: 'Misal Pav', description: 'Spicy sprouted lentil curry with bread rolls', price: 80, category: 'Street Food', spiceLevel: 'High', rating: 4.6, isVegetarian: true },
        { id: '2', name: 'Puran Poli', description: 'Sweet flatbread stuffed with jaggery and lentil filling', price: 60, category: 'Dessert', spiceLevel: 'None', rating: 4.5, isVegetarian: true },
        { id: '3', name: 'Bhel Puri', description: 'Crunchy snack mix with chutneys and vegetables', price: 40, category: 'Chaat', spiceLevel: 'Medium', rating: 4.4, isVegetarian: true },
        { id: '4', name: 'Sabudana Khichdi', description: 'Tapioca pearls cooked with peanuts and spices', price: 70, category: 'Main Course', spiceLevel: 'Low', rating: 4.3, isVegetarian: true },
        { id: '5', name: 'Modak', description: 'Steamed dumplings filled with jaggery and coconut', price: 80, category: 'Dessert', spiceLevel: 'None', rating: 4.4, isVegetarian: true },
        { id: '6', name: 'Mastani', description: 'Thick milkshake topped with ice cream and nuts', price: 120, category: 'Beverage', spiceLevel: 'None', rating: 4.2, isVegetarian: true }
      ],
      jaipur: [
        { id: '1', name: 'Dal Baati Churma', description: 'Traditional Rajasthani meal with lentils, wheat balls, and sweet crumble', price: 200, category: 'Main Course', spiceLevel: 'Medium', rating: 4.7, isVegetarian: true },
        { id: '2', name: 'Laal Maas', description: 'Fiery red mutton curry with Mathania chilies', price: 380, category: 'Main Course', spiceLevel: 'High', rating: 4.6, isVegetarian: false },
        { id: '3', name: 'Ghevar', description: 'Round sweet made from flour and soaked in sugar syrup', price: 150, category: 'Dessert', spiceLevel: 'None', rating: 4.5, isVegetarian: true },
        { id: '4', name: 'Kachori', description: 'Deep-fried pastry filled with spiced lentils', price: 30, category: 'Snack', spiceLevel: 'Medium', rating: 4.4, isVegetarian: true },
        { id: '5', name: 'Pyaaz Kachori', description: 'Crispy pastry filled with spiced onions', price: 35, category: 'Snack', spiceLevel: 'Medium', rating: 4.3, isVegetarian: true },
        { id: '6', name: 'Lassi', description: 'Traditional yogurt-based drink served in clay pot', price: 60, category: 'Beverage', spiceLevel: 'None', rating: 4.2, isVegetarian: true }
      ],
      ahmedabad: [
        { id: '1', name: 'Dhokla', description: 'Steamed fermented cake made from chickpea flour', price: 50, category: 'Snack', spiceLevel: 'Low', rating: 4.6, isVegetarian: true },
        { id: '2', name: 'Thepla', description: 'Spiced flatbread made with fenugreek leaves', price: 40, category: 'Breakfast', spiceLevel: 'Medium', rating: 4.5, isVegetarian: true },
        { id: '3', name: 'Khandvi', description: 'Rolled gram flour snack with mustard seed tempering', price: 80, category: 'Snack', spiceLevel: 'Low', rating: 4.4, isVegetarian: true },
        { id: '4', name: 'Gujarati Thali', description: 'Complete meal with various curries, breads, and sweets', price: 300, category: 'Main Course', spiceLevel: 'Medium', rating: 4.7, isVegetarian: true },
        { id: '5', name: 'Fafda Jalebi', description: 'Crispy chickpea flour strips with sweet spiral pretzels', price: 70, category: 'Snack', spiceLevel: 'Low', rating: 4.3, isVegetarian: true },
        { id: '6', name: 'Aam Ras', description: 'Sweet mango pulp served as dessert', price: 90, category: 'Dessert', spiceLevel: 'None', rating: 4.2, isVegetarian: true }
      ],
      kochi: [
        { id: '1', name: 'Appam with Stew', description: 'Bowl-shaped rice pancake with coconut vegetable stew', price: 120, category: 'Main Course', spiceLevel: 'Low', rating: 4.6, isVegetarian: true },
        { id: '2', name: 'Karimeen Fish Curry', description: 'Pearl spot fish cooked in coconut curry', price: 320, category: 'Main Course', spiceLevel: 'Medium', rating: 4.7, isVegetarian: false },
        { id: '3', name: 'Puttu and Kadala', description: 'Steamed rice cylinders with spiced black chickpeas', price: 80, category: 'Breakfast', spiceLevel: 'Medium', rating: 4.5, isVegetarian: true },
        { id: '4', name: 'Banana Chips', description: 'Crispy fried banana slices, Kerala specialty', price: 60, category: 'Snack', spiceLevel: 'Low', rating: 4.3, isVegetarian: true },
        { id: '5', name: 'Payasam', description: 'Traditional sweet pudding made with rice and milk', price: 100, category: 'Dessert', spiceLevel: 'None', rating: 4.4, isVegetarian: true },
        { id: '6', name: 'Tender Coconut Water', description: 'Fresh coconut water served directly from coconut', price: 30, category: 'Beverage', spiceLevel: 'None', rating: 4.2, isVegetarian: true }
      ],
      thiruvananthapuram: [
        { id: '1', name: 'Sadya', description: 'Traditional vegetarian feast served on banana leaf', price: 250, category: 'Main Course', spiceLevel: 'Medium', rating: 4.8, isVegetarian: true },
        { id: '2', name: 'Fish Molee', description: 'Mild fish curry cooked in coconut milk', price: 280, category: 'Main Course', spiceLevel: 'Low', rating: 4.6, isVegetarian: false },
        { id: '3', name: 'Ela Ada', description: 'Rice flour dumpling with jaggery filling wrapped in banana leaf', price: 40, category: 'Dessert', spiceLevel: 'None', rating: 4.5, isVegetarian: true },
        { id: '4', name: 'Kozhi Varuthathu', description: 'Spicy roasted chicken Kerala style', price: 320, category: 'Main Course', spiceLevel: 'High', rating: 4.4, isVegetarian: false },
        { id: '5', name: 'Unniyappam', description: 'Sweet rice balls deep-fried in coconut oil', price: 60, category: 'Dessert', spiceLevel: 'None', rating: 4.3, isVegetarian: true },
        { id: '6', name: 'Sambharam', description: 'Spiced buttermilk drink with curry leaves', price: 25, category: 'Beverage', spiceLevel: 'Low', rating: 4.2, isVegetarian: true }
      ],
      lucknow: [
        { id: '1', name: 'Tunday Kababi', description: 'Legendary minced meat kebabs that melt in mouth', price: 180, category: 'Main Course', spiceLevel: 'Medium', rating: 4.8, isVegetarian: false },
        { id: '2', name: 'Lucknowi Biryani', description: 'Aromatic rice dish with tender meat and saffron', price: 320, category: 'Main Course', spiceLevel: 'Medium', rating: 4.7, isVegetarian: false },
        { id: '3', name: 'Basket Chaat', description: 'Crispy potato basket filled with tangy chaat', price: 80, category: 'Chaat', spiceLevel: 'Medium', rating: 4.5, isVegetarian: true },
        { id: '4', name: 'Kulfi Faluda', description: 'Traditional ice cream with vermicelli and rose syrup', price: 70, category: 'Dessert', spiceLevel: 'None', rating: 4.4, isVegetarian: true },
        { id: '5', name: 'Sheermal', description: 'Sweet bread flavored with saffron and cardamom', price: 50, category: 'Bread', spiceLevel: 'None', rating: 4.3, isVegetarian: true },
        { id: '6', name: 'Nimbu Paani', description: 'Fresh lime water with mint and spices', price: 30, category: 'Beverage', spiceLevel: 'Low', rating: 4.2, isVegetarian: true }
      ],
      bhopal: [
        { id: '1', name: 'Bhopali Mutton Korma', description: 'Rich mutton curry with yogurt and aromatic spices', price: 300, category: 'Main Course', spiceLevel: 'Medium', rating: 4.6, isVegetarian: false },
        { id: '2', name: 'Poha Jalebi', description: 'Flattened rice with onions served with sweet jalebi', price: 60, category: 'Breakfast', spiceLevel: 'Low', rating: 4.5, isVegetarian: true },
        { id: '3', name: 'Dal Bafla', description: 'Steamed wheat balls served with spiced lentil curry', price: 150, category: 'Main Course', spiceLevel: 'Medium', rating: 4.4, isVegetarian: true },
        { id: '4', name: 'Bhopali Paan', description: 'Betel leaf preparation with various sweet fillings', price: 40, category: 'After Meal', spiceLevel: 'None', rating: 4.2, isVegetarian: true },
        { id: '5', name: 'Lavang Lata', description: 'Crispy pastry filled with cardamom-flavored khoya', price: 80, category: 'Dessert', spiceLevel: 'None', rating: 4.3, isVegetarian: true },
        { id: '6', name: 'Malpua', description: 'Sweet pancake soaked in sugar syrup', price: 70, category: 'Dessert', spiceLevel: 'None', rating: 4.1, isVegetarian: true }
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
