<template>
  <div class="w-full ">
    <div
      class="overflow-hidden transition-all duration-500 ease-in-out"
      :style="containerHeight"
    >
      <slot />
    </div>
    <div
      :class="btnClasses"
      style="background: linear-gradient(179.01deg, rgba(255, 255, 255, 0) -100.19%, #fff 43.09%);"
    >
      <button
        style="box-shadow: 0 -35px 50px 0 rgba(255, 255, 255, 1)"
        class="mt-4 flex items-center justify-center py-2 w-full rounded-lg bg-c-gray-1 border-0 focus:outline-none"
        @click="fullContainer"
      >
        <span class="text-base font-medium leading-5 text-black mr-2">
          {{ label }}
        </span>
        <img
          :class="fullHeight ? 'transform rotate-180' : '' "
          :src="require('~/assets/icons/Iconarrow-down.svg')"
          alt=""
        >
      </button>
    </div>
  </div>
</template>

<script>
import VueTypes from 'vue-types'

export default {
  name: 'EllipsisContainer',
  props: {
    minHeight: VueTypes.number,
    btnLabelClosed: VueTypes.string,
    btnLabelOpened: VueTypes.string
  },
  data () {
    return {
      fullHeight: false
    }
  },
  computed: {
    containerHeight () {
      return this.fullHeight
        ? {
            height: 'auto'
          }
        : {
            height: `${this.minHeight}px`
          }
    },
    btnClasses () {
      return this.fullHeight ? '' : 'pt-10 transform -translate-y-8'
    },
    label () {
      return this.fullHeight ? this.btnLabelOpened : this.btnLabelClosed
    }
  },
  methods: {
    fullContainer () {
      this.fullHeight = !this.fullHeight
      this.btnclasses = ''
    }
  }
}
</script>
