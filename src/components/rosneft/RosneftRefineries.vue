<template>
  <pre>{{ sourcesUrls }}</pre>
  <v-data-table
    :headers="headers"
    :items="items.map((item, index) => ({...item, index: index + 1}))"
    :items-per-page="-1"
  >
    <template #body.prepend>
      <tr class="v-data-table__tr">
        <td
          v-for="header in flatHeaders"
          :key="header.key"
        >
          <v-select
            v-if="header.filter"
            v-model="filters[header.key]"
            density="compact"
            hide-details
            :items="filterItems[header.key]"
            :min-width="80"
            multiple
          />
        </td>
      </tr>
    </template>

    <template
      v-for="child in formattedHeaders"
      :key="child.key"
      #[`item.${child.key}`]="row"
    >
      {{ formatter(row.item[child.key]) }}
    </template>

    <template #item.url="row">
      <BasicLink
        v-if="row.item.url"
        :href="row.item.url"
        icon="mdi-web"
      />
    </template>

    <template #body.append>
      <template
        v-for="lang in applyFlatFilters(filterItems['lang'], 'lang')"
        :key="lang"
      >
        <tr
          v-for="(name, langIndex) in applyFlatFilters(filterItems['name'], 'name')"
          :key="name"
          class="v-data-table__tr"
        >
          <template
            v-for="(header, index) in headers"
            :key="header.key"
          >
            <template v-if="headers[index].children">
              <td
                v-for="(child, childKey) in headers[index].children"
                class="v-data-table__td"
                :class="child.align ? `v-data-table-column--align-${child.align}` : ''"
                :style="langIndex > 0 ? 'border-top-width: 1px; border-top-style: solid;' : 'border-top-style: double;'"
              >
                <template v-if="child.formatter">
                  <!--                  <pre class="text-left">{{ row.item.name }}</pre>-->
                  <template v-if="name === 'processingPercentage'">{{ getAverage(itemsByNameLang({ items, name, lang }), child.key) }}</template>
                  <template v-else>{{ getFormattedSummary({ items: itemsByNameLang({ items, name, lang }), key: child.key }) }}</template>
                </template>
              </td>
            </template>

            <td
              v-else
              class="v-data-table__td"
              :class="header.align ? `v-data-table-column--align-${header.align}` : ''"
              :style="langIndex > 0 ? 'border-top-width: 1px; border-top-style: solid;' : 'border-top-style: double;'"
            >
              <template v-if="header.key === 'lang'">{{ lang }}</template>
              <template v-if="header.key === 'name'">{{ name }}</template>
            </td>
          </template>
        </tr>
      </template>
    </template>
  </v-data-table>
</template>

<script setup lang="ts">
import rosneftRefineries from '../../data/rosneftRefineries.json'
import { computed, ref } from 'vue'
import { useNumberFormatter } from '../../composables/numberFormatter'

const { formatter } = useNumberFormatter()

const years = Object.freeze([... new Set([
  ...rosneftRefineries.refineries.map(refinery => refinery.en.years).flat(),
  ...rosneftRefineries.refineries.map(refinery => refinery.ru.years).flat(),
])].filter(year => Boolean(year)))


const refineriesMerged = Object.freeze(rosneftRefineries.refineries.map(refinery => (
  refinery.en.items.map(item => {
    const result = {
      lang: 'en',
      nameEn: refinery.en.name,
      nameRu: refinery.ru.name,
      ...item,
      url: refinery.en.url,
    }

    years.forEach(year => {
      if (!result[year]) {
        const ruYear = refinery.ru.items?.find(({ name }) => name === item.name)?.[year]
        if (ruYear) result[year] = ruYear
      }
      // if (!result[year]) result[year] = refinery.ru.items.find(({ name }) => name === item.name)[year]
    })

    return result
  })
)).flat().sort((a, b) => a.nameEn.localeCompare(b.nameEn) || a.name.localeCompare(b.name)))
// const refineriesMerged = rosneftRefineries.refineries.map(refinery => (
//   [
//     ...[...refinery.en.items].map(item => ({
//       lang: 'en',
//       nameEn: refinery.en.name,
//       nameRu: refinery.ru.name,
//       ...item,
//       url: refinery.en.url,
//     })),
//     ...[...refinery.ru.items].map(item => ({
//       lang: 'ru',
//       nameEn: refinery.en.name,
//       nameRu: refinery.ru.name,
//       ...item,
//       url: refinery.ru.url,
//     })),
//   ]
// )).flat().sort((a, b) => a.nameEn.localeCompare(b.nameEn) || a.name.localeCompare(b.name))


const headers = [
  {
    key: 'index',
    title: 'index',
    align: 'end',
  },
  {
    key: 'lang',
    title: 'lang',
    filter: true,
  },
  {
    key: 'names',
    title: 'names',
    align: 'center',
    children: [
      {
        key: 'nameEn',
        title: 'nameEn',
        filter: true,
      },
      {
        key: 'nameRu',
        title: 'nameRu',
        filter: true,
      },
    ],
  },
  {
    key: 'name',
    title: 'name',
    filter: true,
  },
  {
    key: 'years',
    title: 'years',
    align: 'center',
    children: [
      ...years.map(year => ({
        key: String(year),
        title: year,
        align: 'end',
        // value: (item) => formatter(item[year]),
        formatter: true,
      })),
    ],
  },
  {
    key: 'summaries',
    title: 'summaries',
    align: 'center',
    children: [
      {
        key: 'min',
        title: 'min',
        align: 'end',
        formatter: true,
      },
      {
        key: 'max',
        title: 'max',
        align: 'end',
        formatter: true,
      },
    ],
  },
  {
    key: 'url',
    title: 'url',
  },
]

const filters = ref({
  lang: [],
  nameEn: [],
  nameRu: [],
  name: [],
})

const flatHeaders = computed(() => headers.map(header =>
  header.children?.length ? header.children : header,
).flat())

const filterItems = computed(() => {
  const filterItems = {}
  flatHeaders.value.map(({ key }) => key).forEach(key => {
    filterItems[key] = [... new Set(refineriesMerged.map(item => item[key]))]
  })
  return filterItems
})

const applyFilters = (items) => items
  .filter(item => {
    let result = true
    Object.keys(filters.value).forEach(key => {
      if (filters.value[key].length) {
        if (!filters.value[key].includes(item[key])) result = false
      }
    })
    return result
  })
const applyFlatFilters = (items, filterKey) => items
  .filter(item => {
    let result = true
    const filter = filters.value[filterKey]
    if (filter?.length && !filter.includes(item)) result = false
    // Object.keys(filters.value).forEach(key => {
    //   console.log('applyFlatFilters', filterKey, key)
    //   if (key === filterKey && filters.value[key].length) {
    //     if (!filters.value[key].includes(item)) result = false
    //   }
    // })
    return result
  })

const formattedHeaders = computed(() => flatHeaders.value.filter(child => child.formatter))

// const items = computed(() =>
//   refineriesMerged.map(refinery => ({
//     ...refinery,
//     min: years.map(year => refinery[year]).sort()[0],
//     max: years.map(year => refinery[year]).sort((a, b) => b - a)[0],
//   }))
//     .filter(refinery => {
//       let result = true
//       Object.keys(filters.value).forEach(key => {
//         if (filters.value[key].length) {
//           if (!filters.value[key].includes(refinery[key])) result = false
//         }
//       })
//       return result
//     }),
// )

const items = computed(() => applyFilters(
  refineriesMerged.map(refinery => ({
    ...refinery,
    min: years.map(year => refinery[year]).sort()[0],
    max: years.map(year => refinery[year]).sort((a, b) => b - a)[0],
  })),
))

const itemsByNameLang = ({ items, name, lang }) => items.filter(item => item.name === name && item.lang === lang)
const getSummary = ({ items, key }) => items.map(i => i[key]).reduce((a, b) => (a || 0) + (b || 0), 0)
const getFormattedSummary = ({ items, key }) => formatter(getSummary({ items, key }))

const getAverage = (items, key) => items.length ? formatter(getSummary({ items, key }) / items.length / 100, { style: 'percent' }) : ''

const sourcesUrls = computed(() =>
  [... new Set(refineriesMerged
    // .sort((a, b) => a.lang.localeCompare(b.lang))
    .map(item => item.url))],
)
const groupBy = { key: 'refinery', order: 'asc' }
</script>
