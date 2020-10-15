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
      <v-col
        :lg="6"
        :md="6"
        :sm="12"
        :offset-sm="0"
        :offset-md="1"
        :offset-lg="1"
      >
        <breadcrumb :items="data.category"></breadcrumb>

        <h1 class="p-2 mb-6 recipe-title" v-html="data.title.rendered"></h1>
        <div class="text--primary p2">
          <Metas :data="data"></Metas>
          <!-- Times -->
          <TimePills :article="data" class="pt-4 pb-4"></TimePills>
          <v-divider v-if="data.content.rendered"></v-divider>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col :lg="4" :md="4" :sm="12" class="ma-0 pa-0">
        <!-- Socials -->
      </v-col>
      <v-col
        :lg="6"
        :md="6"
        :sm="12"
        :offset-sm="0"
        :offset-md="1"
        :offset-lg="1"
      >
        <div
          class="p-2"
          v-html="data.content.rendered"
          v-if="data.content.rendered"
        ></div>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from '@nuxtjs/composition-api'
import Metas from '~/components/Recipe/Metas.vue'
import TimePills from '~/components/Recipe/Time/Time.vue'
import Breadcrumb from '~/components/Recipe/Breadcrumb.vue'
export default defineComponent({
  name: 'TitleCard',
  components: {
    Metas,
    TimePills,
    Breadcrumb,
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
