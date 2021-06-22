<template>
  <div class="h-full">
    <div v-if="orders.length > 0" class="container mx-auto h-full  bg-c-gray-3">
      <div class="py-4">
        <order-card
          v-for="order in orders"
          :key="order.id"
          :order="order"
          class="mb-4"
          @emitted="open"
        />
      </div>
      <bottom-sheet
        v-if="selectedOrder"
        :show="openBottomSheet"
        :title="`Заказ №${selectedOrder.id}`"
        @close="openBottomSheet = $event"
      >
        <order-details-card :order="selectedOrder" @close="openBottomSheet = $event" />
      </bottom-sheet>
    </div>
    <div v-else>
      <div class="flex flex-col items-center container bg-white  mt-10">
        <img
          :src="require('~/assets/images/EmptyCartFrame.svg')"
          alt=""
        >
        <div class="mb-6 text-center">
          <p class="font-bold text-xl leading-6 text-black mb-2">
            У вас нет активных заказов
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { find } from 'lodash'
import OrderCard from '~/mobile/components/profile-components/OrderCard'
import BottomSheet from '~/mobile/reusable/BottomSheet'
import OrderDetailsCard from '~/mobile/components/profile-components/OrderDetailsCard'
import User from '~/api/User'

export default {
  name: 'OrdersHistory',
  components: {
    OrderDetailsCard,
    BottomSheet,
    OrderCard
  },
  async asyncData () {
    return await User.getOrders()
      .then((res) => {
        return {
          orders: res.data.data.orders
        }
      })
      .catch(() => {
        return true
      })
  },
  data () {
    return {
      openBottomSheet: false,
      id: ''
    }
  },
  computed: {
    selectedOrder () {
      return find(this.orders, ['id', this.id]) || []
    }
  },
  methods: {
    open (e) {
      this.openBottomSheet = !this.openBottomSheet
      this.id = e
    }
  }
}
</script>

<style scoped>

</style>
