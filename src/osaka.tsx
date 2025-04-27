import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Calendar, MapPin, Coffee, Utensils, Info } from "lucide-react";
import maishima from "./assets/maishima.jpg";
import knives from "./assets/knives.png";
import doguyasuji from "./assets/doguyasuji.png";
import keyhole from "./assets/keyhole.png";

export default function OsakaGuide() {
  const essentialSpots = [
    {
      name: "Dōtonbori Canal & the Glico-man sign",
      why: "Iconic night-time photo op, street-food stalls and canal cruises.",
      tip: "Go after dusk, then duck into nearby Hozenji Yokocho for lantern-lit alleys.",
      icon: <MapPin className="h-5 w-5 text-rose-500" />,
    },
    {
      name: "Osaka Castle Park",
      why: "Cherry-tree-lined moats, history museum inside the keep, and frequent open-air gigs.",
      tip: "The ¥600 main-tower ticket now includes a rooftop panorama; visit early to beat school groups.",
      icon: <MapPin className="h-5 w-5 text-rose-500" />,
    },
    {
      name: "Shinsekai & Tsutenkaku Tower",
      why: 'Retro 1950s vibe, kushikatsu (deep-fried skewers) joints everywhere, and Osaka\'s "Eiffel Tower."',
      tip: "Rub Billiken's feet on the observation deck for good luck.",
      icon: <MapPin className="h-5 w-5 text-rose-500" />,
    },
    {
      name: 'Kuromon Ichiba Market ("Osaka\'s Kitchen")',
      why: "150+ stalls grilling seafood, wagyu cubes, fresh uni & fruit.",
      tip: "Most shops close by 17:00—start hungry before lunch.",
      icon: <MapPin className="h-5 w-5 text-rose-500" />,
    },
    {
      name: "Universal Studios Japan (USJ)",
      why: "Super Nintendo World, Jujutsu Kaisen coaster (2025 limited run).",
      tip: 'Buy "Express Pass 7" if weekends; they sell out fast months ahead.',
      icon: <MapPin className="h-5 w-5 text-rose-500" />,
    },
  ];

  const offbeatGems = [
    {
      name: "Maishima Incineration Plant Tour",
      description:
        "A psychedelic waste-to-energy facility designed by Friedensreich Hundertwasser—looks like Gaudí met Willy Wonka.",
      how: "Free tours (Japanese) most weekdays; book via city website, or just photograph the exterior from Maishima Sports Island.",
      img: maishima,
      icon: <Coffee className="h-5 w-5 text-indigo-500" />,
    },
    {
      name: "Nakazakichō vintage pocket",
      description:
        "Maze of 1920s row-houses turned indie cafés, record shops & vintage fashion (think Harajuku vibes without crowds).",
      how: "Start at YAMASTORE, then café-hop; most stores open 12-20 h.",

      icon: <Coffee className="h-5 w-5 text-indigo-500" />,
    },
    {
      name: "Kamigata Ukiyo-e Museum (Namba)",
      description:
        "Tiny four-floor museum focused on Osaka's actor-portrait woodblocks—more humorous & realistic than Edo prints.",
      how: "Try the 30-min woodblock printing workshop (English OK) to make your own souvenir.",

      icon: <Coffee className="h-5 w-5 text-indigo-500" />,
    },
    {
      name: 'Doguyasuji "Kitchen-ware Street"',
      description:
        "150 m arcade packed with chef knives, takoyaki griddles & fake-food models—souvenir heaven.",
      how: "Look for Design Pocket to cast your own plastic food magnet (~¥2,500, 30 min).",
      img: knives,
      icon: <Coffee className="h-5 w-5 text-indigo-500" />,
    },
    {
      name: "Tsuruhashi Korea Town",
      description:
        "800+ stalls of kimchi, K-beauty, and yakiniku; the scent of charcoal grills fills the arcades.",
      how: "Arrive 10 – 16 h; many shops shutter after 18 h.",
      img: doguyasuji,
      icon: <Coffee className="h-5 w-5 text-indigo-500" />,
    },
    {
      name: "CupNoodles Museum Ikeda",
      description:
        "Invent your own instant-ramen flavor in Momofuku Andō's original shed.",
      how: 'Admission free; "My CupNoodles" workshop is ¥500—get a time ticket at 9:30.',
      icon: <Coffee className="h-5 w-5 text-indigo-500" />,
    },
    {
      name: "Mozu-Furuichi Kofun UNESCO tombs (Sakai)",
      description:
        "Keyhole-shaped 5th-century imperial mounds visible only from observation decks or drones—surreal cityscape.",
      how: "JR Mozu Station → 10 min walk to the 8K visitor center with aerial theater.",
      img: keyhole,
      icon: <Coffee className="h-5 w-5 text-indigo-500" />,
    },
  ];

  const events = [
    {
      date: "Now – 13 Oct 2025",
      name: "Expo 2025 Osaka, Kansai @ Yumeshima Island",
      description:
        '160+ futuristic pavilions under Sou Fujimoto\'s 2 km "Grand Ring," robots & flying-car demos. Reserve entry slot right after buying a ticket.',
      icon: <Calendar className="h-5 w-5 text-amber-500" />,
    },
    {
      date: "29 Apr – 5 May (Golden Week)",
      name: "Nakanoshima River Festa & boat-to-Expo NFT campaign",
      description:
        "Nighttime mini-fireworks, pop-up bars on bridges, and cruises straight to the Expo site.",
      icon: <Calendar className="h-5 w-5 text-amber-500" />,
    },
    {
      date: "8 – 25 May 2025",
      name: "Nakanoshima Park Rose Festival",
      description:
        "4,000 roses in bloom with craft-beer stalls and live jazz along Osaka's central sandbank.",
      icon: <Calendar className="h-5 w-5 text-amber-500" />,
    },
    {
      date: "mid-May weekends",
      name: "Utsubo Park Rose Fair",
      description:
        "Free outdoor concerts + food trucks in a former air-strip turned linear park.",
      icon: <Calendar className="h-5 w-5 text-amber-500" />,
    },
  ];

  const foodDrink = [
    {
      name: "Kushi-katsu Daruma (Shinsekai)",
      description: 'Classic deep-fried skewers; "no double-dipping" rule.',
      icon: <Utensils className="h-5 w-5 text-emerald-500" />,
    },
    {
      name: "Menya Jikon (Nishinakajima)",
      description:
        "Cult shoyu ramen with chicken-oil sheen; lines form before 11 h.",
      icon: <Utensils className="h-5 w-5 text-emerald-500" />,
    },
    {
      name: "Hozenji Mizukake‐Fudō",
      description:
        "Splash water on the moss-covered deity, then duck into Bar Nayuta (eight-seat craft-cocktail lab) upstairs.",
      icon: <Utensils className="h-5 w-5 text-emerald-500" />,
    },
    {
      name: "DD4D Osaka (Shinsaibashi)",
      description: "Experimental craft beer and fruit sours.",
      icon: <Utensils className="h-5 w-5 text-emerald-500" />,
    },
  ];

  const logistics = [
    {
      title: "Transport",
      info: "One-day Osaka Metro Pass (¥820 weekdays/¥620 weekends) usually pays for itself after 3 rides.",
      icon: <Info className="h-5 w-5 text-sky-500" />,
    },
    {
      title: "Cash vs cards",
      info: "Most small eateries & vintage shops still cash-only; Expo, USJ, and big stores accept IC cards & Apple Pay.",
      icon: <Info className="h-5 w-5 text-sky-500" />,
    },
    {
      title: "Language",
      info: 'Osaka folk are chatty—basic "ookini" (thanks) melts hearts.',
      icon: <Info className="h-5 w-5 text-sky-500" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-amber-50 p-6 font-sans">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-orange-600 mb-3">
          Osaka at a Glance
        </h1>
        <p className="text-lg text-gray-700">
          Japan's boisterous kitchen, equal parts neon city-scape, merchant
          history, and experimental pop-culture
        </p>
        <Link
          to="/tokyo"
          className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Explore Tokyo
        </Link>
      </header>

      <Tabs defaultValue="essentials" className="max-w-5xl mx-auto">
        <TabsList className="grid grid-cols-5 w-full mb-6">
          <TabsTrigger value="essentials" className="font-medium">
            Essential Stops
          </TabsTrigger>
          <TabsTrigger value="offbeat" className="font-medium">
            Offbeat Gems
          </TabsTrigger>
          <TabsTrigger value="events" className="font-medium">
            Spring Events
          </TabsTrigger>
          <TabsTrigger value="food" className="font-medium">
            Eat & Drink
          </TabsTrigger>
          <TabsTrigger value="logistics" className="font-medium">
            Logistics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="essentials" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {essentialSpots.map((spot, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-4">
                  {spot.icon}
                  <div>
                    <h3 className="font-bold text-xl text-gray-800">
                      {spot.name}
                    </h3>
                    <p className="text-gray-600 mt-2">{spot.why}</p>
                    <div className="mt-3 bg-orange-50 p-3 rounded-lg">
                      <p className="text-orange-700">
                        <span className="font-semibold">Tip:</span> {spot.tip}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="offbeat" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {offbeatGems.map((gem, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-4">
                  {gem.icon}
                  <div className="flex flex-col align-middle justify-center">
                    <h3 className="font-bold text-xl text-gray-800">
                      {gem.name}
                    </h3>
                    <p className="text-gray-600 mt-2">{gem.description}</p>
                    <div className="mt-3 bg-indigo-50 p-3 rounded-lg">
                      <p className="text-indigo-700">
                        <span className="font-semibold">How to do it:</span>{" "}
                        {gem.how}
                      </p>
                    </div>
                    <img className="mt-2 rounded w-[400px]" src={gem.img} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="events" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {events.map((event, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-4">
                  {event.icon}
                  <div>
                    <div className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium inline-block mb-2">
                      {event.date}
                    </div>
                    <h3 className="font-bold text-xl text-gray-800">
                      {event.name}
                    </h3>
                    <p className="text-gray-600 mt-2">{event.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="food" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {foodDrink.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-4">
                  {item.icon}
                  <div>
                    <h3 className="font-bold text-xl text-gray-800">
                      {item.name}
                    </h3>
                    <p className="text-gray-600 mt-2">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="logistics" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {logistics.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-4">
                  {item.icon}
                  <div>
                    <h3 className="font-bold text-xl text-gray-800">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 mt-2">{item.info}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <footer className="mt-12 text-center text-gray-500 text-sm">
        <p className="text-amber-600">Enjoy your visit to Osaka!</p>
        <p className="mt-2">Made with ♥ in 2025</p>
      </footer>
    </div>
  );
}
