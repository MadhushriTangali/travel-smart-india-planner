import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { TripData } from '@/components/TripPlanningForm';

interface Attraction {
  id: string;
  name: string;
  type: string;
  rating: number;
  entry_fee: string;
  timings: string;
  description: string;
}

interface TouristAttractionsProps {
  tripData: TripData;
  onNext: () => void;
}

export const TouristAttractions = ({ tripData, onNext }: TouristAttractionsProps) => {
  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const [loading, setLoading] = useState(true);

  const getAttractionsForCity = (city: string): Attraction[] => {
    const cityLower = city.toLowerCase();
    
    const attractionData: { [key: string]: Attraction[] } = {
      mumbai: [
        { id: '1', name: 'Gateway of India', type: 'Historical Monument', rating: 4.5, entry_fee: 'Free', timings: '24 Hours', description: 'Iconic arch monument overlooking the Arabian Sea' },
        { id: '2', name: 'Elephanta Caves', type: 'UNESCO World Heritage Site', rating: 4.3, entry_fee: '₹40', timings: '9:00 AM - 5:30 PM', description: 'Ancient rock-cut caves with Hindu sculptures' },
        { id: '3', name: 'Marine Drive', type: 'Scenic Boulevard', rating: 4.4, entry_fee: 'Free', timings: '24 Hours', description: 'Beautiful promenade along the coast' },
        { id: '4', name: 'Chhatrapati Shivaji Terminus', type: 'Railway Station', rating: 4.2, entry_fee: 'Free', timings: '24 Hours', description: 'Victorian Gothic architecture railway terminus' }
      ],
      delhi: [
        { id: '1', name: 'Red Fort', type: 'Historical Monument', rating: 4.4, entry_fee: '₹35', timings: '9:30 AM - 4:30 PM', description: 'Magnificent Mughal fort complex' },
        { id: '2', name: 'India Gate', type: 'War Memorial', rating: 4.5, entry_fee: 'Free', timings: '24 Hours', description: 'Memorial arch dedicated to Indian soldiers' },
        { id: '3', name: 'Qutub Minar', type: 'UNESCO World Heritage Site', rating: 4.3, entry_fee: '₹30', timings: '7:00 AM - 5:00 PM', description: 'Tallest brick minaret in the world' },
        { id: '4', name: 'Lotus Temple', type: 'Religious Site', rating: 4.6, entry_fee: 'Free', timings: '9:00 AM - 5:30 PM', description: 'Baháʼí House of Worship with lotus-shaped architecture' }
      ],
      bangalore: [
        { id: '1', name: 'Lalbagh Botanical Garden', type: 'Garden', rating: 4.4, entry_fee: '₹10', timings: '6:00 AM - 7:00 PM', description: '240-acre botanical garden with diverse plant species' },
        { id: '2', name: 'Bangalore Palace', type: 'Palace', rating: 4.2, entry_fee: '₹230', timings: '10:00 AM - 5:30 PM', description: 'Tudor-style palace with beautiful architecture' },
        { id: '3', name: 'Cubbon Park', type: 'Park', rating: 4.3, entry_fee: 'Free', timings: '6:00 AM - 6:00 PM', description: 'Large public park in the heart of the city' },
        { id: '4', name: 'Tipu Sultan\'s Summer Palace', type: 'Historical Monument', rating: 4.1, entry_fee: '₹15', timings: '8:30 AM - 5:30 PM', description: 'Beautiful example of Indo-Islamic architecture' }
      ],
      chennai: [
        { id: '1', name: 'Marina Beach', type: 'Beach', rating: 4.2, entry_fee: 'Free', timings: '24 Hours', description: 'World\'s second longest urban beach' },
        { id: '2', name: 'Kapaleeshwarar Temple', type: 'Temple', rating: 4.5, entry_fee: 'Free', timings: '5:30 AM - 10:00 PM', description: 'Ancient Dravidian architecture temple dedicated to Lord Shiva' },
        { id: '3', name: 'Fort St. George', type: 'Historical Fort', rating: 4.1, entry_fee: '₹15', timings: '9:00 AM - 5:00 PM', description: 'First British fortress in India' },
        { id: '4', name: 'Government Museum', type: 'Museum', rating: 4.3, entry_fee: '₹15', timings: '9:30 AM - 5:00 PM', description: 'Second oldest museum in India with rich collections' }
      ],
      kolkata: [
        { id: '1', name: 'Victoria Memorial', type: 'Monument', rating: 4.5, entry_fee: '₹30', timings: '10:00 AM - 5:00 PM', description: 'Marble building dedicated to Queen Victoria' },
        { id: '2', name: 'Howrah Bridge', type: 'Bridge', rating: 4.4, entry_fee: 'Free', timings: '24 Hours', description: 'Iconic cantilever bridge over Hooghly River' },
        { id: '3', name: 'Dakshineswar Kali Temple', type: 'Temple', rating: 4.6, entry_fee: 'Free', timings: '6:00 AM - 12:30 PM, 3:00 PM - 8:30 PM', description: 'Famous temple dedicated to Goddess Kali' },
        { id: '4', name: 'Indian Museum', type: 'Museum', rating: 4.2, entry_fee: '₹20', timings: '10:00 AM - 5:00 PM', description: 'Oldest and largest museum in India' }
      ],
      jaipur: [
        { id: '1', name: 'Hawa Mahal', type: 'Palace', rating: 4.4, entry_fee: '₹50', timings: '9:00 AM - 4:30 PM', description: 'Palace of Winds with intricate lattice work' },
        { id: '2', name: 'Amber Fort', type: 'Fort', rating: 4.6, entry_fee: '₹100', timings: '8:00 AM - 6:00 PM', description: 'Magnificent hilltop fort with stunning architecture' },
        { id: '3', name: 'City Palace', type: 'Palace', rating: 4.5, entry_fee: '₹130', timings: '9:30 AM - 5:00 PM', description: 'Royal palace complex with museums and courtyards' },
        { id: '4', name: 'Jantar Mantar', type: 'Observatory', rating: 4.3, entry_fee: '₹50', timings: '9:00 AM - 4:30 PM', description: 'Collection of architectural astronomical instruments' }
      ],
      goa: [
        { id: '1', name: 'Baga Beach', type: 'Beach', rating: 4.3, entry_fee: 'Free', timings: '24 Hours', description: 'Popular beach known for water sports and nightlife' },
        { id: '2', name: 'Basilica of Bom Jesus', type: 'Church', rating: 4.5, entry_fee: 'Free', timings: '9:00 AM - 6:30 PM', description: 'UNESCO World Heritage Site housing St. Francis Xavier\'s remains' },
        { id: '3', name: 'Fort Aguada', type: 'Fort', rating: 4.2, entry_fee: '₹25', timings: '9:30 AM - 6:00 PM', description: '17th-century Portuguese fort overlooking the Arabian Sea' },
        { id: '4', name: 'Dudhsagar Falls', type: 'Waterfall', rating: 4.6, entry_fee: '₹30', timings: '6:00 AM - 6:00 PM', description: 'Four-tiered waterfall on the Mandovi River' }
      ]
    };

    return attractionData[cityLower] || [
      {
        id: '1',
        name: 'Local Tourist Spot',
        type: 'Tourist Attraction',
        rating: 4.0,
        entry_fee: '₹20-100',
        timings: '9:00 AM - 6:00 PM',
        description: 'Popular local attraction worth visiting'
      },
      {
        id: '2',
        name: 'Cultural Heritage Site',
        type: 'Historical',
        rating: 4.2,
        entry_fee: '₹15-50',
        timings: '10:00 AM - 5:00 PM',
        description: 'Important cultural and historical site'
      }
    ];
  };

  useEffect(() => {
    const cityAttractions = getAttractionsForCity(tripData.destination);
    
    setTimeout(() => {
      setAttractions(cityAttractions);
      setLoading(false);
    }, 1000);
  }, [tripData]);

  const handleNext = () => {
    console.log('Tourist attractions viewed for:', tripData.destination);
    onNext();
  };

  if (loading) {
    return (
      <Card className="shadow-xl border-t-4 border-t-orange-500">
        <CardHeader>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent">
            Finding Tourist Attractions in {tripData.destination}...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 h-24 rounded-lg mb-4"></div>
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
        <CardTitle className="text-2xl font-bold text-gray-800">
          Tourist Attractions in {tripData.destination}
        </CardTitle>
        <p className="text-gray-600 font-semibold">
          Explore the must-visit places in {tripData.destination}
        </p>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid md:grid-cols-2 gap-6">
          {attractions.map((attraction) => (
            <Card key={attraction.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-2 text-gray-800">{attraction.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{attraction.description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold">Type:</span>
                    <span>{attraction.type}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold">Entry Fee:</span>
                    <span>{attraction.entry_fee}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold">Timings:</span>
                    <span>{attraction.timings}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold">Rating:</span>
                    <span className="text-yellow-500">★ {attraction.rating}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-end mt-8">
          <Button onClick={handleNext} className="bg-gradient-to-r from-orange-500 to-blue-600 hover:from-orange-600 hover:to-blue-700 text-white font-bold px-8 py-3 text-lg">
            Next: Famous Dishes
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};