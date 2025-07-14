import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const MoneySavingTips = () => {
  return (
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
  );
};