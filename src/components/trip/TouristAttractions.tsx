import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, IndianRupee, ArrowRight, Star } from 'lucide-react';
import { TripData } from '@/components/TripPlanningForm';

interface Attraction {
  id: string;
  name: string;
  type: string;
  entry_fee: string;
  timings: string;
  rating: number;
  description: string;
  duration: string;
}

interface TouristAttractionsProps {
  tripData: TripData;
  onNext: () => void;
}

export const TouristAttractions = ({ tripData, onNext }: TouristAttractionsProps) => {
  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAttractions, setSelectedAttractions] = useState<Attraction[]>([]);
  const [visibleCount, setVisibleCount] = useState(6);

  const getAttractionsForCity = (city: string): Attraction[] => {
    const cityLower = city.toLowerCase();
    
    const attractionData: { [key: string]: Attraction[] } = {
      hyderabad: [
        { id: '1', name: 'Charminar', type: 'Historical Monument', entry_fee: '₹30 (Indians), ₹300 (Foreigners)', timings: '9:00 AM - 5:30 PM', rating: 4.3, description: 'Iconic 16th-century mosque and monument', duration: '1-2 hours' },
        { id: '2', name: 'Golconda Fort', type: 'Historical Fort', entry_fee: '₹30 (Indians), ₹300 (Foreigners)', timings: '9:00 AM - 5:30 PM', rating: 4.2, description: 'Medieval fort famous for acoustics', duration: '2-3 hours' },
        { id: '3', name: 'Ramoji Film City', type: 'Entertainment', entry_fee: '₹1,200 - ₹2,500', timings: '9:00 AM - 5:30 PM', rating: 4.4, description: 'World\'s largest film studio complex', duration: '6-8 hours' },
        { id: '4', name: 'Hussain Sagar Lake', type: 'Lake', entry_fee: 'Free (Boat rides extra)', timings: '24 hours', rating: 4.1, description: 'Heart-shaped lake with Buddha statue', duration: '1-2 hours' },
        { id: '5', name: 'Salar Jung Museum', type: 'Museum', entry_fee: '₹20 (Indians), ₹500 (Foreigners)', timings: '10:00 AM - 5:00 PM', rating: 4.3, description: 'One of India\'s largest museums', duration: '2-3 hours' },
        { id: '6', name: 'Birla Mandir', type: 'Temple', entry_fee: 'Free', timings: '7:00 AM - 12:00 PM, 3:00 PM - 9:00 PM', rating: 4.2, description: 'Beautiful white marble temple', duration: '1-2 hours' },
        { id: '7', name: 'Nehru Zoological Park', type: 'Zoo', entry_fee: '₹50 (Adults), ₹30 (Children)', timings: '8:30 AM - 5:00 PM', rating: 4.0, description: 'Large zoo with diverse wildlife', duration: '3-4 hours' },
        { id: '8', name: 'Chowmahalla Palace', type: 'Palace', entry_fee: '₹80 (Indians), ₹200 (Foreigners)', timings: '10:00 AM - 5:00 PM', rating: 4.4, description: 'Nizams\' official residence', duration: '2-3 hours' },
        { id: '9', name: 'Lumbini Park', type: 'Park', entry_fee: '₹30', timings: '9:00 AM - 9:00 PM', rating: 3.9, description: 'Lakeside park with musical fountain', duration: '1-2 hours' },
        { id: '10', name: 'Mecca Masjid', type: 'Mosque', entry_fee: 'Free', timings: '4:00 AM - 10:00 PM', rating: 4.1, description: 'One of India\'s largest mosques', duration: '1 hour' }
      ],
      chandigarh: [
        { id: '1', name: 'Rock Garden', type: 'Art Installation', entry_fee: '₹30', timings: '9:00 AM - 7:00 PM', rating: 4.3, description: 'Unique sculpture garden made from recycled materials', duration: '2-3 hours' },
        { id: '2', name: 'Sukhna Lake', type: 'Lake', entry_fee: 'Free', timings: '5:00 AM - 10:00 PM', rating: 4.2, description: 'Artificial lake perfect for boating and morning walks', duration: '1-2 hours' },
        { id: '3', name: 'Rose Garden', type: 'Garden', entry_fee: '₹10', timings: '6:00 AM - 10:00 PM', rating: 4.1, description: 'Asia\'s largest rose garden with 1600 varieties', duration: '1-2 hours' },
        { id: '4', name: 'Capitol Complex', type: 'Architecture', entry_fee: '₹30', timings: '9:00 AM - 4:30 PM', rating: 4.0, description: 'Le Corbusier designed government buildings', duration: '1-2 hours' },
        { id: '5', name: 'Pinjore Gardens', type: 'Mughal Garden', entry_fee: '₹25', timings: '8:00 AM - 8:00 PM', rating: 4.2, description: '17th-century Mughal garden with fountains', duration: '2-3 hours' },
        { id: '6', name: 'International Dolls Museum', type: 'Museum', entry_fee: '₹20', timings: '10:00 AM - 4:30 PM', rating: 3.8, description: 'Collection of dolls from around the world', duration: '1-2 hours' },
        { id: '7', name: 'Cactus Garden', type: 'Garden', entry_fee: '₹10', timings: '9:00 AM - 6:00 PM', rating: 4.0, description: 'Unique garden with 3500 species of cacti', duration: '1 hour' },
        { id: '8', name: 'Government Museum and Art Gallery', type: 'Museum', entry_fee: '₹10', timings: '10:00 AM - 4:30 PM', rating: 3.9, description: 'Rich collection of Gandhara sculptures', duration: '2 hours' },
        { id: '9', name: 'Timber Trail', type: 'Cable Car', entry_fee: '₹200-400', timings: '10:00 AM - 6:00 PM', rating: 4.1, description: 'Cable car ride through pine forests', duration: '2-3 hours' },
        { id: '10', name: 'ChattBir Zoo', type: 'Zoo', entry_fee: '₹25', timings: '9:00 AM - 5:00 PM', rating: 3.8, description: 'Large zoo with Bengal tigers and lions', duration: '2-3 hours' }
      ],
      indore: [
        { id: '1', name: 'Rajwada Palace', type: 'Historical Palace', entry_fee: '₹25', timings: '10:00 AM - 5:00 PM', rating: 4.1, description: '7-story palace of Holkar dynasty', duration: '1-2 hours' },
        { id: '2', name: 'Lal Bagh Palace', type: 'Palace Museum', entry_fee: '₹10', timings: '10:00 AM - 5:00 PM', rating: 4.2, description: 'Opulent palace with European architecture', duration: '2-3 hours' },
        { id: '3', name: 'Khajrana Ganesh Temple', type: 'Temple', entry_fee: 'Free', timings: '5:00 AM - 11:00 PM', rating: 4.3, description: 'Famous Ganesh temple with miraculous powers', duration: '1-2 hours' },
        { id: '4', name: 'Sarafa Bazaar', type: 'Street Food Market', entry_fee: 'Free', timings: '8:00 PM - 2:00 AM', rating: 4.4, description: 'Famous night food market', duration: '2-3 hours' },
        { id: '5', name: 'Central Museum', type: 'Museum', entry_fee: '₹10', timings: '10:00 AM - 5:00 PM', rating: 3.9, description: 'Rich collection of sculptures and artifacts', duration: '1-2 hours' },
        { id: '6', name: 'Annapurna Temple', type: 'Temple', entry_fee: 'Free', timings: '6:00 AM - 12:00 PM, 4:00 PM - 10:00 PM', rating: 4.2, description: 'Beautiful temple dedicated to Goddess Annapurna', duration: '1 hour' },
        { id: '7', name: 'Indore White Church', type: 'Church', entry_fee: 'Free', timings: '6:00 AM - 7:00 PM', rating: 4.0, description: 'Historic Catholic church', duration: '30 minutes' },
        { id: '8', name: 'Kanch Mandir', type: 'Jain Temple', entry_fee: 'Free', timings: '6:00 AM - 12:00 PM, 3:00 PM - 8:00 PM', rating: 4.1, description: 'Jain temple decorated with mirrors', duration: '1 hour' },
        { id: '9', name: 'Treasure Island Mall', type: 'Shopping Mall', entry_fee: 'Free', timings: '11:00 AM - 10:00 PM', rating: 3.8, description: 'Modern shopping and entertainment complex', duration: '2-3 hours' },
        { id: '10', name: 'Chappan Dukan', type: 'Food Street', entry_fee: 'Free', timings: '10:00 AM - 11:00 PM', rating: 4.3, description: 'Famous food street with 56 shops', duration: '1-2 hours' }
      ],
      nagpur: [
        { id: '1', name: 'Deekshabhoomi', type: 'Buddhist Monument', entry_fee: 'Free', timings: '6:00 AM - 10:00 PM', rating: 4.4, description: 'Sacred Buddhist monument and stupa', duration: '1-2 hours' },
        { id: '2', name: 'Sitabuldi Fort', type: 'Historical Fort', entry_fee: 'Free', timings: '6:00 AM - 6:00 PM', rating: 4.0, description: 'Historic hilltop fort with city views', duration: '1-2 hours' },
        { id: '3', name: 'Ambazari Lake', type: 'Lake', entry_fee: 'Free', timings: '24 hours', rating: 4.1, description: 'Largest lake in Nagpur with garden', duration: '1-2 hours' },
        { id: '4', name: 'Zero Mile Stone', type: 'Historical Marker', entry_fee: 'Free', timings: '24 hours', rating: 3.8, description: 'Geographical center of India marker', duration: '30 minutes' },
        { id: '5', name: 'Maharaj Bagh Zoo', type: 'Zoo', entry_fee: '₹20 (Adults), ₹10 (Children)', timings: '9:00 AM - 5:30 PM', rating: 3.9, description: 'Historic zoo with diverse wildlife', duration: '2-3 hours' },
        { id: '6', name: 'Ramtek Temple', type: 'Temple Complex', entry_fee: 'Free', timings: '5:00 AM - 9:00 PM', rating: 4.3, description: 'Ancient hilltop temple complex', duration: '2-3 hours' },
        { id: '7', name: 'Dragon Palace Temple', type: 'Buddhist Temple', entry_fee: 'Free', timings: '8:00 AM - 8:00 PM', rating: 4.0, description: 'Beautiful Buddhist temple with Japanese architecture', duration: '1 hour' },
        { id: '8', name: 'Futala Lake', type: 'Lake', entry_fee: 'Free', timings: '24 hours', rating: 4.2, description: 'Popular lake with walking track and food stalls', duration: '1-2 hours' },
        { id: '9', name: 'Raman Science Centre', type: 'Science Museum', entry_fee: '₹40', timings: '10:00 AM - 8:00 PM', rating: 4.1, description: 'Interactive science museum with planetarium', duration: '2-3 hours' },
        { id: '10', name: 'Swaminarayan Temple', type: 'Temple', entry_fee: 'Free', timings: '5:00 AM - 12:00 PM, 4:00 PM - 9:00 PM', rating: 4.2, description: 'Beautiful modern temple with intricate carvings', duration: '1 hour' }
      ],
      vadodara: [
        { id: '1', name: 'Laxmi Vilas Palace', type: 'Royal Palace', entry_fee: '₹300 (Indians), ₹500 (Foreigners)', timings: '9:30 AM - 5:00 PM', rating: 4.5, description: 'Magnificent palace of Gaekwad rulers', duration: '2-3 hours' },
        { id: '2', name: 'Sayaji Baug', type: 'Garden & Zoo', entry_fee: '₹15', timings: '8:00 AM - 8:00 PM', rating: 4.1, description: 'Large garden with zoo and planetarium', duration: '2-3 hours' },
        { id: '3', name: 'Baroda Museum', type: 'Museum', entry_fee: '₹15', timings: '10:30 AM - 5:30 PM', rating: 4.0, description: 'Art and archaeological museum', duration: '1-2 hours' },
        { id: '4', name: 'EME Temple', type: 'Modern Temple', entry_fee: 'Free', timings: '6:00 AM - 12:00 PM, 3:00 PM - 9:00 PM', rating: 4.2, description: 'Unique temple built by Indian Army', duration: '1 hour' },
        { id: '5', name: 'Kirti Mandir', type: 'Memorial', entry_fee: 'Free', timings: '8:00 AM - 12:00 PM, 3:00 PM - 7:00 PM', rating: 3.9, description: 'Memorial dedicated to Mahatma Gandhi\'s family', duration: '1 hour' },
        { id: '6', name: 'Sursagar Lake', type: 'Lake', entry_fee: 'Free', timings: '24 hours', rating: 4.0, description: 'Central lake with Shiva statue', duration: '1 hour' },
        { id: '7', name: 'Nazarbaug Palace', type: 'Palace', entry_fee: '₹20', timings: '9:00 AM - 6:00 PM', rating: 3.8, description: 'Former royal residence with beautiful architecture', duration: '1-2 hours' },
        { id: '8', name: 'Maharaja Fateh Singh Museum', type: 'Art Museum', entry_fee: '₹50', timings: '10:00 AM - 5:00 PM', rating: 4.1, description: 'Museum showcasing royal art collection', duration: '1-2 hours' },
        { id: '9', name: 'Ajwa Water Park', type: 'Water Park', entry_fee: '₹200-400', timings: '10:00 AM - 6:00 PM', rating: 4.0, description: 'Popular water park and resort', duration: '4-6 hours' },
        { id: '10', name: 'Champaner-Pavagadh', type: 'UNESCO Site', entry_fee: '₹25', timings: '6:00 AM - 6:00 PM', rating: 4.3, description: 'UNESCO World Heritage archaeological site', duration: '4-5 hours' }
      ],
      agra: [
        { id: '1', name: 'Taj Mahal', type: 'UNESCO World Heritage', entry_fee: '₹50 (Indians), ₹1300 (Foreigners)', timings: '6:00 AM - 6:30 PM', rating: 4.7, description: 'Iconic white marble mausoleum', duration: '2-3 hours' },
        { id: '2', name: 'Agra Fort', type: 'UNESCO Fort', entry_fee: '₹35 (Indians), ₹550 (Foreigners)', timings: '6:00 AM - 6:00 PM', rating: 4.4, description: 'Red sandstone Mughal fort', duration: '2-3 hours' },
        { id: '3', name: 'Fatehpur Sikri', type: 'UNESCO Ghost City', entry_fee: '₹35 (Indians), ₹550 (Foreigners)', timings: '6:00 AM - 6:00 PM', rating: 4.3, description: 'Abandoned Mughal capital city', duration: '3-4 hours' },
        { id: '4', name: 'Itimad-ud-Daulah Tomb', type: 'Mughal Tomb', entry_fee: '₹25 (Indians), ₹310 (Foreigners)', timings: '6:00 AM - 6:00 PM', rating: 4.2, description: 'Baby Taj - beautiful marble tomb', duration: '1-2 hours' },
        { id: '5', name: 'Mehtab Bagh', type: 'Mughal Garden', entry_fee: '₹25 (Indians), ₹300 (Foreigners)', timings: '6:00 AM - 6:30 PM', rating: 4.1, description: 'Garden with perfect Taj Mahal views', duration: '1-2 hours' },
        { id: '6', name: 'Akbar\'s Tomb, Sikandra', type: 'Mughal Tomb', entry_fee: '₹25 (Indians), ₹310 (Foreigners)', timings: '6:00 AM - 6:00 PM', rating: 4.0, description: 'Emperor Akbar\'s magnificent tomb', duration: '1-2 hours' },
        { id: '7', name: 'Jama Masjid', type: 'Mosque', entry_fee: 'Free', timings: '6:00 AM - 7:00 PM', rating: 4.1, description: 'Large mosque built by Shah Jahan\'s daughter', duration: '1 hour' },
        { id: '8', name: 'Chini Ka Rauza', type: 'Tomb', entry_fee: '₹15', timings: '6:00 AM - 6:00 PM', rating: 3.8, description: 'Tomb of Allama Afzal Khan with glazed tile work', duration: '1 hour' },
        { id: '9', name: 'Ram Bagh', type: 'Mughal Garden', entry_fee: '₹15', timings: '6:00 AM - 6:00 PM', rating: 3.9, description: 'First Mughal garden in India', duration: '1 hour' },
        { id: '10', name: 'Wildlife SOS Bear Sanctuary', type: 'Wildlife Sanctuary', entry_fee: '₹200', timings: '11:00 AM - 4:00 PM', rating: 4.2, description: 'Sanctuary for rescued dancing bears', duration: '2 hours' }
      ],
      varanasi: [
        { id: '1', name: 'Kashi Vishwanath Temple', type: 'Hindu Temple', entry_fee: 'Free', timings: '3:00 AM - 11:00 PM', rating: 4.6, description: 'Most sacred Shiva temple', duration: '1-2 hours' },
        { id: '2', name: 'Dashashwamedh Ghat', type: 'Sacred Ghat', entry_fee: 'Free', timings: '24 hours', rating: 4.5, description: 'Main ghat famous for evening aarti', duration: '2-3 hours' },
        { id: '3', name: 'Sarnath', type: 'Buddhist Site', entry_fee: '₹15 (Indians), ₹200 (Foreigners)', timings: '9:00 AM - 5:00 PM', rating: 4.4, description: 'Where Buddha gave his first sermon', duration: '2-3 hours' },
        { id: '4', name: 'Assi Ghat', type: 'Sacred Ghat', entry_fee: 'Free', timings: '24 hours', rating: 4.3, description: 'Popular ghat for morning prayers and yoga', duration: '1-2 hours' },
        { id: '5', name: 'Manikarnika Ghat', type: 'Cremation Ghat', entry_fee: 'Free', timings: '24 hours', rating: 4.1, description: 'Most sacred cremation ghat', duration: '1 hour' },
        { id: '6', name: 'Banaras Hindu University', type: 'University Campus', entry_fee: 'Free', timings: '6:00 AM - 6:00 PM', rating: 4.2, description: 'One of India\'s largest universities', duration: '2-3 hours' },
        { id: '7', name: 'Ramnagar Fort', type: 'Historical Fort', entry_fee: '₹15', timings: '9:00 AM - 6:00 PM', rating: 3.9, description: 'Fort and museum of Kashi Naresh', duration: '1-2 hours' },
        { id: '8', name: 'Tulsi Manas Temple', type: 'Temple', entry_fee: 'Free', timings: '5:00 AM - 12:00 PM, 1:00 PM - 9:00 PM', rating: 4.0, description: 'Temple where Tulsidas wrote Ramcharitmanas', duration: '1 hour' },
        { id: '9', name: 'Bharat Mata Temple', type: 'Unique Temple', entry_fee: '₹5', timings: '6:00 AM - 12:00 PM, 1:00 PM - 9:00 PM', rating: 3.8, description: 'Temple dedicated to Mother India', duration: '1 hour' },
        { id: '10', name: 'New Kashi Vishwanath Temple (BHU)', type: 'Modern Temple', entry_fee: 'Free', timings: '4:00 AM - 11:00 PM', rating: 4.2, description: 'Replica of original Kashi Vishwanath', duration: '1 hour' }
      ],
      amritsar: [
        { id: '1', name: 'Golden Temple (Harmandir Sahib)', type: 'Sikh Temple', entry_fee: 'Free', timings: '24 hours', rating: 4.8, description: 'Most sacred Sikh shrine', duration: '2-3 hours' },
        { id: '2', name: 'Jallianwala Bagh', type: 'Historical Memorial', entry_fee: 'Free', timings: '6:30 AM - 7:30 PM', rating: 4.3, description: 'Memorial of 1919 massacre', duration: '1-2 hours' },
        { id: '3', name: 'Wagah Border', type: 'International Border', entry_fee: 'Free', timings: '4:00 PM - 6:00 PM', rating: 4.4, description: 'Famous flag lowering ceremony', duration: '3-4 hours' },
        { id: '4', name: 'Akal Takht', type: 'Sikh Throne', entry_fee: 'Free', timings: '24 hours', rating: 4.5, description: 'Highest temporal seat of Sikhs', duration: '1 hour' },
        { id: '5', name: 'Partition Museum', type: 'Historical Museum', entry_fee: '₹25 (Indians), ₹250 (Foreigners)', timings: '10:00 AM - 6:00 PM', rating: 4.2, description: 'Museum on 1947 partition', duration: '2 hours' },
        { id: '6', name: 'Durgiana Temple', type: 'Hindu Temple', entry_fee: 'Free', timings: '6:00 AM - 10:00 PM', rating: 4.1, description: 'Hindu temple similar to Golden Temple', duration: '1-2 hours' },
        { id: '7', name: 'Ram Bagh Palace', type: 'Heritage Hotel/Museum', entry_fee: '₹30', timings: '10:00 AM - 5:00 PM', rating: 4.0, description: 'Summer palace of Maharaja Ranjit Singh', duration: '1-2 hours' },
        { id: '8', name: 'Gobindgarh Fort', type: 'Historical Fort', entry_fee: '₹30 (Indians), ₹100 (Foreigners)', timings: '10:00 AM - 10:00 PM', rating: 3.9, description: 'Historic Sikh fort with museums', duration: '2-3 hours' },
        { id: '9', name: 'Hall Bazaar', type: 'Shopping Market', entry_fee: 'Free', timings: '10:00 AM - 9:00 PM', rating: 4.0, description: 'Traditional market for Punjabi items', duration: '1-2 hours' },
        { id: '10', name: 'Mata Lal Devi Temple', type: 'Cave Temple', entry_fee: 'Free', timings: '6:00 AM - 10:00 PM', rating: 3.8, description: 'Unique underground cave temple', duration: '1 hour' }
      ]
    };

    return attractionData[cityLower] || [
      { id: '1', name: `${city} Fort`, type: 'Historical Fort', entry_fee: '₹25', timings: '9:00 AM - 6:00 PM', rating: 4.2, description: 'Historic fort with panoramic city views', duration: '2-3 hours' },
      { id: '2', name: `${city} Museum`, type: 'Museum', entry_fee: '₹20', timings: '10:00 AM - 5:00 PM', rating: 4.0, description: 'Local history and cultural artifacts', duration: '1-2 hours' },
      { id: '3', name: `${city} Temple`, type: 'Temple', entry_fee: 'Free', timings: '6:00 AM - 9:00 PM', rating: 4.3, description: 'Ancient temple with beautiful architecture', duration: '1-2 hours' },
      { id: '4', name: `${city} Palace`, type: 'Palace', entry_fee: '₹50', timings: '9:00 AM - 5:00 PM', rating: 4.1, description: 'Royal palace showcasing local heritage', duration: '2-3 hours' },
      { id: '5', name: `${city} Garden`, type: 'Garden', entry_fee: '₹15', timings: '6:00 AM - 8:00 PM', rating: 3.9, description: 'Beautiful garden perfect for relaxation', duration: '1-2 hours' },
      { id: '6', name: `${city} Market`, type: 'Market', entry_fee: 'Free', timings: '10:00 AM - 9:00 PM', rating: 4.0, description: 'Traditional market for local shopping', duration: '1-2 hours' }
    ];
  };

  useEffect(() => {
    const cityAttractions = getAttractionsForCity(tripData.destination);
    
    setTimeout(() => {
      setAttractions(cityAttractions);
      setLoading(false);
    }, 1000);
  }, [tripData]);

  const handleSelectAttraction = (attraction: Attraction) => {
    if (selectedAttractions.find(a => a.id === attraction.id)) {
      setSelectedAttractions(selectedAttractions.filter(a => a.id !== attraction.id));
    } else {
      setSelectedAttractions([...selectedAttractions, attraction]);
    }
  };

  const handleNext = () => {
    console.log('Selected attractions:', selectedAttractions);
    onNext();
  };

  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + 6, attractions.length));
  };

  if (loading) {
    return (
      <Card className="shadow-xl border-t-4 border-t-orange-500">
        <CardHeader>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent">
            Finding Tourist Attractions in {tripData.destination}...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gradient-to-r from-gray-200 to-gray-300 h-32 rounded-lg mb-4"></div>
                <div className="bg-gray-200 h-4 rounded mb-2"></div>
                <div className="bg-gray-200 h-4 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-xl border-t-4 border-t-orange-500">
      <CardHeader className="bg-gradient-to-r from-orange-50 to-blue-50">
        <CardTitle className="flex items-center gap-2 text-2xl font-bold text-gray-800">
          <MapPin className="h-6 w-6 text-orange-500" />
          Tourist Attractions in {tripData.destination}
        </CardTitle>
        <p className="text-gray-600 font-semibold">
          Discover {attractions.length} amazing places to visit
        </p>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {attractions.slice(0, visibleCount).map((attraction) => (
            <Card 
              key={attraction.id} 
              className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 ${
                selectedAttractions.find(a => a.id === attraction.id)
                  ? 'ring-2 ring-orange-500 bg-gradient-to-br from-orange-50 to-blue-50' 
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => handleSelectAttraction(attraction)}
            >
              <div className="p-1">
                <div className="bg-gradient-to-br from-orange-100 to-blue-100 p-4 rounded-t-lg">
                  <Badge className="bg-blue-500 hover:bg-blue-600 text-white font-semibold mb-2">
                    {attraction.type}
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-2 text-gray-800">{attraction.name}</h3>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${
                        i < Math.floor(attraction.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`} 
                    />
                  ))}
                  <span className="ml-1 text-sm text-gray-600 font-medium">{attraction.rating}</span>
                </div>
                <p className="text-sm mb-3 font-medium">{attraction.description}</p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <IndianRupee className="h-4 w-4 text-green-600" />
                    <span className="font-medium">{attraction.entry_fee}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-blue-600" />
                    <span className="font-medium">{attraction.timings}</span>
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    Duration: {attraction.duration}
                  </div>
                </div>
                <Button
                  className={`w-full font-semibold ${
                    selectedAttractions.find(a => a.id === attraction.id)
                      ? 'bg-gradient-to-r from-orange-500 to-blue-600 hover:from-orange-600 hover:to-blue-700 text-white'
                      : 'border-2 border-orange-200 text-orange-600 hover:bg-orange-50'
                  }`}
                  variant={selectedAttractions.find(a => a.id === attraction.id) ? "default" : "outline"}
                >
                  {selectedAttractions.find(a => a.id === attraction.id) ? '✓ Selected' : 'Add to Itinerary'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {visibleCount < attractions.length && (
          <div className="text-center mt-8">
            <Button 
              className="bg-gradient-to-r from-orange-500 to-blue-600 hover:from-orange-600 hover:to-blue-700 text-white font-semibold px-8 py-3"
              onClick={handleLoadMore}
            >
              Load More Attractions ({attractions.length - visibleCount} more available)
            </Button>
          </div>
        )}

        {selectedAttractions.length > 0 && (
          <div className="mt-8 p-6 bg-gradient-to-r from-orange-50 to-blue-50 rounded-xl border-2 border-orange-200">
            <h4 className="font-bold text-xl mb-4 text-gray-800">Selected Attractions ({selectedAttractions.length}):</h4>
            <div className="grid md:grid-cols-2 gap-4">
              {selectedAttractions.map((attraction) => (
                <div key={attraction.id} className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <div>
                    <span className="font-semibold text-gray-800">{attraction.name}</span>
                    <p className="text-sm text-gray-600">{attraction.type}</p>
                  </div>
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    {attraction.entry_fee}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-end mt-8">
          <Button onClick={handleNext} className="bg-gradient-to-r from-orange-500 to-blue-600 hover:from-orange-600 hover:to-blue-700 text-white font-bold px-8 py-3 text-lg">
            Next: Famous Dishes
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
