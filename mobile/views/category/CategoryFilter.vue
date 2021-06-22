<template>
  <div class="filter bg-white z-10 top-0 w-full h-screen flex-col justify-between">
    <div class="w-full">
      <div class="py-7 px-6 flex items-center">
        <div @click="goBack">
          <img
            src="~/assets/icons/icon-back.svg"
            class="icon-back mr-5"
          >
        </div>
        <div class="flex justify-between items-center w-full">
          <h3 class="font-bold text-xl sm:text-2xl text-c-gray-6">
            Фильтр
          </h3>
          <a
            href="#"
            class="text-xs sm:text-sm text-c-red-1 font-font-550"
          >Сбросить фильтр</a>
        </div>
      </div>
      <ul class="px-8">
        <li class="flex justify-between items-center py-4 border-b border-solid border-c-gray-2">
          <button
            class="filter-link font-font-550 text-sm sm:text-base text-c-gray-6 focus:outline-none"
            @click=" showIntervalMoney = true"
          >
            Цена
          </button>

          <p class="font-font-550 text-sm sm:text-base text-c-gray-3">
            Не указано
          </p>
        </li>
        <li class="flex justify-between items-center py-4 border-b border-solid border-c-gray-2">
          <button
            class="filter-link font-font-550 text-sm sm:text-base text-c-gray-6"
            @click="showMemoryCheckbox=true"
          >
            Производитель
          </button>
          <p class="font-font-550 text-sm sm:text-base text-c-orange-1">
            Samsung, LG, Hua...
          </p>
        </li>
        <li class="flex justify-between items-center py-4 border-b border-solid border-c-gray-2">
          <a
            href="#"
            class="filter-link font-font-550 text-sm sm:text-base text-c-gray-6"
          >Диагональ экрана</a>
          <p class="font-font-550 text-sm sm:text-base text-c-orange-1">
            5*
          </p>
        </li>
        <li class="flex justify-between items-center py-4 border-b border-solid border-c-gray-2">
          <a
            href="#"
            class="filter-link font-font-550 text-sm sm:text-base text-c-gray-6"
          >Операционная система</a>
          <p class="font-font-550 text-sm sm:text-base text-c-orange-1">
            Android
          </p>
        </li>
        <li class="flex justify-between items-center py-4">
          <p class="font-font-550 text-sm sm:text-base text-c-gray-6">
            4G LTE
          </p>
          <!-- Toggle 4G LTE  -->
          <div
            class="flex justify-between items-center"
            @click="toggleActive = !toggleActive"
          >
            <div
              class="w-12 h-5 flex items-center bg-gray-300 rounded-full p-1 duration-300 ease-in-out"
              :class="{ 'bg-green-400': toggleActive}"
            >
              <div
                class="bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out"
                :class="{ 'translate-x-6': toggleActive,}"
              />
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="py-6 px-4 text-center w-full">
      <a
        href="#"
        class="block bg-c-red-1 p-3 rounded-xl text-white font-bold text-sm sm:text-base"
      >
        Показать 52 товара</a>
    </div>

    <ModalContainer
      v-if="showIntervalMoney || showMemoryCheckbox"
      class="mb-16 z-20"
    >
      <!-- Interval Money -->
      <div
        v-if="showIntervalMoney"
        class="filter-block bg-white rounded-t-3xl absolute bottom-0 w-full"
      >
        <div class="flex justify-between items-center w-full px-8 pt-8 pb-4">
          <h3 class="font-bold text-xl sm:text-2xl text-c-gray-6">
            Цена
          </h3>
          <button
            class="text-xs sm:text-sm text-c-red-1 font-font-550"
            @click="showIntervalMoney=false"
          >
            Очистить
          </button>
        </div>
        <div class="flex px-6">
          <div class="bg-c-gray-1 rounded-xl py-2 px-4 mr-2 w-full flex items-center">
            <div class="flex flex-col">
              <p class="text-c-gray-5 font-font-550 text-sm sm:text-base">
                От
              </p>
              <input
                type="text"
                class="w-full text-c-gray-6 text-sm sm:text-base font-font-550 bg-transparent outline-none"
                placeholder="0 сум"
              >
            </div>
          </div>
          <div class="bg-c-gray-1 rounded-xl py-2 px-4 flex justify-between items-center w-full">
            <div class="flex flex-col">
              <p class="text-c-gray-5 font-font-550 text-sm sm:text-base">
                До
              </p>
              <input
                type="text"
                class="w-full text-c-gray-6 text-sm sm:text-base font-font-550 bg-transparent outline-none"
                placeholder="500 000 сум"
              >
            </div>
            <img
              src="~/assets/icons/icon-remove.svg"
              class="w-6 h-6"
            >
          </div>
        </div>
        <div class="py-6 px-4 text-center w-full">
          <a
            href="#"
            class="filter-btn block bg-c-red-1 p-3 rounded-xl text-white font-bold text-sm sm:text-base"
          >Показать 52 товара</a>
        </div>
      </div>
      <!-- End Of Interval Money -->

      <!-- Memory Checkbox -->
      <div
        v-if="showMemoryCheckbox"
        class="filter-block bg-white rounded-t-3xl absolute bottom-0 w-full"
      >
        <div class="flex justify-between items-center w-full px-8 pt-8">
          <h3 class="font-bold text-xl sm:text-2xl text-c-gray-6">
            Встроенная память
          </h3>
          <button
            class="text-xs sm:text-sm text-c-red-1 font-font-550"
            @click="showMemoryCheckbox=false"
          >
            Сбросить
          </button>
        </div>
        <div class="px-8">
          <div class="flex mt-6">
            <input
              v-model="checkedMemory"
              type="checkbox"
              :value="32"
              class="form-checkbox h-5 sm:h-6 w-5 sm:w-6 text-c-green-1 border-2 border-solid border-c-gray-3"
            >
            <label class="text-c-gray-6 text-base sm:text-lg font-font-550 ml-4">
              32 ГБ
            </label>
          </div>
          <div class="flex mt-6">
            <input
              v-model="checkedMemory"
              type="checkbox"
              :value="64"
              class="form-checkbox h-5 sm:h-6 w-5 sm:w-6 text-c-green-1 border-2 border-solid border-c-gray-3"
            >
            <label class="text-c-gray-6 text-base sm:text-lg font-font-550 ml-4">
              64 ГБ
            </label>
          </div>
          <div class="flex mt-6">
            <input
              v-model="checkedMemory"
              type="checkbox"
              :value="128"
              class="form-checkbox h-5 sm:h-6 w-5 sm:w-6 text-c-green-1 border-2 border-solid border-c-gray-3"
            >
            <label class="text-c-gray-6 text-base sm:text-lg font-font-550 ml-4">
              128 ГБ
            </label>
          </div>
          <div class="flex mt-6">
            <input
              v-model="checkedMemory"
              type="checkbox"
              :value="256"
              class="form-checkbox h-5 sm:h-6 w-5 sm:w-6 text-c-green-1 border-2 border-solid border-c-gray-3"
            >
            <label class="text-c-gray-6 text-base sm:text-lg font-font-550 ml-4">
              256 ГБ
            </label>
          </div>
          <div class="flex mt-6">
            <input
              v-model="checkedMemory"
              type="checkbox"
              :value="512"
              class="form-checkbox h-5 sm:h-6 w-5 sm:w-6 text-c-green-1 border-2 border-solid border-c-gray-3"
            >
            <label class="text-c-gray-6 text-base sm:text-lg font-font-550 ml-4">
              512 ГБ
            </label>
          </div>
        </div>
        <div class="py-6 px-4 text-center w-full">
          <a
            href="#"
            class="filter-btn block bg-c-red-1 p-3 rounded-xl text-white font-bold text-sm sm:text-base"
          >Показать 52 товара</a>
        </div>
      </div>
      <!-- Memory Checkbox -->
    </ModalContainer>
  </div>
</template>

<script>
import ModalContainer from '../../reusable/ModalContainer'
export default {
  name: 'CategoryFilter',
  components: {
    ModalContainer
  },
  data () {
    return {
      showIntervalMoney: false,
      showMemoryCheckbox: false,
      toggleActive: false,
      checkedMemory: []
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>
