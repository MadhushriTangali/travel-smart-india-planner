
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calculator, ArrowRight } from 'lucide-react';
import { TripData } from '@/components/TripPlanningForm';
import { BudgetOverview } from './BudgetOverview';
import { CostBreakdown } from './CostBreakdown';
import { MoneySavingTips } from './MoneySavingTips';
import { CostEstimatorSkeleton } from './CostEstimatorSkeleton';

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
      
      // Calculate accommodation cost (60% of budget)
      const accommodationPerDay = Math.floor((tripData.budget * 0.60) / days) * baseMultiplier;
      const accommodation = accommodationPerDay * days;
      
      // Calculate transport cost based on travel style and distance
      // Base transport cost calculation more realistic
      let transportCost = 0;
      if (tripData.travel_style === 'economy') {
        transportCost = Math.min(tripData.budget * 0.15, 8000); // Max 15% or ₹8000
      } else if (tripData.travel_style === 'premium') {
        transportCost = Math.min(tripData.budget * 0.25, 15000); // Max 25% or ₹15000
      } else {
        transportCost = Math.min(tripData.budget * 0.20, 12000); // Max 20% or ₹12000
      }
      
      const total = Math.floor(accommodation + transportCost);
      
      return {
        accommodation: Math.floor(accommodation),
        transport: Math.floor(transportCost),
        attractions: 0,
        food: 0,
        miscellaneous: 0,
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
    if (!costBreakdown) return { status: 'calculating', message: 'Calculating...', color: 'text-gray-600' };
    
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
    return <CostEstimatorSkeleton />;
  }

  if (!costBreakdown) return null;

  const budgetStatus = getBudgetStatus();
  const costItems = [
    { label: 'Accommodation', amount: costBreakdown.accommodation, icon: '🏨' },
    { label: 'Transport', amount: costBreakdown.transport, icon: '🚂' }
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
        <BudgetOverview 
          userBudget={tripData.budget}
          estimatedCost={costBreakdown.total}
          budgetStatus={budgetStatus}
        />

        <CostBreakdown 
          costItems={costItems}
          totalCost={costBreakdown.total}
        />

        <MoneySavingTips />

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
