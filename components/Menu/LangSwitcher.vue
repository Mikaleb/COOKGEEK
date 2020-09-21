<template>
  <div class="mt-6">
    <span class="text-lg">{{$t('language')}}</span>
    <v-select
      v-model="choosedLocale"
      :items="availableLocales"
      item-text="name"
      item-value="code"
      menu-props="auto"
      :label="this.$t('select-lang')"
      hide-details
      prepend-icon="fa-globe"
      single-line
    ></v-select>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  toRefs,
  reactive,
  watch,
  computed,
  onMounted,
} from '@vue/composition-api'

export default defineComponent({
  name: 'LangSwitcher',
  components: {},
  props: {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, ctx) {
    // @ts-ignore
    const choosedLocale = ref('')
    const availableLocales = computed(() =>
      // @ts-ignore
      ctx.root.$i18n.locales.filter(
        // @ts-ignore
        (locale: any) => locale.code !== ctx.root.$i18n.locale
      )
    )

    watch(
      () => choosedLocale.value,
      (newLocale, prevLocale) => {
        ctx.root.$i18n.setLocale(newLocale)
      }
    )

    onMounted(() => {
      choosedLocale.value = ctx.root.$i18n.locale
    })

    return { availableLocales, choosedLocale }
  },
})
</script>
