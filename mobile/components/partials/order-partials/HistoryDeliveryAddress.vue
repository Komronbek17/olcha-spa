<template>
  <div class="with-login">
    <div class="">
      <label
        for="house"
        class="bg-c-gray-1 p-4 bg-opacity-70 rounded-xl mt-4 flex"
      >
        <input
          id="house"
          type="radio"
          name="payment"
          class="form-radio h-6 w-6 text-c-green-1 border-2 border-solid border-c-gray-3"
          checked
        >
        <div class="ml-4">
          <p class="text-c-gray-6 font-bold text-base">Дом</p>
          <p class="text-c-gray-5 font-font-550 text-sm">г. Ташкент, Юнусобадский район, ул. Ислама Каримова 19, д1, п4, кв9</p>
        </div>
      </label>
      <label
        for="address"
        class="bg-c-gray-1 p-4 bg-opacity-70 rounded-xl mt-4 flex"
      >
        <input
          id="address"
          type="radio"
          name="payment"
          class="form-radio h-6 w-6 text-c-green-1 border-2 border-solid border-c-gray-3"
        >
        <div class="ml-4">
          <p class="text-c-gray-6 font-bold text-base">Адрес 1</p>
          <p class="text-c-gray-5 font-font-550 text-sm">г. Ташкент, Шайхонтохурский район, ул. Зульфияхонум 19, кв 55</p>
        </div>
      </label>
      <div
        class="block mt-4 bg-c-green-1 p-2 text-center rounded-lg text-white text-base font-font-550"
        @click="changedDeliveryAddressComp('NewDeliveryAddress')"
      >
        Ввести новый адрес
      </div>
      <div class="bg-c-gray-1 flex items-center justify-between p-4 rounded-xl mt-4">
        <label
          for="loader1"
          class="text-c-gray-6 font-font-550 text-base flex justify-between items-center w-full"
        >
          Нужен грузчик
          <input
            id="loader1"
            type="checkbox"
            class="form-checkbox h-5 sm:h-6 w-5 sm:w-6 text-c-green-1 border-2 border-solid border-c-gray-3"
            checked
          >
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  methods: {
    ...mapMutations('order', ['changedDeliveryAddressComp'])
  }
}
</script>
