import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { TripData } from '@/components/TripPlanningForm';

interface Attraction {
  id: string;
  name: string;
  type: string;
  rating: number;
  entry_fee: string;
  timings: string;
  description: string;
}

interface TouristAttractionsProps {
  tripData: TripData;
  onNext: () => void;
}

export const TouristAttractions = ({ tripData, onNext }: TouristAttractionsProps) => {
  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const [loading, setLoading] = useState(true);

  const getAttractionsForCity = (city: string): Attraction[] => {
    const cityLower = city.toLowerCase();
    
    const attractionData: { [key: string]: Attraction[] } = {
      mumbai: [
        { id: '1', name: 'Gateway of India', type: 'Historical', rating: 4.5, entry_fee: 'Free', timings: '6:00 AM - 7:00 PM', description: 'Iconic monument overlooking the Arabian Sea' },
        { id: '2', name: 'Elephanta Caves', type: 'Historical', rating: 4.4, entry_fee: '₹40', timings: '9:00 AM - 5:30 PM', description: 'Rock-cut caves with ancient sculptures' },
        { id: '3', name: 'Marine Drive', type: 'Scenic', rating: 4.6, entry_fee: 'Free', timings: 'Open 24 hours', description: 'Famous promenade along the coast' },
        { id: '4', name: 'Chhatrapati Shivaji Terminus', type: 'Architectural', rating: 4.3, entry_fee: 'Free', timings: 'Open 24 hours', description: 'UNESCO World Heritage railway station' }
      ],
      delhi: [
        { id: '1', name: 'Red Fort', type: 'Historical', rating: 4.5, entry_fee: '₹35', timings: '9:30 AM - 4:30 PM', description: 'Historic fort and UNESCO World Heritage site' },
        { id: '2', name: 'Qutub Minar', type: 'Historical', rating: 4.4, entry_fee: '₹40', timings: '7:00 AM - 5:00 PM', description: 'Tallest brick minaret in the world' },
        { id: '3', name: 'India Gate', type: 'Memorial', rating: 4.6, entry_fee: 'Free', timings: 'Open 24 hours', description: 'War memorial and popular picnic spot' },
        { id: '4', name: 'Lotus Temple', type: 'Religious', rating: 4.5, entry_fee: 'Free', timings: '9:00 AM - 5:30 PM', description: 'Baháʼí House of Worship with lotus flower design' }
      ],
      bangalore: [
        { id: '1', name: 'Lalbagh Botanical Garden', type: 'Garden', rating: 4.6, entry_fee: '₹20', timings: '6:00 AM - 7:00 PM', description: 'Famous botanical garden with glasshouse' },
        { id: '2', name: 'Bangalore Palace', type: 'Historical', rating: 4.3, entry_fee: '₹230', timings: '10:00 AM - 5:30 PM', description: 'Palace inspired by Windsor Castle' },
        { id: '3', name: 'Cubbon Park', type: 'Park', rating: 4.5, entry_fee: 'Free', timings: '6:00 AM - 8:00 PM', description: 'Large green space in the city center' },
        { id: '4', name: 'Tipu Sultan\'s Summer Palace', type: 'Historical', rating: 4.2, entry_fee: '₹15', timings: '9:30 AM - 5:30 PM', description: 'Historic palace of Tipu Sultan' }
      ],
      chennai: [
        { id: '1', name: 'Marina Beach', type: 'Beach', rating: 4.4, entry_fee: 'Free', timings: '5:00 AM - 9:00 PM', description: 'Longest urban beach in India' },
        { id: '2', name: 'Kapaleeshwarar Temple', type: 'Religious', rating: 4.5, entry_fee: 'Free', timings: '6:00 AM - 12:00 PM, 4:00 PM - 9:00 PM', description: 'Ancient Hindu temple dedicated to Lord Shiva' },
        { id: '3', name: 'Fort St. George', type: 'Historical', rating: 4.3, entry_fee: '₹15', timings: '9:00 AM - 5:30 PM', description: 'First British fortress in India' },
        { id: '4', name: 'Santhome Cathedral', type: 'Religious', rating: 4.2, entry_fee: 'Free', timings: '6:00 AM - 7:00 PM', description: 'Historic Roman Catholic cathedral' }
      ],
      kolkata: [
        { id: '1', name: 'Victoria Memorial', type: 'Museum', rating: 4.6, entry_fee: '₹30', timings: '10:00 AM - 5:00 PM', description: 'Marble monument and museum' },
        { id: '2', name: 'Howrah Bridge', type: 'Architectural', rating: 4.5, entry_fee: 'Free', timings: 'Open 24 hours', description: 'Iconic cantilever bridge over Hooghly River' },
        { id: '3', name: 'Dakshineswar Kali Temple', type: 'Religious', rating: 4.4, entry_fee: 'Free', timings: '6:00 AM - 12:00 PM, 4:00 PM - 8:00 PM', description: 'Famous Hindu temple dedicated to Goddess Kali' },
        { id: '4', name: 'Indian Museum', type: 'Museum', rating: 4.3, entry_fee: '₹20', timings: '10:00 AM - 5:00 PM', description: 'Oldest museum in India' }
      ],
      hyderabad: [
        { id: '1', name: 'Charminar', type: 'Historical', rating: 4.5, entry_fee: '₹25', timings: '9:30 AM - 5:30 PM', description: 'Iconic 16th-century mosque and monument' },
        { id: '2', name: 'Golconda Fort', type: 'Historical', rating: 4.6, entry_fee: '₹25', timings: '9:00 AM - 5:30 PM', description: 'Fort with acoustic effects and panoramic views' },
        { id: '3', name: 'Hussain Sagar Lake', type: 'Lake', rating: 4.3, entry_fee: 'Free', timings: 'Open 24 hours', description: 'Artificial lake with Buddha statue' },
        { id: '4', name: 'Ramoji Film City', type: 'Theme Park', rating: 4.4, entry_fee: '₹1,100', timings: '9:00 AM - 5:30 PM', description: 'Largest integrated film studio complex' }
      ],
      pune: [
        { id: '1', name: 'Shaniwar Wada', type: 'Historical', rating: 4.3, entry_fee: '₹25', timings: '9:00 AM - 5:30 PM', description: 'Fortress with historical significance' },
        { id: '2', name: 'Aga Khan Palace', type: 'Historical', rating: 4.4, entry_fee: '₹25', timings: '9:00 AM - 5:00 PM', description: 'Palace with Gandhi memorial' },
        { id: '3', name: 'Sinhagad Fort', type: 'Historical', rating: 4.5, entry_fee: 'Free', timings: '6:00 AM - 6:00 PM', description: 'Hill fortress with trekking trails' },
        { id: '4', name: 'Osho Ashram', type: 'Spiritual', rating: 4.2, entry_fee: '₹100', timings: '8:00 AM - 8:00 PM', description: 'Meditation and wellness center' }
      ],
      ahmedabad: [
        { id: '1', name: 'Sabarmati Ashram', type: 'Historical', rating: 4.5, entry_fee: 'Free', timings: '8:00 AM - 7:00 PM', description: 'Residence of Mahatma Gandhi' },
        { id: '2', name: 'Kankaria Lake', type: 'Lake', rating: 4.3, entry_fee: '₹30', timings: '10:00 AM - 10:00 PM', description: 'Lake with amusement park and zoo' },
        { id: '3', name: 'Adalaj Stepwell', type: 'Historical', rating: 4.4, entry_fee: '₹10', timings: '9:00 AM - 6:00 PM', description: 'Intricately carved stepwell' },
        { id: '4', name: 'Jama Masjid', type: 'Religious', rating: 4.2, entry_fee: 'Free', timings: '6:00 AM - 8:00 PM', description: 'Historic mosque with Indo-Islamic architecture' }
      ],
      jaipur: [
        { id: '1', name: 'Amber Fort', type: 'Historical', rating: 4.6, entry_fee: '₹100', timings: '8:00 AM - 5:30 PM', description: 'Hilltop fort with artistic Hindu style' },
        { id: '2', name: 'City Palace', type: 'Historical', rating: 4.5, entry_fee: '₹200', timings: '9:30 AM - 5:00 PM', description: 'Royal residence with museums' },
        { id: '3', name: 'Hawa Mahal', type: 'Historical', rating: 4.4, entry_fee: '₹50', timings: '9:00 AM - 5:00 PM', description: 'Palace of winds with unique facade' },
        { id: '4', name: 'Jantar Mantar', type: 'Historical', rating: 4.3, entry_fee: '₹50', timings: '9:00 AM - 4:30 PM', description: 'Astronomical observatory' }
      ],
      lucknow: [
        { id: '1', name: 'Bara Imambara', type: 'Historical', rating: 4.5, entry_fee: '₹50', timings: '9:00 AM - 5:00 PM', description: 'Historical complex with labyrinth' },
        { id: '2', name: 'Rumi Darwaza', type: 'Historical', rating: 4.4, entry_fee: 'Free', timings: 'Open 24 hours', description: 'Impressive gateway in Awadhi style' },
        { id: '3', name: 'Hazratganj Market', type: 'Shopping', rating: 4.3, entry_fee: 'Free', timings: '10:00 AM - 10:00 PM', description: 'Popular shopping street' },
        { id: '4', name: 'Chota Imambara', type: 'Historical', rating: 4.2, entry_fee: '₹30', timings: '9:00 AM - 5:00 PM', description: 'Monument with beautiful decorations' }
      ],
      bhopal: [
        { id: '1', name: 'Upper Lake', type: 'Lake', rating: 4.5, entry_fee: 'Free', timings: 'Open 24 hours', description: 'Large lake with boating facilities' },
        { id: '2', name: 'Taj-ul-Masajid', type: 'Religious', rating: 4.4, entry_fee: 'Free', timings: '6:00 AM - 8:00 PM', description: 'One of the largest mosques in India' },
        { id: '3', name: 'Van Vihar National Park', type: 'National Park', rating: 4.3, entry_fee: '₹50', timings: '6:00 AM - 6:00 PM', description: 'Wildlife sanctuary near the lake' },
        { id: '4', name: 'Sanchi Stupa', type: 'UNESCO World Heritage', rating: 4.6, entry_fee: '₹40', timings: '9:00 AM - 5:00 PM', description: 'Ancient Buddhist monument' }
      ],
      chandigarh: [
        { id: '1', name: 'Rock Garden', type: 'Garden', rating: 4.6, entry_fee: '₹30', timings: '9:00 AM - 7:00 PM', description: 'Sculpture garden made from industrial waste' },
        { id: '2', name: 'Sukhna Lake', type: 'Lake', rating: 4.5, entry_fee: 'Free', timings: '6:00 AM - 8:00 PM', description: 'Man-made reservoir with boating' },
        { id: '3', name: 'Rose Garden', type: 'Garden', rating: 4.4, entry_fee: '₹20', timings: '9:00 AM - 7:00 PM', description: 'Largest rose garden in Asia' },
        { id: '4', name: 'Capitol Complex', type: 'Architectural', rating: 4.3, entry_fee: 'Free', timings: '9:00 AM - 5:00 PM', description: 'UNESCO World Heritage site' }
      ],
      indore: [
        { id: '1', name: 'Rajwada Palace', type: 'Historical', rating: 4.4, entry_fee: '₹20', timings: '9:00 AM - 5:00 PM', description: 'Historic palace with Maratha architecture' },
        { id: '2', name: 'Lal Bagh Palace', type: 'Historical', rating: 4.3, entry_fee: '₹30', timings: '9:00 AM - 5:00 PM', description: 'Royal palace with museum' },
        { id: '3', name: 'Sarafa Bazaar', type: 'Market', rating: 4.5, entry_fee: 'Free', timings: 'Evenings', description: 'Night street food market' },
        { id: '4', name: 'Patalpani Waterfall', type: 'Natural', rating: 4.2, entry_fee: 'Free', timings: '8:00 AM - 6:00 PM', description: 'Scenic waterfall near the city' }
      ],
      nagpur: [
        { id: '1', name: 'Deekshabhoomi', type: 'Religious', rating: 4.5, entry_fee: 'Free', timings: '6:00 AM - 8:00 PM', description: 'Buddhist monument and pilgrimage site' },
        { id: '2', name: 'Futala Lake', type: 'Lake', rating: 4.3, entry_fee: 'Free', timings: '6:00 AM - 9:00 PM', description: 'Popular lake with food stalls' },
        { id: '3', name: 'Sitabuldi Fort', type: 'Historical', rating: 4.2, entry_fee: 'Free', timings: '9:00 AM - 5:00 PM', description: 'Hilltop fort with city views' },
        { id: '4', name: 'Ambazari Garden', type: 'Garden', rating: 4.1, entry_fee: '₹10', timings: '6:00 AM - 8:00 PM', description: 'Large garden with lake and zoo' }
      ],
      thane: [
        { id: '1', name: 'Upvan Lake', type: 'Lake', rating: 4.3, entry_fee: 'Free', timings: '5:00 AM - 10:00 PM', description: 'Scenic lake perfect for morning walks' },
        { id: '2', name: 'Tikuji-ni-Wadi', type: 'Amusement Park', rating: 4.0, entry_fee: '₹200', timings: '10:00 AM - 6:00 PM', description: 'Water park and amusement rides' },
        { id: '3', name: 'Kanheri Caves', type: 'Historical', rating: 4.4, entry_fee: '₹15', timings: '9:00 AM - 5:30 PM', description: 'Ancient Buddhist caves' },
        { id: '4', name: 'Sanjay Gandhi National Park', type: 'National Park', rating: 4.5, entry_fee: '₹46', timings: '7:30 AM - 6:30 PM', description: 'Wildlife sanctuary in the city' }
      ],
      surat: [
        { id: '1', name: 'Dumas Beach', type: 'Beach', rating: 4.0, entry_fee: 'Free', timings: '6:00 AM - 10:00 PM', description: 'Famous black sand beach with local food stalls' },
        { id: '2', name: 'Surat Castle', type: 'Historical', rating: 4.2, entry_fee: '₹10', timings: '9:00 AM - 6:00 PM', description: '16th century fort built by the Portuguese' },
        { id: '3', name: 'Sardar Sarovar Dam', type: 'Engineering Marvel', rating: 4.5, entry_fee: '₹30', timings: '9:00 AM - 5:00 PM', description: 'One of the largest dams in India' },
        { id: '4', name: 'Jagdishchandra Bose Aquarium', type: 'Aquarium', rating: 3.8, entry_fee: '₹20', timings: '10:00 AM - 8:00 PM', description: 'Marine life and fish collection' }
      ],
      kanpur: [
        { id: '1', name: 'Allen Forest Zoo', type: 'Zoo', rating: 4.1, entry_fee: '₹20', timings: '8:00 AM - 6:00 PM', description: 'Large zoo with diverse wildlife' },
        { id: '2', name: 'Kanpur Memorial Church', type: 'Religious', rating: 4.0, entry_fee: 'Free', timings: '6:00 AM - 8:00 PM', description: 'Historic church built in 1875' },
        { id: '3', name: 'Phool Bagh', type: 'Garden', rating: 3.9, entry_fee: '₹5', timings: '5:00 AM - 10:00 PM', description: 'Beautiful garden with fountains' },
        { id: '4', name: 'Bithoor', type: 'Historical', rating: 4.2, entry_fee: 'Free', timings: 'All day', description: 'Ancient town on the banks of Ganges' }
      ],
      visakhapatnam: [
        { id: '1', name: 'Araku Valley', type: 'Hill Station', rating: 4.6, entry_fee: 'Free', timings: 'All day', description: 'Beautiful hill station with coffee plantations' },
        { id: '2', name: 'Borra Caves', type: 'Natural Wonder', rating: 4.4, entry_fee: '₹25', timings: '10:00 AM - 5:00 PM', description: 'Million-year-old limestone caves' },
        { id: '3', name: 'Kailasagiri', type: 'Viewpoint', rating: 4.3, entry_fee: '₹15', timings: '8:00 AM - 8:00 PM', description: 'Hilltop park with panoramic city views' },
        { id: '4', name: 'INS Kurusura Submarine Museum', type: 'Museum', rating: 4.2, entry_fee: '₹40', timings: '2:00 PM - 8:00 PM', description: 'Decommissioned submarine turned museum' }
      ],
      patna: [
        { id: '1', name: 'Golghar', type: 'Historical', rating: 4.0, entry_fee: '₹15', timings: '9:00 AM - 6:00 PM', description: 'Granary with spiral staircase and city views' },
        { id: '2', name: 'Patna Museum', type: 'Museum', rating: 4.2, entry_fee: '₹20', timings: '10:30 AM - 4:30 PM', description: 'Archaeological artifacts and sculptures' },
        { id: '3', name: 'Gandhi Ghat', type: 'Ghat', rating: 4.1, entry_fee: 'Free', timings: 'All day', description: 'Riverside ghat for prayers and boat rides' },
        { id: '4', name: 'Takht Sri Patna Sahib', type: 'Religious', rating: 4.5, entry_fee: 'Free', timings: '4:00 AM - 10:00 PM', description: 'Sacred Sikh gurudwara, birthplace of Guru Gobind Singh' }
      ],
      ghaziabad: [
        { id: '1', name: 'Swarna Jayanti Park', type: 'Park', rating: 4.0, entry_fee: '₹5', timings: '5:00 AM - 10:00 PM', description: 'Large park with boating and gardens' },
        { id: '2', name: 'Shipra Mall', type: 'Shopping', rating: 4.1, entry_fee: 'Free', timings: '10:00 AM - 10:00 PM', description: 'Modern shopping and entertainment complex' },
        { id: '3', name: 'ISKCON Ghaziabad', type: 'Religious', rating: 4.3, entry_fee: 'Free', timings: '4:30 AM - 9:00 PM', description: 'Beautiful Krishna temple' },
        { id: '4', name: 'Drizzling Land Water Park', type: 'Water Park', rating: 3.9, entry_fee: '₹350', timings: '10:00 AM - 6:00 PM', description: 'Water slides and swimming pools' }
      ],
      ludhiana: [
        { id: '1', name: 'Punjab Agricultural University Museum', type: 'Museum', rating: 4.0, entry_fee: '₹10', timings: '9:00 AM - 5:00 PM', description: 'Agricultural tools and farming history' },
        { id: '2', name: 'Rakh Bagh Park', type: 'Park', rating: 4.1, entry_fee: '₹5', timings: '5:00 AM - 10:00 PM', description: 'Large park with boating facility' },
        { id: '3', name: 'Gurudwara Shri Manji Sahib', type: 'Religious', rating: 4.4, entry_fee: 'Free', timings: '4:00 AM - 10:00 PM', description: 'Historic Sikh temple' },
        { id: '4', name: 'Nehru Rose Garden', type: 'Garden', rating: 4.2, entry_fee: '₹10', timings: '6:00 AM - 8:00 PM', description: 'Beautiful rose garden with over 17,000 plants' }
      ],
      nashik: [
        { id: '1', name: 'Sula Vineyards', type: 'Vineyard', rating: 4.5, entry_fee: '₹800 (with tasting)', timings: '10:00 AM - 10:00 PM', description: 'Famous vineyard with wine tasting tours' },
        { id: '2', name: 'Trimbakeshwar Temple', type: 'Religious', rating: 4.6, entry_fee: 'Free', timings: '5:30 AM - 9:00 PM', description: 'One of 12 Jyotirlingas of Lord Shiva' },
        { id: '3', name: 'Pandavleni Caves', type: 'Historical', rating: 4.2, entry_fee: '₹25', timings: '8:00 AM - 6:00 PM', description: '24 ancient Buddhist caves' },
        { id: '4', name: 'Gangapur Dam', type: 'Dam', rating: 4.0, entry_fee: 'Free', timings: '6:00 AM - 6:00 PM', description: 'Scenic dam with boating facilities' }
      ],
      faridabad: [
        { id: '1', name: 'Surajkund', type: 'Lake', rating: 4.1, entry_fee: '₹25', timings: '8:00 AM - 6:00 PM', description: 'Ancient water reservoir with crafts mela venue' },
        { id: '2', name: 'Badkhal Lake', type: 'Lake', rating: 3.9, entry_fee: '₹10', timings: '6:00 AM - 8:00 PM', description: 'Artificial lake surrounded by Aravalli hills' },
        { id: '3', name: 'Town Park', type: 'Park', rating: 4.0, entry_fee: '₹5', timings: '5:00 AM - 10:00 PM', description: 'Large park with musical fountain' },
        { id: '4', name: 'Crown Plaza Mall', type: 'Shopping', rating: 4.2, entry_fee: 'Free', timings: '10:00 AM - 10:00 PM', description: 'Modern shopping and entertainment complex' }
      ],
      meerut: [
        { id: '1', name: 'Augarnath Temple', type: 'Religious', rating: 4.2, entry_fee: 'Free', timings: '5:00 AM - 10:00 PM', description: 'Ancient Shiva temple' },
        { id: '2', name: 'Jama Masjid', type: 'Religious', rating: 4.0, entry_fee: 'Free', timings: '5:00 AM - 9:00 PM', description: 'Historic mosque built by Shah Jahan' },
        { id: '3', name: 'Gandhi Bagh', type: 'Park', rating: 3.9, entry_fee: '₹5', timings: '6:00 AM - 8:00 PM', description: 'Public garden with historical significance' },
        { id: '4', name: 'Suraj Kund Park', type: 'Park', rating: 4.1, entry_fee: '₹10', timings: '6:00 AM - 10:00 PM', description: 'Park with boating and recreational activities' }
      ],
      rajkot: [
        { id: '1', name: 'Watson Museum', type: 'Museum', rating: 4.1, entry_fee: '₹3', timings: '9:00 AM - 12:00 PM, 3:00 PM - 6:00 PM', description: 'Artifacts from colonial period and Rajkot history' },
        { id: '2', name: 'Kaba Gandhi No Delo', type: 'Historical', rating: 4.3, entry_fee: '₹5', timings: '8:00 AM - 12:00 PM, 4:00 PM - 8:00 PM', description: 'Mahatma Gandhi\'s childhood home' },
        { id: '3', name: 'Jubilee Garden', type: 'Garden', rating: 4.0, entry_fee: '₹5', timings: '6:00 AM - 10:00 PM', description: 'Beautiful garden with musical fountain' },
        { id: '4', name: 'Rotary Dolls Museum', type: 'Museum', rating: 3.9, entry_fee: '₹10', timings: '9:00 AM - 1:00 PM, 3:00 PM - 7:00 PM', description: 'Collection of dolls from around the world' }
      ],
      srinagar: [
        { id: '1', name: 'Dal Lake', type: 'Lake', rating: 4.7, entry_fee: 'Free (Shikara ₹300)', timings: 'All day', description: 'Iconic lake with houseboats and shikaras' },
        { id: '2', name: 'Mughal Gardens', type: 'Garden', rating: 4.6, entry_fee: '₹25', timings: '8:00 AM - 7:00 PM', description: 'Nishat, Shalimar, and Chashme Shahi gardens' },
        { id: '3', name: 'Shankaracharya Temple', type: 'Religious', rating: 4.4, entry_fee: 'Free', timings: '6:00 AM - 8:00 PM', description: 'Ancient temple on Shankaracharya Hill' },
        { id: '4', name: 'Hazratbal Shrine', type: 'Religious', rating: 4.5, entry_fee: 'Free', timings: '5:00 AM - 10:00 PM', description: 'Sacred Muslim shrine on Dal Lake' }
      ],
      aurangabad: [
        { id: '1', name: 'Ajanta Caves', type: 'UNESCO World Heritage', rating: 4.7, entry_fee: '₹40', timings: '9:00 AM - 5:30 PM', description: '2nd century BCE Buddhist cave monuments' },
        { id: '2', name: 'Ellora Caves', type: 'UNESCO World Heritage', rating: 4.8, entry_fee: '₹40', timings: '6:00 AM - 6:00 PM', description: 'Rock-cut caves representing three religions' },
        { id: '3', name: 'Bibi Ka Maqbara', type: 'Historical', rating: 4.3, entry_fee: '₹25', timings: '8:00 AM - 8:00 PM', description: 'Mini Taj Mahal built by Aurangzeb' },
        { id: '4', name: 'Daulatabad Fort', type: 'Historical', rating: 4.4, entry_fee: '₹25', timings: '8:00 AM - 6:00 PM', description: '12th century hilltop fortress' }
      ],
      ranchi: [
        { id: '1', name: 'Rock Garden', type: 'Garden', rating: 4.2, entry_fee: '₹10', timings: '9:00 AM - 8:00 PM', description: 'Artistic garden made from rock sculptures' },
        { id: '2', name: 'Hundru Falls', type: 'Waterfall', rating: 4.4, entry_fee: '₹20', timings: '8:00 AM - 6:00 PM', description: '320 feet high waterfall on Subarnarekha river' },
        { id: '3', name: 'Jagannath Temple', type: 'Religious', rating: 4.3, entry_fee: 'Free', timings: '6:00 AM - 8:00 PM', description: 'Replica of famous Puri Jagannath Temple' },
        { id: '4', name: 'Kanke Dam', type: 'Dam', rating: 4.0, entry_fee: '₹15', timings: '8:00 AM - 6:00 PM', description: 'Scenic dam with boating facilities' }
      ],
      coimbatore: [
        { id: '1', name: 'Marudhamalai Temple', type: 'Religious', rating: 4.4, entry_fee: 'Free', timings: '6:00 AM - 8:00 PM', description: 'Hilltop temple dedicated to Lord Murugan' },
        { id: '2', name: 'Vydehi Falls', type: 'Waterfall', rating: 4.2, entry_fee: '₹10', timings: '8:00 AM - 6:00 PM', description: 'Beautiful waterfall in Western Ghats' },
        { id: '3', name: 'Perur Pateeswarar Temple', type: 'Religious', rating: 4.3, entry_fee: 'Free', timings: '6:00 AM - 12:00 PM, 4:00 PM - 8:30 PM', description: '1000-year-old Shiva temple' },
        { id: '4', name: 'Black Thunder Theme Park', type: 'Amusement Park', rating: 4.1, entry_fee: '₹899', timings: '10:00 AM - 6:00 PM', description: 'Water park and amusement rides' }
      ]
    };

    return attractionData[cityLower] || [
      { id: '1', name: 'City Palace', type: 'Historical', rating: 4.0, entry_fee: '₹50', timings: '9:00 AM - 5:00 PM', description: 'Historic palace showcasing local architecture' },
      { id: '2', name: 'Local Temple', type: 'Religious', rating: 4.2, entry_fee: 'Free', timings: '6:00 AM - 8:00 PM', description: 'Ancient temple with cultural significance' },
      { id: '3', name: 'City Garden', type: 'Garden', rating: 3.8, entry_fee: '₹10', timings: '6:00 AM - 8:00 PM', description: 'Beautiful garden for relaxation' }
    ];
  };

  useEffect(() => {
    const cityAttractions = getAttractionsForCity(tripData.destination);
    
    setTimeout(() => {
      setAttractions(cityAttractions);
      setLoading(false);
    }, 1000);
  }, [tripData]);

  const handleNext = () => {
    console.log('Attractions viewed for:', tripData.destination);
    onNext();
  };

  if (loading) {
    return (
      <Card className="shadow-xl border-t-4 border-t-orange-500">
        <CardHeader>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent">
            Finding Attractions in {tripData.destination}...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gradient-to-r from-gray-200 to-gray-300 h-24 rounded-lg mb-4"></div>
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
        <CardTitle className="text-2xl font-bold text-gray-800">
          Top Attractions in {tripData.destination}
        </CardTitle>
        <p className="text-gray-600 font-semibold">
          Explore the must-visit places in {tripData.destination}
        </p>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid md:grid-cols-2 gap-6">
          {attractions.map((attraction) => (
            <Card key={attraction.id} className="p-4">
              <h3 className="font-bold text-lg mb-2 text-gray-800">{attraction.name}</h3>
              <p className="text-sm text-gray-600 mb-1 font-medium">{attraction.type}</p>
              <p className="text-sm text-gray-600 mb-1">Rating: {attraction.rating} / 5</p>
              <p className="text-sm text-gray-600 mb-1">Entry Fee: {attraction.entry_fee}</p>
              <p className="text-sm text-gray-600 mb-3">Timings: {attraction.timings}</p>
              <p className="text-gray-700">{attraction.description}</p>
            </Card>
          ))}
        </div>

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
