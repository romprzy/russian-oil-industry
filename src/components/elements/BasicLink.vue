<template>
  <a
    :href="href"
    rel="noopener noreferrer"
    target="_blank"
  >
    <slot>
      <v-icon v-if="icon" :icon="icon" />
      {{ text }}
      <template v-if="!icon && !text">{{ href }}</template>
    </slot>
  </a>
</template>

<script setup lang="ts">
interface IBasicLink {
  href: string
  text?: string
  icon?: string
}

defineProps<IBasicLink>()
</script>
