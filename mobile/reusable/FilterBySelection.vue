<template>
  <!-- This is an example component -->
  <div
    class="options-order bg-c-gray-1 py-1 px-4 rounded-lg flex items-center w-max relative my-3"
  >
    <p
      class="options-text-curr font-font-550 text-c-gray-6 mr-2 text-base"
      @click=" showOptions =! showOptions "
    >
      {{ defaultOption }}
    </p>
    <div
      v-if="showOptions"
      class="options-list absolute z-10 top-0 left-0 py-3 pl-6 pr-10 w-max bg-white rounded-lg shadow-1"
    >
      <div
        v-for="(option,index) in options"
        :key="index"
        class="options-text block font-font-550 text-c-gray-6 mr-2 text-sm py-3"
        @click="selectedItem(option)"
      >
        <span>{{ option }}</span>
      </div>
    </div>
    <img
      src="~/assets/icons/icon-arrows.svg"
      alt="icon-arrows.svg"
      class="icon-arrows"
    >
  </div>
</template>
<script>
export default {
  name: 'FilterBySelection',
  props: {
    options: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      showOptions: false,
      defaultOption: null
    }
  },
  created () {
    this.defaultOption = this.options[0]
  },
  methods: {
    selectedItem (option) {
      this.defaultOption = option
      this.showOptions = false
    }
  }
}
</script>
