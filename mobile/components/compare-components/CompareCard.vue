<template>
  <div class="px-2 py-3 rounded-2xl">
    <div class="flex justify-center">
      <img
        :src="product.main_image ? $aspect(product.main_image, '130x130'): require('~/assets/images/No_Image_Available.jpg')"
        :alt="product.main_image ? product.main_image : require('~/assets/images/No_Image_Available.jpg')"
      >
    </div>
    <div class="flex flex-col  divide-y-2 divide-c-gray-2">
      <div class="py-3">
        <h2 class="text-start font-medium text-sm leading-5 text-black mb-1 line-clamp-2">
          {{ $lang(product, 'name') }}
        </h2>
        <p class="text-start font-bold text-sm leading-5 text-black">
          {{ product.total_price }} сум
        </p>
      </div>
      <ul class="py-3  divide-y-2 divide-c-gray-2">
        <li
          class="py-3"
        >
          <p class="text-start font-bold  text-sm leading-5 text-black mb-1">
            Рейтинг
          </p>
          <rating :rating="product.rating" />
        </li>
        <li
          v-for="(value, name, index) in product.features"
          :key="index"
          class="py-3"
        >
          <p class="text-start font-bold  text-sm leading-5 text-black mb-1">
            {{ name }}
          </p>
          <p class="text-start font-medium text-sm leading-5 text-black">
            {{ $lang(value, 'name') || value }}
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import VueTypes from 'vue-types'
import Rating from '~/mobile/components/partials/Rating'

export default {
  name: 'CompareCard',
  components: {
    Rating
  },
  props: {
    product: VueTypes.object
  }
}
</script>
