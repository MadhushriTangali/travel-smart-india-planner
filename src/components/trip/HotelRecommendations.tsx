
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
      mumbai: [
        { id: '1', name: 'The Taj Mahal Palace', rating: 4.9, price: 35000, amenities: ['Pool', 'Spa', 'Restaurant', 'Free WiFi'], distance: '0.5 km from Gateway of India', description: 'Iconic luxury hotel' },
        { id: '2', name: 'The Oberoi Mumbai', rating: 4.8, price: 28000, amenities: ['Pool', 'Spa', 'Restaurant', 'Gym'], distance: '1 km from Marine Drive', description: 'Premium oceanfront hotel' },
        { id: '3', name: 'ITC Grand Central', rating: 4.6, price: 20000, amenities: ['Pool', 'Spa', 'Restaurant', 'Free WiFi'], distance: '2 km from CST', description: 'Business district luxury' },
        { id: '4', name: 'Hotel Marine Plaza', rating: 4.3, price: 12000, amenities: ['Restaurant', 'Free WiFi', 'AC'], distance: '0.2 km from Marine Drive', description: 'Seafront heritage hotel' },
        { id: '5', name: 'The Gordon House Hotel', rating: 4.2, price: 8000, amenities: ['Restaurant', 'Free WiFi', 'AC'], distance: '1.5 km from Colaba', description: 'Boutique heritage hotel' },
        { id: '6', name: 'Hotel Suba Palace', rating: 4.0, price: 4500, amenities: ['Restaurant', 'Free WiFi', 'AC'], distance: '3 km from airport', description: 'Budget business hotel' },
        { id: '7', name: 'JW Marriott Mumbai Sahar', rating: 4.7, price: 16000, amenities: ['Pool', 'Spa', 'Restaurant', 'Gym'], distance: '1 km from airport', description: 'Premium airport hotel' },
        { id: '8', name: 'The St. Regis Mumbai', rating: 4.8, price: 32000, amenities: ['Pool', 'Spa', 'Restaurant', 'Butler Service'], distance: '2 km from Lower Parel', description: 'Ultra-luxury hotel' },
        { id: '9', name: 'Trident Bandra Kurla', rating: 4.5, price: 13000, amenities: ['Pool', 'Restaurant', 'Free WiFi'], distance: '1 km from BKC', description: 'Business district hotel' },
        { id: '10', name: 'ITC Maratha Mumbai', rating: 4.4, price: 11000, amenities: ['Pool', 'Spa', 'Restaurant'], distance: '2 km from airport', description: 'Airport luxury hotel' },
        { id: '11', name: 'Hyatt Regency Mumbai', rating: 4.3, price: 9500, amenities: ['Pool', 'Restaurant', 'Free WiFi'], distance: '3 km from Sahar', description: 'Modern business hotel' },
        { id: '12', name: 'Hotel Diplomat', rating: 4.0, price: 5500, amenities: ['Restaurant', 'Free WiFi', 'AC'], distance: '1 km from Colaba', description: 'Heritage area hotel' }
      ],
      delhi: [
        { id: '1', name: 'The Imperial New Delhi', rating: 4.8, price: 25000, amenities: ['Pool', 'Spa', 'Restaurant', 'Free WiFi'], distance: '2 km from Connaught Place', description: 'Colonial era luxury hotel' },
        { id: '2', name: 'The Leela Palace New Delhi', rating: 4.7, price: 22000, amenities: ['Pool', 'Spa', 'Restaurant', 'Gym'], distance: '8 km from airport', description: 'Royal luxury experience' },
        { id: '3', name: 'ITC Maurya', rating: 4.6, price: 18000, amenities: ['Pool', 'Spa', 'Restaurant', 'Free WiFi'], distance: '5 km from India Gate', description: 'Diplomatic enclave hotel' },
        { id: '4', name: 'The Claridges New Delhi', rating: 4.4, price: 15000, amenities: ['Pool', 'Restaurant', 'Free WiFi'], distance: '3 km from India Gate', description: 'Art deco heritage hotel' },
        { id: '5', name: 'Hotel Tara Palace', rating: 4.1, price: 6000, amenities: ['Restaurant', 'Free WiFi', 'AC'], distance: '2 km from Chandni Chowk', description: 'Old Delhi heritage hotel' },
        { id: '6', name: 'Bloom Hotel', rating: 4.0, price: 4000, amenities: ['Restaurant', 'Free WiFi', 'AC'], distance: '5 km from Red Fort', description: 'Modern budget hotel' },
        { id: '7', name: 'The Oberoi New Delhi', rating: 4.9, price: 30000, amenities: ['Pool', 'Spa', 'Restaurant', 'Butler Service'], distance: '1 km from Delhi Golf Club', description: 'Ultra-luxury city hotel' },
        { id: '8', name: 'JW Marriott Hotel New Delhi Aerocity', rating: 4.6, price: 14000, amenities: ['Pool', 'Spa', 'Restaurant'], distance: '1 km from airport', description: 'Premium airport hotel' },
        { id: '9', name: 'The Lodhi New Delhi', rating: 4.5, price: 17000, amenities: ['Pool', 'Spa', 'Restaurant'], distance: '3 km from Lodhi Gardens', description: 'Contemporary luxury hotel' },
        { id: '10', name: 'Radisson Blu Plaza Delhi Airport', rating: 4.3, price: 8500, amenities: ['Pool', 'Restaurant', 'Free WiFi'], distance: '2 km from airport', description: 'Business airport hotel' },
        { id: '11', name: 'The Park New Delhi', rating: 4.2, price: 10000, amenities: ['Pool', 'Restaurant', 'Free WiFi'], distance: '1 km from Connaught Place', description: 'Stylish city hotel' },
        { id: '12', name: 'Hotel Broadway', rating: 3.9, price: 3500, amenities: ['Restaurant', 'Free WiFi', 'AC'], distance: '1 km from Old Delhi Railway Station', description: 'Heritage budget hotel' }
      ],
      goa: [
        { id: '1', name: 'Taj Exotica Resort & Spa', rating: 4.8, price: 18000, amenities: ['Beach', 'Pool', 'Spa', 'Restaurant'], distance: '0.1 km from Benaulim Beach', description: 'Beachfront luxury resort' },
        { id: '2', name: 'The Leela Goa', rating: 4.7, price: 16000, amenities: ['Beach', 'Pool', 'Spa', 'Golf'], distance: '0.2 km from Mobor Beach', description: 'Premium beach resort' },
        { id: '3', name: 'Park Hyatt Goa Resort and Spa', rating: 4.6, price: 14000, amenities: ['Beach', 'Pool', 'Spa', 'Restaurant'], distance: '0.1 km from Arossim Beach', description: 'Luxury beachfront resort' },
        { id: '4', name: 'Alila Diwa Goa', rating: 4.5, price: 12000, amenities: ['Pool', 'Spa', 'Restaurant', 'Free WiFi'], distance: '1 km from Majorda Beach', description: 'Contemporary resort' },
        { id: '5', name: 'Casa De Goa Boutique Resort', rating: 4.2, price: 8000, amenities: ['Pool', 'Restaurant', 'Free WiFi'], distance: '0.5 km from Calangute Beach', description: 'Boutique beach resort' },
        { id: '6', name: 'Hotel Fidalgo', rating: 4.0, price: 5000, amenities: ['Pool', 'Restaurant', 'Free WiFi'], distance: '1 km from Panaji', description: 'Heritage city hotel' },
        { id: '7', name: 'Grand Hyatt Goa', rating: 4.6, price: 15000, amenities: ['Beach', 'Pool', 'Spa', 'Golf'], distance: '0.3 km from Bambolim Beach', description: 'Luxury beach resort' },
        { id: '8', name: 'ITC Grand Goa Resort & Spa', rating: 4.5, price: 13000, amenities: ['Beach', 'Pool', 'Spa', 'Restaurant'], distance: '0.2 km from Arossim Beach', description: 'Premium beachfront resort' },
        { id: '9', name: 'Zuri White Sands Goa Resort & Casino', rating: 4.3, price: 10000, amenities: ['Beach', 'Pool', 'Casino', 'Restaurant'], distance: '0.1 km from Varca Beach', description: 'Beach resort with casino' },
        { id: '10', name: 'Taj Holiday Village Resort & Spa', rating: 4.2, price: 9000, amenities: ['Beach', 'Pool', 'Spa', 'Restaurant'], distance: '0.2 km from Sinquerim Beach', description: 'Traditional Goan resort' },
        { id: '11', name: 'Cidade De Goa', rating: 4.1, price: 7500, amenities: ['Beach', 'Pool', 'Restaurant'], distance: '0.3 km from Dona Paula Beach', description: 'Heritage beach hotel' },
        { id: '12', name: 'Goa Marriott Resort & Spa', rating: 4.4, price: 11000, amenities: ['Beach', 'Pool', 'Spa', 'Restaurant'], distance: '0.1 km from Miramar Beach', description: 'Beachfront luxury resort' }
      ],
      bangalore: [
        { id: '1', name: 'The Oberoi Bangalore', rating: 4.8, price: 20000, amenities: ['Pool', 'Spa', 'Restaurant', 'Free WiFi'], distance: '2 km from MG Road', description: 'Luxury city hotel' },
        { id: '2', name: 'ITC Gardenia Bangalore', rating: 4.6, price: 15000, amenities: ['Pool', 'Spa', 'Restaurant', 'Gym'], distance: '3 km from UB City Mall', description: 'Premium business hotel' },
        { id: '3', name: 'The Leela Palace Bangalore', rating: 4.7, price: 18000, amenities: ['Pool', 'Spa', 'Restaurant', 'Butler Service'], distance: '5 km from Bangalore Palace', description: 'Royal luxury hotel' },
        { id: '4', name: 'JW Marriott Hotel Bangalore', rating: 4.5, price: 12000, amenities: ['Pool', 'Spa', 'Restaurant'], distance: '4 km from Vittal Mallya Road', description: 'Modern luxury hotel' },
        { id: '5', name: 'Taj Bangalore', rating: 4.4, price: 11000, amenities: ['Pool', 'Restaurant', 'Free WiFi'], distance: '1 km from MG Road', description: 'Contemporary city hotel' },
        { id: '6', name: 'Park Hotel Bangalore', rating: 4.2, price: 8000, amenities: ['Pool', 'Restaurant', 'Free WiFi'], distance: '2 km from Commercial Street', description: 'Stylish boutique hotel' },
        { id: '7', name: 'Grand Mercure Bangalore', rating: 4.3, price: 9500, amenities: ['Pool', 'Restaurant', 'Gym'], distance: '6 km from Electronic City', description: 'Business district hotel' },
        { id: '8', name: 'Vivanta Bangalore Whitefield', rating: 4.2, price: 9000, amenities: ['Pool', 'Spa', 'Restaurant'], distance: '2 km from ITPL', description: 'IT corridor hotel' },
        { id: '9', name: 'Sheraton Grand Bangalore Hotel', rating: 4.4, price: 10000, amenities: ['Pool', 'Spa', 'Restaurant'], distance: '3 km from Brigade Road', description: 'Premium city hotel' },
        { id: '10', name: 'Holiday Inn Bangalore Racecourse', rating: 4.1, price: 7000, amenities: ['Pool', 'Restaurant', 'Free WiFi'], distance: '1 km from Bangalore Turf Club', description: 'Mid-range business hotel' },
        { id: '11', name: 'Hotel Nandhana Grand', rating: 3.9, price: 4500, amenities: ['Restaurant', 'Free WiFi', 'AC'], distance: '2 km from Majestic Bus Station', description: 'Budget city hotel' },
        { id: '12', name: 'Goldfinch Hotel Bangalore', rating: 4.0, price: 6000, amenities: ['Pool', 'Restaurant', 'Free WiFi'], distance: '4 km from Cunningham Road', description: 'Comfortable mid-range hotel' }
      ],
      kolkata: [
        { id: '1', name: 'The Oberoi Grand Kolkata', rating: 4.7, price: 16000, amenities: ['Pool', 'Spa', 'Restaurant', 'Free WiFi'], distance: '1 km from Park Street', description: 'Heritage luxury hotel' },
        { id: '2', name: 'JW Marriott Hotel Kolkata', rating: 4.6, price: 14000, amenities: ['Pool', 'Spa', 'Restaurant'], distance: '2 km from New Market', description: 'Modern luxury hotel' },
        { id: '3', name: 'ITC Sonar Kolkata', rating: 4.5, price: 12000, amenities: ['Pool', 'Spa', 'Restaurant', 'Golf'], distance: '5 km from Salt Lake', description: 'Premium business hotel' },
        { id: '4', name: 'The Lalit Great Eastern Kolkata', rating: 4.3, price: 10000, amenities: ['Restaurant', 'Free WiFi', 'Spa'], distance: '0.5 km from Dalhousie Square', description: 'Historic heritage hotel' },
        { id: '5', name: 'Hyatt Regency Kolkata', rating: 4.4, price: 11000, amenities: ['Pool', 'Restaurant', 'Free WiFi'], distance: '3 km from Salt Lake', description: 'Contemporary business hotel' },
        { id: '6', name: 'Park Hotel Kolkata', rating: 4.2, price: 8500, amenities: ['Pool', 'Restaurant', 'Free WiFi'], distance: '1 km from Park Street', description: 'Boutique city hotel' },
        { id: '7', name: 'Taj Bengal Kolkata', rating: 4.6, price: 13000, amenities: ['Pool', 'Spa', 'Restaurant'], distance: '2 km from Alipore', description: 'Luxury heritage hotel' },
        { id: '8', name: 'Novotel Kolkata Hotel & Residences', rating: 4.3, price: 9000, amenities: ['Pool', 'Restaurant', 'Gym'], distance: '3 km from New Town', description: 'Modern business hotel' },
        { id: '9', name: 'Swissotel Kolkata', rating: 4.4, price: 10500, amenities: ['Pool', 'Spa', 'Restaurant'], distance: '4 km from New Town', description: 'Swiss hospitality hotel' },
        { id: '10', name: 'Hotel Hindusthan International', rating: 4.0, price: 6500, amenities: ['Restaurant', 'Free WiFi', 'AC'], distance: '2 km from Esplanade', description: 'Heritage city hotel' },
        { id: '11', name: 'Peerless Inn Kolkata', rating: 3.9, price: 5000, amenities: ['Restaurant', 'Free WiFi', 'AC'], distance: '1 km from Howrah Bridge', description: 'Budget heritage hotel' },
        { id: '12', name: 'Hotel Galaxy', rating: 3.8, price: 3500, amenities: ['Restaurant', 'Free WiFi', 'AC'], distance: '1 km from Sealdah Station', description: 'Economy city hotel' }
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
