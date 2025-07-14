import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle } from 'lucide-react';

interface BudgetOverviewProps {
  userBudget: number;
  estimatedCost: number;
  budgetStatus: {
    status: string;
    message: string;
    color: string;
  };
}

export const BudgetOverview = ({ userBudget, estimatedCost, budgetStatus }: BudgetOverviewProps) => {
  return (
    <Card className="border-2 border-blue-200">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold">Your Budget</h3>
            <p className="text-2xl font-bold text-blue-600">₹{userBudget.toLocaleString()}</p>
          </div>
          <div className="text-right">
            <h3 className="text-lg font-semibold">Estimated Cost</h3>
            <p className="text-2xl font-bold text-gray-800">₹{estimatedCost.toLocaleString()}</p>
          </div>
        </div>
        
        <Progress 
          value={Math.min((estimatedCost / userBudget) * 100, 100)} 
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
  );
};