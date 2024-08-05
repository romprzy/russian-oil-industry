<template>
  <v-navigation-drawer>
    <OwnersList
      v-model:selected="selected"
      :items="items"
      :mapItems="mapItems"
      :totalRussianRefining="totalRussianRefining"
    />
  </v-navigation-drawer>

  <AllRefineriesMap
    v-show="!$route.query.show || $route.query.show === 'Map'"
    :map-items="mapItems"
    :selected="selected"
  />

  <AllRefineriesTable
    v-show="!$route.query.show || $route.query.show === 'Table'"
    :items="items"
    :totalRussianRefining="totalRussianRefining"
  />
</template>

<script setup lang="ts">
import refineries from '../../data/refineries'
import { computed, ref } from 'vue'
import OwnersList from './OwnersList.vue'
import AllRefineriesTable from './AllRefineriesTable.vue'
import AllRefineriesMap from './AllRefineriesMap.vue'

const totalRussianRefining = 344

const items = computed(() => refineries
  .map(refinery => ({
    ...refinery,
    location: { lat: refinery.lat, lng: refinery.lng},
    massPercentage: `${Math.round(refinery.mTPerYear / totalRussianRefining * 1000) / 10}`,
  })),
)
const mapItems = computed(() => items.value.filter(({ lat, lng }) => lat && lng))

const selected = ref()

</script>
