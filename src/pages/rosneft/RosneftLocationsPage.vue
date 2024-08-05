<template>
  <v-container fluid>
    <span class="fi fi-ru" />
    <span class="fi fi-de" />
    <span class="fi fi-by" />
    <span class="fi fi-in" />
  </v-container>

  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h1>Locations</h1>
      </v-col>
      <v-col cols="12">
        <RosneftLocationsCombined />
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
import RosneftLocationsCombined from '../../components/rosneft/RosneftLocationsCombined.vue'
</script>
