/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
// import RosneftRefineries from '../components/RosneftRefineries.vue'
// import { setupLayouts } from 'virtual:generated-layouts'

import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import StatisticsPage from '../pages/StatisticsPage.vue'
import RosneftPage from '../pages/rosneft/RosneftPage.vue'
import RosneftRefineriesPage from '../pages/rosneft/RosneftRefineriesPage.vue'
import RosneftLocationsPage from '../pages/rosneft/RosneftLocationsPage.vue'
import RosneftMapPage from '../pages/rosneft/RosneftMapPage.vue'
import Sources from '../pages/rosneft/sources/index.vue'
import ElaborationsPage from '../pages/elaborations/ElaborationsPage.vue'

const routes = [
  {
    name: 'Home',
    path: '/',
    component: Home,
  },
  {
    name: 'Statistics',
    path: '/statistics',
    component: StatisticsPage,
  },
  {
    name: 'Elaborations',
    path: '/elaborations',
    component: ElaborationsPage,
    children: [
      // {
      //   name: 'RosneftLocations',
      //   path: 'locations',
      //   component: RosneftLocationsPage,
      // },
    ],
  },
  {
    name: 'Rosneft',
    path: '/rosneft',
    component: RosneftPage,
    children: [
      {
        name: 'RosneftMap',
        path: 'map',
        component: RosneftMapPage,
      },
      {
        name: 'RosneftLocations',
        path: 'locations',
        component: RosneftLocationsPage,
      },
      {
        name: 'RosneftRefineries',
        path: 'refineries',
        component: RosneftRefineriesPage,
      },
      {
        name: 'RosneftSources',
        path: 'sources',
        component: Sources,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  // extendRoutes: setupLayouts,
})

export default router
