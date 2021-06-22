<template>
  <div class="container py-2 mx-auto bg-c-gray-1">
    <div class="mb-6">
      <p class="text-c-gray-5 text-base font-550">
        Персональные данные
      </p>
      <ul class="p-2 bg-white rounded-2xl divide-y mt-3">
        <li class="">
          <button
            class="py-4 px-2 border-0 focus:outline-none flex justify-between items-center w-full"
            @click="changePersonalData(true, 'Введите имя', 'Имя', 'name' )"
          >
            <span class="text-c-gray-5 text-base font-550 leading-5">Имя</span>
            <span class="text-c-gray-6 text-base font-550 leading-5">
              {{ user.name || 'Не указано' }}
            </span>
          </button>
        </li>
        <li class="">
          <button
            class=" py-4 px-2 border-0 focus:outline-none flex justify-between items-center w-full"
            @click="changePersonalData(true, 'Введите фамилию', 'Фамилия', 'lastname' )"
          >
            <span class="text-c-gray-5 text-base font-550 leading-5">Фамилия</span>
            <span class="text-c-gray-6 text-base font-550 leading-5">
              {{ user.lastname || 'Не указано' }}
            </span>
          </button>
        </li>
        <li class="">
          <button
            class="py-4 px-2 border-0 focus:outline-none flex justify-between items-center w-full"
          >
            <span class="text-c-gray-5 text-base font-550 leading-5">Номер телефона</span>
            <span class="text-c-gray-6 text-base font-550 leading-5">
              {{ '+' + user.phone || 'Не указано' }}
            </span>
          </button>
        </li>
      </ul>
    </div>
    <div class="mb-6">
      <p class="text-c-gray-5 text-base font-550">
        Дополнительно
      </p>
      <ul class="p-2 bg-white rounded-2xl divide-y mt-3">
        <li class="">
          <button
            class="py-4 px-2 border-0 focus:outline-none flex justify-between items-center w-full"
            @click="changePersonalData(true, 'Введите день рождения', 'День рождения', 'birthdate', inputType = 'date' )"
          >
            <span class="text-c-gray-5 text-base font-550 leading-5">День рождения</span>
            <span class="text-c-gray-6 text-base font-550 leading-5">
              {{ user.birthdate || 'Не указано' }}
            </span>
          </button>
        </li>
        <li class="">
          <button class="py-4 px-2 border-0 focus:outline-none flex justify-between items-center w-full">
            <span class="text-c-gray-5 text-base font-550 leading-5">Пол</span>
            <div class="relative inline-block text-left">
              <div>
                <button
                  class="inline-flex justify-center items-center text-sm font-medium text-c-black-2 hover:bg-gray-50 focus:outline-none "
                  @click="menuOpened = !menuOpened"
                  @focusout="menuOpened = false"
                >
                  {{ user.gender === 1 ? 'Мужской' : 'Женский' }}
                </button>
              </div>

              <transition
                enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <ul
                  v-if="menuOpened"
                  class="shadow-c-sm rounded-lg p-2 absolute top-0 bg-white z-50"
                >
                  <li
                    class="text-sm font-medium text-c-black-2 leading-4 py-3 cursor-pointer"
                    @click="saveGender(1)"
                  >
                    Мужской
                  </li>
                  <li
                    class="text-sm font-medium text-c-black-2 leading-4 py-3 cursor-pointer"
                    @click="saveGender(0)"
                  >
                    Женский
                  </li>
                </ul>
              </transition>
            </div>
          </button>
        </li>
      </ul>
    </div>
    <div class="">
      <p class="text-c-gray-5 text-base font-550">
        Безопасность
      </p>
      <button
        class="border-0 focus:outline-none mt-3 py-2 px-4 bg-c-gray-2 font-550 text-sm text-c-gray-6 leading-5 rounded w-full"
        @click="changePassword = !changePassword"
      >
        Изменить пароль
      </button>
    </div>
    <change-personal-data
      :open="showBottomSheet"
      :title="inputTitle"
      :input-type="inputType"
      :place-holder="placeHolder"
      @close="showBottomSheet = $event"
      @input="saveData"
    />
    <change-password
      :open="changePassword"
      @close="changePassword = $event"
      @input="resetPassword"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ChangePassword from '~/mobile/components/profile-components/ChangePassword'
import ChangePersonalData from '~/mobile/components/profile-components/ChangePersonalData'
import User from '~/api/User'

export default {
  name: 'ProfilePage',
  components: {
    ChangePersonalData,
    ChangePassword
    // ChangePassword,
  },

  data () {
    return {
      showBottomSheet: false,
      inputTitle: '',
      placeHolder: '',
      inputType: 'text',
      changePassword: false,
      personalData: '',
      menuOpened: false
    }
  },
  computed: {
    ...mapGetters({
      is_registered: 'auth/isRegistered',
      user: 'auth/getUserData'
    })
  },
  methods: {
    changePersonalData (show, title, placeHolder, data, inputType = '') {
      this.showBottomSheet = show
      this.inputTitle = title
      this.inputType = inputType || this.inputType
      this.placeHolder = placeHolder
      this.personalData = data
    },
    async saveData (e) {
      const key = this.personalData
      const data = {}
      data[key] = e
      if (key !== 'name') {
        data.name = this.user.name
      }
      return await User.updateProfileData(data)
        .then((res) => {
          this.$store.dispatch('auth/addUserData', res.data.data.user)
          this.$toast.success('Данные обновлены')
        })
        .catch((error) => {
          this.$toast(error.data.message)
        })
    },
    saveGender (e) {
      if (e !== this.user.gender) {
        this.personalData = 'gender'
        this.saveData(e)
      }
    },
    async resetPassword (e) {
      return await User.updateProfilePassword(e)
        .then(() => {
          this.$toast.success('Данные обновлены')
        })
        .catch((error) => {
          this.$toast.error(error.data.message)
        })
    }
  }
}
</script>

<style scoped>

</style>
