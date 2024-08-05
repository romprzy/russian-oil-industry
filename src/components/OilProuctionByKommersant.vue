<template>
  <v-container fluid>
    <v-row>
      <v-col
        cols="12"
        lg="4"
        xl="4"
        xxl="3"
      >
        <v-card max-width="800">
          <v-card-title>Oil production in Russia in 2022 by company</v-card-title>
          <v-card-subtitle>
            Source: Kommersant
            (<BasicLink href="https://www.kommersant.ru/doc/5759357" />)
          </v-card-subtitle>
          <v-card-text>
            <v-container class="px-0">
              <div class="text-h5">Total oil production: <strong>{{ russiaOilProduction }}</strong> mln t/year</div>
              <div class="text-h5">Total oil refinement: <strong>{{ russiaOilRefining }}</strong> mln t/year</div>
              <div />
            </v-container>

            <v-data-table
              :headers="headers"
              hide-default-footer
              :items = items
            >
              <!--    <template #top></template>-->
              <template
                v-for="header in headers"
                :key="header.key"
                #[`item.${header.key}`]="row"
              >
                <template v-if="header.format === 'percent'">{{ formatter(row.item[header.key], { style: 'percent' }) }}</template>
                <template v-else-if="header.formatter">{{ formatter(row.item[header.key]) }}</template>
                <template v-else>{{ row.item[header.key] }}</template>
              </template>

              <template #body.append>
                <tr>
                  <td
                    v-for="header in headers"
                    :key="header.key"
                    class="v-data-table__td v-data-table-column--align-end"
                    style="border-top-style: double"
                  >
                    <template v-if="header.formatter">
                      {{ formatter(sum) }}
                    </template>
                  </td>
                </tr>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col
        cols="12"
        lg="4"
        xl="4"
        xxl="3"
      >
        <BasicChart
          :items="items"
          label-key="producer"
          :labels="items.map(item => item.producer)"
          title="Oil production in Russia in 2022 by company"
          type="bar"
          value-key="amount"
        />
        <!--        <BasicChart-->
        <!--          :items="items"-->
        <!--          label="Oil production in Russia in 2022 by company"-->
        <!--          label-key="producer"-->
        <!--          :labels="items.map(item => item.producer)"-->
        <!--          type="bar"-->
        <!--          value-key="amount"-->
        <!--        />-->
        <!--        <BasicChartBar-->
        <!--          :datasets="items.map((item, index) => ({-->
        <!--            ...item,-->
        <!--            // label: items[index].producer,-->
        <!--            backgroundColor: backgroundColors[index],-->
        <!--            data: [items[index].amount],-->
        <!--          }))"-->
        <!--          label-key="producer"-->
        <!--          :labels="items.map(item => item.producer)"-->
        <!--          value-key="amount"-->
        <!--        />-->
      </v-col>

      <v-col
        cols="12"
        lg="4"
        xl="4"
        xxl="3"
      >
        <BasicChart
          :items="items"
          label-key="producer"
          :labels="items.map(item => item.producer)"
          title="Oil production in Russia in 2022 by company"
          type="pie"
          value-key="amount"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useNumberFormatter } from '@/composables/numberFormatter'
import { getSummary, refineries } from '../data/rosneft/refineries'
import BasicLink from './elements/BasicLink.vue'
import vuetify from '../plugins/vuetify'

const { formatter } = useNumberFormatter()

const year = 2022
const units = 'unitsMTY'

const russiaOilProduction = 535
const russiaOilRefining = 356.5

const headers = [
  {
    key: 'producer',
    title: 'producer',
  },
  {
    key: 'amount',
    title: 'mln t/y',
    align: 'end',
    formatter,
  },
  {
    key: 'percentage',
    title: '% by weight',
    align: 'end',
    formatter,
    format: 'percent',
  },
]

const companies = [
  {
    producer: 'Rosneft',
    amount:  178.5,
  },
  {
    producer: 'Lukoil',
    amount:  81,
  },
  {
    producer: 'Surgutneftegas',
    amount:  59.6,
  },
  {
    producer: 'Gazprom Neft',
    amount:  59.1,
  },
  {
    producer: 'Tatneft',
    amount:  29.1,
  },
  {
    producer: 'Rosneft Eduard Khudainatov',
    amount: 20,
  },
].map(company => ({
  ...company,
  percentage: Math.round(company.amount / russiaOilProduction * 10000) / 10000,
}))

const companiesSum = Math.round(companies.map(({ amount }) => amount).reduce((a, b) => a + b) * 100) / 100

const items = computed(() => {
  const items = [...companies]
  const others = {
    producer: 'Others',
    amount: Math.round((russiaOilProduction - companiesSum) * 100) / 100,
    percentage: Math.round((russiaOilProduction - companiesSum) / russiaOilProduction * 100) / 100,
  }
  items.push(others)
  return items
})

const sum = computed(() => Math.round(items.value.map(({ amount }) => amount).reduce((a, b) => a + b) * 100) / 100)

const backgroundColors = [
  vuetify.theme.current.value.colors.primary,
  vuetify.theme.current.value.colors.info,
  vuetify.theme.current.value.colors.secondary,
  vuetify.theme.current.value.colors.warning,
  vuetify.theme.current.value.colors.danger,
  vuetify.theme.current.value.colors.surface,
  // vuetify.theme.current.value.colors.primary,
]
</script>
