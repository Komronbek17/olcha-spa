<template>
  <div class="grid grid-cols-1 gap-y-6">
    <div class="">
      <p class="font-bold text-black text-4xl">
        {{ totalPrice }} {{ $t('id1105') }}
      </p>
      <p class="font-medium text-black text-base">
        {{ $t('id66') }} {{ monthlyRepayment }} / {{ $t('id1106') }}. <span
          class="text text-c-gray-3 "
        >{{ $t('id1101') }}</span>
      </p>
    </div>
    <delivery-badge v-show="hasExpress" :full-width="true" />
    <div v-if="shortDescription" class="">
      <p class=" font-bold text-lg text-black leading-6">
        {{ $t('id72') }}
      </p>
      <p class="text-base leading-5 text-c-gray-5 py-2">
        {{ shortDescription }}
      </p>
    </div>
  </div>
</template>

<script>
import VueTypes from 'vue-types'
import DeliveryBadge from '~/mobile/reusable/DeliveryBadge'

export default {
  name: 'ProductInfo',
  components: { DeliveryBadge },
  props: {
    totalPrice: VueTypes.oneOfType([
      VueTypes.number,
      VueTypes.string
    ]),
    shortDescription: VueTypes.string,
    monthlyRepayment: VueTypes.number,
    hasExpress: VueTypes.bool.def(false)
  }
}
</script>

<style scoped>

</style>
