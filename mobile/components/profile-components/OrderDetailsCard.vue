<template>
  <div class="px-4" style="max-height: 70vh">
    <ul class="my-4">
      <order-list
        v-for="product in order.products"
        :key="product.id"
        :product="product"
        class="mb-2"
      />
    </ul>
    <ul class="grid grid-cols-1">
      <li
        class="grid grid-cols-2  w-full mb-3"
      >
        <span class="text-c-gray-5 text-base font-550 leading-5">Номер заказа</span>
        <p class="text-c-gray-6 text-base font-550 leading-5">
          №{{ order.id }}
        </p>
      </li>
      <li
        class="grid grid-cols-2  w-full mb-3"
      >
        <span class="text-c-gray-5 text-base font-550 leading-5">Время заказа</span>
        <p class="text-c-gray-6 text-base font-550 leading-5">
          {{ order.created_at }}
        </p>
      </li>
      <li
        class="grid grid-cols-2  w-full mb-3"
      >
        <span class="text-c-gray-5 text-base font-550 leading-5">Общая стоимость </span>
        <p class="text-c-gray-6 text-base font-550 leading-5">
          {{ order.total_cost }} сум
        </p>
      </li>
      <li
        class="grid grid-cols-2  w-full mb-3"
      >
        <span class="text-c-gray-5 text-base font-550 leading-5">Контактное лицо</span>
        <p class="text-c-gray-6 text-base font-550 leading-5">
          {{ order.name }}
        </p>
      </li>
      <li
        class="grid grid-cols-2  w-full mb-3"
      >
        <span class="text-c-gray-5 text-base font-550 leading-5">Телефон</span>
        <p class="text-c-gray-6 text-base font-550 leading-5">
          {{ order.phone }}
        </p>
      </li>
      <li
        class="grid grid-cols-2  w-full mb-3"
      >
        <span class="text-c-gray-5 text-base font-550 leading-5">Адрес доставки</span>
        <p class="text-c-gray-6 text-base font-550 leading-5">
          {{ order.full_address }}
        </p>
      </li>
    </ul>
    <button
      class="py-3 px-4 my-6 rounded-xl text-base font-550 leading-5 text-c-gray-6 bg-c-gray-3 w-full"
      @click="$emit('close', false)"
    >
      Закрыть
    </button>
  </div>
</template>

<script>
import VueTypes from 'vue-types'
import OrderList from '~/mobile/components/partials/OrderList'

export default {
  name: 'OrderDetailsCard',
  components: { OrderList },
  props: {
    order: VueTypes.object
  }
}
</script>

<style scoped>

</style>
