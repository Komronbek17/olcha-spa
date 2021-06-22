<template>
  <div class="rounded-xl p-4" :class="graph_status[graph.status].class" @click="$emit('on:click')">
    <div class="grid grid-rows-3 grid-flow-col gap-y-2">
      <div class="flex justify-between items-center">
        <p class="text-c-gray-6 font-semibold">
          {{ graph.payment_day }}
        </p>
        <p class="text-c-gray-6 font-semibold" :class="graph.status === 'success' ? 'text-c-green-1' : ''">
          {{ graph_status[graph.status].title }}
        </p>
      </div>
      <p class="font-bold text-lg">
        {{ graph.payment }} сум
      </p>
      <div class="flex justify-between items-center">
        <p class="text-sm text-c-gray-5">
          {{ graph.payment_reason }}
        </p>
        <p class="text-sm text-c-gray-5 ">
          Подробнее
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import VueTypes from 'vue-types'

export default {
  name: 'PaymentCart',
  props: {
    graph: VueTypes.object
  },
  data () {
    return {
      graph_status: {
        success: {
          class: 'bg-c-green-1 bg-opacity-10',
          title: 'Оплачено'
        },
        fail: {
          title: 'Ожидание',
          class: 'bg-c-gray-1'
        }
      }
    }
  }
}
</script>
