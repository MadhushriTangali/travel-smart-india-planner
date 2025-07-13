import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import { TripData } from '@/components/TripPlanningForm';

interface Hotel {
  id: string;
  name: string;
  rating: number;
  price: string;
  amenities: string[];
  image: string;
}

interface HotelRecommendationsProps {
  tripData: TripData;
  onNext: () => void;
}

export const HotelRecommendations = ({ tripData, onNext }: HotelRecommendationsProps) => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);

  const getHotelsForCity = (city: string): Hotel[] => {
    const cityLower = city.toLowerCase();
    
    const hotelData: { [key: string]: Hotel[] } = {
      mumbai: [
        { id: '1', name: 'The Taj Mahal Palace', rating: 4.7, price: '₹10,000 - ₹20,000', amenities: ['Free WiFi', 'Swimming Pool', 'Spa', 'Restaurant'], image: '/placeholder.svg' },
        { id: '2', name: 'Trident Nariman Point', rating: 4.5, price: '₹8,000 - ₹15,000', amenities: ['Beach View', 'Fitness Center', 'Restaurant', 'Bar'], image: '/placeholder.svg' },
        { id: '3', name: 'The Oberoi', rating: 4.6, price: '₹12,000 - ₹22,000', amenities: ['Luxury Spa', 'Pool', 'Fine Dining', 'Business Center'], image: '/placeholder.svg' },
        { id: '4', name: 'Hotel Marine Plaza', rating: 4.2, price: '₹6,000 - ₹10,000', amenities: ['Sea View', 'Restaurant', 'Conference Hall', 'Room Service'], image: '/placeholder.svg' }
      ],
      delhi: [
        { id: '1', name: 'The Leela Palace', rating: 4.8, price: '₹12,000 - ₹25,000', amenities: ['Luxury Spa', 'Pool', 'Fine Dining', 'Business Center'], image: '/placeholder.svg' },
        { id: '2', name: 'Taj Mahal Hotel', rating: 4.7, price: '₹10,000 - ₹20,000', amenities: ['Free WiFi', 'Swimming Pool', 'Spa', 'Restaurant'], image: '/placeholder.svg' },
        { id: '3', name: 'ITC Maurya', rating: 4.6, price: '₹9,000 - ₹18,000', amenities: ['Luxury Amenities', 'Pool', 'Fine Dining', 'Conference Hall'], image: '/placeholder.svg' },
        { id: '4', name: 'The Imperial', rating: 4.5, price: '₹8,000 - ₹15,000', amenities: ['Heritage Property', 'Spa', 'Restaurant', 'Bar'], image: '/placeholder.svg' }
      ],
      bangalore: [
        { id: '1', name: 'The Ritz-Carlton', rating: 4.7, price: '₹9,000 - ₹18,000', amenities: ['Luxury Spa', 'Pool', 'Fine Dining', 'Business Center'], image: '/placeholder.svg' },
        { id: '2', name: 'Taj West End', rating: 4.6, price: '₹8,000 - ₹16,000', amenities: ['Heritage Property', 'Spa', 'Restaurant', 'Bar'], image: '/placeholder.svg' },
        { id: '3', name: 'The Leela Palace', rating: 4.8, price: '₹10,000 - ₹20,000', amenities: ['Luxury Amenities', 'Pool', 'Fine Dining', 'Conference Hall'], image: '/placeholder.svg' },
        { id: '4', name: 'JW Marriott', rating: 4.5, price: '₹7,000 - ₹14,000', amenities: ['Swimming Pool', 'Spa', 'Restaurant', 'Business Center'], image: '/placeholder.svg' }
      ],
      chennai: [
        { id: '1', name: 'ITC Grand Chola', rating: 4.7, price: '₹9,000 - ₹18,000', amenities: ['Luxury Spa', 'Pool', 'Fine Dining', 'Business Center'], image: '/placeholder.svg' },
        { id: '2', name: 'The Leela Palace', rating: 4.6, price: '₹8,000 - ₹16,000', amenities: ['Heritage Property', 'Spa', 'Restaurant', 'Bar'], image: '/placeholder.svg' },
        { id: '3', name: 'Taj Coromandel', rating: 4.8, price: '₹10,000 - ₹20,000', amenities: ['Luxury Amenities', 'Pool', 'Fine Dining', 'Conference Hall'], image: '/placeholder.svg' },
        { id: '4', name: 'Radisson Blu', rating: 4.5, price: '₹7,000 - ₹14,000', amenities: ['Swimming Pool', 'Spa', 'Restaurant', 'Business Center'], image: '/placeholder.svg' }
      ],
      kolkata: [
        { id: '1', name: 'The Oberoi Grand', rating: 4.7, price: '₹8,000 - ₹16,000', amenities: ['Heritage Property', 'Spa', 'Fine Dining', 'Business Center'], image: '/placeholder.svg' },
        { id: '2', name: 'ITC Sonar', rating: 4.6, price: '₹7,000 - ₹14,000', amenities: ['Luxury Spa', 'Pool', 'Restaurant', 'Bar'], image: '/placeholder.svg' },
        { id: '3', name: 'Taj Bengal', rating: 4.8, price: '₹9,000 - ₹18,000', amenities: ['Luxury Amenities', 'Pool', 'Fine Dining', 'Conference Hall'], image: '/placeholder.svg' },
        { id: '4', name: 'The Lalit Great Eastern', rating: 4.5, price: '₹6,000 - ₹12,000', amenities: ['Heritage Property', 'Spa', 'Restaurant', 'Business Center'], image: '/placeholder.svg' }
      ],
      hyderabad: [
        { id: '1', name: 'Taj Falaknuma Palace', rating: 4.8, price: '₹12,000 - ₹25,000', amenities: ['Heritage Palace', 'Fine Dining', 'Spa', 'Gardens'], image: '/placeholder.svg' },
        { id: '2', name: 'ITC Kakatiya', rating: 4.6, price: '₹8,000 - ₹16,000', amenities: ['Luxury Spa', 'Pool', 'Restaurant', 'Business Center'], image: '/placeholder.svg' },
        { id: '3', name: 'Novotel Hyderabad', rating: 4.4, price: '₹6,000 - ₹12,000', amenities: ['Swimming Pool', 'Spa', 'Restaurant', 'Conference Hall'], image: '/placeholder.svg' },
        { id: '4', name: 'Park Hyatt', rating: 4.5, price: '₹7,000 - ₹14,000', amenities: ['Luxury Amenities', 'Pool', 'Fine Dining', 'Business Center'], image: '/placeholder.svg' }
      ],
      pune: [
        { id: '1', name: 'The Westin Pune', rating: 4.5, price: '₹7,000 - ₹14,000', amenities: ['Swimming Pool', 'Spa', 'Restaurant', 'Business Center'], image: '/placeholder.svg' },
        { id: '2', name: 'Hyatt Regency', rating: 4.4, price: '₹6,000 - ₹12,000', amenities: ['Luxury Spa', 'Pool', 'Fine Dining', 'Conference Hall'], image: '/placeholder.svg' },
        { id: '3', name: 'Conrad Pune', rating: 4.6, price: '₹8,000 - ₹16,000', amenities: ['Luxury Amenities', 'Spa', 'Restaurant', 'Bar'], image: '/placeholder.svg' },
        { id: '4', name: 'Marriott Suites', rating: 4.3, price: '₹5,000 - ₹10,000', amenities: ['Swimming Pool', 'Restaurant', 'Business Center', 'Room Service'], image: '/placeholder.svg' }
      ],
      ahmedabad: [
        { id: '1', name: 'Hyatt Regency', rating: 4.5, price: '₹7,000 - ₹14,000', amenities: ['Swimming Pool', 'Spa', 'Restaurant', 'Business Center'], image: '/placeholder.svg' },
        { id: '2', name: 'The House of MG', rating: 4.6, price: '₹8,000 - ₹16,000', amenities: ['Heritage Property', 'Fine Dining', 'Spa', 'Gardens'], image: '/placeholder.svg' },
        { id: '3', name: 'Novotel Ahmedabad', rating: 4.4, price: '₹6,000 - ₹12,000', amenities: ['Swimming Pool', 'Spa', 'Restaurant', 'Conference Hall'], image: '/placeholder.svg' },
        { id: '4', name: 'Fortune Landmark', rating: 4.3, price: '₹5,000 - ₹10,000', amenities: ['Business Center', 'Restaurant', 'Room Service', 'Parking'], image: '/placeholder.svg' }
      ],
      jaipur: [
        { id: '1', name: 'Rambagh Palace', rating: 4.8, price: '₹15,000 - ₹25,000', amenities: ['Heritage Palace', 'Fine Dining', 'Spa', 'Gardens'], image: '/placeholder.svg' },
        { id: '2', name: 'The Oberoi Rajvilas', rating: 4.7, price: '₹12,000 - ₹22,000', amenities: ['Luxury Spa', 'Pool', 'Restaurant', 'Business Center'], image: '/placeholder.svg' },
        { id: '3', name: 'ITC Rajputana', rating: 4.5, price: '₹8,000 - ₹16,000', amenities: ['Luxury Amenities', 'Spa', 'Fine Dining', 'Conference Hall'], image: '/placeholder.svg' },
        { id: '4', name: 'Trident Jaipur', rating: 4.4, price: '₹6,000 - ₹12,000', amenities: ['Swimming Pool', 'Restaurant', 'Business Center', 'Room Service'], image: '/placeholder.svg' }
      ],
      surat: [
        { id: '1', name: 'The Grand Bhagwati', rating: 4.2, price: '₹3,500 - ₹5,500', amenities: ['Free WiFi', 'Swimming Pool', 'Restaurant', 'Business Center'], image: '/placeholder.svg' },
        { id: '2', name: 'Hotel Orange International', rating: 4.0, price: '₹2,800 - ₹4,200', amenities: ['Free WiFi', 'Restaurant', 'Conference Hall', 'Parking'], image: '/placeholder.svg' },
        { id: '3', name: 'Lords Plaza Surat', rating: 4.3, price: '₹4,000 - ₹6,000', amenities: ['Swimming Pool', 'Spa', 'Multi-cuisine Restaurant', 'Gym'], image: '/placeholder.svg' },
        { id: '4', name: 'Hotel Express Residency', rating: 3.8, price: '₹1,800 - ₹2,800', amenities: ['Free WiFi', 'Restaurant', 'Room Service', 'AC'], image: '/placeholder.svg' }
      ],
      kanpur: [
        { id: '1', name: 'Hotel Royal Cliff', rating: 4.1, price: '₹2,500 - ₹4,000', amenities: ['Free WiFi', 'Restaurant', 'Conference Hall', 'Parking'], image: '/placeholder.svg' },
        { id: '2', name: 'Landmark Hotel', rating: 4.0, price: '₹2,200 - ₹3,500', amenities: ['Restaurant', 'Business Center', 'Room Service', 'AC'], image: '/placeholder.svg' },
        { id: '3', name: 'Hotel Mandakini Palace', rating: 3.9, price: '₹1,800 - ₹2,800', amenities: ['Free WiFi', 'Restaurant', 'Banquet Hall', 'Parking'], image: '/placeholder.svg' },
        { id: '4', name: 'Hotel Meghdoot', rating: 3.7, price: '₹1,500 - ₹2,200', amenities: ['Restaurant', 'Room Service', 'AC', 'Parking'], image: '/placeholder.svg' }
      ],
      thane: [
        { id: '1', name: 'Hotel Regency', rating: 4.2, price: '₹3,800 - ₹5,500', amenities: ['Free WiFi', 'Swimming Pool', 'Restaurant', 'Gym'], image: '/placeholder.svg' },
        { id: '2', name: 'Lily Sarovar Portico', rating: 4.3, price: '₹4,200 - ₹6,200', amenities: ['Swimming Pool', 'Spa', 'Multi-cuisine Restaurant', 'Business Center'], image: '/placeholder.svg' },
        { id: '3', name: 'Hotel Woodland', rating: 3.9, price: '₹2,500 - ₹3,800', amenities: ['Free WiFi', 'Restaurant', 'Conference Hall', 'Parking'], image: '/placeholder.svg' },
        { id: '4', name: 'Executive Enclave', rating: 4.0, price: '₹3,200 - ₹4,500', amenities: ['Restaurant', 'Business Center', 'Room Service', 'AC'], image: '/placeholder.svg' }
      ],
      visakhapatnam: [
        { id: '1', name: 'The Park Visakhapatnam', rating: 4.4, price: '₹5,500 - ₹8,500', amenities: ['Beach View', 'Swimming Pool', 'Spa', 'Multi-cuisine Restaurant'], image: '/placeholder.svg' },
        { id: '2', name: 'Novotel Visakhapatnam', rating: 4.5, price: '₹6,000 - ₹9,000', amenities: ['Beach Access', 'Swimming Pool', 'Fitness Center', 'Restaurant'], image: '/placeholder.svg' },
        { id: '3', name: 'Hotel Daspalla', rating: 4.1, price: '₹3,500 - ₹5,200', amenities: ['Sea View', 'Restaurant', 'Conference Hall', 'Room Service'], image: '/placeholder.svg' },
        { id: '4', name: 'Treebo Trend Grand Bay', rating: 3.9, price: '₹2,800 - ₹4,000', amenities: ['Free WiFi', 'Restaurant', 'AC', 'Parking'], image: '/placeholder.svg' }
      ],
      patna: [
        { id: '1', name: 'Hotel Chandragupta', rating: 4.0, price: '₹2,800 - ₹4,200', amenities: ['Free WiFi', 'Restaurant', 'Conference Hall', 'Business Center'], image: '/placeholder.svg' },
        { id: '2', name: 'Hotel Maurya Patna', rating: 4.2, price: '₹3,500 - ₹5,000', amenities: ['Swimming Pool', 'Spa', 'Multi-cuisine Restaurant', 'Gym'], image: '/placeholder.svg' },
        { id: '3', name: 'Lemon Tree Hotel', rating: 4.3, price: '₹4,000 - ₹5,800', amenities: ['Modern Amenities', 'Restaurant', 'Fitness Center', 'Business Center'], image: '/placeholder.svg' },
        { id: '4', name: 'Hotel Windsor', rating: 3.8, price: '₹2,200 - ₹3,500', amenities: ['Restaurant', 'Room Service', 'AC', 'Parking'], image: '/placeholder.svg' }
      ],
      ghaziabad: [
        { id: '1', name: 'Radisson Blu Hotel', rating: 4.4, price: '₹5,000 - ₹7,500', amenities: ['Swimming Pool', 'Spa', 'Multi-cuisine Restaurant', 'Business Center'], image: '/placeholder.svg' },
        { id: '2', name: 'Mahagun Sarovar Portico', rating: 4.2, price: '₹4,200 - ₹6,000', amenities: ['Restaurant', 'Banquet Hall', 'Gym', 'Conference Room'], image: '/placeholder.svg' },
        { id: '3', name: 'Hotel Hindusthan International', rating: 3.9, price: '₹2,800 - ₹4,200', amenities: ['Free WiFi', 'Restaurant', 'Room Service', 'Parking'], image: '/placeholder.svg' },
        { id: '4', name: 'The Grand Venice', rating: 4.0, price: '₹3,500 - ₹5,000', amenities: ['Restaurant', 'Conference Hall', 'Business Center', 'AC'], image: '/placeholder.svg' }
      ],
      ludhiana: [
        { id: '1', name: 'Park Plaza Ludhiana', rating: 4.3, price: '₹4,500 - ₹6,500', amenities: ['Swimming Pool', 'Spa', 'Multi-cuisine Restaurant', 'Business Center'], image: '/placeholder.svg' },
        { id: '2', name: 'Hotel Maharaja Regency', rating: 4.0, price: '₹3,200 - ₹4,800', amenities: ['Restaurant', 'Banquet Hall', 'Conference Room', 'Parking'], image: '/placeholder.svg' },
        { id: '3', name: 'Hotel President', rating: 3.9, price: '₹2,500 - ₹3,800', amenities: ['Free WiFi', 'Restaurant', 'Room Service', 'AC'], image: '/placeholder.svg' },
        { id: '4', name: 'WelcomHotel Bella Vista', rating: 4.2, price: '₹4,000 - ₹5,800', amenities: ['Garden View', 'Restaurant', 'Gym', 'Business Center'], image: '/placeholder.svg' }
      ],
      nashik: [
        { id: '1', name: 'Express Inn', rating: 4.1, price: '₹3,000 - ₹4,500', amenities: ['Free WiFi', 'Restaurant', 'Conference Hall', 'Parking'], image: '/placeholder.svg' },
        { id: '2', name: 'Hotel Panchavati', rating: 4.0, price: '₹2,800 - ₹4,000', amenities: ['Restaurant', 'Banquet Hall', 'Room Service', 'AC'], image: '/placeholder.svg' },
        { id: '3', name: 'Lily Sarovar Portico', rating: 4.2, price: '₹3,800 - ₹5,500', amenities: ['Swimming Pool', 'Spa', 'Multi-cuisine Restaurant', 'Business Center'], image: '/placeholder.svg' },
        { id: '4', name: 'Hotel Ibis Nashik', rating: 4.3, price: '₹4,200 - ₹6,000', amenities: ['Modern Amenities', 'Restaurant', 'Fitness Center', 'Conference Room'], image: '/placeholder.svg' }
      ],
      faridabad: [
        { id: '1', name: 'Crown Plaza Today', rating: 4.2, price: '₹4,000 - ₹6,000', amenities: ['Swimming Pool', 'Restaurant', 'Business Center', 'Gym'], image: '/placeholder.svg' },
        { id: '2', name: 'Hotel Aravali Hills', rating: 3.9, price: '₹2,800 - ₹4,200', amenities: ['Free WiFi', 'Restaurant', 'Conference Hall', 'Parking'], image: '/placeholder.svg' },
        { id: '3', name: 'Shangri-La Hotel', rating: 4.4, price: '₹5,500 - ₹8,000', amenities: ['Luxury Amenities', 'Spa', 'Multi-cuisine Restaurant', 'Pool'], image: '/placeholder.svg' },
        { id: '4', name: 'Hotel Picasso', rating: 3.8, price: '₹2,500 - ₹3,800', amenities: ['Restaurant', 'Room Service', 'AC', 'Business Center'], image: '/placeholder.svg' }
      ],
      meerut: [
        { id: '1', name: 'Godwin Hotel', rating: 4.0, price: '₹2,800 - ₹4,200', amenities: ['Free WiFi', 'Restaurant', 'Conference Hall', 'Parking'], image: '/placeholder.svg' },
        { id: '2', name: 'Hotel Regency', rating: 3.9, price: '₹2,500 - ₹3,800', amenities: ['Restaurant', 'Banquet Hall', 'Room Service', 'AC'], image: '/placeholder.svg' },
        { id: '3', name: 'The Grand Regent', rating: 4.1, price: '₹3,200 - ₹4,800', amenities: ['Swimming Pool', 'Restaurant', 'Business Center', 'Gym'], image: '/placeholder.svg' },
        { id: '4', name: 'Hotel Kwality', rating: 3.7, price: '₹2,000 - ₹3,200', amenities: ['Restaurant', 'Room Service', 'AC', 'Parking'], image: '/placeholder.svg' }
      ],
      rajkot: [
        { id: '1', name: 'Regency Lagoon Resort', rating: 4.2, price: '₹3,800 - ₹5,500', amenities: ['Swimming Pool', 'Spa', 'Multi-cuisine Restaurant', 'Garden'], image: '/placeholder.svg' },
        { id: '2', name: 'Hotel Kavery', rating: 4.0, price: '₹2,800 - ₹4,200', amenities: ['Free WiFi', 'Restaurant', 'Conference Hall', 'Business Center'], image: '/placeholder.svg' },
        { id: '3', name: 'Fortune Park JPS Grand', rating: 4.3, price: '₹4,500 - ₹6,500', amenities: ['Luxury Amenities', 'Restaurant', 'Spa', 'Fitness Center'], image: '/placeholder.svg' },
        { id: '4', name: 'Hotel Imperial Palace', rating: 3.9, price: '₹2,500 - ₹3,800', amenities: ['Restaurant', 'Banquet Hall', 'Room Service', 'AC'], image: '/placeholder.svg' }
      ],
      srinagar: [
        { id: '1', name: 'The Lalit Grand Palace', rating: 4.6, price: '₹8,000 - ₹12,000', amenities: ['Lake View', 'Heritage Property', 'Spa', 'Multi-cuisine Restaurant'], image: '/placeholder.svg' },
        { id: '2', name: 'Vivanta Dal View', rating: 4.4, price: '₹6,500 - ₹9,500', amenities: ['Dal Lake View', 'Restaurant', 'Conference Hall', 'Garden'], image: '/placeholder.svg' },
        { id: '3', name: 'Hotel Akbar', rating: 4.0, price: '₹3,500 - ₹5,500', amenities: ['Mountain View', 'Restaurant', 'Room Service', 'Parking'], image: '/placeholder.svg' },
        { id: '4', name: 'Houseboat Sukoon', rating: 4.5, price: '₹4,000 - ₹7,000', amenities: ['Unique Stay', 'Dal Lake', 'Traditional Kashmiri Cuisine', 'Boat Rides'], image: '/placeholder.svg' }
      ],
      aurangabad: [
        { id: '1', name: 'Lemon Tree Hotel', rating: 4.3, price: '₹4,000 - ₹6,000', amenities: ['Modern Amenities', 'Restaurant', 'Fitness Center', 'Business Center'], image: '/placeholder.svg' },
        { id: '2', name: 'Vivanta Aurangabad', rating: 4.4, price: '₹5,500 - ₹8,000', amenities: ['Swimming Pool', 'Spa', 'Multi-cuisine Restaurant', 'Conference Hall'], image: '/placeholder.svg' },
        { id: '3', name: 'Hotel Panchavati', rating: 4.0, price: '₹2,800 - ₹4,200', amenities: ['Free WiFi', 'Restaurant', 'Banquet Hall', 'Parking'], image: '/placeholder.svg' },
        { id: '4', name: 'Ambassador Ajanta', rating: 3.9, price: '₹2,500 - ₹3,800', amenities: ['Restaurant', 'Conference Room', 'Room Service', 'AC'], image: '/placeholder.svg' }
      ],
      ranchi: [
        { id: '1', name: 'Radisson Blu Hotel', rating: 4.4, price: '₹5,000 - ₹7,500', amenities: ['Swimming Pool', 'Spa', 'Multi-cuisine Restaurant', 'Business Center'], image: '/placeholder.svg' },
        { id: '2', name: 'Hotel Capitol Hill', rating: 4.1, price: '₹3,200 - ₹4,800', amenities: ['Free WiFi', 'Restaurant', 'Conference Hall', 'Gym'], image: '/placeholder.svg' },
        { id: '3', name: 'BNR Hotel', rating: 3.9, price: '₹2,500 - ₹3,800', amenities: ['Restaurant', 'Banquet Hall', 'Room Service', 'Parking'], image: '/placeholder.svg' },
        { id: '4', name: 'Hotel Yuvraj Palace', rating: 4.0, price: '₹2,800 - ₹4,200', amenities: ['Restaurant', 'Conference Room', 'Business Center', 'AC'], image: '/placeholder.svg' }
      ],
      coimbatore: [
        { id: '1', name: 'Vivanta Coimbatore', rating: 4.5, price: '₹6,000 - ₹9,000', amenities: ['Swimming Pool', 'Spa', 'Multi-cuisine Restaurant', 'Business Center'], image: '/placeholder.svg' },
        { id: '2', name: 'Hotel Heritage Inn', rating: 4.2, price: '₹3,500 - ₹5,200', amenities: ['Free WiFi', 'Restaurant', 'Conference Hall', 'Gym'], image: '/placeholder.svg' },
        { id: '3', name: 'Le Meridien Coimbatore', rating: 4.6, price: '₹7,000 - ₹10,500', amenities: ['Luxury Amenities', 'Spa', 'Fine Dining', 'Pool'], image: '/placeholder.svg' },
        { id: '4', name: 'Hotel City Tower', rating: 3.9, price: '₹2,800 - ₹4,000', amenities: ['Restaurant', 'Business Center', 'Room Service', 'AC'], image: '/placeholder.svg' }
      ],
      jabalpur: [
        { id: '1', name: 'Hotel Narmada Jacksons', rating: 4.1, price: '₹3,000 - ₹4,500', amenities: ['Free WiFi', 'Restaurant', 'Conference Hall', 'Business Center'], image: '/placeholder.svg' },
        { id: '2', name: 'Kalchuri Residency', rating: 4.0, price: '₹2,800 - ₹4,200', amenities: ['Restaurant', 'Banquet Hall', 'Room Service', 'Parking'], image: '/placeholder.svg' },
        { id: '3', name: 'Hotel Samdareeya', rating: 3.9, price: '₹2,500 - ₹3,800', amenities: ['Restaurant', 'Conference Room', 'AC', 'Free WiFi'], image: '/placeholder.svg' },
        { id: '4', name: 'Lords Inn Jabalpur', rating: 4.2, price: '₹3,500 - ₹5,000', amenities: ['Swimming Pool', 'Restaurant', 'Fitness Center', 'Business Center'], image: '/placeholder.svg' }
      ],
      gwalior: [
        { id: '1', name: 'Usha Kiran Palace', rating: 4.5, price: '₹6,500 - ₹9,500', amenities: ['Heritage Property', 'Palace Experience', 'Fine Dining', 'Gardens'], image: '/placeholder.svg' },
        { id: '2', name: 'Hotel Central Park', rating: 4.1, price: '₹3,200 - ₹4,800', amenities: ['Free WiFi', 'Restaurant', 'Conference Hall', 'Business Center'], image: '/placeholder.svg' },
        { id: '3', name: 'Tansen Residency', rating: 4.0, price: '₹2,800 - ₹4,200', amenities: ['Restaurant', 'Banquet Hall', 'Room Service', 'Parking'], image: '/placeholder.svg' },
        { id: '4', name: 'Hotel Shelter', rating: 3.8, price: '₹2,200 - ₹3,500', amenities: ['Restaurant', 'Room Service', 'AC', 'Free WiFi'], image: '/placeholder.svg' }
      ],
      vijayawada: [
        { id: '1', name: 'Novotel Vijayawada Varun', rating: 4.4, price: '₹5,500 - ₹8,000', amenities: ['River View', 'Swimming Pool', 'Spa', 'Multi-cuisine Restaurant'], image: '/placeholder.svg' },
        { id: '2', name: 'Hotel Midcity', rating: 4.1, price: '₹3,000 - ₹4,500', amenities: ['Free WiFi', 'Restaurant', 'Conference Hall', 'Business Center'], image: '/placeholder.svg' },
        { id: '3', name: 'Fortune Murali Park', rating: 4.3, price: '₹4,200 - ₹6,200', amenities: ['Swimming Pool', 'Restaurant', 'Spa', 'Fitness Center'], image: '/placeholder.svg' },
        { id: '4', name: 'Hotel Kandhari', rating: 3.9, price: '₹2,500 - ₹3,800', amenities: ['Restaurant', 'Banquet Hall', 'Room Service', 'AC'], image: '/placeholder.svg' }
      ],
      jodhpur: [
        { id: '1', name: 'Umaid Bhawan Palace', rating: 4.8, price: '₹15,000 - ₹25,000', amenities: ['Heritage Palace', 'Museum', 'Luxury Spa', 'Fine Dining'], image: '/placeholder.svg' },
        { id: '2', name: 'Welcomhotel Jodhpur', rating: 4.4, price: '₹5,500 - ₹8,500', amenities: ['Swimming Pool', 'Spa', 'Multi-cuisine Restaurant', 'Business Center'], image: '/placeholder.svg' },
        { id: '3', name: 'Ranbanka Palace', rating: 4.2, price: '₹4,000 - ₹6,500', amenities: ['Heritage Hotel', 'Traditional Architecture', 'Restaurant', 'Gardens'], image: '/placeholder.svg' },
        { id: '4', name: 'Hotel Haveli', rating: 4.0, price: '₹2,800 - ₹4,200', amenities: ['Traditional Decor', 'Restaurant', 'Rooftop Views', 'AC'], image: '/placeholder.svg' }
      ],
      madurai: [
        { id: '1', name: 'Heritage Madurai', rating: 4.3, price: '₹4,500 - ₹6,500', amenities: ['Swimming Pool', 'Spa', 'Multi-cuisine Restaurant', 'Business Center'], image: '/placeholder.svg' },
        { id: '2', name: 'Hotel Sangam', rating: 4.1, price: '₹3,200 - ₹4,800', amenities: ['Free WiFi', 'Restaurant', 'Conference Hall', 'Gym'], image: '/placeholder.svg' },
        { id: '3', name: 'Poplar Hotel', rating: 4.0, price: '₹2,800 - ₹4,200', amenities: ['Restaurant', 'Banquet Hall', 'Room Service', 'AC'], image: '/placeholder.svg' },
        { id: '4', name: 'Hotel Supreme', rating: 3.9, price: '₹2,500 - ₹3,800', amenities: ['Restaurant', 'Conference Room', 'Parking', 'Free WiFi'], image: '/placeholder.svg' }
      ],
      raipur: [
        { id: '1', name: 'Hyatt Raipur', rating: 4.5, price: '₹6,000 - ₹9,000', amenities: ['Swimming Pool', 'Spa', 'Multi-cuisine Restaurant', 'Business Center'], image: '/placeholder.svg' },
        { id: '2', name: 'Babylon Inn', rating: 4.1, price: '₹3,000 - ₹4,500', amenities: ['Free WiFi', 'Restaurant', 'Conference Hall', 'Parking'], image: '/placeholder.svg' },
        { id: '3', name: 'Hotel Piccadily', rating: 4.0, price: '₹2,800 - ₹4,200', amenities: ['Restaurant', 'Banquet Hall', 'Business Center', 'AC'], image: '/placeholder.svg' },
        { id: '4', name: 'Ramada Raipur', rating: 4.2, price: '₹3,800 - ₹5,500', amenities: ['Swimming Pool', 'Restaurant', 'Fitness Center', 'Conference Room'], image: '/placeholder.svg' }
      ],
      kota: [
        { id: '1', name: 'Sukhdham Kothi', rating: 4.2, price: '₹3,500 - ₹5,200', amenities: ['Heritage Property', 'Garden', 'Restaurant', 'Traditional Architecture'], image: '/placeholder.svg' },
        { id: '2', name: 'Hotel Navrang', rating: 4.0, price: '₹2,800 - ₹4,200', amenities: ['Free WiFi', 'Restaurant', 'Conference Hall', 'Business Center'], image: '/placeholder.svg' },
        { id: '3', name: 'Umed Bhawan Palace', rating: 4.3, price: '₹4,500 - ₹6,800', amenities: ['Palace Hotel', 'Swimming Pool', 'Spa', 'Fine Dining'], image: '/placeholder.svg' },
        { id: '4', name: 'Hotel Brij Raj Bhawan', rating: 4.1, price: '₹3,200 - ₹4,800', amenities: ['Heritage Hotel', 'Restaurant', 'Gardens', 'Room Service'], image: '/placeholder.svg' }
      ],
      guwahati: [
        { id: '1', name: 'Radisson Blu Hotel', rating: 4.4, price: '₹5,000 - ₹7,500', amenities: ['River View', 'Swimming Pool', 'Spa', 'Multi-cuisine Restaurant'], image: '/placeholder.svg' },
        { id: '2', name: 'Hotel Dynasty', rating: 4.1, price: '₹3,200 - ₹4,800', amenities: ['Free WiFi', 'Restaurant', 'Conference Hall', 'Business Center'], image: '/placeholder.svg' },
        { id: '3', name: 'Vivanta Guwahati', rating: 4.5, price: '₹5,500 - ₹8,000', amenities: ['Luxury Amenities', 'Spa', 'Fine Dining', 'Fitness Center'], image: '/placeholder.svg' },
        { id: '4', name: 'Hotel Brahmaputra Ashok', rating: 3.9, price: '₹2,800 - ₹4,200', amenities: ['Restaurant', 'Conference Room', 'Room Service', 'Parking'], image: '/placeholder.svg' }
      ],
      solapur: [
        { id: '1', name: 'Hotel Tripursundari', rating: 4.0, price: '₹2,500 - ₹3,800', amenities: ['Free WiFi', 'Restaurant', 'Conference Hall', 'Parking'], image: '/placeholder.svg' },
        { id: '2', name: 'Fariyas Hotel', rating: 4.1, price: '₹3,200 - ₹4,500', amenities: ['Swimming Pool', 'Restaurant', 'Business Center', 'Gym'], image: '/placeholder.svg' },
        { id: '3', name: 'Hotel Surya Executive', rating: 3.9, price: '₹2,200 - ₹3,500', amenities: ['Restaurant', 'Banquet Hall', 'Room Service', 'AC'], image: '/placeholder.svg' },
        { id: '4', name: 'Priyadarshini Hotel', rating: 3.8, price: '₹2,000 - ₹3,000', amenities: ['Restaurant', 'Conference Room', 'Free WiFi', 'Parking'], image: '/placeholder.svg' }
      ],
      'hubli-dharwad': [
        { id: '1', name: 'Clarks Inn Suites', rating: 4.2, price: '₹3,500 - ₹5,200', amenities: ['Swimming Pool', 'Restaurant', 'Business Center', 'Gym'], image: '/placeholder.svg' },
        { id: '2', name: 'Hotel Naveen', rating: 4.0, price: '₹2,800 - ₹4,200', amenities: ['Free WiFi', 'Restaurant', 'Conference Hall', 'Parking'], image: '/placeholder.svg' },
        { id: '3', name: 'The Hans Hotel', rating: 4.1, price: '₹3,200 - ₹4,800', amenities: ['Restaurant', 'Banquet Hall', 'Business Center', 'AC'], image: '/placeholder.svg' },
        { id: '4', name: 'Hotel Ajanta', rating: 3.9, price: '₹2,500 - ₹3,800', amenities: ['Restaurant', 'Room Service', 'Conference Room', 'Free WiFi'], image: '/placeholder.svg' }
      ],
      tiruchirappalli: [
        { id: '1', name: 'SRM Hotel', rating: 4.2, price: '₹3,500 - ₹5,200', amenities: ['Swimming Pool', 'Restaurant', 'Business Center', 'Conference Hall'], image: '/placeholder.svg' },
        { id: '2', name: 'Hotel Sangam', rating: 4.1, price: '₹3,000 - ₹4,500', amenities: ['Free WiFi', 'Restaurant', 'Banquet Hall', 'Gym'], image: '/placeholder.svg' },
        { id: '3', name: 'Grand Estancia', rating: 4.0, price: '₹2,800 - ₹4,200', amenities: ['Restaurant', 'Conference Room', 'Business Center', 'AC'], image: '/placeholder.svg' },
        { id: '4', name: 'Hotel Ramyas', rating: 3.9, price: '₹2,500 - ₹3,800', amenities: ['Restaurant', 'Room Service', 'Parking', 'Free WiFi'], image: '/placeholder.svg' }
      ],
      bareilly: [
        { id: '1', name: 'Hotel Bareilly Palace', rating: 4.0, price: '₹2,800 - ₹4,200', amenities: ['Free WiFi', 'Restaurant', 'Conference Hall', 'Business Center'], image: '/placeholder.svg' },
        { id: '2', name: 'MP Hotel', rating: 3.9, price: '₹2,500 - ₹3,800', amenities: ['Restaurant', 'Banquet Hall', 'Room Service', 'AC'], image: '/placeholder.svg' },
        { id: '3', name: 'Hotel Kwality', rating: 3.8, price: '₹2,200 - ₹3,500', amenities: ['Restaurant', 'Conference Room', 'Parking', 'Free WiFi'], image: '/placeholder.svg' },
        { id: '4', name: 'Hotel Rajmahal', rating: 4.1, price: '₹3,000 - ₹4,500', amenities: ['Swimming Pool', 'Restaurant', 'Business Center', 'Gym'], image: '/placeholder.svg' }
      ],
      mysore: [
        { id: '1', name: 'Lalitha Mahal Palace Hotel', rating: 4.5, price: '₹6,000 - ₹9,500', amenities: ['Heritage Palace', 'Fine Dining', 'Spa', 'Gardens'], image: '/placeholder.svg' },
        { id: '2', name: 'The Windflower Resort', rating: 4.3, price: '₹4,500 - ₹6,800', amenities: ['Resort Setting', 'Swimming Pool', 'Spa', 'Multi-cuisine Restaurant'], image: '/placeholder.svg' },
        { id: '3', name: 'Hotel Mayura Hoysala', rating: 4.0, price: '₹2,800 - ₹4,200', amenities: ['Free WiFi', 'Restaurant', 'Conference Hall', 'Parking'], image: '/placeholder.svg' },
        { id: '4', name: 'Radisson Blu Plaza Hotel', rating: 4.4, price: '₹5,200 - ₹7,800', amenities: ['Swimming Pool', 'Spa', 'Business Center', 'Fine Dining'], image: '/placeholder.svg' }
      ],
      tiruppur: [
        { id: '1', name: 'Hotel Kannappa', rating: 4.1, price: '₹3,000 - ₹4,500', amenities: ['Free WiFi', 'Restaurant', 'Conference Hall', 'Business Center'], image: '/placeholder.svg' },
        { id: '2', name: 'Velan Hotel', rating: 4.0, price: '₹2,800 - ₹4,200', amenities: ['Restaurant', 'Banquet Hall', 'Room Service', 'AC'], image: '/placeholder.svg' },
        { id: '3', name: 'Hotel Vijay Park Inn', rating: 3.9, price: '₹2,500 - ₹3,800', amenities: ['Restaurant', 'Conference Room', 'Parking', 'Free WiFi'], image: '/placeholder.svg' },
        { id: '4', name: 'Park Avenue', rating: 4.2, price: '₹3,500 - ₹5,200', amenities: ['Swimming Pool', 'Restaurant', 'Fitness Center', 'Business Center'], image: '/placeholder.svg' }
      ]
    };

    return hotelData[cityLower] || [
      { id: '1', name: 'Hotel Grand Palace', rating: 4.0, price: '₹3,000 - ₹5,000', amenities: ['Free WiFi', 'Restaurant', 'AC', 'Room Service'], image: '/placeholder.svg' },
      { id: '2', name: 'City Center Hotel', rating: 3.8, price: '₹2,500 - ₹4,000', amenities: ['Restaurant', 'Parking', 'Conference Hall'], image: '/placeholder.svg' },
      { id: '3', name: 'Budget Inn', rating: 3.5, price: '₹1,500 - ₹2,500', amenities: ['Basic Amenities', 'Clean Rooms', 'AC'], image: '/placeholder.svg' }
    ];
  };

  useEffect(() => {
    setLoading(true);
    const hotelsForCity = getHotelsForCity(tripData.destination);
    setTimeout(() => {
      setHotels(hotelsForCity);
      setLoading(false);
    }, 1000);
  }, [tripData.destination]);

  const handleSelectHotel = (hotel: Hotel) => {
    setSelectedHotel(hotel);
  };

  const handleNext = () => {
    console.log('Selected hotel:', selectedHotel);
    onNext();
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
          <div className="grid md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gradient-to-r from-gray-200 to-gray-300 h-48 rounded-lg mb-4"></div>
                <div className="bg-gray-200 h-6 rounded mb-2"></div>
                <div className="bg-gray-200 h-4 rounded w-3/4"></div>
                <div className="bg-gray-200 h-4 rounded w-1/2 mt-2"></div>
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
          Hotel Recommendations in {tripData.destination}
        </CardTitle>
        <p className="text-gray-600 font-semibold">
          Choose your preferred hotel (optional)
        </p>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid md:grid-cols-2 gap-6">
          {hotels.map((hotel) => (
            <Card
              key={hotel.id}
              className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 ${
                selectedHotel?.id === hotel.id
                  ? 'ring-2 ring-orange-500 bg-gradient-to-br from-orange-50 to-blue-50'
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => handleSelectHotel(hotel)}
            >
              <img src={hotel.image} alt={hotel.name} className="h-48 w-full object-cover rounded-t-lg" />
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-2 text-gray-800 flex items-center">
                  {hotel.name}
                  <Star className="ml-2 h-5 w-5 text-yellow-400" />
                  <span className="ml-1 text-yellow-600 font-semibold">{hotel.rating.toFixed(1)}</span>
                </h3>
                <p className="text-sm text-gray-600 mb-3 font-medium">Price Range: {hotel.price}</p>
                <div className="flex flex-wrap gap-2">
                  {hotel.amenities.map((amenity, index) => (
                    <span key={index} className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                      {amenity}
                    </span>
                  ))}
                </div>
                <Button
                  className={`w-full mt-4 font-semibold ${
                    selectedHotel?.id === hotel.id
                      ? 'bg-gradient-to-r from-orange-500 to-blue-600 hover:from-orange-600 hover:to-blue-700 text-white'
                      : 'border-2 border-orange-200 text-orange-600 hover:bg-orange-50'
                  }`}
                  variant={selectedHotel?.id === hotel.id ? "default" : "outline"}
                >
                  {selectedHotel?.id === hotel.id ? '✓ Selected' : 'Select this Hotel'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {selectedHotel && (
          <div className="mt-8 p-6 bg-gradient-to-r from-orange-50 to-blue-50 rounded-xl border-2 border-orange-200">
            <h4 className="font-bold text-xl mb-2 text-gray-800">Selected Hotel:</h4>
            <p className="text-gray-700 font-semibold">
              {selectedHotel.name} - {selectedHotel.price} - Rating: {selectedHotel.rating.toFixed(1)}
            </p>
          </div>
        )}

        <div className="flex justify-end mt-8">
          <Button onClick={handleNext} className="bg-gradient-to-r from-orange-500 to-blue-600 hover:from-orange-600 hover:to-blue-700 text-white font-bold px-8 py-3 text-lg">
            Next: Attractions
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
