<template>
  <div class="flex flex-col items-center container mt-10">
    <img
      :src="require(image)"
      alt=""
    >
    <div class="mb-6 text-center">
      <p class="font-bold text-xl leading-6 text-black mb-2">
        {{ title }}
      </p>
      <p class="font-550 text-sm leading-6 text-c-gray-5  ">
        {{ label }}
      </p>
    </div>
    <nuxt-link
      v-if="goBackHome"
      :to="{ name: 'home' }"
      tag="button"
      class="w-full rounded-lg bg-c-red-1 leading-4 text-base font-bold text-white mt-10 py-3 mb-4"
    >
      На главную
    </nuxt-link>
  </div>
</template>

<script>
import VueTypes from 'vue-types'

export default {
  name: 'EmptyState',
  props: {
    image: VueTypes.string,
    title: VueTypes.string,
    goBackHome: VueTypes.bool.def(false),
    label: VueTypes.string
  }
}
</script>

<style scoped>

</style>
