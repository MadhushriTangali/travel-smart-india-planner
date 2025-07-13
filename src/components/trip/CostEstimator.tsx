
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { IndianRupee, Calculator, ArrowRight, AlertTriangle } from 'lucide-react';
import { TripData } from '@/components/TripPlanningForm';

interface CostBreakdown {
  accommodation: number;
  transport: number;
  attractions: number;
  food: number;
  miscellaneous: number;
  total: number;
}

interface CostEstimatorProps {
  tripData: TripData;
  onNext: () => void;
}

export const CostEstimator = ({ tripData, onNext }: CostEstimatorProps) => {
  const [costBreakdown, setCostBreakdown] = useState<CostBreakdown | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Calculate estimated costs based on trip data
    const calculateCosts = () => {
      const days = getDays(tripData.duration);
      const baseMultiplier = getStyleMultiplier(tripData.travel_style);
      
      // More accurate cost calculations
      const accommodationPerDay = Math.floor((tripData.budget * 0.40) / days) * baseMultiplier;
      const accommodation = accommodationPerDay * days;
      
      const transport = Math.floor(tripData.budget * 0.25) * baseMultiplier;
      const attractions = Math.floor(tripData.budget * 0.15) * baseMultiplier;
      
      const foodPerDay = Math.floor((tripData.budget * 0.15) / days) * baseMultiplier;
      const food = foodPerDay * days;
      
      const miscellaneous = Math.floor(tripData.budget * 0.05) * baseMultiplier;
      
      const total = Math.floor(accommodation + transport + attractions + food + miscellaneous);
      
      return {
        accommodation: Math.floor(accommodation),
        transport: Math.floor(transport),
        attractions: Math.floor(attractions),
        food: Math.floor(food),
        miscellaneous: Math.floor(miscellaneous),
        total
      };
    };

    setTimeout(() => {
      setCostBreakdown(calculateCosts());
      setLoading(false);
    }, 800);
  }, [tripData]);

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

  const getBudgetStatus = () => {
    if (!costBreakdown) return { status: 'calculating', message: 'Calculating...' };
    
    if (costBreakdown.total <= tripData.budget) {
      return { 
        status: 'good', 
        message: 'Your budget is sufficient for this trip!',
        color: 'text-green-600'
      };
    } else if (costBreakdown.total <= tripData.budget * 1.2) {
      return { 
        status: 'warning', 
        message: 'Consider increasing your budget by 20% for a comfortable trip.',
        color: 'text-yellow-600'
      };
    } else {
      return { 
        status: 'exceed', 
        message: 'Your budget may be insufficient. Consider reducing some expenses.',
        color: 'text-red-600'
      };
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Calculating Trip Costs...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="bg-gray-200 h-6 rounded"></div>
            <div className="bg-gray-200 h-20 rounded"></div>
            <div className="bg-gray-200 h-40 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!costBreakdown) return null;

  const budgetStatus = getBudgetStatus();
  const costItems = [
    { label: 'Accommodation', amount: costBreakdown.accommodation, icon: '🏨' },
    { label: 'Transport', amount: costBreakdown.transport, icon: '🚂' },
    { label: 'Attractions', amount: costBreakdown.attractions, icon: '🎯' },
    { label: 'Food & Dining', amount: costBreakdown.food, icon: '🍽️' },
    { label: 'Miscellaneous', amount: costBreakdown.miscellaneous, icon: '💰' }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          Trip Cost Estimator
        </CardTitle>
        <p className="text-gray-600">
          Estimated costs for your {tripData.duration} trip to {tripData.destination}
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Budget Overview */}
        <Card className="border-2 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">Your Budget</h3>
                <p className="text-2xl font-bold text-blue-600">₹{tripData.budget.toLocaleString()}</p>
              </div>
              <div className="text-right">
                <h3 className="text-lg font-semibold">Estimated Cost</h3>
                <p className="text-2xl font-bold text-gray-800">₹{costBreakdown.total.toLocaleString()}</p>
              </div>
            </div>
            
            <Progress 
              value={Math.min((costBreakdown.total / tripData.budget) * 100, 100)} 
              className="mb-2"
            />
            
            <div className={`flex items-center gap-2 ${budgetStatus.color}`}>
              {budgetStatus.status === 'warning' || budgetStatus.status === 'exceed' ? (
                <AlertTriangle className="h-4 w-4" />
              ) : null}
              <p className="text-sm font-medium">{budgetStatus.message}</p>
            </div>
          </CardContent>
        </Card>

        {/* Cost Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Cost Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {costItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <IndianRupee className="h-4 w-4 text-gray-500" />
                    <span className="font-semibold">{item.amount.toLocaleString()}</span>
                  </div>
                </div>
              ))}
              
              <div className="border-t pt-4">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <span className="font-bold text-lg">Total Estimated Cost</span>
                  <div className="flex items-center gap-1">
                    <IndianRupee className="h-5 w-5 text-blue-600" />
                    <span className="font-bold text-xl text-blue-600">
                      {costBreakdown.total.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Money-Saving Tips */}
        <Card className="bg-green-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-lg text-green-800">💡 Money-Saving Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• Book accommodations in advance for better rates</li>
              <li>• Try local street food instead of hotel restaurants</li>
              <li>• Use public transport or shared rides</li>
              <li>• Look for combo tickets for multiple attractions</li>
              <li>• Travel during off-season for lower prices</li>
            </ul>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button onClick={onNext} className="bg-gradient-to-r from-orange-500 to-blue-600">
            Next: Trip Summary
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
