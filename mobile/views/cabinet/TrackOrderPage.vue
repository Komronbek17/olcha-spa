<template>
  <div class="container mx-auto h-full overflow-y-scroll bg-c-gray-1 py-4">
    <div v-if="!showCard">
      <input
        v-model="orderID"
        type="text"
        class="w-full bg-white  focus:outline-none rounded-xl py-5 px-4 text-c-gray-6 text-base font-550"
        placeholder="Номер"
      >
      <button
        class="w-full py-4 my-6 px-4 rounded-lg bg-c-red-1 text-white font-medium text-base leading-5"
        @click="getOrder"
      >
        Отследить
      </button>
      <p class="text-sm text-c-gray-5 leading-5 font-normal text-center">
        Номер заказа был отправлен вам в виде смс во время оформления заказа. Так-же его можно узнать в истории заказов
        или связавшись с нашим call-центром.
      </p>
    </div>
    <div v-else>
      <track-order-card :order="order" />
      <button
        class="w-full py-4 my-6 px-4 rounded-lg bg-c-red-1 text-white font-medium text-base leading-5"
        @click="clear"
      >
        Назад
      </button>
      <p class="text-c-gray-5 font-550 text-sm leading-4 text-center px-2">
        Возникли вопросы насчет доставки? Свяжитесь с нами:
        <a
          href="tel:722022021"
          target="_blank"
          class="text-c-green-1"
        >
          72-202-202-1
        </a>
      </p>
    </div>
  </div>
</template>

<script>
import TrackOrderCard from '~/mobile/components/profile-components/TrackOrderCard'
import User from '~/api/User'

export default {
  name: 'TrackOrderPage',
  components: { TrackOrderCard },
  data () {
    return {
      orderID: '',
      order: {},
      showCard: false
    }
  },
  methods: {
    async getOrder () {
      return await User.trackOrder(this.orderID)
        .then((res) => {
          this.order = res.data.data.orders
          this.showCard = true
        }).catch((err) => {
          this.$toast.error(err.data.message)
          return true
        })
    },
    clear () {
      this.orderID = ''
      this.order = {}
      this.showCard = false
    }
  }
}
</script>

<style scoped>

</style>
