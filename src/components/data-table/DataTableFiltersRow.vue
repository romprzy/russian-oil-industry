<template>
  <tr class="v-data-table__tr">
    <td
      v-for="key in Object.keys(filters)"
      :key="key"
    >
      <v-select
        v-model="filters[key]"
        density="compact"
        hide-details
        :items="filterItems[key]"
        :min-width="80"
        multiple
      />
    </td>
  </tr>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface IDataTableFiltersRowProps {
  headers: object
}

const props = defineProps<IDataTableFiltersRowProps>()
//
// const flatHeaders = computed(() => headers)
</script>
