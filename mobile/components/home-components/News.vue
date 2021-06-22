<template>
  <div class="news w-full my-2">
    <div class="news__text block-text">
      <h2 class="news__text-title text-title">
        {{ $t('id17') }}
      </h2>
      <a
        href="#"
        class="news__text-see text-see"
      >{{ $t('id34') }}</a>
    </div>
    <div
      class="grid grid-rows-1 gap-x-2 gap-5 grid-flow-col auto-cols-max md:auto-cols-min overflow-x-scroll"
    >
      <product-card-container
        v-for="(product,index) in newProducts"
        :key="index"
        class="w-42 my-4"
        :product="product"
      />
    </div>
  </div>
</template>
<script>
import VueTypes from 'vue-types'
import ProductCardContainer from '~/mobile/reusable/ProductCardContainer'

export default {
  components: {
    ProductCardContainer
  },
  props: {
    newProducts: VueTypes.array.def([])
  }
}
</script>

<style scoped>
@import '@/assets/scss/hideScroll.scss';
</style>
