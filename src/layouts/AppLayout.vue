<template>
  <v-app-bar density="compact">
    <v-app-bar-title>
      <router-link
        class="d-block text-decoration-none"
        style="color: rgba(var(--v-theme-on-surface))"
        to="/"
      >
        {{ t('RussianRefineries') }} demo
      </router-link>
    </v-app-bar-title>
    <v-spacer />
    <div class="px-4">
      <div class="mx-n4 d-flex">
        <div>
          <v-btn
            :to="{ name: 'Statistics'}"
          >Statistics</v-btn>

          <v-btn
            :to="{ name: 'Rosneft'}"
          >Rosneft</v-btn>

          <v-btn
            :to="{ name: 'Elaborations'}"
          >Elaborations</v-btn>
        </div>

        <v-select
          class="px-4"
          density="compact"
          hide-details
          :items="languages"
          :min-width="80"
          :model-value="current"
          @update:modelValue="changeLocale($event)"
        />
      </div>
    </div>
  </v-app-bar>

  <v-navigation-drawer v-model:rail="rail">
    <v-list density="compact">
      <v-list-subheader
        class="justify-end cursor-pointer"
        @click="rail = !rail"
      >
        <v-btn density="compact" :icon="`mdi-chevron-${rail ? 'right' : 'left'}`" />
      </v-list-subheader>
      <v-list-item
        v-for="item in menu"
        :key="item.name"
        exact
        :prepend-icon="item.icon"
        :title="item.title"
        :to="{ query: { show: item.name } }"
      />
    </v-list>
  </v-navigation-drawer>

  <!--  <v-main class="overflow-y-auto">-->
  <!--    <div>-->
  <!--      <router-view />-->
  <!--    </div>-->
  <!--  </v-main>-->

  <v-main class="h-100 overflow-y-auto">
    <router-view />
  </v-main>

  <!--    <AppFooter />-->
</template>

<script lang="ts" setup>
import { useLocale } from 'vuetify'
import { useI18n } from 'vue-i18n'
import { computed, ref } from 'vue'
const { t } = useI18n()

const languages = ['pl', 'en', 'ru', 'ua', 'de']
const { current } = useLocale()

const savedLanguage = localStorage.getItem('language')
function changeLocale (locale) {
  current.value = locale
  localStorage.setItem('language', locale)
}

if (savedLanguage) changeLocale(savedLanguage)

const menu = computed(() => [
  {
    name: 'Map',
    title: 'Map',
    icon: 'mdi-map-marker-multiple-outline',
  },
  {
    name: 'Table',
    title: 'Table',
    icon: 'mdi-table',
  },
  {
    name: 'Stats',
    title: 'Stats',
    icon: 'mdi-chart-bar',
  },
  {
    name: 'Info',
    title: 'Info',
    icon: 'mdi-information-variant',
  },
  {
    name: 'Budget',
    title: 'Budget',
    icon: 'mdi-cash',
  },
])

const rail = ref(true)
</script>

<style lang="scss">
body {
  color: #118833 !important;
}
</style>
