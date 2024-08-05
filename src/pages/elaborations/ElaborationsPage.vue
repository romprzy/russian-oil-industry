<template>
  <v-container fluid>
    <h1>Elaborations</h1>

    <pre>{{ series }}</pre>

    <RefineriesByVolume />

    <v-container class="px-0" fluid>
      <h1>Russia</h1>
      <BasicEChartWrapper
        :legend="legend"
        :series="series"
        style="height: 50vh !important;"
        :type="type"
        :x-axis-data="years"
        @update:type="type = $event"
      />

      <v-container
        v-for="elaboration in elaborations"
        :key="elaboration.title"
        class="px-0"
        fluid
      >
        <h2>{{ elaboration.title }}</h2>
        <div class="text-caption">source: <BasicLink :href="elaboration.source" :text="elaboration.domain" /></div>

        <BasicEChartWrapper
          :series="getSerie(elaboration.title)"
          style="height: 50vh !important;"
          :type="type"
          :x-axis-data="years"
          @update:type="type = $event"
        />

        <v-data-table
          :headers="headers"
          :items="elaboration.items"
        />

        <!--        <div style="height: 50vh !important;">-->
        <!--          <BasicChartBar :chart-data="getChartData(elaboration.title)" />-->
        <!--        </div>-->
      </v-container>
    </v-container>
  </v-container>
</template>

<script setup lang="ts">
import BasicEChartWrapper from '../../components/elements/BasicEChartWrapper.vue'
import vuetify from '../../plugins/vuetify'
import { useNumberFormatter } from '../../composables/numberFormatter'
import { computed, ref } from 'vue'

const { formatter } = useNumberFormatter()

const years = Array.from({ length: 23 }, (e, i) => i + 2000)
const headers = [
  {
    key: 'name',
    title: 'name',
  },
  {
    key: 'units',
    title: 'units',
  },
  ...years.map(year => ({
    key: String(year),
    title: String(year),
    align: 'end',
  })),
]

const type = ref('bar')

const elaborations = [
  {
    title: `Russia's oil refinery capacity from 2000 to 2022	(in 1,000 barrels daily)`,
    source: 'https://www.statista.com/statistics/265280/oil-refinery-capacity-in-russia-since-1998/',
    domain: 'statista.com',
    items: [
      {
        name: 'Refinery capacity',
        units: '[1000 bbl/day]',
        2000: 5536,
        2001: 5486,
        2002: 5446,
        2003: 5320,
        2004: 5328,
        2005: 5408,
        2006: 5524,
        2007: 5471,
        2008: 5387,
        2009: 5425,
        2010: 5527,
        2011: 5673,
        2012: 5767,
        2013: 6229,
        2014: 6366,
        2015: 6472,
        2016: 6543,
        2017: 6545,
        2018: 6551,
        2019: 6676,
        2020: 6736,
        2021: 6861,
        2022: 6821,
      },
    ],
  },
  {
    title: 'Oil production in Russia from 2000 to 2022	(in 1,000 barrels per day)',
    source: 'https://www.statista.com/statistics/265187/oil-production-in-russia-in-barrels-per-day/',
    domain: 'statista.com',
    items: [
      {
        name: 'Oil production',
        units: '[1000 bbl/day]',
        2000: 6583,
        2001: 7106,
        2002: 7755,
        2003: 8602,
        2004: 9335,
        2005: 9597,
        2006: 9819,
        2007: 10062,
        2008: 9965,
        2009: 10152,
        2010: 10379,
        2011: 10533,
        2012: 10656,
        2013: 10807,
        2014: 10927,
        2015: 11087,
        2016: 11342,
        2017: 11374,
        2018: 11562,
        2019: 11679,
        2020: 10666,
        2021: 11000,
        2022: 11202,
      },
    ],
  },
  {
    title: 'Oil production in Russia from 2000 to 2022	(in million metric tons)',
    source: 'https://www.statista.com/statistics/265219/oil-production-in-russia/',
    domain: 'statista.com',
    items: [
      {
        name: 'Oil production',
        units: '[mln t/year]',
        2000: 326.7,
        2001: 351.7,
        2002: 383.7,
        2003: 425.7,
        2004: 463.3,
        2005: 474.8,
        2006: 485.6,
        2007: 497.5,
        2008: 494.3,
        2009: 501.4,
        2010: 512.3,
        2011: 519.5,
        2012: 526.7,
        2013: 532.2,
        2014: 537.4,
        2015: 544.6,
        2016: 558.5,
        2017: 558.5,
        2018: 567.9,
        2019: 573.4,
        2020: 524.4,
        2021: 538.8,
        2022: 548.5,
      },
    ],
  },
]


// const items = [
//   {
//     2000: 5536,
//     2001: 5486,
//     2002: 5446,
//     2003: 5320,
//     2004: 5328,
//     2005: 5408,
//     2006: 5524,
//     2007: 5471,
//     2008: 5387,
//     2009: 5425,
//     2010: 5527,
//     2011: 5673,
//     2012: 5767,
//     2013: 6229,
//     2014: 6366,
//     2015: 6472,
//     2016: 6543,
//     2017: 6545,
//     2018: 6551,
//     2019: 6676,
//     2020: 6736,
//     2021: 6861,
//     2022: 6821,
//     name: 'Refinery capacity',
//     units: '[1000 bbl/day]',
//   },
//   {
//     2000: 6583,
//     2001: 7106,
//     2002: 7755,
//     2003: 8602,
//     2004: 9335,
//     2005: 9597,
//     2006: 9819,
//     2007: 10062,
//     2008: 9965,
//     2009: 10152,
//     2010: 10379,
//     2011: 10533,
//     2012: 10656,
//     2013: 10807,
//     2014: 10927,
//     2015: 11087,
//     2016: 11342,
//     2017: 11374,
//     2018: 11562,
//     2019: 11679,
//     2020: 10666,
//     2021: 11000,
//     2022: 11202,
//     name: 'Oil production',
//     units: '[1000 bbl/day]',
//   },
//   {
//     2000: 326.7,
//     2001: 351.7,
//     2002: 383.7,
//     2003: 425.7,
//     2004: 463.3,
//     2005: 474.8,
//     2006: 485.6,
//     2007: 497.5,
//     2008: 494.3,
//     2009: 501.4,
//     2010: 512.3,
//     2011: 519.5,
//     2012: 526.7,
//     2013: 532.2,
//     2014: 537.4,
//     2015: 544.6,
//     2016: 558.5,
//     2017: 558.5,
//     2018: 567.9,
//     2019: 573.4,
//     2020: 524.4,
//     2021: 538.8,
//     2022: 548.5,
//     name: 'Oil production',
//     units: '[mln t/year]',
//   },
// ]

const datasets = elaborations.map(elaboration => ({
  label: elaboration.title,
  data: years.map(key => elaboration.items[0][key]),
}))


const chartData = {
  labels: years,
  datasets,
}
const getChartData = (title) => {
  const elaboration = elaborations.find(item => item.title === title)

  return {
    labels: years,
    datasets: [{
      label: elaboration.title,
      data: years.map(key => elaboration.items[0][key]),
    }],
  }
}

const basicSerie = computed(() => ({
  type: type.value,
  label: {
    normal: {
      show: true,
      position: 'top',
      formatter: ({ value }) => formatter(value, { minimumFractionDigits: 0 }),
    },
  },
}))

const series = computed(() => elaborations.map(elaboration => ({
  ...basicSerie.value,
  data: years.map(key => elaboration.items[0][key]),
  name: elaboration.title,
  // emphasis: {
  //   focus: 'series',
  // },
  // label: {
  //   show: true,
  // },
})))

const legend = computed(() => ({
  data: elaborations.map(({ title }) => title),
  textStyle: {
    color: vuetify.theme.current.value.dark ? 'white' : undefined,
  },
}))

const getSerie = (title: string) => {
  const elaboration = elaborations.find(item => item.title === title)
    return [
    {
      ...basicSerie.value,
      color: vuetify.theme.current.value.colors.info,
      data: years.map(key => elaboration.items[0][key]),
      name: elaboration.title,
    },
  ]
}

//   {
//     label: props.label || '',
//     borderWidth: 1,
//     backgroundColor: colors,
//     data: props.items.map(row => row[props.valueKey]),
//   },
// ],
</script>
