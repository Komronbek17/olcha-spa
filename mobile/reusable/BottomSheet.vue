<template>
  <modal-wrapper
    :open="show"
    class="z-50"
  >
    <div
      :class="show ? 'translate-y-0' : 'translate-y-full'"
      class="w-full rounded-t-3xl  z-50 fixed left-0 right-0 bottom-0 bg-white
    transform duration-500 ease-in-out px-4 py-6 grid grid-cols-1 gap-y-2"
    >
      <div class="bg-white mb-4 px-2">
        <div class="flex items-center justify-between py-1">
          <p class="font-bold text-2xl text-c-gray-6">
            {{ title }}
          </p>
          <button
            v-if="closeBtn"
            class="flex items-center justify-center border-0 w-6 h-6 mr-4"
            @click="close"
          >
            <img
              :src="require('/assets/icons/close.svg')"
              alt="icon-back.svg"
            >
          </button>
          <div v-else>
            <slot name="closeBtn" />
          </div>
        </div>
      </div>
      <div class=" overflow-scroll  overflow-hidden relative" style="max-height: 60vh">
        <slot />
      </div>
      <div class="bg-white">
        <slot name="footer" />
      </div>
    </div>
  </modal-wrapper>
</template>

<script>
import VueTypes from 'vue-types'
import ModalWrapper from '~/mobile/components/partials/ModalWrapper'

export default {
  name: 'BottomSheet',
  components: { ModalWrapper },
  props: {
    show: VueTypes.bool.def(false),
    title: VueTypes.string.def(''),
    closeBtn: VueTypes.bool.def(true)
  },
  methods: {
    close () {
      this.$emit('close', !this.show)
    }
  }
}
</script>
