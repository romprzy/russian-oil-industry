<template>
  <div
    ref="markerContent"
    class="google-maps-marker round-marker"
    :class="{
      'd-none': item.display === false,
      'bg-error': consequence === 'full',
      'bg-warning': consequence === 'part',
      'bg-success': consequence === 'none',
    }"
    :style="{ width: `${size || 24}px`, height: `${size || 24}px`}"
  >
    <slot>
      <slot name="title">
        <div class="marker-title">
          {{ item.name }}
        </div>
      </slot>
      <div class="marker-value">{{ markerValue }}</div>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { getRefineryContent } from '../../helpers/markers'
// import AdvancedMarkerElement = google.maps.marker.AdvancedMarkerElement
// import { MarkerClusterer } from '@googlemaps/markerclusterer'
// import { refineries } from '../../data/rosneft/refineries'

interface IGoogleMapMarkerProps {
  google: typeof google
  map: typeof google.maps.Map
  item: object
  advancedMarkerElement: object | (() => {})
  valueKey?: string
  valueMultiplier?: number
}

const props = defineProps<IGoogleMapMarkerProps>()

const markerContent = ref()

// const amount = getShortQMPerYear(props.item.qMPerYear)

const amount = computed(() => props.valueKey && props.item[props.valueKey]/(props.valueMultiplier || 1))

const size = 20 * Math.sqrt(amount.value || 2)

const contentString = getRefineryContent(props.item)

const consequences = computed(() => props.item.attacks?.map(attack => attack.consequences))
const consequence = computed(() => {
  if (!consequences.value) return false
  if (consequences.value.includes('wyłączenie')) return 'full'
  if (consequences.value.includes('częściowe')) return 'part'
  if (consequences.value.includes('brak')) return 'none'
  return false
})


onMounted(() => {
  const marker = new props.advancedMarkerElement({
    map: props.map,
    position: props.item.location,
    title: props.item.name,
    content: markerContent.value,
  })

  const infowindow = new google.maps.InfoWindow({
    content: contentString,
    // ariaLabel: 'Uluru',
  })

  marker.addListener('click', () => {
    infowindow.open({
      anchor: marker,
      map: props.map,
    })
  })

  const featureLayer = props.map.getFeatureLayer("COUNTRY");

  // Define the styling options
  const featureStyleOptions = {
    strokeColor: "#FF0000",
    strokeOpacity: 1.0,
    strokeWeight: 1.0,
    fillOpacity: 0,
  };

  // Apply the style to a single boundary.
  featureLayer.style = (options) => {
    if (options.feature.placeId == "ChIJYW1Zb-9kjEcRFXvLDxG1Vlw") {
      // Above Place ID is Switzerland
      return featureStyleOptions;
    }
  };
})

const markerValue = computed(() => amount.value && props.valueKey
  ? `${amount.value}${props.valueKey.endsWith('Percentage') ? '%' : ''}`
  : '?',
)
</script>
