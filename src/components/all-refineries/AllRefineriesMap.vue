<template>
  <v-container
    class="position-relative"
    fluid
  >
    <!--    <pre>{{ pismAttacks }}</pre>-->
    <div class="pa-4 position-absolute" style="z-index: 999; left: 1rem; top: 1rem; opacity: .85">
      <v-btn
        density="compact"
        icon="mdi-cog"
        @click="showSettings = !showSettings"
      />
      <v-list
        v-show="showSettings"
        class="py-0 mt-3"
        density="compact"
      >
        <v-list-subheader>{{ $t('Units') }}:</v-list-subheader>
        <template
          v-for="value in menuValues"
          :key="value.key"
        >
          <v-divider />
          <v-list-item
            :active="value.key === valueKey"
            :disabled="value.disabled"
            :title="value.title"
            @click="valueKey = value.key"
          />
        </template>
      </v-list>

      <!--      <div class="mb-8" />-->

      <!--      <v-btn-->
      <!--        block-->
      <!--        class="mb-1"-->
      <!--        density="compact"-->
      <!--        @click="valueKey = 'mTPerYear'"-->
      <!--      >Mln t/y</v-btn>-->
      <!--      <v-btn-->
      <!--        block-->
      <!--        class="mb-1"-->
      <!--        density="compact"-->
      <!--        disabled-->
      <!--      >Mln m³/y</v-btn>-->
      <!--      <v-btn-->
      <!--        block-->
      <!--        class="mb-1"-->
      <!--        density="compact"-->
      <!--        disabled-->
      <!--      >Mln bbl/y</v-btn>-->
      <!--      <v-btn-->
      <!--        block-->
      <!--        class="mb-1"-->
      <!--        density="compact"-->
      <!--        @click="valueKey = 'massPercentage'"-->
      <!--      >% by mass</v-btn>-->
      <!--      <v-btn-->
      <!--        block-->
      <!--        class="mb-1"-->
      <!--        density="compact"-->
      <!--        disabled-->
      <!--      >% by volume</v-btn>-->
    </div>

    <!--    <div class="pa-4 position-absolute" style="z-index: 999; bottom: 1rem; left: 1rem;">-->
    <!--      <v-card style="opacity: .85">-->
    <!--        <v-card-title class="font-weight-light text-body-1 text-center text-disabled">Map types</v-card-title>-->
    <!--        <v-divider />-->
    <!--        <v-card-text class="pa-0">-->
    <!--          <template-->
    <!--            v-for="type in ['roadmap', 'satellite', 'hybrid', 'terrain']"-->
    <!--            :key="type"-->
    <!--          >-->
    <!--            <v-btn-->
    <!--              :active="mapType === type"-->
    <!--              block-->
    <!--              @click="setMapTypeId(type)"-->
    <!--            >{{ type }}</v-btn>-->
    <!--            <v-divider />-->
    <!--          </template>-->
    <!--        </v-card-text>-->
    <!--      </v-card>-->
    <!--    </div>-->

    <GoogleMap
      :api-key="apiKey"
      id-key="name"
      :items="filteredItems"
      :map-config="mapConfig"
      style="height: calc(100vh - 100px)"
      :value-key="valueKey"
    />
  </v-container>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import pismAttacks from '@/data/attacks/pism-attacks.json'

interface IAllRefineriesMapProps {
  mapItems: object[]
  selected?: any[]
}

const props = defineProps<IAllRefineriesMapProps>()

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
const mapConfig = {
  center: { lat: 50, lng: 80 },
  zoom: 4,
  mapId: 'DEMO_MAP_ID',
}
const valueKey = ref('mTPerYear')
const showSettings = ref()

const filteredItems = computed(() => props.mapItems.map(item => ({
  ...item,
  display: !props.selected?.length || props.selected.includes(item.owner),
  attacks: pismAttacks.filter(({ id }) => id === item.name),
})))

const menuValues = [
  {
    key: 'mTPerYear',
    title: 'Mln t/y',
  },
  {
    key: 'massPercentage',
    title: '% by  mass',
  },
  {
    key: 'mMY',
    title: 'Mln m³/y',
    disabled: true,
  },
  {
    key: 'mBblY',
    title: 'Mln bbl/y',
    disabled: true,
  },
  {
    key: 'volumePercentage',
    title: '% by volume',
    disabled: true,
  },
]
</script>
