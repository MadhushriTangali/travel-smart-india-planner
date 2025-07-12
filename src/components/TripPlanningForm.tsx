
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Calendar, IndianRupee, Clock, ArrowLeft } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface TripPlanningFormProps {
  onBack: () => void;
}

export const TripPlanningForm = ({ onBack }: TripPlanningFormProps) => {
  const [formData, setFormData] = useState({
    source: '',
    destination: '',
    budget: '',
    duration: '',
    travelStyle: '',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.source || !formData.destination || !formData.budget) {
      toast({
        title: "Missing Information",
        description: "Please fill in source, destination, and budget fields.",
        variant: "destructive"
      });
      return;
    }

    // TODO: Process trip planning with API calls
    toast({
      title: "Trip Planning Started!",
      description: `Planning your trip from ${formData.source} to ${formData.destination} with ₹${formData.budget} budget.`,
    });

    console.log('Trip planning data:', formData);
  };

  const indianCities = [
    'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad',
    'Pune', 'Ahmedabad', 'Jaipur', 'Goa', 'Kerala', 'Agra', 'Udaipur',
    'Shimla', 'Manali', 'Rishikesh', 'Varanasi', 'Amritsar', 'Jodhpur',
    'Mysore', 'Kochi', 'Coimbatore', 'Madurai', 'Bhopal', 'Indore'
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={onBack} className="mr-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 className="text-2xl font-bold text-gray-800">Plan Your Trip</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-orange-500" />
            Trip Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Source Location */}
            <div className="space-y-2">
              <Label htmlFor="source">From (Source Location)</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="source"
                  placeholder="Enter your starting city"
                  className="pl-10"
                  value={formData.source}
                  onChange={(e) => setFormData({...formData, source: e.target.value})}
                  required
                />
              </div>
            </div>

            {/* Destination */}
            <div className="space-y-2">
              <Label htmlFor="destination">To (Destination City)</Label>
              <Select 
                value={formData.destination} 
                onValueChange={(value) => setFormData({...formData, destination: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select destination city" />
                </SelectTrigger>
                <SelectContent>
                  {indianCities.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Budget */}
            <div className="space-y-2">
              <Label htmlFor="budget">Budget (₹ INR)</Label>
              <div className="relative">
                <IndianRupee className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="budget"
                  type="number"
                  placeholder="Enter your total budget"
                  className="pl-10"
                  value={formData.budget}
                  onChange={(e) => setFormData({...formData, budget: e.target.value})}
                  required
                />
              </div>
              <p className="text-sm text-gray-500">
                Include accommodation, food, transport, and activities
              </p>
            </div>

            {/* Duration */}
            <div className="space-y-2">
              <Label htmlFor="duration">Trip Duration (Optional)</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="duration"
                  placeholder="e.g., 3 days, 1 week"
                  className="pl-10"
                  value={formData.duration}
                  onChange={(e) => setFormData({...formData, duration: e.target.value})}
                />
              </div>
            </div>

            {/* Travel Style */}
            <div className="space-y-2">
              <Label htmlFor="travelStyle">Travel Style</Label>
              <Select 
                value={formData.travelStyle} 
                onValueChange={(value) => setFormData({...formData, travelStyle: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your travel style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="economy">Economy - Budget-friendly</SelectItem>
                  <SelectItem value="mid-range">Mid-range - Balanced comfort</SelectItem>
                  <SelectItem value="premium">Premium - Luxury experience</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Additional Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Any specific preferences, dietary restrictions, or special requirements..."
                className="min-h-[80px]"
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-orange-500 to-blue-600 hover:from-orange-600 hover:to-blue-700"
              size="lg"
            >
              <Clock className="mr-2 h-4 w-4" />
              Start Trip Planning
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Budget Tips */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg">💡 Budget Planning Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2">Economy (₹2,000-5,000/day)</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• Budget hotels/hostels</li>
                <li>• Local transport</li>
                <li>• Street food & local eateries</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Mid-range (₹5,000-12,000/day)</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• 3-4 star hotels</li>
                <li>• Mix of transport options</li>
                <li>• Restaurant dining</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
