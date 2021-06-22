<template>
  <nuxt-link
    :to="{
      name: 'category/variation',
      params: {
        alias: $route.params.alias,
        variation: category.alias
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
      <div>
        <p class="line-clamp-2">
          {{ $lang(category, 'name') }}
        </p>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
import VueTypes from 'vue-types'

export default {
  name: 'CategoryBranchCart',
  props: {
    category: VueTypes.object
  }
}
</script>
