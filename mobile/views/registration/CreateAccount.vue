<template>
  <div class="font-helvetica max-w-3xl">
    <div class="pt-8 sm:pt-20 px-6 pb-6 ">
      <h2 class="text-c-gray-6 font-bold text-xl sm:text-3xl mb-8">
        Создание аккаунта
      </h2>
      <form>
        <input
          type="text"
          placeholder="Имя"
          class="p-4 bg-c-gray-1 rounded-xl mb-4 placeholder-c-gray-6 outline-none font-font-550 text-sm sm:text-base w-full"
          required
        >
        <input
          type="text"
          placeholder="Фамилия"
          class="p-4 bg-c-gray-1 rounded-xl mb-4 placeholder-c-gray-6 outline-none font-font-550 text-sm sm:text-base w-full"
          required
        >
        <input
          type="email"
          placeholder="Электронная почта"
          class="p-4 bg-c-gray-1 rounded-xl mb-4 placeholder-c-gray-6 outline-none font-font-550 text-sm sm:text-base w-full"
          required
        >
        <input
          type="password"
          placeholder="Пароль"
          class="p-4 bg-c-gray-1 rounded-xl mb-4 placeholder-c-gray-6 outline-none font-font-550 text-sm sm:text-base w-full"
        >
        <input
          type="password"
          placeholder="Повторите пароль"
          class="p-4 bg-c-gray-1 rounded-xl mb-4 placeholder-c-gray-6 outline-none font-font-550 text-sm sm:text-base w-full"
          required
        >
        <div class="mt-2 mb-4">
          <p class="text-c-gray-4 text-center font-font-550 text-sm">
            Нажимая "Зарегистрироваться", я соглашаюсь с
          </p>
          <a
            href="#"
            class="block text-c-blue-1 text-center font-font-550 text-sm"
          >публичным договором оферты</a>
        </div>
        <input
          type="submit"
          value="Зарегистрироваться"
          class="red-btn-light mt-24 sm:mt-0"
        >
      </form>
    </div>
  </div>
</template>

<script>
export default {

}
</script>
