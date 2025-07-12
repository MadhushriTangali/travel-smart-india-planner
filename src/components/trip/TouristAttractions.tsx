
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, IndianRupee, ArrowRight, Camera } from 'lucide-react';
import { TripData } from '@/components/TripPlanningForm';

interface Attraction {
  id: string;
  name: string;
  description: string;
  entryFee: number;
  openHours: string;
  image: string;
  category: string;
  rating: number;
  timeNeeded: string;
}

interface TouristAttractionsProps {
  tripData: TripData;
  onNext: () => void;
}

export const TouristAttractions = ({ tripData, onNext }: TouristAttractionsProps) => {
  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAttractions, setSelectedAttractions] = useState<Attraction[]>([]);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    const mockAttractions: Attraction[] = [
      {
        id: '1',
        name: `${tripData.destination} Palace`,
        description: 'Historical palace with stunning architecture and rich cultural heritage.',
        entryFee: 200,
        openHours: '9:00 AM - 6:00 PM',
        image: '/placeholder.svg',
        category: 'Historical',
        rating: 4.6,
        timeNeeded: '2-3 hours'
      },
      {
        id: '2',
        name: `${tripData.destination} Museum`,
        description: 'Premier museum showcasing local art, culture, and history.',
        entryFee: 150,
        openHours: '10:00 AM - 5:00 PM',
        image: '/placeholder.svg',
        category: 'Cultural',
        rating: 4.3,
        timeNeeded: '1-2 hours'
      },
      {
        id: '3',
        name: `${tripData.destination} Gardens`,
        description: 'Beautiful botanical gardens perfect for relaxation and photography.',
        entryFee: 50,
        openHours: '6:00 AM - 8:00 PM',
        image: '/placeholder.svg',
        category: 'Nature',
        rating: 4.4,
        timeNeeded: '1-2 hours'
      },
      {
        id: '4',
        name: `${tripData.destination} Temple`,
        description: 'Ancient temple with intricate carvings and spiritual significance.',
        entryFee: 0,
        openHours: '5:00 AM - 9:00 PM',
        image: '/placeholder.svg',
        category: 'Religious',
        rating: 4.7,
        timeNeeded: '1 hour'
      },
      {
        id: '5',
        name: `${tripData.destination} Market`,
        description: 'Vibrant local market for shopping and experiencing local life.',
        entryFee: 0,
        openHours: '8:00 AM - 10:00 PM',
        image: '/placeholder.svg',
        category: 'Shopping',
        rating: 4.2,
        timeNeeded: '2-3 hours'
      },
      {
        id: '6',
        name: `${tripData.destination} Fort`,
        description: 'Historic fort offering panoramic views and fascinating history.',
        entryFee: 300,
        openHours: '9:00 AM - 6:00 PM',
        image: '/placeholder.svg',
        category: 'Historical',
        rating: 4.5,
        timeNeeded: '2-4 hours'
      }
    ];

    setTimeout(() => {
      setAttractions(mockAttractions);
      setLoading(false);
    }, 1000);
  }, [tripData]);

  const handleSelectAttraction = (attraction: Attraction) => {
    const isSelected = selectedAttractions.find(a => a.id === attraction.id);
    if (isSelected) {
      setSelectedAttractions(prev => prev.filter(a => a.id !== attraction.id));
    } else {
      setSelectedAttractions(prev => [...prev, attraction]);
    }
  };

  const getTotalCost = () => {
    return selectedAttractions.reduce((total, attraction) => total + attraction.entryFee, 0);
  };

  const handleNext = () => {
    if (selectedAttractions.length === 0) {
      alert('Please select at least one attraction to continue.');
      return;
    }
    console.log('Selected attractions:', selectedAttractions);
    onNext();
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Finding Attractions in {tripData.destination}...</CardTitle>
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
          <Camera className="h-5 w-5" />
          Tourist Attractions in {tripData.destination}
        </CardTitle>
        <p className="text-gray-600">
          Select the attractions you'd like to visit. Total selected: {selectedAttractions.length}
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {attractions.slice(0, visibleCount).map((attraction) => (
            <Card 
              key={attraction.id}
              className={`cursor-pointer transition-all hover:shadow-lg ${
                selectedAttractions.find(a => a.id === attraction.id) ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => handleSelectAttraction(attraction)}
            >
              <div className="relative">
                <img 
                  src={attraction.image} 
                  alt={attraction.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <Badge className={`absolute top-2 right-2 ${
                  attraction.entryFee === 0 ? 'bg-green-500' : 'bg-blue-500'
                }`}>
                  {attraction.entryFee === 0 ? 'Free' : `₹${attraction.entryFee}`}
                </Badge>
                <Badge className="absolute top-2 left-2 bg-purple-500">
                  {attraction.category}
                </Badge>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2">{attraction.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{attraction.description}</p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span>{attraction.openHours}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span>Time needed: {attraction.timeNeeded}</span>
                  </div>
                  {attraction.entryFee > 0 && (
                    <div className="flex items-center gap-2">
                      <IndianRupee className="h-4 w-4 text-gray-500" />
                      <span>Entry fee: ₹{attraction.entryFee}</span>
                    </div>
                  )}
                </div>

                <div className="mt-3 text-center">
                  <Badge variant={selectedAttractions.find(a => a.id === attraction.id) ? "default" : "outline"}>
                    {selectedAttractions.find(a => a.id === attraction.id) ? 'Selected' : 'Click to Select'}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {visibleCount < attractions.length && (
          <div className="text-center mt-6">
            <Button 
              variant="outline" 
              onClick={() => setVisibleCount(prev => prev + 6)}
            >
              Load More Attractions
            </Button>
          </div>
        )}

        {selectedAttractions.length > 0 && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-lg mb-2">Selected Attractions ({selectedAttractions.length}):</h4>
            <div className="space-y-1">
              {selectedAttractions.map(attraction => (
                <div key={attraction.id} className="flex justify-between">
                  <span>{attraction.name}</span>
                  <span className="font-medium">₹{attraction.entryFee}</span>
                </div>
              ))}
            </div>
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between font-semibold">
                <span>Total Entry Fees:</span>
                <span>₹{getTotalCost()}</span>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end mt-6">
          <Button onClick={handleNext} className="bg-gradient-to-r from-orange-500 to-blue-600">
            Next: Famous Dishes
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
