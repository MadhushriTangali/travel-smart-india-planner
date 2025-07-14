import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IndianRupee } from 'lucide-react';

interface CostItem {
  label: string;
  amount: number;
  icon: string;
}

interface CostBreakdownProps {
  costItems: CostItem[];
  totalCost: number;
}

export const CostBreakdown = ({ costItems, totalCost }: CostBreakdownProps) => {
  return (
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
                  {totalCost.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};