<template>
  <div class="mt-12">
    <v-card class="p-6" shaped style="border-radius: 1rem !important">
      <template v-if="data" id="ingredients">
        <v-card-title class="font-weight-bold">{{
          $tc('common.recipe.ingredient', nbIngredients)
        }}</v-card-title>
        <v-card-text>
          <v-checkbox
            v-for="(ingredient, i) in data"
            :key="i"
            :label="`${ingredient.quantity} ${ingredient.name}`"
          ></v-checkbox>
        </v-card-text>
      </template>
    </v-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'Ingredients',
  components: {},
  props: {
    data: Array,
    nbIngredients: Number,
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, ctx) {
    return {}
  },
})
</script>
