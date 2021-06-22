<template>
  <div class="need">
    <div class="need__text block-text">
      <h2 class="need__text-title text-lg font-bold whitespace-nowrap">
        {{ $t('id18') }}
      </h2>
      <a
        href="#"
        class="need__text-see text-see whitespace-nowrap"
      >{{ $t('id34') }}</a>
    </div>
    <div
      class="my-8 grid grid-rows-1 gap-x-2 gap-5 overflow-x-scroll grid-flow-col auto-cols-max md:auto-cols-min"
    >
      <product-card-container
        v-for="(product,index) in oftenNeeded"
        :key="index"
        class="w-42"
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
    oftenNeeded: VueTypes.array.def([])
  }
}
</script>

<style scoped>
@import '@/assets/scss/hideScroll.scss';
</style>
