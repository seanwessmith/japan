import { useState, useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "./components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./components/ui/accordion";
import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";
import { Progress } from "./components/ui/progress";
import { Switch } from "./components/ui/switch";
import { Label } from "./components/ui/label";
import {
  CalendarDays,
  AlertTriangle,
  Map,
  Wallet,
  Info,
  MapPin,
  DollarSign,
  Camera,
  CheckCircle,
  Navigation,
  Upload,
  Plus,
} from "lucide-react";
import LocationMap from "./map";

// Data structure for itinerary
const itineraryData = [
  {
    date: "Wed 23 Apr",
    base: "Tokyo",
    isHoliday: false,
    plan: "Land Haneda/Narita → Shinjuku hotel. Evening yakitori in Omoide Yokocho & craft cocktails in Golden Gai.",
    highlight: false,
  },
  {
    date: "Thu 24 Apr",
    base: "Tokyo",
    isHoliday: false,
    plan: "Shibuya Scramble, Shibuya Sky, Harajuku → Meiji Jingu, Yoyogi Park.",
    highlight: false,
  },
  {
    date: "Fri 25 Apr",
    base: "Tokyo",
    isHoliday: false,
    plan: "Sunrise Sensō-ji, Sumida river cruise, then rent a bike and follow the Arakawa or Tama river cycling paths (flat 30-40 km loops).",
    highlight: false,
  },
  {
    date: "Sat 26 Apr",
    base: "Tokyo",
    isHoliday: false,
    plan: "Full-day Nikko (Tōshō-gū shrine, Kegon Falls). Late ramen crawl in Ikebukuro.",
    highlight: false,
  },
  {
    date: "Sun 27 Apr",
    base: "Tokyo",
    isHoliday: false,
    plan: "Akihabara arcades → Kappabashi kitchen-ware street → Odaiba onsen & night skyline.",
    highlight: false,
  },
  {
    date: "Mon 28 Apr",
    base: "Tokyo",
    isHoliday: false,
    plan: "Mt Takao hike and soba lunch; thrift hunting in Shimokitazawa.",
    highlight: false,
  },
  {
    date: "Tue 29 Apr",
    base: "Nagoya → Kyoto",
    isHoliday: true,
    holidayName: "Showa Day",
    plan: "Shinkansen to Nagoya. If you scored tickets, spend the afternoon in Ghibli Park; if not, hit Nagoya Castle & Toyota Techno Museum. Evening hop to Kyoto (35 min train).",
    highlight: true,
  },
  {
    date: "Wed 30 Apr",
    base: "Kyoto",
    isHoliday: false,
    plan: "Sunrise Fushimi Inari, Nishiki Market snacks, Gion tea house.",
    highlight: false,
  },
  {
    date: "Thu 1 May",
    base: "Kyoto",
    isHoliday: false,
    plan: "Arashiyama bamboo grove & Hozugawa boat; evening Kurama-Kibune trail & onsen.",
    highlight: false,
  },
  {
    date: "Fri 2 May",
    base: "Onomichi → Imabari",
    isHoliday: false,
    plan: "Cycle the 70 km Shimanami Kaidō island bridges—reserve road or e-bike, send luggage by Ta-Q-Bin. Overnight Imabari or Dōgo Onsen.",
    highlight: true,
  },
  {
    date: "Sat 3 May",
    base: "Hiroshima",
    isHoliday: true,
    holidayName: "Constitution Day",
    plan: "Peace Park & Museum → sunset torii on Miyajima.",
    highlight: false,
  },
  {
    date: "Sun 4 May",
    base: "Hirosaki",
    isHoliday: true,
    holidayName: "Greenery Day",
    plan: "Bullet-train marathon to Aomori then to Hirosaki Castle for the moat-petal sakura festival (runs to May 5).",
    highlight: true,
  },
  {
    date: "Mon 5 May",
    base: "Tokyo",
    isHoliday: true,
    holidayName: "Children's Day",
    plan: "Morning yozakura stroll, afternoon train/flight back to Tokyo. Evening Ghibli Clock show in Shiodome.",
    highlight: false,
  },
  {
    date: "Tue 6 May",
    base: "Tokyo/fly-out city of choice",
    isHoliday: false,
    plan: "Last-minute Ginza shopping, depart Haneda/Narita or continue south & exit via Osaka-KIX.",
    highlight: false,
  },
];

// Ghibli alternatives
const ghibliAlternatives = [
  {
    experience: "Ghibli Park",
    spot: "Aichi",
    details:
      "Indoor sets + Valley of Witches (opens 2024). Tickets drop on the 10th of each month for two months ahead.",
  },
  {
    experience: "Giant Miyazaki Clock",
    spot: "Shiodome, Tokyo",
    details: "Free steampunk show 12 pm, 3 pm, 6 pm, 8 pm.",
  },
  {
    experience: "Donguri Kyowakoku flagship shop",
    spot: "Tokyo Skytree Town",
    details: "Limited-edition merch & life-size Totoro photo spot.",
  },
];

// Logistics
const logistics = [
  {
    title: "Transit cards",
    detail: "Grab a no-deposit Welcome Suica (28-day) at the airport.",
  },
  {
    title: "Baggage",
    detail:
      "Use Yamato/Ta-Q-Bin forwarding (~¥2,000) when cycling or hopping regions.",
  },
  {
    title: "Domestic flights",
    detail:
      "ANA/JAL Experience Japan fares (¥5,500–13,000) are handy if you'd rather fly Hiroshima → Aomori or Aomori → Haneda.",
  },
  {
    title: "Data",
    detail: "eSIM or pocket-Wi-Fi—critical for Google Maps bike nav.",
  },
];

// Alternative plans
const alternativePlans = [
  {
    title: "Mountain snow corridor",
    detail:
      "Swap Hirosaki for Tateyama Kurobe Alpine Route (still snowy in early May).",
  },
  {
    title: "Longer Kansai stay",
    detail: "Skip Tohoku, linger in Kyoto/Osaka/Nara, and fly home from KIX.",
  },
  {
    title: "Surf culture detour",
    detail: "Add a Kamakura day (beach & Great Buddha) between 25–27 Apr.",
  },
];

// Daily budget data
const dailyBudget = [
  {
    date: "Apr 23",
    expenses:
      "Narita Express → Shinjuku ¥3,200 • Yakitori alley dinner 4,000 • Golden Gai drinks 2,000 • Hotel 25,000",
    cost: "34,200",
  },
  {
    date: "Apr 24",
    expenses:
      "Shibuya Sky ticket 3,000 (daytime) • Food & metro 3,000 • Hotel 25,000",
    cost: "31,000",
  },
  {
    date: "Apr 25",
    expenses:
      "Sumida River cruise 1,500 • Bike day-rental 2,200 • Food 2,000 • Hotel 25,000",
    cost: "29,700",
  },
  {
    date: "Apr 26",
    expenses:
      "Nikko World-Heritage Pass 3,000 + Toshogu 1,600 • Express supplement 1,650 • Food 1,000 • Hotel 25,000",
    cost: "32,250",
  },
  {
    date: "Apr 27",
    expenses:
      "Akihabara arcade/retro 1,500 • Spa LaQua onsen 3,500 • Food 1,000 • Hotel 25,000",
    cost: "31,000",
  },
  {
    date: "Apr 28",
    expenses:
      "Mt Takao Keio 1-Day ticket 1,910 (covers cable-car) • Lunch 1,000 • Hotel 25,000",
    cost: "27,910",
  },
  {
    date: "Apr 29",
    expenses:
      "JR Pass (14-day ordinary) amortized 5,714/day (80,000÷14) • Ghibli Park holiday ticket 3,800 • Hotel Kyoto 23,000",
    cost: "32,514",
  },
  {
    date: "Apr 30",
    expenses:
      "Kyoto food & transit 4,000 • Tea ceremony 3,000 • JR-Pass share 5,714",
    cost: "34,714",
  },
  {
    date: "May 1",
    expenses:
      "Hozugawa boat 4,500 • Kurama onsen 2,500 • JR-Pass 5,714 • Hotel 23,000",
    cost: "36,714",
  },
  {
    date: "May 2",
    expenses:
      "Shimanami Kaidō road-bike 6,000 (Giant Store) + bridge tolls 500 • Luggage forwarding 2,000 • JR-Pass 5,714 • Hotel 18,000",
    cost: "34,214",
  },
  {
    date: "May 3",
    expenses:
      "Peace Memorial Museum 200 • Miyajima ropeway 2,000 • JR-Pass 5,714 • Hotel 20,000",
    cost: "28,314",
  },
  {
    date: "May 4",
    expenses:
      "Hirosaki Castle festival ticket 520 • Row-boat & snacks 3,000 • JR-Pass 5,714 • Hotel 18,000",
    cost: "27,234",
  },
  {
    date: "May 5",
    expenses:
      "Ghibli Clock drinks 2,000 • Local metro 1,000 • JR-Pass 5,714 • Hotel 25,000",
    cost: "33,714",
  },
  {
    date: "May 6",
    expenses: "Haneda monorail 1,300 • Souvenirs 5,000 • JR-Pass 5,714",
    cost: "12,014",
  },
];

// Trip totals
const tripTotals = [
  {
    item: "Accommodation (13 nights)",
    yen: "299,000",
    usd: "2,090",
  },
  {
    item: "JR Pass (14 d)",
    yen: "80,000",
    usd: "560",
  },
  {
    item: "Metro/other transport",
    yen: "~8,200",
    usd: "57",
  },
  {
    item: "Activities & entry fees",
    yen: "~35,420",
    usd: "248",
  },
  {
    item: "Food & drinks (listed items only)",
    yen: "22,000",
    usd: "154",
  },
  {
    item: "Trip total",
    yen: "≈ 425,500",
    usd: "≈ 2,975",
    isTotal: true,
  },
];

// Budget tweaks
const budgetTweaks = [
  {
    swap: "Stay in hostels or capsules (¥6-8k) instead of business hotels",
    impact: "-¥17k/night",
  },
  {
    swap: "Drop the JR Pass and buy individual tickets only Tokyo→Kyoto→Hiroshima→Aomori→Tokyo (≈ ¥66k)",
    impact: "-¥14k",
  },
  {
    swap: "Night buses (Tokyo→Kyoto, Kyoto→Onomichi, Hiroshima→Aomori)",
    impact: "-¥25k but costs sleep",
  },
  {
    swap: "Luxury splurge (ryokan in Kyoto + fancy sushi)",
    impact: "+¥30-50k",
  },
];

const JapanItinerary = () => {
  const [selectedDay, setSelectedDay] = useState(itineraryData[0]);
  const [photoUploads, setPhotoUploads] = useState([]);
  const [trackingEnabled, setTrackingEnabled] = useState(false);
  const [completedActivities, setCompletedActivities] = useState({});
  const [currentLocation, setCurrentLocation] = useState({
    lat: 35.6895, // Default to Tokyo coordinates
    lng: 139.6917,
    altitude: 100,
    lastUpdated: new Date().toLocaleString(),
  });
  const [mapZoom, setMapZoom] = useState(12);

  // Simulate getting location from Polarsteps
  const updateLocation = (lat, lng, altitude) => {
    setCurrentLocation({
      lat,
      lng,
      altitude,
      lastUpdated: new Date().toLocaleString(),
    });
  };

  // Calculate completion percentage
  const totalActivities = itineraryData.length;
  const completedCount = Object.keys(completedActivities).filter(
    (key) => completedActivities[key]
  ).length;
  const completionPercentage = Math.round(
    (completedCount / totalActivities) * 100
  );

  const toggleActivity = (date) => {
    setCompletedActivities({
      ...completedActivities,
      [date]: !completedActivities[date],
    });
  };

  const handlePhotoUpload = () => {
    // In a real app, this would open a file picker
    // For demo purposes, we'll add a placeholder
    const newPhoto = {
      id: Date.now(),
      date: selectedDay.date,
      location: selectedDay.base,
      url: `/api/placeholder/400/300?text=${selectedDay.base}`,
      caption: `Photo from ${selectedDay.base}`,
    };

    setPhotoUploads([newPhoto, ...photoUploads]);
  };

  useEffect(() => {
    const fetchAndUpdate = async () => {
      try {
        const res = await fetch(
          "https://location-tracker.seanwessmith.workers.dev/api/latest-location"
        );
        if (!res.ok) {
          console.warn("Location fetch failed:", res.status);
          return;
        }
        const { latitude, longitude, altitude } = await res.json();
        updateLocation(latitude, longitude, altitude);
      } catch (err) {
        console.error("Error fetching location:", err);
      }
    };

    // fire immediately
    fetchAndUpdate();
  }, []);

  const handleZoomChange = (newZoom) => {
    setMapZoom(newZoom);
  };

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Japan Golden Week Adventure</h1>
        <p className="text-lg text-gray-600">
          14 days of Miyazaki-flavored whimsy, riverside bike rides, late-bloom
          sakura, and bullet-train speed
        </p>
      </header>

      <Alert variant="destructive" className="mb-8">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle className="text-lg font-bold">
          Golden Week Alert (April 29 – May 5, 2025)
        </AlertTitle>
        <AlertDescription>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>
              Expect sold-out trains and hotels during Golden Week holiday
            </li>
            <li>
              JR Pass (¥80,000) only pays off for long shinkansen journeys
            </li>
            <li>Book shinkansen seats for April 29 & May 2 now</li>
            <li>
              Pre-book Shimanami Kaidō bikes from Giant Store before holiday
              crush
            </li>
          </ul>
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CalendarDays className="mr-2 h-5 w-5" />
                Days at a Glance
              </CardTitle>
              <CardDescription>Click on a day to see details</CardDescription>
            </CardHeader>
            <CardContent className="overflow-auto max-h-96">
              <div className="space-y-2">
                {itineraryData.map((day, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedDay(day)}
                    className={`w-full text-left p-3 rounded-md transition-colors ${
                      selectedDay.date === day.date
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{day.date}</span>
                      {day.isHoliday && (
                        <Badge variant="outline" className="bg-red-100">
                          {day.holidayName}
                        </Badge>
                      )}
                    </div>
                    <div className="text-sm mt-1 flex items-center">
                      <MapPin className="h-3 w-3 mr-1 inline" /> {day.base}
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{selectedDay.date}</CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    Base: {selectedDay.base}
                    {selectedDay.isHoliday && (
                      <Badge className="ml-2 bg-red-100 text-red-800">
                        {selectedDay.holidayName}
                      </Badge>
                    )}
                  </CardDescription>
                </div>
                {selectedDay.highlight && (
                  <Badge
                    variant="secondary"
                    className="bg-amber-100 text-amber-800"
                  >
                    Key Booking Required
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose">
                <h3 className="text-lg font-medium flex items-center mb-3">
                  <Info className="h-5 w-5 mr-2" />
                  Daily Plan
                </h3>
                <p>{selectedDay.plan}</p>

                {selectedDay.date === "Tue 29 Apr" && (
                  <div className="mt-4 p-3 bg-amber-50 rounded-md">
                    <p className="text-sm font-medium text-amber-800">
                      Pre-book your Ghibli Park tickets early! If unavailable,
                      consider the alternatives in the Ghibli Experience tab
                      below.
                    </p>
                  </div>
                )}

                {selectedDay.date === "Fri 2 May" && (
                  <div className="mt-4 p-3 bg-amber-50 rounded-md">
                    <p className="text-sm font-medium text-amber-800">
                      Reserve your Shimanami Kaidō bike online and arrange
                      luggage delivery to your next accommodation.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs defaultValue="fullitinerary" className="mb-8">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="fullitinerary">Full Itinerary</TabsTrigger>
          <TabsTrigger value="budget">Budget</TabsTrigger>
          <TabsTrigger value="tracker">Trip Tracker</TabsTrigger>
          <TabsTrigger value="ghibli">Ghibli Experiences</TabsTrigger>
          <TabsTrigger value="logistics">Logistics</TabsTrigger>
          <TabsTrigger value="alternatives">Alternatives</TabsTrigger>
        </TabsList>

        <TabsContent value="fullitinerary">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Map className="mr-2 h-5 w-5" />
                Complete Day-by-Day Itinerary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <div className="min-w-full">
                  <div className="grid grid-cols-12 bg-gray-100 p-3 font-medium rounded-t-lg">
                    <div className="col-span-2">Date</div>
                    <div className="col-span-2">Base</div>
                    <div className="col-span-8">Plan</div>
                  </div>

                  <div className="divide-y">
                    {itineraryData.map((day, index) => (
                      <div
                        key={index}
                        className={`grid grid-cols-12 p-3 ${
                          day.isHoliday ? "bg-red-50" : ""
                        }`}
                      >
                        <div className="col-span-2 font-medium">
                          {day.date}
                          {day.isHoliday && (
                            <div className="text-xs text-red-600">
                              {day.holidayName}
                            </div>
                          )}
                        </div>
                        <div className="col-span-2">{day.base}</div>
                        <div className="col-span-8">
                          {day.plan}
                          {day.highlight && (
                            <Badge
                              variant="outline"
                              className="ml-2 bg-amber-100"
                            >
                              Book ahead
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="budget">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="mr-2 h-5 w-5" />
                Trip Budget (Single Traveler, Mid-Range)
              </CardTitle>
              <CardDescription>
                Cost breakdown in Japanese yen (¥) with USD equivalents at ¥143
                = US$1
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Daily breakdown */}
                <div>
                  <h3 className="text-lg font-medium mb-3">
                    Daily Cost Breakdown
                  </h3>
                  <div className="overflow-x-auto">
                    <div className="min-w-full">
                      <div className="grid grid-cols-12 bg-gray-100 p-3 font-medium rounded-t-lg">
                        <div className="col-span-2">Date</div>
                        <div className="col-span-8">Key Expenses</div>
                        <div className="col-span-2 text-right">Cost (¥)</div>
                      </div>

                      <div className="divide-y">
                        {dailyBudget.map((day, index) => (
                          <div key={index} className="grid grid-cols-12 p-3">
                            <div className="col-span-2 font-medium">
                              {day.date}
                            </div>
                            <div className="col-span-8">{day.expenses}</div>
                            <div className="col-span-2 text-right font-medium">
                              ¥{day.cost}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Trip totals */}
                <div>
                  <h3 className="text-lg font-medium mb-3">Grand Totals</h3>
                  <div className="overflow-x-auto">
                    <div className="min-w-full">
                      <div className="grid grid-cols-12 bg-gray-100 p-3 font-medium rounded-t-lg">
                        <div className="col-span-8">Category</div>
                        <div className="col-span-2 text-right">Yen (¥)</div>
                        <div className="col-span-2 text-right">USD ($)</div>
                      </div>

                      <div className="divide-y">
                        {tripTotals.map((item, index) => (
                          <div
                            key={index}
                            className={`grid grid-cols-12 p-3 ${
                              item.isTotal ? "bg-blue-50 font-bold" : ""
                            }`}
                          >
                            <div className="col-span-8">{item.item}</div>
                            <div className="col-span-2 text-right">
                              ¥{item.yen}
                            </div>
                            <div className="col-span-2 text-right">
                              ${item.usd}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Budget tweaks */}
                <div>
                  <h3 className="text-lg font-medium mb-3">
                    Budget Modification Options
                  </h3>
                  <Card>
                    <CardContent className="p-4">
                      <div className="overflow-x-auto">
                        <div className="min-w-full">
                          <div className="grid grid-cols-12 bg-gray-100 p-3 font-medium rounded-t-lg">
                            <div className="col-span-9">Modification</div>
                            <div className="col-span-3 text-right">Impact</div>
                          </div>

                          <div className="divide-y">
                            {budgetTweaks.map((tweak, index) => (
                              <div
                                key={index}
                                className="grid grid-cols-12 p-3"
                              >
                                <div className="col-span-9">{tweak.swap}</div>
                                <div
                                  className={`col-span-3 text-right font-medium ${
                                    tweak.impact.startsWith("-")
                                      ? "text-green-600"
                                      : "text-amber-600"
                                  }`}
                                >
                                  {tweak.impact}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 text-sm text-gray-500 italic">
                        All numbers are ballpark averages gathered from current
                        2025 price lists and Japan-Guide or official operator
                        pages; real-life costs swing with booking lead-time,
                        exchange rates, hotel class, and appetite.
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tracker">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Navigation className="mr-2 h-5 w-5" />
                Trip Tracker & Photos
              </CardTitle>
              <CardDescription>
                Track your journey, upload photos, and check off completed
                activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Live Location Map Panel */}
                <Card className="lg:row-span-2">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <Map className="mr-2 h-4 w-4" />
                      Live Location Tracker
                    </CardTitle>
                    <CardDescription>
                      {/* Current location: {currentLocation.locationName} */}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Map Display */}
                      <div className="relative w-full h-80 bg-gray-100 rounded-md overflow-hidden">
                        <LocationMap
                          currentLocation={currentLocation}
                          mapZoom={mapZoom}
                          onZoomChange={handleZoomChange}
                        />
                        <p>altitude: {currentLocation.altitude}</p>
                      </div>

                      {/* Location Controls */}
                      <div className="space-y-3">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-500">
                            Last updated: {currentLocation.lastUpdated}
                          </span>
                          <span className="flex items-center">
                            <Switch
                              id="live-tracking"
                              checked={trackingEnabled}
                              onCheckedChange={setTrackingEnabled}
                            />
                            <Label htmlFor="live-tracking" className="ml-2">
                              Auto-update
                            </Label>
                          </span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              setMapZoom(Math.min(mapZoom + 2, 18))
                            }
                          >
                            Zoom In
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setMapZoom(Math.max(mapZoom - 2, 6))}
                          >
                            Zoom Out
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Completion Checklist */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Trip Progress
                    </CardTitle>
                    <CardDescription>
                      {completedCount} of {totalActivities} days completed
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <Progress value={completionPercentage} className="h-2" />
                      <p className="text-sm mt-1 text-right">
                        {completionPercentage}% complete
                      </p>
                    </div>

                    <div className="max-h-64 overflow-y-auto pr-2">
                      {itineraryData.map((day, index) => (
                        <div
                          key={index}
                          className="flex items-center py-2 border-b border-gray-100 last:border-0"
                        >
                          <div className="flex-1">
                            <div className="font-medium">{day.date}</div>
                            <div className="text-sm text-gray-500">
                              {day.base}
                            </div>
                          </div>
                          <div className="ml-4">
                            <Switch
                              id={`day-${index}`}
                              checked={!!completedActivities[day.date]}
                              onCheckedChange={() => toggleActivity(day.date)}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Photo Upload Section */}
              <div className="mt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">Trip Photos</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center"
                    onClick={handlePhotoUpload}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Photo
                  </Button>
                </div>

                {photoUploads.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                    {photoUploads.map((photo) => (
                      <div
                        key={photo.id}
                        className="bg-white rounded-md overflow-hidden shadow-sm"
                      >
                        <img
                          src={photo.url}
                          alt={photo.caption}
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-3">
                          <div className="text-sm font-medium">
                            {photo.date} - {photo.location}
                          </div>
                          <div className="text-sm text-gray-500 mt-1">
                            {photo.caption}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-md p-8 text-center">
                    <Camera className="h-10 w-10 mx-auto text-gray-400 mb-2" />
                    <h4 className="text-gray-600 font-medium mb-1">
                      No photos yet
                    </h4>
                    <p className="text-sm text-gray-500 mb-4">
                      Upload photos to create a visual journey of your trip
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center mx-auto"
                      onClick={handlePhotoUpload}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add First Photo
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="logistics">
          <CardContent>
            <div className="overflow-x-auto">
              <div className="min-w-full">
                <div className="grid grid-cols-12 bg-gray-100 p-3 font-medium rounded-t-lg">
                  <div className="col-span-3">Experience</div>
                  <div className="col-span-3">Location</div>
                  <div className="col-span-6">
                    Why it scratches the Miyazaki itch
                  </div>
                </div>

                <div className="divide-y">
                  {ghibliAlternatives.map((alt, index) => (
                    <div key={index} className="grid grid-cols-12 p-3">
                      <div className="col-span-3 font-medium">
                        {alt.experience}
                      </div>
                      <div className="col-span-3">{alt.spot}</div>
                      <div className="col-span-6">{alt.details}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </TabsContent>

        <TabsContent value="logistics">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Wallet className="mr-2 h-5 w-5" />
                Quick Logistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {logistics.map((item, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardHeader className="p-4 bg-gray-50">
                      <CardTitle className="text-base">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <p className="text-sm">{item.detail}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alternatives">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Map className="mr-2 h-5 w-5" />
                Tweaks & Departures
              </CardTitle>
              <CardDescription>
                Alternative plans for customizing your trip
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {alternativePlans.map((plan, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>{plan.title}</AccordionTrigger>
                    <AccordionContent>{plan.detail}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default JapanItinerary;
