<template>
  <canvas ref="canvasRef" style="height: 100% !important; width: 100% !important;" />
</template>

<script setup lang="ts">
import Chart from 'chart.js/auto'
import { computed, onMounted, ref } from 'vue'
import vuetify from '../../plugins/vuetify'

interface IChartItem {
  [key: string | number]: string | number
}
export interface IBasicChartProps {
  items: [IChartItem]
  type: 'bar' | 'pie'
  label?: string
  title?: string
  labels?: (number | string)[]
  labelKey: number | string
  valueKey: number | string
}

const props = defineProps<IBasicChartProps>()

const canvasRef = ref()

const labels = computed(() => props.items.map(row => row[props.labelKey]))

// const colorNames = [
//   // 'background',
//   // 'surface',
//   // 'surface-bright',
//   // 'surface-light',
//   // 'surface-variant',
//   'primary',
//   'primary-darken-1',
//   'secondary',
//   'secondary-darken-1',
//   'error',
//   'info',
//   'success',
//   'warning',
// ]

const current = computed(() => vuetify.theme.current.value)
// const colors = computed(() => colorNames.map(name => current.value?.colors[name]))

const colors = ['#ea5545', '#f46a9b', '#ef9b20', '#edbf33', '#ede15b', '#bdcf32', '#87bc45', '#27aeef', '#b33dc6']

onMounted(() => {
  const element = canvasRef.value
  console.log('element', element)
  new Chart(
    element,
    {
      type: props.type,
      data: {
        labels: labels.value,
        // yLabels: ['ppp'],
        // xLabels: props.items.map(row => row[props.labelKey]),
        datasets: [
          {
            label: props.label || '',
            borderWidth: 1,
            backgroundColor: colors,
            data: props.items.map(row => row[props.valueKey]),
          },
        ],
      },
      options: {
        // font: {
        //   size: 50,
        // },
        plugins: {
          title: {
            font: {
              size: 28,
              weight: 300,
            },
            text: props.title,
            display: true,
          },
          legend: {
            display: true,
            labels: {
              font: {
                size: props.type === 'bar' ? 24 : 16,
              },
              boxWidth: props.type === 'bar' ? 0 : undefined,
            },
          },
          // tooltip: true,
        },
        // elements: {
        //   bar: {
        //     backgroundColor: 'red',
        //   },
        // },
      },
    },
  )
})
</script>
