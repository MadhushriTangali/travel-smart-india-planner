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
        { id: '1', name: 'Vada Pav', price: '₹15-30', type: 'Snack', description: 'Spicy potato fritter sandwiched in a bun', rating: 4.5, restaurant: 'Anand Stall' },
        { id: '2', name: 'Pav Bhaji', price: '₹50-100', type: 'Main Course', description: 'Spiced vegetable mash served with buttered bread', rating: 4.6, restaurant: 'Sardar Pav Bhaji' },
        { id: '3', name: 'Bombay Sandwich', price: '₹40-70', type: 'Snack', description: 'Multi-layered sandwich with chutneys and veggies', rating: 4.3, restaurant: 'Kailash Parbat' },
        { id: '4', name: 'Bhel Puri', price: '₹30-60', type: 'Snack', description: 'Puffed rice with tangy tamarind sauce and sev', rating: 4.4, restaurant: 'Juhu Beach Stalls' }
      ],
      delhi: [
        { id: '1', name: 'Chole Bhature', price: '₹80-150', type: 'Main Course', description: 'Spicy chickpeas with fried bread', rating: 4.7, restaurant: 'Sita Ram Diwan Chand' },
        { id: '2', name: 'Butter Chicken', price: '₹200-350', type: 'Main Course', description: 'Creamy tomato-based chicken curry', rating: 4.8, restaurant: 'Moti Mahal' },
        { id: '3', name: 'Paratha', price: '₹50-100', type: 'Main Course', description: 'Stuffed flatbread with various fillings', rating: 4.5, restaurant: 'Paranthe Wali Gali' },
        { id: '4', name: 'Jalebi', price: '₹100-200/kg', type: 'Sweet', description: 'Crispy spirals soaked in sugar syrup', rating: 4.6, restaurant: 'Old Famous Jalebi Wala' }
      ],
      bangalore: [
        { id: '1', name: 'Masala Dosa', price: '₹60-120', type: 'Main Course', description: 'Crispy rice crepe filled with spiced potatoes', rating: 4.7, restaurant: 'MTR' },
        { id: '2', name: 'Idli Sambhar', price: '₹40-80', type: 'Breakfast', description: 'Steamed rice cakes with lentil stew', rating: 4.5, restaurant: 'Vidyarthi Bhavan' },
        { id: '3', name: 'Bisi Bele Bath', price: '₹80-150', type: 'Main Course', description: 'Spiced lentil rice with vegetables', rating: 4.4, restaurant: 'Central Tiffin Room' },
        { id: '4', name: 'Rava Kesari', price: '₹30-60', type: 'Dessert', description: 'Semolina sweet pudding with saffron', rating: 4.3, restaurant: 'Local sweet shops' }
      ],
      chennai: [
        { id: '1', name: 'Idli', price: '₹30-60', type: 'Breakfast', description: 'Steamed rice cakes', rating: 4.6, restaurant: 'Murugan Idli Shop' },
        { id: '2', name: 'Dosa', price: '₹50-100', type: 'Main Course', description: 'Thin crispy rice crepe', rating: 4.5, restaurant: 'Sangeetha' },
        { id: '3', name: 'Filter Coffee', price: '₹20-40', type: 'Beverage', description: 'Strong South Indian coffee', rating: 4.7, restaurant: 'Local coffee shops' },
        { id: '4', name: 'Vada', price: '₹30-60', type: 'Snack', description: 'Fried lentil doughnut', rating: 4.4, restaurant: 'Local street vendors' }
      ],
      kolkata: [
        { id: '1', name: 'Rosogolla', price: '₹200-400/kg', type: 'Sweet', description: 'Soft spongy cheese balls in syrup', rating: 4.8, restaurant: 'K.C. Das' },
        { id: '2', name: 'Mishti Doi', price: '₹50-100', type: 'Dessert', description: 'Sweetened fermented yogurt', rating: 4.6, restaurant: 'Balaram Mullick & Radharaman Mullick' },
        { id: '3', name: 'Kathi Roll', price: '₹80-150', type: 'Snack', description: 'Wrap filled with spiced meat or veggies', rating: 4.5, restaurant: 'Nizam\'s' },
        { id: '4', name: 'Puchka', price: '₹30-60', type: 'Snack', description: 'Crispy hollow balls filled with spicy water', rating: 4.7, restaurant: 'Street vendors' }
      ],
      hyderabad: [
        { id: '1', name: 'Hyderabadi Biryani', price: '₹200-400', type: 'Main Course', description: 'Fragrant rice and meat dish', rating: 4.9, restaurant: 'Paradise' },
        { id: '2', name: 'Haleem', price: '₹150-300', type: 'Main Course', description: 'Slow-cooked meat and lentil stew', rating: 4.8, restaurant: 'Pista House' },
        { id: '3', name: 'Double Ka Meetha', price: '₹80-150', type: 'Dessert', description: 'Bread pudding with dry fruits', rating: 4.6, restaurant: 'Shadab' },
        { id: '4', name: 'Mirchi Ka Salan', price: '₹100-200', type: 'Side Dish', description: 'Spicy chili curry', rating: 4.5, restaurant: 'Hotel Shadab' }
      ],
      pune: [
        { id: '1', name: 'Misal Pav', price: '₹50-100', type: 'Main Course', description: 'Spicy sprouted beans curry with bread', rating: 4.7, restaurant: 'Bedekar Tea Stall' },
        { id: '2', name: 'Vada Pav', price: '₹15-30', type: 'Snack', description: 'Potato fritter sandwich', rating: 4.5, restaurant: 'Anand Stall' },
        { id: '3', name: 'Bhakarwadi', price: '₹100-200/kg', type: 'Snack', description: 'Spicy fried snack rolls', rating: 4.4, restaurant: 'Chitale Bandhu' },
        { id: '4', name: 'Puran Poli', price: '₹50-100', type: 'Sweet', description: 'Sweet stuffed flatbread', rating: 4.6, restaurant: 'Local sweet shops' }
      ],
      ahmedabad: [
        { id: '1', name: 'Dhokla', price: '₹30-60', type: 'Snack', description: 'Steamed fermented gram flour cake', rating: 4.7, restaurant: 'Manek Chowk stalls' },
        { id: '2', name: 'Khandvi', price: '₹40-80', type: 'Snack', description: 'Rolled gram flour snack', rating: 4.5, restaurant: 'Local sweet shops' },
        { id: '3', name: 'Undhiyu', price: '₹150-300', type: 'Main Course', description: 'Mixed vegetable curry', rating: 4.6, restaurant: 'Gordhan Thal' },
        { id: '4', name: 'Fafda Jalebi', price: '₹50-100', type: 'Snack', description: 'Crispy snack with sweet jalebi', rating: 4.4, restaurant: 'Local street vendors' }
      ],
      jaipur: [
        { id: '1', name: 'Dal Baati Churma', price: '₹100-200', type: 'Main Course', description: 'Lentils with baked wheat balls and sweet', rating: 4.8, restaurant: 'Laxmi Misthan Bhandar' },
        { id: '2', name: 'Ghevar', price: '₹80-150', type: 'Sweet', description: 'Honeycomb-like sweet cake', rating: 4.6, restaurant: 'Rawat Misthan Bhandar' },
        { id: '3', name: 'Ker Sangri', price: '₹150-250', type: 'Side Dish', description: 'Desert beans and berries curry', rating: 4.4, restaurant: 'Local eateries' },
        { id: '4', name: 'Pyaaz Kachori', price: '₹30-60', type: 'Snack', description: 'Spiced onion-filled fried pastry', rating: 4.5, restaurant: 'Pyaaz Kachori House' }
      ],
      lucknow: [
        { id: '1', name: 'Tunday Kababi', price: '₹200-400', type: 'Main Course', description: 'Soft minced meat kebabs', rating: 4.9, restaurant: 'Tunday Kababi' },
        { id: '2', name: 'Galouti Kabab', price: '₹150-300', type: 'Main Course', description: 'Melt-in-mouth spiced kebabs', rating: 4.8, restaurant: 'Rahim\'s' },
        { id: '3', name: 'Sheermal', price: '₹50-100', type: 'Bread', description: 'Sweet saffron-flavored flatbread', rating: 4.5, restaurant: 'Local bakeries' },
        { id: '4', name: 'Kulfi', price: '₹40-80', type: 'Dessert', description: 'Traditional Indian ice cream', rating: 4.6, restaurant: 'Local sweet shops' }
      ],
      bhopal: [
        { id: '1', name: 'Biryani', price: '₹150-300', type: 'Main Course', description: 'Spiced rice and meat dish', rating: 4.5, restaurant: 'Bhopal Biryani House' },
        { id: '2', name: 'Poha', price: '₹30-60', type: 'Breakfast', description: 'Flattened rice with spices and peanuts', rating: 4.4, restaurant: 'Local street vendors' },
        { id: '3', name: 'Sattu', price: '₹40-80', type: 'Snack', description: 'Roasted gram flour drink or snack', rating: 4.3, restaurant: 'Local shops' },
        { id: '4', name: 'Jalebi', price: '₹100-200/kg', type: 'Sweet', description: 'Sweet fried spirals', rating: 4.5, restaurant: 'Local sweet shops' }
      ],
      chandigarh: [
        { id: '1', name: 'Chole Bhature', price: '₹80-150', type: 'Main Course', description: 'Spicy chickpeas with fried bread', rating: 4.7, restaurant: 'Black Lotus' },
        { id: '2', name: 'Butter Chicken', price: '₹200-350', type: 'Main Course', description: 'Creamy tomato-based chicken curry', rating: 4.6, restaurant: 'Whistling Duck' },
        { id: '3', name: 'Rajma Chawal', price: '₹100-200', type: 'Main Course', description: 'Kidney beans curry with rice', rating: 4.4, restaurant: 'Indian Coffee House' },
        { id: '4', name: 'Lassi', price: '₹40-80', type: 'Beverage', description: 'Thick yogurt-based drink', rating: 4.5, restaurant: 'Local sweet shops' }
      ],
      indore: [
        { id: '1', name: 'Poha', price: '₹30-60', type: 'Breakfast', description: 'Flattened rice with spices and peanuts', rating: 4.6, restaurant: 'Chappan Dukan' },
        { id: '2', name: 'Bhutte Ka Kees', price: '₹40-80', type: 'Snack', description: 'Grated corn cooked with spices', rating: 4.5, restaurant: 'Local street vendors' },
        { id: '3', name: 'Sabudana Khichdi', price: '₹50-100', type: 'Snack', description: 'Sago cooked with peanuts and spices', rating: 4.4, restaurant: 'Local eateries' },
        { id: '4', name: 'Jalebi', price: '₹100-200/kg', type: 'Sweet', description: 'Sweet fried spirals', rating: 4.7, restaurant: 'Chappan Dukan' }
      ],
      nagpur: [
        { id: '1', name: 'Saoji Chicken', price: '₹200-350', type: 'Main Course', description: 'Spicy chicken curry with Saoji masala', rating: 4.7, restaurant: 'Saoji Restaurants' },
        { id: '2', name: 'Patodi Rassa', price: '₹150-300', type: 'Main Course', description: 'Gram flour rolls in spicy curry', rating: 4.5, restaurant: 'Local eateries' },
        { id: '3', name: 'Tarri Poha', price: '₹40-80', type: 'Breakfast', description: 'Flattened rice with spicy curry', rating: 4.4, restaurant: 'Local street vendors' },
        { id: '4', name: 'Orange Barfi', price: '₹100-200/kg', type: 'Sweet', description: 'Sweet made with Nagpur oranges', rating: 4.3, restaurant: 'Local sweet shops' }
      ],
      vadodara: [
        { id: '1', name: 'Sev Usal', price: '₹50-100', type: 'Snack', description: 'Spicy curry topped with sev', rating: 4.5, restaurant: 'Local street vendors' },
        { id: '2', name: 'Fafda Jalebi', price: '₹50-100', type: 'Snack', description: 'Crispy snack with sweet jalebi', rating: 4.6, restaurant: 'Local sweet shops' },
        { id: '3', name: 'Khandvi', price: '₹40-80', type: 'Snack', description: 'Rolled gram flour snack', rating: 4.4, restaurant: 'Local eateries' },
        { id: '4', name: 'Undhiyu', price: '₹150-300', type: 'Main Course', description: 'Mixed vegetable curry', rating: 4.5, restaurant: 'Local restaurants' }
      ],
      agra: [
        { id: '1', name: 'Petha', price: '₹200-400/kg', type: 'Sweet', description: 'Candied winter melon sweet', rating: 4.7, restaurant: 'Agra Petha Bhandar' },
        { id: '2', name: 'Bedai and Jalebi', price: '₹50-100', type: 'Snack', description: 'Spicy fried bread with sweet jalebi', rating: 4.5, restaurant: 'Deviram Sweets' },
        { id: '3', name: 'Dal Moth', price: '₹40-80', type: 'Snack', description: 'Spicy lentil mix', rating: 4.4, restaurant: 'Local street vendors' },
        { id: '4', name: 'Tandoori Chicken', price: '₹200-350', type: 'Main Course', description: 'Spiced grilled chicken', rating: 4.6, restaurant: 'Pinch of Spice' }
      ],
      varanasi: [
        { id: '1', name: 'Kachori Sabzi', price: '₹50-100', type: 'Snack', description: 'Spiced fried bread with curry', rating: 4.6, restaurant: 'Deena Chat Bhandar' },
        { id: '2', name: 'Banarasi Paan', price: '₹20-50', type: 'Snack', description: 'Betel leaf with sweet fillings', rating: 4.5, restaurant: 'Local paan shops' },
        { id: '3', name: 'Malaiyo', price: '₹40-80', type: 'Dessert', description: 'Winter sweet foam dessert', rating: 4.4, restaurant: 'Local sweet shops' },
        { id: '4', name: 'Lassi', price: '₹40-80', type: 'Beverage', description: 'Thick yogurt-based drink', rating: 4.5, restaurant: 'Blue Lassi Shop' }
      ],
      amritsar: [
        { id: '1', name: 'Amritsari Kulcha', price: '₹50-100', type: 'Snack', description: 'Stuffed bread with butter and chickpeas', rating: 4.8, restaurant: 'Kulcha Land' },
        { id: '2', name: 'Langar', price: 'Free', type: 'Meal', description: 'Community meal at Golden Temple', rating: 5.0, restaurant: 'Golden Temple' },
        { id: '3', name: 'Chole Bhature', price: '₹80-150', type: 'Main Course', description: 'Spicy chickpeas with fried bread', rating: 4.7, restaurant: 'Bharawan Da Dhaba' },
        { id: '4', name: 'Jalebi', price: '₹100-200/kg', type: 'Sweet', description: 'Sweet fried spirals', rating: 4.6, restaurant: 'Local sweet shops' }
      ],
      surat: [
        { id: '1', name: 'Locho', price: '₹30-50', type: 'Snack', description: 'Steamed gram flour cake served with chutneys', rating: 4.4, restaurant: 'Jani Locho House' },
        { id: '2', name: 'Ponk Vada', price: '₹25-40', type: 'Snack', description: 'Fresh corn fritters, seasonal delicacy', rating: 4.2, restaurant: 'Local street vendors' },
        { id: '3', name: 'Ghari', price: '₹200-500/kg', type: 'Sweet', description: 'Traditional sweet made with mawa and cardamom', rating: 4.5, restaurant: 'Kanhaiya Lal & Sons' },
        { id: '4', name: 'Surti Mutton Curry', price: '₹180-250', type: 'Main Course', description: 'Spicy mutton curry with unique Surati flavors', rating: 4.3, restaurant: 'Hotel Ashirwad' }
      ],
      kanpur: [
        { id: '1', name: 'Thaggu ke Laddu', price: '₹40-80/piece', type: 'Sweet', description: 'Famous sweet shop\'s signature laddus', rating: 4.6, restaurant: 'Thaggu Ke Laddu' },
        { id: '2', name: 'Kanpur Chaat', price: '₹40-80', type: 'Snack', description: 'Tangy street food with unique local flavors', rating: 4.3, restaurant: 'Bajpai Chaat House' },
        { id: '3', name: 'Basket Chaat', price: '₹60-100', type: 'Snack', description: 'Chaat served in edible potato basket', rating: 4.2, restaurant: 'Kanpur Chaat Corner' },
        { id: '4', name: 'Awadhi Biryani', price: '₹150-300', type: 'Main Course', description: 'Fragrant rice dish with meat and spices', rating: 4.4, restaurant: 'Moti Mahal Restaurant' }
      ],
      thane: [
        { id: '1', name: 'Vada Pav', price: '₹15-25', type: 'Snack', description: 'Mumbai\'s beloved potato fritter burger', rating: 4.3, restaurant: 'Anand Stall' },
        { id: '2', name: 'Misal Pav', price: '₹40-80', type: 'Main Course', description: 'Spicy sprouts curry with bread', rating: 4.4, restaurant: 'Mamledar Misal' },
        { id: '3', name: 'Solkadhi', price: '₹30-50', type: 'Drink', description: 'Kokum and coconut milk drink', rating: 4.2, restaurant: 'Konkani restaurants' },
        { id: '4', name: 'Puran Poli', price: '₹50-80', type: 'Sweet', description: 'Sweet flatbread stuffed with jaggery and lentils', rating: 4.5, restaurant: 'Shree Krishna Sweets' }
      ],
      visakhapatnam: [
        { id: '1', name: 'Pulihora', price: '₹40-80', type: 'Main Course', description: 'Tangy tamarind rice with spices', rating: 4.3, restaurant: 'Andhra meals restaurants' },
        { id: '2', name: 'Araku Coffee', price: '₹50-100', type: 'Beverage', description: 'Aromatic coffee from Araku Valley', rating: 4.6, restaurant: 'Araku Coffee House' },
        { id: '3', name: 'Bamboo Chicken', price: '₹200-350', type: 'Main Course', description: 'Chicken cooked inside bamboo stems', rating: 4.4, restaurant: 'Araku Valley restaurants' },
        { id: '4', name: 'Pootharekulu', price: '₹100-200/box', type: 'Sweet', description: 'Paper-thin sweet sheets with jaggery', rating: 4.5, restaurant: 'Athreyapuram Pootharekulu' }
      ],
      patna: [
        { id: '1', name: 'Litti Chokha', price: '₹40-80', type: 'Main Course', description: 'Roasted wheat balls with mashed vegetables', rating: 4.7, restaurant: 'Bihari restaurants' },
        { id: '2', name: 'Sattu Paratha', price: '₹50-100', type: 'Main Course', description: 'Stuffed flatbread with roasted gram flour', rating: 4.4, restaurant: 'Local dhabas' },
        { id: '3', name: 'Khaja', price: '₹100-200/kg', type: 'Sweet', description: 'Layered crispy sweet from Silao', rating: 4.5, restaurant: 'Silao Khaja shops' },
        { id: '4', name: 'Chandrakala', price: '₹80-150/kg', type: 'Sweet', description: 'Crescent-shaped sweet with khoya filling', rating: 4.3, restaurant: 'Ram Bandhu Halwai' }
      ],
      ghaziabad: [
        { id: '1', name: 'Bedmi Aloo', price: '₹40-80', type: 'Main Course', description: 'Lentil-stuffed puris with spiced potatoes', rating: 4.2, restaurant: 'Local street vendors' },
        { id: '2', name: 'Raj Kachori', price: '₹60-120', type: 'Snack', description: 'Large crispy shell filled with various chutneys', rating: 4.3, restaurant: 'Chaat corners' },
        { id: '3', name: 'Petha', price: '₹200-400/kg', type: 'Sweet', description: 'Candied winter melon sweet from nearby Agra', rating: 4.4, restaurant: 'Agra Petha Bhandar' },
        { id: '4', name: 'Paranthe', price: '₹50-100', type: 'Main Course', description: 'Stuffed flatbreads with various fillings', rating: 4.1, restaurant: 'Paranthe Wali Gali style shops' }
      ],
      ludhiana: [
        { id: '1', name: 'Makki di Roti & Sarson da Saag', price: '₹80-150', type: 'Main Course', description: 'Corn flatbread with mustard greens curry', rating: 4.6, restaurant: 'Punjabi dhabas' },
        { id: '2', name: 'Butter Chicken', price: '₹200-350', type: 'Main Course', description: 'Creamy tomato-based chicken curry', rating: 4.5, restaurant: 'Local restaurants' },
        { id: '3', name: 'Kulcha', price: '₹40-80', type: 'Bread', description: 'Stuffed bread served with chole', rating: 4.4, restaurant: 'Kulcha Land' },
        { id: '4', name: 'Jalebi', price: '₹100-200/kg', type: 'Sweet', description: 'Crispy spirals soaked in sugar syrup', rating: 4.3, restaurant: 'Om Sweets' }
      ],
      nashik: [
        { id: '1', name: 'Misal Pav', price: '₹50-100', type: 'Main Course', description: 'Spicy sprouts curry with bread', rating: 4.5, restaurant: 'Bedekar Tea Stall' },
        { id: '2', name: 'Bhel Puri', price: '₹30-60', type: 'Snack', description: 'Puffed rice salad with chutneys', rating: 4.2, restaurant: 'Street vendors' },
        { id: '3', name: 'Kande Pohe', price: '₹30-60', type: 'Breakfast', description: 'Flattened rice with onions and spices', rating: 4.3, restaurant: 'Local eateries' },
        { id: '4', name: 'Puran Poli', price: '₹60-100', type: 'Sweet', description: 'Sweet lentil-stuffed flatbread', rating: 4.4, restaurant: 'Chitale Bandhu' }
      ],
      faridabad: [
        { id: '1', name: 'Chole Bhature', price: '₹80-150', type: 'Main Course', description: 'Spiced chickpeas with fried bread', rating: 4.4, restaurant: 'Haldiram\'s' },
        { id: '2', name: 'Daulat ki Chaat', price: '₹40-80', type: 'Dessert', description: 'Frothy milk-based winter delicacy', rating: 4.5, restaurant: 'Seasonal vendors' },
        { id: '3', name: 'Paranthe', price: '₹50-120', type: 'Main Course', description: 'Stuffed flatbreads with ghee', rating: 4.2, restaurant: 'Paranthe wala' },
        { id: '4', name: 'Lassi', price: '₹40-80', type: 'Beverage', description: 'Thick yogurt-based drink', rating: 4.3, restaurant: 'Giani di Hatti' }
      ],
      meerut: [
        { id: '1', name: 'Gazak', price: '₹100-200/kg', type: 'Sweet', description: 'Sesame and jaggery brittle', rating: 4.5, restaurant: 'Meerut Sweet shops' },
        { id: '2', name: 'Revdi', price: '₹80-150/kg', type: 'Sweet', description: 'Sesame seed candy', rating: 4.3, restaurant: 'Local sweet vendors' },
        { id: '3', name: 'Chhole Kulche', price: '₹60-120', type: 'Main Course', description: 'Spiced chickpeas with bread', rating: 4.2, restaurant: 'Street food stalls' },
        { id: '4', name: 'Jalebi', price: '₹100-180/kg', type: 'Sweet', description: 'Crispy sweet spirals', rating: 4.4, restaurant: 'Harpal Singh & Sons' }
      ],
      rajkot: [
        { id: '1', name: 'Khaman Dhokla', price: '₹40-80', type: 'Snack', description: 'Steamed fermented gram flour cake', rating: 4.4, restaurant: 'Das Khaman House' },
        { id: '2', name: 'Kathiyawadi Thali', price: '₹150-300', type: 'Main Course', description: 'Traditional Gujarati platter', rating: 4.5, restaurant: 'Jassi De Parathe' },
        { id: '3', name: 'Handvo', price: '₹60-120', type: 'Snack', description: 'Savory lentil and rice cake', rating: 4.2, restaurant: 'Gopi Dining Hall' },
        { id: '4', name: 'Mohanthal', price: '₹200-400/kg', type: 'Sweet', description: 'Gram flour fudge with nuts', rating: 4.3, restaurant: 'Lodhiya Sweets' }
      ],
      srinagar: [
        { id: '1', name: 'Rogan Josh', price: '₹250-400', type: 'Main Course', description: 'Aromatic lamb curry with Kashmiri spices', rating: 4.7, restaurant: 'Ahdoos Restaurant' },
        { id: '2', name: 'Wazwan', price: '₹800-1500', type: 'Full Meal', description: 'Traditional multi-course Kashmiri feast', rating: 4.8, restaurant: 'Shamyana Restaurant' },
        { id: '3', name: 'Kahwa', price: '₹50-100', type: 'Beverage', description: 'Traditional green tea with spices and nuts', rating: 4.6, restaurant: 'Local tea houses' },
        { id: '4', name: 'Sheer Chai', price: '₹30-60', type: 'Beverage', description: 'Pink salt tea with milk', rating: 4.4, restaurant: 'Chai shops' }
      ],
      aurangabad: [
        { id: '1', name: 'Naan Qalia', price: '₹120-200', type: 'Main Course', description: 'Mutton curry with special bread', rating: 4.5, restaurant: 'Bhoj Thali' },
        { id: '2', name: 'Thalipeeth', price: '₹60-100', type: 'Main Course', description: 'Multi-grain flatbread with vegetables', rating: 4.3, restaurant: 'Hotel Panchavati' },
        { id: '3', name: 'Tahri', price: '₹80-150', type: 'Main Course', description: 'Spiced rice with vegetables or meat', rating: 4.2, restaurant: 'Local Muslim eateries' },
        { id: '4', name: 'Gulkand', price: '₹150-300/kg', type: 'Sweet', description: 'Rose petal preserve', rating: 4.4, restaurant: 'Ajanta Sweets' }
      ],
      ranchi: [
        { id: '1', name: 'Dhuska', price: '₹30-60', type: 'Snack', description: 'Deep-fried rice and lentil pancakes', rating: 4.3, restaurant: 'Local street vendors' },
        { id: '2', name: 'Rugra', price: '₹80-150', type: 'Vegetable', description: 'Wild mushroom curry', rating: 4.4, restaurant: 'Tribal cuisine restaurants' },
        { id: '3', name: 'Bamboo Shoot Curry', price: '₹100-180', type: 'Main Course', description: 'Traditional tribal vegetable curry', rating: 4.2, restaurant: 'Sarhul Restaurant' },
        { id: '4', name: 'Thekua', price: '₹50-100/kg', type: 'Sweet', description: 'Traditional festival sweet', rating: 4.5, restaurant: 'Local sweet shops' }
      ],
      coimbatore: [
        { id: '1', name: 'Kongunadu Chicken', price: '₹180-280', type: 'Main Course', description: 'Spicy regional chicken preparation', rating: 4.4, restaurant: 'Haribhavaani Restaurant' },
        { id: '2', name: 'Arisi Payasam', price: '₹60-120', type: 'Dessert', description: 'Rice pudding with jaggery and coconut', rating: 4.3, restaurant: 'Annapoorna Restaurant' },
        { id: '3', name: 'Kothu Parotta', price: '₹80-150', type: 'Main Course', description: 'Shredded bread stir-fried with spices', rating: 4.5, restaurant: 'Kovai Ananda Bhavan' },
        { id: '4', name: 'Filter Coffee', price: '₹20-40', type: 'Beverage', description: 'Traditional South Indian coffee', rating: 4.6, restaurant: 'Local coffee shops' }
      ]
    };

    return dishData[cityLower] || [
      { id: '1', name: 'Local Special Curry', price: '₹120-200', type: 'Main Course', description: 'Regional specialty curry with authentic flavors', rating: 4.2, restaurant: 'Local restaurants' },
      { id: '2', name: 'Traditional Sweet', price: '₹100-250/kg', type: 'Sweet', description: 'Local traditional sweet preparation', rating: 4.0, restaurant: 'Sweet shops' },
      { id: '3', name: 'Street Food Special', price: '₹40-80', type: 'Snack', description: 'Popular local street food', rating: 4.1, restaurant: 'Street vendors' }
    ];
  };

  useEffect(() => {
    const dishesForCity = getDishesForCity(tripData.destination);
    setTimeout(() => {
      setDishes(dishesForCity);
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
            Discovering Famous Dishes of {tripData.destination}...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse bg-gray-200 h-20 rounded-lg"></div>
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
          Explore the local flavors and specialties
        </p>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {dishes.map((dish) => (
          <div key={dish.id} className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-bold text-gray-800">{dish.name} <span className="text-sm font-normal text-gray-500">({dish.type})</span></h3>
            <p className="text-gray-700 mb-1">{dish.description}</p>
            <p className="text-sm text-gray-600">Price: {dish.price}</p>
            <p className="text-sm text-gray-600">Rating: {dish.rating} ⭐</p>
            <p className="text-sm text-gray-600">Recommended at: {dish.restaurant}</p>
          </div>
        ))}

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
