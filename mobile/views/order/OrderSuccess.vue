<template>
  <keep-alive>
    <div class="container mx-auto px-4 py-4 mb-4">
      <div class="bg-c-gray-1 p-4 rounded-2xl mt-2">
        <div class="flex justify-between items-center mb-4">
          <p class="text-c-gray-6 font-font-550 text-base">
            Заказ №:
          </p>
          <p class="text-c-gray-6 font-bold text-base sm:text-lg">
            {{ orderId }}
          </p>
        </div>
        <div class="flex justify-between items-center mb-4">
          <p class="text-c-gray-6 font-font-550 text-base">
            Итого к оплате:
          </p>
          <p class="text-c-gray-6 font-bold text-base sm:text-lg">
            {{ numberFormatter(totalCost) }} сум
          </p>
        </div>
        <div class="flex justify-between items-center mb-4">
          <p class="text-c-gray-6 font-font-550 text-base">
            Метод оплаты:
          </p>
          <p class="text-c-gray-6 font-bold text-base sm:text-lg">
            {{ paymentMth }}
          </p>
        </div>
        <div class="flex justify-between items-center">
          <p class="text-c-gray-6 font-font-550 text-base">
            Способ доставки:
          </p>
          <p class="text-c-gray-6 font-bold text-base sm:text-lg">
            <span v-if="OrderMethodId == 1 ">Доставка</span>
            <span v-else>Самовывоз</span>
          </p>
        </div>
        <div class="flex items-center justify-center">
          <img src="@/assets/images/order-success.png">
        </div>
        <p class="text-c-gray-6 text-center font-font-550 text-base my-4">
          на оплату заказа
        </p>
        <NuxtLink to="/" class="block bg-c-red-1 p-3 rounded-lg text-center text-white font-font-550 text-base w-full mb-8">
          На главную
        </NuxtLink>
        <p class="text-c-gray-5 text-sm font-font-550 text-center mb-20">
          Вы будете перенаправлены на другую страничку для оплаты заказа
        </p>
      </div>
    </div>
  </keep-alive>
</template>

<script>
import { mapState } from 'vuex'
import VueTypes from 'vue-types'
import commonMixins from '~/mixins/_mixin.js'
export default {
  name: 'PaymentLevel',
  mixins: [commonMixins],
  beforeRouteLeave (to, from, next) {
    this.$cookies.remove('checkout-payment-method')
    this.$cookies.remove('checkout-total-cost')
    this.$cookies.remove('checkout-order-id')
    this.$cookies.remove('select-order-method-id')
    next()
  },
  props: {
    order: VueTypes.object.def({})
  },
  computed: {
    ...mapState('order', {
      paymentMethod: state => state.paymentMethod,
      selectOrderMethod: state => state.selectOrderMethod
    }),
    paymentMth () {
      const paymentMethod = this.$cookies.get('checkout-payment-method')
      if (paymentMethod === 'fargo') {
        return 'Наличный расчет'
      } else {
        const pym = paymentMethod
        return pym.charAt(0).toUpperCase() + pym.slice(1)
      }
    },
    totalCost () {
      return this.$cookies.get('checkout-total-cost')
    },
    orderId () {
      return this.$cookies.get('checkout-order-id')
    },
    OrderMethodId () {
      return this.$cookies.get('select-order-method-id')
    }
  },
  created () {
    if (Object.keys(this.order).length) {
      this.$cookies.set('checkout-total-cost', this.order.total_cost, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7
      })
    }

    if (Object.keys(this.order).length) {
      this.$cookies.set('checkout-order-id', this.order.id, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7
      })
    }

    if (this.paymentMethod) {
      this.$cookies.set('checkout-payment-method', this.paymentMethod, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7
      })
    }

    if (Object.keys(this.selectOrderMethod).length) {
      this.$cookies.set('select-order-method-id', this.selectOrderMethod.id, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7
      })
    }
  }

}
</script>
