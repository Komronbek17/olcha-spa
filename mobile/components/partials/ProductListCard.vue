<template>
  <nuxt-link
    :to="{
      name: 'product',
      params: {
        alias: product.alias
      }}"
  >
    <div class="grid grid-cols-3 gap-x-2 p-3 border bg-white rounded-xl border-c-grey-1">
      <img
        :src="product.main_image ? $aspect(product.main_image, '129x129') : require('~/assets/images/No_Image_Available.jpg')"
        :alt="product.main_image ? $aspect(product.main_image, '129x129') : require('~/assets/images/No_Image_Available.jpg')"
        class="col-span-1"
      >
      <div class="px-3 col-span-2">
        <p class="text-sm text-c-gray-5">
          {{ product.category_name }}
        </p>

        <p class="text-base leading-snug text-black font-medium my-2 line-clamp-3">
          {{ $lang(product, 'name') }}
        </p>

        <p v-if="product.monthly_repayment" class="text-sm text-c-gray-5 pb-1">
          от {{ product.monthly_repayment }} сум / мес.
        </p>
        <!--      <p class="text-sm text-c-gray-5 pb-1">-->
        <!--        {{ product.discount_price }}-->
        <!--      </p>-->
        <p class="font-bold text-lg text-black leading-6">
          {{ product.total_price }} сум
        </p>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
import VueTypes from 'vue-types'

export default {
  name: 'ProductListCard',
  props: {
    product: VueTypes.object.def({})
  }
}
</script>
