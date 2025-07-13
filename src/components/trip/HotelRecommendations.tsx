import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Wifi, Car, Utensils, ArrowRight } from 'lucide-react';
import { TripData } from '@/components/TripPlanningForm';

interface Hotel {
  id: string;
  name: string;
  rating: number;
  price: number;
  amenities: string[];
  distance: string;
  description: string;
}

interface HotelRecommendationsProps {
  tripData: TripData;
  onNext: () => void;
}

export const HotelRecommendations = ({ tripData, onNext }: HotelRecommendationsProps) => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);

  const getHotelsForCity = (city: string): Hotel[] => {
    const cityLower = city.toLowerCase();
    
    const hotelData: { [key: string]: Hotel[] } = {
      hyderabad: [
        { id: '1', name: 'Taj Falaknuma Palace', rating: 4.8, price: 25000, amenities: ['Free WiFi', 'Pool', 'Spa', 'Restaurant'], distance: '5 km from city center', description: 'Luxury palace hotel with royal heritage' },
        { id: '2', name: 'ITC Kohenur', rating: 4.7, price: 18000, amenities: ['Free WiFi', 'Pool', 'Restaurant', 'Gym'], distance: '2 km from HITEC City', description: 'Premium business hotel' },
        { id: '3', name: 'Park Hyatt Hyderabad', rating: 4.6, price: 15000, amenities: ['Pool', 'Spa', 'Restaurant', 'Free WiFi'], distance: '3 km from Banjara Hills', description: 'Modern luxury hotel' },
        { id: '4', name: 'The Westin Hyderabad Mindspace', rating: 4.5, price: 12000, amenities: ['Pool', 'Spa', 'Restaurant', 'Gym'], distance: '1 km from HITEC City', description: 'Contemporary business hotel' },
        { id: '5', name: 'Novotel Hyderabad Airport', rating: 4.4, price: 8000, amenities: ['Free WiFi', 'Restaurant', 'Pool'], distance: '2 km from airport', description: 'Convenient airport hotel' },
        { id: '6', name: 'Hotel Sitara Grand', rating: 4.2, price: 5000, amenities: ['Free WiFi', 'Restaurant', 'AC'], distance: '1 km from Charminar', description: 'Heritage area budget hotel' },
        { id: '7', name: 'Trident Hyderabad', rating: 4.6, price: 14000, amenities: ['Pool', 'Spa', 'Restaurant', 'Free WiFi'], distance: '4 km from Banjara Hills', description: 'Luxury hotel with excellent service' },
        { id: '8', name: 'Radisson Blu Plaza Hotel', rating: 4.4, price: 9000, amenities: ['Pool', 'Restaurant', 'Free WiFi'], distance: '3 km from Banjara Hills', description: 'Modern business hotel' },
        { id: '9', name: 'Vivanta Hyderabad Begumpet', rating: 4.3, price: 11000, amenities: ['Pool', 'Spa', 'Restaurant'], distance: '2 km from Begumpet', description: 'Stylish contemporary hotel' },
        { id: '10', name: 'Holiday Inn Express Hyderabad', rating: 4.1, price: 6500, amenities: ['Free WiFi', 'Restaurant', 'Gym'], distance: '5 km from HITEC City', description: 'Comfortable mid-range hotel' },
        { id: '11', name: 'Hotel Golkonda', rating: 4.0, price: 4500, amenities: ['Restaurant', 'Free WiFi', 'AC'], distance: '2 km from Charminar', description: 'Traditional heritage hotel' },
        { id: '12', name: 'GreenPark Hyderabad', rating: 4.2, price: 7500, amenities: ['Pool', 'Restaurant', 'Free WiFi'], distance: '3 km from Begumpet', description: 'Well-located business hotel' }
      ],
      chennai: [
        { id: '1', name: 'ITC Grand Chola', rating: 4.8, price: 20000, amenities: ['Pool', 'Spa', 'Restaurant', 'Free WiFi'], distance: '3 km from airport', description: 'Luxury business hotel' },
        { id: '2', name: 'The Leela Palace Chennai', rating: 4.7, price: 18000, amenities: ['Pool', 'Spa', 'Restaurant', 'Butler Service'], distance: '2 km from Marina Beach', description: 'Beachfront luxury hotel' },
        { id: '3', name: 'Taj Coromandel', rating: 4.6, price: 15000, amenities: ['Pool', 'Restaurant', 'Free WiFi'], distance: '1 km from city center', description: 'Heritage luxury hotel' },
        { id: '4', name: 'Hyatt Regency Chennai', rating: 4.5, price: 12000, amenities: ['Pool', 'Spa', 'Restaurant'], distance: '4 km from T Nagar', description: 'Modern business hotel' },
        { id: '5', name: 'The Park Chennai', rating: 4.3, price: 9000, amenities: ['Pool', 'Restaurant', 'Free WiFi'], distance: '2 km from Anna Nagar', description: 'Contemporary city hotel' },
        { id: '6', name: 'Radisson Blu Hotel Chennai', rating: 4.2, price: 8000, amenities: ['Pool', 'Restaurant', 'Gym'], distance: '5 km from Egmore', description: 'Business district hotel' },
        { id: '7', name: 'Taj Club House', rating: 4.4, price: 11000, amenities: ['Restaurant', 'Free WiFi', 'Gym'], distance: '1 km from Mount Road', description: 'Classic heritage hotel' },
        { id: '8', name: 'Vivanta Chennai IT Expressway', rating: 4.3, price: 10000, amenities: ['Pool', 'Spa', 'Restaurant'], distance: '2 km from OMR', description: 'IT corridor hotel' },
        { id: '9', name: 'Sheraton Grand Chennai Resort & Spa', rating: 4.5, price: 13000, amenities: ['Beach', 'Pool', 'Spa'], distance: '1 km from ECR Beach', description: 'Beach resort hotel' },
        { id: '10', name: 'Accord Metropolitan', rating: 4.1, price: 7000, amenities: ['Pool', 'Restaurant', 'Free WiFi'], distance: '3 km from Central Station', description: 'Mid-range business hotel' },
        { id: '11', name: 'Hotel Savera', rating: 4.0, price: 5500, amenities: ['Restaurant', 'Free WiFi', 'AC'], distance: '2 km from Express Avenue', description: 'Comfortable city hotel' },
        { id: '12', name: 'GRT Grand', rating: 4.2, price: 8500, amenities: ['Pool', 'Restaurant', 'Spa'], distance: '4 km from airport', description: 'Airport vicinity hotel' }
      ],
      pune: [
        { id: '1', name: 'JW Marriott Hotel Pune', rating: 4.7, price: 16000, amenities: ['Pool', 'Spa', 'Restaurant', 'Gym'], distance: '2 km from Koregaon Park', description: 'Luxury business hotel' },
        { id: '2', name: 'The Westin Pune Koregaon Park', rating: 4.6, price: 14000, amenities: ['Pool', 'Spa', 'Restaurant'], distance: '1 km from Koregaon Park', description: 'Premium city hotel' },
        { id: '3', name: 'Conrad Pune', rating: 4.8, price: 18000, amenities: ['Pool', 'Spa', 'Restaurant', 'Butler Service'], distance: '3 km from MG Road', description: 'Ultra-luxury hotel' },
        { id: '4', name: 'Hyatt Regency Pune', rating: 4.5, price: 12000, amenities: ['Pool', 'Restaurant', 'Free WiFi'], distance: '4 km from Kalyani Nagar', description: 'Modern business hotel' },
        { id: '5', name: 'Taj Blue Diamond', rating: 4.4, price: 11000, amenities: ['Pool', 'Restaurant', 'Spa'], distance: '2 km from Pune Station', description: 'Heritage business hotel' },
        { id: '6', name: 'The Orchid Hotel Pune', rating: 4.2, price: 8000, amenities: ['Pool', 'Restaurant', 'Free WiFi'], distance: '5 km from Hinjewadi', description: 'Eco-friendly hotel' },
        { id: '7', name: 'Radisson Blu Hotel Pune Kharadi', rating: 4.3, price: 9500, amenities: ['Pool', 'Spa', 'Restaurant'], distance: '6 km from IT parks', description: 'IT corridor hotel' },
        { id: '8', name: 'Vivanta Pune Hinjawadi', rating: 4.2, price: 9000, amenities: ['Pool', 'Restaurant', 'Gym'], distance: '2 km from Hinjawadi IT Park', description: 'Business district hotel' },
        { id: '9', name: 'Courtyard by Marriott Pune Chakan', rating: 4.1, price: 7500, amenities: ['Pool', 'Restaurant', 'Free WiFi'], distance: '8 km from Chakan', description: 'Industrial area hotel' },
        { id: '10', name: 'Lemon Tree Hotel Pune', rating: 4.0, price: 6000, amenities: ['Restaurant', 'Free WiFi', 'Gym'], distance: '3 km from Viman Nagar', description: 'Mid-range business hotel' },
        { id: '11', name: 'Hotel Deccan Rendezvous', rating: 3.9, price: 4500, amenities: ['Restaurant', 'Free WiFi', 'AC'], distance: '1 km from Deccan Gymkhana', description: 'Budget city hotel' },
        { id: '12', name: 'Treebo Trend Deccan Rendezvous', rating: 4.0, price: 5000, amenities: ['Free WiFi', 'Restaurant', 'AC'], distance: '2 km from FC Road', description: 'Modern budget hotel' }
      ],
      jaipur: [
        { id: '1', name: 'Taj Rambagh Palace', rating: 4.9, price: 35000, amenities: ['Pool', 'Spa', 'Restaurant', 'Butler Service'], distance: '8 km from city center', description: 'Former royal palace turned luxury hotel' },
        { id: '2', name: 'The Oberoi Rajvilas', rating: 4.8, price: 32000, amenities: ['Pool', 'Spa', 'Restaurant', 'Golf'], distance: '12 km from Pink City', description: 'Luxury resort with traditional architecture' },
        { id: '3', name: 'ITC Rajputana', rating: 4.6, price: 15000, amenities: ['Pool', 'Spa', 'Restaurant', 'Free WiFi'], distance: '2 km from railway station', description: 'Premium business hotel' },
        { id: '4', name: 'Fairmont Jaipur', rating: 4.7, price: 20000, amenities: ['Pool', 'Spa', 'Restaurant', 'Golf'], distance: '15 km from airport', description: 'Luxury resort hotel' },
        { id: '5', name: 'Trident Jaipur', rating: 4.5, price: 12000, amenities: ['Pool', 'Restaurant', 'Free WiFi'], distance: '5 km from Amber Fort', description: 'Heritage-style luxury hotel' },
        { id: '6', name: 'Radisson Blu Jaipur', rating: 4.3, price: 9000, amenities: ['Pool', 'Restaurant', 'Spa'], distance: '3 km from city center', description: 'Modern business hotel' },
        { id: '7', name: 'Crowne Plaza Jaipur Tonk Road', rating: 4.4, price: 10000, amenities: ['Pool', 'Spa', 'Restaurant'], distance: '4 km from World Trade Park', description: 'Contemporary business hotel' },
        { id: '8', name: 'Hilton Jaipur', rating: 4.2, price: 8500, amenities: ['Pool', 'Restaurant', 'Free WiFi'], distance: '6 km from Hawa Mahal', description: 'International chain hotel' },
        { id: '9', name: 'Hotel Clarks Amer', rating: 4.1, price: 7000, amenities: ['Pool', 'Restaurant', 'Free WiFi'], distance: '2 km from railway station', description: 'Heritage business hotel' },
        { id: '10', name: 'Lemon Tree Premier Jaipur', rating: 4.0, price: 6000, amenities: ['Restaurant', 'Free WiFi', 'Gym'], distance: '5 km from Birla Mandir', description: 'Mid-range business hotel' },
        { id: '11', name: 'Hotel Arya Niwas', rating: 3.9, price: 3500, amenities: ['Restaurant', 'Free WiFi', 'AC'], distance: '3 km from City Palace', description: 'Heritage budget hotel' },
        { id: '12', name: 'Umaid Bhawan Heritage House Hotel', rating: 4.0, price: 4500, amenities: ['Restaurant', 'Free WiFi', 'Heritage'], distance: '4 km from Jantar Mantar', description: 'Traditional heritage hotel' }
      ],
      ahmedabad: [
        { id: '1', name: 'The Fern Residency Ahmedabad', rating: 4.5, price: 8000, amenities: ['Pool', 'Restaurant', 'Free WiFi'], distance: '5 km from airport', description: 'Eco-friendly business hotel' },
        { id: '2', name: 'Hyatt Regency Ahmedabad', rating: 4.6, price: 12000, amenities: ['Pool', 'Spa', 'Restaurant'], distance: '3 km from Sarkhej', description: 'Luxury business hotel' },
        { id: '3', name: 'Radisson Blu Hotel Ahmedabad', rating: 4.4, price: 9500, amenities: ['Pool', 'Restaurant', 'Spa'], distance: '2 km from SG Highway', description: 'Modern business hotel' },
        { id: '4', name: 'Novotel Ahmedabad', rating: 4.3, price: 8500, amenities: ['Pool', 'Restaurant', 'Free WiFi'], distance: '4 km from ISCON Temple', description: 'International chain hotel' },
        { id: '5', name: 'Four Points by Sheraton Ahmedabad', rating: 4.2, price: 7500, amenities: ['Pool', 'Restaurant', 'Gym'], distance: '6 km from Mahatma Mandir', description: 'Business district hotel' },
        { id: '6', name: 'Lemon Tree Hotel Ahmedabad', rating: 4.1, price: 6000, amenities: ['Restaurant', 'Free WiFi', 'AC'], distance: '3 km from Ashram Road', description: 'Mid-range city hotel' },
        { id: '7', name: 'Crowne Plaza Ahmedabad City Centre', rating: 4.4, price: 10000, amenities: ['Pool', 'Spa', 'Restaurant'], distance: '2 km from city center', description: 'Premium city hotel' },
        { id: '8', name: 'The Grand Bhagwati Ahmedabad', rating: 4.0, price: 5500, amenities: ['Pool', 'Restaurant', 'Free WiFi'], distance: '7 km from Sabarmati Ashram', description: 'Heritage-style hotel' },
        { id: '9', name: 'Hotel Express Residency', rating: 3.9, price: 4000, amenities: ['Restaurant', 'Free WiFi', 'AC'], distance: '4 km from Law Garden', description: 'Budget business hotel' },
        { id: '10', name: 'Treebo Trend Amber', rating: 4.0, price: 4500, amenities: ['Free WiFi', 'Restaurant', 'AC'], distance: '5 km from Ellis Bridge', description: 'Modern budget hotel' },
        { id: '11', name: 'Hotel Royal Highness', rating: 3.8, price: 3500, amenities: ['Restaurant', 'Free WiFi', 'AC'], distance: '3 km from CG Road', description: 'Economy city hotel' },
        { id: '12', name: 'Ginger Ahmedabad', rating: 4.1, price: 5000, amenities: ['Restaurant', 'Free WiFi', 'Gym'], distance: '8 km from Gandhinagar', description: 'Smart budget hotel' }
      ],
      kochi: [
        { id: '1', name: 'Grand Hyatt Kochi Bolgatty', rating: 4.7, price: 16000, amenities: ['Pool', 'Spa', 'Restaurant', 'Golf'], distance: '2 km from Marine Drive', description: 'Luxury island resort' },
        { id: '2', name: 'Taj Malabar Resort & Spa', rating: 4.6, price: 14000, amenities: ['Pool', 'Spa', 'Restaurant', 'Beach'], distance: '1 km from Willingdon Island', description: 'Heritage beachfront hotel' },
        { id: '3', name: 'Crowne Plaza Kochi', rating: 4.5, price: 12000, amenities: ['Pool', 'Restaurant', 'Free WiFi'], distance: '3 km from airport', description: 'Business district hotel' },
        { id: '4', name: 'Radisson Blu Kochi', rating: 4.4, price: 10000, amenities: ['Pool', 'Spa', 'Restaurant'], distance: '4 km from Fort Kochi', description: 'Modern city hotel' },
        { id: '5', name: 'Hotel Presidency', rating: 4.2, price: 7000, amenities: ['Restaurant', 'Free WiFi', 'AC'], distance: '2 km from Ernakulam Junction', description: 'Heritage city hotel' },
        { id: '6', name: 'The Gateway Hotel Marine Drive', rating: 4.3, price: 8500, amenities: ['Pool', 'Restaurant', 'Free WiFi'], distance: '1 km from Marine Drive', description: 'Waterfront hotel' },
        { id: '7', name: 'Le Meridien Kochi', rating: 4.8, price: 18000, amenities: ['Pool', 'Spa', 'Restaurant', 'Art Gallery'], distance: '2 km from Chinese Fishing Nets', description: 'Art-themed luxury hotel' },
        { id: '8', name: 'Fragrant Nature Kochi', rating: 4.1, price: 6500, amenities: ['Pool', 'Restaurant', 'Free WiFi'], distance: '5 km from Mattancherry', description: 'Eco-friendly hotel' },
        { id: '9', name: 'Casino Hotel', rating: 4.0, price: 5500, amenities: ['Pool', 'Restaurant', 'Heritage'], distance: '3 km from Jew Town', description: 'Heritage casino hotel' },
        { id: '10', name: 'Lemon Tree Hotel Kochi', rating: 4.1, price: 6000, amenities: ['Restaurant', 'Free WiFi', 'Gym'], distance: '6 km from Kochi Metro', description: 'Mid-range business hotel' },
        { id: '11', name: 'Hotel Abad Plaza', rating: 3.9, price: 4500, amenities: ['Restaurant', 'Free WiFi', 'AC'], distance: '4 km from Edapally', description: 'Budget city hotel' },
        { id: '12', name: 'Treebo Trend Fort Queen', rating: 4.0, price: 5000, amenities: ['Free WiFi', 'Restaurant', 'AC'], distance: '1 km from Fort Kochi Beach', description: 'Heritage area hotel' }
      ],
      thiruvananthapuram: [
        { id: '1', name: 'Taj Green Cove Resort & Spa', rating: 4.6, price: 14000, amenities: ['Beach', 'Pool', 'Spa', 'Restaurant'], distance: '15 km from Kovalam Beach', description: 'Beachfront luxury resort' },
        { id: '2', name: 'Vivanta Trivandrum', rating: 4.5, price: 12000, amenities: ['Pool', 'Spa', 'Restaurant'], distance: '3 km from Technopark', description: 'Modern business hotel' },
        { id: '3', name: 'The Leela Kovalam', rating: 4.8, price: 20000, amenities: ['Beach', 'Pool', 'Spa', 'Ayurveda'], distance: '1 km from Lighthouse Beach', description: 'Clifftop luxury resort' },
        { id: '4', name: 'Hilton Garden Inn Trivandrum', rating: 4.3, price: 8000, amenities: ['Pool', 'Restaurant', 'Free WiFi'], distance: '2 km from airport', description: 'International business hotel' },
        { id: '5', name: 'Hotel Residency Tower', rating: 4.1, price: 6000, amenities: ['Restaurant', 'Free WiFi', 'AC'], distance: '1 km from Central Station', description: 'City center hotel' },
        { id: '6', name: 'Uday Suites', rating: 4.0, price: 5000, amenities: ['Restaurant', 'Free WiFi', 'Pool'], distance: '4 km from Padmanabhaswamy Temple', description: 'Heritage area hotel' },
        { id: '7', name: 'Turtle on the Beach', rating: 4.2, price: 7500, amenities: ['Beach', 'Restaurant', 'Ayurveda'], distance: '0.5 km from Varkala Beach', description: 'Beachfront boutique hotel' },
        { id: '8', name: 'The South Park', rating: 3.9, price: 4500, amenities: ['Restaurant', 'Free WiFi', 'AC'], distance: '5 km from Napier Museum', description: 'Budget city hotel' },
        { id: '9', name: 'Hotel Horizon', rating: 4.0, price: 5500, amenities: ['Pool', 'Restaurant', 'Free WiFi'], distance: '3 km from Shangumugham Beach', description: 'Mid-range hotel' },
        { id: '10', name: 'Pankaj Hotel', rating: 3.8, price: 3500, amenities: ['Restaurant', 'Free WiFi', 'AC'], distance: '2 km from Thampanoor', description: 'Economy hotel' },
        { id: '11', name: 'Greenland Lodging', rating: 3.7, price: 3000, amenities: ['Restaurant', 'Free WiFi'], distance: '6 km from Kanakakunnu Palace', description: 'Budget accommodation' },
        { id: '12', name: 'YMCA International Guest House', rating: 3.9, price: 2500, amenities: ['Restaurant', 'Free WiFi'], distance: '4 km from Zoo', description: 'Institutional guest house' }
      ],
      lucknow: [
        { id: '1', name: 'Taj Mahal Lucknow', rating: 4.6, price: 12000, amenities: ['Pool', 'Spa', 'Restaurant', 'Heritage'], distance: '2 km from Hazratganj', description: 'Heritage luxury hotel' },
        { id: '2', name: 'Renaissance Lucknow Hotel', rating: 4.5, price: 10000, amenities: ['Pool', 'Spa', 'Restaurant'], distance: '5 km from Gomti Nagar', description: 'Modern luxury hotel' },
        { id: '3', name: 'Hyatt Regency Lucknow', rating: 4.4, price: 9500, amenities: ['Pool', 'Restaurant', 'Free WiFi'], distance: '3 km from Ambedkar Park', description: 'Contemporary business hotel' },
        { id: '4', name: 'Hotel Clarks Avadh', rating: 4.2, price: 7000, amenities: ['Pool', 'Restaurant', 'Free WiFi'], distance: '1 km from Charbagh Station', description: 'Heritage business hotel' },
        { id: '5', name: 'Lemon Tree Hotel Lucknow', rating: 4.1, price: 5500, amenities: ['Restaurant', 'Free WiFi', 'Gym'], distance: '4 km from Residency', description: 'Mid-range business hotel' },
        { id: '6', name: 'Radisson Hotel Lucknow', rating: 4.3, price: 8000, amenities: ['Pool', 'Restaurant', 'Spa'], distance: '6 km from Janeshwar Mishra Park', description: 'Business district hotel' },
        { id: '7', name: 'Dayal Gateway', rating: 4.0, price: 4500, amenities: ['Restaurant', 'Free WiFi', 'AC'], distance: '3 km from Bara Imambara', description: 'Heritage area hotel' },
        { id: '8', name: 'Piccadily Hotel', rating: 3.9, price: 4000, amenities: ['Restaurant', 'Free WiFi', 'AC'], distance: '2 km from La Martiniere', description: 'City center hotel' },
        { id: '9', name: 'Hotel Lineage', rating: 3.8, price: 3500, amenities: ['Restaurant', 'Free WiFi'], distance: '5 km from Aminabad', description: 'Budget city hotel' },
        { id: '10', name: 'Treebo Trend Dayal Gateway', rating: 4.0, price: 4200, amenities: ['Free WiFi', 'Restaurant', 'AC'], distance: '4 km from Rumi Darwaza', description: 'Modern budget hotel' },
        { id: '11', name: 'Hotel Levana Suites', rating: 3.9, price: 3800, amenities: ['Restaurant', 'Free WiFi', 'AC'], distance: '7 km from Phoenix United Mall', description: 'Business hotel' },
        { id: '12', name: 'OYO Townhouse Hazratganj', rating: 3.7, price: 3000, amenities: ['Free WiFi', 'AC'], distance: '1 km from GPO', description: 'Budget chain hotel' }
      ],
      bhopal: [
        { id: '1', name: 'Jehan Numa Palace Hotel', rating: 4.5, price: 8000, amenities: ['Pool', 'Restaurant', 'Heritage', 'Free WiFi'], distance: '2 km from Van Vihar', description: 'Heritage palace hotel' },
        { id: '2', name: 'Noor-Us-Sabah Palace', rating: 4.3, price: 6500, amenities: ['Pool', 'Restaurant', 'Heritage'], distance: '4 km from Upper Lake', description: 'Royal heritage hotel' },
        { id: '3', name: 'WelcomHotel Bella Vista', rating: 4.2, price: 7000, amenities: ['Pool', 'Restaurant', 'Free WiFi'], distance: '3 km from DB City Mall', description: 'Business hotel with lake view' },
        { id: '4', name: 'Marriott Bhopal', rating: 4.4, price: 9000, amenities: ['Pool', 'Spa', 'Restaurant'], distance: '5 km from airport', description: 'International luxury hotel' },
        { id: '5', name: 'Hotel Lake View Ashok', rating: 4.0, price: 4500, amenities: ['Restaurant', 'Free WiFi', 'Lake View'], distance: '1 km from Boat Club', description: 'ITDC heritage hotel' },
        { id: '6', name: 'Lemon Tree Hotel Bhopal', rating: 4.1, price: 5000, amenities: ['Restaurant', 'Free WiFi', 'Gym'], distance: '6 km from Bhopal Junction', description: 'Mid-range business hotel' },
        { id: '7', name: 'Hotel Residency', rating: 3.9, price: 3500, amenities: ['Restaurant', 'Free WiFi', 'AC'], distance: '2 km from New Market', description: 'City center budget hotel' },
        { id: '8', name: 'Surya Palace Hotel', rating: 3.8, price: 3200, amenities: ['Restaurant', 'Free WiFi'], distance: '4 km from Taj-ul-Masajid', description: 'Heritage area hotel' },
        { id: '9', name: 'Hotel Amer Palace', rating: 3.7, price: 2800, amenities: ['Restaurant', 'AC'], distance: '3 km from Chowk Bazaar', description: 'Budget heritage hotel' },
        { id: '10', name: 'OYO Flagship Hamidia Road', rating: 3.9, price: 3000, amenities: ['Free WiFi', 'AC'], distance: '1 km from Hamidia Hospital', description: 'Budget chain hotel' },
        { id: '11', name: 'Hotel Palash Residency', rating: 3.8, price: 3400, amenities: ['Restaurant', 'Free WiFi', 'AC'], distance: '5 km from Regional Science Centre', description: 'Family hotel' },
        { id: '12', name: 'Treebo Trend Amer Palace', rating: 4.0, price: 3600, amenities: ['Free WiFi', 'Restaurant', 'AC'], distance: '7 km from Bharat Bhavan', description: 'Modern budget hotel' }
      ]
    };

    return hotelData[cityLower] || [
      { id: '1', name: `${city} Palace Hotel`, rating: 4.5, price: Math.floor(tripData.budget * 0.3), amenities: ['Free WiFi', 'Restaurant', 'AC'], distance: '2 km from city center', description: 'Premium city hotel with modern amenities' },
      { id: '2', name: `Heritage ${city} Hotel`, rating: 4.3, price: Math.floor(tripData.budget * 0.25), amenities: ['Restaurant', 'Free WiFi'], distance: '1.5 km from city center', description: 'Traditional hotel with local charm' },
      { id: '3', name: `${city} Business Hotel`, rating: 4.2, price: Math.floor(tripData.budget * 0.2), amenities: ['Free WiFi', 'Restaurant', 'AC'], distance: '3 km from city center', description: 'Modern business hotel' },
      { id: '4', name: `Budget Stay ${city}`, rating: 4.0, price: Math.floor(tripData.budget * 0.15), amenities: ['Free WiFi', 'AC'], distance: '2.5 km from city center', description: 'Clean and comfortable budget hotel' },
      { id: '5', name: `${city} Grand Hotel`, rating: 4.1, price: Math.floor(tripData.budget * 0.18), amenities: ['Pool', 'Restaurant', 'Free WiFi'], distance: '2 km from city center', description: 'Comfortable mid-range hotel' },
      { id: '6', name: `${city} Comfort Inn`, rating: 3.9, price: Math.floor(tripData.budget * 0.12), amenities: ['Restaurant', 'Free WiFi'], distance: '3 km from city center', description: 'Budget-friendly accommodation' }
    ];
  };

  useEffect(() => {
    const cityHotels = getHotelsForCity(tripData.destination);
    const filteredHotels = cityHotels.filter(hotel => hotel.price <= tripData.budget * 0.5);
    
    setTimeout(() => {
      setHotels(filteredHotels);
      setLoading(false);
    }, 1000);
  }, [tripData]);

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'free wifi':
        return <Wifi className="h-4 w-4" />;
      case 'parking':
        return <Car className="h-4 w-4" />;
      case 'restaurant':
        return <Utensils className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const handleSelectHotel = (hotel: Hotel) => {
    setSelectedHotel(hotel);
  };

  const handleNext = () => {
    if (!selectedHotel) {
      alert('Please select a hotel before proceeding.');
      return;
    }
    console.log('Selected hotel:', selectedHotel);
    onNext();
  };

  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + 6, hotels.length));
  };

  if (loading) {
    return (
      <Card className="shadow-xl border-t-4 border-t-orange-500">
        <CardHeader>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent">
            Finding Hotels in {tripData.destination}...
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
          <MapPin className="h-6 w-6 text-orange-500" />
          Hotels in {tripData.destination}
        </CardTitle>
        <p className="text-gray-600 font-semibold">
          Found {hotels.length} hotels within your budget of ₹{tripData.budget.toLocaleString()}
        </p>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotels.slice(0, visibleCount).map((hotel) => (
            <Card 
              key={hotel.id} 
              className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 ${
                selectedHotel?.id === hotel.id 
                  ? 'ring-2 ring-orange-500 bg-gradient-to-br from-orange-50 to-blue-50' 
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => handleSelectHotel(hotel)}
            >
              <div className="p-1">
                <div className="bg-gradient-to-br from-orange-100 to-blue-100 p-4 rounded-t-lg">
                  <Badge className="bg-green-500 hover:bg-green-600 text-white font-semibold mb-2">
                    ₹{hotel.price.toLocaleString()}/night
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-2 text-gray-800">{hotel.name}</h3>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${
                        i < Math.floor(hotel.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`} 
                    />
                  ))}
                  <span className="ml-1 text-sm text-gray-600 font-medium">{hotel.rating}</span>
                </div>
                <p className="text-sm text-gray-600 mb-3 font-medium">{hotel.distance}</p>
                <p className="text-sm mb-3 font-medium">{hotel.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {hotel.amenities.slice(0, 3).map((amenity) => (
                    <Badge key={amenity} variant="outline" className="text-xs font-medium">
                      {getAmenityIcon(amenity)}
                      <span className="ml-1">{amenity}</span>
                    </Badge>
                  ))}
                </div>
                <Button
                  className={`w-full font-semibold ${
                    selectedHotel?.id === hotel.id
                      ? 'bg-gradient-to-r from-orange-500 to-blue-600 hover:from-orange-600 hover:to-blue-700 text-white'
                      : 'border-2 border-orange-200 text-orange-600 hover:bg-orange-50'
                  }`}
                  variant={selectedHotel?.id === hotel.id ? "default" : "outline"}
                >
                  {selectedHotel?.id === hotel.id ? '✓ Selected' : 'Select Hotel'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {visibleCount < hotels.length && (
          <div className="text-center mt-8">
            <Button 
              className="bg-gradient-to-r from-orange-500 to-blue-600 hover:from-orange-600 hover:to-blue-700 text-white font-semibold px-8 py-3"
              onClick={handleLoadMore}
            >
              Load More Hotels ({hotels.length - visibleCount} more available)
            </Button>
          </div>
        )}

        {selectedHotel && (
          <div className="mt-8 p-6 bg-gradient-to-r from-orange-50 to-blue-50 rounded-xl border-2 border-orange-200">
            <h4 className="font-bold text-xl mb-2 text-gray-800">Selected Hotel:</h4>
            <p className="text-gray-700 font-semibold">{selectedHotel.name} - ₹{selectedHotel.price.toLocaleString()}/night</p>
          </div>
        )}

        <div className="flex justify-end mt-8">
          <Button onClick={handleNext} className="bg-gradient-to-r from-orange-500 to-blue-600 hover:from-orange-600 hover:to-blue-700 text-white font-bold px-8 py-3 text-lg">
            Next: Tourist Attractions
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
