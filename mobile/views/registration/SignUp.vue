<template>
  <div class="font-helvetica max-w-3xl">
    <form-wizard
      color="#12bf6c"
      error-color="#a94442"
      class="mt-4"
      next-button-text="Далее"
      back-button-text="Назад"
      error-сolor="#eb1537"
      finish-button-text="Зарегистрироваться"
    >
      <tab-content
        icon="✓"
        :before-change="sendPhoneNumber"
      >
        <div class="pt-8 sm:pt-20 px-6 pb-6">
          <h2 class="text-c-gray-6 font-bold text-xl sm:text-3xl mb-8">
            Регистрация
          </h2>
          <div class="flex flex-col py-2 px-4 bg-c-gray-1 rounded-xl mb-8">
            <label
              class="text-c-gray-5 font-font-550 text-xs sm:text-sm"
            >
              Номер телефона
            </label>
            <input
              v-model="phoneNumber"
              type="tel"
              value="+998"
              class="px-2 outline-none text-c-gray-6 font-font-550 text-sm sm:text-base bg-transparent"
              required
            >
          </div>
          <!--          <button-->
          <!--            class="p-3 rounded-lg bg-c-red-1 w-full text-white font-font-550 text-sm sm:text-base"-->
          <!--            @click="sendPhoneNumber"-->
          <!--          >-->
          <!--            Далее-->
          <!--          </button>-->
        </div>
      </tab-content>
      <tab-content icon="✓" :before-change="sendCode">
        <div class="pt-8 sm:pt-20 px-4 pb-6">
          <h2 class="text-c-gray-6 font-bold text-xl sm:text-3xl mb-8">
            Проверочный код
          </h2>
          <div class="grid gap-x-2 grid-cols-5 mb-8">
            <input
              v-for="n in 5"
              :key="n"
              type="text"
              class="bg-c-gray-1 p-3 sm:p-4 w-15 text-center border-b-2 border-c-red-1 font-bold text-lg sm:text-2xl text-c-gray-6 outline-none"
              @input="saveValue"
            >
          </div>
          <div class="text-center">
            <p class="text-c-gray-4 font-font-550 text-sm text-center mt-4 mb-2">
              Проверочный код был выслан на указанный ранее номер телефона
            </p>
            <button
              class="focus:outline-none text-c-red-1 font-font-550 text-sm text-center"
              @click="reSendSMS"
            >
              Отправить код еще раз
            </button>
          </div>
        </div>
      </tab-content>
      <tab-content icon="✓" :before-change="registerUser">
        <div class="pt-8 sm:pt-20 px-6 pb-6 ">
          <h2 class="text-c-gray-6 font-bold text-xl sm:text-3xl mb-8">
            Создание аккаунта
          </h2>
          <form>
            <input
              v-model="name"
              type="text"
              placeholder="Имя"
              class="p-4 bg-c-gray-1 rounded-xl mb-4 placeholder-c-gray-6 outline-none font-font-550 text-sm sm:text-base w-full"
              required
            >
            <input
              v-model="password"
              type="password"
              placeholder="Пароль"
              class="p-4 bg-c-gray-1 rounded-xl mb-4 placeholder-c-gray-6 outline-none font-font-550 text-sm sm:text-base w-full"
            >
            <input
              v-model="password_confirmation"
              type="password"
              placeholder="Повторите пароль"
              class="p-4 bg-c-gray-1 rounded-xl mb-4 placeholder-c-gray-6 outline-none font-font-550 text-sm sm:text-base w-full"
              required
            >
            <!--            <div class="mt-2 mb-4">
                          <p class="text-c-gray-4 text-center font-font-550 text-sm">
                            Нажимая "Зарегистрироваться", я соглашаюсь с
                          </p>
                          <a
                            href="#"
                            class="block text-c-blue-1 text-center font-font-550 text-sm"
                          >публичным договором оферты</a>
                        </div>-->
          </form>
        </div>
      </tab-content>
    </form-wizard>
  </div>
</template>

<script>
import { FormWizard, TabContent } from 'vue-form-wizard'
import { mapGetters } from 'vuex'
import Auth from '~/api/Auth'
import User from '~/api/User'

export default {
  name: 'SignUp',
  components: {
    FormWizard,
    TabContent
  },
  data () {
    return {
      phoneNumber: '',
      code: '',
      name: '',
      password: '',
      password_confirmation: ''
    }
  },
  computed: {
    ...mapGetters({
      registerData: 'auth/getRegistryData'
    })
  },
  methods: {
    async sendPhoneNumber () {
      if (this.phoneNumber) {
        return await Auth.sendSMSCode(Number(this.phoneNumber)
        ).then((res) => {
          this.$store.dispatch('auth/setPhone', this.phoneNumber)
          this.$toast.success(res.data.message)
          return true
        }).catch((error) => {
          this.$toast.error(error.data.message)
          return false
        })
      }
      return false
    },
    saveValue (e) {
      this.code += e.data
    },
    async sendCode () {
      if (this.code.length === 5) {
        const phone = Number(this.registerData.phone)
        const code = Number(this.code)
        return await Auth.verifySMSCode(phone, code)
          .then((res) => {
            if (res.status === 200) {
              this.$store.dispatch('auth/setCode', code)
              this.$toast.success(res.data.message)
              return true
            }
          }).catch((error) => {
            this.$toast.error(error.data.message)
            return false
          })
      }
    },
    async reSendSMS () {
      const phone = Number(this.registerData.phone)
      return await Auth.sendSMSCode(phone)
        .then((res) => {
          this.$toast.success(res.data.message)
          return false
        }).catch((error) => {
          this.$toast.error(error.data.message)
          return false
        })
    },
    async registerUser () {
      if (this.password === this.password_confirmation) {
        return await User.register({
          phone: this.registerData.phone,
          code: this.registerData.code,
          name: this.name,
          password_confirmation: this.password_confirmation,
          password: this.password
        }).then((res) => {
          if (res.status === 200 || res.status === 201) {
            this.$store.dispatch('auth/addUserData', res.data.data.user)
            this.$toast.success(res.data.message)
            this.$router.push({
              name: 'home'
            })
          }
        }).catch((error) => {
          this.$toast.error(error.data.message)
          return false
        })
      }
    }
  }
}
</script>
