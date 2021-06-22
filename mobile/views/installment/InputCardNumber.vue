<template>
  <div>
    <TitleContainer title-text="Оформление рассрочки" />
    <div class="flex flex-col justify-center items-center p-4">
      <p class="text-center font-bold text-lg">
        Прикрепиту карту Humo или Uzcard
      </p>
      <p class="text-c-gray-5 my-4 mx-6">
        Выберите первый взнос и срок рассрочки, чтоб расчитать стоимость
      </p>
    </div>
    <div class="px-6">
      <h3 class="text-c-gray-6 font-bold text-xl mb-2">
        Прикрепиту карту Humo или Uzcard
      </h3>
      <p class="text-c-gray-5 text-base">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>
      <div class="flex w-full mt-6">
        <div class="bg-c-gray-1 px-4 py-2 rounded-xl w-full mr-2">
          <label
            for="card"
            class="text-c-gray-5 font-font-550 text-sm"
          >Номер карты</label>
          <input
            id="card"
            type="tel"
            placeholder="0000-0000-0000-0000"
            class="placeholder-c-gray-6 font-font-550 text-sm sm:text-base bg-transparent outline-none w-full"
          >
        </div>
        <div class="bg-c-gray-1 rounded-xl p-4 w-max">
          <input
            type="text"
            placeholder="Годен до"
            class="placeholder-c-gray-6 font-font-550 text-sm sm:text-base bg-transparent outline-none h-full w-full"
          >
        </div>
      </div>
      <a
        href="#"
        class="block bg-c-green-6 p-3 rounded-lg text-center text-c-blue-1 font-font-550 text-base my-4"
      >Отсканировать камерой</a>
      <div class="bg-c-gray-1 px-4 py-2 rounded-xl w-full mr-2 flex justify-between mb-10">
        <div>
          <label
            for="telCard"
            class="text-c-gray-5 font-font-550 text-xs sm:text-sm"
          >Номер телефона привязанный к карте</label>
          <input
            id="telCard"
            type="tel"
            placeholder="+998 99 456 12 32"
            class="placeholder-c-gray-6 font-font-550 text-sm sm:text-base bg-transparent outline-none w-full"
          >
        </div>
        <img src="@/assets/icons/icon-remove.svg">
      </div>
      <a
        href="#"
        class="block bg-c-red-1 p-3 rounded-lg text-center text-white font-font-550 text-base mb-8"
      >Продолжить</a>
    </div>
  </div>
</template>

<script>
import TitleContainer from '../../reusable/TitleContainer'
export default {
  name: 'InputCardNumber',
  components: {
    TitleContainer
  }
}
</script>
