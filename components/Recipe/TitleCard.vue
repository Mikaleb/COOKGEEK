<template>
  <div
    class="grid mx-auto bg-white"
    shaped
    style="border-radius: 1rem !important"
  >
    <v-row>
      <v-col :lg="4" :md="4" :sm="12" class="ma-0 pa-0">
        <HoverImage :data="data"></HoverImage>
      </v-col>
      <v-col :lg="6" :md="6" :sm="12" :offset-md="1" :offset-lg="1">
        <h1 class="mb-6 recipe-title" v-html="data.title.rendered"></h1>
        <div class="text--primary">
          <Metas :data="data"></Metas>
          <!-- Times -->
          <TimePills :article="data" class="pt-4"></TimePills>
          <div
            class="pt-4"
            v-html="data.content.rendered"
            v-if="data.content.rendered"
          ></div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from '@nuxtjs/composition-api'
import Metas from '~/components/Recipe/Metas.vue'
import TimePills from '~/components/Recipe/Time/Time.vue'
export default defineComponent({
  name: 'TitleCard',
  components: {
    Metas,
    TimePills,
  },
  props: {
    data: Object,
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, ctx) {
    return {}
  },
})
</script>
