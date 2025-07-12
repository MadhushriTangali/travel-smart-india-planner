
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, MapPin, Calendar, IndianRupee } from 'lucide-react';
import { HotelRecommendations } from '@/components/trip/HotelRecommendations';
import { TouristAttractions } from '@/components/trip/TouristAttractions';
import { FamousDishes } from '@/components/trip/FamousDishes';
import { CulturePage } from '@/components/trip/CulturePage';
import { CostEstimator } from '@/components/trip/CostEstimator';
import { TransportModule } from '@/components/trip/TransportModule';
import { TripSummary } from '@/components/trip/TripSummary';
import { toast } from '@/hooks/use-toast';

interface TripPlanningFormProps {
  onBack: () => void;
}

export interface TripData {
  source_location: string;
  destination: string;
  budget: number;
  duration: string;
  travel_style: string;
  notes: string;
}

export const TripPlanningForm = ({ onBack }: TripPlanningFormProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [tripData, setTripData] = useState<TripData>({
    source_location: '',
    destination: '',
    budget: 0,
    duration: '',
    travel_style: '',
    notes: ''
  });

  const steps = [
    'Trip Details',
    'Hotels',
    'Attractions', 
    'Famous Dishes',
    'Culture',
    'Transport',
    'Cost Estimator',
    'Summary'
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!tripData.source_location || !tripData.destination || !tripData.budget) {
      toast({
        title: "Missing Information",
        description: "Please fill in source location, destination, and budget.",
        variant: "destructive"
      });
      return;
    }

    if (tripData.budget < 1000) {
      toast({
        title: "Budget Warning",
        description: "Your budget seems quite low. Consider increasing it for better options.",
        variant: "destructive"
      });
    }

    console.log('Trip planning started with data:', tripData);
    setCurrentStep(1);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Plan Your Trip
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="source">Source Location</Label>
                    <Input
                      id="source"
                      placeholder="e.g., Mumbai, Delhi, Bangalore"
                      value={tripData.source_location}
                      onChange={(e) => setTripData({...tripData, source_location: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="destination">Destination City</Label>
                    <Input
                      id="destination"
                      placeholder="e.g., Goa, Kerala, Rajasthan"
                      value={tripData.destination}
                      onChange={(e) => setTripData({...tripData, destination: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="budget">Budget (₹ INR)</Label>
                    <div className="relative">
                      <IndianRupee className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="budget"
                        type="number"
                        placeholder="e.g., 25000"
                        className="pl-10"
                        value={tripData.budget || ''}
                        onChange={(e) => setTripData({...tripData, budget: parseInt(e.target.value) || 0})}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration">Trip Duration</Label>
                    <Select value={tripData.duration} onValueChange={(value) => setTripData({...tripData, duration: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-2 days">1-2 days</SelectItem>
                        <SelectItem value="3-4 days">3-4 days</SelectItem>
                        <SelectItem value="5-7 days">5-7 days</SelectItem>
                        <SelectItem value="1-2 weeks">1-2 weeks</SelectItem>
                        <SelectItem value="More than 2 weeks">More than 2 weeks</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="travel_style">Travel Style</Label>
                  <Select value={tripData.travel_style} onValueChange={(value) => setTripData({...tripData, travel_style: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your travel style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="economy">Economy</SelectItem>
                      <SelectItem value="mid-range">Mid-range</SelectItem>
                      <SelectItem value="premium">Premium</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Any specific preferences, interests, or requirements..."
                    value={tripData.notes}
                    onChange={(e) => setTripData({...tripData, notes: e.target.value})}
                  />
                </div>

                <Button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-blue-600">
                  Start Planning Trip
                </Button>
              </form>
            </CardContent>
          </Card>
        );
      
      case 1:
        return <HotelRecommendations tripData={tripData} onNext={() => setCurrentStep(2)} />;
      
      case 2:
        return <TouristAttractions tripData={tripData} onNext={() => setCurrentStep(3)} />;
      
      case 3:
        return <FamousDishes tripData={tripData} onNext={() => setCurrentStep(4)} />;
      
      case 4:
        return <CulturePage tripData={tripData} onNext={() => setCurrentStep(5)} />;
      
      case 5:
        return <TransportModule tripData={tripData} onNext={() => setCurrentStep(6)} />;
      
      case 6:
        return <CostEstimator tripData={tripData} onNext={() => setCurrentStep(7)} />;
      
      case 7:
        return <TripSummary tripData={tripData} onSave={() => console.log('Trip saved')} />;
      
      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-800">Trip Planning</h1>
          <p className="text-gray-600">Step {currentStep + 1} of {steps.length}: {steps[currentStep]}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
        <div 
          className="bg-gradient-to-r from-orange-500 to-blue-600 h-2 rounded-full transition-all duration-300" 
          style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
        ></div>
      </div>

      {renderStepContent()}
    </div>
  );
};
