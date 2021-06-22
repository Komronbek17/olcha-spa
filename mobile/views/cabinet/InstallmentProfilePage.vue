<template>
  <div class="container mx-auto h-full">
    <form-wizard
      color="#12bf6c"
      error-color="#eb1537"
      finish-button-text="Pay"
      :next-button-text="nextButtonText1"
      :back-button-text="backButtonText1"
      class="overflow-y-scroll h-full"
      :start-index="step"
      @on-change="validateTabs"
    >
      <tab-content
        icon="ti-check"
        :before-change="firstStep"
      >
        <form class="relative" data-vv-scope="scope-first" @submit.prevent="disableForm">
          <!-- Город доставки -->
          <div class="relative">
            <p>Семейное положение</p>
            <select
              v-model="personalData.family_status"
              class="appearance-none mt-2 bg-c-gray-1 flex items-center justify-between px-4 py-3 rounded-xl w-full outline-none"
            >
              <option
                class="font-550 flex items-center justify-between text-base bg-transparent outline-none"
                value=""
              >
                <span>Семейное положение</span>
              </option>

              <option
                v-for="status in statuses"
                :key="status.value"
                class="py-1 select-option-class font-550 flex items-center justify-between text-base bg-transparent outline-none"
                :value="status.value"
              >
                <span>{{ status.label }}</span>
              </option>
            </select>
          </div>
          <div>
            <div class="relative">
              <p>Место работы</p>
              <input
                v-model="personalData.work_company_name"
                v-validate="'required'"
                autocomplete="off"
                name="workCompanyName"
                type="text"
                :class="errors.has('scope-first.workCompanyName') ? 'border border-c-red-1': '' "
                class="bg-c-gray-1 px-4 py-3 pr-10 rounded-xl placeholder-c-gray-6 font-font-550 text-base w-full outline-none mt-2"
              >
              <span
                v-show="errors.has('scope-first.workCompanyName')"
                class="text-xs text-c-red-1"
              >{{ errors.first('scope-first.workCompanyName') }}</span>
            </div>
            <div class="relative">
              <p>Должность </p>
              <input
                v-model="personalData.industry"
                v-validate="'required|alpha_dash'"
                autocomplete="off"
                name="industry"
                type="text"
                :class="errors.has('scope-first.industry') ? 'border border-c-red-1': '' "
                class="bg-c-gray-1 px-4 py-3 pr-10 rounded-xl placeholder-c-gray-6 font-font-550 text-base w-full outline-none mt-2"
              >
              <span
                v-show="errors.has('scope-first.industry')"
                class="text-xs text-c-red-1"
              >{{ errors.first('scope-first.industry') }}</span>
            </div>
            <div class="relative">
              <p>Стаж</p>
              <input
                v-model="personalData.seniority"
                v-validate="'required'"
                autocomplete="off"
                type="text"
                name="seniority"
                :class="errors.has('scope-first.seniority') ? 'border border-c-red-1': '' "
                class="bg-c-gray-1 p-4 pr-8  rounded-xl placeholder-c-gray-6 font-font-550 text-base w-full outline-none mt-2"
              >
              <span
                v-show="errors.has('scope-first.seniority')"
                class="text-xs text-c-red-1"
              >{{ errors.first('scope-first.seniority') }}</span>
            </div>
            <div class="relative">
              <p>Зарплата</p>
              <input
                v-model="personalData.work_month_price"
                v-validate="'required|numeric|min:1'"
                autocomplete="off"
                type="text"
                name="workMonthPrice"
                :class="errors.has('scope-first.workMonthPrice') ? 'border border-c-red-1': '' "
                class="bg-c-gray-1 p-4 pr-8  rounded-xl placeholder-c-gray-6 font-font-550 text-base w-full outline-none mt-2"
              >
              <span
                v-show="errors.has('scope-first.workMonthPrice')"
                class="text-xs text-c-red-1"
              >{{ errors.first('scope-first.workMonthPrice') }}</span>
            </div>
          </div>
        </form>
      </tab-content>
      <tab-content
        icon="ti-check"
        :before-change="secondStep"
      >
        <div>
          <h4 class="font-bold text-xl leading-6 text-c-gray-6">
            Загрузите фото пасспорта
          </h4>
          <p class="text-base leading-5 text-c-gray-5">
            Информация из паспорта и фото, должны быть читабельны
          </p>
        </div>
        <div
          class="w-full py-8 bg-c-gray-1 rounded-lg flex justify-center items-center my-6"
        >
          <img
            :src="uploadedFiles.passport"
            alt=""
          >
        </div>
        <div class="grid grid-cols-1 gap-y-4">
          <!--              <button-->
          <!--                class="px-4 py-3 bg-c-blue-3 text-white text-base font-bold rounded-lg"-->
          <!--              >-->
          <!--                Сделать снимок-->
          <!--              </button>-->
          <label
            class="px-4 py-3 bg-c-gray-1 text-c-gray-6 text-base text-center font-bold rounded-lg"
          >
            <input
              autocomplete="off"
              type="file"
              accept="image/*"
              class="hidden"
              @input="changeFile($event, 'passport')"
            >
            Загрузить с телефона
          </label>
        </div>
      </tab-content>
      <tab-content
        icon="ti-check"
        :before-change="thirdStep"
      >
        <div>
          <h4 class="font-bold text-xl leading-6 text-c-gray-6">
            Загрузите фото прописки с паспорта
          </h4>
          <p class="text-base leading-5 text-c-gray-5">
            Информация из паспорта и фото, должны быть читабельны
          </p>
        </div>
        <div
          class="w-full py-8 bg-c-gray-1 rounded-lg flex justify-center items-center my-6"
        >
          <img :src="uploadedFiles.registration || require('~/assets/images/passport-vector.png')" alt="">
        </div>
        <div class="grid grid-cols-1 gap-y-4">
          <!--              <button-->
          <!--                class="px-4 py-3 bg-c-blue-3 text-white text-base font-bold rounded-lg"-->
          <!--              >-->
          <!--                Сделать снимок-->
          <!--              </button>-->
          <label
            class="px-4 py-3 bg-c-gray-1 text-c-gray-6 text-base text-center font-bold rounded-lg"
          >
            <input
              autocomplete="off"
              type="file"
              accept="image/*"
              class="hidden"
              @input="changeFile($event, 'registration')"
            >
            Загрузить с телефона
          </label>
        </div>
      </tab-content>
      <tab-content
        icon="ti-check"
        :before-change="fourthStep"
      >
        <div>
          <h4 class="font-bold text-xl leading-6 text-c-gray-6">
            Загрузите фото лица на фоне паспорта
          </h4>
          <p class="text-base leading-5 text-c-gray-5">
            Информация из паспорта и фото, должны быть читабельны
          </p>
        </div>
        <div
          class="w-full py-8 bg-c-gray-1 rounded-lg flex justify-center items-center my-6"
        >
          <img :src="uploadedFiles.passport_in_user || require('~/assets/images/passport-vector.png')" alt="">
        </div>
        <div class="grid grid-cols-1 gap-y-4">
          <!--              <button-->
          <!--                class="px-4 py-3 bg-c-blue-3 text-white text-base font-bold rounded-lg"-->
          <!--              >-->
          <!--                Сделать снимок-->
          <!--              </button>-->
          <label
            class="px-4 py-3 bg-c-gray-1 text-c-gray-6 text-base text-center font-bold rounded-lg"
          >
            <input
              autocomplete="off"
              type="file"
              accept="image/*"
              class="hidden"
              @input="changeFile($event, 'passport_in_user')"
            >
            Загрузить с телефона
          </label>
        </div>
      </tab-content>
      <tab-content
        icon="ti-check"
        :before-change="fifthStep"
      >
        <div>
          <p class="font-bold text-xl leading-6 text-c-gray-6">
            Введите два дополнительные номера телефонов своих родственников или близких
          </p>
          <form data-vv-scope="scope-fifth">
            <ul>
              <li>
                <p>Мобильный номер</p>
                <input
                  v-model="phones.phoneNumberFirst"
                  v-validate="'required|numeric|min:12|max:12'"
                  autocomplete="off"
                  name="phoneNumberFirst"
                  type="text"
                  :class="errors.has('scope-fifth.phoneNumberFirst') ? 'border border-c-red-1': '' "
                  class="bg-c-gray-1 p-4 pr-8  rounded-xl placeholder-c-gray-6 font-font-550 text-base w-full outline-none mt-2"
                >
                <span
                  v-show="errors.has('scope-fifth.phoneNumberFirst')"
                  class="text-xs text-c-red-1"
                >{{ errors.first('scope-fifth.phoneNumberFirst') }}</span>
              </li>
              <li>
                <p>Мобильный номер</p>
                <input
                  v-model="phones.phoneNumberSecond"
                  v-validate="'required|numeric|min:12|max:12'"
                  autocomplete="off"
                  name="phoneNumberSecond"
                  type="text"
                  :class="errors.has('scope-fifth.phoneNumberSecond') ? 'border border-c-red-1': '' "
                  class="bg-c-gray-1 p-4 pr-8  rounded-xl placeholder-c-gray-6 font-font-550 text-base w-full outline-none mt-2"
                >
                <span
                  v-show="errors.has('scope-fifth.phoneNumberSecond')"
                  class="text-xs text-c-red-1"
                >{{ errors.first('scope-fifth.phoneNumberSecond') }}</span>
              </li>
            </ul>
          </form>
        </div>
      </tab-content>
      <tab-content
        icon="ti-check"
      >
        <div>
          <p class="font-bold text-xl leading-6 text-c-gray-6">
            Данные о карте
          </p>
          <form data-vv-scope="scope-fifth" @submit.prevent="disableForm">
            <div class="py-2 px-4 bg-blue-100 my-4 rounded-lg">
              <p class="text-c-gray-6 text-sm font-bold">
                Ваши данные находятся под нашей защитой, и не будут передаваться третьим лицам. Деньги не будут
                сниматься до определенного периода и т.д.
                Прикрепляя карту, я соглашаюсь с
                <a
                  target="_blank"
                  href="https://olcha.uz/offer/installment_offer.pdf"
                  class="text-c-red-1"
                >
                  публичным договором оферты
                </a>
              </p>
            </div>
            <ul v-if="!isValidated">
              <li>
                <p>Номер и срок действии пластиковой карты</p>
                <input
                  v-model="card.pan"
                  v-validate="'required|min:16'"
                  v-mask="'#### #### #### ####'"
                  placeholder="1234 5678 9012 3456"
                  name="card_number"
                  autocomplete="off"
                  type="text"
                  :class="errors.has('scope-fifth.card_number') ? 'border border-c-red-1': '' "
                  class="bg-c-gray-1 py-2 px-4 tracking-wide rounded-xl placeholder-c-gray-5 font-font-550 text-base w-full outline-none mt-2"
                >
                <span
                  v-show="errors.has('scope-fifth.card_number')"
                  class="text-xs text-c-red-1"
                >{{ errors.first('scope-fifth.card_number') }}</span>
              </li>
              <li>
                <input
                  v-model="card.expiry"
                  v-validate="'required|min:4'"
                  v-mask="'##/##'"
                  name="card_expiry"
                  autocomplete="off"
                  placeholder="02/03"
                  type="text"
                  :class="errors.has('scope-fifth.card_expiry') ? 'border border-c-red-1': '' "
                  class="bg-c-gray-1 py-2 px-4 w-20 rounded-xl placeholder-c-gray-5 font-font-550 text-base outline-none mt-2"
                >
                <span
                  v-show="errors.has('scope-fifth.card_expiry')"
                  class="text-xs text-c-red-1"
                >{{ errors.first('scope-fifth.card_expiry') }}</span>
              </li>
              <li v-if="!verifyCode">
                <p>Напишите номер телефона прикреплённый к этой карте</p>
                <input
                  v-model="card.phone"
                  v-validate="'required|min:12'"
                  v-mask="'### ## ###-##-##'"
                  placeholder="99890*******"
                  name="card_phone"
                  autocomplete="off"
                  type="text"
                  class="bg-c-gray-1 py-2 px-4 rounded-xl placeholder-c-gray-5 font-font-550 text-base w-full outline-none mt-2"
                >
                <span
                  v-show="errors.has('scope-fifth.card_phone')"
                  class="text-xs text-c-red-1"
                >{{ errors.first('scope-fifth.card_phone') }}</span>
                <button
                  class="py-2 px-4 w-full mt-4 rounded-lg bg-blue-600 text-white font-bold text-lg"
                  @click="sendVerifyCode"
                >
                  Получить проверочный код
                </button>
              </li>
              <li v-else>
                <p>Код</p>
                <div class="grid grid-cols-5 gap-x-2">
                  <input
                    v-model="card.code"
                    v-validate="'required|numeric'"
                    v-mask="'######'"
                    placeholder="* * * * * *"
                    name="code"
                    type="text"
                    autocomplete="off"
                    class="col-span-2 bg-c-gray-1 py-2 px-4 rounded-xl placeholder-c-gray-5 font-font-550 text-base outline-none mt-2"
                    @input="submit"
                  >
                  <button
                    class="col-span-1 rounded-lg font-bold text-lg focus:outline-none flex items-center justify-center"
                    @click="sendVerifyCode"
                  >
                    <img src="~/assets/icons/refresh.svg" alt="">
                  </button>
                </div>
              </li>
            </ul>
            <ul v-else>
              <li class="grid grid-rows-2 grid-flow-col gap-y-2">
                <div class="flex items-center font-medium text-md text-c-gray-6 row-span-1">
                  <img :src="image" :alt="image" class="w-14 h-8 mr-2">
                  <div>
                    <span>
                      {{ cardNumber }}
                    </span>
                  </div>
                </div>
                <p class="row-span-1 font-bold text-base text-c-gray-6">
                  {{ card.full_name }}
                </p>
                <button
                  class="focus:outline-none border-0 row-span-1 flex items-center justify-center h-"
                  @click="deleteCard"
                >
                  <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M11 0C4.93436 0 0 4.93436 0 11C0 17.0656 4.93436 22 11 22C17.0656 22 22 17.0656 22 11C22 4.93436 17.0656 0 11 0Z"
                      fill="#eb1537"
                    />
                    <path
                      d="M15.0508 13.7548C15.4092 14.1133 15.4092 14.6925 15.0508 15.0511C14.8721 15.2298 14.6374 15.3196 14.4026 15.3196C14.1679 15.3196 13.9333 15.2298 13.7545 15.0511L11 12.2964L8.24546 15.0511C8.06671 15.2298 7.83206 15.3196 7.59741 15.3196C7.36259 15.3196 7.12794 15.2298 6.94918 15.0511C6.59083 14.6925 6.59083 14.1133 6.94918 13.7548L9.70388 11.0002L6.94918 8.24571C6.59083 7.88719 6.59083 7.30795 6.94918 6.94943C7.3077 6.59108 7.88694 6.59108 8.24546 6.94943L11 9.70413L13.7545 6.94943C14.113 6.59108 14.6923 6.59108 15.0508 6.94943C15.4092 7.30795 15.4092 7.88719 15.0508 8.24571L12.2961 11.0002L15.0508 13.7548Z"
                      fill="#ffffff"
                    />
                  </svg>
                </button>
              </li>
            </ul>
          </form>
        </div>
      </tab-content>
    </form-wizard>
    <!--    <camera-frame :show="showCameraFrame" @on:close="showCameraFrame = $event" />-->
  </div>
</template>

<script>
import { FormWizard, TabContent } from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import { isEmpty } from 'lodash'
import Installment from '~/api/Installment'
// import CameraFrame from '~/mobile/reusable/CameraFrame'

export default {
  name: 'InstallmentProfilePage',
  components: {
    // CameraFrame,
    FormWizard,
    TabContent
  },
  async asyncData () {
    return await Installment.getCurrentStep()
      .then(async (res) => {
        if (res.data.message === 'Is validated') {
          return {
            step: 5,
            isValidated: true,
            card: await Installment.getStep('five')
              .then((res) => {
                return res.data.data
              }).catch(() => {
                return []
              })
          }
        }
      }).catch((err) => {
        if (err.response.status === 422) {
          return {
            step: err.response.data.data.step
          }
        }
        return {
          step: 0
        }
      })
  },
  data () {
    return {
      isValidated: false,
      statuses: [
        {
          value: 0,
          label: ' Женат/Замужем'
        },
        {
          value: 1,
          label: 'Не женат/Не замужем'
        },
        {
          value: 2,
          label: 'Разведен/Разведена'
        },
        {
          value: 3,
          label: 'Вдовец / Вдова'
        }
      ],
      card: {
        expiry: '',
        pan: '',
        code: '',
        phone: ''
      },
      nextButtonText1: this.$t('id1510'),
      backButtonText1: this.$t('id1511b'),
      nextButtonText2: this.$t('id51'),
      backButtonText2: this.$t('id1511b'),
      personalData: {
        family_status: 1,
        seniority: '',
        work_company_name: '',
        work_month_price: '',
        industry: ''
      },
      phones: {
        phoneNumberFirst: '',
        phoneNumberSecond: ''
      },
      isCaptured: false,
      showCameraFrame: false,
      files: {
        passport: null,
        passport_in_user: null,
        registration: null
      },
      verifyCode: false,
      uploadedFiles: {
        passport: require('~/assets/images/passport-vector.png'),
        passport_in_user: require('~/assets/images/passport-vector.png'),
        registration: require('~/assets/images/passport-vector.png')
      },
      hideButtons: false,
      cardImage: {
        8600: require('~/assets/images/uzcard.png'),
        9860: require('~/assets/images/humo.png')
      }
    }
  },
  computed: {
    image () {
      if (this.card.verify) {
        const start = this.card.card_number.slice(0, 4)
        return this.cardImage[start]
      }
      return ''
    },
    cardNumber () {
      if (this.card.verify) {
        const start = this.card.card_number.slice(0, 6)
        const end = this.card.card_number.slice(-4)
        return start.concat('******', end)
      }
      return ''
    }
  },
  methods: {
    async getStep (step) {
      return await Installment.getStep(step)
        .then((res) => {
          return res.data.data
        })
    },
    changeFile (e, property) {
      const file = e.target.files[0]
      this.files[property] = file
      this.uploadedFiles[property] = this.createURL(file)
    },
    firstStep () {
      return this.validateStep('scope-first')
        .then(async (valid) => {
          if (valid) {
            return await Installment.installmentStepFirst(this.personalData)
              .then((res) => {
                this.$toast.success(res.data.message)
                this.hideButtons = true
                return true
              })
              .catch(() => {
                return false
              })
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    async secondStep () {
      if (this.files.passport !== null) {
        if (typeof this.files.passport !== 'string') {
          const data = this.getFormData('passport', this.files.passport)
          return await Installment.installmentStepSecond(data)
            .then((res) => {
              this.$toast.success(res.data.message)
              return true
            })
            .catch((err) => {
              this.$toast.error(err.response.data.message.file[0])
              return false
            })
        } else {
          return true
        }
      }
    },
    async thirdStep () {
      if (this.files.registration !== null) {
        if (typeof this.files.registration !== 'string') {
          const data = this.getFormData('registration', this.files.registration)
          return await Installment.installmentStepSecond(data)
            .then((res) => {
              this.$toast.success(res.data.message)
              return true
            })
            .catch((err) => {
              this.$toast.error(err.response.data.message.file[0])
              return false
            })
        } else {
          return true
        }
      }
      return true
    },
    async fourthStep () {
      if (this.files.passport_in_user !== null) {
        if (typeof this.files.passport_in_user !== 'string') {
          const data = this.getFormData('passport_in_user', this.files.passport_in_user)
          return await Installment.installmentStepSecond(data)
            .then((res) => {
              this.$toast.success(res.data.message)
              return true
            })
            .catch((err) => {
              this.$toast.error(err.response.data.message.file[0])
              return false
            })
        } else {
          return true
        }
      }
    },
    async fifthStep () {
      const {
        phoneNumberFirst,
        phoneNumberSecond
      } = this.phones
      const phones = [
        {
          phone: phoneNumberFirst
        },
        {
          phone: phoneNumberSecond
        }
      ]
      if (phoneNumberFirst === phoneNumberSecond) {
        this.$toast.error('Все номера должны быт уникальними')
        return false
      }
      return await Installment.installmentStepFour(phones)
        .then((res) => {
          this.$toast.success(res.data.message)
          return true
        }).catch(() => {
          this.$toast.error('Все номера должны быт уникальними')
          return false
        })
    },
    async sendVerifyCode () {
      const pan = this.card.pan.toLocaleString().replace(/ /g, '')
      const expiry = Number(this.card.expiry.slice(this.card.expiry.indexOf('/') + 1) + this.card.expiry.slice(0, this.card.expiry.indexOf('/')))
      const phone = Number(this.card.phone.toLocaleString().replace(/-|\(|\)| /g, ''))
      if (pan && expiry && phone) {
        const formData = new FormData()
        formData.append('expiry', expiry)
        formData.append('pan', pan)
        formData.append('phone', phone)
        return await Installment.sendVerifyCode(formData)
          .then((res) => {
            if (res.data.errors && res.data.errors === -1) {
              return this.$toast.info('Эта карта уже привязана')
            } else if (res.data.errors === 0) {
              this.verifyCode = true
              return
            }
            return this.$toast.error(res.data.text)
          }).catch((err) => {
            console.log(err)
          })
      }
      return this.$toast.warning('Введите номер карты\n' +
        'Введите дату окончание карты')
    },
    async submit () {
      if (this.card.code.length === 6) {
        const pan = this.card.pan.toLocaleString().replace(/ /g, '')
        const expiry = Number(this.card.expiry.slice(this.card.expiry.indexOf('/') + 1) + this.card.expiry.slice(0, this.card.expiry.indexOf('/')))
        const phone = Number(this.card.phone.toLocaleString().replace(/-|\(|\)| /g, ''))
        const code = this.card.code
        const formData = new FormData()
        formData.append('expiry', expiry)
        formData.append('pan', pan)
        formData.append('phone', phone)
        formData.append('code', code)
        return await Installment.verifyCode(formData)
          .then((res) => {
            if (res.data.errors && res.data.errors === -1) {
              return this.$toast.info('Эта карта уже привязана')
            } else if (res.data.errors === 0) {
              return this.$router.push(res.data.redirect_url)
            }
            return this.$toast.error(res.data.text)
          }).catch((err) => {
            return err
          })
      }
    },
    async deleteCard () {
      await Installment.deleteCard()
        .then(() => {
          this.card = {
            expiry: '',
            pan: '',
            code: '',
            phone: ''
          }
          this.isValidated = false
        }).catch((err) => {
          return err
        })
    },
    validateTabs (e, f) {
      if (f === 0) {
        return this.getFirstStep()
      } else if (f === 1) {
        return this.getSecondStep()
      } else if (f === 2) {
        return this.getThirdStep()
      } else if (f === 3) {
        return this.getFourthStep()
      } else if (f === 4) {
        return this.getFifthStep()
      } else {
        return this.getSixStep()
      }
    },
    async getFirstStep () {
      await Installment.getStep('first')
        .then((res) => {
          this.personalData = res.data.data
        }).catch((error) => {
          return error
        })
    },
    async getSecondStep () {
      await Installment.getStep('second')
        .then((res) => {
          if (!isEmpty(res.data.data)) {
            if (res.data.data.passport) {
              this.files.passport = res.data.data.passport.absolutePath
              this.uploadedFiles.passport = res.data.data.passport.absolutePath
            }
          }
        }).catch((error) => {
          return error
        })
    },
    async getThirdStep () {
      await Installment.getStep('second')
        .then((res) => {
          if (!isEmpty(res.data.data)) {
            if (res.data.data.registration) {
              this.files.registration = res.data.data.registration.absolutePath
              this.uploadedFiles.registration = res.data.data.registration.absolutePath
            }
          }
        }).catch((error) => {
          return error
        })
    },
    async getFourthStep () {
      await Installment.getStep('second')
        .then((res) => {
          if (!isEmpty(res.data.data)) {
            if (res.data.data.passport_in_user) {
              this.files.passport_in_user = res.data.data.passport_in_user.absolutePath
              this.uploadedFiles.passport_in_user = res.data.data.passport_in_user.absolutePath
            }
          }
        }).catch((error) => {
          return error
        })
    },
    async getFifthStep () {
      await Installment.getStep('four')
        .then((res) => {
          if (res.data.data.length > 0) {
            this.phones[0] = res.data.data[0].phone
            this.phones[1] = res.data.data[1].phone
          }
        }).catch((error) => {
          return error
        })
    },
    async getSixStep () {
      await Installment.getStep('five')
        .then((res) => {
          this.card = res.data.data
        }).catch((error) => {
          return error
        })
    },
    validateStep (scope) {
      return this.$validator.validateAll(scope)
        .then((valid) => {
          return valid
        })
        .catch((err) => {
          return err
        })
    },
    getFormData (name, file) {
      const formData = new FormData()
      formData.append('type', name)
      formData.append('file', file)
      return formData
    },
    getAccess () {
      navigator.mediaDevices.getUserMedia({
        video: true
      }).then((stream) => {
        this.$refs.video.srcObject = stream
      }).catch(() => {
        this.hasCameraSupport = false
      })
    },
    createURL (file) {
      return URL.createObjectURL(file)
    },
    fourStep () {
      return this.validateStep('scope-four')
        .then(async () => {
          return await this.sendNumber()
        })
        .catch((err) => {
          return err
        })
    },
    disableForm () {
    }
  }
}
</script>

<style lang="scss">
.vue-form-wizard .wizard-progress-bar {
  width: 2px;
}

.vue-form-wizard.md .wizard-icon-circle {
  width: 20px;
  height: 20px;
}

.vue-form-wizard.md .wizard-navigation .wizard-progress-with-circle {
  position: relative;
  top: 15px;
}

.wizard-header {
  display: none
}

.passport-wizard {
  .wizard-progress-with-circle {
    display: none;
  }

  .wizard-tab-content {
    padding: 0 0 20px 0;
  }

  .wizard-card-footer {
    padding: 0;
  }
}
</style>
