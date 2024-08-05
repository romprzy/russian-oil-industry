<template>
  <h2>Russian refineries capacity by volume (from Wikipedia)</h2>
  <div class="text-caption mb-3"><BasicLink href="https://en.wikipedia.org/wiki/List_of_oil_refineries#Russia_2" /></div>
  <v-data-table
    :headers="tHeaders"
    :items="refineries"
    :items-per-page="-1"
  >
    <template
      v-for="header in tHeaders.filter((header) => !!header.formatter)"
      #[`item.${header.key}`]="row"
    >
      {{ formatter(row.item[header.key]) }}
    </template>

    <template #body.append>
      <tr>
        <td
          v-for="header in tHeaders"
          :key="header.key"
          class="v-data-table__td v-data-table-column--align-end"
          style="border-top-style: double"
        >
          <template v-if="header.formatter">
            {{ formatter(getSummary(refineries, header.key)) }}
          </template>
        </td>
      </tr>
    </template>
  </v-data-table>
</template>

<script lang="ts" setup>
import { headers, refineries, getSummary } from '@/data/rosneft/refineries'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

import { useNumberFormatter } from '@/composables/numberFormatter'
const { formatter } = useNumberFormatter()

const tHeaders = computed(() => headers.map(item => ({
  ...item,
  title: t(item.title),
  formatter: item.formatter ? formatter : undefined,
})))
</script>
