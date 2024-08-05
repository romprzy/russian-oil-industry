<template>
  <v-list
    class="pa-0"
    select-strategy="classic"
    :selected="selected"
    @update:selected="$emit('update:selected', $event)"
  >
    <div class="px-4 py-2">
      <div class="">{{ $t('RefineryOwners') }}</div>

      <!--        <table class="v-data-table mb-2">-->
      <!--          <tr class="v-data-table__tr">-->
      <!--            <th />-->
      <!--            <th class="v-data-table__td text-caption">Selected</th>-->
      <!--            <th class="v-data-table__td text-caption">Mapped</th>-->
      <!--            <th class="v-data-table__td text-caption">Total</th>-->
      <!--          </tr>-->
      <!--          <tr class="v-data-table__tr">-->
      <!--            <td class="v-data-table__td text-right text-caption px-2 text-no-wrap">[m t/y]</td>-->
      <!--            <td class="v-data-table__td text-right text-caption px-2">{{ selectedSum }}</td>-->
      <!--            <td class="v-data-table__td text-right text-caption px-2">{{ totalSum }}</td>-->
      <!--            <td class="v-data-table__td text-right text-caption px-2">{{ totalRussianRefining }}</td>-->
      <!--          </tr>-->
      <!--          <tr class="v-data-table__tr">-->
      <!--            <td class="v-data-table__td text-right text-caption px-2">%</td>-->
      <!--            <td class="v-data-table__td text-right text-caption px-2">{{ selectedPercentage }}%</td>-->
      <!--            <td class="v-data-table__td text-right text-caption px-2">{{ totalPercentage }}%</td>-->
      <!--            <td />-->
      <!--          </tr>-->
      <!--        </table>-->
      <div class="text-caption text-disabled">{{ $t('TotalRefiningCapacity') }}: {{ totalRussianRefining }} mln t/y</div>
      <div class="text-caption text-disabled">{{ $t('OnTheMap') }}: {{ totalSum }} mln t/y ({{ totalPercentage }}%)</div>
      <div class="text-caption text-disabled">{{ $t('Selected') }}: {{ selectedSum }} [mln t/y] ({{ selectedPercentage }}% mapped) ({{ Math.round(selectedPercentage * totalPercentage) / 100 }}% of total)</div>
    </div>

    <v-progress-linear
      buffer-color="secondary"
      :buffer-opacity=".5"
      :buffer-value="totalPercentage"
      color="success"
      :height="24"
      :model-value="selectedPercentage * totalPercentage / 100"
    >
      <div class="d-flex justify-space-around w-100 px-4">
        <div class="text-caption">{{ selectedSum }}/{{ totalSum }}/{{ totalRussianRefining }} mln t/y</div>
        <!--          <div class="text-caption">{{ totalPercentage }}%</div>-->
      </div>
    </v-progress-linear>
    <v-divider />

    <!--      <v-progress-linear-->
    <!--        color="info"-->
    <!--        :model-value="totalPercentage"-->
    <!--      />-->
    <!--      <v-divider class="mb-4" />-->

    <!--      <div class="d-flex justify-space-between align-baseline px-4 py-2">-->
    <!--        <span>Selected sum</span>-->
    <!--        <span class="text-caption">({{ selectedSum }} mln t/y)</span>-->
    <!--      </div>-->
    <!--      <v-progress-linear-->
    <!--        color="info"-->
    <!--        :model-value="selectedPercentage"-->
    <!--      />-->
    <!--      <v-divider />-->
    <template
      v-for="owner in owners"
      :key="owner"
    >
      <v-divider />
      <v-list-item
        class="py-2 position-relative"
        density="comfortable"
        :value="owner"
      >
        <v-list-item-title class="mb-1">{{ owner }} ({{ refineriesByOwner(owner)?.length }})</v-list-item-title>
        <v-list-item-subtitle class="d-flex justify-space-between text-success">
          <span>{{ sumByOwner(owner) }} mln t/y</span>
          <span>{{ percentageByOwner(owner) }}%</span>
        </v-list-item-subtitle>
        <v-progress-linear
          class="position-absolute"
          color="success"
          :model-value="percentageByOwner(owner)"
          style="left: 0; bottom: 0 !important; top: auto !important; width: 100%;"
        />
      </v-list-item>
    </template>
  </v-list>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface IOwnersListProps {
  selected: []
  items: object[]
  mapItems: object[]
  totalRussianRefining: number
}

const props = defineProps<IOwnersListProps>()


const owners = computed(() => [...new Set(props.mapItems?.map(({ owner }) => owner))]?.sort())
const refineriesByOwner = (owner) => props.items?.filter(item => item.owner === owner)
const sumByOwner = (owner) => refineriesByOwner(owner)?.map(({ mTPerYear }) => mTPerYear)?.reduce((a, b) => (a || 0) + (b || 0), 0)
const percentageByOwner = (owner) => Math.round(sumByOwner(owner) / props.totalRussianRefining * 10000) / 100

const getSum = (owners) => owners?.map(owner => sumByOwner(owner))?.reduce((a, b) => (a || 0) + (b || 0), 0)
const totalSum = computed(() => getSum(owners.value))
const totalPercentage = computed(() => Math.round(totalSum.value / props.totalRussianRefining * 10000) / 100)
const selectedSum = computed(() => Math.round(getSum(owners.value?.filter(owner => !props.selected?.length || props.selected.includes(owner))) * 100) / 100)
const selectedPercentage = computed(() => Math.round(selectedSum.value / totalSum.value * 10000) / 100)
</script>
