<template>
  <div class="relative -top-8">
    <div class="mt-6 bg-c-gray-1 p-4 rounded-2xl">
      <p class="text-c-gray-6 font-bold text-2xl mb-1">
        Итого:
      </p>
      <div class="flex justify-between mt-4">
        <p class="text-c-gray-5 text-sm font-normal">
          Доставка:
        </p>
        <p class="text-c-gray-6 text-sm font-normal">
          <span v-if="selectOrderMethod.id==1">Курьером</span>
          <span v-else>Самовывоз</span>
        </p>
      </div>
      <div class="flex justify-between mt-4 mb-4">
        <p class="text-c-gray-5 text-sm font-normal">
          Способ оплаты:
        </p>
        <p class="text-c-gray-6 text-sm font-normal">
          {{ paymentMtd || 'Наличный расчет' }}
        </p>
      </div>
      <div v-if="selectOrderMethod.id==1">
        <div v-if="deliveryType.name_uz != null" class="flex justify-between mt-4 mb-4">
          <p class="text-c-gray-5 text-sm font-normal">
            Тип доставки:
          </p>
          <p class="text-c-gray-6 text-sm font-normal">
            {{ $lang(deliveryType,'name') }}
          </p>
        </div>
      </div>
      <div v-else>
        <div v-if="pickupInfo.id != null" class="flex justify-between mt-4 mb-4">
          <p class="text-c-gray-5 line-clamp-1 text-sm font-normal">
            Адрес самовывоза:
          </p>
          <p class="text-c-gray-6 text-sm font-normal line-clamp-1">
            {{ $lang(pickupInfo,'address') }}
          </p>
        </div>
      </div>
      <hr class="border-c-gray-3">
      <div class="flex justify-between mt-4">
        <p class="text-c-gray-5 text-sm font-normal">
          Первоначальный взнос:
        </p>
        <p class="text-c-gray-6 text-sm font-normal">
          {{ numberFormatter(getInstCheckoutPrice.first_fee_sum) }} сум
        </p>
      </div>
      <div class="flex justify-between mt-4">
        <p class="text-c-gray-5 text-sm font-normal">
          Скидка:
        </p>
        <p class="text-c-gray-6 text-sm font-normal">
          {{ numberFormatter(getInstCheckoutPrice.discount) }} сум
        </p>
      </div>
      <div class="flex justify-between mt-4">
        <p class="text-c-gray-5 text-sm font-normal">
          Стоимость доставки:
        </p>
        <p class="text-c-gray-6 text-sm font-normal">
          {{ numberFormatter(getInstCheckoutPrice.deliveryPrice) }} сум
        </p>
      </div>
      <div v-if="getInstCheckoutPrice.paymentPrice" class="flex justify-between mt-4">
        <p class="text-c-gray-5 text-sm font-normal">
          Размер комиссии за наличный расчет:
        </p>
        <p class="text-c-gray-6 text-sm font-normal">
          {{ numberFormatter(getInstCheckoutPrice.paymentPrice) }} %
        </p>
      </div>
      <div class="flex justify-between mt-4">
        <p class="text-c-gray-5 text-sm font-normal">
          Всего к оплате:
        </p>
        <p class="text-c-gray-6 text-sm font-normal">
          {{ numberFormatter(getInstCheckoutPrice.total) }} сум
        </p>
      </div>
      <p class="text-c-gray-6 font-font-550 text-xs mt-7 mb-4">
        Нажимая "Оформить заказ", я соглашаюсь с
        <span class="text-c-blue-1">публичным договором оферты</span>
      </p>
      <p class="text-c-gray-5 text-xs">
        Для расчета стоимости доставки крупногабаритного товара весом более 1кг
        обращайтесь к оператору Call-центра*
      </p>
      <p class="text-c-gray-5 text-xs font-font-550 italic my-2">
        * Может взыматься дополнительная плата за доставку в труднодоступные
        места, (например крупногабаритная техника, которую нужно доставить в дома,
        с неработающим лифтом)
      </p>
      <p class="text-c-gray-5 text-xs font-font-550 italic">
        *** При необходимости
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import commonMixins from '~/mixins/_mixin.js'
export default {
  name: 'TotalComponent',
  mixins: [commonMixins],
  computed: {
    ...mapGetters('cart', {
      getInstCheckoutPrice: 'getInstCheckoutPrice'
    }),
    ...mapState('order', {
      selectOrderMethod: state => state.selectOrderMethod,
      deliveryType: state => state.deliveryType,
      paymentMethod: state => state.paymentMethod,
      pickupInfo: state => state.pickupInfo
    }),
    paymentMtd () {
      if (this.paymentMethod === 'fargo') {
        return 'Наличный расчет'
      } else {
        const pym = this.paymentMethod
        return pym.charAt(0).toUpperCase() + pym.slice(1)
      }
    }
  }
}
</script>
