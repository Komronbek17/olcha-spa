<template>
  <div
    @click="check"
  >
    <div
      class="w-8 h-2 flex relative items-center bg-c-gray-3 rounded-full p-1 duration-300 ease-in-out"
      :class="{ 'bg-c-green-1': toggleActive}"
    >
      <div
        class="bg-white w-5 h-5 absolute  bg-white border-4 rounded-full ease-in-out"
        :class="toggleActive ? 'right-0 border-c-green-1' : 'left-0 border-c-gray-3'"
      />
    </div>
  </div>
</template>

<script>

export default {
  name: 'SwitchButton',
  data () {
    return {
      toggleActive: false
    }
  },
  methods: {
    check () {
      this.toggleActive = !this.toggleActive
      this.$emit('is-checked', this.toggleActive)
    }
  }
}
</script>
