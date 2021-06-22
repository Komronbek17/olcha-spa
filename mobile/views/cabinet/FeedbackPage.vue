<template>
  <div class="container mx-auto py-4 h-full overflow-y-scroll">
    <div v-if="!submited">
      <div class="grid grid-cols-1 gap-y-4">
        <o-input
          v-model="name"
          v-validate="'required'"
          holder="Имя"
          name="name"
          :has-error="errors.first('name')"
          :with-icon="false"
        >
          <span slot="error" class="text-sm text-c-red-1">{{ errors.first('name') }}</span>
        </o-input>
        <o-input
          v-model="phone"
          v-validate="'numeric|min:12|required'"
          name="phone"
          :has-error="errors.first('phone')"
          holder="Номер телефона"
          :with-icon="false"
        >
          <span slot="error" class="text-sm text-c-red-1">{{ errors.first('phone') }}</span>
        </o-input>
        <span v-show="errors.first('text')" class="text-sm text-c-red-1">{{ errors.first('text') }}</span>
        <textarea
          v-model="text"
          v-validate="'required'"
          :class="errors.first('text') ? 'text-c-red-1' : ''"
          name="text"
          placeholder="Введите комментарий"
          class="rounded-xl bg-c-gray-1 w-full p-4 h-44 resize-none focus:outline-none"
        />
        <button
          class="w-full py-2 px-4 rounded-lg bg-c-red-1 text-white font-medium text-base leading-5"
          @click="feedBack"
        >
          Запросить звонок
        </button>
      </div>
      <!--      <change-feedback-time :open="changeTime" @close="changeTime = $event" />-->
    </div>
    <div v-else class="flex flex-col items-center container mt-10">
      <p class="font-bold text-xl leading-6 text-black mb-6">
        Заказ обратной связи
      </p>
      <img
        src="~/assets/icons/feedback-phone-card.svg"
        alt=""
      >
      <p class="font-550 text-sm leading-6 text-c-gray-5  ">
        Ваш запрос на звонок принят
        Ждите ответа оператора
      </p>
      <nuxt-link
        :to="{ name: 'home' }"
        tag="button"
        class="w-full rounded-lg bg-c-red-1 leading-4 text-base font-bold text-white mt-10 py-3 mb-4"
      >
        На главную
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import OInput from '~/mobile/components/partials/OInput'
// import ChangeFeedbackTime from '~/mobile/components/profile-components/ChangeFeedbackTime'
import User from '~/api/User'

export default {
  name: 'FeedbackPage',
  components: {
    // ChangeFeedbackTime,
    OInput
  },
  data () {
    return {
      selected: '',
      changeTime: false,
      name: '',
      phone: '',
      text: '',
      submited: false
    }
  },
  methods: {
    feedBack () {
      this.$validator.validate()
        .then(async (valid) => {
          if (valid) {
            const {
              name,
              phone,
              text
            } = this
            return await User.feedback({
              name,
              phone,
              text
            }).then((res) => {
              this.submited = true
              return this.$toast.success(res.data.message)
            }).catch((err) => {
              this.$toast.error(err.data.message)
            })
          }
        })
    }
  }

}
</script>

<style scoped>

</style>
