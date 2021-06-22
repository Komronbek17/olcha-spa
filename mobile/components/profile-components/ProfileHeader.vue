<template>
  <div class="py-6">
    <div v-if="isRegistered">
      <div class="flex items-center justify-between">
        <div>
          <h3 class="font-bold text-black text-3xl leading-8 mb-1">
            {{ userData.name }} {{ userData.lastname }}
          </h3>
          <p
            class="text-base  font-550"
            :class="userData.is_verified === 1 ? 'text-c-green-1' : 'text-c-gray-5' "
          >
            {{ userData.is_verified === 1 ? 'Верифицированный' : 'Не верифицированный' }}
          </p>
        </div>
        <div class="flex items-center justify-center rounded-full bg-c-gray-3 w-15 h-15">
          <div v-if="userData.avatar">
            <img
              :src="userData.avatar"
              :alt="userData.avatar"
            >
          </div>
          <div v-else>
            <span class="font-medium text-white text-2xl">
              <!--              {{ userData.name.charAt(0) }}{{ userData.lastname.charAt(0) }}-->
            </span>
          </div>
        </div>
      </div>
      <button class="w-full mt-6 rounded-lg bg-c-green-1 text-white text-base font-550 py-2 px-4 focus:outline-none">
        Верифицировать
      </button>
    </div>
    <div v-else>
      <div class="flex items-center justify-between">
        <div>
          <h3 class="font-bold text-black text-3xl leading-8 mb-2">
            Войдите или
            зарегестрируйтесь
          </h3>
          <p class="text-base text-c-gray-5 font-550">
            Для того чтоб делать покупки, необходимо войти в аккаунт
          </p>
        </div>
      </div>
      <router-link
        :to="{
          name: 'login'
        }"
        tag="button"
        class="mt-6 rounded-lg bg-c-red-1 text-white text-base font-550 py-2 px-4 focus:outline-none"
      >
        Войти или зарегестрироваться
      </router-link>
    </div>
  </div>
</template>

<script>
import VueTypes from 'vue-types'

export default {
  name: 'ProfileHeader',
  props: {
    userData: VueTypes.object,
    isRegistered: VueTypes.bool.def(false)
  }

}
</script>
