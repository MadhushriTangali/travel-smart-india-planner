import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bus, Train, Plane, Clock, IndianRupee, ArrowRight } from 'lucide-react';
import { TripData } from '@/components/TripPlanningForm';

interface TransportOption {
  id: string;
  type: 'bus' | 'train' | 'flight';
  name: string;
  price: number;
  duration: string;
  available: boolean;
  class?: string;
}

interface TransportModuleProps {
  tripData: TripData;
  onNext: () => void;
}

export const TransportModule = ({ tripData, onNext }: TransportModuleProps) => {
  const [transportOptions, setTransportOptions] = useState<TransportOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTransport, setSelectedTransport] = useState<TransportOption | null>(null);

  const getTransportForRoute = (source: string, destination: string): TransportOption[] => {
    const sourceCity = source.toLowerCase();
    const destCity = destination.toLowerCase();
    
    // Real transport pricing and duration based on Indian travel patterns
    const getRouteInfo = (from: string, to: string) => {
      const routes: { [key: string]: { busDuration: string; trainDuration: string; flightDuration: string; busPrice: number; trainPrice: number; flightPrice: number } } = {
        // Major route combinations with realistic pricing
        'delhi-mumbai': { busDuration: '18h', trainDuration: '16h', flightDuration: '2h 15m', busPrice: 1200, trainPrice: 1800, flightPrice: 4500 },
        'mumbai-delhi': { busDuration: '18h', trainDuration: '16h', flightDuration: '2h 15m', busPrice: 1200, trainPrice: 1800, flightPrice: 4500 },
        'delhi-bangalore': { busDuration: '24h', trainDuration: '34h', flightDuration: '2h 45m', busPrice: 1800, trainPrice: 2200, flightPrice: 5200 },
        'bangalore-delhi': { busDuration: '24h', trainDuration: '34h', flightDuration: '2h 45m', busPrice: 1800, trainPrice: 2200, flightPrice: 5200 },
        'mumbai-bangalore': { busDuration: '12h', trainDuration: '24h', flightDuration: '1h 30m', busPrice: 800, trainPrice: 1400, flightPrice: 3800 },
        'bangalore-mumbai': { busDuration: '12h', trainDuration: '24h', flightDuration: '1h 30m', busPrice: 800, trainPrice: 1400, flightPrice: 3800 },
        'delhi-chennai': { busDuration: '30h', trainDuration: '28h', flightDuration: '2h 30m', busPrice: 2000, trainPrice: 2500, flightPrice: 5800 },
        'chennai-delhi': { busDuration: '30h', trainDuration: '28h', flightDuration: '2h 30m', busPrice: 2000, trainPrice: 2500, flightPrice: 5800 },
        'mumbai-chennai': { busDuration: '14h', trainDuration: '22h', flightDuration: '1h 45m', busPrice: 900, trainPrice: 1600, flightPrice: 4200 },
        'chennai-mumbai': { busDuration: '14h', trainDuration: '22h', flightDuration: '1h 45m', busPrice: 900, trainPrice: 1600, flightPrice: 4200 },
        'delhi-kolkata': { busDuration: '20h', trainDuration: '17h', flightDuration: '2h 10m', busPrice: 1400, trainPrice: 1900, flightPrice: 4800 },
        'kolkata-delhi': { busDuration: '20h', trainDuration: '17h', flightDuration: '2h 10m', busPrice: 1400, trainPrice: 1900, flightPrice: 4800 },
        'mumbai-goa': { busDuration: '10h', trainDuration: '12h', flightDuration: '1h 15m', busPrice: 600, trainPrice: 800, flightPrice: 3200 },
        'goa-mumbai': { busDuration: '10h', trainDuration: '12h', flightDuration: '1h 15m', busPrice: 600, trainPrice: 800, flightPrice: 3200 },
        'bangalore-goa': { busDuration: '8h', trainDuration: '15h', flightDuration: '1h 10m', busPrice: 500, trainPrice: 700, flightPrice: 2800 },
        'goa-bangalore': { busDuration: '8h', trainDuration: '15h', flightDuration: '1h 10m', busPrice: 500, trainPrice: 700, flightPrice: 2800 },
        'delhi-jaipur': { busDuration: '5h', trainDuration: '4h 30m', flightDuration: '1h 20m', busPrice: 300, trainPrice: 400, flightPrice: 2500 },
        'jaipur-delhi': { busDuration: '5h', trainDuration: '4h 30m', flightDuration: '1h 20m', busPrice: 300, trainPrice: 400, flightPrice: 2500 },
        'mumbai-pune': { busDuration: '3h 30m', trainDuration: '3h', flightDuration: '45m', busPrice: 200, trainPrice: 150, flightPrice: 2200 },
        'pune-mumbai': { busDuration: '3h 30m', trainDuration: '3h', flightDuration: '45m', busPrice: 200, trainPrice: 150, flightPrice: 2200 },
        'delhi-lucknow': { busDuration: '8h', trainDuration: '6h', flightDuration: '1h 30m', busPrice: 500, trainPrice: 600, flightPrice: 3000 },
        'lucknow-delhi': { busDuration: '8h', trainDuration: '6h', flightDuration: '1h 30m', busPrice: 500, trainPrice: 600, flightPrice: 3000 },
        'mumbai-ahmedabad': { busDuration: '8h', trainDuration: '7h', flightDuration: '1h 20m', busPrice: 400, trainPrice: 500, flightPrice: 2800 },
        'ahmedabad-mumbai': { busDuration: '8h', trainDuration: '7h', flightDuration: '1h 20m', busPrice: 400, trainPrice: 500, flightPrice: 2800 },
        'bangalore-chennai': { busDuration: '7h', trainDuration: '5h', flightDuration: '1h 15m', busPrice: 350, trainPrice: 450, flightPrice: 2600 },
        'chennai-bangalore': { busDuration: '7h', trainDuration: '5h', flightDuration: '1h 15m', busPrice: 350, trainPrice: 450, flightPrice: 2600 },
        'kochi-bangalore': { busDuration: '12h', trainDuration: '11h', flightDuration: '1h 25m', busPrice: 600, trainPrice: 800, flightPrice: 3200 },
        'bangalore-kochi': { busDuration: '12h', trainDuration: '11h', flightDuration: '1h 25m', busPrice: 600, trainPrice: 800, flightPrice: 3200 },
        'thiruvananthapuram-bangalore': { busDuration: '16h', trainDuration: '15h', flightDuration: '1h 30m', busPrice: 800, trainPrice: 1000, flightPrice: 3500 },
        'bangalore-thiruvananthapuram': { busDuration: '16h', trainDuration: '15h', flightDuration: '1h 30m', busPrice: 800, trainPrice: 1000, flightPrice: 3500 },
        'hyderabad-bangalore': { busDuration: '8h', trainDuration: '12h', flightDuration: '1h 15m', busPrice: 450, trainPrice: 600, flightPrice: 2800 },
        'bangalore-hyderabad': { busDuration: '8h', trainDuration: '12h', flightDuration: '1h 15m', busPrice: 450, trainPrice: 600, flightPrice: 2800 },
        'delhi-bhopal': { busDuration: '10h', trainDuration: '8h', flightDuration: '1h 45m', busPrice: 600, trainPrice: 800, flightPrice: 3200 },
        'bhopal-delhi': { busDuration: '10h', trainDuration: '8h', flightDuration: '1h 45m', busPrice: 600, trainPrice: 800, flightPrice: 3200 }
      };

      const routeKey = `${from}-${to}`;
      return routes[routeKey] || { 
        busDuration: '8h', trainDuration: '10h', flightDuration: '1h 30m', 
        busPrice: 500, trainPrice: 800, flightPrice: 3500 
      };
    };

    const routeInfo = getRouteInfo(sourceCity, destCity);
    
    return [
      {
        id: '1',
        type: 'bus',
        name: 'AC Sleeper Bus',
        price: routeInfo.busPrice + 200,
        duration: routeInfo.busDuration,
        available: true,
        class: 'AC Sleeper'
      },
      {
        id: '2',
        type: 'bus',  
        name: 'AC Semi-Sleeper',
        price: routeInfo.busPrice,
        duration: routeInfo.busDuration,
        available: true,
        class: 'AC Semi-Sleeper'
      },
      {
        id: '3',
        type: 'bus',
        name: 'Non-AC Seater',
        price: Math.floor(routeInfo.busPrice * 0.6),
        duration: routeInfo.busDuration,
        available: true,
        class: 'Non-AC Seater'
      },
      {
        id: '4',
        type: 'train',
        name: '3AC Train',
        price: routeInfo.trainPrice + 400,
        duration: routeInfo.trainDuration,
        available: true,
        class: '3AC'
      },
      {
        id: '5',
        type: 'train',
        name: '2AC Train',
        price: routeInfo.trainPrice + 800,
        duration: routeInfo.trainDuration,
        available: Math.random() > 0.3,
        class: '2AC'
      },
      {
        id: '6',
        type: 'train',
        name: 'Sleeper Class',
        price: Math.floor(routeInfo.trainPrice * 0.5),
        duration: routeInfo.trainDuration,
        available: true,
        class: 'Sleeper'
      },
      {
        id: '7',
        type: 'flight',
        name: 'Economy Class',
        price: routeInfo.flightPrice,
        duration: routeInfo.flightDuration,
        available: true,
        class: 'Economy'
      },
      {
        id: '8',
        type: 'flight',
        name: 'Premium Economy',
        price: Math.floor(routeInfo.flightPrice * 1.4),
        duration: routeInfo.flightDuration,
        available: Math.random() > 0.4,
        class: 'Premium Economy'
      }
    ];
  };

  useEffect(() => {
    const transports = getTransportForRoute(tripData.source_location, tripData.destination);
    
    // Filter by budget - transport shouldn't exceed 40% of total budget
    const filteredTransports = transports.filter(transport => 
      transport.price <= tripData.budget * 0.4
    );

    setTimeout(() => {
      setTransportOptions(filteredTransports);
      setLoading(false);
    }, 1000);
  }, [tripData]);

  const getTransportIcon = (type: string) => {
    switch (type) {
      case 'bus': return <Bus className="h-5 w-5" />;
      case 'train': return <Train className="h-5 w-5" />;
      case 'flight': return <Plane className="h-5 w-5" />;
      default: return null;
    }
  };

  const getTransportColor = (type: string) => {
    switch (type) {
      case 'bus': return 'bg-green-500';
      case 'train': return 'bg-blue-500';
      case 'flight': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const handleSelectTransport = (transport: TransportOption) => {
    if (!transport.available) return;
    setSelectedTransport(transport);
  };

  const handleNext = () => {
    if (!selectedTransport) {
      alert('Please select a transport option to continue.');
      return;
    }
    console.log('Selected transport:', selectedTransport);
    onNext();
  };

  if (loading) {
    return (
      <Card className="shadow-xl border-t-4 border-t-orange-500">
        <CardHeader>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent">
            Finding Transport Options...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gradient-to-r from-gray-200 to-gray-300 h-20 rounded-lg"></div>
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
          <Train className="h-6 w-6 text-orange-500" />
          Transport from {tripData.source_location} to {tripData.destination}
        </CardTitle>
        <p className="text-gray-600 font-semibold">
          Choose your preferred mode of transport within your budget
        </p>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {transportOptions.map((transport) => (
            <Card 
              key={transport.id}
              className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                selectedTransport?.id === transport.id ? 'ring-2 ring-orange-500 bg-gradient-to-r from-orange-50 to-blue-50' : ''
              } ${!transport.available ? 'opacity-50 cursor-not-allowed' : 'hover:scale-102'}`}
              onClick={() => handleSelectTransport(transport)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full ${getTransportColor(transport.type)} text-white`}>
                      {getTransportIcon(transport.type)}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-800">{transport.name}</h3>
                      <p className="text-sm text-gray-600 font-medium">{transport.class}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-2">
                      <IndianRupee className="h-5 w-5 text-gray-500" />
                      <span className="font-bold text-xl text-gray-800">₹{transport.price.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span className="font-medium">{transport.duration}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-4 pt-3 border-t-2 border-gray-100">
                  <div className="text-sm font-medium">
                    <span className="text-gray-600">Type: </span>
                    <span className="font-bold text-gray-800 capitalize">{transport.type}</span>
                  </div>
                  <div className="text-sm font-medium">
                    <span className="text-gray-600">Duration: </span>
                    <span className="font-bold text-gray-800">{transport.duration}</span>
                  </div>
                  <Badge className={transport.available ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500'}>
                    {transport.available ? 'Available' : 'Sold Out'}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {selectedTransport && (
          <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border-2 border-blue-200">
            <h4 className="font-bold text-xl mb-4 text-gray-800">Selected Transport:</h4>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-lg text-gray-800">{selectedTransport.name}</p>
                <p className="text-sm text-gray-600 font-medium">{selectedTransport.class} • {selectedTransport.duration}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-xl text-green-600">₹{selectedTransport.price.toLocaleString()}</p>
                <p className="text-sm text-gray-600 font-medium">Duration: {selectedTransport.duration}</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end mt-8">
          <Button onClick={handleNext} className="bg-gradient-to-r from-orange-500 to-blue-600 hover:from-orange-600 hover:to-blue-700 text-white font-bold px-8 py-3 text-lg">
            Next: Cost Estimator
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
