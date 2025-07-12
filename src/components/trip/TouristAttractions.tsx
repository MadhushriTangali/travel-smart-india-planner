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

  const getAttractionsForCity = (city: string): Attraction[] => {
    const cityLower = city.toLowerCase();
    
    const attractionsData: { [key: string]: Attraction[] } = {
      hyderabad: [
        { id: '1', name: 'Charminar', description: 'Iconic four-minaret monument', entryFee: 25, openHours: '9:00 AM - 5:30 PM', category: 'Historical', rating: 4.6, timeNeeded: '1-2 hours' },
        { id: '2', name: 'Golconda Fort', description: 'Historic fortress complex', entryFee: 15, openHours: '9:00 AM - 5:30 PM', category: 'Historical', rating: 4.5, timeNeeded: '2-3 hours' },
        { id: '3', name: 'Salar Jung Museum', description: "World's largest private collection", entryFee: 20, openHours: '10:00 AM - 5:00 PM', category: 'Cultural', rating: 4.4, timeNeeded: '2-3 hours' },
        { id: '4', name: 'Mecca Masjid', description: "One of India's largest mosques", entryFee: 0, openHours: '5:00 AM - 9:00 PM', category: 'Religious', rating: 4.3, timeNeeded: '1 hour' },
        { id: '5', name: 'Ramoji Film City', description: 'Largest film studio complex', entryFee: 1200, openHours: '9:00 AM - 5:30 PM', category: 'Entertainment', rating: 4.2, timeNeeded: '6-8 hours' },
        { id: '6', name: 'Hussain Sagar Lake', description: 'Heart-shaped lake with Buddha statue', entryFee: 0, openHours: '24 hours', category: 'Nature', rating: 4.1, timeNeeded: '1-2 hours' },
      ],
      mumbai: [
        { id: '1', name: 'Gateway of India', description: 'Iconic colonial monument', entryFee: 0, openHours: '24 hours', category: 'Historical', rating: 4.5, timeNeeded: '1 hour' },
        { id: '2', name: 'Marine Drive', description: 'Famous waterfront promenade', entryFee: 0, openHours: '24 hours', category: 'Nature', rating: 4.4, timeNeeded: '1-2 hours' },
        { id: '3', name: 'Elephanta Caves', description: 'Ancient rock-cut caves', entryFee: 40, openHours: '9:00 AM - 5:30 PM', category: 'Historical', rating: 4.3, timeNeeded: '3-4 hours' },
        { id: '4', name: 'Chhatrapati Shivaji Terminus', description: 'UNESCO World Heritage railway station', entryFee: 0, openHours: '24 hours', category: 'Historical', rating: 4.2, timeNeeded: '30 minutes' },
        { id: '5', name: 'Siddhivinayak Temple', description: 'Famous Ganesha temple', entryFee: 0, openHours: '5:30 AM - 10:00 PM', category: 'Religious', rating: 4.6, timeNeeded: '1 hour' },
        { id: '6', name: 'Haji Ali Dargah', description: 'Mosque and tomb on islet', entryFee: 0, openHours: '5:30 AM - 10:00 PM', category: 'Religious', rating: 4.3, timeNeeded: '1-2 hours' },
      ],
      delhi: [
        { id: '1', name: 'Red Fort', description: 'Mughal fortress and UNESCO site', entryFee: 35, openHours: '9:30 AM - 4:30 PM', category: 'Historical', rating: 4.4, timeNeeded: '2-3 hours' },
        { id: '2', name: 'India Gate', description: 'War memorial arch', entryFee: 0, openHours: '24 hours', category: 'Historical', rating: 4.3, timeNeeded: '1 hour' },
        { id: '3', name: 'Qutub Minar', description: 'Tallest brick minaret in world', entryFee: 30, openHours: '7:00 AM - 5:00 PM', category: 'Historical', rating: 4.2, timeNeeded: '1-2 hours' },
        { id: '4', name: 'Lotus Temple', description: 'Bahai House of Worship', entryFee: 0, openHours: '9:00 AM - 7:00 PM', category: 'Religious', rating: 4.5, timeNeeded: '1-2 hours' },
        { id: '5', name: 'Humayuns Tomb', description: 'Mughal emperor tomb complex', entryFee: 30, openHours: '6:00 AM - 6:00 PM', category: 'Historical', rating: 4.3, timeNeeded: '1-2 hours' },
        { id: '6', name: 'Chandni Chowk', description: 'Historic market street', entryFee: 0, openHours: '10:00 AM - 9:00 PM', category: 'Shopping', rating: 4.1, timeNeeded: '2-3 hours' },
      ],
      goa: [
        { id: '1', name: 'Basilica of Bom Jesus', description: 'UNESCO World Heritage church', entryFee: 0, openHours: '9:00 AM - 6:30 PM', category: 'Religious', rating: 4.5, timeNeeded: '1 hour' },
        { id: '2', name: 'Fort Aguada', description: 'Portuguese fort overlooking sea', entryFee: 25, openHours: '9:30 AM - 5:30 PM', category: 'Historical', rating: 4.3, timeNeeded: '1-2 hours' },
        { id: '3', name: 'Dudhsagar Falls', description: 'Four-tiered waterfall', entryFee: 30, openHours: '9:00 AM - 5:00 PM', category: 'Nature', rating: 4.6, timeNeeded: '4-5 hours' },
        { id: '4', name: 'Se Cathedral', description: 'Largest church in Asia', entryFee: 0, openHours: '7:30 AM - 6:00 PM', category: 'Religious', rating: 4.2, timeNeeded: '45 minutes' },
        { id: '5', name: 'Calangute Beach', description: 'Queen of beaches in Goa', entryFee: 0, openHours: '24 hours', category: 'Nature', rating: 4.1, timeNeeded: '2-3 hours' },
        { id: '6', name: 'Spice Plantation Tour', description: 'Authentic spice farm experience', entryFee: 400, openHours: '9:00 AM - 5:00 PM', category: 'Nature', rating: 4.4, timeNeeded: '3-4 hours' },
      ]
    };

    // Return city-specific attractions or generic ones
    return attractionsData[cityLower] || [
      { id: '1', name: `${tripData.destination} Palace`, description: 'Historical palace with stunning architecture and rich cultural heritage.', entryFee: 200, openHours: '9:00 AM - 6:00 PM', category: 'Historical', rating: 4.6, timeNeeded: '2-3 hours' },
      { id: '2', name: `${tripData.destination} Museum`, description: 'Premier museum showcasing local art, culture, and history.', entryFee: 150, openHours: '10:00 AM - 5:00 PM', category: 'Cultural', rating: 4.3, timeNeeded: '1-2 hours' },
      { id: '3', name: `${tripData.destination} Gardens`, description: 'Beautiful botanical gardens perfect for relaxation and photography.', entryFee: 50, openHours: '6:00 AM - 8:00 PM', category: 'Nature', rating: 4.4, timeNeeded: '1-2 hours' },
      { id: '4', name: `${tripData.destination} Temple`, description: 'Ancient temple with intricate carvings and spiritual significance.', entryFee: 0, openHours: '5:00 AM - 9:00 PM', category: 'Religious', rating: 4.7, timeNeeded: '1 hour' },
      { id: '5', name: `${tripData.destination} Market`, description: 'Vibrant local market for shopping and experiencing local life.', entryFee: 0, openHours: '8:00 AM - 10:00 PM', category: 'Shopping', rating: 4.2, timeNeeded: '2-3 hours' },
      { id: '6', name: `${tripData.destination} Fort`, description: 'Historic fort offering panoramic views and fascinating history.', entryFee: 300, openHours: '9:00 AM - 6:00 PM', category: 'Historical', rating: 4.5, timeNeeded: '2-4 hours' },
    ];
  };

  useEffect(() => {
    const cityAttractions = getAttractionsForCity(tripData.destination);
    
    setTimeout(() => {
      setAttractions(cityAttractions);
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
      <Card className="shadow-xl border-t-4 border-t-orange-500">
        <CardHeader>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent">
            Finding Attractions in {tripData.destination}...
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
          <Camera className="h-6 w-6 text-orange-500" />
          Tourist Attractions in {tripData.destination}
        </CardTitle>
        <p className="text-gray-600 font-semibold">
          Select the attractions you'd like to visit. Total selected: {selectedAttractions.length}
        </p>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {attractions.slice(0, visibleCount).map((attraction) => (
            <Card 
              key={attraction.id}
              className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 ${
                selectedAttractions.find(a => a.id === attraction.id) 
                  ? 'ring-2 ring-orange-500 bg-gradient-to-br from-orange-50 to-blue-50' 
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => handleSelectAttraction(attraction)}
            >
              <div className="p-1">
                <div className="bg-gradient-to-br from-orange-100 to-blue-100 p-4 rounded-t-lg">
                  <div className="flex justify-between items-start mb-2">
                    <Badge className={`${
                      attraction.entryFee === 0 ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'
                    } text-white font-semibold`}>
                      {attraction.entryFee === 0 ? 'Free Entry' : `₹${attraction.entryFee}`}
                    </Badge>
                    <Badge className="bg-purple-500 hover:bg-purple-600 text-white font-semibold">
                      {attraction.category}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-2 text-gray-800">{attraction.name}</h3>
                <p className="text-sm text-gray-600 mb-3 font-medium">{attraction.description}</p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-orange-500" />
                    <span className="font-medium">{attraction.openHours}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-blue-500" />
                    <span className="font-medium">Time needed: {attraction.timeNeeded}</span>
                  </div>
                  {attraction.entryFee > 0 && (
                    <div className="flex items-center gap-2">
                      <IndianRupee className="h-4 w-4 text-green-500" />
                      <span className="font-medium">Entry fee: ₹{attraction.entryFee}</span>
                    </div>
                  )}
                </div>

                <div className="mt-4">
                  <Button
                    className={`w-full font-semibold ${
                      selectedAttractions.find(a => a.id === attraction.id)
                        ? 'bg-gradient-to-r from-orange-500 to-blue-600 hover:from-orange-600 hover:to-blue-700 text-white'
                        : 'border-2 border-orange-200 text-orange-600 hover:bg-orange-50'
                    }`}
                    variant={selectedAttractions.find(a => a.id === attraction.id) ? "default" : "outline"}
                  >
                    {selectedAttractions.find(a => a.id === attraction.id) ? '✓ Selected' : 'Select Attraction'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {visibleCount < attractions.length && (
          <div className="text-center mt-8">
            <Button 
              className="bg-gradient-to-r from-orange-500 to-blue-600 hover:from-orange-600 hover:to-blue-700 text-white font-semibold px-8 py-3"
              onClick={() => setVisibleCount(prev => prev + 6)}
            >
              Load More Attractions
            </Button>
          </div>
        )}

        {selectedAttractions.length > 0 && (
          <div className="mt8 p-6 bg-gradient-to-r from-orange-50 to-blue-50 rounded-xl border-2 border-orange-200">
            <h4 className="font-bold text-xl mb-4 text-gray-800">Selected Attractions ({selectedAttractions.length}):</h4>
            <div className="space-y-2">
              {selectedAttractions.map(attraction => (
                <div key={attraction.id} className="flex justify-between items-center bg-white p-3 rounded-lg">
                  <span className="font-semibold text-gray-700">{attraction.name}</span>
                  <span className="font-bold text-green-600">₹{attraction.entryFee}</span>
                </div>
              ))}
            </div>
            <div className="border-t-2 border-orange-200 pt-4 mt-4">
              <div className="flex justify-between font-bold text-lg">
                <span className="text-gray-800">Total Entry Fees:</span>
                <span className="text-green-600">₹{getTotalCost()}</span>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end mt-8">
          <Button 
            onClick={handleNext} 
            className="bg-gradient-to-r from-orange-500 to-blue-600 hover:from-orange-600 hover:to-blue-700 text-white font-bold px-8 py-3 text-lg"
          >
            Next: Famous Dishes
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
