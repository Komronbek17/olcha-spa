<template>
  <div class="bg-white rounded-2xl px-6 py-8 relative overflow-hidden">
    <div>
      <div>
        <p class="text-base font-550 text-c-gray-6 mb-2">
          Заказ №{{ order.id }}
        </p>
        <div class="flex items-center justify-between">
          <span
            class="text-sm text-c-gray-5 font-550 leading-4"
          >
            {{ order.created_at }}
          </span>
          <span class="font-bold text-base text-c-gray-6 leading-5">
            {{ order.total_cost }} сум
          </span>
        </div>
      </div>
      <ul class="my-4">
        <order-list
          v-for="product in order.products"
          :key="product.id"
          :product="product"
          class="mb-2"
        />
      </ul>
      <div class="flex items-center justify-between">
        <button
          class="flex items-center justify-between  mx-2 rounded-lg py-2 px-4"
          :class="status[order.status].classes.colors"
        >
          <div
            class="w-2 h-2 rounded-full mr-2"
            :class="status[order.status].classes.dot"
          />
          <span class="text-sm leading-4  font-550">
            {{ status[order.status].title }}
          </span>
        </button>
        <button
          class="font-550 text-sm leading-4 text-c-gray-6 mx-2 bg-c-gray-1 rounded-lg py-2 px-4"
          @click="emitted"
        >
          Подробнее
        </button>
      </div>
    </div>
    <div
      v-show="order.installment"
      class="absolute top-0 right-0 min-w-38 py-1 bg-red-600 text-center transform rotate-45 translate-x-10 translate-y-4"
    >
      <span
        class="inline-flex items-center justify-center text-xs font-bold leading-none text-white "
      >
        {{ $t('id1603') }}
      </span>
    </div>
  </div>
</template>

<script>
import VueTypes from 'vue-types'
import OrderList from '~/mobile/components/partials/OrderList'

export default {
  name: 'OrderCard',
  components: { OrderList },
  props: {
    order: VueTypes.object
  },
  data () {
    return {
      status: {
        canceled: {
          title: 'Отменен',
          classes: {
            dot: 'bg-white',
            colors: 'bg-c-red-1 text-white'
          }
        },
        delivered: {
          title: 'Заказ доставлен',
          classes: {
            dot: 'bg-c-green-1',
            colors: 'bg-c-green-1 bg-opacity-20 text-c-gray-6'
          }
        },
        confirmed: {
          title: 'Подтвержден',
          classes: {
            dot: 'bg-c-gray-3',
            colors: 'bg-c-gray-1 text-c-gray-6'
          }
        }
      }
    }
  },
  methods: {
    emitted () {
      return this.$emit('emitted', this.order)
    }
  }
}
</script>

<style scoped>

</style>
