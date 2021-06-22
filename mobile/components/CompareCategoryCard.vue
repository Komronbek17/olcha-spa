<template>
  <nuxt-link
    :to="{
      name: 'compare/product',
      params: {
        first: category.aliases[0],
        second: category.aliases[1],
      },
      query: {
        category: category.id
      }
    }"
  >
    <div
      class="bg-c-gray-1 flex items-center justify-start rounded-xl px-2"
    >
      <div id="image-place">
        <img
          :src="category.main_image ? $aspect(category.main_image, '77x66') : require('~/assets/images/No_Image_Available.jpg')"
          :alt="$aspect(category.main_image, '77x66')"
          class="w-20 mr-2"
        >
      </div>
      <div class="flex justify-between items-center w-full px-2">
        <p class="line-clamp-2">
          {{ $lang(category, 'name') }}
        </p>
        <div v-if="count" class="w-6 h-6 bg-c-red-1 rounded-full  text-c-gray-1 text-center">
          <span>{{ count }}</span>
        </div>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
import VueTypes from 'vue-types'

export default {
  name: 'CompareCategoryCard',
  props: {
    category: VueTypes.object,
    count: VueTypes.number.def(0)
  }
}
</script>

<style scoped>

</style>
