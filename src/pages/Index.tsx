
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Plane, Hotel, Utensils, Calendar, Users, Star, Shield } from 'lucide-react';
import { TripPlanningForm } from '@/components/TripPlanningForm';
import { AuthModal } from '@/components/AuthModal';
import { Navigation } from '@/components/Navigation';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';

const Index = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [showTripForm, setShowTripForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state change:', event, session);
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const features = [
    {
      icon: Hotel,
      title: 'Smart Hotel Booking',
      description: 'Find 4+ star hotels within your budget with real-time availability',
      gradient: 'from-blue-500 to-purple-600'
    },
    {
      icon: MapPin,
      title: 'Tourist Attractions',
      description: 'Discover top attractions with entry fees and opening hours',
      gradient: 'from-green-500 to-teal-600'
    },
    {
      icon: Utensils,
      title: 'Famous Local Dishes',
      description: 'Explore authentic cuisine and street food with prices',
      gradient: 'from-orange-500 to-red-600'
    },
    {
      icon: Users,
      title: 'Cultural Insights',
      description: 'Learn about local culture, festivals, and traditions',
      gradient: 'from-purple-500 to-pink-600'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <Plane className="h-16 w-16 mx-auto mb-6 text-orange-500 animate-bounce" />
          <p className="text-2xl font-bold text-gray-700">Loading TravelSmart...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
          {/* Hero Section */}
          <div className="relative overflow-hidden bg-gradient-to-r from-orange-500 to-blue-600 text-white">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative container mx-auto px-4 py-24">
              <div className="text-center max-w-4xl mx-auto">
                <div className="flex items-center justify-center mb-8">
                  <Plane className="h-16 w-16 mr-4 text-orange-200 animate-pulse" />
                  <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">TravelSmart</h1>
                </div>
                <p className="text-2xl md:text-3xl mb-8 text-orange-100 font-semibold">
                  Your AI-powered companion for exploring incredible India 🇮🇳
                </p>
                <p className="text-xl mb-12 text-white/90 max-w-3xl mx-auto font-medium leading-relaxed">
                  Plan personalized trips, discover hidden gems, experience local culture, 
                  and create unforgettable memories across India
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Button 
                    size="lg" 
                    className="bg-white text-orange-600 hover:bg-orange-50 text-xl font-bold px-12 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                    onClick={() => setShowAuthModal(true)}
                  >
                    🚀 Start Your Journey
                  </Button>
                  <Button 
                    size="lg" 
                    className="border-2 border-white text-white hover:bg-white/10 text-xl font-bold px-12 py-4 rounded-full backdrop-blur-sm"
                    onClick={() => setShowAuthModal(true)}
                  >
                    Already a Member? Sign In
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="container mx-auto px-4 py-20">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6">
                Everything You Need for Perfect Trips ✨
              </h2>
              <p className="text-2xl text-gray-600 max-w-3xl mx-auto font-semibold">
                From budget-friendly stays to cultural experiences, we've got you covered
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="text-center hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-gray-100">
                  <CardContent className="p-8">
                    <div className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r ${feature.gradient} flex items-center justify-center`}>
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-gray-800">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 font-medium">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 py-20">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-3 gap-12 text-center">
                <div className="transform hover:scale-105 transition-all duration-300">
                  <div className="text-5xl font-extrabold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-4">50+</div>
                  <p className="text-xl text-gray-700 font-semibold">Cities Covered</p>
                </div>
                <div className="transform hover:scale-105 transition-all duration-300">
                  <div className="text-5xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-4">1000+</div>
                  <p className="text-xl text-gray-700 font-semibold">Hotels & Stays</p>
                </div>
                <div className="transform hover:scale-105 transition-all duration-300">
                  <div className="text-5xl font-extrabold bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent mb-4">500+</div>
                  <p className="text-xl text-gray-700 font-semibold">Tourist Attractions</p>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Section */}
          <div className="container mx-auto px-4 py-20">
            <div className="text-center mb-16">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center">
                <Shield className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-4xl font-extrabold text-gray-800 mb-6">
                Trusted by Indian Travelers 🇮🇳
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto font-semibold">
                Secure authentication, real-time data, and personalized recommendations
                tailored for Indian domestic travel
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: Star, title: 'Real-time Pricing', desc: 'Live hotel rates and transport availability', gradient: 'from-yellow-500 to-orange-500' },
                { icon: Calendar, title: 'Smart Planning', desc: 'AI-powered itinerary optimization', gradient: 'from-blue-500 to-purple-500' },
                { icon: Shield, title: 'Secure & Safe', desc: 'Your data protected with enterprise security', gradient: 'from-green-500 to-teal-500' }
              ].map((item, index) => (
                <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <CardContent className="p-8">
                    <div className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r ${item.gradient} flex items-center justify-center`}>
                      <item.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-bold text-xl mb-3 text-gray-800">{item.title}</h3>
                    <p className="text-gray-600 font-medium">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-orange-500 to-blue-600 text-white py-20">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
                Ready to Explore India? 🌟
              </h2>
              <p className="text-2xl mb-10 text-orange-100 font-semibold">
                Join thousands of travelers discovering incredible destinations
              </p>
              <Button 
                size="lg" 
                className="bg-white text-orange-600 hover:bg-orange-50 text-xl font-extrabold px-12 py-4 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                onClick={() => setShowAuthModal(true)}
              >
                🎯 Get Started Now
              </Button>
            </div>
          </div>
        </div>

        <AuthModal 
          open={showAuthModal} 
          onClose={() => setShowAuthModal(false)}
          onAuthenticated={() => {
            setShowAuthModal(false);
          }}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {!showTripForm ? (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6">
                Welcome to TravelSmart! 🇮🇳✨
              </h1>
              <p className="text-2xl text-gray-600 mb-10 font-semibold">
                Plan your perfect domestic trip across incredible India
              </p>
              <Button 
                size="lg" 
                onClick={() => setShowTripForm(true)}
                className="bg-gradient-to-r from-orange-500 to-blue-600 hover:from-orange-600 hover:to-blue-700 text-xl font-bold px-12 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                🚀 Plan New Trip
              </Button>
            </div>

            {/* Recent Activity or Tips */}
            <div className="grid md:grid-cols-2 gap-8 mt-16">
              <Card className="hover:shadow-xl transition-all duration-300 border-2 border-orange-100">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                    <MapPin className="h-6 w-6 text-orange-500" />
                    Popular Destinations 🏖️
                  </h3>
                  <div className="space-y-4">
                    {[
                      { name: 'Goa', desc: 'Beach Paradise', emoji: '🏖️' },
                      { name: 'Kerala', desc: "God's Own Country", emoji: '🌴' },
                      { name: 'Rajasthan', desc: 'Royal Heritage', emoji: '🏰' }
                    ].map((dest, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-gradient-to-r from-orange-50 to-blue-50 rounded-lg">
                        <span className="text-2xl">{dest.emoji}</span>
                        <div>
                          <span className="font-bold text-gray-800">{dest.name}</span>
                          <span className="text-gray-600 ml-2">- {dest.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl transition-all duration-300 border-2 border-blue-100">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                    <Star className="h-6 w-6 text-blue-500" />
                    Travel Tips 💡
                  </h3>
                  <div className="space-y-4 text-gray-700 font-medium">
                    {[
                      '🗓️ Plan 2-3 months ahead for better deals',
                      '🌤️ Check weather conditions before booking',
                      '💰 Keep 20% buffer in your budget'
                    ].map((tip, index) => (
                      <p key={index} className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                        {tip}
                      </p>
                    ))}
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
