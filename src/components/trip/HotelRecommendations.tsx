
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
  image: string;
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

  // Mock hotel data - In a real app, this would fetch from APIs
  useEffect(() => {
    const mockHotels: Hotel[] = [
      {
        id: '1',
        name: `Grand ${tripData.destination} Palace`,
        rating: 4.5,
        price: Math.floor(tripData.budget * 0.3),
        image: '/placeholder.svg',
        amenities: ['Free WiFi', 'Pool', 'Restaurant', 'Parking'],
        distance: '2.5 km from city center',
        description: 'Luxury hotel with modern amenities and excellent service.'
      },
      {
        id: '2',
        name: `${tripData.destination} Heritage Hotel`,
        rating: 4.2,
        price: Math.floor(tripData.budget * 0.25),
        image: '/placeholder.svg',
        amenities: ['Free WiFi', 'Restaurant', 'Room Service'],
        distance: '1.8 km from city center',
        description: 'Traditional architecture with modern comfort.'
      },
      {
        id: '3',
        name: `Royal ${tripData.destination} Resort`,
        rating: 4.7,
        price: Math.floor(tripData.budget * 0.4),
        image: '/placeholder.svg',
        amenities: ['Pool', 'Spa', 'Restaurant', 'Free WiFi', 'Gym'],
        distance: '3.2 km from city center',
        description: 'Premium resort with world-class facilities.'
      },
      {
        id: '4',
        name: `Budget Stay ${tripData.destination}`,
        rating: 4.0,
        price: Math.floor(tripData.budget * 0.15),
        image: '/placeholder.svg',
        amenities: ['Free WiFi', 'AC', 'Room Service'],
        distance: '1.2 km from city center',
        description: 'Clean, comfortable and affordable accommodation.'
      },
      {
        id: '5',
        name: `${tripData.destination} Business Hotel`,
        rating: 4.3,
        price: Math.floor(tripData.budget * 0.28),
        image: '/placeholder.svg',
        amenities: ['Free WiFi', 'Business Center', 'Restaurant', 'Laundry'],
        distance: '2.1 km from city center',
        description: 'Perfect for business and leisure travelers.'
      },
      {
        id: '6',
        name: `Boutique ${tripData.destination}`,
        rating: 4.6,
        price: Math.floor(tripData.budget * 0.35),
        image: '/placeholder.svg',
        amenities: ['Free WiFi', 'Rooftop Bar', 'Restaurant', 'Concierge'],
        distance: '1.5 km from city center',
        description: 'Stylish boutique hotel with personalized service.'
      }
    ];

    // Filter hotels by budget
    const filteredHotels = mockHotels.filter(hotel => hotel.price <= tripData.budget * 0.5);
    
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
      <Card>
        <CardHeader>
          <CardTitle>Finding Hotels in {tripData.destination}...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Hotels in {tripData.destination}
        </CardTitle>
        <p className="text-gray-600">
          Found {hotels.length} hotels within your budget of ₹{tripData.budget.toLocaleString()}
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotels.slice(0, visibleCount).map((hotel) => (
            <Card 
              key={hotel.id} 
              className={`cursor-pointer transition-all hover:shadow-lg ${
                selectedHotel?.id === hotel.id ? 'ring-2 ring-orange-500' : ''
              }`}
              onClick={() => handleSelectHotel(hotel)}
            >
              <div className="relative">
                <img 
                  src={hotel.image} 
                  alt={hotel.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <Badge className="absolute top-2 right-2 bg-green-500">
                  ₹{hotel.price.toLocaleString()}/night
                </Badge>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2">{hotel.name}</h3>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${
                        i < Math.floor(hotel.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`} 
                    />
                  ))}
                  <span className="ml-1 text-sm text-gray-600">{hotel.rating}</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{hotel.distance}</p>
                <p className="text-sm mb-3">{hotel.description}</p>
                <div className="flex flex-wrap gap-2">
                  {hotel.amenities.slice(0, 3).map((amenity) => (
                    <Badge key={amenity} variant="outline" className="text-xs">
                      {getAmenityIcon(amenity)}
                      <span className="ml-1">{amenity}</span>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {visibleCount < hotels.length && (
          <div className="text-center mt-6">
            <Button 
              variant="outline" 
              onClick={() => setVisibleCount(prev => prev + 6)}
            >
              Load More Hotels
            </Button>
          </div>
        )}

        {selectedHotel && (
          <div className="mt-6 p-4 bg-orange-50 rounded-lg border border-orange-200">
            <h4 className="font-semibold text-lg mb-2">Selected Hotel:</h4>
            <p className="text-gray-700">{selectedHotel.name} - ₹{selectedHotel.price.toLocaleString()}/night</p>
          </div>
        )}

        <div className="flex justify-end mt-6">
          <Button onClick={handleNext} className="bg-gradient-to-r from-orange-500 to-blue-600">
            Next: Tourist Attractions
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
