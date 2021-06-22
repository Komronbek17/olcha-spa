<template>
  <div class="w-max flex items-center rounded-lg bg-c-gray-2">
    <div class="w-8 h-8 flex items-center justify-center rounded-lg bg-black">
      <img
        src="@/assets/icons/deliveryicon.svg"
        alt="deliveryicon.sv"
      >
    </div>
    <p
      v-show="fullWidth"
      class="text-base text-black font-medium leading-5 mx-3"
    >
      Быстрая доставка в течении 24 часов
    </p>
  </div>
</template>
<script>
import VueTypes from 'vue-types'

export default {
  name: 'DeliveryBadge',
  props: {
    fullWidth: VueTypes.bool.def(false)
  }
}
</script>
