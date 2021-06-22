<template>
  <div class="bg-white rounded-2xl p-6">
    <p class="text-base font-550 text-c-gray-6 mb-2">
      Домашний адрес
    </p>
    <ul class="grid grid-cols-1 gap-y-2">
      <li class="grid grid-cols-2 ">
        <span class="w-60 inline-block text-c-gray-5 text-base font-550 leading-5">Адрес:</span>
        <p class="text-c-gray-6 text-base font-550 leading-5 ">
          {{ address.full_name || 'Не указано' }}
        </p>
      </li>
      <li class="grid grid-cols-2 ">
        <span
          class="w-32 inline-block text-c-gray-5 text-base font-550 leading-5"
        >Этаж:</span>
        <p class="text-c-gray-6 text-base font-550 leading-5">
          {{ address.floor || 'Не указано' }}
        </p>
      </li>
      <li class="grid grid-cols-2 ">
        <span class="w-32 inline-block text-c-gray-5 text-base font-550 leading-5">Подъезд:</span>
        <p class="text-c-gray-6 text-base font-550 leading-5">
          {{ address.apartment || 'Не указано' }}
        </p>
      </li>
      <li class="grid grid-cols-2 ">
        <span class="w-32 inline-block text-c-gray-5 text-base font-550 leading-5">Квартира:</span>
        <p class="text-c-gray-6 text-base font-550 leading-5">
          {{ address.house_number || 'Не указано' }}
        </p>
      </li>
    </ul>
    <div class="flex items-center justify-between mt-4 pt-2">
      <button
        v-if="address.main_address"
        class="font-550 text-sm leading-4 text-white bg-c-red-1 rounded-lg py-2 px-4"
      >
        По умолчанию
      </button>
      <button
        v-else
        class="font-550 text-sm leading-4 text-c-gray-6 bg-c-gray-1 rounded-lg py-2 px-4"
      >
        Сделать по умолчанию
      </button>
      <button
        class="font-550 text-sm leading-4 text-c-gray-6  bg-c-gray-1 rounded-lg py-2 px-4"
        @click="change"
      >
        Изменить
      </button>
    </div>
  </div>
</template>

<script>
import VueTypes from 'vue-types'

export default {
  name: 'AddressCard',
  props: {
    address: VueTypes.object
  },
  methods: {
    change () {
      this.$emit('change', this.address)
    }
  }
}
</script>

<style scoped>

</style>
