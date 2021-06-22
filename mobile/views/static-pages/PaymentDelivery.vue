<template>
  <div class="container mx-auto py-4">
    <TitleContainer title-text="Оплата и Доставка Товара" />
    <div class="text-c-gray-6">
      <h3 class="font-bold text-xl mb-2">
        Оплата
      </h3>
      <p class="text-base font-font-550 italic mb-6">
        Понравившиеся вещи Вы можете оплатить перечисленными ниже способами.
      </p>
      <p class="">
        - <span class="font-font-550">Наличный расчет или Банковская карта (uzcard/humo)</span> – оплата производится
        после доставки заказа.

        <br><br>Деньги передаются курьеру, который предоставил заказ.

        <br><br>- <span class="font-font-550">Онлайн оплата через платежные системы:</span> Payme, Click, Apelsin.
      </p>
    </div>
    <div class="text-c-gray-6">
      <h3 class="font-bold text-xl mb-2 mt-6">
        Доставка
      </h3>
      <p class="text-base font-font-550 italic mb-6">
        Быстро доставим любой Ваш заказ по всему Узбекистану!
      </p>
      <p class="mt-4">
        <span class="font-font-550">- Доставка по Ташкенту:</span>

        <br><br> <span class="font-font-550">Стандарт</span> - Доставка по Ташкенту в течении <span
          class="font-font-550"
        >12 рабочих часов</span>. Стоимость доставки при суммы заказа свыше
        200 000
        сум - <span class="font-font-550 uppercase">БЕСПЛАТНО!</span>

        <br><br><span class="font-font-550">Express</span> - Доставка по Ташкенту в течении <span class="font-font-550">4 рабочих часов</span>.
        Стоимость доставки - <span class="font-font-550">30.000 сум</span>!
      </p>
      <p class="mt-4">
        <span class="font-font-550">- Доставка по всем регионам Республики:</span>

        <br><br>Доставка по регионам осуществляется при помощи курьерских служб.
      </p>
      <p class="mt-4">
        Срок доставки <span class="font-font-550">от 1 до 3х рабочих дней</span>!

        <br><br>Стоимость доставки при заказе свыше 200 000 сум и с весом до 10кг - <span
          class="font-font-550 uppercase"
        >БЕСПЛАТНО!</span>
        Заказы с весом свище 10 кг рассчитывается и отображается при заказе товара исходя из веса и месты доставки.

        <br><br><span class="font-font-550 italic">Мы Вам гарантируем приемлемые минимальные цены!</span>
      </p>
    </div>
  </div>
</template>

<script>
import TitleContainer from '~/mobile/reusable/TitleContainer'

export default {
  components: {
    TitleContainer
  }
}
</script>
