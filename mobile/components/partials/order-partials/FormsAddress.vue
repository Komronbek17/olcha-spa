<template>
  <div>
    <div v-if="addressTitle">
      <div class="bg-c-gray-1 flex justify-between rounded-xl py-2 px-4 mt-4 mb-4">
        <div class="flex flex-col">
          <label
            for="address-name"
            class="text-c-gray-5 text-sm font-font-550"
          >
            Название адреса
          </label>
          <input
            id="address-name"
            v-model="address.addressTitleText"
            type="text"
            class="placeholder-c-gray-6 font-font-550 text-base bg-transparent outline-none"
          >
        </div>
        <img src="~/assets/icons/icon-remove.svg" @click=" address.addressTitleText='' ">
      </div>
    </div>
    <div class="bg-c-gray-1 flex items-center justify-between p-4 rounded-xl">
      <input
        type="text"
        placeholder="Город доставки"
        class="placeholder-c-red-1 font-font-550 text-base bg-transparent outline-none"
      >
      <img src="@/assets/icons/icon-info.svg">
    </div>
    <div class="bg-c-gray-1 flex justify-between rounded-xl py-2 px-4 mt-4">
      <div class="flex flex-col">
        <label
          for="region"
          class="text-c-gray-5 text-sm font-font-550"
        >
          Район
        </label>
        <input
          id="region"
          v-model="address.city"
          type="text"
          class="text-c-gray-6 font-font-550 text-base bg-transparent outline-none"
        >
      </div>
      <img
        src="@/assets/icons/icon-remove.svg"
        @click=" address.city='' "
      >
    </div>
    <input
      v-model="address.street"
      type="text"
      class="bg-c-gray-1 p-4 rounded-xl placeholder-c-gray-6 font-font-550 text-base w-full outline-none mt-4"
    >
    <div class="grid gap-2 grid-cols-2 mt-4">
      <input
        v-model="address.home"
        type="text"
        class="bg-c-gray-1 p-4 rounded-xl placeholder-c-gray-6 font-font-550 text-base w-full outline-none"
      >
      <div class="bg-c-gray-1 flex justify-between rounded-xl py-2 px-4 w-full">
        <div class="flex flex-col w-full">
          <label
            for="flat"
            class="text-c-gray-5 text-sm font-font-550 w-full"
          >
            Квартира **
          </label>
          <input
            id="flat"
            v-model="address.flat"
            type="text"
            class="text-c-gray-6 font-font-550 text-base bg-transparent outline-none w-full"
          >
        </div>
        <img
          src="@/assets/icons/icon-remove.svg"
          @click=" address.flat = null "
        >
      </div>
    </div>
    <div class="grid gap-2 grid-cols-2 mt-4">
      <div class="bg-c-gray-1 flex justify-between rounded-xl py-2 px-4 w-full">
        <div class="flex flex-col w-full">
          <label
            for="podyezd"
            class="text-c-gray-5 text-sm font-font-550 w-full"
          >
            Подъезд
          </label>
          <input
            id="podyezd"
            v-model="address.porch"
            type="text"
            class="text-c-gray-6 font-font-550 text-base bg-transparent outline-none w-full"
          >
        </div>
        <img
          src="@/assets/icons/icon-remove.svg"
          @click=" address.porch = null "
        >
      </div>
      <input
        v-model="address.level"
        type="text"
        class="bg-c-gray-1 p-4 rounded-xl placeholder-c-gray-6 font-font-550 text-base w-full outline-none"
      >
    </div>
    <div v-if="needLoader" class="bg-c-gray-1 flex items-center justify-between p-4 rounded-xl mt-4">
      <label
        for="loader"
        class="text-c-gray-6 font-font-550 text-base flex justify-between items-center w-full"
      >
        Нужен грузчик
        <input
          id="loader"
          type="checkbox"
          class="form-checkbox h-5 sm:h-6 w-5 sm:w-6 text-c-green-1 border-2 border-solid border-c-gray-3"
        >
      </label>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    needLoader: {
      type: Boolean,
      required: false,
      default () {
        return true
      }
    },
    addressTitle: {
      type: Boolean,
      required: false,
      default () {
        return false
      }
    }
  },
  data () {
    return {
      address: {
        city: 'Ташкентская область',
        street: 'Улица',
        home: 'Дом',
        flat: 34,
        porch: 1,
        level: 'Этаж',
        addressTitleText: 'Новый адрес'
      }
    }
  }
}
</script>

<style scoped>

</style>
