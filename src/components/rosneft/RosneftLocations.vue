<template>
  <h2>{{ dataset.name }}</h2>ddd
  <pre>{{ locations.map(({ name }) => name) }}</pre>
  <div
    v-for="(point, index) in dataset.points"
    :key="point.name"
  >
    {{ index + 1 }}. {{ point.name }} <span class="text-caption ml-4">({{ point.lat }}, {{ point.lng }})</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
export interface RosneftLocationsProps {
  lang: ['en', 'ru'],
  locations: object,
}

const props = defineProps<RosneftLocationsProps>()

const oilRefiningName = computed(() => {
  if (props.lang === 'en') return 'Oil refining and petrochemical industry'
  if (props.lang === 'ru') return 'Нефтепереработка и нефтехимия'
  return
})

const dataset = computed(() => {
  const item = props.locations.find(({ name }) => name === oilRefiningName.value)
  return {
    ...item,
    points: item.points.map(point => ({
      ...point,
      name: point.name?.replace(`${oilRefiningName.value}.`, ''),
    })),
  }
})
</script>
