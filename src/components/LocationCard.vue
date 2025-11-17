<script lang="ts" setup>
interface Location {
  id: number
  name: string
  country: string
  lat: number
  lon: number
  description: string
}

interface Props {
  location: Location
  isSelected?: boolean
  isLoading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isSelected: false,
  isLoading: false,
})

const emit = defineEmits<{
  select: [location: Location]
}>()

function handleClick() {
  emit('select', props.location)
}
</script>

<template>
  <div
    class="card bg-base-100 shadow-lg hover:shadow-xl transition-all cursor-pointer border-2"
    :class="{
      'border-primary': isSelected,
      'border-transparent': !isSelected,
      'opacity-50 cursor-not-allowed': isLoading && isSelected,
      'cursor-wait': isLoading && !isSelected,
    }"
    @click="!isLoading && handleClick()"
  >
    <div class="card-body p-4">
      <div class="flex items-start justify-between">
        <div class="flex-1">
          <h3 class="card-title text-lg">{{ location.name }}</h3>
          <p class="text-sm text-base-content/70">{{ location.country }}</p>
          <p class="text-xs text-base-content/60 mt-2">{{ location.description }}</p>
        </div>
        <div
          v-if="isLoading && isSelected"
          class="loading loading-spinner loading-sm text-primary"
        ></div>
      </div>
      <div class="card-actions justify-end mt-3">
        <div class="badge badge-outline badge-sm">
          {{ location.lat.toFixed(2) }}°N, {{ location.lon.toFixed(2) }}°E
        </div>
      </div>
    </div>
  </div>
</template>
