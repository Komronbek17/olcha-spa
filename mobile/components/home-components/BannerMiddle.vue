<template>
  <div class="flex text-center items-center justify-center cook my-2 max-w-md">
    <img
      :src="$lang(bannerMiddle,'image')"
      class="cook__img w-full h-full"
    >
  </div>
</template>

<script>
import VueTypes from 'vue-types'
export default {
  props: {
    bannerMiddle: VueTypes.object.def({})
  }
}
</script>
