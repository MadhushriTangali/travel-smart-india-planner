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
      chandigarh: [
        { id: '1', name: 'JW Marriott Hotel Chandigarh', rating: 4.7, price: 15000, amenities: ['Pool', 'Spa', 'Restaurant', 'Gym'], distance: '2 km from Sector 17', description: 'Luxury business hotel' },
        { id: '2', name: 'Hyatt Regency Chandigarh', rating: 4.6, price: 12000, amenities: ['Pool', 'Spa', 'Restaurant'], distance: '3 km from Sukhna Lake', description: 'Premium city hotel' },
        { id: '3', name: 'The Lalit Chandigarh', rating: 4.5, price: 10000, amenities: ['Pool', 'Restaurant', 'Free WiFi'], distance: '4 km from Rock Garden', description: 'Contemporary hotel' },
        { id: '4', name: 'Taj Chandigarh', rating: 4.4, price: 9000, amenities: ['Pool', 'Restaurant', 'Spa'], distance: '2 km from Sector 17', description: 'Heritage business hotel' },
        { id: '5', name: 'Lemon Tree Hotel Chandigarh', rating: 4.2, price: 6000, amenities: ['Restaurant', 'Free WiFi', 'Gym'], distance: '5 km from Punjab University', description: 'Mid-range business hotel' },
        { id: '6', name: 'Hotel Sunbeam', rating: 4.0, price: 4500, amenities: ['Restaurant', 'Free WiFi', 'AC'], distance: '3 km from Sector 22', description: 'Budget city hotel' },
        { id: '7', name: 'Red Fox Hotel Chandigarh', rating: 4.1, price: 5500, amenities: ['Restaurant', 'Free WiFi', 'Gym'], distance: '6 km from airport', description: 'Modern budget hotel' },
        { id: '8', name: 'Hotel Shivalik View', rating: 3.9, price: 4000, amenities: ['Restaurant', 'Free WiFi'], distance: '4 km from Sector 35', description: 'Economy hotel' },
        { id: '9', name: 'Hometel Chandigarh', rating: 4.0, price: 5000, amenities: ['Free WiFi', 'Restaurant', 'AC'], distance: '5 km from Elante Mall', description: 'Extended stay hotel' },
        { id: '10', name: 'Hotel Parkview', rating: 3.8, price: 3500, amenities: ['Restaurant', 'AC'], distance: '3 km from Sector 24', description: 'Budget accommodation' },
        { id: '11', name: 'OYO Townhouse Chandigarh', rating: 4.0, price: 4200, amenities: ['Free WiFi', 'AC'], distance: '2 km from Sector 17', description: 'Budget chain hotel' },
        { id: '12', name: 'Hotel Mountview', rating: 3.9, price: 4800, amenities: ['Restaurant', 'Free WiFi', 'AC'], distance: '4 km from Rose Garden', description: 'Heritage-style hotel' }
      ],
      indore: [
        { id: '1', name: 'Radisson Blu Hotel Indore', rating: 4.5, price: 8500, amenities: ['Pool', 'Spa', 'Restaurant'], distance: '3 km from Rajwada', description: 'Premium business hotel' },
        { id: '2', name: 'Marriott Indore', rating: 4.6, price: 10000, amenities: ['Pool', 'Spa', 'Restaurant', 'Gym'], distance: '4 km from Sarafa Bazaar', description: 'International luxury hotel' },
        { id: '3', name: 'Lemon Tree Hotel Indore', rating: 4.2, price: 5500, amenities: ['Restaurant', 'Free WiFi', 'Gym'], distance: '2 km from Khajrana Ganesh Temple', description: 'Mid-range business hotel' },
        { id: '4', name: 'Sayaji Hotel Indore', rating: 4.3, price: 7000, amenities: ['Pool', 'Restaurant', 'Free WiFi'], distance: '5 km from Devi Ahilya Bai Airport', description: 'Heritage business hotel' },
        { id: '5', name: 'The Park Indore', rating: 4.1, price: 6000, amenities: ['Restaurant', 'Free WiFi', 'Pool'], distance: '3 km from Lal Bagh Palace', description: 'Contemporary city hotel' },
        { id: '6', name: 'Hotel President', rating: 4.0, price: 4500, amenities: ['Restaurant', 'Free WiFi', 'AC'], distance: '1 km from Rajwada', description: 'Heritage area hotel' },
        { id: '7', name: 'Effotel Hotel Indore', rating: 4.2, price: 5800, amenities: ['Pool', 'Restaurant', 'Free WiFi'], distance: '6 km from Treasure Island Mall', description: 'Business district hotel' },
        { id: '8', name: 'Hotel Shreemaya', rating: 3.9, price: 3800, amenities: ['Restaurant', 'Free WiFi'], distance: '2 km from Chappan Dukan', description: 'Budget city hotel' },
        { id: '9', name: 'OYO Flagship MG Road', rating: 3.8, price: 3200, amenities: ['Free WiFi', 'AC'], distance: '4 km from Indore Junction', description: 'Budget chain hotel' },
        { id: '10', name: 'Hotel Apna Avenue', rating: 3.7, price: 3000, amenities: ['Restaurant', 'AC'], distance: '5 km from Geeta Bhawan', description: 'Economy accommodation' },
        { id: '11', name: 'Treebo Trend O2', rating: 4.0, price: 4000, amenities: ['Free WiFi', 'Restaurant', 'AC'], distance: '3 km from Central Mall', description: 'Modern budget hotel' },
        { id: '12', name: 'Hotel Decent', rating: 3.9, price: 3600, amenities: ['Restaurant', 'Free WiFi', 'AC'], distance: '2 km from Holkar Stadium', description: 'Family hotel' }
      ],
      nagpur: [
        { id: '1', name: 'Radisson Blu Hotel Nagpur', rating: 4.4, price: 8000, amenities: ['Pool', 'Spa', 'Restaurant'], distance: '3 km from Sitabuldi', description: 'Premium business hotel' },
        { id: '2', name: 'The Pride Hotel Nagpur', rating: 4.3, price: 7000, amenities: ['Pool', 'Restaurant', 'Free WiFi'], distance: '2 km from Deekshabhoomi', description: 'Heritage business hotel' },
        { id: '3', name: 'Lemon Tree Hotel Nagpur', rating: 4.1, price: 5500, amenities: ['Restaurant', 'Free WiFi', 'Gym'], distance: '4 km from Ambazari Lake', description: 'Mid-range business hotel' },
        { id: '4', name: 'Hotel Centre Point', rating: 4.0, price: 4500, amenities: ['Restaurant', 'Free WiFi', 'AC'], distance: '1 km from Sitabuldi Fort', description: 'City center hotel' },
        { id: '5', name: 'Tuli Imperial', rating: 4.2, price: 6500, amenities: ['Pool', 'Restaurant', 'Spa'], distance: '5 km from airport', description: 'Airport vicinity hotel' },
        { id: '6', name: 'Hotel Hardeo', rating: 3.9, price: 3800, amenities: ['Restaurant', 'Free WiFi'], distance: '2 km from Kasturchand Park', description: 'Budget city hotel' },
        { id: '7', name: 'Chitakore Hotel', rating: 3.8, price: 3500, amenities: ['Restaurant', 'AC'], distance: '3 km from Seminary Hills', description: 'Heritage hotel' },
        { id: '8', name: 'Hotel Ashoka', rating: 3.7, price: 3200, amenities: ['Restaurant', 'Free WiFi'], distance: '4 km from Zero Mile Stone', description: 'Economy hotel' },
        { id: '9', name: 'OYO Hotel Civil Lines', rating: 3.9, price: 3600, amenities: ['Free WiFi', 'AC'], distance: '2 km from High Court', description: 'Budget chain hotel' },
        { id: '10', name: 'Hotel Regency', rating: 3.8, price: 3400, amenities: ['Restaurant', 'AC'], distance: '5 km from Futala Lake', description: 'Mid-range hotel' },
        { id: '11', name: 'Treebo Trend Residency', rating: 4.0, price: 4200, amenities: ['Free WiFi', 'Restaurant', 'AC'], distance: '3 km from Empress Mall', description: 'Modern budget hotel' },
        { id: '12', name: 'Hotel Blue Moon', rating: 3.6, price: 2800, amenities: ['Restaurant', 'AC'], distance: '6 km from Raman Science Centre', description: 'Budget accommodation' }
      ],
      vadodara: [
        { id: '1', name: 'Four Points by Sheraton Vadodara', rating: 4.4, price: 8500, amenities: ['Pool', 'Spa', 'Restaurant'], distance: '3 km from Laxmi Vilas Palace', description: 'International business hotel' },
        { id: '2', name: 'Welcomhotel Vadodara', rating: 4.3, price: 7500, amenities: ['Pool', 'Restaurant', 'Free WiFi'], distance: '2 km from Sayaji Gardens', description: 'Heritage business hotel' },
        { id: '3', name: 'Lemon Tree Hotel Vadodara', rating: 4.1, price: 5000, amenities: ['Restaurant', 'Free WiFi', 'Gym'], distance: '4 km from Kirti Mandir', description: 'Mid-range business hotel' },
        { id: '4', name: 'Hotel Express Residency', rating: 4.0, price: 4200, amenities: ['Restaurant', 'Free WiFi', 'AC'], distance: '1 km from Vadodara Junction', description: 'Railway station hotel' },
        { id: '5', name: 'GenX Vadodara 1589', rating: 4.2, price: 6000, amenities: ['Pool', 'Restaurant', 'Spa'], distance: '5 km from Akota Gardens', description: 'Contemporary hotel' },
        { id: '6', name: 'Hotel Surya Palace', rating: 3.9, price: 3500, amenities: ['Restaurant', 'Free WiFi'], distance: '2 km from Mandvi Gate', description: 'Heritage area hotel' },
        { id: '7', name: 'OYO Townhouse Alkapuri', rating: 3.8, price: 3800, amenities: ['Free WiFi', 'AC'], distance: '3 km from Alkapuri', description: 'Budget chain hotel' },
        { id: '8', name: 'Hotel Suba Palace', rating: 3.7, price: 3200, amenities: ['Restaurant', 'AC'], distance: '4 km from Nazarbaug Palace', description: 'Heritage hotel' },
        { id: '9', name: 'Treebo Trend Shree Krishna', rating: 4.0, price: 4000, amenities: ['Free WiFi', 'Restaurant', 'AC'], distance: '2 km from Fateh Singh Museum', description: 'Modern budget hotel' },
        { id: '10', name: 'Hotel Anand', rating: 3.6, price: 2800, amenities: ['Restaurant', 'AC'], distance: '5 km from Sursagar Lake', description: 'Budget accommodation' },
        { id: '11', name: 'Hotel Tulsi', rating: 3.8, price: 3400, amenities: ['Restaurant', 'Free WiFi', 'AC'], distance: '3 km from Baroda Museum', description: 'City hotel' },
        { id: '12', name: 'Hotel Royale Residency', rating: 3.9, price: 3600, amenities: ['Restaurant', 'Free WiFi'], distance: '6 km from EME Temple', description: 'Residential area hotel' }
      ],
      agra: [
        { id: '1', name: 'The Oberoi Amarvilas', rating: 4.9, price: 45000, amenities: ['Pool', 'Spa', 'Restaurant', 'Butler Service'], distance: '600m from Taj Mahal', description: 'Luxury resort with Taj Mahal views' },
        { id: '2', name: 'ITC Mughal Agra', rating: 4.7, price: 18000, amenities: ['Pool', 'Spa', 'Restaurant', 'Golf'], distance: '2 km from Taj Mahal', description: 'Mughal-themed luxury hotel' },
        { id: '3', name: 'Taj Hotel & Convention Centre', rating: 4.5, price: 12000, amenities: ['Pool', 'Restaurant', 'Free WiFi'], distance: '3 km from Taj Mahal', description: 'Heritage business hotel' },
        { id: '4', name: 'Trident Agra', rating: 4.4, price: 10000, amenities: ['Pool', 'Restaurant', 'Spa'], distance: '4 km from Fatehpur Sikri Road', description: 'Luxury hotel with gardens' },
        { id: '5', name: 'Radisson Blu Agra', rating: 4.3, price: 8500, amenities: ['Pool', 'Restaurant', 'Free WiFi'], distance: '5 km from Agra Cantt', description: 'Modern business hotel' },
        { id: '6', name: 'Hotel Clarks Shiraz', rating: 4.1, price: 6500, amenities: ['Pool', 'Restaurant', 'Free WiFi'], distance: '2 km from Taj Mahal', description: 'Heritage hotel' },
        { id: '7', name: 'Howard Plaza The Fern', rating: 4.0, price: 5500, amenities: ['Restaurant', 'Free WiFi', 'Pool'], distance: '3 km from Agra Fort', description: 'Eco-friendly hotel' },
        { id: '8', name: 'Hotel Atulyaa Taj', rating: 3.9, price: 4500, amenities: ['Restaurant', 'Free WiFi', 'AC'], distance: '1.5 km from Taj Mahal', description: 'Taj view hotel' },
        { id: '9', name: 'Crystal Sarovar Premiere', rating: 4.2, price: 7000, amenities: ['Pool', 'Restaurant', 'Spa'], distance: '4 km from Sikandra', description: 'Premium hotel' },
        { id: '10', name: 'Hotel Parador', rating: 3.8, price: 3800, amenities: ['Restaurant', 'Free WiFi'], distance: '2.5 km from Taj Mahal', description: 'Budget hotel with Taj views' },
        { id: '11', name: 'OYO Flagship Taj East Gate', rating: 3.7, price: 3200, amenities: ['Free WiFi', 'AC'], distance: '1 km from Taj Mahal', description: 'Budget chain hotel' },
        { id: '12', name: 'Treebo Trend Taj Plaza', rating: 3.9, price: 4000, amenities: ['Free WiFi', 'Restaurant', 'AC'], distance: '1.8 km from Taj Mahal', description: 'Modern budget hotel' }
      ],
      varanasi: [
        { id: '1', name: 'Taj Ganges Varanasi', rating: 4.5, price: 12000, amenities: ['Pool', 'Spa', 'Restaurant', 'River View'], distance: '2 km from Dashashwamedh Ghat', description: 'Luxury hotel overlooking Ganges' },
        { id: '2', name: 'Radisson Hotel Varanasi', rating: 4.4, price: 9000, amenities: ['Pool', 'Restaurant', 'Free WiFi'], distance: '5 km from Sarnath', description: 'Modern business hotel' },
        { id: '3', name: 'Ramada Plaza by Wyndham', rating: 4.3, price: 7500, amenities: ['Pool', 'Restaurant', 'Spa'], distance: '3 km from Kashi Vishwanath Temple', description: 'International chain hotel' },
        { id: '4', name: 'Hotel Hindusthan International', rating: 4.1, price: 5500, amenities: ['Restaurant', 'Free WiFi', 'AC'], distance: '1 km from Varanasi Junction', description: 'Heritage business hotel' },
        { id: '5', name: 'BrijRama Palace', rating: 4.6, price: 15000, amenities: ['Heritage', 'Restaurant', 'River View'], distance: '0.5 km from Darbhanga Ghat', description: 'Heritage palace on Ganges' },
        { id: '6', name: 'Hotel Surya', rating: 4.0, price: 4500, amenities: ['Restaurant', 'Free WiFi', 'AC'], distance: '2 km from Godowlia', description: 'City center hotel' },
        { id: '7', name: 'Rivatas by Ideal', rating: 4.2, price: 8000, amenities: ['Pool', 'Restaurant', 'River View'], distance: '1.5 km from Assi Ghat', description: 'Boutique river hotel' },
        { id: '8', name: 'Hotel Buddha', rating: 3.9, price: 3800, amenities: ['Restaurant', 'Free WiFi'], distance: '3 km from Sarnath Museum', description: 'Buddhist heritage hotel' },
        { id: '9', name: 'Zostel Varanasi', rating: 4.0, price: 1200, amenities: ['Hostel', 'Free WiFi', 'Common Area'], distance: '2 km from Lanka', description: 'Backpacker hostel' },
        { id: '10', name: 'Hotel Temple on Ganges', rating: 3.8, price: 3500, amenities: ['Restaurant', 'River View'], distance: '0.8 km from Manikarnika Ghat', description: 'Heritage ghat hotel' },
        { id: '11', name: 'OYO Flagship Cantonment', rating: 3.7, price: 2800, amenities: ['Free WiFi', 'AC'], distance: '4 km from BHU', description: 'Budget chain hotel' },
        { id: '12', name: 'Treebo Trend Amrita', rating: 3.9, price: 3200, amenities: ['Free WiFi', 'Restaurant', 'AC'], distance: '2.5 km from Dashashwamedh Ghat', description: 'Modern budget hotel' }
      ],
      amritsar: [
        { id: '1', name: 'Hyatt Regency Amritsar', rating: 4.6, price: 12000, amenities: ['Pool', 'Spa', 'Restaurant', 'Gym'], distance: '3 km from Golden Temple', description: 'Luxury business hotel' },
        { id: '2', name: 'Taj Swarna Amritsar', rating: 4.5, price: 10000, amenities: ['Pool', 'Restaurant', 'Free WiFi'], distance: '2 km from Golden Temple', description: 'Heritage luxury hotel' },
        { id: '3', name: 'Radisson Blu Hotel Amritsar', rating: 4.4, price: 8500, amenities: ['Pool', 'Restaurant', 'Spa'], distance: '4 km from Jallianwala Bagh', description: 'International business hotel' },
        { id: '4', name: 'Hotel City Heart Premium', rating: 4.2, price: 6000, amenities: ['Restaurant', 'Free WiFi', 'AC'], distance: '1 km from Golden Temple', description: 'Premium city hotel' },
        { id: '5', name: 'Country Inn & Suites Amritsar', rating: 4.3, price: 7000, amenities: ['Pool', 'Restaurant', 'Free WiFi'], distance: '5 km from airport', description: 'Airport vicinity hotel' },
        { id: '6', name: 'Hotel Hong Kong Inn', rating: 4.0, price: 4500, amenities: ['Restaurant', 'Free WiFi', 'AC'], distance: '1.5 km from Golden Temple', description: 'Heritage area hotel' },
        { id: '7', name: 'Ritz Plaza Amritsar', rating: 4.1, price: 5500, amenities: ['Restaurant', 'Free WiFi', 'Pool'], distance: '2.5 km from Durgiana Temple', description: 'Business hotel' },
        { id: '8', name: 'Hotel CJ International', rating: 3.9, price: 3800, amenities: ['Restaurant', 'Free WiFi'], distance: '2 km from Hall Bazaar', description: 'City center hotel' },
        { id: '9', name: 'OYO Flagship Golden Temple', rating: 3.8, price: 3200, amenities: ['Free WiFi', 'AC'], distance: '0.8 km from Golden Temple', description: 'Budget chain hotel' },
        { id: '10', name: 'Hotel Sawera Grand', rating: 3.7, price: 3000, amenities: ['Restaurant', 'AC'], distance: '3 km from Partition Museum', description: 'Budget hotel' },
        { id: '11', name: 'Treebo Trend Asia Amritsar', rating: 3.9, price: 3600, amenities: ['Free WiFi', 'Restaurant', 'AC'], distance: '2.2 km from Ram Bagh', description: 'Modern budget hotel' },
        { id: '12', name: 'Hotel Shiraz Regency', rating: 3.8, price: 3400, amenities: ['Restaurant', 'Free WiFi', 'AC'], distance: '4 km from Gobindgarh Fort', description: 'Heritage hotel' }
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
