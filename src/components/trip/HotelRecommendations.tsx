
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
        { id: '6', name: 'Hotel Sitara Grand', rating: 4.2, price: 5000, amenities: ['Free WiFi', 'Restaurant', 'AC'], distance: '1 km from Charminar', description: 'Heritage area budget hotel' }
      ],
      mumbai: [
        { id: '1', name: 'The Taj Mahal Palace', rating: 4.9, price: 35000, amenities: ['Pool', 'Spa', 'Restaurant', 'Free WiFi'], distance: '0.5 km from Gateway of India', description: 'Iconic luxury hotel' },
        { id: '2', name: 'The Oberoi Mumbai', rating: 4.8, price: 28000, amenities: ['Pool', 'Spa', 'Restaurant', 'Gym'], distance: '1 km from Marine Drive', description: 'Premium oceanfront hotel' },
        { id: '3', name: 'ITC Grand Central', rating: 4.6, price: 20000, amenities: ['Pool', 'Spa', 'Restaurant', 'Free WiFi'], distance: '2 km from CST', description: 'Business district luxury' },
        { id: '4', name: 'Hotel Marine Plaza', rating: 4.3, price: 12000, amenities: ['Restaurant', 'Free WiFi', 'AC'], distance: '0.2 km from Marine Drive', description: 'Seafront heritage hotel' },
        { id: '5', name: 'The Gordon House Hotel', rating: 4.2, price: 8000, amenities: ['Restaurant', 'Free WiFi', 'AC'], distance: '1.5 km from Colaba', description: 'Boutique heritage hotel' },
        { id: '6', name: 'Hotel Suba Palace', rating: 4.0, price: 4500, amenities: ['Restaurant', 'Free WiFi', 'AC'], distance: '3 km from airport', description: 'Budget business hotel' }
      ],
      delhi: [
        { id: '1', name: 'The Imperial New Delhi', rating: 4.8, price: 25000, amenities: ['Pool', 'Spa', 'Restaurant', 'Free WiFi'], distance: '2 km from Connaught Place', description: 'Colonial era luxury hotel' },
        { id: '2', name: 'The Leela Palace New Delhi', rating: 4.7, price: 22000, amenities: ['Pool', 'Spa', 'Restaurant', 'Gym'], distance: '8 km from airport', description: 'Royal luxury experience' },
        { id: '3', name: 'ITC Maurya', rating: 4.6, price: 18000, amenities: ['Pool', 'Spa', 'Restaurant', 'Free WiFi'], distance: '5 km from India Gate', description: 'Diplomatic enclave hotel' },
        { id: '4', name: 'The Claridges New Delhi', rating: 4.4, price: 15000, amenities: ['Pool', 'Restaurant', 'Free WiFi'], distance: '3 km from India Gate', description: 'Art deco heritage hotel' },
        { id: '5', name: 'Hotel Tara Palace', rating: 4.1, price: 6000, amenities: ['Restaurant', 'Free WiFi', 'AC'], distance: '2 km from Chandni Chowk', description: 'Old Delhi heritage hotel' },
        { id: '6', name: 'Bloom Hotel', rating: 4.0, price: 4000, amenities: ['Restaurant', 'Free WiFi', 'AC'], distance: '5 km from Red Fort', description: 'Modern budget hotel' }
      ],
      goa: [
        { id: '1', name: 'Taj Exotica Resort & Spa', rating: 4.8, price: 18000, amenities: ['Beach', 'Pool', 'Spa', 'Restaurant'], distance: '0.1 km from Benaulim Beach', description: 'Beachfront luxury resort' },
        { id: '2', name: 'The Leela Goa', rating: 4.7, price: 16000, amenities: ['Beach', 'Pool', 'Spa', 'Golf'], distance: '0.2 km from Mobor Beach', description: 'Premium beach resort' },
        { id: '3', name: 'Park Hyatt Goa Resort and Spa', rating: 4.6, price: 14000, amenities: ['Beach', 'Pool', 'Spa', 'Restaurant'], distance: '0.1 km from Arossim Beach', description: 'Luxury beachfront resort' },
        { id: '4', name: 'Alila Diwa Goa', rating: 4.5, price: 12000, amenities: ['Pool', 'Spa', 'Restaurant', 'Free WiFi'], distance: '1 km from Majorda Beach', description: 'Contemporary resort' },
        { id: '5', name: 'Casa De Goa Boutique Resort', rating: 4.2, price: 8000, amenities: ['Pool', 'Restaurant', 'Free WiFi'], distance: '0.5 km from Calangute Beach', description: 'Boutique beach resort' },
        { id: '6', name: 'Hotel Fidalgo', rating: 4.0, price: 5000, amenities: ['Pool', 'Restaurant', 'Free WiFi'], distance: '1 km from Panaji', description: 'Heritage city hotel' }
      ]
    };

    return hotelData[cityLower] || [
      { id: '1', name: `${city} Palace Hotel`, rating: 4.5, price: Math.floor(tripData.budget * 0.3), amenities: ['Free WiFi', 'Restaurant', 'AC'], distance: '2 km from city center', description: 'Premium city hotel with modern amenities' },
      { id: '2', name: `Heritage ${city} Hotel`, rating: 4.3, price: Math.floor(tripData.budget * 0.25), amenities: ['Restaurant', 'Free WiFi'], distance: '1.5 km from city center', description: 'Traditional hotel with local charm' },
      { id: '3', name: `${city} Business Hotel`, rating: 4.2, price: Math.floor(tripData.budget * 0.2), amenities: ['Free WiFi', 'Restaurant', 'AC'], distance: '3 km from city center', description: 'Modern business hotel' },
      { id: '4', name: `Budget Stay ${city}`, rating: 4.0, price: Math.floor(tripData.budget * 0.15), amenities: ['Free WiFi', 'AC'], distance: '2.5 km from city center', description: 'Clean and comfortable budget hotel' }
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
              onClick={() => setVisibleCount(prev => prev + 6)}
            >
              Load More Hotels
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
