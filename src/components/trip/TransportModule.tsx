import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Plane, Train, Bus, Car } from 'lucide-react';
import { TripData } from '@/components/TripPlanningForm';

interface TransportRoute {
  id: string;
  mode: string;
  duration: string;
  price_range: string;
  description: string;
}

interface TransportModuleProps {
  tripData: TripData;
  onNext: () => void;
}

export const TransportModule = ({ tripData, onNext }: TransportModuleProps) => {
  const [transportOptions, setTransportOptions] = useState<TransportRoute[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTransport, setSelectedTransport] = useState<TransportRoute | null>(null);

  const getTransportRoutes = (source: string, destination: string): TransportRoute[] => {
    const routes: TransportRoute[] = [
      { id: '1', mode: 'Flight', duration: '2-3 hours', price_range: '₹3,000 - ₹8,000', description: 'Fastest option, book in advance for best prices' },
      { id: '2', mode: 'Train', duration: '12-24 hours', price_range: '₹800 - ₹3,000', description: 'Comfortable and scenic, book in advance' },
      { id: '3', mode: 'Bus', duration: '15-30 hours', price_range: '₹500 - ₹2,000', description: 'Budget-friendly, can be tiring' },
      { id: '4', mode: 'Car', duration: '18-36 hours', price_range: '₹4,000 - ₹10,000 (fuel)', description: 'Flexible, but long and requires planning' }
    ];

    return routes;
  };

  useEffect(() => {
    const routes = getTransportRoutes(tripData.source_location, tripData.destination);
    
    setTimeout(() => {
      setTransportOptions(routes);
      setLoading(false);
    }, 1000);
  }, [tripData]);

  const handleSelectTransport = (transport: TransportRoute) => {
    setSelectedTransport(transport);
  };

  const handleNext = () => {
    console.log('Selected transport:', selectedTransport);
    onNext();
  };

  const getTransportIcon = (mode: string) => {
    switch (mode) {
      case 'Flight':
        return <Plane className="h-5 w-5 mr-2" />;
      case 'Train':
        return <Train className="h-5 w-5 mr-2" />;
      case 'Bus':
        return <Bus className="h-5 w-5 mr-2" />;
      case 'Car':
        return <Car className="h-5 w-5 mr-2" />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <Card className="shadow-xl border-t-4 border-t-orange-500">
        <CardHeader>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent">
            Finding Transport Options from {tripData.source_location} to {tripData.destination}...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gradient-to-r from-gray-200 to-gray-300 h-24 rounded-lg mb-4"></div>
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
          <Plane className="h-6 w-6 text-orange-500" />
          Transport Options: {tripData.source_location} to {tripData.destination}
        </CardTitle>
        <p className="text-gray-600 font-semibold">
          Choose your preferred mode of transport
        </p>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid md:grid-cols-2 gap-6">
          {transportOptions.map((transport) => (
            <Card
              key={transport.id}
              className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 ${
                selectedTransport?.id === transport.id
                  ? 'ring-2 ring-orange-500 bg-gradient-to-br from-orange-50 to-blue-50'
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => handleSelectTransport(transport)}
            >
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-2 text-gray-800 flex items-center">
                  {getTransportIcon(transport.mode)}
                  {transport.mode}
                </h3>
                <p className="text-sm text-gray-600 mb-3 font-medium">{transport.description}</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-semibold">Duration:</span>
                    <span>{transport.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-semibold">Price:</span>
                    <span>{transport.price_range}</span>
                  </div>
                </div>
                <Button
                  className={`w-full mt-4 font-semibold ${
                    selectedTransport?.id === transport.id
                      ? 'bg-gradient-to-r from-orange-500 to-blue-600 hover:from-orange-600 hover:to-blue-700 text-white'
                      : 'border-2 border-orange-200 text-orange-600 hover:bg-orange-50'
                  }`}
                  variant={selectedTransport?.id === transport.id ? "default" : "outline"}
                >
                  {selectedTransport?.id === transport.id ? '✓ Selected' : 'Select this Route'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {selectedTransport && (
          <div className="mt-8 p-6 bg-gradient-to-r from-orange-50 to-blue-50 rounded-xl border-2 border-orange-200">
            <h4 className="font-bold text-xl mb-2 text-gray-800">Selected Transport:</h4>
            <p className="text-gray-700 font-semibold">
              {selectedTransport.mode} - {selectedTransport.duration} - {selectedTransport.price_range}
            </p>
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
