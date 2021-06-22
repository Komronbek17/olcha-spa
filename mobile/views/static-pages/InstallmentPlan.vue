<template>
  <div class="container mx-auto py-4">
    <TitleContainer
      title-text="Условия рассрочки. Рассрочка для всех жителей республики Узбекистан на сайте Olcha.uz!"
    />
    <div class="mb-8">
      <p class="text-c-gray-6 font-font-550 text-base italic">
        Какие документы необходимы для оформления рассрочки?
      </p>
      <ol>
        <li class="text-c-gray-6 text-base mt-4">
          <strong>1. </strong>Паспорт;
        </li>
        <li class="text-c-gray-6 text-base mt-4">
          <strong>2. </strong>Банковская карта UzCard либо HUMO с подключенной услугой СМС
          информирования и стабильный оборот в течении
          последних 3-х месяцев;
        </li>
      </ol>
    </div>
    <div class="mb-8">
      <p class="text-c-gray-6 font-font-550 text-base italic">
        Пошаговый процесс выдачи товара в рассрочку:
      </p>
      <ol>
        <li class="text-c-gray-6 text-base mt-4">
          <strong>1. </strong> Выбираете на сайте необходимый товар, оптимальный срок и
          первоначальный
          взнос;
        </li>
        <li class="text-c-gray-6 text-base mt-4">
          <strong>2. </strong> - Отправляете фото паспорта где указана информация (1-ая страница)
          <br>- Отправляете фото паспорта где указана информация о месте жительства (постоянная прописка);
          <br>- Сфотографируйтесь с паспортом, где указана информация с первой страницы;
        </li>
      </ol>
    </div>
    <div>
      <p class="text-c-gray-6 text-base">
        Требования предъявляемые к фотографии:
      </p>
      <p class="text-c-gray-6 text-base">
        Качество фотографии должно предоставлять возможность сравнить лицо владельца с фотографией в паспорте,
        а также должны быть читабельны реквизиты паспорта!
        Фото идентификация заявления будет проводится один раз и при повторном приобретении товара в рассрочку проводить
        повторную фото идентификацию не требуется!
      </p>
    </div>
    <div>
      <p class="text-c-gray-6 text-base mb-4">
        Пример:
      </p>
      <img src="~/assets/images/passport.jpg" alt="">
      <p class="text-c-gray-6 text-base my-4">
        фото паспорта где указана информация с первой страницы
      </p>
      <img src="~/assets/images/passport-require.jpg" alt="">
    </div>
    <div>
      <p class="text-c-gray-6 text-base">
        верификация паспорта
      </p>
      <ol>
        <li class="text-c-gray-6 text-base mt-4">
          <strong>3. </strong>Вводите данные вашей банковской карты (номер и срок действии карты);
        </li>
        <li class="text-c-gray-6 text-base mt-4">
          <strong>4. </strong>Внимательно прочитайте публичную оферту и если Вы с ним согласны,
          ставим
          галочку и нажимаем кнопку отправить;
        </li>
        <li class="text-c-gray-6 text-base mt-4">
          <strong>5. </strong>Далее придет смс, вводите полученный код
        </li>
        <li class="text-c-gray-6 text-base mt-4">
          <strong>6. </strong>После успешного ввода кода, Вам придёт смс о том что Ваша заявка по
          рассрочке принята.
        </li>
        <li class="text-c-gray-6 text-base mt-4">
          <strong>7. </strong>Если Ваша заявка будет одобрена, то Вам придёт смс уведомление;
        </li>
      </ol>
    </div>
    <p class="text-c-gray-6 text-base font-font-550 mt-4">
      На этом вся процедура оформления рассрочки заканчивается!
    </p>
    <p class="text-c-gray-6 text-base mt-4">
      После оформления, Вам доставят приобретённый товар в рассрочку с договором по указанному адресу!
    </p>
    <p class="text-c-gray-6 text-base font-font-550 mt-4">
      Рассрочка предоставляется на срок от 3х до 9 месяцев.
    </p>
    <div class="text-c-gray-6 text-base mt-8 flex">
      <p class="mr-1">
        Для подробной информации пишите нам по телеграму
      </p> <a
        href="https://telegram.me/olcha_support"
      >@olcha_support</a>
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
