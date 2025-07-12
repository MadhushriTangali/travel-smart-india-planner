
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Plane, Hotel, Utensils, Calendar, Users, Star, Shield } from 'lucide-react';
import { TripPlanningForm } from '@/components/TripPlanningForm';
import { AuthModal } from '@/components/AuthModal';
import { Navigation } from '@/components/Navigation';

const Index = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showTripForm, setShowTripForm] = useState(false);

  const features = [
    {
      icon: Hotel,
      title: 'Smart Hotel Booking',
      description: 'Find 4+ star hotels within your budget with real-time availability'
    },
    {
      icon: MapPin,
      title: 'Tourist Attractions',
      description: 'Discover top attractions with entry fees and opening hours'
    },
    {
      icon: Utensils,
      title: 'Famous Local Dishes',
      description: 'Explore authentic cuisine and street food with prices'
    },
    {
      icon: Users,
      title: 'Cultural Insights',
      description: 'Learn about local culture, festivals, and traditions'
    }
  ];

  if (!isAuthenticated) {
    return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
          {/* Hero Section */}
          <div className="relative overflow-hidden bg-gradient-to-r from-orange-500 to-blue-600 text-white">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative container mx-auto px-4 py-20">
              <div className="text-center max-w-4xl mx-auto">
                <div className="flex items-center justify-center mb-6">
                  <Plane className="h-12 w-12 mr-3 text-orange-200" />
                  <h1 className="text-4xl md:text-6xl font-bold">TravelSmart</h1>
                </div>
                <p className="text-xl md:text-2xl mb-8 text-orange-100">
                  Your AI-powered companion for exploring incredible India
                </p>
                <p className="text-lg mb-10 text-white/90 max-w-2xl mx-auto">
                  Plan personalized trips, discover hidden gems, experience local culture, 
                  and create unforgettable memories across India
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg" 
                    className="bg-white text-orange-600 hover:bg-orange-50 text-lg px-8 py-4"
                    onClick={() => setShowAuthModal(true)}
                  >
                    Start Your Journey
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-white text-white hover:bg-white/10 text-lg px-8 py-4"
                    onClick={() => setShowAuthModal(true)}
                  >
                    Sign In
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="container mx-auto px-4 py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Everything You Need for Perfect Trips
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                From budget-friendly stays to cultural experiences, we've got you covered
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <feature.icon className="h-12 w-12 mx-auto mb-4 text-orange-500" />
                    <h3 className="text-xl font-semibold mb-2 text-gray-800">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-gray-50 py-16">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-4xl font-bold text-orange-500 mb-2">50+</div>
                  <p className="text-gray-600">Cities Covered</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-blue-500 mb-2">1000+</div>
                  <p className="text-gray-600">Hotels & Stays</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-green-500 mb-2">500+</div>
                  <p className="text-gray-600">Tourist Attractions</p>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Section */}
          <div className="container mx-auto px-4 py-16">
            <div className="text-center mb-12">
              <Shield className="h-16 w-16 mx-auto mb-4 text-green-500" />
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Trusted by Indian Travelers
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Secure authentication, real-time data, and personalized recommendations
                tailored for Indian domestic travel
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="text-center">
                <CardContent className="p-6">
                  <Star className="h-8 w-8 mx-auto mb-3 text-yellow-500" />
                  <h3 className="font-semibold mb-2">Real-time Pricing</h3>
                  <p className="text-gray-600 text-sm">Live hotel rates and transport availability</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <Calendar className="h-8 w-8 mx-auto mb-3 text-blue-500" />
                  <h3 className="font-semibold mb-2">Smart Planning</h3>
                  <p className="text-gray-600 text-sm">AI-powered itinerary optimization</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <Shield className="h-8 w-8 mx-auto mb-3 text-green-500" />
                  <h3 className="font-semibold mb-2">Secure & Safe</h3>
                  <p className="text-gray-600 text-sm">Your data protected with enterprise security</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-orange-500 to-blue-600 text-white py-16">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Explore India?
              </h2>
              <p className="text-xl mb-8 text-orange-100">
                Join thousands of travelers discovering incredible destinations
              </p>
              <Button 
                size="lg" 
                className="bg-white text-orange-600 hover:bg-orange-50 text-lg px-8 py-4"
                onClick={() => setShowAuthModal(true)}
              >
                Get Started Now
              </Button>
            </div>
          </div>
        </div>

        <AuthModal 
          open={showAuthModal} 
          onClose={() => setShowAuthModal(false)}
          onAuthenticated={() => {
            setIsAuthenticated(true);
            setShowAuthModal(false);
          }}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {!showTripForm ? (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Welcome to TravelSmart! 🇮🇳
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Plan your perfect domestic trip across incredible India
              </p>
              <Button 
                size="lg" 
                onClick={() => setShowTripForm(true)}
                className="bg-gradient-to-r from-orange-500 to-blue-600 hover:from-orange-600 hover:to-blue-700"
              >
                Plan New Trip
              </Button>
            </div>

            {/* Recent Activity or Tips */}
            <div className="grid md:grid-cols-2 gap-6 mt-12">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">
                    Popular Destinations
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-orange-500" />
                      <span>Goa - Beach Paradise</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-orange-500" />
                      <span>Kerala - God's Own Country</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-orange-500" />
                      <span>Rajasthan - Royal Heritage</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">
                    Travel Tips
                  </h3>
                  <div className="space-y-2 text-gray-600">
                    <p>• Plan 2-3 months ahead for better deals</p>
                    <p>• Check weather conditions before booking</p>
                    <p>• Keep 20% buffer in your budget</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <TripPlanningForm onBack={() => setShowTripForm(false)} />
        )}
      </div>
    </div>
  );
};

export default Index;
