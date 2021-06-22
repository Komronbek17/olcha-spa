<template>
  <li class="flex items-center py-3">
    <img
      :src="product.main_image ? $aspect(product.main_image, '36x36') : require('~/assets/images/No_Image_Available.jpg')"
      :alt="product.main_image"
      class="w-8 h-8 overflow-hidden"
    >
    <p class="font-550 text-sm leading-4 text-c-gray-6 mx-2">
      {{ $lang(product, 'name') }}
    </p>
    <span class="font-550 text-sm leading-4 text-c-gray-6">
      x{{ product.amount }}
    </span>
  </li>
</template>

<script>
import VueTypes from 'vue-types'

export default {
  name: 'OrderList',
  props: {
    product: VueTypes.object
  }
}
</script>
