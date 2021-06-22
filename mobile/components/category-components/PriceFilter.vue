<template>
  <bottom-sheet
    :title="$t('id95')"
    :show="show"
    @close="close"
  >
    <div class="grid grid-cols-2 gap-x-2 px-2">
      <div class="bg-c-gray-1 rounded-xl py-2 px-4 mr-2 w-full flex items-center">
        <div class="flex flex-col">
          <p class="text-c-gray-5 font-font-550 text-sm sm:text-base">
            От
          </p>
          <input
            v-model="price.price_min"
            type="text"
            class="w-full text-c-gray-6 text-sm sm:text-base font-font-550 bg-transparent outline-none"
            placeholder="0 сум"
          >
        </div>
      </div>
      <div class="bg-c-gray-1 rounded-xl py-2 px-4 flex justify-between items-center w-full">
        <div class="flex flex-col">
          <p class="text-c-gray-5 font-font-550 text-sm sm:text-base">
            До
          </p>
          <input
            v-model="price.price_max"
            type="text"
            class="w-full text-c-gray-6 text-sm sm:text-base font-font-550 bg-transparent outline-none"
            placeholder="500 000 сум"
          >
        </div>
        <!--        <img-->
        <!--          src="~/assets/icons/icon-remove.svg"-->
        <!--          class="w-6 h-6"-->
        <!--        >-->
      </div>
    </div>
    <div class="py-6 px-2 text-center">
      <button
        class="filter-btn  w-full block bg-c-red-1 p-3 rounded-xl text-white font-bold text-sm sm:text-base"
        @click="savePrices"
      >
        Показать товаров
      </button>
    </div>
  </bottom-sheet>
</template>

<script>
import VueTypes from 'vue-types'
import BottomSheet from '~/mobile/reusable/BottomSheet'

export default {
  name: 'PriceFilter',
  components: { BottomSheet },
  props: {
    show: VueTypes.bool.def(false),
    clear: VueTypes.bool
  },
  data () {
    return {
      price: {}
    }
  },
  watch: {
    clear: {
      handler (newVal) {
        if (newVal) {
          this.price = {}
        }
      }
    }
  },
  methods: {
    close () {
      this.$emit('close', !this.show)
    },
    savePrices () {
      this.$emit('select', this.price)
      this.close()
    }
  }
}
</script>

<style scoped>

</style>
