<template>
  <div class="mt-12">
    <v-card class="p-6 mt-6" shaped style="border-radius: 1rem !important">
      <h2 class="m-4 head-fond">
        {{ $tc('common.recipe.step', steps.length) }}
      </h2>
      <v-card-text v-if="steps" style="font-size: 1rem !important">
        <ol class="list-number">
          <li v-for="(step, i) in steps" :key="i" :id="'step' + (i + 1)">
            <p class="pl-5 font-medium mb-7">{{ step.content }}</p>
          </li>
        </ol>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from '@nuxtjs/composition-api'
import usePosts from '~/composables/use-posts'
export default defineComponent({
  name: 'Steps',
  components: {},
  props: {
    steps: Array,
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, ctx) {
    return {}
  },
})
</script>

<style scoped>
ol.list-number {
  counter-reset: a;
}

ol.list-number li:before {
  top: 0.188rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  font-size: small;
  content: counter(a);
  counter-increment: a;
  border: 0.063rem solid #000;
  border-radius: 50%;
  margin-left: -1.5rem;
  margin-right: -1.5rem;
  float: left;
}
</style>
