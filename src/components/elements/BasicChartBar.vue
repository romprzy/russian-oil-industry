<template>
  <canvas ref="barElement" />
</template>

<script setup lang="ts">
import Chart from 'chart.js/auto'
import { computed, onMounted, ref } from 'vue'
import vuetify from '../../plugins/vuetify'

interface IChartItem {
  [key: string | number]: string | number
}
export interface IBasicChartProps {
  chartData: object
}

const props = defineProps<IBasicChartProps>()

const barElement = ref()
const type = 'bar'

// const labels = computed(() => props.items.map(row => row[props.labelKey]))

const current = computed(() => vuetify.theme.current.value)
const colors = computed(() => current.value?.colors)


onMounted(() => {
  const element = barElement.value
  // const element = document.getElementById('barElement')
  console.log('element', element)
  new Chart(
    element,
    {
      type,
      data: props.chartData,
      options: {
        maintainAspectRatio: false,
        // animation: {
        //   duration: 500,
        //   easing: 'easeOutQuart',
        //   onComplete: function () {
        //     var ctx = this.chart.ctx
        //     ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontFamily, 'normal', Chart.defaults.global.defaultFontFamily)
        //     ctx.textAlign = 'center'
        //     ctx.textBaseline = 'bottom'
        //
        //     this.data.datasets.forEach(function (dataset) {
        //       for (var i = 0; i < dataset.data.length; i++) {
        //         var model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model,
        //           scale_max = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._yScale.maxHeight
        //         ctx.fillStyle = '#444'
        //         var y_pos = model.y - 5
        //         // Make sure data value does not get overflown and hidden
        //         // when the bar's value is too close to max value of scale
        //         // Note: The y value is reverse, it counts from top down
        //         if ((scale_max - model.y) / scale_max >= 0.93)
        //           y_pos = model.y + 20
        //         ctx.fillText(dataset.data[i], model.x, y_pos)
        //       }
        //     })
        //   },
        // },
        // scales: {
        //   y: {
        //     ticks: {
        //       // Include a dollar sign in the ticks
        //       callback: function(value, index, ticks) {
        //         return '$' + value
        //       },
        //     },
        //   },
        // },
        // plugins: {
        //   title: {
        //     display: true,
        //     text: 'Release Year of Web Frameworks',
        //     color: 'blue',
        //     font: {
        //       weight: 'bold',
        //       size: 24,
        //     },
        //   },
        //   datalabels: {
        //     // Position of the labels
        //     // (start, end, center, etc.)
        //     anchor: 'end',
        //     // Alignment of the labels
        //     // (start, end, center, etc.)
        //     align: 'end',
        //     // Color of the labels
        //     color: 'white',
        //     font: {
        //       weight: 'bold',
        //     },
        //     formatter: function (value, context) {
        //       // Display the actual data value
        //       return value
        //     },
        //   },
        // },
      },
    },
  )
})
</script>
