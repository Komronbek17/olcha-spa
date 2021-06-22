<template>
  <div
    class="max-w-3xl font-helvetica relative"
  >
    <div class="bg-c-gray" />
    <!-- Selected Items -->
    <div>
      <div class="bg-c-gray-1 px-6 py-4 w-full">
        <h3 class="text-c-gray-6 text-base font-font-550 mb-2">
          Состав заказа
        </h3>
        <div class="bg-white flex items-center mt-4 rounded-lg relative">
          <img
            :src="product.main_image ? $aspect(product.main_image, '76x76') : require('~/assets/images/No_Image_Available.jpg')"
            :alt="$aspect(product.main_image, '76x76')"
          >
          <p class="text-c-gray-6 text-sm sm:text-base font-font-550 p-2">
            {{ $lang(product,'name') }}
          </p>
        </div>
      </div>
    </div>
    <!-- End Of Selected Items -->
  </div>
</template>

<script>
import VueTypes from 'vue-types'
import { mapActions, mapMutations } from 'vuex'
export default {
  props: {
    product: VueTypes.object.def({})
  },
  data () {
    return {
      phone: '',
      personName: ''
    }
  },
  created () {
    if (this.$auth.loggedIn) {
      this.phone = this.$auth.user.phone
      this.personName = this.$auth.user.name
    }
    this.$store.dispatch('order/GET_REGIONS')
  },
  methods: {
    ...mapActions('order', {
      getRegions: 'GET_REGIONS',
      getPickupPointRegions: 'GET_PICKUP_POINT_REGIONS'
    }),
    ...mapMutations('order', {
      setStepOneCharacters: 'SET_STEP_ONE_CHARACTERS'
    }),
    validateStepOne () {
      this.getRegions()
      this.getPickupPointRegions()
      this.setStepOneCharacters({ phone: this.phone, name: this.personName })
      return true
    }
  }
}
</script>

<style scoped>

</style>
