<template>
  <nuxt-link
    :to="{
      name: 'product',
      params: {
        alias: product.alias
      }
    }"
  >
    <div class="grid grid-cols-1 gap-x-8 gap-y-2 p-3 border bg-white rounded-xl border-c-grey-1">
      <div>
        <img
          :src="product.main_image ? $aspect(product.main_image, '129x129') : require('~/assets/images/No_Image_Available.jpg')"
          :alt="product.main_image ? $aspect(product.main_image, '129x129') : require('~/assets/images/No_Image_Available.jpg')"
          class="col-span-1"
        >
      </div>
      <div>
        <p class="text-sm leading-snug text-black font-medium my-2 line-clamp-2">
          {{ $lang(product, 'name') }}
        </p>

        <p v-if="product.monthly_repayment" class="text-sm text-c-gray-5 pb-1">
          от {{ product.monthly_repayment }} сум / мес.
        </p>
        <!-- <p v-if="product.discount_price" class="line-through text-sm text-c-red-1 -5 pb-1">
          {{ product.discount_price }} сум
        </p> -->
        <p v-if="product.total_price" class="font-bold text-lg text-black leading-6">
          {{ product.total_price }} сум
        </p>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
import VueTypes from 'vue-types'

export default {
  name: 'ProductCard',
  props: {
    product: VueTypes.object.def({})
  },
  methods: {
    sliceText (text) {
      if (text.length > 45) {
        return text.slice(0, 45) + ' ...'
      }
      return text
    }
  }
}
</script>
