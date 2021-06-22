<template>
  <div class="font-helvetica max-w-3xl">
    <div class="pt-8 sm:pt-20 px-6 pb-6 flex flex-col justify-start h-screen">
      <div>
        <h2 class="text-c-gray-6 font-bold text-xl sm:text-3xl mb-8">
          Вход в аккаунт
        </h2>
        <div class="flex flex-col py-2 px-4 bg-c-gray-1 rounded-xl mb-4">
          <label
            class="text-c-gray-5 font-font-550 text-xs sm:text-sm"
          >Номер телефона</label>
          <input
            v-model="phoneNumber"
            v-validate="'numeric'"
            type="tel"
            value="+998"
            class="px-2 outline-none text-c-gray-6 font-font-550 text-sm sm:text-base bg-transparent"
            required
          >
        </div>
        <input
          v-model="password"
          v-validate="'required'"
          type="password"
          placeholder="Пароль"
          class="p-4 bg-c-gray-1 rounded-xl mb-4 placeholder-c-gray-6 outline-none font-font-550 text-sm sm:text-base w-full"
        >
        <NuxtLink
          class="block text-c-gray-5 mb-8 font-font-550 text-xs sm:text-sm"
          :to="{name: 'recover-password'}"
        >
          Забыли пароль?
        </NuxtLink>
        <button
          class="red-btn"
          @click="login"
        >
          Войти
        </button>
      </div>
      <NuxtLink
        :to="{ name: 'sign-up' }"
        class="block p-3 rounded-lg text-c-red-1 w-full bg-c-gray-1 font-font-550 text-sm sm:text-base text-center mt-6"
      >
        Зарегистрироваться
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data () {
    return {
      password: '',
      phoneNumber: ''
    }
  },
  methods: {
    async login () {
      const number = Number(this.phoneNumber)
      return await this.$auth.loginWith('laravelPassport', {
        data: {
          username: number,
          password: this.password
        }
      }).then((res) => {
        console.log(res)
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>
