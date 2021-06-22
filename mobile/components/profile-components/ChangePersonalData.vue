<template>
  <bottom-sheet
    :title="title"
    :show="open"
    @close="close"
  >
    <o-input
      :clear-value="clear"
      :type="inputType"
      :holder="placeHolder"
      :with-icon="false"
      @input="value = $event"
    />
    <button
      class="py-3 px-4 mt-6 rounded-xl bg-c-green-1 text-base font-550 leading-5 text-white w-full"
      @click="returnValue"
    >
      Сохранить
    </button>
  </bottom-sheet>
</template>

<script>
import VueTypes from 'vue-types'
import BottomSheet from '~/mobile/reusable/BottomSheet'
import OInput from '~/mobile/components/partials/OInput'

export default {
  name: 'ChangePersonalData',
  components: {
    OInput,
    BottomSheet
  },
  props: {
    open: VueTypes.bool.def(false),
    title: VueTypes.string.def(''),
    inputType: VueTypes.string.def(''),
    placeHolder: VueTypes.string.def('')
  },
  data () {
    return {
      value: '',
      clear: false
    }
  },
  methods: {
    returnValue () {
      if (this.value) {
        this.$emit('input', this.value)
      }
      return this.close(false)
    },
    close (e) {
      this.value = ''
      this.clear = true
      this.$emit('close', e)
    }
  }
}
</script>

<style scoped>

</style>
