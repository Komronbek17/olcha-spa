<template>
  <div
    class="bg-c-gray-1 flex items-center justify-start rounded-xl px-2"
    @click="$emit('on:click')"
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
</template>

<script>
import VueTypes from 'vue-types'

export default {
  name: 'ManufacturerCategoryCart',
  props: {
    category: VueTypes.object
  }
}
</script>

<style scoped>

</style>
