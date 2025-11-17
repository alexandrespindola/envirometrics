<script lang="ts" setup>
interface Props {
  title: string
  value: string | number
  description?: string
  icon?: string
}

withDefaults(defineProps<Props>(), {
  description: '',
  icon: 'chart',
})
</script>

<template>
  <div class="stats shadow bg-base-100">
    <div class="stat">
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
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
      </div>
      <div class="stat-title">{{ title }}</div>
      <div class="stat-value text-primary">{{ value }}</div>
      <div class="stat-desc" v-if="description">{{ description }}</div>
    </div>
  </div>
</template>
