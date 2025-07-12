
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, IndianRupee, Trash2, Eye } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Navigation } from '@/components/Navigation';

interface Trip {
  id: string;
  trip_name: string;
  source_location: string;
  destination: string;
  budget: number;
  duration: string;
  travel_style: string;
  notes: string;
  total_cost: number;
  created_at: string;
}

const MyTrips = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserTrips();
  }, []);

  const fetchUserTrips = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please log in to view your trips.",
          variant: "destructive"
        });
        return;
      }

      const { data, error } = await supabase
        .from('trips')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setTrips(data || []);
    } catch (error) {
      console.error('Error fetching trips:', error);
      toast({
        title: "Error",
        description: "Failed to fetch your trips. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteTrip = async (tripId: string) => {
    try {
      const { error } = await supabase
        .from('trips')
        .delete()
        .eq('id', tripId);

      if (error) throw error;

      setTrips(trips.filter(trip => trip.id !== tripId));
      toast({
        title: "Trip Deleted",
        description: "Your trip has been successfully deleted.",
      });
    } catch (error) {
      console.error('Error deleting trip:', error);
      toast({
        title: "Error",
        description: "Failed to delete trip. Please try again.",
        variant: "destructive"
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
              <p className="text-lg text-gray-600">Loading your trips...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">My Trips</h1>
            <p className="text-xl text-gray-600">
              Your personalized travel adventures across incredible India
            </p>
          </div>

          {trips.length === 0 ? (
            <Card className="text-center py-16">
              <CardContent>
                <MapPin className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                  You haven't planned any trips yet. Start exploring now!
                </h3>
                <p className="text-gray-500 mb-6">
                  Discover amazing destinations across India and create your perfect travel plan.
                </p>
                <Button 
                  onClick={() => window.location.href = '/'}
                  className="bg-gradient-to-r from-orange-500 to-blue-600 hover:from-orange-600 hover:to-blue-700 text-white px-8 py-3 text-lg"
                >
                  Plan Your First Trip
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trips.map((trip) => (
                <Card key={trip.id} className="hover:shadow-xl transition-shadow duration-300 border-l-4 border-l-orange-500">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-orange-500" />
                      {trip.trip_name}
                    </CardTitle>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      {formatDate(trip.created_at)}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-600">From:</span>
                        <span className="text-sm font-semibold">{trip.source_location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-600">To:</span>
                        <span className="text-sm font-semibold">{trip.destination}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-600">Duration:</span>
                        <span className="text-sm font-semibold">{trip.duration || 'N/A'}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t">
                      <div className="flex items-center gap-1">
                        <IndianRupee className="h-4 w-4 text-green-600" />
                        <span className="font-semibold text-green-600">₹{trip.budget.toLocaleString()}</span>
                      </div>
                      {trip.travel_style && (
                        <Badge variant="outline" className="text-xs">
                          {trip.travel_style}
                        </Badge>
                      )}
                    </div>

                    {trip.notes && (
                      <div className="pt-2 border-t">
                        <p className="text-xs text-gray-600 line-clamp-2">{trip.notes}</p>
                      </div>
                    )}

                    <div className="flex gap-2 pt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 text-red-600 border-red-200 hover:bg-red-50"
                        onClick={() => deleteTrip(trip.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyTrips;
