
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Calendar, IndianRupee, Users, Clock, Edit, Save, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

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

interface TripDetailModalProps {
  trip: Trip | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (updatedTrip: Trip) => void;
}

export const TripDetailModal = ({ trip, isOpen, onClose, onUpdate }: TripDetailModalProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTrip, setEditedTrip] = useState<Trip | null>(null);
  const [saving, setSaving] = useState(false);

  const handleEdit = () => {
    setEditedTrip(trip);
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!editedTrip) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from('trips')
        .update({
          trip_name: editedTrip.trip_name,
          source_location: editedTrip.source_location,
          destination: editedTrip.destination,
          budget: editedTrip.budget,
          duration: editedTrip.duration,
          travel_style: editedTrip.travel_style,
          notes: editedTrip.notes,
          total_cost: Math.floor(editedTrip.budget * 0.85)
        })
        .eq('id', editedTrip.id);

      if (error) throw error;

      onUpdate(editedTrip);
      setIsEditing(false);
      toast({
        title: "Trip Updated",
        description: "Your trip has been successfully updated.",
      });
    } catch (error) {
      console.error('Error updating trip:', error);
      toast({
        title: "Error",
        description: "Failed to update trip. Please try again.",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setEditedTrip(null);
    setIsEditing(false);
  };

  if (!trip) return null;

  const currentTrip = editedTrip || trip;
  const estimatedCost = Math.floor(currentTrip.budget * 0.85);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-orange-500" />
              {currentTrip.trip_name}
            </span>
            {!isEditing && (
              <Button variant="outline" onClick={handleEdit}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {isEditing ? (
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Trip Name</Label>
                  <Input
                    value={currentTrip.trip_name}
                    onChange={(e) => setEditedTrip({...currentTrip, trip_name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Budget (₹)</Label>
                  <Input
                    type="number"
                    value={currentTrip.budget}
                    onChange={(e) => setEditedTrip({...currentTrip, budget: parseInt(e.target.value) || 0})}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Duration</Label>
                  <Select value={currentTrip.duration || ''} onValueChange={(value) => setEditedTrip({...currentTrip, duration: value})}>
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
                <div className="space-y-2">
                  <Label>Travel Style</Label>
                  <Select value={currentTrip.travel_style || ''} onValueChange={(value) => setEditedTrip({...currentTrip, travel_style: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select travel style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="economy">Economy</SelectItem>
                      <SelectItem value="mid-range">Mid-range</SelectItem>
                      <SelectItem value="premium">Premium</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Notes</Label>
                <Textarea
                  value={currentTrip.notes || ''}
                  onChange={(e) => setEditedTrip({...currentTrip, notes: e.target.value})}
                  placeholder="Any specific preferences or requirements..."
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={handleSave} disabled={saving}>
                  {saving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
                <Button variant="outline" onClick={handleCancel}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {/* Trip Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Trip Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-blue-500" />
                    <span className="font-semibold">From:</span>
                    <span>{currentTrip.source_location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-blue-500" />
                    <span className="font-semibold">To:</span>
                    <span>{currentTrip.destination}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-purple-500" />
                    <span className="font-semibold">Duration:</span>
                    <span>{currentTrip.duration || 'Not specified'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-green-500" />
                    <span className="font-semibold">Style:</span>
                    {currentTrip.travel_style && (
                      <Badge variant="outline">{currentTrip.travel_style}</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-orange-500" />
                    <span className="font-semibold">Created:</span>
                    <span>{new Date(currentTrip.created_at).toLocaleDateString()}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Budget Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Budget Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Total Budget:</span>
                    <div className="flex items-center gap-1">
                      <IndianRupee className="h-4 w-4 text-green-600" />
                      <span className="font-bold text-lg">{currentTrip.budget.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Estimated Cost:</span>
                    <div className="flex items-center gap-1">
                      <IndianRupee className="h-4 w-4 text-orange-600" />
                      <span className="font-bold text-lg">{estimatedCost.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Remaining:</span>
                      <div className="flex items-center gap-1">
                        <IndianRupee className="h-4 w-4 text-blue-600" />
                        <span className="font-bold text-lg text-green-600">
                          {(currentTrip.budget - estimatedCost).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Notes Section */}
          {currentTrip.notes && !isEditing && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{currentTrip.notes}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
