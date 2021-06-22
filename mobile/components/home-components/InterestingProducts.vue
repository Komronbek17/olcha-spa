<template>
  <div class="interest">
    <div class="interest__text block-text max-w-md">
      <h2 class="interest__text-title text-lg font-bold whitespace-nowrap mr-1">
        {{ $t('id15') }}
      </h2>
      <a
        href="#"
        class="interest__text-see text-see whitespace-nowrap"
      >{{ $t('id34') }}</a>
    </div>
    <div
      class="my-2 installment__cards grid grid-rows-1 gap-x-2 gap-5 grid-flow-col auto-cols-max md:auto-cols-min overflow-x-scroll"
    >
      <product-card-container
        v-for="(product,index) in interestingProducts"
        :key="index"
        class="w-42 my-4"
        :product="product"
      />
    </div>
  </div>
</template>

<script>
import VueTypes from 'vue-types'
import ProductCardContainer from '../../reusable/ProductCardContainer'
export default {
  components: {
    ProductCardContainer
  },
  props: {
    interestingProducts: VueTypes.array.def([])
  }
}
</script>
