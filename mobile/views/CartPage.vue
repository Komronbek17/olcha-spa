<template>
  <div class="bg-white">
    <!-- if busket has product -->
    <div v-if="basketProducts.length" class="bg-c-gray-2">
      <div class="container mx-auto py-6">
        <div class="bg-white px-5 divide-y divide-c-gray-2 rounded-2xl">
          <cart-card
            v-for="product in basketProducts"
            :key="product.id"
            :product="product"
          />
        </div>
      </div>
      <div class="container mx-auto pb-5 pt-8 bg-white rounded-2xl">
        <div class="flex items-center bg-c-gray-1 rounded-lg mb-4  ">
          <input
            v-model="couponCode"
            type="text"
            placeholder="Код купона"
            class="bg-transparent w-full px-4 focus:outline-none"
          >
          <button
            class="bg-c-green-1 py-2 px-3 text-base text-white rounded-lg focus:outline-none"
            @click="verificationCoupon"
          >
            Использовать
          </button>
        </div>
        <cart-info />
        <div
          class="w-full text-center rounded-lg bg-c-orange-1 leading-4 text-base font-bold text-white py-3 mb-4"
        >
          Взять в рассрочку
        </div>
        <p class="text-sm text-c-gray-5 font-medium italic leading-4 mb-4">
          Онлайн оформление кредита -
          решение за 5 минут. Вы можете выбрать срок кредитования и ежемесячный платеж самостоятельно
        </p>
        <div
          class="w-full text-center rounded-lg bg-c-red-1 leading-4 text-base font-bold text-white mt-5 py-3 mb-4"
          @click="getInfoRegions"
        >
          <nuxt-link
            :to="{ name: 'checkout' }"
          >
            Оформить заказ
          </nuxt-link>
        </div>
      </div>
    </div>
    <!-- else -->
    <div v-else class="flex flex-col items-center container mt-10">
      <p class="font-bold text-xl leading-6 text-black mb-6">
        Тут пока ничего нет
      </p>
      <img
        :src="require('~/assets/images/EmptyCartFrame.svg')"
        alt=""
      >
      <nuxt-link
        :to="{ name: 'home' }"
        tag="button"
        class="w-full rounded-lg bg-c-red-1 leading-4 text-base font-bold text-white mt-10 py-3 mb-4"
      >
        На главную
      </nuxt-link>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { mapMutations, mapActions, mapState } from 'vuex'
import CartCard from '~/mobile/components/cart-components/CartCard'
import CartInfo from '~/mobile/components/cart-components/CartInfo'
import Checkout from '~/api/Checkout.js'
import Cart from '~/api/Cart.js'

export default {
  name: 'CartPage',
  components: {
    CartInfo,
    CartCard
  },
  middleware ( { store, app } ) {
    const cartProducts = app.$cookies.get('cart-products') || []
    store.commit('cart/InitCartProducts', cartProducts)
  },
  data () {
    return {
      couponCode: ''
    }
  },
  computed: {
    ...mapState('cart', {
      basketProducts: state => state.products,
      bonus: state => state.bonus
    })
  },
  methods: {
    ...mapMutations({
      AddCoupon: 'cart/ADD_COUPON'
    }),
    ...mapActions({
      getRegions: 'order/GET_REGIONS',
      getPickupPointRegions: 'order/GET_PICKUP_POINT_REGIONS'
    }),
    getInfoRegions () {
      this.getRegions()
      this.getPickupPointRegions()
    },
    async verificationCoupon () {
      const coupon = this.couponCode
      const respond = await Checkout.VerificationCoupon(coupon)
      if (respond === 400) {
        this.AddCoupon(400)
      } else {
        /* eslint-disable */
        console.log(respond);
        this.AddCoupon(respond)
      }
    },
  },
}
</script>
