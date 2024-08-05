<template>
  <div class="google-map-loader position-relative">
    <div
      ref="googleMap"
      class="google-map"
      style="height: 100%;"
    />

    <template v-if="loaded">
      <slot
        :advancedMarkerElement="advancedMarkerElement"
        :google="loader"
        :map="map"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Loader } from '@googlemaps/js-api-loader'
import { MarkerClusterer } from '@googlemaps/markerclusterer'
import AdvancedMarkerElement = google.maps.marker.AdvancedMarkerElement

interface IGoogleMapLoaderProps {
  mapConfig: {}
  areas?: object[]
}

const props = defineProps<IGoogleMapLoaderProps>()
const emits = defineEmits(['set:map'])

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
const loader = new Loader({
  apiKey,
  version: 'weekly',
})

let map: google.maps.Map

const googleMap = ref()
const advancedMarkerElement = ref<typeof AdvancedMarkerElement>()
const loaded = ref()

loader.load().then(async () => {
  const { Map } = await google.maps.importLibrary('maps') as google.maps.MapsLibrary
  const { AdvancedMarkerElement } = await google.maps.importLibrary('marker') as google.maps.MarkerLibrary
  advancedMarkerElement.value = AdvancedMarkerElement

  map = new Map(googleMap.value, props.mapConfig)

  emits('set:map', map)
  map.setMapTypeId('hybrid')
  loaded.value = true

  if (props.areas?.length) {
    props.areas.forEach(area => {
      // Construct the polygon.
      const polygon = new google.maps.Polygon({
        paths: area,
        strokeColor: 'rgb(207, 102, 121)',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: 'rgb(207, 102, 121)',
        fillOpacity: 0.3,
      })

      polygon.setMap(map)
    })
  }

  // const markers = refineries.map(item => {
  //   const amount = getShortQMPerYear(item.qMPerYear)
  //
  //   const size = 5 * Math.sqrt(item.qMPerYear / 100000)
  //   const content = document.createElement('div')
  //   content.className = 'round-marker'
  //   content.style.width = `${size}px`
  //   content.style.height = `${size}px`
  //   content.innerHTML = `<div class="marker-title">${item.name}</div><div class="marker-value">${amount}</div>`
  //
  //   const contentString =
  //     `<div class="text-black">
  //         <h1>${item.fullName}</h1>
  //         <h2>Company: <strong>${item.company}</strong></h2>
  //         <div>
  //           <ul>
  //             <li>Drone attack</li>
  //           </ul>
  //         </div>
  //       </div>`
  //
  //   const infowindow = new google.maps.InfoWindow({
  //     content: contentString,
  //     ariaLabel: 'Uluru',
  //   })
  //
  //   const marker = new AdvancedMarkerElement({
  //     map: map,
  //     position: item.location,
  //     title: item.name,
  //     content,
  //   })
  //
  //   marker.addListener('click', () => {
  //     infowindow.open({
  //       anchor: marker,
  //       map,
  //     })
  //   })
  //
  //   return marker
  // })

  // const clusterRenderer = {
  //   render: (cluster, stats) => {
  //     const { markers, position, count } = cluster
  //     const content = document.createElement('div')
  //     const titles = markers.map(({ title }) => title)
  //     const clusteredRefineries = refineries.filter(({ name }) => titles.includes(name))
  //     const amount = getShortQMPerYear(clusteredRefineries.map(({ qMPerYear }) => qMPerYear).reduce((a, b) => a + b))
  //     content.innerHTML = `${ amount }`
  //
  //     return new AdvancedMarkerElement({
  //       map,
  //       position,
  //       content,
  //     })
  //   },
  // }
  //
  // new MarkerClusterer({ markers, map, renderer: clusterRenderer })
})
</script>
