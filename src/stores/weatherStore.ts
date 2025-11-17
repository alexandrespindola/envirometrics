import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

interface Location {
  id: number
  name: string
  country: string
  lat: number
  lon: number
  description: string
}

interface CurrentWeather {
  temperature: number
  humidity: number
  apparentTemp: number
  precipitation: number
  pressure: number
  windSpeed: number
  time: string
}

interface HourlyData {
  time: string
  temperature: number
  humidity: number
  pressure: number
}

export const useWeatherStore = defineStore('weather', () => {
  const locations = ref([
    {
      id: 1,
      name: 'Cologne',
      country: 'Germany',
      lat: 50.94,
      lon: 6.95,
      description: 'Cultural & Economic Center',
    },
    {
      id: 2,
      name: 'Gaggenau',
      country: 'Germany',
      lat: 48.79,
      lon: 8.32,
      description: 'Laser Technology',
    },
    {
      id: 3,
      name: 'Neu-Isenburg',
      country: 'Germany',
      lat: 50.05,
      lon: 8.7,
      description: '3D Metrology',
    },
    {
      id: 4,
      name: 'Stuttgart',
      country: 'Germany',
      lat: 48.78,
      lon: 9.18,
      description: 'Industrial Center',
    },
    {
      id: 5,
      name: 'Munich',
      country: 'Germany',
      lat: 48.14,
      lon: 11.58,
      description: 'Technology Hub',
    },
    {
      id: 6,
      name: 'Barcelona',
      country: 'Spain',
      lat: 41.39,
      lon: 2.15,
      description: 'Remote Office Location',
    },
    {
      id: 7,
      name: 'Berlin',
      country: 'Germany',
      lat: 52.52,
      lon: 13.4,
      description: 'Capital & Tech Hub',
    },
    {
      id: 8,
      name: 'Frankfurt',
      country: 'Germany',
      lat: 50.11,
      lon: 8.68,
      description: 'Financial & Data Center',
    },
  ])

  const selectedLocation = ref<Location | null>(null)
  const currentWeather = ref<CurrentWeather | null>(null)
  const hourlyData = ref<HourlyData[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  //Getters
  const hasData = computed(() => currentWeather.value !== null)

  const averageTemperature = computed(() => {
    if (hourlyData.value.length === 0) return 0
    const temps = hourlyData.value.slice(0, 24) // Last 24h
    const sum = temps.reduce((acc, item) => acc + item.temperature, 0)
    return (sum / temps.length).toFixed(1)
  })

  const averageHumidity = computed(() => {
    if (hourlyData.value.length === 0) return 0
    const humidities = hourlyData.value.slice(0, 24)
    const sum = humidities.reduce((acc, item) => acc + item.humidity, 0)
    return (sum / humidities.length).toFixed(0)
  })

  // Actions
  async function fetchWeatherData(location: Location) {
    loading.value = true
    error.value = null

    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,pressure_msl,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,pressure_msl&timezone=Europe/Berlin`

      const response = await fetch(url)

      if (!response.ok) {
        throw new Error('Failed to fetch weather data')
      }

      const data = await response.json()

      // Process data
      currentWeather.value = {
        temperature: data.current.temperature_2m,
        humidity: data.current.relative_humidity_2m,
        apparentTemp: data.current.apparent_temperature,
        precipitation: data.current.precipitation,
        pressure: data.current.pressure_msl,
        windSpeed: data.current.wind_speed_10m,
        time: data.current.time,
      }

      // Process hourly data (last 24h)
      hourlyData.value = data.hourly.time.slice(0, 24).map((time: string, index: string) => ({
        time,
        temperature: data.hourly.temperature_2m[index],
        humidity: data.hourly.relative_humidity_2m[index],
        pressure: data.hourly.pressure_msl[index],
      }))
    } catch (e: unknown) {
      error.value = e instanceof Error ? e.message : 'Unknown error occurred'
      console.error('Weather fetch error:', e)
    } finally {
      loading.value = false
    }
  }

  function selectLocation(location: Location) {
    selectedLocation.value = location
    fetchWeatherData(location)
  }

  return {
    locations,
    selectedLocation,
    currentWeather,
    hourlyData,
    loading,
    error,
    hasData,
    averageTemperature,
    averageHumidity,
    selectLocation,
    fetchWeatherData,
  }
})
