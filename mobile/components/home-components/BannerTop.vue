<template>
  <div class="flex items-center justify-center">
    <div class="pay max-w-md pink-grad rounded-2xl my-10 p-6">
      <h2 class="font-semibold text-2xl text-white">
        {{ $lang(bannerTop, 'title') }}
      </h2>
      <nuxt-link
        :to="{name:'payment-and-delivery'}"
        class="block mt-4 text-right text-base text-white font-550"
      >
        {{ $t('id11203') }}
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import VueTypes from 'vue-types'
export default {
  name: 'BannerTop',
  props: {
    bannerTop: VueTypes.object.def({})
  }
}
</script>
