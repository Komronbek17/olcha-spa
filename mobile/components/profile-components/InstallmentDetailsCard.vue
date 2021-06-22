<template>
  <div>
    <p class="text-left font-bold text-lg mb-3">
      Данные для погашения платежа
      #{{ details.id }} от {{ details.payment_day }}
    </p>
    <ul v-if="details.status !== 'success'" class="bg-c-gray-1 rounded-2xl p-4 grid grid-cols-1 gap-y-2">
      <li class="flex items-center justify-between">
        <p class="text-c-gray-5">
          План погашения
        </p>
        <p class="font-semibold">
          {{ details.payment_day }}
        </p>
      </li>
      <li class="flex items-center justify-between pb-4 border-b-2 border-c-gray-2">
        <p class="text-c-gray-5">
          Фактическая оплата
        </p>
        <p class="font-semibold ">
          {{ details.payment_day }}
        </p>
        <!-- Border Bottom -->
      </li>
      <li class="flex items-center justify-between">
        <p class="font-bold">
          Олачено
        </p>
        <p class="font-bold text-lg ">
          0 сум
        </p>
      </li>
      <li class="flex items-center justify-between">
        <p class="text-c-gray-5">
          Остаток
        </p>
        <p class="font-semibold ">
          {{ details.payment }} сум
        </p>
      </li>
      <li class="flex items-center justify-between">
        <p class="text-c-gray-5">
          Причина
        </p>
        <p class="font-semibold ">
          {{ details.payment_reason }}
        </p>
      </li>
      <li class="flex items-center justify-between">
        <p class="text-c-gray-5">
          Детализация
        </p>
        <p class="font-semibold ">
          -
        </p>
      </li>
      <li class="flex items-center justify-between">
        <p class="text-c-gray-5">
          Просроченные дни
        </p>
        <p class="text-c-gray-5 font-semibold " :class="details.expiry_day_all !== 0 ? 'text-c-red-1' : ''">
          {{ details.expiry_day_all !== 0 ? `${details.expiry_day_all} дня` : '-' }}
        </p>
      </li>
      <li class="flex items-center justify-between pb-4 border-b-2 border-c-gray-2">
        <p class="text-c-gray-5">
          Просроченный долг
        </p>
        <p class="text-c-gray-5 font-semibold " :class="details.expiry_price_all !== 0 ? 'text-c-red-1' : ''">
          {{ details.expiry_price_all !== 0 ? `+ ${details.expiry_price_all} сум` : '-' }}
        </p>
        <!-- Border Bottom  -->
      </li>
      <li class="flex items-center justify-between">
        <p class="text-c-gray-5">
          Статус :
        </p>
        <p
          class="font-semibold"
          :class="details.status === 'success' ? 'text-c-green-1' : 'text-c-gray-5'"
        >
          {{ details.status === 'success' ? 'Оплачено' : 'Ожидание оплаты' }}
        </p>
      </li>
    </ul>
    <div v-else class="grid grid-cols-1 gap-y-4">
      <ul
        v-for="graph in details.history"
        :key="graph.id"
        class="bg-c-gray-1 rounded-2xl p-4 grid grid-cols-1 gap-y-2"
      >
        <li class="flex items-center justify-between">
          <p class="text-c-gray-5">
            План погашения
          </p>
          <p class="font-semibold my-2">
            {{ details.payment_day }}
          </p>
        </li>
        <li class="flex items-center justify-between pb-4 border-b-2 border-c-gray-2">
          <p class="text-c-gray-5">
            Фактическая оплата
          </p>
          <p class="font-semibold my-2">
            {{ graph.payment_day }}
          </p>
          <!-- Border Bottom -->
        </li>
        <li class="flex items-center justify-between">
          <p class="font-bold">
            Олачено
          </p>
          <p class="font-bold text-lg my-2">
            {{ graph.payment }} сум
          </p>
        </li>
        <li class="flex items-center justify-between">
          <p class="text-c-gray-5">
            Остаток
          </p>
          <p class="font-semibold my-2">
            {{ details.payment }} сум
          </p>
        </li>
        <li class="flex items-center justify-between">
          <p class="text-c-gray-5">
            Причина
          </p>
          <p class="font-semibold my-2">
            {{ details.payment_reason }}
          </p>
        </li>
        <li class="flex items-center justify-between">
          <p class="text-c-gray-5">
            Детализация
          </p>
          <p class="font-semibold my-2">
            {{ graph.payment_type }}
          </p>
        </li>
        <li class="flex items-center justify-between">
          <p class="text-c-gray-5">
            Просроченные дни
          </p>
          <p class="text-c-gray-5 font-semibold my-2" :class="details.expiry_day_all !== 0 ? 'text-c-red-1' : ''">
            {{ details.expiry_day_all !== 0 ? `${details.expiry_day_all} дня` : '-' }}
          </p>
        </li>
        <li class="flex items-center justify-between pb-4 border-b-2 border-c-gray-2">
          <p class="text-c-gray-5">
            Просроченный долг
          </p>
          <p class="text-c-gray-5 font-semibold my-2" :class="details.expiry_price_all !== 0 ? 'text-c-red-1' : ''">
            {{ details.expiry_price_all !== 0 ? `+ ${details.expiry_price_all} сум` : '-' }}
          </p>
          <!-- Border Bottom  -->
        </li>
        <li class="flex items-center justify-between">
          <p class="text-c-gray-5">
            Статус :
          </p>
          <p
            class="font-semibold my-2"
            :class="details.status === 'success' ? 'text-c-green-1' : 'text-c-gray-5'"
          >
            {{ details.status === 'success' ? 'Оплачено' : 'Ожидание оплаты' }}
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import VueTypes from 'vue-types'

export default {
  name: 'InstallmentDetailsCard',
  props: {
    details: VueTypes.object
  }

}
</script>

<style scoped>

</style>
