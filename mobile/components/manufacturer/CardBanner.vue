<template>
  <div
    class="bg-gray-100 m-auto w-72 h-32 bg-no-repeat bg-center bg-cover"
    :style="{ backgroundImage: `url('${$lang(banner, 'image')}')` }"
  >
    <div v-if="$lang(banner, 'title')" class="flex flex-row items-end h-full w-full">
      <div class="flex flex-col w-full pb-3 pt-10 px-3 bg-gradient-to-t from-black text-gray-200">
        <h3 class="text-base font-bold leading-5 uppercase">
          {{
            $lang(banner, 'title')
          }}
        </h3>
      </div>
    </div>
  </div>
</template>

<script>
import VueTypes from 'vue-types'

export default {
  name: 'CardBanner',
  props: {
    banner: VueTypes.object
  }
}
</script>

<style scoped>

</style>
