<template>
  <v-container fluid>
    <h1>{{ title }}</h1>
    <slot />
  </v-container>
</template>

<script setup lang="ts">
export interface IBasicSource {
  title: string
}

defineProps<IBasicSource>()
</script>
