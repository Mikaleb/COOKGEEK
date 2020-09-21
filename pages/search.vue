<template>
  <div class="home" v-if="!fetchingState">
    <div class="articles">
      <h1 class="text-xl">
        {{ $t('common.search.title') }}
        <span class="italic">{{query}}</span>
      </h1>
      <div v-if="items.length" class="pt-2" v-cloak>
        <Result :item="item" :key="i" v-for="(item,i) in items" />
      </div>
      <div v-else class="mx-auto" v-cloak>
        <a href="/">
          <div class="w-1/4 mx-auto">
            <img data-src="/cat-lost.png" v-lazy-load />
          </div>
        </a>
        <div class="w-3/4 mx-auto mt-10 text-center">
          <span class="mt-6 text-xl font-bold">{{ $t('common.search.no-result') }}</span>
          <p>
            {{ $t('common.search.not-found') }}
            <a href="/">{{ $t('common.search.but-others') }}</a>
          </p>
        </div>
      </div>
    </div>
    <!-- <TheSidebar /> -->
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  watch,
  computed,
  onBeforeMount,
} from '@vue/composition-api'
import usePosts from '~/composables/use-posts'
import useSearch from '~/composables/use-search'
import Result from '~/components/Search/Result.vue'

export default defineComponent({
  name: 'SearchResults',
  components: {
    Result,
  },
  head() {
    return {
      title: 'Search',
    }
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, ctx) {
    const { fetchSearchResults, searchResults, fetching } = useSearch({ ctx })

    const query = computed(() =>
      ctx.root.$route.query.query ? ctx.root.$route.query.query : ''
    )
    const items = computed(() => searchResults.value)
    const fetchingState = computed(() => fetching.value)

    let entries: any = []
    const search = ref<any>(null)

    const getSearchResults = async (subtype: string) => {
      // Items have already been requested
      if (fetching.value) return
      if (query.value !== null) {
        // Lazily load input items
        fetchSearchResults(0, query.value, 'post', subtype)
      }
    }

    watch(query, (value, prevValue) => {
      if (value !== prevValue) {
        getSearchResults('recipe')
      }
    })

    onBeforeMount(async () => {
      await getSearchResults('recipe')
    })

    return { query, getSearchResults, items, fetchingState }
  },
})
</script>
