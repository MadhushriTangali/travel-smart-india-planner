import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Utensils, ArrowRight, IndianRupee, MapPin } from 'lucide-react';
import { TripData } from '@/components/TripPlanningForm';

interface Dish {
  id: string;
  name: string;
  type: string;
  price_range: string;
  description: string;
  best_places: string[];
  spice_level: 'Mild' | 'Medium' | 'Spicy' | 'Very Spicy';
}

interface FamousDishesProps {
  tripData: TripData;
  onNext: () => void;
}

export const FamousDishes = ({ tripData, onNext }: FamousDishesProps) => {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDishes, setSelectedDishes] = useState<Dish[]>([]);
  const [visibleCount, setVisibleCount] = useState(6);

  const getDishesForCity = (city: string): Dish[] => {
    const cityLower = city.toLowerCase();
    
    const dishData: { [key: string]: Dish[] } = {
      hyderabad: [
        { id: '1', name: 'Hyderabadi Biryani', type: 'Main Course', price_range: '₹300-600', description: 'Aromatic basmati rice cooked with tender mutton/chicken in traditional dum style', best_places: ['Paradise', 'Bawarchi', 'Shah Ghouse'], spice_level: 'Medium' },
        { id: '2', name: 'Haleem', type: 'Main Course', price_range: '₹80-150', description: 'Slow-cooked lentil and meat stew, especially popular during Ramadan', best_places: ['Pista House', 'Sarvi Restaurant', 'Hotel Shadab'], spice_level: 'Medium' },
        { id: '3', name: 'Hyderabadi Marag', type: 'Soup', price_range: '₹120-200', description: 'Traditional mutton soup with aromatic spices', best_places: ['Hotel Shadab', 'Alpha Hotel', 'Jewel of Nizam'], spice_level: 'Mild' },
        { id: '4', name: 'Osmania Biscuit', type: 'Snack', price_range: '₹20-40', description: 'Sweet and salty biscuits perfect with Irani chai', best_places: ['Subhan Bakery', 'Karachi Bakery', 'Nimrah Cafe'], spice_level: 'Mild' },
        { id: '5', name: 'Irani Chai', type: 'Beverage', price_range: '₹15-30', description: 'Strong tea served with milk and sugar in traditional Irani style', best_places: ['Nimrah Cafe', 'Grand Hotel Hyderabad', 'Char Minar Restaurant'], spice_level: 'Mild' },
        { id: '6', name: 'Keema Samosa', type: 'Snack', price_range: '₹40-70', description: 'Crispy pastry filled with spiced minced meat', best_places: ['Nimrah Cafe', 'Hotel Rumaan', 'Cafe Niloufer'], spice_level: 'Spicy' },
        { id: '7', name: 'Sheer Khurma', type: 'Dessert', price_range: '₹60-100', description: 'Sweet vermicelli pudding with milk, dates and nuts', best_places: ['Hotel Shadab', 'Paradise', 'Pista House'], spice_level: 'Mild' },
        { id: '8', name: 'Lukhmi', type: 'Snack', price_range: '₹50-80', description: 'Square-shaped pastry filled with keema and boiled eggs', best_places: ['Hotel Shadab', 'Alpha Hotel', 'Meridian Restaurant'], spice_level: 'Medium' },
        { id: '9', name: 'Qubani ka Meetha', type: 'Dessert', price_range: '₹80-120', description: 'Sweet apricot dessert served with cream or custard', best_places: ['Paradise', 'Hotel Shadab', 'Bawarchi'], spice_level: 'Mild' },
        { id: '10', name: 'Chakna', type: 'Appetizer', price_range: '₹100-200', description: 'Spicy mutton fry served as appetizer', best_places: ['Bawarchi', 'Shah Ghouse', 'Paradise'], spice_level: 'Spicy' }
      ],
      chandigarh: [
        { id: '1', name: 'Butter Chicken', type: 'Main Course', price_range: '₹250-400', description: 'Creamy tomato-based chicken curry with rich flavor', best_places: ['Pal Dhaba', 'Ghazal Restaurant', 'Bharawan Da Dhaba'], spice_level: 'Medium' },
        { id: '2', name: 'Chole Bhature', type: 'Main Course', price_range: '₹80-150', description: 'Spicy chickpea curry with deep-fried bread', best_places: ['Sita Ram Diwan Chand', 'Kulcha Land', 'Bharawan Da Dhaba'], spice_level: 'Spicy' },
        { id: '3', name: 'Amritsari Kulcha', type: 'Bread', price_range: '₹60-120', description: 'Stuffed bread with potato, paneer or mixed vegetables', best_places: ['Kulcha Land', 'Pal Dhaba', 'Kesar Da Dhaba'], spice_level: 'Medium' },
        { id: '4', name: 'Lassi', type: 'Beverage', price_range: '₹40-80', description: 'Traditional yogurt-based drink, sweet or salty', best_places: ['Gian Chand Lassi Wala', 'Ahuja Lassi', 'Bharawan Da Dhaba'], spice_level: 'Mild' },
        { id: '5', name: 'Rajma Chawal', type: 'Main Course', price_range: '₹100-180', description: 'Red kidney beans curry served with steamed rice', best_places: ['Pal Dhaba', 'Kesar Da Dhaba', 'Gopal Sweets'], spice_level: 'Medium' },
        { id: '6', name: 'Sarson da Saag with Makki di Roti', type: 'Main Course', price_range: '₹120-200', description: 'Mustard greens curry with corn flour flatbread', best_places: ['Bharawan Da Dhaba', 'Pal Dhaba', 'Kesar Da Dhaba'], spice_level: 'Medium' },
        { id: '7', name: 'Patiala Peg', type: 'Beverage', price_range: '₹200-500', description: 'Large measure of whisky, originated in Patiala', best_places: ['Hotel bars', 'Clubs', 'Licensed restaurants'], spice_level: 'Mild' },
        { id: '8', name: 'Pinni', type: 'Sweet', price_range: '₹30-60', description: 'Traditional Punjabi sweet made with flour, ghee and jaggery', best_places: ['Gopal Sweets', 'Novelty Sweets', 'Kesar Da Dhaba'], spice_level: 'Mild' },
        { id: '9', name: 'Tandoori Chicken', type: 'Main Course', price_range: '₹300-500', description: 'Chicken marinated in yogurt and spices, cooked in tandoor', best_places: ['Ghazal Restaurant', 'Pal Dhaba', 'Bharawan Da Dhaba'], spice_level: 'Spicy' },
        { id: '10', name: 'Kulfi', type: 'Dessert', price_range: '₹40-80', description: 'Traditional Indian ice cream with cardamom and pistachios', best_places: ['Gian Chand Lassi Wala', 'Gopal Sweets', 'Street vendors'], spice_level: 'Mild' }
      ],
      indore: [
        { id: '1', name: 'Poha Jalebi', type: 'Breakfast', price_range: '₹40-80', description: 'Flattened rice with onions served with sweet jalebi', best_places: ['Joshi Dada Poha', 'Manik Chandra Jain & Sons', 'Sarafa Bazaar'], spice_level: 'Mild' },
        { id: '2', name: 'Indori Kachori', type: 'Snack', price_range: '₹30-60', description: 'Deep-fried pastry filled with spiced dal and served with chutneys', best_places: ['Sarafa Bazaar', 'Chappan Dukan', 'Joshi Dada Poha'], spice_level: 'Spicy' },
        { id: '3', name: 'Dahi Vada', type: 'Snack', price_range: '₹40-70', description: 'Lentil dumplings soaked in yogurt with sweet and tangy chutneys', best_places: ['Sarafa Bazaar', 'Chappan Dukan', 'Guru Kripa'], spice_level: 'Medium' },
        { id: '4', name: 'Garadu', type: 'Street Food', price_range: '₹30-50', description: 'Fried sweet potato cubes with spices and chutneys', best_places: ['Sarafa Bazaar', 'Chappan Dukan', 'Street vendors'], spice_level: 'Spicy' },
        { id: '5', name: 'Bhutte ka Kees', type: 'Snack', price_range: '₹50-80', description: 'Grated corn cooked with milk, spices and garnished with coriander', best_places: ['Sarafa Bazaar', 'Chappan Dukan', 'Vijay Chaat House'], spice_level: 'Medium' },
        { id: '6', name: 'Indori Namkeen', type: 'Snack', price_range: '₹100-200/kg', description: 'Variety of savory snacks unique to Indore', best_places: ['Ratlami Sev Bhandar', 'Shree Krishna Namkeen', 'Gangwal Sweets'], spice_level: 'Spicy' },
        { id: '7', name: 'Malpua Rabri', type: 'Dessert', price_range: '₹60-100', description: 'Sweet pancakes served with thickened sweetened milk', best_places: ['Sarafa Bazaar', 'Guru Kripa', 'Apna Sweets'], spice_level: 'Mild' },
        { id: '8', name: 'Sabudana Khichdi', type: 'Main Course', price_range: '₹50-90', description: 'Tapioca pearl preparation with peanuts and potatoes', best_places: ['Chappan Dukan', 'Guru Kripa', 'Local vendors'], spice_level: 'Medium' },
        { id: '9', name: 'Shikanji', type: 'Beverage', price_range: '₹20-40', description: 'Spiced lemonade with black salt and cumin', best_places: ['Sarafa Bazaar', 'Chappan Dukan', 'Street vendors'], spice_level: 'Mild' },
        { id: '10', name: 'Khopra Pak', type: 'Sweet', price_range: '₹200-300/kg', description: 'Traditional sweet made with coconut and sugar', best_places: ['Apna Sweets', 'Gangwal Sweets', 'Guru Kripa'], spice_level: 'Mild' }
      ],
      nagpur: [
        { id: '1', name: 'Nagpur Orange', type: 'Fruit', price_range: '₹100-200/kg', description: 'World-famous sweet and juicy oranges', best_places: ['Local markets', 'Orange vendors', 'Fruit stalls'], spice_level: 'Mild' },
        { id: '2', name: 'Tarri Poha', type: 'Breakfast', price_range: '₹30-60', description: 'Flattened rice served with spicy curry (tarri)', best_places: ['Haldiram\'s', 'Local vendors', 'Shree Krishna'], spice_level: 'Medium' },
        { id: '3', name: 'Patodi', type: 'Snack', price_range: '₹40-80', description: 'Gram flour rolls cooked in spicy curry', best_places: ['Haldiram\'s', 'Shree Krishna', 'Local restaurants'], spice_level: 'Spicy' },
        { id: '4', name: 'Nagpuri Mutton Curry', type: 'Main Course', price_range: '₹200-350', description: 'Spicy mutton curry with traditional Vidarbha flavors', best_places: ['Tuli Imperial', 'Hotel Hardeo', 'Local restaurants'], spice_level: 'Very Spicy' },
        { id: '5', name: 'Saoji Chicken', type: 'Main Course', price_range: '₹150-300', description: 'Fiery chicken curry from Saoji community', best_places: ['Nandanvan Saoji', 'Rajkamal Saoji', 'Ameya Saoji'], spice_level: 'Very Spicy' },
        { id: '6', name: 'Orange Barfi', type: 'Sweet', price_range: '₹250-400/kg', description: 'Traditional sweet made with orange flavor', best_places: ['Chitale Bandhu', 'Haldiram\'s', 'Sweet shops'], spice_level: 'Mild' },
        { id: '7', name: 'Zunka Bhakar', type: 'Main Course', price_range: '₹80-120', description: 'Gram flour curry with jowar flatbread', best_places: ['Local restaurants', 'Shree Krishna', 'Hotel Hardeo'], spice_level: 'Medium' },
        { id: '8', name: 'Puran Poli', type: 'Sweet Bread', price_range: '₹60-100', description: 'Sweet flatbread stuffed with jaggery and lentils', best_places: ['Chitale Bandhu', 'Haldiram\'s', 'Home-style restaurants'], spice_level: 'Mild' },
        { id: '9', name: 'Kokum Sherbet', type: 'Beverage', price_range: '₹30-50', description: 'Refreshing drink made from kokum fruit', best_places: ['Juice centers', 'Restaurants', 'Street vendors'], spice_level: 'Mild' },
        { id: '10', name: 'Kachori Sabzi', type: 'Breakfast', price_range: '₹40-70', description: 'Spiced kachori served with potato curry', best_places: ['Local vendors', 'Haldiram\'s', 'Morning stalls'], spice_level: 'Spicy' }
      ],
      vadodara: [
        { id: '1', name: 'Gujarati Thali', type: 'Main Course', price_range: '₹150-300', description: 'Complete meal with variety of Gujarati dishes, unlimited servings', best_places: ['Mandap Restaurant', 'Sankalp', 'Rajwadu'], spice_level: 'Medium' },
        { id: '2', name: 'Khaman Dhokla', type: 'Snack', price_range: '₹40-80', description: 'Steamed fermented chickpea flour cake with chutneys', best_places: ['Das Khaman', 'Anand Sweets', 'Local vendors'], spice_level: 'Mild' },
        { id: '3', name: 'Fafda Jalebi', type: 'Breakfast', price_range: '₹60-100', description: 'Crispy gram flour strips with sweet spiral-shaped jalebi', best_places: ['Das Khaman', 'Jalaram Khaman House', 'Street vendors'], spice_level: 'Medium' },
        { id: '4', name: 'Sev Mamra', type: 'Snack', price_range: '₹30-60', description: 'Spicy mixture of puffed rice, sev and vegetables', best_places: ['Street vendors', 'Snack shops', 'Beach vendors'], spice_level: 'Spicy' },
        { id: '5', name: 'Undhiyu', type: 'Main Course', price_range: '₹120-200', description: 'Mixed vegetable curry with purple yam, beans and spices', best_places: ['Rajwadu', 'Sankalp', 'Mandap Restaurant'], spice_level: 'Medium' },
        { id: '6', name: 'Khandvi', type: 'Snack', price_range: '₹80-120', description: 'Rolled gram flour sheets with mustard seed tempering', best_places: ['Anand Sweets', 'Das Khaman', 'Jalaram Khaman House'], spice_level: 'Mild' },
        { id: '7', name: 'Shrikhand', type: 'Dessert', price_range: '₹60-100', description: 'Sweetened strained yogurt flavored with cardamom and saffron', best_places: ['Anand Sweets', 'Milk parlors', 'Sweet shops'], spice_level: 'Mild' },
        { id: '8', name: 'Locho', type: 'Snack', price_range: '₹40-70', description: 'Steamed spiced gram flour topped with farsan and chutneys', best_places: ['Local vendors', 'Das Khaman', 'Street food stalls'], spice_level: 'Medium' },
        { id: '9', name: 'Handvo', type: 'Snack', price_range: '₹50-90', description: 'Savory cake made from mixed lentils and rice', best_places: ['Anand Sweets', 'Home-style restaurants', 'Local vendors'], spice_level: 'Medium' },
        { id: '10', name: 'Masala Chai', type: 'Beverage', price_range: '₹10-25', description: 'Spiced tea with milk, perfect with Gujarati snacks', best_places: ['Tea stalls', 'Restaurants', 'Street vendors'], spice_level: 'Mild' }
      ],
      agra: [
        { id: '1', name: 'Agra ka Petha', type: 'Sweet', price_range: '₹200-500/kg', description: 'Famous translucent candy made from ash gourd', best_places: ['Panchhi Petha', 'Panchi Petha Store', 'Bhimsain Petha Wala'], spice_level: 'Mild' },
        { id: '2', name: 'Mughlai Biryani', type: 'Main Course', price_range: '₹200-400', description: 'Aromatic rice dish with meat, cooked in Mughlai style', best_places: ['Pinch of Spice', 'Joney\'s Place', 'Dasaprakash'], spice_level: 'Medium' },
        { id: '3', name: 'Agra Dalmoth', type: 'Snack', price_range: '₹150-300/kg', description: 'Spicy mixture of lentils, nuts and spices', best_places: ['Local markets', 'Namkeen shops', 'Street vendors'], spice_level: 'Spicy' },
        { id: '4', name: 'Bedai Kachori', type: 'Breakfast', price_range: '₹40-80', description: 'Spiced deep-fried bread served with potato curry', best_places: ['Deviram Bedai Kachori', 'Panchi Petha Store', 'Local vendors'], spice_level: 'Spicy' },
        { id: '5', name: 'Chaat', type: 'Street Food', price_range: '₹30-70', description: 'Variety of spicy street foods with chutneys', best_places: ['Sadar Bazaar', 'Kinari Bazaar', 'Street vendors'], spice_level: 'Spicy' },
        { id: '6', name: 'Gajak', type: 'Sweet', price_range: '₹100-200/kg', description: 'Sesame and jaggery brittle, winter specialty', best_places: ['Panchi Petha Store', 'Sweet shops', 'Local markets'], spice_level: 'Mild' },
        { id: '7', name: 'Paratha', type: 'Bread', price_range: '₹50-100', description: 'Stuffed flatbread with various fillings', best_places: ['Paratha Gali', 'Local dhabas', 'Street vendors'], spice_level: 'Medium' },
        { id: '8', name: 'Mutton Korma', type: 'Main Course', price_range: '₹250-400', description: 'Rich mutton curry with aromatic spices', best_places: ['Pinch of Spice', 'Joney\'s Place', 'Mughal restaurants'], spice_level: 'Medium' },
        { id: '9', name: 'Kulfi Faluda', type: 'Dessert', price_range: '₹50-100', description: 'Traditional ice cream with vermicelli and rose syrup', best_places: ['Street vendors', 'Sweet shops', 'Restaurants'], spice_level: 'Mild' },
        { id: '10', name: 'Rabri', type: 'Dessert', price_range: '₹80-150', description: 'Thickened sweetened milk with nuts', best_places: ['Sweet shops', 'Restaurants', 'Panchi Petha Store'], spice_level: 'Mild' }
      ],
      varanasi: [
        { id: '1', name: 'Banarasi Paan', type: 'Digestive', price_range: '₹20-100', description: 'Betel leaf preparation with various fillings, a cultural tradition', best_places: ['Keshav Paan Bhandar', 'Pradip Paan Shop', 'Vishwanath Gali'], spice_level: 'Medium' },
        { id: '2', name: 'Kachori Sabzi', type: 'Breakfast', price_range: '₹30-60', description: 'Spicy deep-fried pastry served with potato curry', best_places: ['Ram Bhandar', 'Ksheer Sagar', 'Local vendors'], spice_level: 'Spicy' },
        { id: '3', name: 'Banarasi Thandai', type: 'Beverage', price_range: '₹40-80', description: 'Cold drink made with milk, nuts, and spices', best_places: ['Blue Lassi Shop', 'Godowlia market', 'Festival vendors'], spice_level: 'Mild' },
        { id: '4', name: 'Chhole Bhature', type: 'Main Course', price_range: '₹80-150', description: 'Spicy chickpea curry with fried bread', best_places: ['Keshav Chaat Bhandar', 'Deena Chaat Bhandar', 'Local dhabas'], spice_level: 'Spicy' },
        { id: '5', name: 'Malaiyo', type: 'Dessert', price_range: '₹30-60', description: 'Winter delicacy made from milk foam, only available in winter', best_places: ['Street vendors (winter only)', 'Ksheer Sagar', 'Local sweet shops'], spice_level: 'Mild' },
        { id: '6', name: 'Banarasi Lassi', type: 'Beverage', price_range: '₹40-80', description: 'Thick yogurt drink served in kulhads (clay pots)', best_places: ['Blue Lassi Shop', 'Ramu Lassi Shop', 'Dashashwamedh Ghat area'], spice_level: 'Mild' },
        { id: '7', name: 'Tamatar Chaat', type: 'Street Food', price_range: '₹30-50', description: 'Tangy tomato-based street food with spices', best_places: ['Dashashwamedh Ghat', 'Godowlia market', 'Street vendors'], spice_level: 'Spicy' },
        { id: '8', name: 'Banarasi Dum Aloo', type: 'Main Course', price_range: '₹100-180', description: 'Potato curry cooked in aromatic spices', best_places: ['Keshav Chaat Bhandar', 'Local restaurants', 'Ganga view restaurants'], spice_level: 'Medium' },
        { id: '9', name: 'Jalebi', type: 'Sweet', price_range: '₹150-250/kg', description: 'Spiral-shaped sweet soaked in sugar syrup', best_places: ['Ram Bhandar', 'Ksheer Sagar', 'Sweet shops'], spice_level: 'Mild' },
        { id: '10', name: 'Baati Chokha', type: 'Main Course', price_range: '₹80-150', description: 'Baked wheat dough balls with mashed vegetables', best_places: ['Local restaurants', 'Dhabas', 'Traditional eateries'], spice_level: 'Medium' }
      ],
      amritsar: [
        { id: '1', name: 'Amritsari Kulcha', type: 'Bread', price_range: '₹60-120', description: 'Stuffed flatbread baked in tandoor, served with chole', best_places: ['Kulcha Land', 'Bharawan Da Dhaba', 'Kesar Da Dhaba'], spice_level: 'Medium' },
        { id: '2', name: 'Amritsari Fish', type: 'Appetizer', price_range: '₹200-350', description: 'Crispy fried fish with gram flour coating and spices', best_places: ['Makhan Fish Corner', 'Beera Chicken House', 'Local dhabas'], spice_level: 'Spicy' },
        { id: '3', name: 'Chole Bhature', type: 'Main Course', price_range: '₹80-150', description: 'Spicy chickpea curry with large fried bread', best_places: ['Bharawan Da Dhaba', 'Kesar Da Dhaba', 'Gurdas Ram Jalebi Wala'], spice_level: 'Spicy' },
        { id: '4', name: 'Punjabi Lassi', type: 'Beverage', price_range: '₹40-80', description: 'Thick sweet yogurt drink, often topped with cream', best_places: ['Gian Chand Lassi Wala', 'Ahuja Lassi', 'Golden Temple complex'], spice_level: 'Mild' },
        { id: '5', name: 'Amritsari Papad Wadian', type: 'Side Dish', price_range: '₹50-100', description: 'Sun-dried lentil dumplings, fried and served as side', best_places: ['Local markets', 'Traditional restaurants', 'Bharawan Da Dhaba'], spice_level: 'Medium' },
        { id: '6', name: 'Sarson da Saag', type: 'Main Course', price_range: '₹120-200', description: 'Mustard greens curry served with makki di roti', best_places: ['Bharawan Da Dhaba', 'Kesar Da Dhaba', 'Traditional Punjabi restaurants'], spice_level: 'Medium' },
        { id: '7', name: 'Jalebi', type: 'Sweet', price_range: '₹150-250/kg', description: 'Crispy spiral sweets soaked in sugar syrup', best_places: ['Gurdas Ram Jalebi Wala', 'Sweet shops', 'Local vendors'], spice_level: 'Mild' },
        { id: '8', name: 'Punjabi Kadhi', type: 'Curry', price_range: '₹80-140', description: 'Yogurt-based curry with gram flour dumplings', best_places: ['Bharawan Da Dhaba', 'Home-style restaurants', 'Local dhabas'], spice_level: 'Medium' },
        { id: '9', name: 'Peda', type: 'Sweet', price_range: '₹200-350/kg', description: 'Milk-based sweet, soft and creamy', best_places: ['Sweet shops', 'Local vendors', 'Gurdas Ram Jalebi Wala'], spice_level: 'Mild' },
        { id: '10', name: 'Phirni', type: 'Dessert', price_range: '₹60-100', description: 'Rice pudding served in earthen pots', best_places: ['Sweet shops', 'Traditional restaurants', 'Festival vendors'], spice_level: 'Mild' }
      ]
    };

    return dishData[cityLower] || [
      { id: '1', name: `${city} Special Curry`, type: 'Main Course', price_range: '₹150-250', description: 'Traditional local curry with authentic spices', best_places: ['Local restaurants', 'Traditional eateries'], spice_level: 'Medium' },
      { id: '2', name: `${city} Street Food`, type: 'Snack', price_range: '₹40-80', description: 'Popular local street food delicacy', best_places: ['Street vendors', 'Local markets'], spice_level: 'Spicy' },
      { id: '3', name: `${city} Sweet`, type: 'Dessert', price_range: '₹200-350/kg', description: 'Traditional sweet preparation of the region', best_places: ['Sweet shops', 'Local vendors'], spice_level: 'Mild' },
      { id: '4', name: `${city} Tea`, type: 'Beverage', price_range: '₹15-30', description: 'Local style tea preparation', best_places: ['Tea stalls', 'Local cafes'], spice_level: 'Mild' },
      { id: '5', name: `${city} Bread`, type: 'Bread', price_range: '₹30-60', description: 'Regional bread variety', best_places: ['Local bakeries', 'Traditional eateries'], spice_level: 'Mild' },
      { id: '6', name: `${city} Beverage`, type: 'Beverage', price_range: '₹30-60', description: 'Refreshing local drink', best_places: ['Juice centers', 'Local vendors'], spice_level: 'Mild' }
    ];
  };

  useEffect(() => {
    const cityDishes = getDishesForCity(tripData.destination);
    
    setTimeout(() => {
      setDishes(cityDishes);
      setLoading(false);
    }, 1000);
  }, [tripData]);

  const handleSelectDish = (dish: Dish) => {
    if (selectedDishes.find(d => d.id === dish.id)) {
      setSelectedDishes(selectedDishes.filter(d => d.id !== dish.id));
    } else {
      setSelectedDishes([...selectedDishes, dish]);
    }
  };

  const handleNext = () => {
    console.log('Selected dishes:', selectedDishes);
    onNext();
  };

  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + 6, dishes.length));
  };

  const getSpiceLevelColor = (level: string) => {
    switch (level) {
      case 'Mild': return 'bg-green-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Spicy': return 'bg-orange-500';
      case 'Very Spicy': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  if (loading) {
    return (
      <Card className="shadow-xl border-t-4 border-t-orange-500">
        <CardHeader>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent">
            Finding Famous Dishes in {tripData.destination}...
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
          Discover {dishes.length} authentic local delicacies
        </p>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dishes.slice(0, visibleCount).map((dish) => (
            <Card 
              key={dish.id} 
              className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 ${
                selectedDishes.find(d => d.id === dish.id)
                  ? 'ring-2 ring-orange-500 bg-gradient-to-br from-orange-50 to-blue-50' 
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => handleSelectDish(dish)}
            >
              <div className="p-1">
                <div className="bg-gradient-to-br from-orange-100 to-blue-100 p-4 rounded-t-lg">
                  <div className="flex justify-between items-center mb-2">
                    <Badge className="bg-purple-500 hover:bg-purple-600 text-white font-semibold">
                      {dish.type}
                    </Badge>
                    <Badge className={`${getSpiceLevelColor(dish.spice_level)} text-white font-semibold`}>
                      {dish.spice_level}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-2 text-gray-800">{dish.name}</h3>
                <p className="text-sm mb-3 font-medium text-gray-700">{dish.description}</p>
                <div className="flex items-center gap-2 mb-3">
                  <IndianRupee className="h-4 w-4 text-green-600" />
                  <span className="font-semibold text-green-600">{dish.price_range}</span>
                </div>
                <div className="mb-4">
                  <h4 className="font-semibold text-sm text-gray-800 mb-2">Best Places:</h4>
                  <div className="flex flex-wrap gap-1">
                    {dish.best_places.slice(0, 2).map((place, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        <MapPin className="h-3 w-3 mr-1" />
                        {place}
                      </Badge>
                    ))}
                    {dish.best_places.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{dish.best_places.length - 2} more
                      </Badge>
                    )}
                  </div>
                </div>
                <Button
                  className={`w-full font-semibold ${
                    selectedDishes.find(d => d.id === dish.id)
                      ? 'bg-gradient-to-r from-orange-500 to-blue-600 hover:from-orange-600 hover:to-blue-700 text-white'
                      : 'border-2 border-orange-200 text-orange-600 hover:bg-orange-50'
                  }`}
                  variant={selectedDishes.find(d => d.id === dish.id) ? "default" : "outline"}
                >
                  {selectedDishes.find(d => d.id === dish.id) ? '✓ Must Try!' : 'Add to Food List'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {visibleCount < dishes.length && (
          <div className="text-center mt-8">
            <Button 
              className="bg-gradient-to-r from-orange-500 to-blue-600 hover:from-orange-600 hover:to-blue-700 text-white font-semibold px-8 py-3"
              onClick={handleLoadMore}
            >
              Load More Dishes ({dishes.length - visibleCount} more available)
            </Button>
          </div>
        )}

        {selectedDishes.length > 0 && (
          <div className="mt-8 p-6 bg-gradient-to-r from-orange-50 to-blue-50 rounded-xl border-2 border-orange-200">
            <h4 className="font-bold text-xl mb-4 text-gray-800">Must-Try Dishes ({selectedDishes.length}):</h4>
            <div className="grid md:grid-cols-2 gap-4">
              {selectedDishes.map((dish) => (
                <div key={dish.id} className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <div>
                    <span className="font-semibold text-gray-800">{dish.name}</span>
                    <p className="text-sm text-gray-600">{dish.type}</p>
                  </div>
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    {dish.price_range}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-end mt-8">
          <Button onClick={handleNext} className="bg-gradient-to-r from-orange-500 to-blue-600 hover:from-orange-600 hover:to-blue-700 text-white font-bold px-8 py-3 text-lg">
            Next: Culture & Traditions
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
