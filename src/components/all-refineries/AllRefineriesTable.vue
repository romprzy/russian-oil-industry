<template>
  <v-data-table
    density="compact"
    :headers="headers"
    hide-default-footer
    :items="dataItems"
    :items-per-page="-1"
  >
    <template #[`item.percent`]>pp</template>
    <template
      v-for="header in headers"
      :key="header.key"
      #[`item.${header.key}`]="row"
    >
      <template v-if="header.key === 'index'">{{ row.index + 1 }}</template>
      <template v-if="header.key === 'massPercentage'">{{ formatter(row.item.mTPerYear / totalRussianRefining, { style: 'percent' }) }}</template>
      <template v-else-if="header.format === 'percent'">{{ formatter(row.item[header.key], { style: 'percent' }) }}</template>
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
          <template v-if="header.key === 'massPercentage'">
            {{ formatter(sum / totalRussianRefining, { style: 'percent' }) }}
          </template>
          <template v-else-if="header.formatter">
            {{ formatter(sum) }}
          </template>
        </td>
      </tr>
    </template>
  </v-data-table>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useNumberFormatter } from '../../composables/numberFormatter'
const { formatter } = useNumberFormatter()

interface IAllRefineriesTableProps {
  items: object[]
  totalRussianRefining: number
}

const props = defineProps<IAllRefineriesTableProps>()

const headers = [
  {
    key: 'index',
    title: 'index',
  },
  {
    key: 'owner',
    title: 'owner',
  },
  // {
  //   key: 'company',
  //   title: 'company',
  // },
  // {
  //   key: 'country',
  //   title: 'country',
  // },
  // {
  //   key: 'region',
  //   title: 'region',
  // },
  // {
  //   key: 'administrativeDistrict',
  //   title: 'administrativeDistrict',
  // },
  // {
  //   key: 'federalSubject',
  //   title: 'federalSubject',
  // },
  {
    key: 'city',
    title: 'city',
  },
  {
    key: 'fullNameEn',
    title: 'fullNameEn',
  },
  {
    key: 'fullNameRu',
    title: 'fullNameRu',
  },
  {
    key: 'name',
    title: 'name',
  },
  {
    key: 'mTPerYear',
    title: 'mTPerYear',
    formatter,
    align: 'end',
  },
  {
    key: 'massPercentage',
    title: 'massPercentage',
    formatter,
    align: 'end',
  },
]

const sum = computed(() => Math.round(props.items.map(({ mTPerYear }) => mTPerYear || 0).reduce((a, b) => a + b) * 100) / 100)

const dataItems = computed(() => props.items?.filter(({ mTPerYear }) => mTPerYear))
</script>
