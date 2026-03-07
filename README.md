# 🌊 OceanWatch

> Real-time maritime intelligence dashboard powered by CesiumJS 3D globe visualization

![OceanWatch Dashboard](https://github.com/user-attachments/assets/e92cec26-0d3b-4d71-b77a-e084b50c0069)

## Features

- **🚢 Ship Tracking** — 50 vessels tracked across major shipping lanes (Malacca, Suez, South China Sea, English Channel, Gulf of Mexico, Pacific, Indian Ocean)
- **🔌 Submarine Cables** — 11 undersea cable routes (TAT-14, SEA-ME-WE 3, MAREA, Southern Cross, Asia-America Gateway, etc.)
- **☠️ Piracy Hotspots** — Pulsing risk zones in Gulf of Aden, Gulf of Guinea, Strait of Malacca, Strait of Hormuz, South China Sea
- **🎣 Fishing Detection** — Marine protected areas (Galápagos, Great Barrier Reef, Papahānaumokuākea, Chagos, Ross Sea) with dark vessel alerts
- **🌡️ Ocean Temperature** — Sea surface temperature gradient visualization (blue→red)
- **🌊 Marine Weather** — NOAA buoy positions with wind and wave data
- **👁️ 5 Visual Modes** — Deep Blue, Sonar, Threat View, Thermal, Satellite

## Tech Stack

- **Next.js 14** + TypeScript
- **CesiumJS** — 3D globe rendering (dynamically imported, no SSR)
- **Tailwind CSS** — Glassmorphism UI
- **Next.js API Routes** — Mock data backend

## Installation

```bash
# Clone and install dependencies
npm install

# Optional: Add API keys to .env.local
cp .env.example .env.local
# Edit .env.local with your tokens

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_CESIUM_ION_TOKEN` | Cesium Ion access token (for imagery) | Optional |
| `NEXT_PUBLIC_AIS_API_KEY` | AISstream.io API key (for live AIS data) | Optional |

The app works fully with mock data — no API keys required.

## Data Sources

The app uses realistic mock data. For production, integrate:

| Service | Data Type |
|---------|-----------|
| **AISstream.io** | Real-time AIS vessel tracking |
| **TeleGeography** | Submarine cable maps |
| **IMB Piracy Reporting Centre** | Piracy incidents |
| **NOAA** | Marine weather & ocean temperature |
| **Global Fishing Watch** | Illegal fishing detection |

## Visual Modes

| Mode | Filter Effect | Use Case |
|------|---------------|----------|
| 🌊 Deep Blue | Default | General monitoring |
| 📡 Sonar | `hue-rotate(90deg) saturate(2)` | Green monochrome |
| ⚠️ Threat View | `saturate(0.3) contrast(1.5) brightness(0.8)` | Alert situations |
| 🌡️ Thermal | `hue-rotate(180deg) saturate(1.5)` | Infrared analysis |
| 🛰️ Satellite | `saturate(1.2) brightness(1.1)` | Natural colors |

## Camera Presets

- Strait of Hormuz
- Strait of Malacca
- Gulf of Aden
- South China Sea
- English Channel
- Panama Canal
- Suez Canal

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main dashboard page
│   ├── globals.css         # Global styles & animations
│   └── api/                # Mock data API routes
├── components/
│   ├── Globe.tsx           # CesiumJS 3D globe
│   ├── Sidebar.tsx         # Layer controls
│   ├── TopBar.tsx          # Header bar
│   ├── StatsPanel.tsx      # Statistics panel
│   ├── ShipInfoPanel.tsx   # Ship detail panel
│   └── ViewModeSelector.tsx
├── hooks/
│   ├── useShipData.ts
│   ├── useLayerVisibility.ts
│   └── useVisualMode.ts
├── data/                   # Mock data files
├── types/                  # TypeScript interfaces
└── constants/              # Camera presets & visual modes
```

## License

MIT
