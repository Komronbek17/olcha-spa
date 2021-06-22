<template>
  <div class="font-helvetica max-w-3xl">
    <form-wizard
      color="#12bf6c"
      error-color="#a94442"
      class="mt-4"
      finish-button-text="Обновить пароль"
    >
      <tab-content
        icon="✓"
        :before-change="sendPhoneNumber"
      >
        <div class="pt-8 sm:pt-20 px-6 pb-6">
          <h2 class="text-c-gray-6 font-bold text-xl sm:text-3xl mb-8">
            Восстановление пароля
          </h2>
          <div class="flex flex-col py-2 px-4 bg-c-gray-1 rounded-xl mb-8">
            <label
              class="text-c-gray-5 font-font-550 text-xs sm:text-sm"
            >Номер телефона</label>
            <input
              v-model="phoneNumber"
              type="tel"
              class="px-2 outline-none text-c-gray-6 font-font-550 text-sm sm:text-base bg-transparent"
              required
            >
          </div>
        </div>
      </tab-content>
      <tab-content icon="✓" :before-change="sendCode">
        <div class="pt-8 sm:pt-20 px-6 pb-6">
          <h2 class="text-c-gray-6 font-bold text-xl sm:text-3xl mb-8">
            Проверочный код
          </h2>
          <div ref="inputsWrapper" class="grid gap-x-2 grid-cols-5 mb-8">
            <input
              v-for="n in 5"
              :key="n"
              :ref="'input' + n"
              type="text"
              class="bg-c-gray-1 p-3 sm:p-4 w-15 text-center border-b-2 border-c-red-1 font-bold text-lg sm:text-2xl text-c-gray-6 outline-none"
              :tabIndex="n"
              @input="saveValue"
              @keydown.delete="clear"
            >
          </div>
          <div class="text-center">
            <p class="text-c-gray-4 font-font-550 text-sm text-center mt-4 mb-2">
              Проверочный код был выслан на указанный ранее номер телефона
            </p>
            <button
              class="focus:outline-none text-c-red-1 font-font-550 text-sm text-center"
              @click="sendPhoneNumber"
            >
              Отправить код еще раз
            </button>
          </div>
        </div>
      </tab-content>
      <tab-content icon="✓" :before-change="resetPassword">
        <div class="pt-8 sm:pt-20 px-6 pb-6">
          <h2 class="text-c-gray-6 font-bold text-xl sm:text-3xl mb-8">
            Введите новый пароль
          </h2>
          <div class="flex flex-col py-2 px-4 bg-c-gray-1 rounded-xl">
            <label
              class="text-c-gray-5 font-font-550 text-xs sm:text-sm"
            >Новый пароль</label>
            <input
              v-model="password"
              type="tel"
              class="px-2 outline-none placeholder-c-gray-6 font-font-550 text-sm sm:text-base bg-transparent"
              required
            >
          </div>
        </div>
      </tab-content>
    </form-wizard>
  </div>
</template>

<script>
import { FormWizard, TabContent } from 'vue-form-wizard'
import { mapGetters } from 'vuex'
import Auth from '~/api/Auth'

export default {
  name: 'RecoverPassword',
  components: {
    FormWizard,
    TabContent
  },
  data () {
    return {
      phoneNumber: '',
      password: '',
      passwordConfirm: ''
    }
  },
  computed: {
    ...mapGetters({
      registerData: 'auth/getRegistryData'
    })
  },
  methods: {
    async sendPhoneNumber () {
      return await Auth.passwordRecover(this.phoneNumber)
        .then((res) => {
          if (res.status === 200) {
            this.$store.dispatch('auth/setPhone', this.phoneNumber)
            this.$toast.success(res.data.message)
            return true
          }
        }).catch((error) => {
          this.$toast.error(error.data.message)
          return false
        })
    },
    saveValue (e) {
      this.code += e.data
    },
    async sendCode () {
      if (this.code.length === 5) {
        const phone = Number(this.registerData.phone)
        const code = Number(this.code)
        return await Auth.verifyPassRecoverCode(phone, code)
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
    async resetPassword () {
      const { registerData } = this
      if (this.password === this.passwordConfirm) {
        const data = {
          phone: registerData.phone,
          code: registerData.code,
          password: this.password,
          password_confirmation: this.passwordConfirm
        }
        return await Auth.resetPassword(data)
          .then((res) => {
            if (res.status === 200) {
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
