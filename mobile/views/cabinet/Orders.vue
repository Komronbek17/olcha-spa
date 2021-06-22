<template>
  <div class="container mx-auto h-full overflow-auto bg-c-gray-3">
    <title-container :title-text="title" />
    <div class="w-full">
      <ul>
        <li>
          <div class="py-4">
            <order-card
              v-for="order in orders"
              :key="order.id"
              :order="order"
              class="mb-4"
              @emitted="open"
            />
          </div>
        </li>
      </ul>
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
</template>

<script>
import TitleContainer from '~/mobile/reusable/TitleContainer'
import Order from '~/api/Order'
import OrderCard from '~/mobile/components/profile-components/OrderCard'
import BottomSheet from '~/mobile/reusable/BottomSheet'
import OrderDetailsCard from '~/mobile/components/profile-components/OrderDetailsCard'

export default {
  name: 'Orders',
  components: { OrderDetailsCard, BottomSheet, OrderCard, TitleContainer },
  async asyncData () {
    return await Order.getAllOrders()
      .then((res) => {
        return {
          orders: res.data.data.orders
        }
      }).catch((err) => {
        return err
      })
  },
  data () {
    return {
      title: this.$t('id1305'),
      openTab: 1,
      openBottomSheet: false,
      id: '',
      selectedOrder: {}
    }
  },
  methods: {
    toggleTabs (tabNumber) {
      this.openTab = tabNumber
    },
    open (e) {
      if (e.installment) {
        return this.$router.push({
          name: 'installment/view',
          params: {
            id: e.installment
          }
        })
      }
      this.openBottomSheet = !this.openBottomSheet
      this.selectedOrder = e
    }
  }
}
</script>

<style scoped>

</style>
