<template>
  <div
    class="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50"
    :class="open ? 'block' : 'hidden'"
  >
    <div class="">
      <slot />
    </div>
  </div>
</template>

<script>
import VueTypes from 'vue-types'

export default {
  name: 'ModalWrapper',
  props: {
    open: VueTypes.bool.def(false)
  }

}
</script>

<style scoped>

</style>
