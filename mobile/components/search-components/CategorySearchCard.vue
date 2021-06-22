<template>
  <nuxt-link
    :to="{
      name: 'manufacturer',
      params: {
        alias: manufacturer.alias
      }
    }"
    class="block py-5 px-4"
  >
    <div class="flex justify-between items-center">
      <div class="flex items-center">
        <img
          :src="manufacturer.main_image ? $aspect(manufacturer.main_image, '40x40') : require('~/assets/images/No_Image_Available.jpg')"
          :alt="manufacturer.main_image ? manufacturer.main_image : require('~/assets/images/No_Image_Available.jpg')"
          class="w-10 h-10"
        >
        <div class="ml-4">
          <p class="text-c-gray-6 text-base font-font-550 line-clamp-1">
            {{ $lang(manufacturer, 'name') }}
          </p>
          <p class="text-c-gray-5 text-xs font-font-550">
            Бренд
          </p>
        </div>
      </div>
      <img src="~/assets/icons/Iconarrow-right.svg" alt="Iconarrow-right.svg">
    </div>
  </nuxt-link>
</template>

<script>
import VueTypes from 'vue-types'

export default {
  name: 'CategorySearchCard',
  props: {
    manufacturer: VueTypes.object
  }
}
</script>

<style scoped>

</style>
