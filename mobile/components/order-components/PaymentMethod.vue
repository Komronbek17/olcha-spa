<template>
  <div class="mb-4">
    <h3 class="text-c-gary-6 font-bold  text-xl sm:text-2xl mb-2 mt-8">
      Способ оплаты
    </h3>
    <div v-if="payments.length" class="flex flex-col mb-4">
      <div v-for="payment in payments" :key="payment.alias">
        <label
          :for="payment.alias"
          class="bg-c-gray-1 p-4 bg-opacity-70 rounded-xl mt-4 flex"
        >
          <input
            :id="payment.alias"
            v-model="paymentMtd"
            :value="payment.alias"
            type="radio"
            name="paymentMethods"
            class="form-radio h-6 w-6 text-c-green-1 border-2 border-solid border-c-gray-3"
          >
          <p class="text-c-gray-6 font-font-550 text-base ml-4">
            {{ $lang(payment,'name') }}
          </p>
        </label>
      </div>
    </div>
    <div class="grid gap-2 grid-cols-2">
      <div v-for="paymentSy in paymentSystems" :key="paymentSy.id">
        <label
          :for="paymentSy.alias"
          class="bg-c-gray-1 py-2 px-4 bg-opacity-70 rounded-xl mt-4 flex items-center w-full"
        >
          <input
            :id="paymentSy.alias"
            v-model="paymentMtd"
            :value="paymentSy.alias"
            type="radio"
            name="paymentMethods"
            class="form-radio h-6 w-6 text-c-green-1 border-2 border-solid border-c-gray-3"
          >
          <img
            :src="paymentSy.logo"
            class="ml-4 w-20"
          >
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import VueTypes from 'vue-types'
export default {
  name: 'PaymentMethodMtd',
  props: {
    payments: VueTypes.array.def([]),
    paymentSystems: VueTypes.array.def([])
  },
  data () {
    return {
      paymentMtd: ''
    }
  },
  computed: {
    ...mapState('order', {
      paymentMethod: 'paymentMethod'
    })
  },
  watch: {
    paymentMtd (last) {
      if (last.length > 0) {
        this.setPaymentMethod(last)
        this.$cookies.set('checkout-payment-method', last, {
          path: '/',
          maxAge: 60 * 60 * 24 * 7
        })
      }
    }
  },
  created () {
    const paymentMethod = this.$cookies.get('checkout-payment-method') || ''
    this.paymentMtd = paymentMethod
    this.setPaymentMethod(paymentMethod)
  },
  methods: {
    ...mapMutations('order', {
      setPaymentMethod: 'SET_PAYMENT_METHOD'
    })
  }
}
</script>
