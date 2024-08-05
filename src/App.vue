<template>
  <v-app id="app">
    <AppLayout />
  </v-app>
</template>

<script lang="ts" setup>
import AppLayout from '../../russian-oil-industry/src/layouts/AppLayout.vue'
</script>

<style lang="scss">
@import "/node_modules/flag-icons/css/flag-icons.min.css";
@import "styles/google/maps/marker.scss";

html, body, #app {
  overflow: hidden;
  height: 100vh;
}
</style>
