# 🇯🇵 Japan Golden Week Adventure 🌸

A beautifully designed, interactive React + TypeScript app showcasing a two-week travel itinerary through Japan during Golden Week (April–May 2025). Built with TailwindCSS, Radix UI, and Mapbox for location tracking.

---

## ✨ Features

- 📆 **Day-by-Day Itinerary**  
  Explore each day’s travel plan with location, highlights, and holiday tags.

- 📊 **Budget Tracker**  
  Includes daily cost breakdowns, grand totals, and savings/splurge scenarios.

- 🗺️ **Live Location Tracker**  
  Real-time GPS updates, altitude info, zoomable map via Mapbox.

- 📸 **Photo Uploader**  
  Add photos by location and day to build your personal trip journal.

- 🎫 **Ghibli-Themed Alternatives**  
  If you can't get Ghibli Museum tickets, explore nearby themed spots and experiences.

- 🧳 **Travel Logistics**  
  Get info on transit cards, baggage forwarding, data, and flight tips.

- 🔁 **Alternate Routes**  
  Suggestions for snow corridors, longer Kansai stays, or surf detours.

---

## 🗂️ Project Structure

.
├── assets/
│   └── favicon.png
├── components/ui/
│   ├── accordion.tsx
│   ├── alert.tsx
│   ├── badge.tsx
│   ├── button.tsx
│   ├── card.tsx
│   ├── input.tsx
│   ├── label.tsx
│   ├── progress.tsx
│   ├── switch.tsx
│   └── tabs.tsx
├── lib/
│   └── utils.ts
├── index.css
├── main.tsx
├── map.tsx
├── japan-one.tsx
├── japan-two.tsx
└── vite-env.d.ts

---

## 🛠 Tech Stack

- **Framework**: React + TypeScript
- **Styling**: TailwindCSS, custom theme with OKLCH colors
- **UI Library**: Radix UI + Lucide icons
- **Maps**: Mapbox GL with real-time location marker
- **State**: useState + useEffect hooks
- **Bundler**: Vite

---

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/your-username/japan-itinerary.git
cd japan-itinerary

# Install dependencies
npm install

# Run the app
npm run dev
```

⸻

📦 Build

npm run build



⸻

🔐 Environment

For the Mapbox component to work, you’ll need a public access token.

mapboxAccessToken="YOUR_MAPBOX_PUBLIC_TOKEN"

Replace it in map.tsx.

⸻

🧪 Customization

You can choose which itinerary file to use by modifying the import in main.tsx:

// Use this for the full-featured experience
import App from './japan-one.tsx'

// Or use the simplified version
// import App from './japan-two.tsx'



⸻

📸 Preview

“14 days of Miyazaki-flavored whimsy, riverside bike rides, late-bloom sakura, and bullet-train speed.”

 

⸻

🧳 Author

Sean Wesley Smith – @seanwessmith

⸻

📄 License

MIT – feel free to remix for your own travel planning needs!
