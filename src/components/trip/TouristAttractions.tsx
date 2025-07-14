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
      ],
      hyderabad: [
        { id: '1', name: 'Charminar', type: 'Historical Monument', rating: 4.4, entry_fee: '₹30', timings: '9:30 AM - 5:30 PM', description: 'Iconic 16th-century mosque and monument' },
        { id: '2', name: 'Golconda Fort', type: 'Fort', rating: 4.5, entry_fee: '₹25', timings: '9:00 AM - 6:30 PM', description: 'Medieval fort known for its acoustics and diamond trade history' },
        { id: '3', name: 'Hussain Sagar Lake', type: 'Lake', rating: 4.2, entry_fee: 'Free', timings: '24 Hours', description: 'Heart-shaped lake with Buddha statue in the center' },
        { id: '4', name: 'Ramoji Film City', type: 'Entertainment', rating: 4.3, entry_fee: '₹1200-2000', timings: '9:00 AM - 5:30 PM', description: 'World\'s largest film studio complex' }
      ],
      varanasi: [
        { id: '1', name: 'Kashi Vishwanath Temple', type: 'Temple', rating: 4.6, entry_fee: 'Free', timings: '4:00 AM - 11:00 PM', description: 'Most sacred Hindu temple dedicated to Lord Shiva' },
        { id: '2', name: 'Dashashwamedh Ghat', type: 'Ghat', rating: 4.5, entry_fee: 'Free', timings: '24 Hours', description: 'Main ghat famous for Ganga Aarti ceremony' },
        { id: '3', name: 'Sarnath', type: 'Buddhist Site', rating: 4.4, entry_fee: '₹15', timings: '9:00 AM - 5:00 PM', description: 'Place where Buddha gave his first sermon' },
        { id: '4', name: 'Ramnagar Fort', type: 'Fort', rating: 4.1, entry_fee: '₹15', timings: '9:00 AM - 5:00 PM', description: '18th-century fort and palace complex' }
      ],
      pune: [
        { id: '1', name: 'Shaniwar Wada', type: 'Historical Fort', rating: 4.2, entry_fee: '₹25', timings: '8:00 AM - 6:30 PM', description: 'Historic fortified palace of Peshwa rulers' },
        { id: '2', name: 'Aga Khan Palace', type: 'Palace', rating: 4.3, entry_fee: '₹25', timings: '9:00 AM - 5:30 PM', description: 'Palace where Mahatma Gandhi was imprisoned' },
        { id: '3', name: 'Sinhagad Fort', type: 'Hill Fort', rating: 4.4, entry_fee: 'Free', timings: '6:00 AM - 6:00 PM', description: 'Historic hill fort with scenic views' },
        { id: '4', name: 'Dagdusheth Halwai Ganapati Temple', type: 'Temple', rating: 4.5, entry_fee: 'Free', timings: '5:00 AM - 11:30 PM', description: 'Famous Ganesh temple with rich history' }
      ],
      'hubli-dharwad': [
        { id: '1', name: 'Unkal Lake', type: 'Lake', rating: 4.2, entry_fee: 'Free', timings: '6:00 AM - 7:00 PM', description: 'Scenic lake perfect for boating and relaxation' },
        { id: '2', name: 'Chandramouleshwara Temple', type: 'Temple', rating: 4.3, entry_fee: 'Free', timings: '6:00 AM - 8:00 PM', description: 'Ancient temple with beautiful Chalukyan architecture' },
        { id: '3', name: 'Indira Gandhi Glass House Garden', type: 'Garden', rating: 4.1, entry_fee: '₹10', timings: '6:00 AM - 8:00 PM', description: 'Beautiful garden with glass house and variety of plants' },
        { id: '4', name: 'Nrupatunga Betta', type: 'Hill', rating: 4.0, entry_fee: 'Free', timings: '6:00 AM - 6:00 PM', description: 'Small hill offering panoramic views of twin cities' }
      ],
      lucknow: [
        { id: '1', name: 'Bara Imambara', type: 'Monument', rating: 4.5, entry_fee: '₹50', timings: '6:00 AM - 5:00 PM', description: 'Historic complex with the famous Bhool Bhulaiya maze' },
        { id: '2', name: 'Chota Imambara', type: 'Monument', rating: 4.3, entry_fee: '₹25', timings: '6:00 AM - 5:00 PM', description: 'Beautiful palace also known as Palace of Lights' },
        { id: '3', name: 'Rumi Darwaza', type: 'Gateway', rating: 4.4, entry_fee: 'Free', timings: '24 Hours', description: 'Imposing gateway built in Awadhi style' },
        { id: '4', name: 'British Residency', type: 'Historical Site', rating: 4.2, entry_fee: '₹15', timings: '9:00 AM - 5:00 PM', description: 'Ruins from the 1857 uprising with historical significance' }
      ],
      mysore: [
        { id: '1', name: 'Mysore Palace', type: 'Palace', rating: 4.6, entry_fee: '₹70', timings: '10:00 AM - 5:30 PM', description: 'Magnificent palace known for its illumination' },
        { id: '2', name: 'Chamundi Hills', type: 'Hill Temple', rating: 4.4, entry_fee: 'Free', timings: '6:00 AM - 8:00 PM', description: 'Sacred hill with Chamundeshwari Temple' },
        { id: '3', name: 'Brindavan Gardens', type: 'Garden', rating: 4.3, entry_fee: '₹60', timings: '6:30 PM - 8:30 PM', description: 'Musical fountain garden below KRS dam' },
        { id: '4', name: 'St. Philomena\'s Cathedral', type: 'Church', rating: 4.2, entry_fee: 'Free', timings: '6:00 AM - 6:00 PM', description: 'Neo-Gothic style cathedral with twin spires' }
      ],
      coimbatore: [
        { id: '1', name: 'Marudamalai Temple', type: 'Temple', rating: 4.4, entry_fee: 'Free', timings: '5:30 AM - 9:00 PM', description: 'Hill temple dedicated to Lord Murugan' },
        { id: '2', name: 'VOC Park and Zoo', type: 'Zoo', rating: 4.1, entry_fee: '₹15', timings: '9:00 AM - 5:30 PM', description: 'Park and zoo with variety of animals and birds' },
        { id: '3', name: 'Dhyanalinga', type: 'Spiritual Center', rating: 4.5, entry_fee: 'Free', timings: '6:00 AM - 8:00 PM', description: 'Unique meditative space at Isha Yoga Center' },
        { id: '4', name: 'Monkey Falls', type: 'Waterfall', rating: 4.2, entry_fee: '₹30', timings: '6:00 AM - 6:00 PM', description: 'Scenic waterfall in the Anaimalai Hills' }
      ],
      agra: [
        { id: '1', name: 'Taj Mahal', type: 'UNESCO World Heritage', rating: 4.8, entry_fee: '₹1100', timings: '6:00 AM - 6:30 PM', description: 'World\'s most famous monument of love' },
        { id: '2', name: 'Agra Fort', type: 'Fort', rating: 4.5, entry_fee: '₹650', timings: '6:00 AM - 6:00 PM', description: 'Massive Mughal fort complex' },
        { id: '3', name: 'Fatehpur Sikri', type: 'Historical City', rating: 4.4, entry_fee: '₹550', timings: '6:00 AM - 6:00 PM', description: 'Abandoned Mughal city with stunning architecture' },
        { id: '4', name: 'Itimad-ud-Daulah', type: 'Tomb', rating: 4.3, entry_fee: '₹310', timings: '6:00 AM - 6:00 PM', description: 'Baby Taj with intricate marble work' }
      ],
      amritsar: [
        { id: '1', name: 'Golden Temple', type: 'Religious Site', rating: 4.8, entry_fee: 'Free', timings: '24 Hours', description: 'Most sacred Sikh temple with golden dome' },
        { id: '2', name: 'Jallianwala Bagh', type: 'Memorial', rating: 4.3, entry_fee: 'Free', timings: '6:30 AM - 7:30 PM', description: 'Memorial of the 1919 massacre' },
        { id: '3', name: 'Wagah Border', type: 'Border Ceremony', rating: 4.5, entry_fee: 'Free', timings: '4:15 PM - 5:45 PM', description: 'Daily flag lowering ceremony at India-Pakistan border' },
        { id: '4', name: 'Gobindgarh Fort', type: 'Fort', rating: 4.1, entry_fee: '₹150', timings: '10:00 AM - 10:00 PM', description: 'Historic fort turned cultural destination' }
      ],
      nagpur: [
        { id: '1', name: 'Deekshabhoomi', type: 'Buddhist Monument', rating: 4.4, entry_fee: 'Free', timings: '6:00 AM - 10:00 PM', description: 'Sacred Buddhist monument and stupa' },
        { id: '2', name: 'Ambazari Lake', type: 'Lake', rating: 4.2, entry_fee: 'Free', timings: '24 Hours', description: 'Largest lake in Nagpur with garden and boating' },
        { id: '3', name: 'Raman Science Centre', type: 'Science Museum', rating: 4.3, entry_fee: '₹35', timings: '10:30 AM - 8:00 PM', description: 'Interactive science museum and planetarium' },
        { id: '4', name: 'Dragon Palace Temple', type: 'Temple', rating: 4.1, entry_fee: 'Free', timings: '6:00 AM - 9:00 PM', description: 'Beautiful Buddhist temple with Japanese architecture' }
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