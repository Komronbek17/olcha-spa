<template>
  <div class="installment my-10 -mx-4 px-4 py-1 pink-grad">
    <div class="installment__text max-w-md">
      <h2 class="installment__text-title text-xl pr-2 text-white font-bold">
        Покупай товары в рассрочку
      </h2>
      <p class="installment__text-descr mt-2 mb-4 text-white text-base font-550">
        Без оформления кредита!
      </p>
    </div>
    <div
      class="my-8 installment__cards grid grid-rows-1 gap-x-2 gap-5 grid-flow-col auto-cols-max md:auto-cols-min overflow-x-scroll"
    >
      <product-card-container
        v-for="(product,index) in installmentProducts"
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
    installmentProducts: VueTypes.array.def([])
  }
}
</script>

<style>
@import '@/assets/scss/hideScroll.scss';
</style>
