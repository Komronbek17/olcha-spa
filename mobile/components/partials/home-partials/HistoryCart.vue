<template>
  <div class="p-2 mx-4 border-2 border-c-black-2 rounded-lg">
    <nuxt-link
      :to="{
        name: 'product',
        params: {
          alias: historyProduct.alias
        }
      }"
    >
      <img
        :src="historyProduct.main_image"
        alt=""
        class="w-24 p-2"
      >
    </nuxt-link>
  </div>
</template>

<script>
import VueTypes from 'vue-types'
export default {
  name: 'HistoryCart',
  props: {
    historyProduct: VueTypes.object.def({})
  }
}
</script>
