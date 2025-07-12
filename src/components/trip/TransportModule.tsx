
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
  departure: string;
  arrival: string;
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

  useEffect(() => {
    const mockTransports: TransportOption[] = [
      {
        id: '1',
        type: 'bus',
        name: `${tripData.source_location} to ${tripData.destination} Express`,
        price: Math.floor(tripData.budget * 0.1),
        duration: '8h 30m',
        departure: '10:00 AM',
        arrival: '6:30 PM',
        available: true,
        class: 'AC Sleeper'
      },
      {
        id: '2',
        type: 'train',
        name: `${tripData.destination} Express`,
        price: Math.floor(tripData.budget * 0.15),
        duration: '6h 45m',
        departure: '2:15 PM',
        arrival: '9:00 PM',
        available: true,
        class: '3AC'
      },
      {
        id: '3',
        type: 'flight',
        name: `${tripData.source_location} - ${tripData.destination} Flight`,
        price: Math.floor(tripData.budget * 0.35),
        duration: '1h 25m',
        departure: '9:45 AM',
        arrival: '11:10 AM',
        available: true,
        class: 'Economy'
      },
      {
        id: '4',
        type: 'bus',
        name: 'Budget Travels',
        price: Math.floor(tripData.budget * 0.08),
        duration: '10h 15m',
        departure: '11:30 PM',
        arrival: '9:45 AM',
        available: true,
        class: 'Non-AC'
      },
      {
        id: '5',
        type: 'train',
        name: `${tripData.destination} Rajdhani`,
        price: Math.floor(tripData.budget * 0.25),
        duration: '5h 20m',
        departure: '6:00 AM',
        arrival: '11:20 AM',
        available: false,
        class: '2AC'
      }
    ];

    // Filter by budget
    const filteredTransports = mockTransports.filter(transport => 
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
      <Card>
        <CardHeader>
          <CardTitle>Finding Transport Options...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 h-20 rounded-lg"></div>
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
          <Train className="h-5 w-5" />
          Transport from {tripData.source_location} to {tripData.destination}
        </CardTitle>
        <p className="text-gray-600">
          Choose your preferred mode of transport within your budget
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transportOptions.map((transport) => (
            <Card 
              key={transport.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedTransport?.id === transport.id ? 'ring-2 ring-blue-500' : ''
              } ${!transport.available ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => handleSelectTransport(transport)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-full ${getTransportColor(transport.type)} text-white`}>
                      {getTransportIcon(transport.type)}
                    </div>
                    <div>
                      <h3 className="font-semibold">{transport.name}</h3>
                      <p className="text-sm text-gray-600">{transport.class}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-1">
                      <IndianRupee className="h-4 w-4 text-gray-500" />
                      <span className="font-semibold text-lg">₹{transport.price.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>{transport.duration}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-3 pt-3 border-t">
                  <div className="text-sm">
                    <span className="text-gray-600">Departure: </span>
                    <span className="font-medium">{transport.departure}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-600">Arrival: </span>
                    <span className="font-medium">{transport.arrival}</span>
                  </div>
                  <Badge className={transport.available ? 'bg-green-500' : 'bg-red-500'}>
                    {transport.available ? 'Available' : 'Sold Out'}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {selectedTransport && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-lg mb-2">Selected Transport:</h4>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{selectedTransport.name}</p>
                <p className="text-sm text-gray-600">{selectedTransport.class} • {selectedTransport.duration}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-lg">₹{selectedTransport.price.toLocaleString()}</p>
                <p className="text-sm text-gray-600">{selectedTransport.departure} - {selectedTransport.arrival}</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end mt-6">
          <Button onClick={handleNext} className="bg-gradient-to-r from-orange-500 to-blue-600">
            Next: Cost Estimator
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
