<template>
  <div class="flex items-center justify-between py-6">
    <img
      :src="product.main_image ? $aspect(product.main_image, '76x76') : require('~/assets/images/No_Image_Available.jpg')"
      :alt="$aspect(product.main_image, '76x76')"
    >
    <ul class="ml-3.5">
      <li class="flex justify-between items-start mb-2.5">
        <p class="text-sm font-medium text-black">
          {{ $lang(product,'name') }}
        </p>
        <button
          class="w-6 h-6 ml-3 flex items-center justify-center focus:outline-none"
          @click="remove(product.id)"
        >
          <img
            :src="require('~/assets/icons/Iconclose.svg')"
            alt=""
          >
        </button>
      </li>
      <li class="flex justify-between items-center">
        <select
          class="bg-c-gray-2 rounded-lg focus:outline-none
          px-3 text-sm font-medium text-black leading-4
           appearance-none select-qty bg-no-repeat"
          @change="upgradeQty($event)"
        >
          <option v-if="product.qty !== 1" :value="product.qty">
            {{ product.qty }} шт
          </option>
          <option v-if="product.qty !== 1" :value="1">
            1 шт
          </option>
          <option v-else :value="1">
            1 шт
          </option>
          <option :value="2">
            2 шт
          </option>
          <option :value="3">
            3 шт
          </option>
          <option :value="4">
            4 шт
          </option>
          <option :value="5">
            5 шт
          </option>
        </select>
        <p class="text-sm font-bold ml-3">
          {{ numberFormatter(product.total_price) }} сум
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
import VueTypes from 'vue-types'
import { mapActions, mapMutations } from 'vuex'
import commonMixins from '~/mixins/_mixin.js'
export default {
  name: 'CartCard',
  mixins: [commonMixins],
  props: {
    product: VueTypes.object.def({})
  },
  data () {
    return {
      selectingQty: 1
    }
  },
  methods: {
    ...mapActions({
      remove: 'cart/remove'
    }),
    ...mapMutations({
      changedQty: 'cart/changedQty'
    }),
    upgradeQty (val) {
      this.changedQty({ productId: this.product.id, qty: parseInt(val.target.value) })
    }
  }
}
</script>

<style scoped>

</style>
