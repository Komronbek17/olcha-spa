<template>
  <div>
    <p class="font-bold text-black text-lg leading-6 mb-3">
      {{ $t('id76') }}
    </p>
    <ul class="flex flex-col items-start">
      <li class="flex items-center justify-start mb-2">
        <img
          class="w-5 h-5"
          :src="require('~/assets/icons/Iconmap-marker.svg')"
          alt=""
        >
        <p class="font-medium text-black text-base leading-5 ml-2">
          {{ $t('id96') }}
        </p>
      </li>
      <li class="flex items-center justify-start mb-2">
        <img
          class="w-5 h-5"
          :src="require('~/assets/icons/Iconcheckmark.svg')"
          alt=""
        >
        <p class="font-medium text-black text-base leading-5 ml-2">
          {{ hasStock ? $t('id78') : $t('id712') }}
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
import VueTypes from 'vue-types'

export default {
  name: 'DeliveryInfo',
  props: {
    hasStock: VueTypes.bool

  }
}
</script>

<style scoped>

</style>
