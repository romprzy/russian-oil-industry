<template>
  <div ref="chartElement" />
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import type { EChartsOption } from 'echarts'
import { computed, onMounted, ref, watch } from 'vue'
import vuetify from '../../plugins/vuetify'
import { useNumberFormatter } from '../../composables/numberFormatter'

// interface IBasicEChartProps {
//   type:
// }

const chartTypes = [
  'bar',
  'line',
  'arc',
  'donut',
  'bubble',
] as const

export type IChartType = typeof chartTypes[number]
interface IBasicEChartProps {
  type: IChartType
  xAxisData: (string | number)[]
  series: object[]
  legend?: object,
}

const props = defineProps<IBasicEChartProps>()

const { formatter } = useNumberFormatter()

const chartElement = ref()
const option = computed<EChartsOption>(() => {
  return {
    title: {
      text: 'ooo',
      top: 0,
      left: 'center',
      textStyle: {
        color: '#ccc',
      },
    },
    darkMode: vuetify.theme.current.value.dark,
    xAxis: {
      type: 'category',
      data: props.xAxisData,
    },
    yAxis: {
      // type: 'value',
      axisLabel: {
        // color: 'red',
        formatter: (value) => formatter(value, { minimumFractionDigits: 0 }),
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: vuetify.theme.current.value.colors.surface,
        },
      },
    },
    series: props.series,
    legend: props.legend,
  }
})

const initChart = () => {
  const myChart = echarts.init(chartElement.value)
  option.value && myChart.setOption(option.value)
}

onMounted(() => {
  initChart()
})

watch(option, () => {
  initChart()
})
</script>
