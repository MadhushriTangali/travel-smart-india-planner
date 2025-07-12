
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
    
    // Base transport pricing and duration logic based on common Indian routes
    const getRouteInfo = (from: string, to: string) => {
      const routes: { [key: string]: { distance: number; flightTime: string; trainTime: string; busTime: string } } = {
        'hyderabad-mumbai': { distance: 710, flightTime: '1h 30m', trainTime: '14h 00m', busTime: '12h 30m' },
        'mumbai-hyderabad': { distance: 710, flightTime: '1h 30m', trainTime: '14h 00m', busTime: '12h 30m' },
        'delhi-mumbai': { distance: 1400, flightTime: '2h 15m', trainTime: '17h 30m', busTime: '18h 00m' },
        'mumbai-delhi': { distance: 1400, flightTime: '2h 15m', trainTime: '17h 30m', busTime: '18h 00m' },
        'delhi-hyderabad': { distance: 1570, flightTime: '2h 30m', trainTime: '20h 00m', busTime: '22h 00m' },
        'hyderabad-delhi': { distance: 1570, flightTime: '2h 30m', trainTime: '20h 00m', busTime: '22h 00m' },
        'mumbai-goa': { distance: 450, flightTime: '1h 15m', trainTime: '12h 00m', busTime: '10h 00m' },
        'goa-mumbai': { distance: 450, flightTime: '1h 15m', trainTime: '12h 00m', busTime: '10h 00m' },
        'delhi-goa': { distance: 1860, flightTime: '2h 45m', trainTime: '26h 00m', busTime: '24h 00m' },
        'goa-delhi': { distance: 1860, flightTime: '2h 45m', trainTime: '26h 00m', busTime: '24h 00m' },
        'hyderabad-goa': { distance: 630, flightTime: '1h 20m', trainTime: '14h 30m', busTime: '12h 00m' },
        'goa-hyderabad': { distance: 630, flightTime: '1h 20m', trainTime: '14h 30m', busTime: '12h 00m' }
      };

      const routeKey = `${from}-${to}`;
      return routes[routeKey] || { distance: 500, flightTime: '1h 30m', trainTime: '10h 00m', busTime: '8h 00m' };
    };

    const routeInfo = getRouteInfo(sourceCity, destCity);
    
    // Realistic pricing based on distance and transport type
    const baseBusPrice = Math.floor(routeInfo.distance * 0.8); // ₹0.8 per km for bus
    const baseTrainPrice = Math.floor(routeInfo.distance * 1.2); // ₹1.2 per km for train
    const baseFlightPrice = Math.floor(routeInfo.distance * 4); // ₹4 per km for flight

    return [
      {
        id: '1',
        type: 'bus',
        name: 'AC Sleeper Bus',
        price: baseBusPrice + 200,
        duration: routeInfo.busTime,
        available: true,
        class: 'AC Sleeper'
      },
      {
        id: '2',
        type: 'bus',  
        name: 'Non-AC Seater',
        price: Math.floor(baseBusPrice * 0.7),
        duration: routeInfo.busTime,
        available: true,
        class: 'Non-AC Seater'
      },
      {
        id: '3',
        type: 'train',
        name: '3AC Train',
        price: baseTrainPrice + 300,
        duration: routeInfo.trainTime,
        available: true,
        class: '3AC'
      },
      {
        id: '4',
        type: 'train',
        name: 'Sleeper Class',
        price: Math.floor(baseTrainPrice * 0.6),
        duration: routeInfo.trainTime,
        available: true,
        class: 'Sleeper'
      },
      {
        id: '5',
        type: 'flight',
        name: 'Economy Flight',
        price: baseFlightPrice,
        duration: routeInfo.flightTime,
        available: true,
        class: 'Economy'
      },
      {
        id: '6',
        type: 'train',
        name: '2AC Train',
        price: baseTrainPrice + 600,
        duration: routeInfo.trainTime,
        available: Math.random() > 0.3, // 70% availability
        class: '2AC'
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
