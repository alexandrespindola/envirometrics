<script lang="ts" setup>
import { computed } from 'vue'

interface CurrentWeather {
  temperature: number
  humidity: number
  apparentTemp: number
  precipitation: number
  pressure: number
  windSpeed: number
  time: string
}

interface Props {
  weather: CurrentWeather | null
  locationName?: string
}

const props = withDefaults(defineProps<Props>(), {
  locationName: 'Unkown',
})

const formattedTime = computed(() => {
  if (!props.weather) return ''
  const date = new Date(props.weather.time)
  return date.toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
})

const temperatureColor = computed(() => {
  if (!props.weather) return 'text-base-content'
  const temp = props.weather.temperature
  if (temp < 0) return 'text-info'
  if (temp < 15) return 'text-primary'
  if (temp < 25) return 'text-success'
  return 'text-warning'
})
</script>

<template>
  <div class="card bg-base-100 shadow-xl">
    <div class="card-body">
      <h2 class="card-title">Current Conditions</h2>
      <div v-if="!weather" class="text-center py-8">
        <p class="text-base-content/60">Select a location do view weather data</p>
      </div>
      <div v-else>
        <div class="text-sm text-base-content/70 mb-4">
          {{ locationName }} • {{ formattedTime }}
        </div>

        <!-- Main temperature -->
        <div class="stat bg-base-200 rounded-lg mb-4">
          <div class="stat-figure text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="inline-block w-8 h-8 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              ></path>
            </svg>
          </div>
          <div class="stat-title">Temperature</div>
          <div class="stat-value" :class="temperatureColor">
            {{ weather.temperature.toFixed(1) }}°C
          </div>
          <div class="stat-title">Feels like</div>
          <div class="stat-value text-2xl text-info">{{ weather.apparentTemp.toFixed(1) }}°C</div>
        </div>

        <!-- Metrics Grid -->
        <div class="grid grid-cols-2 gap-3">
          <!-- Humidity -->
          <div class="stat bg-base-200 rounded-lg p-3">
            <div class="stat-title text-xs">Humidity</div>
            <div class="stat-value text-2xl text-info">{{ weather.humidity }}</div>
          </div>

          <!-- Pressure -->
          <div class="stat bg-base-200 rounded-lg p-3">
            <div class="stat-title text-xs">Pressure</div>
            <div class="stat-value text-2xl text-secondary">{{ weather.pressure }} hPa</div>
          </div>

          <!-- Wind Speed -->
          <div class="stat bg-base-200 rounded-lg p-3">
            <div class="stat-title text-xs">Wind Speed</div>
            <div class="stat-value text-2xl text-accent">{{ weather.windSpeed }} km/h</div>
          </div>

          <!-- Precipitation -->
          <div class="stat bg-base-200 rounded-lg p-3">
            <div class="stat-title text-xs">Precipitation</div>
            <div
              class="stat-value text-2xl"
              :class="weather.precipitation > 0 ? 'text-primary' : 'text-base-content'"
            >
              {{ weather.precipitation }} mm
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
