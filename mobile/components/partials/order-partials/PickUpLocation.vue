<template>
  <div>
    <div>
      <h3 class="text-c-gary-6 font-bold text-xl sm:text-2xl mt-10">
        Способ самовывоза
      </h3>
      <img src="@/assets/images/map.png" class="w-full mt-4 mb-2">
      <div class="bg-c-gray-1 flex justify-between rounded-xl py-2 px-4 mt-6 w-full">
        <div class="flex flex-col w-full">
          <p class="text-c-gray-5 text-sm font-font-550">
            Город для самовывоза
          </p>
          <input
            class="bg-transparent shadow font-font-550 text-base focus:outline-none rounded py-2 px-3 text-grey-darker"
            value="Ташкентская область"
          >
        </div>
        <img src="@/assets/icons/icon-left.svg" class="transform -rotate-90">
      </div>
      <div class="bg-c-gray-1 flex justify-between rounded-xl py-2 px-4 mt-4 w-full">
        <div class="flex flex-col w-full">
          <p class="text-c-gray-5 text-sm font-font-550">
            Пункт самовывоза
          </p>
          <input
            class="bg-transparent shadow font-font-550 text-base focus:outline-none rounded py-2 px-3 text-grey-darker"
            value="Пункт на Шахристанской"
          >
        </div>
        <img src="@/assets/icons/icon-left.svg" class="transform -rotate-90">
      </div>
      <div class="py-2 px-4 rounded-xl bg-c-gray-1 mt-4 w-full">
        <p class="text-c-gray-5 text-sm font-font-550">
          Дата самовывоза
        </p>
        <input type="date" class="outline-none text-base font-font-550 text-c-gray-6 bg-transparent w-full after:content ">
      </div>
      <div class="bg-c-green-2 bg-opacity-10 p-4 rounded-lg mt-4">
        <p class="text-c-gray-6 font-font-550 text-sm mb-3">
          г. Чирчик, Аранчаский абата ул. Тикланиш уйлари 107 дом 61
        </p>
        <div class="flex justify-between">
          <p class="text-c-gray-5 font-font-550 text-sm">
            Режим работы пункта
          </p>
          <p class="text-c-gray-6 font-font-550 text-sm">
            9:00 - 18:00
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>
