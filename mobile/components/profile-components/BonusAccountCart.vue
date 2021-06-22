<template>
  <div class="rounded-2xl bg-gradient-to-b from-c-green-1 to-c-green-3 p-4">
    <ul>
      <li class="flex flex-nowrap items-center justify-between">
        <span class="text-xl font-550 text-white leading-6">Бонусный счет</span>
        <nuxt-link
          :to="{ name: 'help' }"
          class="opacity-60"
        >
          <img
            src="~/assets/icons/question-mark.svg"
            alt="question-mark.svg"
          >
        </nuxt-link>
      </li>
      <li>
        <p class="text-white font-bold text-white text-3.5xl">
          {{ bonus }} сум
        </p>
      </li>
      <li>
        <p class="text-sm font-550 text-white opacity-70 leading-4">
          Совершайте покупки и переводы в приложении OlchaPay и получайте реальные бонусы
        </p>
      </li>
      <li>
        <nuxt-link
          class="w-full font-550 text-base leading-5 mt-4 text-white py-2 px-4 bg-white bg-opacity-10 rounded-lg"
          tag="button"
          :to="{ name: 'bonus-account' }"
        >
          История
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
import VueTypes from 'vue-types'

export default {
  name: 'BonusAccountCart',
  props: {
    bonus: VueTypes.number
  }
}
</script>
