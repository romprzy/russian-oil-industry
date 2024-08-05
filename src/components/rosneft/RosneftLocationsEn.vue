<template>
  <RosneftLocations
    lang="en"
    :locations="rosneftResoucesLocationsEn"
  />
</template>

<script setup lang="ts">
import rosneftResoucesLocationsEn from '../../data/rosneft/rosneftResoucesLocations.en'
import RosneftLocations from './RosneftLocations.vue'
</script>
