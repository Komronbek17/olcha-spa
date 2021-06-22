<template>
  <div class="container mx-auto bg-c-gray-1 px-4 py-8 font-font-550">
    <img src="~/assets/images/logo-red.png" alt="">
    <p class="text-c-gray-6 text-sm mt-4">
      Телефон поддержки
    </p>
    <a href="tel:+998712022021" class="block text-c-gray-6 text-base font-bold mb-4">+998 (71) 202 202 1</a>
    <a href="https://play.google.com/store/apps/developer?id=Olcha+LLC" target="_blank">
      <img src="~/assets/images/googleplay.png" alt="olcha-play-market" class="cursor-pointer mb-4 my-2">
    </a>
    <ul class="mt-4">
      <li>
        <nuxt-link
          :to="{name: 'policy'}"
          class="block text-c-gray-6 text-base mb-1.5"
        >
          Политика конфиденциальности
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          :to="{name: 'help'}"
          class="block text-c-gray-6 text-base mb-1.5"
        >
          Помощь
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          :to="{name: 'installment-plan'}"
          class="block text-c-gray-6 text-base mb-1.5"
        >
          Условия рассрочки
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          :to="{name: 'about-company'}"
          class="block text-c-gray-6 text-base mb-1.5"
        >
          О компании
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          :to="{name: 'public-offer'}"
          class="block text-c-gray-6 text-base mb-1.5"
        >
          Оферта
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          :to="{name: 'eco-friendly'}"
          class="block text-c-gray-6 text-base mb-1.5"
        >
          Eco-friendly
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          :to="{name: 'payment-and-delivery'}"
          class="block text-c-gray-6 text-base mb-1.5"
        >
          Оплата и доставка
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>
