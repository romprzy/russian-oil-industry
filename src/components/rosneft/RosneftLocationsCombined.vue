<template>
  <v-container fluid>
    <v-row>
      <v-col cols="3">
        <v-list>
          <v-list-item v-for="group in groups" :key="group.nameKey">
            {{ t(`rosneft.locations.groups.${group.nameKey}`) }}
          </v-list-item>
        </v-list>
      </v-col>

      <v-col class="pa-0" cols="9">
        <v-container
          v-for="group in groups"
          :key="group.nameKey"
        >
          <h2 class="px-4 font-weight-light">{{ t(`rosneft.locations.groups.${group.nameKey}`) }}</h2>

          <template v-if="getGroup(group.nameKey)?.items?.length">
            <v-data-table
              :headers="itemsHeadersKeys.map(key => ({ key, title: key }))"
              :items="getGroup(group.nameKey)?.items"
            />
          </template>

          <template v-if="getGroup(group.nameKey)?.points?.length">
            <v-data-table
              :headers="pointsHeadersKeys.map(key => ({ key, title: key }))"
              :items="getGroup(group.nameKey)?.points"
            />
          </template>
          <!--    <pre>{{ getGroup(group.nameKey)?.points }}</pre>-->
        </v-container>
      </v-col>
    </v-row>
  </v-container>

<!--  <RosneftLocations-->
<!--    lang="en"-->
<!--    :locations="rosneftResoucesLocationsEn"-->
<!--  />-->
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

import rosneftResoucesLocationsEn from '../../data/rosneft/rosneftResoucesLocations.en'
import rosneftResoucesLocationsRu from '../../data/rosneft/rosneftResoucesLocations.ru'
import en from '@/i18n/en'
import ru from '@/i18n/ru'

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

const itemsHeadersKeys = [
  // 'locationId',
  'en',
  'ru',
  'coordinates',
]

const pointsHeadersKeys = [
  // 'locationId',
  'en',
  'ru',
  'lat',
  'lng',
]

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

  // const ruNames = rosneftResoucesLocationsRu.map(({ name }) => ({
  //   key: keys.find(key => ru.rosneft.locations.groups[key] === name) || name,
  //   ru: name,
  // }))

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
const mergeGroupItems = (groupRu, groupEn, nameKey) => {
  const itemsRu = groupRu?.items
  const itemsEn = groupEn?.items

  let items

  if (itemsRu?.length || itemsEn?.length) {
    // const coordinatesRu = itemsRu?.map(({ coordinates }) => coordinates?.[0]) || []
    // const coordinatesEn = itemsEn?.map(({ coordinates }) => coordinates?.[0]) || []

    // console.log('mergeGroupItems', nameKey, itemsRu, itemsEn)

    const itemsCoordinates = [...itemsRu, ...itemsEn].map(({ coordinates }) => coordinates)
    const coordinatesIds = [...new Set(itemsCoordinates.map(coordinates => coordinates?.[0]?.[0]?.join(',')))]
    console.log('coordinatesIds', coordinatesIds)

    items = coordinatesIds?.map(coordinatesId => {
      const item = { coordinatesId }
      const itemEn = itemsEn.find(({ coordinates }) => coordinates?.[0]?.[0]?.join(',') === coordinatesId)
      const itemRu = itemsRu.find(({ coordinates }) => coordinates?.[0]?.[0]?.join(',') === coordinatesId)

      // item.lat = (itemEn || itemRu)?.lat
      // item.lng = (itemEn || itemRu)?.lng
      item.en = itemEn?.name
      item.ru = itemRu?.name
      item.coordinates = itemRu?.coordinates?.[0] || itemEn?.coordinates?.[0]

      return item
    })
    console.log('items', items)
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
</script>
