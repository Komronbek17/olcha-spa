<template>
  <div
    class="w-full z-50 h-screen fixed top-0 right-0 bottom-0
     bg-white transform duration-500 ease-in-out"
    :class="show ? 'translate-x-0' : 'translate-x-full'"
  >
    <div class="h-full grid grid-rows-8">
      <div class="row-span-1">
        <div class="py-5 px-5 bg-white flex justify-between items-center">
          <div class="flex items-center py-1">
            <button
              class=" flex items-center justify-center border-0 w-6 h-6 mr-4"
              @click="close"
            >
              <img
                :src="require('/assets/icons/close.svg')"
                alt="icon-back.svg"
              >
            </button>
            <p class="font-bold text-2xl text-c-gray-6">
              {{ title }}
            </p>
          </div>
          <slot name="header" />
        </div>
      </div>

      <div class="row-span-7 px-4 overflow-y-scroll">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import VueTypes from 'vue-types'

export default {
  name: 'Drawer',
  props: {
    show: VueTypes.bool.def(false),
    title: VueTypes.string.def('Назад')
  },

  methods: {
    close () {
      this.$emit('close', !this.show)
    }
  }
}
</script>

<style scoped>

</style>
