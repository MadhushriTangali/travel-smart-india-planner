
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { 
  Menu, 
  Plane, 
  Hotel, 
  MapPin, 
  Utensils, 
  Users, 
  BookOpen, 
  Calculator,
  LogOut
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { icon: Hotel, label: 'Hotels', path: '/hotels' },
    { icon: MapPin, label: 'Attractions', path: '/attractions' },
    { icon: Utensils, label: 'Famous Dishes', path: '/dishes' },
    { icon: Users, label: 'Culture', path: '/culture' },
    { icon: Calculator, label: 'Cost Estimator', path: '/cost-estimator' },
    { icon: BookOpen, label: 'My Trips', path: '/my-trips' },
  ];

  const handleNavigation = (path: string) => {
    // For now, we'll show a toast since routes aren't implemented yet
    toast({
      title: "Coming Soon",
      description: `${path.replace('/', '').replace('-', ' ')} feature will be available soon!`,
    });
    setIsOpen(false);
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast({
          title: "Logout Failed",
          description: error.message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Logged Out",
          description: "You have been successfully logged out.",
        });
        // The auth state change will automatically redirect to login
      }
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: "Logout Failed",
        description: "An unexpected error occurred.",
        variant: "destructive"
      });
    }
  };

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Plane className="h-8 w-8 text-orange-500" />
            <span className="text-xl font-bold text-gray-800">TravelSmart</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-1">
            {menuItems.map((item) => (
              <Button
                key={item.path}
                variant="ghost"
                className="flex items-center space-x-2 text-gray-600 hover:text-orange-500"
                onClick={() => handleNavigation(item.path)}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Button>
            ))}
          </div>

          {/* Desktop Logout */}
          <div className="hidden md:flex">
            <Button
              variant="outline"
              className="flex items-center space-x-2"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <div className="flex flex-col space-y-4 mt-6">
                {menuItems.map((item) => (
                  <Button
                    key={item.path}
                    variant="ghost"
                    className="flex items-center justify-start space-x-3 w-full text-left"
                    onClick={() => handleNavigation(item.path)}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Button>
                ))}
                
                <div className="pt-4 border-t">
                  <Button
                    variant="outline"
                    className="flex items-center justify-start space-x-3 w-full"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};
