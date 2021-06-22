<template>
  <div>
    <div class="block-text max-w-md">
      <h2 class="text-lg font-bold whitespace-nowrap">
        Выгодная рассрочка
      </h2>
      <a
        href="#"
        class="text-see whitespace-nowrap"
      >{{ $t('id34') }}</a>
    </div>
    <div
      class="my-8 grid grid-rows-1 gap-x-2 gap-5 overflow-x-scroll grid-flow-col auto-cols-max md:auto-cols-min"
    >
      <product-card-container
        v-for="(product,index) in installmentAdvantage"
        :key="index"
        class="w-42 my-2"
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
    installmentAdvantage: VueTypes.array.def([])
  }
}
</script>

<style scoped>
@import '@/assets/scss/hideScroll.scss';
</style>
