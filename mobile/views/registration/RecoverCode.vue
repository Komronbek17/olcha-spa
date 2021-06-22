<template>
  <div class="font-helvetica max-w-3xl">
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
      <button
        class="p-3 rounded-lg bg-c-red-1 w-full text-white font-font-550 text-sm sm:text-base"
        @click="submit"
      >
        Далее
      </button>
      <p class="text-c-gray-4 font-font-550 text-sm text-center mt-4 mb-2">
        Проверочный код был выслан на указанный ранее номер телефона
      </p>
      <button
        class="block text-c-red-1 font-font-550 text-sm text-center"
        @click="reSendSMS"
      >
        Отправить код еще раз
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'RecoverCode',
  data () {
    return {
      code: ''
    }
  },
  computed: {
    ...mapGetters({
      registerData: 'auth/getRegistryData'
    })
  },
  methods: {

  }
}
</script>
