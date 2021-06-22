<template>
  <div>
    <div class="relative inline-block text-left">
      <div>
        <button
          class="inline-flex justify-center items-center rounded-md border px-4 py-2 bg-c-gray-2 text-sm font-medium text-c-black-2 hover:bg-gray-50 focus:outline-none "
          @click="menuOpened = !menuOpened"
          @focusout="menuOpened = false"
        >
          {{ title }}
          <img
            :src="require('~/assets/icons/Iconselect-arrows.svg')"
            class="-mr-1 ml-2 h-3 w-3"
          >
        </button>
      </div>

      <transition
        enter-active-class="transition ease-out duration-100"
        enter-from-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100"
        leave-active-class="transition ease-in duration-75"
        leave-from-class="transform opacity-100 scale-100"
        leave-to-class="transform opacity-0 scale-95"
      >
        <ul
          v-if="menuOpened"
          class="shadow-c-sm p-6 rounded-lg absolute top-0 bg-white z-50"
        >
          <li
            v-for="(option, index ) in options"
            :key="index"
            class="text-sm font-medium text-c-black-2 leading-4 py-3 cursor-pointer"
            @click="returnValues(option)"
          >
            {{ option.label }}
            <span v-if="option.span" class="text-c-gray-3">
              ( {{ option.span }} )
            </span>
          </li>
        </ul>
      </transition>
    </div>
  </div>
</template>

<script>
import VueTypes from 'vue-types'

export default {
  name: 'Dropdown',
  props: {
    options: VueTypes.arrayOf(
      VueTypes.object
    )
  },
  data () {
    return {
      selected: '',
      menuOpened: false
    }
  },
  computed: {
    title () {
      if (this.selected) {
        return this.selected
      }
      return this.options[0].label
    }
  },
  methods: {
    returnValues (e) {
      this.menuOpened = false
      this.selected = e.label
      this.$emit('selected', e)
    }
  }
}
</script>

<style scoped>

</style>
