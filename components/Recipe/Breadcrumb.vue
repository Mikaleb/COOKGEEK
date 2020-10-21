<template>
  <div>
    <div class="justify-left row align-center" v-if="propCategories">
      <v-breadcrumbs :items="cats" />
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  onMounted,
  ref,
} from '@nuxtjs/composition-api'
import usePosts from '~/composables/use-posts'

export default defineComponent({
  name: 'Breadcrumb',
  props: {
    categories: Array,
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, ctx) {
    const propCategories = computed(() => props.categories)
    const cats = ref(props.categories)

    return { propCategories, cats }
  },
})
</script>
