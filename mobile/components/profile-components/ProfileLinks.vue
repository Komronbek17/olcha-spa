<template>
  <ul class="flex flex-col items-start">
    <li
      v-for="(link, index) in links"
      :key="index"
      class="py-5 px-6 w-full"
    >
      <nuxt-link
        :to="link.to"
        class="flex flex-nowrap items-center font-550 text-base text-black leading-5"
      >
        <img
          v-if="link.icon"
          src="~/assets/icons/user-profile.svg"
          :alt="link.icon"
          class="mr-4"
        >
        {{ link.label }}
      </nuxt-link>
    </li>
    <slot />
  </ul>
</template>

<script>
import VueTypes from 'vue-types'

export default {
  name: 'ProfileLinks',
  props: {
    links: VueTypes.arrayOf(VueTypes.object).def([])
  }
}
</script>
