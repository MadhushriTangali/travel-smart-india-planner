import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const CostEstimatorSkeleton = () => {
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
};