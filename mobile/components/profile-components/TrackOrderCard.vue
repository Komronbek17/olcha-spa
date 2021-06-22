<template>
  <div class="rounded-2xl bg-white p-6">
    <div>
      <p class="text-black font-bold text-xl leading-7">
        Заказ №{{ order.id }}
      </p>
    </div>
    <div class="mb-5">
      <p class="mb-2 text-black font-bold text-xl leading-7">
        Состав заказа
      </p>
      <order-list
        v-for="product in order.products"
        :key="product.id"
        :product="product"
        class="mb-2"
      />
    </div>
    <div>
      <p class="mb-2 text-black font-bold text-xl leading-7">
        Дополнительная информация
      </p>
      <ul>
        <li
          class="flex justify-between items-center w-full mb-3"
        >
          <span class="text-c-gray-5 text-base font-550 leading-5">Тип доставки</span>
          <p class="text-c-gray-6 text-base font-550 leading-5">
            Стандарт
          </p>
        </li>
        <li
          class="flex justify-between items-center w-full mb-3"
        >
          <span class="text-c-gray-5 text-base font-550 leading-5">Время заказа</span>
          <p class="text-c-gray-6 text-base font-550 leading-5">
            {{ order.created_at }}
          </p>
        </li>
        <li
          class="flex justify-between items-center w-full mb-3"
        >
          <span class="text-c-gray-5 text-base font-550 leading-5">Контактное лицо</span>
          <p class="text-c-gray-6 text-base font-550 leading-5">
            {{ order.name }}
          </p>
        </li>
        <li
          class="flex justify-between items-center w-full mb-3"
        >
          <span class="text-c-gray-5 text-base font-550 leading-5">Прибудет</span>
          <p class="text-c-gray-6 text-base font-550 leading-5">
            ~5 июля, 2021
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import VueTypes from 'vue-types'
import OrderList from '~/mobile/components/partials/OrderList'

export default {
  name: 'TrackOrderCard',
  components: { OrderList },
  props: {
    order: VueTypes.object
  }
}
</script>

<style scoped>

</style>
