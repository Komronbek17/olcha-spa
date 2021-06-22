<template>
  <div>
    <div v-show="hasError" class="mb-2">
      <slot name="error" />
    </div>
    <div
      class="w-full rounded-lg bg-c-gray-1 px-4 py-3 flex items-center rounded-xl"
    >
      <input
        v-model="value"
        :class="hasError ? 'text-c-red-1' : ''"
        class="border-0 focus:outline-none bg-transparent w-full appearance-none"
        :type="type"
        :placeholder="holder"
        @input="emitValue"
      >
      <button
        v-if="withIcon"
        class=" flex items-center justify-center border-0 w-8 h-8 focus:outline-none"
        @click="clear"
      >
        <img :src="require('/assets/icons/close-rounded.svg')" alt="">
      </button>
      <div
        v-if="hasError"
        class="flex items-center justify-center border-0 w-8 h-8 focus:outline-none"
      >
        <img :src="require('/assets/icons/error-icon.svg')" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import VueTypes from 'vue-types'

export default {
  name: 'OInput',
  props: {
    holder: VueTypes.string.def(''),
    withIcon: VueTypes.bool.def(true),
    type: VueTypes.string.def('text'),
    clearValue: VueTypes.bool.def(false),
    hasError: VueTypes.bool.def(false)
  },
  data () {
    return {
      value: ''
    }
  },
  watch: {
    clearValue: {
      immediate: true,
      handler (newVal) {
        if (newVal) {
          this.value = ''
        }
      }
    }
  },
  methods: {
    emitValue () {
      this.$emit('input', this.value)
    },
    clear () {
      this.value = ''
    }
  }
}
</script>

<style scoped>
.input {
  transition: border 0.2s ease-in-out;
  min-width: 280px
}

.input:focus + .label,
.input:active + .label,
.input.filled + .label {
  font-size: .75rem;
  transition: all 0.2s ease-out;
  top: -0.1rem;
  color: #667eea;
}

.label {
  transition: all 0.2s ease-out;
  top: 0.4rem;
  left: 0;
}
</style>
