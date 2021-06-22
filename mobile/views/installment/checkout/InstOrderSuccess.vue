<template>
  <keep-alive>
    <div class="container mx-auto px-4 py-4">
      <div class="bg-c-gray-1 p-4 rounded-2xl mt-2">
        <div class="flex justify-between items-center mb-4">
          <p class="text-c-gray-6 font-font-550 text-base">
            Заказ №:
          </p>
          <p class="text-c-gray-6 font-bold text-base sm:text-lg">
            {{ orderId }}
          </p>
        </div>
        <!-- <div class="flex justify-between items-center mb-4">
          <p class="text-c-gray-6 font-font-550 text-base">
            Итого к оплате:
          </p>
          <p class="text-c-gray-6 font-bold text-base sm:text-lg">
            {{ numberFormatter(order.total_cost) }} сум
          </p>
        </div> -->
        <div class="flex justify-between items-center mb-4">
          <p class="text-c-gray-6 font-font-550 text-base">
            Срок рассрочки :
          </p>
          <p class="text-c-gray-6 font-bold text-base sm:text-lg">
            {{ numberFormatter(InstPayTime) }}  месяцев
          </p>
        </div>
        <div class="flex justify-between items-center mb-4">
          <p class="text-c-gray-6 font-font-550 text-base">
            Первоначальный взнос :
          </p>
          <p class="text-c-gray-6 font-bold text-base sm:text-lg">
            {{ numberFormatter(InstFirstFeeSum) }} сум
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
            <span v-if="OrderMethod == 1 ">Доставка</span>
            <span v-else>Самовывоз</span>
          </p>
        </div>
      </div>
      <div class="flex items-center justify-center flex-col my-4 rounded-lg">
        <img :src="require('~/assets/images/order-success.png')" alt="success-order-image">
      </div>
      <div class="flex items-center mb-5 justify-center flex-col">
        <p class="text-c-gray-6 my-2 font-bold text-base sm:text-lg">
          Ваш заказ оформлен!
        </p>
        <p class="text-c-gray-6 text-center my-2 font-medium text-xs sm:text-base">
          Чтобы проверить статус рассрочки, пожалуйста перейдите в личный кабинет или ждите смс увидомления
        </p>
      </div>
      <NuxtLink :to="{ name: 'orders' }" class="block bg-c-red-1 p-3 rounded-lg text-center text-white font-font-550 text-base w-full mb-8">
        Перейти в кабинет
      </NuxtLink>
    </div>
  </keep-alive>
</template>

<script>
import { mapState } from 'vuex'
import commonMixins from '~/mixins/_mixin.js'
export default {
  name: 'PaymentLevel',
  mixins: [commonMixins],
  beforeRouteLeave (to, from, next) {
    this.$cookies.remove('inst_pay_time')
    this.$cookies.remove('first_fee_sum')
    this.$cookies.remove('select-order-method-id')
    this.$cookies.remove('payment-method')
    next()
  },
  asyncData ({ params }) {
    return {
      orderId: params.order_id
    }
  },
  computed: {
    ...mapState('cart', {
      inst_checkout_info: 'inst_checkout_info'
    }),
    ...mapState('order', {
      selectOrderMethod: state => state.selectOrderMethod,
      paymentMethod: state => state.paymentMethod
    }),
    paymentMth () {
      const paymentMethod = this.$cookies.get('payment-method')
      if (paymentMethod === 'fargo') {
        return 'Наличный расчет'
      } else {
        const pym = paymentMethod
        return pym.charAt(0).toUpperCase() + pym.slice(1)
      }
    },
    InstPayTime () {
      return this.$cookies.get('inst_pay_time')
    },
    InstFirstFeeSum () {
      return this.$cookies.get('first_fee_sum')
    },
    OrderMethod () {
      return this.$cookies.get('select-order-method-id')
    }
  },
  created () {
    if (Object.keys(this.inst_checkout_info).length) {
      this.$cookies.set('inst_pay_time', this.inst_checkout_info.inst_pay_time, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7
      })
    }

    if (Object.keys(this.inst_checkout_info).length) {
      this.$cookies.set('first_fee_sum', this.inst_checkout_info.first_fee_sum, {
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

    if (this.paymentMethod) {
      this.$cookies.set('payment-method', this.paymentMethod, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7
      })
    }
  }
}
</script>
