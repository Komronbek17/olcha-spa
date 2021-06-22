<template>
  <bottom-sheet
    :show="open"
    title="Изменение пароля"
    @close="close"
  >
    <ul class="grid grid-cols-1 gap-y-2">
      <li>
        <o-input v-model="currentPassword" type="password" holder="Введите текущий пароль" />
      </li>
      <li>
        <o-input v-model="password" type="password" holder="Введите новый пароль" />
      </li>
      <li>
        <o-input v-model="passwordConfirmation" type="password" holder="Повторно введите новый пароль" />
      </li>
    </ul>
    <button
      class="py-3 px-4 mt-6 rounded-xl bg-c-green-1 text-base font-550 leading-5 text-white w-full"
      @click="returnValue"
    >
      Сохранить
    </button>
  </bottom-sheet>
</template>

<script>
import VueTypes from 'vue-types'
import OInput from '~/mobile/components/partials/OInput'
import BottomSheet from '~/mobile/reusable/BottomSheet'

export default {
  name: 'ChangePassword',
  components: {
    BottomSheet,
    OInput
  },
  props: {
    open: VueTypes.bool.def(false)
  },
  data () {
    return {
      currentPassword: '',
      password: '',
      passwordConfirmation: ''
    }
  },
  methods: {
    close (event) {
      this.$emit('close', event)
    },
    returnValue () {
      if (this.currentPassword && this.passwordConfirmation === this.password && this.password && this.passwordConfirmation) {
        const data = {
          current_password: this.currentPassword,
          password: this.password,
          password_confirmation: this.passwordConfirmation
        }
        this.$emit('input', data)
        this.close(false)
      } else {
        this.$toast.error('Пожалуйста, заполните все поля.')
      }
    }
  }
}
</script>

<style scoped>

</style>
