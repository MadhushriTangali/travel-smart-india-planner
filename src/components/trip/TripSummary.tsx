
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, IndianRupee, Users, Clock, Save, Share2 } from 'lucide-react';
import { TripData } from '@/components/TripPlanningForm';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface TripSummaryProps {
  tripData: TripData;
  onSave: () => void;
}

export const TripSummary = ({ tripData, onSave }: TripSummaryProps) => {
  const [saving, setSaving] = useState(false);

  const handleSaveTrip = async () => {
    setSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please log in to save your trip.",
          variant: "destructive"
        });
        return;
      }

      const tripName = `${tripData.source_location} to ${tripData.destination}`;
      
      // Calculate consistent estimated cost
      const days = getDays(tripData.duration);
      const baseMultiplier = getStyleMultiplier(tripData.travel_style);
      
      const accommodationPerDay = Math.floor((tripData.budget * 0.40) / days) * baseMultiplier;
      const accommodation = accommodationPerDay * days;
      const transport = Math.floor(tripData.budget * 0.25) * baseMultiplier;
      const attractions = Math.floor(tripData.budget * 0.15) * baseMultiplier;
      const foodPerDay = Math.floor((tripData.budget * 0.15) / days) * baseMultiplier;
      const food = foodPerDay * days;
      const miscellaneous = Math.floor(tripData.budget * 0.05) * baseMultiplier;
      
      const totalCost = Math.floor(accommodation + transport + attractions + food + miscellaneous);
      
      const { error } = await supabase
        .from('trips')
        .insert({
          user_id: user.id,
          trip_name: tripName,
          source_location: tripData.source_location,
          destination: tripData.destination,
          budget: tripData.budget,
          duration: tripData.duration,
          travel_style: tripData.travel_style,
          notes: tripData.notes,
          trip_data: tripData as any,
          total_cost: totalCost
        });

      if (error) {
        throw error;
      }

      toast({
        title: "Trip Saved Successfully!",
        description: "Your trip has been saved to My Trips.",
      });
      
      onSave();
    } catch (error) {
      console.error('Error saving trip:', error);
      toast({
        title: "Error Saving Trip",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const getDays = (duration: string): number => {
    if (duration.includes('1-2 days')) return 2;
    if (duration.includes('3-4 days')) return 4;
    if (duration.includes('5-7 days')) return 6;
    if (duration.includes('1-2 weeks')) return 10;
    if (duration.includes('More than 2 weeks')) return 15;
    return 3; // default
  };

  const getStyleMultiplier = (style: string): number => {
    switch (style) {
      case 'economy': return 0.8;
      case 'premium': return 1.3;
      case 'mid-range':
      default: return 1.0;
    }
  };

  // Calculate consistent estimated cost using same logic as CostEstimator
  const days = getDays(tripData.duration);
  const baseMultiplier = getStyleMultiplier(tripData.travel_style);
  
  const accommodationPerDay = Math.floor((tripData.budget * 0.40) / days) * baseMultiplier;
  const accommodation = accommodationPerDay * days;
  const transport = Math.floor(tripData.budget * 0.25) * baseMultiplier;
  const attractions = Math.floor(tripData.budget * 0.15) * baseMultiplier;
  const foodPerDay = Math.floor((tripData.budget * 0.15) / days) * baseMultiplier;
  const food = foodPerDay * days;
  const miscellaneous = Math.floor(tripData.budget * 0.05) * baseMultiplier;
  
  const estimatedCost = Math.floor(accommodation + transport + attractions + food + miscellaneous);
  const remainingBudget = tripData.budget - estimatedCost;

  return (
    <Card className="shadow-xl border-t-4 border-t-green-500">
      <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50">
        <CardTitle className="flex items-center gap-2 text-2xl font-bold text-gray-800">
          <MapPin className="h-6 w-6 text-green-500" />
          Trip Summary: {tripData.source_location} → {tripData.destination}
        </CardTitle>
        <p className="text-gray-600 font-semibold">
          Your personalized travel plan is ready!
        </p>
      </CardHeader>
      
      <CardContent className="p-6 space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Trip Overview */}
          <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-800">Trip Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-blue-500" />
                <span className="font-semibold">From:</span>
                <span className="text-gray-700">{tripData.source_location}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-blue-500" />
                <span className="font-semibold">To:</span>
                <span className="text-gray-700">{tripData.destination}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-purple-500" />
                <span className="font-semibold">Duration:</span>
                <span className="text-gray-700">{tripData.duration || 'Not specified'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-green-500" />
                <span className="font-semibold">Style:</span>
                <Badge className="bg-purple-500 text-white">
                  {tripData.travel_style || 'Not specified'}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Budget Breakdown */}
          <Card className="bg-gradient-to-br from-green-50 to-yellow-50 border-2 border-green-200">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-800">Budget Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-700">Total Budget:</span>
                <span className="font-bold text-lg text-gray-800">₹{tripData.budget.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-700">Estimated Cost:</span>
                <span className="font-bold text-lg text-orange-600">₹{estimatedCost.toLocaleString()}</span>
              </div>
              <div className="border-t-2 border-green-200 pt-2">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-700">Remaining:</span>
                  <span className="font-bold text-lg text-green-600">₹{remainingBudget.toLocaleString()}</span>
                </div>
              </div>
              <div className="mt-3">
                <div className="bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((estimatedCost / tripData.budget) * 100, 100)}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  {((estimatedCost / tripData.budget) * 100).toFixed(1)}% of budget utilized
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Notes */}
        {tripData.notes && (
          <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-800">Your Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 font-medium italic">"{tripData.notes}"</p>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t-2 border-gray-200">
          <Button
            onClick={handleSaveTrip}
            disabled={saving}
            className="flex-1 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-bold py-3 text-lg"
          >
            {saving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Saving Trip...
              </>
            ) : (
              <>
                <Save className="h-5 w-5 mr-2" />
                Save Trip
              </>
            )}
          </Button>
          
          <Button
            variant="outline"
            className="border-2 border-blue-200 text-blue-600 hover:bg-blue-50 font-semibold py-3"
            onClick={() => {
              const shareText = `Check out my trip plan: ${tripData.source_location} to ${tripData.destination} with a budget of ₹${tripData.budget.toLocaleString()}!`;
              if (navigator.share) {
                navigator.share({ text: shareText });
              } else {
                navigator.clipboard.writeText(shareText);
                toast({
                  title: "Copied to clipboard!",
                  description: "Trip details copied to clipboard.",
                });
              }
            }}
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share Trip
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
