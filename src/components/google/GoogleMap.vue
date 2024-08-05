<template>
  <GoogleMapLoader
    :api-key="apiKey"
    class="position-relative"
    :map-config="mapConfig"
    @set:map="setMap"
  >
    <template #default="{ google, map, advancedMarkerElement }">
      <slot
        :advancedMarkerElement="advancedMarkerElement"
        :google="google"
        :map="map"
      >
        <GoogleMapMarker
          v-for="item in items"
          :key="item[idKey]"
          :advancedMarkerElement="advancedMarkerElement"
          :google="google"
          :item="item"
          :map="map"
          :value-key="valueKey"
          :value-multiplier="valueMultiplier"
        />
      </slot>

      <div
        class="ma-4 position-absolute"
        style="z-index: 999; top: 0; left: 0;"
      >
        <v-btn
          density="compact"
          icon="mdi-cog"
          @click="showSettings = !showSettings"
        />
        <v-card v-show="showSettings" style="opacity: .85">
          <v-card-title
            class="font-weight-light text-body-1 text-center text-disabled"
            @click="showSettings = !showSettings"
          >{{ $t('MapTypes') }}</v-card-title>
          <v-divider />
          <v-card-text class="pa-0">
            <template
              v-for="type in ['roadmap', 'satellite', 'hybrid', 'terrain']"
              :key="type"
            >
              <v-btn
                :active="mapType === type"
                block
                @click="setMapTypeId(type)"
              >{{ $t(type) }}</v-btn>

              <v-divider />
            </template>
          </v-card-text>
        </v-card>
      </div>
    </template>
  </GoogleMapLoader>
</template>

<script setup lang="ts">
import GoogleMapLoader from './GoogleMapLoader.vue'
import GoogleMapMarker from './GoogleMapMarker.vue'
import { ref } from 'vue'

interface IGoogleMapProps {
  apiKey: string
  valueKey?: string | number
  idKey: string | number
  mapConfig: object
  items: object
  valueMultiplier?: number
}

defineProps<IGoogleMapProps>()
const emits = defineEmits(['set:map'])

const map = ref()
const showSettings = ref()
const mapType = ref('hybrid')
const setMapTypeId = (type) => {
  mapType.value = type
  map.value?.setMapTypeId(type)
}

const setMap = ($event) => {
  map.value = $event
  emits('set:map', $event)
  setMapTypeId(mapType.value)
}
</script>
