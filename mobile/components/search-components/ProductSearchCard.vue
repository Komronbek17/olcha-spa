<template>
  <nuxt-link
    :to="{
      name: 'product',
      params: {
        alias: product.alias
      }
    }"
    class="block py-5 px-4"
  >
    <div class="flex justify-between items-center">
      <div>
        <p class="text-c-gray-6 text-sm font-font-550 line-clamp-1">
          {{ $lang(product, 'name') }}
        </p>
        <p class="text-c-gray-6 font-bold text-base">
          {{ product.total_price }}
        </p>
      </div>
      <img
        :src="product.main_image ? $aspect(product.main_image, '60x60') : require('~/assets/images/No_Image_Available.jpg')"
        :alt="product.main_image ? product.main_image : require('~/assets/images/No_Image_Available.jpg')"
      >
    </div>
  </nuxt-link>
</template>

<script>
import VueTypes from 'vue-types'

export default {
  name: 'ProductSearchCard',
  props: {
    product: VueTypes.object
  }
}
</script>

<style scoped>

</style>
