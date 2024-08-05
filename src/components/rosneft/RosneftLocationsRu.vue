<template>
  <RosneftLocations
    lang="ru"
    :locations="rosneftResoucesLocationsRu"
  />
</template>

<script setup lang="ts">
import rosneftResoucesLocationsRu from '../../data/rosneft/rosneftResoucesLocations.ru'
import RosneftLocations from './RosneftLocations.vue'
</script>
