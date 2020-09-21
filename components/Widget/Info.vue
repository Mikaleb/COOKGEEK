<template>
  <div>
    <v-card shaped style="border-radius: 1rem !important" class="mb-8">
      <v-card-title class="font-weight-bold">{{ $t('common.info') }}</v-card-title>
      <v-card-text>
        <p>🍜 {{$t('common.meta.description')}}</p>
        <LangSwitcher></LangSwitcher>
      </v-card-text>
    </v-card>
    <span class="ml-8 text-xs">&copy; CDG 2017 - {{ new Date().getFullYear() }}</span>
  </div>
</template>

    <script lang="ts">
import { defineComponent } from '@vue/composition-api'
import LangSwitcher from '~/components/Menu/LangSwitcher.vue'

export default defineComponent({
  name: 'SidebarInfo',
  components: {
    LangSwitcher,
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, ctx) {
    return {}
  },
})
</script>
