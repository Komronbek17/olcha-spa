<template>
  <div
    class="max-w-3xl font-helvetica relative"
  >
    <div class="bg-c-gray" />
    <!-- Selected Items -->
    <div>
      <div class="bg-c-gray-1 px-6 py-4 w-full">
        <h3 class="text-c-gray-6 text-base font-font-550 mb-2">
          Состав заказа
        </h3>
        <div
          v-for="product in products"
          :key="product.id"
        >
          <div class="bg-white flex items-center mt-4 rounded-lg relative">
            <img
              :src="product.main_image ? $aspect(product.main_image, '76x76') : require('~/assets/images/No_Image_Available.jpg')"
              :alt="$aspect(product.main_image, '76x76')"
            >
            <p class="text-c-gray-6 text-sm sm:text-base font-font-550 p-2">
              {{ $lang(product,'name') }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- End Of Selected Items -->
    <div class="bg-white">
      <div class="py-6">
        <!-- Personal Information -->
        <div>
          <h3 class="text-c-gary-6 font-bold text-xl sm:text-2xl">
            Персональные данные
          </h3>
          <div>
            <ValidationProvider name="text" rules="alpha_spaces">
              <div slot-scope="{ errors }">
                <input
                  v-model="personName"
                  type="text"
                  placeholder="Имя"
                  class="bg-c-gray-1 p-4 rounded-xl placeholder-c-gray-6 font-font-550 text-base w-full outline-none mt-4"
                  @keypress="isLetter($event)"
                >
                <span v-if="errors.length" class="text-c-red-1 m-2 text-sm italic font-semibold">
                  Iltimos Ism va Familiyangizni kiriting
                </span>
              </div>
            </ValidationProvider>
            <!-- Warn Name -->
            <div v-if="warns.personName" class="font-semibold mt-2 ml-2 font-mono text-sm text-c-red-1">
              <span>{{ warns.personName }}</span>
            </div>
            <div class="bg-c-gray-1 rounded-xl py-1 px-4 flex flex-col w-full mt-4">
              <label
                for="tel"
                class="text-c-gray-5 text-sm font-font-550"
              >
                Номер телефона
              </label>
              <div class="flex font-font-550 py-1 text-base bg-transparent relative">
                <span class="mr-2">+998</span>
                <input
                  id="tel"
                  v-model="mobileNumber"
                  v-mask="'## ###-##-##'"
                  type="tel"
                  autocomplete="tel-national"
                  class="placeholder-c-gray-6 font-font-550 text-base bg-transparent outline-none"
                >
                <span
                  v-if="mobileNumber.length == 12"
                  class="absolute font-black text-lg right-8 -top-2 text-c-green-1"
                >
                  ✓
                </span>
              </div>
            </div>
            <!-- Warn Mobile -->
            <div v-if="warns.mobileNumber" class="font-semibold mt-2 ml-2 font-mono text-sm text-c-red-1">
              <span>{{ warns.mobileNumber }}</span>
            </div>
            <!-- Sms code -->
            <div v-if="clickedSmsBtn" class="relative">
              <div>
                <input
                  v-model="smsCode"
                  v-mask=" '#####' "
                  type="text"
                  placeholder="Введите код"
                  class=" bg-c-gray-1 p-4 py-3 rounded-xl placeholder-c-gray-6 font-font-550 text-base w-full outline-none mt-4"
                  :class="{
                    'border-c-green-1 border-2':activatedSMS,
                    'border-c-red-1 border-2':badRespond
                  }"
                >
                <span
                  v-if="activatedSMS"
                  class="absolute font-black text-lg right-12 top-7 text-c-green-1"
                >
                  ✓
                </span>
              </div>
              <!-- Warn SMS -->
              <div v-if="warns.smsCode" class="font-semibold mt-2 ml-2 font-mono text-sm text-c-red-1">
                <span>{{ warns.smsCode }}</span>
              </div>
              <div
                class="bg-c-red-1 text-c-gray-1 text-center rounded-xl py-3 px-4 flex flex-col w-full mt-4 outline-none"
                @click="sendSmsCode"
              >
                Отправить код еще раз
              </div>
            </div>
          </div>
        </div>
        <!-- End Of Personal Information -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import { ValidationProvider } from 'vee-validate'
// import VueTypes from 'vue-types'
import Checkout from '~/api/Checkout.js'
export default {
  components: {
    ValidationProvider
  },
  data () {
    return {
      personName: '',
      mobileNumber: '',
      phone: '',
      userNumber: '',
      smsCode: '',
      loggedIn: this.$auth.loggedIn,
      clickedSmsBtn: false,
      activatedSMS: false,
      badRespond: false,
      warns: {
        personName: '',
        mobileNumber: '',
        smsCode: '',
        smsChecked: false
      }
    }
  },
  computed: {
    ...mapState('cart', {
      products: state => state.products
    })
  },
  watch: {
    mobileNumber (last) {
      if (last.length > 0) {
        this.warns.mobileNumber = ''
      } else {
        this.warns.mobileNumber = 'Iltimos telefon raqamingizni kiriting'
      }

      this.$cookies.set('mobile-number', last, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7
      })

      const formattingNumber = last.toLocaleString().replace(/-| /g, '')
      this.phone = '998' + formattingNumber

      if (last.length < 12) {
        this.smsCode = ''
        this.badRespond = false
        this.activatedSMS = false
      }

      if (last.length < 5) {
        this.clickedSmsBtn = false
      }
      if (last.length === 12 && !(this.phone === this.userNumber && this.$auth.loggedIn)) {
        this.sendSmsCode()
      }
    },
    smsCode (last) {
      if (last.length === 5) {
        this.verificationPhoneCode()
      }
      if (last.length < 5) {
        this.badRespond = false
        this.activatedSMS = false
        this.warns.smsChecked = false
      }
    },
    activatedSMS (last) {
      if (last) {
        this.warns.smsCode = ''
      }
    },
    personName (last) {
      if (last.length > 0) {
        this.warns.personName = ''
      } else {
        this.warns.personName = 'Iltimos Ismingiz va Familiyangizni kiriting'
      }

      this.$cookies.set('person-name', last, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7
      })
    }
  },
  created () {
    if (this.$auth.loggedIn) {
      const phoneNumber = this.$auth.user.phone.slice(3)
      this.userNumber = this.$auth.user.phone
      this.mobileNumber = phoneNumber
      this.personName = this.$auth.user.name
    } else {
      this.mobileNumber = this.$cookies.get('mobile-number') || ''
      this.personName = this.$cookies.get('person-name') || ''
    }

    this.$store.dispatch('order/GET_REGIONS')
    const cartProducts = this.$cookies.get('cart-products') || []
    this.$store.commit('cart/InitCartProducts', cartProducts)
  },
  methods: {
    ...mapActions('order', {
      getRegions: 'GET_REGIONS',
      getPickupPointRegions: 'GET_PICKUP_POINT_REGIONS'
    }),
    ...mapMutations('order', {
      setStepOneCharacters: 'SET_STEP_ONE_CHARACTERS'
    }),
    async verificationPhoneCode () {
      const verificationCode = await Checkout.CheckSmsCode(this.phone, this.smsCode)
      this.$nuxt.$loading.start()
      /* eslint-disable */
      console.log(verificationCode)
      if (verificationCode != null) {
        this.$nuxt.$loading.finish()
        this.badRespond = false
        this.activatedSMS = true
        this.warns.smsChecked = true
        this.clickedSmsBtn = false
      } else {
        console.log('hey')
        this.$nuxt.$loading.finish()
        this.badRespond = true
        this.activatedSMS = false
        this.warns.smsChecked = false
      }
    },
    isLetter (e) {
      let char = String.fromCharCode(e.keyCode) // Get the character
      if (/^[A-Za-z ]+$/.test(char)) {
        return true
      }// Match with regex
      else {
        e.preventDefault()
      } // If not match, don't add to input text
    },
    async sendSmsCode () {
      if (this.mobileNumber.length === 0) {
        this.warns.mobileNumber = 'Iltimos telefon raqamingizni kiriting'
      } else if (this.mobileNumber.length < 12) {
        this.warns.mobileNumber = 'Iltimos telefon raqamingizni to\'liq kiriting'
      } else {
        this.warns.mobileNumber = ''
      }

      if (this.warns.mobileNumber === '') {
        this.$nuxt.$loading.start()
        const res = await Checkout.SendSmsCode(this.phone)
        .then(response => {
            this.$nuxt.$loading.finish()
            this.clickedSmsBtn = true
        })
        .catch((err) => {
          console.log(err);
          this.$nuxt.$loading.finish()
          this.clickedSmsBtn = true
        })
      }
    },
    async validateStepOne(){
      if(this.mobileNumber.length === 0){
        this.warns.mobileNumber='Iltimos telefon raqamingizni kiriting'
      }
      else if(this.mobileNumber.length < 12){
        this.warns.mobileNumber='Iltimos telefon raqamingizni to\'liq kiriting'
      }
      else {
        this.warns.mobileNumber = ''
      }
      
      if(this.personName.length < 3){
        this.warns.personName = 'Iltimos Ismingiz va Familiyangizni to\'liq kiriting'
      }
      
      if(!this.personName.length){
        this.warns.personName = 'Iltimos Ismingiz va Familiyangizni kiriting'
      }
      
      if(!(this.phone === this.userNumber && this.$auth.loggedIn || this.warns.smsChecked)){
        this.warns.smsCode = 'Iltimos sms kodini kiriting'
      }
      else{
        this.warns.smsCode = ''
      }
      
      if( this.warns.personName.length !== 0 || 
          this.warns.mobileNumber.length !== 0 || 
          this.warns.smsCode.length !== 0){
        return false
      }
      else {
        this.getRegions()
        this.getPickupPointRegions()
        this.setStepOneCharacters({ phone:this.phone, name:this.personName})
        return true
      }
    },
  }
}
</script>

<style scoped>

</style>
