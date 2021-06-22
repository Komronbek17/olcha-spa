<template>
  <keep-alive>
    <div class="container mx-auto px-4">
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
      </div>
      <div class="bg-c-green-2 bg-opacity-10 p-4 rounded-lg mt-4 hidden">
        <p class="text-c-gray-6 font-font-550 text-sm mb-3">
          г. Чирчик, Аранчаский абата ул. Тикланиш уйлари 107 дом 61
        </p>
        <div class="flex justify-between">
          <p class="text-c-gray-5 font-font-550 text-sm">
            Режим работы пункта
          </p>
          <p class="text-c-gray-6 font-font-550 text-sm">
            9:00 - 18:00
          </p>
        </div>
      </div>
      <div class="flex items-center justify-center">
        <Timer />
      </div>
      <p class="text-c-gray-6 text-center font-font-550 text-base my-4">
        на оплату заказа
      </p>
      <a :href="paymentLink" target="_blank" class="block bg-c-red-1 p-3 rounded-lg text-center text-white font-font-550 text-base w-full mb-8">Оплатить</a>
      <p class="text-c-gray-5 text-sm font-font-550 text-center mb-20">
        Вы будете перенаправлены на другую страничку для оплаты заказа
      </p>
    </div>
  </keep-alive>
</template>

<script>
import { mapState } from 'vuex'
import VueTypes from 'vue-types'
import Timer from './Timer.vue'
import commonMixins from '~/mixins/_mixin.js'
import Checkout from '~/api/Checkout.js'
export default {
  name: 'PaymentLevel',
  components: {
    Timer
  },
  mixins: [commonMixins],
  beforeRouteLeave (to, from, next) {
    this.$cookies.remove('checkout-payment-method')
    this.$cookies.remove('select-order-method-id')
    this.$cookies.remove('checkout-total-cost')
    next()
  },
  props: {
    order: VueTypes.object.def({})
  },
  async asyncData ({ params }) {
    /* eslint-disable */
    const orderId = params.order_id
    let paymentLink='#';
    await Checkout.PaymentRequest(orderId)
      .then((response) => { 
        paymentLink = response.data.data.redirectUrl
      })
      .catch( (err) => console.log(err))
      
    return {
      paymentLink,
      orderId
    }
  },
  computed:{
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
    OrderMethodId () {
      return this.$cookies.get('select-order-method-id')
    },
    totalCost () {
      return this.$cookies.get('checkout-total-cost')
    }
  },
  created(){
    if (Object.keys(this.selectOrderMethod).length) {
      this.$cookies.set('select-order-method-id', this.selectOrderMethod.id, {
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
    
    if (Object.keys(this.order).length) {
      this.$cookies.set('checkout-total-cost', this.order.total_cost, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7
      })
    }
  }
}
</script>
