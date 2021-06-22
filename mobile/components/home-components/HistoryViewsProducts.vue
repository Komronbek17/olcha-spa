<template>
  <div class="history">
    <h2 class="text-title mb-2">
      {{ $t('id110') }}
    </h2>
    <div class="my-4 -ml-4 pt-4 grid grid-rows-1 gap-x-1 gap-y-5 overflow-x-scroll grid-flow-col auto-cols-max md:auto-cols-min">
      <HistoryCart
        v-for="(historyProduct,index) in historyProducts"
        :key="index"
        :history-product="historyProduct"
      />
    </div>
  </div>
</template>

<script>
import VueTypes from 'vue-types'
import HistoryCart from '../partials/home-partials/HistoryCart'
/* eslint-disable */
export default {
  name: 'HistoryViewsProducts',
  components: {
    HistoryCart
  },
  props: {
    historyProducts: VueTypes.array.def([])
  }
}
</script>
