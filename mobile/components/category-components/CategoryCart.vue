<template>
  <div class="category-cart p-5 flex flex-col text-center md:flex-col w-200">
    <nuxt-link
      :to="{
        name: 'category',
        params: {
          alias: category.alias
        }
      }"
    >
      <div>
        <img
          :src="category.main_image ? $aspect(category.main_image, '177x150') : require('~/assets/images/No_Image_Available.jpg')"
          :alt="$aspect(category.main_image, '177x150')"
        >
      </div>
      <div>
        <p class="text-sm font-medium">
          {{ $lang(category, 'name') }}
        </p>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
import VueTypes from 'vue-types'

export default {
  name: 'CategoryCart',
  props: {
    category: VueTypes.object
  }
}
</script>

<style scoped>
.category-cart {
  background: #f8f8f8;
  border-radius: 16px;
}
</style>
