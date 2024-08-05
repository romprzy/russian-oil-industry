<template>
  <v-container fluid>
    <header class="mb-4">
      <h1 class="font-weight-light">Rosneft resources map</h1>
      <div class="text-caption ma-n1 text-disabled">
        <span class="ma-1">Sources:</span>
        <BasicLink
          class="ma-1"
          href="https://www.rosneft.com/"
          text="rosneft.com"
        />
        <BasicLink
          class="ma-1"
          href="https://www.rosneft.ru/"
          text="rosneft.ru"
        />
      </div>
    </header>


    <div class="position-relative">
      <div class="ma-4 position-absolute" style="top: 0; left: 0; z-index: 999; opacity: .85;">
        <v-list
          v-model:selected="selected"
          class="py-0"
          density="compact"
          select-strategy="classic"
        >
          <v-list-subheader class="py-2">Legend</v-list-subheader>
          <v-divider class="mb-2" />
          <v-list-item @click="selected = []">
            <template #prepend>
              <v-img
                class="bg-shades-white"
                height="25"
                :src="`/icons/rosneft/map_ico-all.png`"
                width="auto"
              />
            </template>
            <v-list-item-title class="px-2">
              All
            </v-list-item-title>
          </v-list-item>

          <v-list-item
            v-for="key in keys"
            :key="key"
            :value="key"
          >
            <template #prepend>
              <v-img
                class="bg-shades-white"
                height="25"
                :src="`/icons/rosneft/map_ico-${key.toLowerCase()}.png`"
                width="auto"
              />
            </template>
            <v-list-item-title class="px-2">
              {{ t(key) }}
            </v-list-item-title>
          </v-list-item>

          <v-divider class="mt-1" />

          <div class="px-5 pb-1">
            <v-switch
              v-model="showTitles"
              density="compact"
              hide-details
              label="showTitles"
            />
          </div>
        </v-list>
      </div>

      <GoogleMap
        :api-key="apiKey"
        :areas="areas"
        id-key="name"
        :items="points"
        :map-config="mapConfig"
        style="height: calc(100vh - 200px)"
      >
        <template #default="{ google, map, advancedMarkerElement }">
          <GoogleMapMarker
            v-for="(item, index) in points"
            :key="item.name"
            ref="markers"
            :advancedMarkerElement="advancedMarkerElement"
            class="bg-black"
            :class="{ 'd-none': selected?.length && !selected.includes(item.groupNameKey) }"
            :google="google"
            :item="item"
            :map="map"
            style="border-color: rgba(255, 255, 255, 1)"
            @click="toggle(index)"
          >
            <div>
              <div class="marker-title" :class="{ 'd-none': !showTitles }">{{ item.name }}</div>
              <div class="subtitle d-none">{{ item.groupNameKey }}</div>
              <v-img
                height="25"
                :src="`/icons/rosneft/map_ico-${item.groupNameKey.toLowerCase()}.png`"
                width="auto"
              />
            </div>
          </GoogleMapMarker>
        </template>
      </GoogleMap>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

const mapConfig = {
  center: { lat: 42, lng: 80 },
  zoom: 3,
  mapId: 'DEMO_MAP_ID',
}

import rosneftResoucesLocationsEn from '../../data/rosneft/rosneftResoucesLocations.en'
import rosneftResoucesLocationsRu from '../../data/rosneft/rosneftResoucesLocations.ru'
import en from '@/i18n/en'
import ru from '@/i18n/ru'
import GoogleMapMarker from '../../components/google/GoogleMapMarker.vue'

const keys = [
  'OffshoreFields',
  'ForeignProjects',
  'PortsOfPresence',
  'AviationFuelSales',
  'GasAssets',
  'OilAssets',
  'GeologicSurveyProjects',
  'OilRefiningAndPetrochemicalIndustry',
  'GasProcessing',
  'OilProductsStorage',
  'Bunkering',
  'FillingStationNetwork',
  'ResearchAndDesignComplex',
]

const markers = ref([])
const selected = ref()
const showTitles = ref()

const enLocations = rosneftResoucesLocationsEn.map(location => ({
  nameKey: keys.find(nameKey => en.rosneft.locations.groups[nameKey] === location.name) || location.name,
  en: location.name,
  ...location,
  // items: location.items.map(item => ({ id: item.coordinates.join(), ...item })),
  // points: location.points?.map(point => ({ id: `${point.lat},${point.lng}`, ...point })),
}))
const ruLocations = rosneftResoucesLocationsRu.map(location => ({
  nameKey: keys.find(nameKey => ru.rosneft.locations.groups[nameKey] === location.name) || location.name,
  ru: location.name,
  ...location,
  // points: location.points?.map(point => ({ id: `${point.lat},${point.lng}`, ...point })),
}))

const groups = computed(() => {
  const enKeys = enLocations.map(({ nameKey }) => nameKey)
  const ruKeys = ruLocations.map(({ nameKey }) => nameKey)

  return [...new Set([...enKeys, ...ruKeys])]
    .map(nameKey => ({
      nameKey,
      en: en.rosneft.locations.groups[nameKey],
      ru: ru.rosneft.locations.groups[nameKey],
    }))
})

const mergeGroupPoints = (groupRu, groupEn, nameKey) => {
  const pointsRu = groupRu?.points || []
  const pointsEn = groupEn?.points || []
  const coordinatesCompare = ({ lat, lng }) => `${lat},${lng}`

  const locationsIds = [...new Set([...pointsEn, ...pointsRu]?.map(coordinatesCompare))]

  const points = locationsIds?.map(locationId => {
    const point = { locationId }
    const pointEn = pointsEn.find(({ lat, lng }) => `${lat},${lng}` === locationId)
    const pointRu = pointsRu.find(({ lat, lng }) => `${lat},${lng}` === locationId)

    point.lat = (pointEn || pointRu)?.lat
    point.lng = (pointEn || pointRu)?.lng
    point.en = pointEn?.name?.replace(`${en.rosneft.locations.groups[nameKey]}. `, '')
    point.ru = pointRu?.name?.replace(`${ru.rosneft.locations.groups[nameKey]}. `, '')

    return point
  })

  return points
}
const mergeGroupItems = (groupRu, groupEn) => {
  const itemsRu = groupRu?.items
  const itemsEn = groupEn?.items

  let items

  if (itemsRu?.length || itemsEn?.length) {
    const itemsCoordinates = [...itemsRu, ...itemsEn].map(({ coordinates }) => coordinates)
    const coordinatesIds = [...new Set(itemsCoordinates.map(coordinates => coordinates?.[0]?.[0]?.join(',')))]

    items = coordinatesIds?.map(coordinatesId => {
      const item = { coordinatesId }
      const itemEn = itemsEn.find(({ coordinates }) => coordinates?.[0]?.[0]?.join(',') === coordinatesId)
      const itemRu = itemsRu.find(({ coordinates }) => coordinates?.[0]?.[0]?.join(',') === coordinatesId)

      item.en = itemEn?.name
      item.ru = itemRu?.name
      item.coordinates = itemRu?.coordinates?.[0] || itemEn?.coordinates?.[0]

      return item
    })
  }

  return items?.length && items
}

const getGroup = (nameKey: string) => {
  const group = [...groups.value].find(group => group.nameKey === nameKey)

  const groupRu = ruLocations.find(location => location.nameKey === nameKey)
  const groupEn = enLocations.find(location => location.nameKey === nameKey)

  // Points
  const points = mergeGroupPoints(groupRu, groupEn, nameKey)
  const items = mergeGroupItems(groupRu, groupEn, nameKey)

  if (points?.length) group.points = points
  if (items?.length) group.items = items

  return group
}

const points = computed(() => {
  const items = []
  groups.value?.forEach((group, index) => {
    items.push(...(
      getGroup(group.nameKey)
        ?.points
        ?.map(point => ({
          ...point,
          name: point.en || point.ru,
          location: { lat: point.lat, lng: point.lng },
          groupNameKey: group.nameKey,
          groupIndex: index,
        })) || []
    ))
  })

  return items
})

const areas = computed(() => {
  const items = []
  groups.value?.forEach(group => {
    items.push(...(getGroup(group.nameKey)?.items?.map(item => ({
      ...item,
      name: item.en,
      coordinates: item.coordinates.map(coords => ({ lat: coords[0], lng: coords[1] })),
    })) || []))
  })

  return items
    .map(({ coordinates }) => coordinates)
    // .map(coords => ({ lat: coords[0], lng: coords[1] }))
})

const toggle = (index) => {
  const marker = markers.value?.[index]?.$el
  marker.classList.toggle('bg-red')

}
</script>

