<template>
  <span>
    <!-- Universe -->
    <v-chip
      class="mr-2"
      v-if="data.acf.universe"
      color="#B87BC8"
      text-color="white"
    >
      <v-icon size="medium" class="ml-1" left>fas fa-disease</v-icon>
      <template>{{ data.acf.universe }}</template>
    </v-chip>
    <!-- Servings -->
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-chip
          class="mr-2"
          v-if="data.acf.servings > 0"
          v-on="on"
          color="primary"
        >
          <v-icon size="medium" class="ml-1" left>fas fa-utensils</v-icon>
          <template>{{ data.acf.servings }}</template>
        </v-chip>
      </template>
      <span>{{ $t('common.recipe.servings') }}</span>
    </v-tooltip>

    <!-- Difficulty -->
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-chip
          class="mr-2"
          text-color="white"
          v-if="data.acf.difficulty"
          v-on="on"
          :color="colorDiff[data.acf.difficulty]"
        >
          <v-icon size="medium" class="ml-1" left>fas fa-tachometer-alt</v-icon>
        </v-chip>
      </template>
      <span>{{ difficulties[data.acf.difficulty] }}</span>
    </v-tooltip>
  </span>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'Metas',
  components: {},
  props: {
    data: Object,
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, ctx) {
    const difficulties = [
      ctx.root.$i18n.t('recipe.difficulty.simple'),
      ctx.root.$i18n.t('recipe.difficulty.medium'),
      ctx.root.$i18n.t('recipe.difficulty.hard'),
    ]

    const colorDiff = ['green', 'orange', 'red']
    return { difficulties, colorDiff }
  },
})
</script>
