<template>
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
      :src="$lang(blog,'image')"
      :alt="$lang(blog,'title')"
      class="w-full rounded-lg z-0"
      data-not-lazy
    >
  </div>
</template>

<script>
import VueTypes from 'vue-types'
export default {
  name: 'NewsCart',
  props: {
    blog: VueTypes.object.def({})
  },
  methods: {
    createTime: (text) => {
      return text.slice(0, 10)
    }
  }
}
</script>
