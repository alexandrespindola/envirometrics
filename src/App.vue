<script setup lang="ts">
import { computed } from 'vue'
import { useWeatherStore } from './stores/weatherStore'
import LocationCard from './components/LocationCard.vue'
import WeatherCard from './components/WeatherCard.vue'
import MetricsGrid from './components/MetricsGrid.vue'
import StatsCard from './components/StatsCard.vue'

const store = useWeatherStore()

// Computed for dashboard statistics
const totalLocations = computed(() => store.locations.length)
const selectedLocationName = computed(() => store.selectedLocation?.name || 'No location selected')
</script>

<template>
  <div class="min-h-screen bg-base-200">
    <!-- Navbar -->
    <div class="navbar bg-base-100 shadow-lg sticky top-0 z-50">
      <div class="flex flex-row">
        <a class="flex flex-row text-xl">
          <img
            src="@/assets/img/logo.svg"
            alt="EnviroMetrics Logo"
            class="self-center h-8 w-8 mr-2"
          />
          <span class="self-center font-bold text-primary">Enviro</span>
          <span class="self-center font-normal">Metrics</span>
        </a>
        <div class="self-center hidden md:block ml-4 text-sm text-base-content/70">
          Environmental Monitoring Dashboard
        </div>
      </div>
      <div class="flex-none gap-2"></div>
    </div>

    <!-- Main Content -->
    <div class="container mx-auto p-4 md:p-6">
      <!-- Stats Overview -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatsCard
          title="Monitoring Locations"
          :value="totalLocations"
          description="Active environmental stations"
        />
        <StatsCard
          title="Avg Temperature (24h)"
          :value="store.averageTemperature + '°C'"
          description="Mean temperature reading"
        />
        <StatsCard
          title="Avg Humidity (24h)"
          :value="store.averageHumidity + '%'"
          description="Mean humidity level"
        />
      </div>

      <!-- Error State (Global) -->
      <div v-if="store.error" class="alert alert-error mb-6 shadow-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <div>
          <div class="font-bold">Error Loading Data</div>
          <div class="text-sm">{{ store.error }}</div>
        </div>
      </div>

      <!-- Main Grid Layout -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <!-- Left Column: Locations -->
        <div class="lg:col-span-4">
          <div class="mb-4">
            <h2 class="text-2xl font-bold mb-2">Locations</h2>
            <p class="text-sm text-base-content/70">
              Select a location to view environmental metrics
            </p>
          </div>

          <div class="space-y-3">
            <LocationCard
              v-for="location in store.locations"
              :key="location.id"
              :location="location"
              :isSelected="store.selectedLocation?.id === location.id"
              @select="store.selectLocation"
              :isLoading="store.loading"
            />
          </div>
        </div>

        <!-- Right Column: Weather Data -->
        <div class="lg:col-span-8">
          <!-- Empty State -->
          <div v-if="!store.selectedLocation && !store.loading" class="text-center py-20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-24 h-24 mx-auto text-base-content/30 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
              />
            </svg>
            <h3 class="text-xl font-bold text-base-content/50 mb-2">No Location Selected</h3>
            <p class="text-base-content/40">
              Choose a monitoring station from the list to view environmental data
            </p>
          </div>

          <!-- Weather Data with Loading State -->
          <div v-else class="space-y-6">
            <!-- Current Weather Card -->
            <WeatherCard
              :weather="store.currentWeather"
              :locationName="selectedLocationName"
              :isLoading="store.loading"
            />

            <!-- Metrics History Grid -->
            <MetricsGrid :hourlyData="store.hourlyData" :isLoading="store.loading" />
          </div>
        </div>
      </div>

      <!-- Footer Info -->
      <div class="mt-8 text-center text-sm text-base-content/50">
        <p>
          Data provided by
          <a href="https://open-meteo.com/" target="_blank" class="link link-primary">
            Open-Meteo API
          </a>
          • Environmental monitoring for precision industrial processes
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Smooth animation for transitions */
.space-y-3 > * {
  transition: all 0.2s ease-in-out;
}

/* Additional responsiveness */
@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }
}
</style>
