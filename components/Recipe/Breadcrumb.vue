<template>
  <div>
    <v-breadcrumbs :items="categories"></v-breadcrumbs>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from '@nuxtjs/composition-api'
import usePosts from '~/composables/use-posts'

export default defineComponent({
  name: 'Breadcrumb',
  props: {
    items: Array,
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, ctx) {
    const { categories, fetchCategories } = usePosts({ ctx })
    const propItems = computed(() => props.items)

    onMounted(async () => {
      if (propItems.value) {
        propItems.value.forEach((element: any, index: number) => {
          fetchCategories(element, index)
        })
      }
    })

    return { propItems, fetchCategories, categories }
  },
})
</script>
