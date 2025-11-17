# EnviroMetrics

A modern environmental monitoring dashboard for precision industrial processes. Track weather conditions across multiple locations with real-time data visualization and comprehensive metrics.

## Features

- **Multi-Location Monitoring**: Track weather conditions across multiple industrial locations
- **Real-time Data**: Live weather data updates using Open-Meteo API
- **Comprehensive Metrics**: Temperature, humidity, pressure, precipitation, and wind speed monitoring
- **Responsive Design**: Optimized for desktop and mobile devices
- **Modern UI**: Built with Vue 3, TypeScript, Tailwind CSS, and DaisyUI
- **Data Visualization**: Interactive charts and grids for hourly weather trends

## Technology Stack

- **Frontend**: Vue 3 with Composition API
- **Language**: TypeScript
- **Styling**: Tailwind CSS + DaisyUI
- **State Management**: Pinia
- **Build Tool**: Vite
- **API**: Open-Meteo Weather API

## Quick Start

### Prerequisites

- Node.js (v18 or higher)
- Bun package manager

### Installation

```sh
bun install
```

### Development

```sh
bun dev
```

The application will be available at `http://localhost:5173`

### Production Build

```sh
bun run build
```

## Project Structure

```
src/
├── components/          # Vue components
│   ├── LocationCard.vue # Location selection cards
│   ├── WeatherCard.vue  # Current weather display
│   ├── MetricsGrid.vue  # Hourly data grid
│   └── StatsCard.vue    # Statistics cards
├── stores/              # Pinia stores
│   └── weatherStore.ts  # Weather data management
├── assets/              # Static assets
└── App.vue             # Main application component
```

## API Integration

The application integrates with the Open-Meteo API to fetch:
- Current weather conditions
- Hourly forecasts (24-hour history)
- Multiple location data points

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Browser DevTools

- [Vue.js devtools](https://devtools.vuejs.org/) for debugging
- Enable Custom Object Formatter in browser devtools

## License

MIT License

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
bun test:unit
```

### Run End-to-End Tests with [Playwright](https://playwright.dev)

```sh
# Install browsers for the first run
npx playwright install

# When testing on CI, must build the project first
bun run build

# Runs the end-to-end tests
bun test:e2e
# Runs the tests only on Chromium
bun test:e2e --project=chromium
# Runs the tests of a specific file
bun test:e2e tests/example.spec.ts
# Runs the tests in debug mode
bun test:e2e --debug
```

### Lint with [ESLint](https://eslint.org/)

```sh
bun lint
```
