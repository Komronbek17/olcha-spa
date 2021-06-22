<template>
  <div class="text-center pb-6 px-4 relative flex items-center justify-center">
    <div class="flex text-center items-center justify-center max-w-md">
      <!-- <img
        :src="$lang(bannerBottom,'image')"
        class="cook__img w-full h-full"
      > -->
      <img
        src="~/assets/images/sale50.png"
        class="w-full h-full"
      >
    </div>
  </div>
</template>

<script>
/* I cannot use bannerBottom because banner value came null */
import VueTypes from 'vue-types'
export default {
  props: {
    bannerBottom: VueTypes.object.def({})
  }
}
</script>
