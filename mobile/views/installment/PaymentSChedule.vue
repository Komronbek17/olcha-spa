<template>
  <div class="container mx-auto overflow-hidden bg-white pb-24">
    <TitleContainer :title-text="`Заказ №${$route.params.id}`" />
    <div class="p-2">
      <div class="flex justify-center items-center pb-4">
        <p class="text-left font-bold text-lg">
          Данные для погашения платежа за рассрочку:
        </p>
      </div>
      <div class="flex justify-between items-center">
        <div>
          <img
            :src="order.product.main_image ? $aspect(order.product.main_image, '96x96') : require('~/assets/images/No_Image_Available.jpg')"
            :alt="order.product.main_image"
            :class="order.product.main_image ? '' : 'w-8 h-8'"
          >
        </div>
        <div>
          <p class="text-base font-550 line-clamp-2">
            {{ $lang(order.product, 'name') }}
          </p>
        </div>
      </div>
    </div>
    <div
      class="bg-c-gray-1 grid grid-cols-2 gap-4 items-center p-4 whitespace-nowrap text-sm -mx-4"
    >
      <div>
        <p class="font-semibold">
          Ежемесячный платеж
        </p>
        <p class="font-bold text-lg">
          {{ order.MR }} сум
        </p>
      </div>
      <div>
        <p class="font-semibold">
          Общая сумма оплаты
        </p>
        <p class="font-bold text-lg">
          {{ graphs.total_price_all }} сум
        </p>
      </div>
      <div>
        <p class="font-semibold">
          Первый взнос
        </p>
        <p class="font-bold text-lg">
          {{ order.first_fee_sum }} сум
        </p>
      </div>
      <div>
        <p class="font-semibold">
          Срок
        </p>
        <p class="font-bold text-lg">
          {{ order.inst_pay_time }} месяцев
        </p>
      </div>
    </div>
    <div>
      <ul class="py-2 grid grid-cols-1 gap-y-2 py-2">
        <li class="grid grid-cols-3 gap-x-2 items-center">
          <p class="text-sm leading-4 text-c-gray-5 font-550 text-left col-span-2">
            Остаток на сегоднящный день
          </p>
          <span class="text-sm leading-4 text-c-gray-6 font-550 text-right col-span-1 line-clamp-1dd">
            {{ graphs.total_my_payments_all }} сум
          </span>
        </li>
        <li class="grid grid-cols-3 gap-x-2 items-center">
          <p class="text-sm leading-4 text-c-gray-5 font-550 text-left col-span-2">
            Из них просроченный долг без пеньи
          </p>
          <span class="text-sm leading-4 text-c-gray-6 font-550 text-right col-span-1 line-clamp-1dd">
            {{ graphs.expiry_price_all }} сум
          </span>
        </li>
        <li class="grid grid-cols-3 gap-x-2 items-center">
          <p class="text-sm leading-4 text-c-gray-5 font-550 text-left col-span-2">
            Время заказа
          </p>
          <span class="text-sm leading-4 text-c-gray-6 font-550 text-right col-span-1">
            {{ order.date_format }}
          </span>
        </li>
        <!--        <li class="grid grid-cols-3 gap-x-2 items-center">-->
        <!--          <p class="text-sm leading-4 text-c-gray-5 font-550 text-left col-span-2">-->
        <!--            Клиент-->
        <!--          </p>-->
        <!--          <span class="text-sm leading-4 text-c-gray-6 font-550 text-right col-span-1">a</span>-->
        <!--        </li>-->
      </ul>
      <p class="text-left font-bold text-lg mt-8 mb-4">
        Платежи:
      </p>
      <!-- Cart -->
      <ul class="grid grid-cols-1 gap-y-4">
        <li
          v-for="graph in graphs.data"
          :key="graph.id"
        >
          <PaymentCart
            :graph="graph"
            @on:click="openDrawer(graph)"
          />
        </li>
      </ul>
    </div>
    <drawer
      :show="showDrawer"
      title="График платежа"
      @close="showDrawer = $event"
    >
      <installment-details-card :details="selectedGraph" />
    </drawer>
  </div>
</template>

<script>
import { find } from 'lodash'
import TitleContainer from '../../reusable/TitleContainer'
import PaymentCart from '../../components/partials/PaymentCart'
import Order from '~/api/Order'
import Drawer from '~/mobile/reusable/Drawer'
import InstallmentDetailsCard from '~/mobile/components/profile-components/InstallmentDetailsCard'

export default {
  name: 'PaymentSchedule',
  components: {
    InstallmentDetailsCard,
    Drawer,
    TitleContainer,
    PaymentCart
  },
  async asyncData ({ params }) {
    return await Order.getInstallmentGraph(params.id)
      .then((res) => {
        return {
          graphs: res.data.result,
          order: res.data.order
        }
      }).catch((err) => {
        return err
      })
  },
  data () {
    return {
      selectedGraph: {},
      showDrawer: false,
      drawerTitle: ''
    }
  },
  methods: {
    openDrawer (graph) {
      this.selectedGraph = find(this.order.payments, ['id', graph.id])
      this.selectedGraph.expiry_day_all = this.graphs.expiry_day_all
      this.selectedGraph.expiry_price_all = this.graphs.expiry_price_all
      this.selectedGraph.payment_reason = graph.payment_reason
      this.showDrawer = !this.showDrawer
      this.drawerTitle = `Данные для погашения платежа за рассрочку #${graph.id}`
    }
  }
}
</script>
