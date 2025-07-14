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
    const cityLower = city.toLowerCase();
    
    const dishData: { [key: string]: Dish[] } = {
      mumbai: [
        { id: '1', name: 'Vada Pav', price: '₹15-30', type: 'Street Food', description: 'Mumbai\'s iconic burger with spiced potato fritter', rating: 4.6, restaurant: 'Street vendors across the city' },
        { id: '2', name: 'Pav Bhaji', price: '₹60-120', type: 'Main Course', description: 'Thick vegetable curry served with buttered bread', rating: 4.5, restaurant: 'Sardar Pav Bhaji, Cannon Pav Bhaji' },
        { id: '3', name: 'Bombay Duck Curry', price: '₹200-400', type: 'Seafood', description: 'Traditional Maharashtrian fish curry', rating: 4.4, restaurant: 'Trishna, Mahesh Lunch Home' },
        { id: '4', name: 'Misal Pav', price: '₹40-80', type: 'Breakfast', description: 'Spicy sprout curry with bread', rating: 4.3, restaurant: 'Aaswad, Prakash' }
      ],
      delhi: [
        { id: '1', name: 'Chole Bhature', price: '₹60-120', type: 'Main Course', description: 'Spicy chickpea curry with fried bread', rating: 4.5, restaurant: 'Sita Ram Diwan Chand, Nagpal Chole Bhature' },
        { id: '2', name: 'Butter Chicken', price: '₹250-400', type: 'Main Course', description: 'Creamy tomato-based chicken curry', rating: 4.6, restaurant: 'Moti Mahal, Karim\'s' },
        { id: '3', name: 'Paranthe Wali Gali Parathas', price: '₹40-100', type: 'Breakfast', description: 'Stuffed flatbreads from famous lane', rating: 4.4, restaurant: 'Paranthe Wali Gali, Old Delhi' },
        { id: '4', name: 'Rajma Chawal', price: '₹80-150', type: 'Main Course', description: 'Red kidney bean curry with rice', rating: 4.3, restaurant: 'Local dhabas and restaurants' }
      ],
      bangalore: [
        { id: '1', name: 'Masala Dosa', price: '₹50-120', type: 'Breakfast', description: 'Crispy rice crepe with spiced potato filling', rating: 4.6, restaurant: 'Vidyarthi Bhavan, CTR' },
        { id: '2', name: 'Mysore Pak', price: '₹300-500/kg', type: 'Sweet', description: 'Traditional sweet made with gram flour and ghee', rating: 4.5, restaurant: 'Krishna Sweets, Guru Sweets' },
        { id: '3', name: 'Bisi Bele Bath', price: '₹60-100', type: 'Main Course', description: 'Spiced rice and lentil dish with vegetables', rating: 4.4, restaurant: 'MTR, Mavalli Tiffin Room' },
        { id: '4', name: 'Filter Coffee', price: '₹15-40', type: 'Beverage', description: 'Strong South Indian coffee served in traditional tumbler', rating: 4.7, restaurant: 'Indian Coffee House, Brahmin\'s Coffee Bar' }
      ],
      chennai: [
        { id: '1', name: 'Idli Sambar', price: '₹30-60', type: 'Breakfast', description: 'Steamed rice cakes with lentil curry', rating: 4.6, restaurant: 'Murugan Idli Shop, Ratna Cafe' },
        { id: '2', name: 'Chettinad Chicken', price: '₹200-350', type: 'Main Course', description: 'Spicy chicken curry from Chettinad region', rating: 4.5, restaurant: 'The Raintree, Ponnusamy Hotel' },
        { id: '3', name: 'Rasam', price: '₹40-80', type: 'Soup', description: 'Tangy tomato-based South Indian soup', rating: 4.4, restaurant: 'Saravana Bhavan, Adyar Ananda Bhavan' },
        { id: '4', name: 'Payasam', price: '₹50-100', type: 'Dessert', description: 'Sweet pudding made with rice, milk and jaggery', rating: 4.3, restaurant: 'Sri Krishna Sweets, Adyar Ananda Bhavan' }
      ],
      kolkata: [
        { id: '1', name: 'Fish Curry Rice', price: '₹100-200', type: 'Main Course', description: 'Traditional Bengali fish curry with steamed rice', rating: 4.6, restaurant: '6 Ballygunge Place, Kewpie\'s' },
        { id: '2', name: 'Rosogolla', price: '₹10-20/piece', type: 'Sweet', description: 'Spongy cottage cheese balls in sugar syrup', rating: 4.7, restaurant: 'KC Das, Balaram Mullick' },
        { id: '3', name: 'Kathi Roll', price: '₹50-120', type: 'Street Food', description: 'Wrap with grilled meat/vegetables in paratha', rating: 4.5, restaurant: 'Nizam\'s, Kusum Rolls' },
        { id: '4', name: 'Mishti Doi', price: '₹30-60', type: 'Dessert', description: 'Sweet yogurt dessert', rating: 4.4, restaurant: 'Girish Chandra Dey, Ganguram' }
      ],
      jaipur: [
        { id: '1', name: 'Dal Baati Churma', price: '₹150-250', type: 'Main Course', description: 'Traditional Rajasthani dish with lentils and baked bread', rating: 4.5, restaurant: 'Chokhi Dhani, Thali House' },
        { id: '2', name: 'Laal Maas', price: '₹300-500', type: 'Main Course', description: 'Spicy red meat curry with mathania chilies', rating: 4.6, restaurant: 'Handi Restaurant, Spice Court' },
        { id: '3', name: 'Ghewar', price: '₹100-300', type: 'Sweet', description: 'Traditional Rajasthani sweet made during festivals', rating: 4.4, restaurant: 'LMB, Rawat Mishtan Bhandar' },
        { id: '4', name: 'Pyaaz Kachori', price: '₹15-30', type: 'Snack', description: 'Deep-fried pastry stuffed with spiced onions', rating: 4.3, restaurant: 'Rawat Mishtan Bhandar, Samrat Restaurant' }
      ],
      goa: [
        { id: '1', name: 'Fish Curry Rice', price: '₹150-300', type: 'Main Course', description: 'Goan-style coconut-based fish curry', rating: 4.6, restaurant: 'Fisherman\'s Wharf, Vinayak Family Restaurant' },
        { id: '2', name: 'Pork Vindaloo', price: '₹200-400', type: 'Main Course', description: 'Spicy and tangy pork curry with Portuguese influence', rating: 4.5, restaurant: 'Viva Panjim, Ritz Classic' },
        { id: '3', name: 'Bebinca', price: '₹100-200', type: 'Dessert', description: 'Traditional Goan layered pudding', rating: 4.4, restaurant: 'Confeitaria 31 de Janeiro, Martha\'s Breakfast Home' },
        { id: '4', name: 'Feni', price: '₹200-500', type: 'Beverage', description: 'Traditional Goan spirit made from cashew or palm', rating: 4.2, restaurant: 'Local tavernas and beach shacks' }
      ],
      hyderabad: [
        { id: '1', name: 'Hyderabadi Biryani', price: '₹200-400', type: 'Main Course', description: 'Aromatic basmati rice with mutton or chicken', rating: 4.8, restaurant: 'Paradise, Bawarchi, Shah Ghouse' },
        { id: '2', name: 'Haleem', price: '₹80-150', type: 'Main Course', description: 'Slow-cooked lentil and meat stew', rating: 4.6, restaurant: 'Pista House, Sarvi Restaurant' },
        { id: '3', name: 'Irani Chai', price: '₹10-25', type: 'Beverage', description: 'Traditional tea served with Osmania biscuits', rating: 4.5, restaurant: 'Nimrah Cafe, Grand Hotel' },
        { id: '4', name: 'Double Ka Meetha', price: '₹60-120', type: 'Dessert', description: 'Bread pudding with nuts and cream', rating: 4.4, restaurant: 'Hotel Shadab, Cafe Niloufer' }
      ],
      varanasi: [
        { id: '1', name: 'Kachori Sabzi', price: '₹30-60', type: 'Breakfast', description: 'Spicy deep-fried bread with potato curry', rating: 4.5, restaurant: 'Ram Bhandar, Keshav Kachori Bhandar' },
        { id: '2', name: 'Malaiyo', price: '₹40-80', type: 'Dessert', description: 'Frothy milk dessert available only in winters', rating: 4.7, restaurant: 'Street vendors in winter season' },
        { id: '3', name: 'Banarasi Paan', price: '₹20-50', type: 'After Meal', description: 'Betel leaf preparation with various fillings', rating: 4.6, restaurant: 'Keshav Paan Bhandar, Vishwanath Gali' },
        { id: '4', name: 'Thandai', price: '₹30-80', type: 'Beverage', description: 'Refreshing drink with nuts and spices', rating: 4.4, restaurant: 'Blue Lassi Shop, Mishrilal Lassi Shop' }
      ],
      pune: [
        { id: '1', name: 'Misal Pav', price: '₹40-100', type: 'Breakfast', description: 'Spicy sprout curry with bread', rating: 4.6, restaurant: 'Bedekar Tea Stall, Katakirr Misal' },
        { id: '2', name: 'Mastani', price: '₹80-150', type: 'Dessert', description: 'Thick milkshake topped with ice cream', rating: 4.5, restaurant: 'Sujata Mastani, RTO' },
        { id: '3', name: 'Bhel Puri', price: '₹30-60', type: 'Snack', description: 'Puffed rice mixed with chutneys and vegetables', rating: 4.4, restaurant: 'Durvankur Chowk, FC Road vendors' },
        { id: '4', name: 'Poha', price: '₹20-50', type: 'Breakfast', description: 'Flattened rice with onions and spices', rating: 4.3, restaurant: 'Local breakfast joints across Pune' }
      ],
      'hubli-dharwad': [
        { id: '1', name: 'Dharwad Peda', price: '₹20-40/piece', type: 'Sweet', description: 'Famous milk-based sweet from Dharwad', rating: 4.7, restaurant: 'Thakur\'s Sweets, Kamal Basadi' },
        { id: '2', name: 'Benne Dose', price: '₹50-100', type: 'Breakfast', description: 'Buttery crispy dosa unique to North Karnataka', rating: 4.5, restaurant: 'CTR, Vidyarthi Bhavan' },
        { id: '3', name: 'Holige', price: '₹40-80', type: 'Sweet', description: 'Sweet flatbread stuffed with jaggery and lentils', rating: 4.4, restaurant: 'Local homes and traditional restaurants' },
        { id: '4', name: 'Girmit', price: '₹20-40', type: 'Snack', description: 'Puffed rice chaat with vegetables and chutneys', rating: 4.2, restaurant: 'Street vendors in Hubli-Dharwad' }
      ],
      lucknow: [
        { id: '1', name: 'Lucknowi Biryani', price: '₹150-300', type: 'Main Course', description: 'Fragrant rice dish cooked in dum style', rating: 4.7, restaurant: 'Tunday Kababi, Idris Biryani' },
        { id: '2', name: 'Galouti Kebab', price: '₹200-400', type: 'Appetizer', description: 'Melt-in-mouth mutton kebabs', rating: 4.8, restaurant: 'Tunday Kababi, Dastarkhwan' },
        { id: '3', name: 'Kulfi Faluda', price: '₹50-100', type: 'Dessert', description: 'Traditional ice cream with vermicelli', rating: 4.5, restaurant: 'Prakash Kulfi, Chowk area' },
        { id: '4', name: 'Basket Chaat', price: '₹60-120', type: 'Snack', description: 'Chaat served in an edible potato basket', rating: 4.4, restaurant: 'Royal Cafe, Chowk area' }
      ],
      mysore: [
        { id: '1', name: 'Mysore Pak', price: '₹300-500/kg', type: 'Sweet', description: 'Traditional sweet made with gram flour and ghee', rating: 4.7, restaurant: 'Krishna Sweets, Guru Sweets' },
        { id: '2', name: 'Mysore Masala Dosa', price: '₹60-120', type: 'Breakfast', description: 'Crispy dosa with spicy red chutney', rating: 4.6, restaurant: 'Vinayaka Mylari, RRR Restaurant' },
        { id: '3', name: 'Obbattu', price: '₹40-80', type: 'Sweet', description: 'Sweet flatbread with jaggery and coconut filling', rating: 4.4, restaurant: 'Traditional restaurants and homes' },
        { id: '4', name: 'Mysore Coffee', price: '₹20-50', type: 'Beverage', description: 'Strong filter coffee served in traditional style', rating: 4.5, restaurant: 'Depth N Green, Coffee Board outlets' }
      ],
      coimbatore: [
        { id: '1', name: 'Kuzhi Paniyaram', price: '₹30-60', type: 'Snack', description: 'Round dumplings made from rice and lentil batter', rating: 4.4, restaurant: 'Annapoorna, Sree Annapoorna' },
        { id: '2', name: 'Kothu Parotta', price: '₹80-150', type: 'Main Course', description: 'Shredded flatbread stir-fried with curry and egg', rating: 4.5, restaurant: 'Junior Kuppanna, Salem RR Biriyani' },
        { id: '3', name: 'Palada Payasam', price: '₹50-100', type: 'Dessert', description: 'Creamy rice pudding with nuts', rating: 4.3, restaurant: 'Adyar Ananda Bhavan, A2B' },
        { id: '4', name: 'Filter Coffee', price: '₹15-40', type: 'Beverage', description: 'Traditional South Indian coffee', rating: 4.6, restaurant: 'Indian Coffee House, local filter coffee shops' }
      ],
      agra: [
        { id: '1', name: 'Petha', price: '₹200-400/kg', type: 'Sweet', description: 'Famous ash gourd sweet in various flavors', rating: 4.5, restaurant: 'Panchhi Petha, Bhimsain Petha' },
        { id: '2', name: 'Dalmoth', price: '₹150-300/kg', type: 'Snack', description: 'Spicy lentil-based snack mix', rating: 4.3, restaurant: 'Bikanervala, Haldiram\'s' },
        { id: '3', name: 'Mughlai Chicken', price: '₹200-350', type: 'Main Course', description: 'Rich chicken curry in Mughlai style', rating: 4.4, restaurant: 'Pinch of Spice, Joney\'s Place' },
        { id: '4', name: 'Bedai with Aloo Sabzi', price: '₹40-80', type: 'Breakfast', description: 'Deep-fried bread with spiced potato curry', rating: 4.2, restaurant: 'Deviram Sweets, local breakfast joints' }
      ],
      amritsar: [
        { id: '1', name: 'Amritsari Kulcha', price: '₹50-120', type: 'Main Course', description: 'Stuffed bread served with chole and butter', rating: 4.7, restaurant: 'Bharawan Da Dhaba, Kesar Da Dhaba' },
        { id: '2', name: 'Makki di Roti Sarson da Saag', price: '₹80-150', type: 'Main Course', description: 'Corn bread with mustard greens curry', rating: 4.6, restaurant: 'Brothers Dhaba, Kanha Sweets' },
        { id: '3', name: 'Lassi', price: '₹30-80', type: 'Beverage', description: 'Thick yogurt drink served in earthen pots', rating: 4.5, restaurant: 'Gurdas Maan Di Hatti, Ahuja Lassi' },
        { id: '4', name: 'Jalebi', price: '₹100-200/kg', type: 'Sweet', description: 'Crispy sweet spirals soaked in sugar syrup', rating: 4.4, restaurant: 'Novelty Sweets, Gian Chand Jalebi Wala' }
      ],
      nagpur: [
        { id: '1', name: 'Saoji Chicken', price: '₹180-300', type: 'Main Course', description: 'Fiery spicy chicken curry from Saoji community', rating: 4.6, restaurant: 'Shree Saoji Bhojnalaya, Jai Bhavani Saoji' },
        { id: '2', name: 'Tarri Poha', price: '₹30-60', type: 'Breakfast', description: 'Flattened rice with spicy curry topping', rating: 4.4, restaurant: 'Shree Krishna, local breakfast joints' },
        { id: '3', name: 'Orange Barfi', price: '₹300-500/kg', type: 'Sweet', description: 'Sweet made from famous Nagpur oranges', rating: 4.3, restaurant: 'Haldiram\'s, local sweet shops' },
        { id: '4', name: 'Patodi Rassa', price: '₹100-180', type: 'Main Course', description: 'Gram flour dumplings in spicy curry', rating: 4.2, restaurant: 'Vidarbha restaurants, local eateries' }
      ]
    };

    return dishData[cityLower] || [
      {
        id: '1',
        name: 'Regional Specialty',
        price: '₹100-200',
        type: 'Main Course',
        description: 'Popular local dish of the region',
        rating: 4.2,
        restaurant: 'Local restaurants'
      },
      {
        id: '2',
        name: 'Traditional Snack',
        price: '₹30-80',
        type: 'Snack',
        description: 'Traditional local snack',
        rating: 4.0,
        restaurant: 'Street vendors and local eateries'
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