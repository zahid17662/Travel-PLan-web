# Travel Plan ✈️🗺️

> Next-Generation Collaborative Travel Workspace & Itinerary Planner matching the Paper design system.

Built with **React 19**, **TypeScript**, **Vite**, **Tailwind CSS v4**, **TanStack Query**, **Zustand**, **dnd-kit**, and **Leaflet**.

---

## 🌟 Key Features

### 1. Landing & Marketing Experience (`/`)

- **Interactive Hero & Showcase**: Real-time feature preview tabs (Timeline & Transit, Interactive Map, Expense Splits).
- **Social Proof**: Verified customer reviews with toggleable review expansion, press quotes, and live stats strip.
- **Responsive Navigation**: Adaptive header with mobile drawer and quick access to auth and trips.

### 2. Authentication (`/login`, `/signup`, `/forgot-password`)

- **Split-Screen Layout**: Immersive destination imagery alongside validated forms.
- **React Hook Form + Zod**: Schema validation (email formatting, 8+ character password, required terms).
- **Mock Auth Service**: LocalStorage persistence, session state management, and protected routes.

### 3. My Trips Dashboard (`/trips`)

- **Categorized Tabs**: Filter itineraries by _Upcoming_, _Past_, and _Drafts_ with real-time counters.
- **Upcoming Countdown**: Banner highlighting next departure with live day/hour countdown.
- **Create Trip Modal**: Autocomplete destination selector, date range picker, and email tripmate chip invites.

### 4. Trip Planner Shell (`/trips/:tripId`)

- **Interactive Split View**: Dual-pane workflow with tabbed left panel and synced right-hand Leaflet map.
- **Mobile Sheet Map**: On screens `< 1024px`, the map seamlessly transforms into an interactive bottom sheet.
- **7-Day Color Pin System**: Unique high-contrast color pins per day with numbered stop badges and route polylines.
- **Itinerary Planning (dnd-kit)**:
  - Drag-and-drop stop reordering within days and moving stops between days.
  - Automatic transit time chips calculating walking and metro estimates between stops.
  - One-click **"Optimize route"** nearest-neighbor ordering.
  - Inline note and time editors with instant undo toasts.
- **Explore Tab & AI Assistant**:
  - Filter curated spots by category (culture, food, scenic).
  - Quick-prompt AI assistant suggesting tailored itinerary stops with one-click "Add all to trip".
- **Reservations & Bookings**:
  - Multi-type management: Flights, Hotels, Restaurants, Rental Cars, Rail Tickets, and Activities.
  - Import-by-email card with copyable address.
- **Budget & Debt Minimization**:
  - Category donut chart powered by Recharts.
  - Expense split tracking per member.
  - **Settle Up Engine**: Computes the optimal minimum transactions to square debts between tripmates.
- **Collaborative Checklists**:
  - Multi-list support (Packing, Documents, Logistics) with progress bars and assignee tags.
  - Canned "AI generate packing list" generator.

### 5. Expert Guides (`/guides` & `/guides/:guideId`)

- Curated itineraries by travel insiders (Kyoto, Tokyo, Amalfi Coast, Paris).
- **"Use this guide"**: Automatically clones all curated stops into a new trip, distributes them across days, and opens the planner.

### 6. Hotels & Stays (`/hotels`)

- Real-time search by city and date range.
- Working price range slider ($100–$600/night) and star rating filters (3★, 4★, 5★).
- **List / Map Toggle**: Interactive Leaflet map with custom price-tag markers (`$price`) and popups.

### 7. Profile & Settings (`/profile`)

- Editable user bio, avatar selector, location, and account stats.
- Currency selector (USD, EUR, GBP, JPY, CAD, AUD) and Language selector.
- 4 notification preference switches and Pro Membership modal trigger.

### 8. System Primitives & Reliability

- **Design Styleguide (`/styleguide`)**: Component showcase for tokens, buttons, inputs, tabs, and overlays.
- **Offline Banner**: Automatic network detection alerting users when connection drops and confirming sync upon reconnect.
- **Error Boundary**: Graceful crash recovery with reload and safe return to dashboard.
- **Route Code Splitting**: All pages lazy-loaded via `React.lazy` and `Suspense` with skeleton loading states.

---

## 🎨 Design System & Accessibility

- **Primary Color**: `#bce784` (Light Lime). **Rule**: Always dark text (`text-neutral-900`) on primary fills for WCAG 2.1 AA compliance.
- **Focus Indicators**: Universal keyboard navigation support with high-contrast `:focus-visible` rings.
- **Accessibility**: Semantic HTML, ARIA dialog roles, live announcer regions for toasts (`aria-live="polite"`), and full keyboard support (Esc to close modals, Arrow keys on tabs).
- **Strict Modularity**: Every single component and data file in `src/` is capped at `<= 150` lines.

---

## 📁 Folder Structure

```text
travel-plan/
├── src/
│   ├── app/                    # Application shell, router & global providers
│   │   ├── guards.tsx          # ProtectedRoute component
│   │   ├── providers.tsx       # QueryClient, Toasts, OfflineBanner, ErrorBoundary
│   │   └── router.tsx          # Code-split lazy routes with Suspense fallbacks
│   ├── components/             # Reusable design system primitives
│   │   ├── layout/             # MarketingLayout, AppLayout, AppTopBar, Navbar, MobileTabBar
│   │   ├── shared/             # GuideCard, HotelCard, PlaceCard, TripCard, Logo, ReviewCard
│   │   └── ui/                 # Button, Input, Modal, Tabs, Dropdown, Toast, Skeleton, etc.
│   ├── data/                   # Realistic typed mock datasets
│   ├── features/               # Domain-specific feature modules
│   │   ├── auth/               # Login, Signup, ForgotPassword forms
│   │   ├── guides/             # Guides list, detail hero, stops list
│   │   ├── hotels/             # Search bar, filters, map, results
│   │   ├── landing/            # Hero, Showcase, Features, Reviews, Press, Stats
│   │   ├── planner/            # Planner shell, MapPanel, AI, Budget, Checklists, Itinerary
│   │   ├── pricing/            # ProUpgradeModal
│   │   ├── profile/            # ProfileForm, RegionalPreferences, SettingsSections
│   │   ├── styleguide/         # Design token playgrounds
│   │   └── trips/              # TripGrid, TripCountdown, CreateTripModal
│   ├── hooks/                  # Custom React hooks (useToast, useTrip, useDebounce, etc.)
│   ├── lib/                    # Routes, formatters, utilities (cn)
│   ├── pages/                  # Thin page shells mapping to router
│   ├── services/               # Async typed API services (trips, hotels, guides, auth, ai)
│   ├── store/                  # Zustand stores (trip.store, auth.store, ui.store)
│   ├── styles/                 # Tailwind CSS v4 tokens, leaflet styles, global focus ring
│   └── types/                  # Strict TypeScript domain interfaces
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or 20+
- npm, pnpm, or yarn

### Installation

```bash
# Clone the repository and navigate into the project
cd travel-plan

# Install dependencies
npm install
```

### Running Locally

```bash
# Start the Vite development server with HMR
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Quality Assurance & Build Commands

```bash
# Type-check and build production bundle
npm run build

# Run ESLint across all source files
npm run lint

# Auto-format codebase with Prettier
npm run format
```
