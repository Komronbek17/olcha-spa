<template>
  <div class="container mx-auto pt-4">
    <div class="grid grid-cols-1 gap-10">
      <div class="rounded-2xl bg-gradient-to-b from-c-green-1 to-c-green-3 p-4">
        <ul>
          <li class="flex flex-nowrap items-center justify-between">
            <span class="text-xl font-550 text-white leading-6">Бонусный счет</span>
          </li>
          <li>
            <p class="text-white font-bold text-3.5xl">
              24 710 сум
            </p>
          </li>
        </ul>
      </div>
      <div class="rounded-2xl bg-gradient-to-b from-c-green-1 to-c-green-3 p-4 hidden">
        <ul class="grid grid-cols-1 gap-y-2">
          <li class="flex flex-nowrap items-center justify-between">
            <span class="font-bold text-white text-3.5xl leading-8">Откройте бонусный
              счет Olcha</span>
            <nuxt-link
              :to="{ name: 'help' }"
              class="opacity-60"
            >
              <img
                src="~/assets/icons/question-mark.svg"
                alt="question-mark.svg"
                class="w-7 h-7"
              >
            </nuxt-link>
          </li>
          <li>
            <p class="text-sm font-550 text-white opacity-70 leading-4">
              Пройдите верификацию, чтоб открыть доступ к бонусному счету Olcha и получать кэшбек с каждой покупки
            </p>
          </li>
          <li>
            <nuxt-link
              class="w-full font-550 text-base leading-5 mt-4 text-c-gray-6 py-2 px-4 bg-white rounded-lg"
              tag="button"
              :to="{ name: 'bonus-account' }"
            >
              Пройти верификацию
            </nuxt-link>
          </li>
        </ul>
      </div>
      <div class="px-2">
        <p class="text-black font-bold text-xl leading-7">
          Как получить баллы?
        </p>
        <div class="rounded-2xl bg-c-gray-1 p-6 mt-4">
          <ul class="grid grid-cols-1 gap-y-10">
            <li class="flex flex-nowrap items-center justify-between">
              <img class="mr-4" src="~/assets/icons/mobile-shopping.svg" alt="mobile-shopping.svg">
              <p class="text-lg leading-6 text-c-gray-6 font-bold">
                Покупайте товары с кэшбеком в Olcha.uz
              </p>
            </li>
            <li class="flex flex-nowrap items-center justify-between">
              <img class="mr-4" src="~/assets/icons/mobile-shopping-green.svg" alt="mobile-shopping.svg">
              <p class="text-lg leading-6 text-c-gray-6 font-bold">
                Бонусы будут зачислены на ваш счет
              </p>
            </li>
            <li class="flex flex-nowrap items-center justify-between">
              <img class="mr-4" src="~/assets/icons/mobile-shopping-blue.svg" alt="mobile-shopping.svg">
              <p class="text-lg leading-6 text-c-gray-6 font-bold">
                Делайте транзакции через OlchaPay
              </p>
            </li>
          </ul>
        </div>
      </div>
      <div class="px-2">
        <p class="text-black font-bold text-xl leading-7">
          На что можно их потратить?
        </p>
        <div class="rounded-2xl bg-c-gray-1 p-6 mt-4">
          <p class="font-550 text-base leading-6 text-c-gray-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat
          </p>
        </div>
      </div>
      <div class="px-2">
        <p class="text-black font-550 text-xl leading-7">
          Недавние поступления
        </p>
        <div class="grid grid-cols-1 gap-y-4 px-2 mt-4">
          <bonus-list-item v-for="n in 5" :key="n" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BonusListItem from '~/mobile/components/profile-components/BonusListItem'

export default {
  name: 'BonusAccountPage',
  components: { BonusListItem }
}
</script>

<style scoped>

</style>
