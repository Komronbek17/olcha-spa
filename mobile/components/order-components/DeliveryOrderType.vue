<template>
  <div>
    <div class="bg-white rounded-t-3xl p-4 w-screen">
      <!-- Title And Exit Icon -->
      <div class="flex justify-between mb-2">
        <h3 class="text-c-gray-6 font-bold text-xl sm:text-2xl mx-2">
          Способ доставки
        </h3>
        <!-- Exit Icon -->
        <img
          src="~/assets/icons/icon-close.svg"
          class="mx-2 active:bg-red-600 focus:bg-red-600"
          @click="$emit('hide-delivery-method')"
        >
      </div>

      <div
        v-for="(delivery,index) in deliveries"
        :key="index"
        class="bg-c-gray-1 rounded-xl p-4 mt-4 cursor-pointer"
        @click="$emit('selected-delivery-type',delivery)"
      >
        <div>
          <p class="text-c-gray-6  mb-3 font-bold text-base sm:text-lg">
            <span>{{ $t('id1241') }} :</span>
            <span>{{ $lang(delivery,'name') }}</span>
          </p>
          <p class="text-c-gray-5  mb-3 font-font-550 text-base sm:text-sm">
            <span>{{ $t('id1243') }} : </span>
            <span>{{ $lang(delivery,'delivered_time') }}</span>
          </p>
          <p class="text-c-gray-5  mb-3 font-font-550 text-base sm:text-sm">
            <span>{{ $t('id2005') }} :</span>
            <span>{{ numberFormatter(delivery.price) }} {{ $t('id2307') }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueTypes from 'vue-types'
import commonMixins from '~/mixins/_mixin.js'
export default {
  name: 'DeliveryOrderType',
  mixins: [commonMixins],
  props: {
    deliveries: VueTypes.array.def([])
  }
}

</script>
