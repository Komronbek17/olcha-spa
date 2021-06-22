<template>
  <div class="flex flex-col bg-c-gray-1 rounded-lg mb-4 p-4  ">
    <p class="font-bold text-2xl leading-8 mb-4">
      Итого:
    </p>
    <ul class="flex flex-col">
      <li class="flex justify-between items-center text-black text-base leading-5 pb-3">
        <span class=" font-medium">Стоимость:</span>
        <span class="font-bold">
          {{ numberFormatter(getPrice.cost) }} сум
        </span>
      </li>
      <li
        v-if="getPrice.coupon"
        class="flex justify-between items-center text-black text-base leading-5 pb-3"
      >
        <span class=" font-medium">Промокод:</span>
        <span class="font-bold">
          {{ numberFormatter(getPrice.coupon) }} сум
        </span>
      </li>
      <li class="flex justify-between items-center text-black text-base leading-5 pb-3">
        <span class=" font-medium">Скидка:</span>
        <span class="font-bold">
          {{ numberFormatter(getPrice.discount) }} сум
        </span>
      </li>
      <li class="flex justify-between items-center text-black text-base leading-5 pb-3">
        <span class=" font-medium">Всего к оплате:</span>
        <span class="font-bold">
          {{ numberFormatter(getPrice.total) }} сум
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import commonMixins from '~/mixins/_mixin.js'
export default {
  name: 'CartInfo',
  mixins: [commonMixins],
  computed: {
    ...mapGetters({
      getPrice: 'cart/getPrice'
    })
  },
  created () {
    this.$store.commit('cart/INIT_COUPON')
  }
}
</script>

<style scoped>

</style>
