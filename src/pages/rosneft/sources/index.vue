<template>
  <v-container fluid>
    <h1>Sources</h1>

    <RosneftSourcesRefineries />

    <v-container class="px-0 text-center" fluid>
      <v-row>
        <v-col
          v-for="domain in domains"
          cols="6"
        >
          <h1 class="">
            <span class="fi" :class="`fi-${domain.flag}`" />
            <span class="mx-6">{{ domain.langName }}</span>
            <a
              :href="domain.url"
              rel="noopener noreferrer"
              target="_blank"
            >{{ domain.domain }}</a>
          </h1>
        </v-col>
      </v-row>
    </v-container>

    <template
      v-for="source in sources"
      :key="source.title"
    >
      <!--      <v-container class="px-0 text-center" fluid>-->
      <!--        <h1>{{ source.title }}</h1>-->
      <!--      </v-container>-->

      <v-container class="px-0" fluid>
        <v-row>
          <v-col
            v-for="domain in domains"
            cols="6"
          >
            <v-card>
              <v-card-title>
                <span class="fi" :class="`fi-${domain.flag}`" />
                <span class="ml-4">{{ source.title}}</span>
              </v-card-title>

              <v-card-subtitle>
                <a
                  v-if="source?.[domain.lang]?.url"
                  :href="source?.[domain.lang]?.url"
                  rel="noopener noreferrer"
                  target="_blank"
                >{{ source?.[domain.lang]?.url }}</a>
              </v-card-subtitle>

              <v-card-text>
                <v-container
                  v-for="(item, index) in source?.items || []"
                  :key="item.title"
                  class="px-0"
                >
                  <h3>{{ index + 1 }}. {{ item.title }}</h3>

                  <v-list
                    v-if="item?.items?.length"
                    class="d-inline-block"
                    density="compact"
                  >
                    <v-list-item
                      v-for="child in item?.items"
                      :key="child"
                    >
                      {{ child }}
                    </v-list-item>
                  </v-list>
                </v-container>
              </v-card-text>
            </v-card>


            <!--            <v-list v-if="source?.items?.length">-->
            <!--              <v-list-item-->
            <!--                v-for="item in source?.items"-->
            <!--                :key="item.title"-->
            <!--              >{{ item.title }}</v-list-item>-->
            <!--            </v-list>-->

            <!--            <pre>{{ source?.[domain.lang]?.items }}</pre>-->
          </v-col>
        </v-row>
      </v-container>
    </template>

    <!--    <v-container fluid />-->

    <!--    <v-row class="mt-0">-->
    <!--      <v-col-->
    <!--        v-for="domain in domains"-->
    <!--        cols="6"-->
    <!--      >-->
    <!--        <h1 class="">-->
    <!--          <span class="fi" :class="`fi-${domain.flag}`" />-->
    <!--          <span class="mx-6">{{ domain.lang.toUpperCase() }}</span>-->
    <!--          <a-->
    <!--            :href="domain.url"-->
    <!--            rel="noopener noreferrer"-->
    <!--            target="_blank"-->
    <!--          >{{ domain.domain }}</a>-->
    <!--        </h1>-->
    <!--      </v-col>-->
    <!--    </v-row>-->

    <!--    <v-row class="mt-0">-->
    <!--      <v-col cols="6">-->
    <!--        <h1 class=""><span class="fi fi-gb mr-6" /> EN</h1>-->
    <!--        <a-->
    <!--          href="https://www.rosneft.com/"-->
    <!--          rel="noopener noreferrer"-->
    <!--          target="_blank"-->
    <!--        >rosneft.com</a>-->

    <!--        <v-container>-->
    <!--          <ol>-->
    <!--            <li>-->
    <!--              Url:-->
    <!--              <a-->
    <!--                href="https://www.rosneft.com/"-->
    <!--                rel="noopener noreferrer"-->
    <!--                target="_blank"-->
    <!--              >https://www.rosneft.com/</a>:-->
    <!--              <ul>-->
    <!--                <li>-->
    <!--                  Rosneft locations list/map-->
    <!--                </li>-->
    <!--              </ul>-->
    <!--            </li>-->
    <!--          </ol>-->
    <!--        </v-container>-->


    <!--        &lt;!&ndash;        <RosneftLocationsEn />&ndash;&gt;-->
    <!--      </v-col>-->
    <!--      <v-col cols="6">-->
    <!--        <h1 class=""><span class="fi fi-ru mr-6" /> RU</h1>-->
    <!--        <a-->
    <!--          href="https://www.rosneft.ru/"-->
    <!--          rel="noopener noreferrer"-->
    <!--          target="_blank"-->
    <!--        >https://www.rosneft.ru/</a>-->

    <!--        <RosneftLocationsRu />-->
    <!--      </v-col>-->
    <!--    </v-row>-->
  </v-container>

<!--  <v-container fluid>-->
<!--    <span class="fi fi-ru" />-->
<!--    <span class="fi fi-de" />-->
<!--    <span class="fi fi-by" />-->
<!--    <span class="fi fi-in" />-->
<!--    &lt;!&ndash;    <RosneftRefineries />&ndash;&gt;-->
<!--  </v-container>-->
</template>
<script setup lang="ts">
const domains = [
  {
    lang: 'en',
    langName: 'English',
    flag: 'gb',
    url: 'https://www.rosneft.com/',
    domain: 'rosneft.com',
  },
  {
    lang: 'ru',
    langName: 'Russian',
    flag: 'ru',
    url: 'https://www.rosneft.ru/',
    domain: 'rosneft.ru',
  },
]

const sources = [
  {
    title: 'Rosneft home page',
    items: [
      {
        title: 'Rosneft Locations',
      },
    ],
    en: {
      url: 'https://www.rosneft.com/',
    },
    ru: {
      url: 'https://www.rosneft.ru/',
    },
  },
  {
    title: 'Rosneft Refineries page',
    items: [
      {
        title: 'Refineries List',
      },
    ],
    en: {
      url: 'https://www.rosneft.com/business/Downstream/Neftepererabotka/',
    },
    ru: {
      url: 'https://www.rosneft.ru/business/Downstream/refining/',
    },
  },
  {
    title: 'Rosneft at a glance',
    items: [
      {
        title: 'Rosneft in numbers',
        items: [
          'The largest tax payer in Russia',
          '6% share in the global oil production',
          '40% share in oil production in Russia',
          '8% share in gas production in Russia',
          '23% share of gas in the Company’s hydrocarbon production',
          '13 big oil refineries in Russia',
          '35% share in the Russian refining market',
          'About 3 thousand fuel filling stations in Russia',
        ],
      },
    ],
    en: {
      url: 'https://www.rosneft.com/about/Rosneft_today/',
    },
  },
]
</script>
