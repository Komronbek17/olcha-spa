<template>
  <!-- <div>
    <div
      class="bg-gray-100 m-auto w-60 h-52 bg-no-repeat bg-center bg-cover"
      :style="{ backgroundImage: `url('${$lang(promo, 'image')}')` }"
      data-not-lazy
    >
      <div v-if="$lang(promo, 'title')" class="flex flex-row items-end h-full w-full">
        <div class="flex flex-col w-full pb-3 pt-10 px-3 bg-gradient-to-t from-black text-gray-200">
          <h3 class="text-base font-bold leading-5 uppercase">
            {{
              $lang(promo, 'title')
            }}
          </h3>
        </div>
      </div>
    </div>
  </div> -->
  <div
    class="relative mx-4"
  >
    <!-- <div class="w-full z-10 h-full absolute top-0 bottom-0 left-0 right-0 " /> -->
    <!-- <div class="p-4 z-100 absolute top-2flex flex-col justify-center bg-gradient-to-r from-red-500">
      <p class="text-xl text-white font-bold mt-2 mb-4 shadow">
        {{ $lang(blog,'title') }}
      </p>
      <p class="text-sm text-white opcity-70 font-550 shadow">
        {{ createTime(blog.created_at) }}
      </p>
    </div> -->
    <img
      :src="$lang(promo,'image')"
      :alt="$lang(promo,'title')"
      class="w-full rounded-lg z-0"
      data-not-lazy
    >
  </div>
</template>

<script>
import VueTypes from 'vue-types'

export default {
  name: 'PromsCart',
  props: {
    promo: VueTypes.object
  }
}
</script>
