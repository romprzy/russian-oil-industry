<template>
  <v-app-bar class="d-flex" density="compact">
    <v-btn
      class="h-100"
      exact
      :rounded="0"
      :to="{ name: 'Rosneft' }"
    >
      Rosneft
    </v-btn>
    <v-btn
      class="h-100"
      :rounded="0"
      :to="{ name: 'RosneftMap' }"
    >
      Map
    </v-btn>
    <v-btn
      class="h-100"
      :rounded="0"
      :to="{ name: 'RosneftLocations' }"
    >
      Locations
    </v-btn>
    <v-btn
      class="h-100"
      :rounded="0"
      :to="{ name: 'RosneftRefineries' }"
    >
      Refineries
    </v-btn>
    <v-btn
      class="h-100"
      :rounded="0"
      :to="{ name: 'RosneftSources' }"
    >
      Sources
    </v-btn>
  </v-app-bar>

  <v-container
    v-if="$route.name === 'Rosneft'"
    fluid
  >
    <h2>Rosneft in numbers</h2>
    <v-card>
      <v-card-title><v-icon icon="mdi-web" /> Global</v-card-title>
      <v-card-text>
        <v-container fluid>
          <v-list density="compact">
            <v-list-item>Share in the global oil production: 6%</v-list-item>
          </v-list>
        </v-container>
      </v-card-text>
    </v-card>

    <v-card>
      <v-card-title><span class="fi fi-ru" /> Russia</v-card-title>
      <v-card-text>
        <v-container fluid>
          <v-list
            v-model:opened="opened"
            density="compact"
            open-strategy="multiple"
          >
            <v-list-item>The largest tax payer in Russia</v-list-item>
            <v-list-group value="oil-refining">
              <template v-slot:activator="{ props }">
                <v-list-item
                  v-bind="props"
                  title="Oil refining"
                />
              </template>
              <v-list-item>Rosneft is No. 1 in Russia in terms of capacities and volumes of oil refining.</v-list-item>
              <v-list-item>40% share in oil production in Russia</v-list-item>
              <v-list-item>35% share in the Russian refining market</v-list-item>

              <v-list-item>13 big oil refineries in Russia</v-list-item>
              <v-list-item>The total design capacity of the Company's main oil refineries in Russia is 118.4 million tons of oil per year.</v-list-item>
              <v-list-item>Rosneft also includes several mini-refineries, the largest of which is the Nizhne-Vartovsk Refinery Association.</v-list-item>
              <v-list-item>The 2018 processing yield of the Company's mini-refineries in the Russian Federation amounted to 2 million tons</v-list-item>
              <v-list-item>About 3 thousand fuel filling stations in Russia</v-list-item>
            </v-list-group>
            <v-list-item>8% share in gas production in Russia</v-list-item>
          </v-list>

          <v-list density="compact" />
        </v-container>
      </v-card-text>
    </v-card>

    <v-card>
      <v-card-title><span class="fi fi-de" /> Germany</v-card-title>
      <v-card-text>
        <v-container fluid>
          <v-list density="compact">
            <v-list-item>Rosneft also owns stakes in a number of refining assets abroad: in Germany, Belarus and India.</v-list-item>
            <v-list-item>Refining volumes at German refineries in 2018 amounted to 11.5 million tons.</v-list-item>
            <v-list-item>Refining of Mozyr Oil Refinery's crude oil share of Rosneft in 2018 was 2.1 million tons</v-list-item>
          </v-list>
        </v-container>
      </v-card-text>
    </v-card>

    <v-card>
      <v-card-title><span class="fi fi-by" /> Belarus</v-card-title>
      <v-card-text>
        <v-container fluid>
          <v-list density="compact">
            <v-list-item>Rosneft also owns stakes in a number of refining assets abroad: in Germany, Belarus and India.</v-list-item>
          </v-list>
        </v-container>
      </v-card-text>
    </v-card>

    <v-card>
      <v-card-title><span class="fi fi-in" /> India</v-card-title>
      <v-card-text>
        <v-container fluid>
          <v-list density="compact">
            <v-list-item>Rosneft also owns stakes in a number of refining assets abroad: in Germany, Belarus and India.</v-list-item>
          </v-list>
        </v-container>
      </v-card-text>
    </v-card>
  </v-container>
  <!--  <RosneftRefineries />-->
  <router-view v-else />
</template>
<script setup lang="ts">
import { ref } from 'vue'

const opened = ref(['oil-refining'])
</script>
