<script lang="ts" setup>
interface HourlyData {
  time: string
  temperature: number
  humidity: number
  pressure: number
}

interface Props {
  hourlyData: HourlyData[]
}

defineProps<Props>()

function formatTime(timeString: string): string {
  const date = new Date(timeString)
  return date.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

function formatDate(timeString: string): string {
  const date = new Date(timeString)
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
  })
}
</script>

<template>
  <div class="card bg-base-100 shadow-xl">
    <div class="card-body">
      <h2 class="card-title">24-Hour Metrics History</h2>
      <div v-if="hourlyData.length === 0" class="text-center py-8">
        <p class="text-base-content/60">No historical data available</p>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="table table-zebra table-sm">
          <thead>
            <tr>
              <th>Time</th>
              <th>Date</th>
              <th class="text-right">Temp (°C)</th>
              <th class="text-right">Humidity (%)</th>
              <th class="text-right">Pressure (hPa)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="data in hourlyData" :key="data.time">
              <td class="font-mono">{{ formatTime(data.time) }}</td>
              <td class="text-xs text-base-content/70">{{ formatDate(data.time) }}</td>
              <td class="text-right font-bold">
                <span
                  :class="{
                    'text-info': data.temperature < 0,
                    'text-primary': data.temperature >= 0 && data.temperature < 15,
                    'text-success': data.temperature >= 15 && data.temperature < 25,
                    'text-warning': data.temperature >= 25,
                  }"
                >
                  {{ data.temperature.toFixed(1) }}</span
                >
              </td>
              <td class="text-right">{{ data.humidity.toFixed(0) }}</td>
              <td class="text-right">{{ data.pressure.toFixed(1) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
