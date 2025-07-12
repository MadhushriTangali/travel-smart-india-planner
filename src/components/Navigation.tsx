
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { 
  Menu, 
  Plane, 
  BookOpen, 
  LogOut
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { icon: BookOpen, label: 'My Trips', path: '/my-trips' },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  const handleHome = () => {
    navigate('/');
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
        navigate('/');
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
    <nav className="bg-white shadow-lg border-b-2 border-orange-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={handleHome}>
            <Plane className="h-8 w-8 text-orange-500" />
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent">
              TravelSmart
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {menuItems.map((item) => (
              <Button
                key={item.path}
                variant="ghost"
                className="flex items-center space-x-2 text-gray-700 hover:text-orange-500 hover:bg-orange-50 font-semibold"
                onClick={() => handleNavigation(item.path)}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Button>
            ))}
            
            <Button
              className="ml-4 bg-gradient-to-r from-orange-500 to-blue-600 hover:from-orange-600 hover:to-blue-700 text-white font-semibold px-6"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
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
                    className="flex items-center justify-start space-x-3 w-full text-left font-semibold"
                    onClick={() => handleNavigation(item.path)}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Button>
                ))}
                
                <div className="pt-4 border-t">
                  <Button
                    className="flex items-center justify-start space-x-3 w-full bg-gradient-to-r from-orange-500 to-blue-600 hover:from-orange-600 hover:to-blue-700 text-white font-semibold"
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
