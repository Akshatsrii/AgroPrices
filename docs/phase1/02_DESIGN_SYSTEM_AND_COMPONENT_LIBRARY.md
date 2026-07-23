# 🌾 AgroPrice AI — Phase 1: Design System & Component Library

## 1. Color Palette Tokens

### Primary Brand Colors (Agriculture & Growth Theme)
- **Emerald Primary**: `#16a34a` (`hsl(142, 76%, 36%)`) — Main action buttons, active navigation, trust badges.
- **Emerald Hover**: `#15803d` (`hsl(142, 72%, 29%)`) — Interactive hover states.
- **Forest Dark**: `#052e16` (`hsl(143, 75%, 10%)`) — Headers, high-contrast dark backgrounds.
- **Sun Gold Accent**: `#eab308` (`hsl(48, 96%, 53%)`) — AI Decision Score highlight, star ratings, alert banners.

### Functional Status Colors
- **Success Green**: `#22c55e` (`hsl(142, 71%, 45%)`) — High AI score (80-100), positive profit margin.
- **Warning Amber**: `#f59e0b` (`hsl(38, 92%, 50%)`) — Moderate score (50-79), hold 3-5 days recommendation.
- **Danger Red**: `#ef4444` (`hsl(0, 84%, 60%)`) — Low score (<50), falling price warning, negative net profit.
- **Info Sky Blue**: `#0284c7` (`hsl(199, 89%, 48%)`) — Distance markers, logistics updates.

### Surface & Background Tokens
- **Canvas Light**: `#f8fafc` — High readability daylight UI.
- **Card Glass Surface**: `rgba(255, 255, 255, 0.85)` with `backdrop-filter: blur(12px)` — Modern glassmorphism card containers.
- **Dark Surface**: `#0f172a` — Premium night-mode & high contrast mode.

---

## 2. Typography Hierarchy (Google Fonts: Outfit & Inter)

| Hierarchy Level | Font Family | Size (px / rem) | Weight | Line Height | Usage |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Display Hero** | Outfit | 36px / 2.25rem | Bold (700) | 1.2 | Main landing headers |
| **Heading H1** | Outfit | 28px / 1.75rem | Bold (700) | 1.3 | Page title headers |
| **Heading H2** | Outfit | 22px / 1.375rem | SemiBold (600)| 1.35 | Section headers |
| **Heading H3** | Outfit | 18px / 1.125rem | Medium (500) | 1.4 | Card headers |
| **Body Large** | Inter | 16px / 1.00rem | Regular (400) | 1.5 | Primary descriptions |
| **Body Regular** | Inter | 14px / 0.875rem | Regular (400) | 1.5 | Inputs, labels |
| **Caption / Badge**| Inter | 12px / 0.75rem | Medium (500) | 1.4 | Badges, small metadata |

---

## 3. UI Component Library Architecture

### Buttons & Controls
- **Primary Button**: Full width on mobile, emerald background with shadow and subtle scale transform on press.
- **Secondary Glass Button**: White surface with emerald border and glass blur effect.
- **AI Decision Badge**: Glowing pill badge indicating Decision Score (e.g. `92/100 Great Time to Sell`).

### Input Controls
- **Number Counter Input**: Touch-friendly `+` and `-` buttons (48x48px) flanking numeric input for quick quintal adjustments on mobile.
- **Quality Card Selector**: Multi-choice visual cards with icon, quality specs, and price multiplier.
- **Mandi Search Bar**: Instant search with debounce filter for state, district, and crop commodity.

### Micro-Animations & Motion Design (Framer Motion)
- **Page Transitions**: Smooth fade-in and subtle slide-up (`y: 12 -> 0`, `opacity: 0 -> 1`).
- **AI Recommendation Reveal**: Gauge animation sweeping from 0 to target Decision Score with pulse effect on victory score.
- **Card Hover Elevation**: Lift element `-4px` on hover with dynamic shadow enhancement.
