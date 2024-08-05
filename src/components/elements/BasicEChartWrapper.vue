<template>
  <div class="d-flex flex-column">
    <v-container
      class="pa-1 position-relative"
      fluid
    >
      <v-row class="ma-n1">
        <v-btn
          v-for="type in chartTypes"
          :key="type"
          class="ma-1"
          density="compact"
          :icon="`mdi-chart-${type}`"
          @click="$emit('update:type', type)"
        />
      </v-row>
    </v-container>

    <!--    {{ barType }}-->

    <BasicEChart
      class="h-100"
      :legend="legend"
      :series="series"
      :type="type"
      :x-axis-data="xAxisData"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { IChartType } from './BasicEChart.vue'
interface IBasicEChartProps {
  xAxisData: (string | number)[]
  series: object[]
  legend: object,
  type: IChartType
}

const props = defineProps<IBasicEChartProps>()
defineEmits(['update:type'])

const chartTypes = [
  'bar',
  'line',
  'arc',
  'donut',
  'bubble',
]

// const barType = ref<IChartType>('line')
</script>
