<template>
  <div class="mt-6 bg-c-gray-1 p-4 rounded-2xl">
    <p class="text-c-gray-6 font-bold text-2xl mb-1">
      Итого:
    </p>
    <div class="flex justify-between mt-4">
      <p class="text-c-gray-5 text-base font-font-550">
        Доставка:
      </p>
      <p class="text-c-gray-6 text-base font-font-550">
        <span v-if="selectOrderMethod.id==1">Курьером</span>
        <span v-else>Самовывоз</span>
      </p>
    </div>
    <div class="flex justify-between mt-4 mb-4">
      <p class="text-c-gray-5 text-base font-font-550">
        Способ оплаты:
      </p>
      <p class="text-c-gray-6 text-base font-font-550">
        {{ paymentMtd || 'Наличный расчет' }}
      </p>
    </div>
    <div v-if="selectOrderMethod.id==1">
      <div v-if="deliveryType.name_uz != null" class="flex justify-between mt-4 mb-4">
        <p class="text-c-gray-5 text-base font-font-550">
          Тип доставки:
        </p>
        <p class="text-c-gray-6 text-base font-font-550">
          {{ $lang(deliveryType,'name') }}
        </p>
      </div>
    </div>
    <div v-else>
      <div v-if="pickupInfo.id != null" class="flex justify-between mt-4 mb-4">
        <p class="text-c-gray-5 line-clamp-1 text-base font-font-550">
          Адрес самовывоза:
        </p>
        <p class="text-c-gray-6 text-base font-font-550 line-clamp-1">
          {{ $lang(pickupInfo,'address') }}
        </p>
      </div>
    </div>
    <hr class="border-c-gray-3">
    <div class="flex justify-between mt-4">
      <p class="text-c-gray-5 text-base font-font-550">
        Стоимость:
      </p>
      <p class="text-c-gray-6 text-base font-font-550">
        {{ numberFormatter(getPrice.cost) }} сум
      </p>
    </div>
    <div v-if="getPrice.coupon" class="flex justify-between mt-4">
      <p class="text-c-gray-5 text-base font-font-550">
        Промокод:
      </p>
      <p class="text-c-gray-6 text-base font-font-550">
        {{ numberFormatter(getPrice.coupon) }} сум
      </p>
    </div>
    <div class="flex justify-between mt-4">
      <p class="text-c-gray-5 text-base font-font-550">
        Скидка:
      </p>
      <p class="text-c-gray-6 text-base font-font-550">
        {{ numberFormatter(getPrice.discount) }} сум
      </p>
    </div>
    <div class="flex justify-between mt-4">
      <p class="text-c-gray-5 text-base font-font-550">
        Стоимость доставки:
      </p>
      <p class="text-c-gray-6 text-base font-font-550">
        {{ numberFormatter(getPrice.deliveryPrice) }} сум
      </p>
    </div>
    <div class="flex justify-between mt-4">
      <p class="text-c-gray-5 text-base font-font-550">
        Всего к оплате:
      </p>
      <p class="text-c-gray-6 text-base font-font-550">
        {{ numberFormatter(getPrice.total) }} сум
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
      ** При необходимости
    </p>
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
      getPrice: 'getPrice'
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
