<template>
  <!-- Delivery Address -->
  <div class="my-4 relative">
    <!-- Город доставки -->
    <div class="relative">
      <client-only>
        <select
          v-model="address.region"
          class="appearance-none mt-2 bg-c-gray-1 flex items-center justify-between px-4 py-3 rounded-xl w-full outline-none"
          @change="selectedRegion"
        >
          <option
            class="font-550 flex items-center justify-between text-base bg-transparent outline-none"
            value=""
          >
            Город доставки
          </option>
          <option
            v-for="region in regions"
            :key="region.id"
            class="py-1 select-option-class font-550 flex items-center justify-between text-base bg-transparent outline-none"
            :value="region.id"
          >
            {{ $lang(region,'name') }}
          </option>
        </select>
      </client-only>
      <!-- Warn Select -->
      <div
        v-if="selectedReg"
        class="absolute font-black text-lg right-4 top-2 text-c-green-1"
      >
        ✓
      </div>
      <div
        v-else
        class="absolute font-black text-lg right-4 top-4 text-c-green-1"
      >
        <img src="~/assets/icons/icon-info.svg" alt="">
      </div>
      <!-- Warn Region -->
      <div class="font-semibold mt-2 ml-2 font-mono text-xs text-c-red-1">
        <span>{{ warns.region }}</span>
      </div>
    </div>
    <div>
      <!-- Район -->
      <div class="relative">
        <client-only>
          <select
            v-model="address.district"
            class="appearance-none mt-4 bg-c-gray-1 flex items-center justify-between px-4 py-3 rounded-xl w-full outline-none"
            @change="selectedDistrict"
          >
            <option
              class="select-option-class font-550 flex items-center justify-between text-base bg-transparent outline-none"
              value=""
            >
              <span>Oкруг доставки</span>
            </option>
            <option
              v-for="district in districts"
              :key="district.id"
              class="py-1 select-option-class font-550 flex items-center justify-between text-base bg-transparent outline-none"
              :value="district.id"
            >
              <span>{{ $lang(district,'name') }}</span>
            </option>
          </select>
        </client-only>
        <!-- Warn Select -->
        <span
          v-if="!selectedDist && selectedReg"
          class="absolute font-black text-lg right-4 top-4 text-c-green-1"
        >
          <img src="~/assets/icons/icon-info.svg" alt="">
        </span>
        <span
          v-if="selectedDist"
          class="absolute font-black text-lg right-4 top-2 text-c-green-1"
        >
          ✓
        </span>
        <!-- Warn District -->
        <div v-if="warns.district" class="font-semibold mt-2 ml-2 font-mono text-xs text-c-red-1">
          <span>{{ warns.district }}</span>
        </div>
      </div>
      <!-- Улица -->
      <div class="relative">
        <input
          v-model="address.street"
          type="text"
          placeholder="Улица"
          class="bg-c-gray-1 px-4 py-3 pr-10 rounded-xl placeholder-c-gray-6 font-font-550 text-base w-full outline-none mt-4"
          @blur="streetBlurEvent"
        >
        <span
          v-if="streetMark"
          class="absolute font-black text-lg right-4 top-6 text-c-green-1"
        >
          ✓
        </span>
        <!-- Warn Street -->
        <div v-if="warns.street" class="font-semibold mt-2 ml-2 font-mono text-xs text-c-red-1">
          <span>{{ warns.street }}</span>
        </div>
      </div>
      <!-- Дом -->
      <div class="grid gap-2 grid-cols-2 mt-4">
        <div class="relative">
          <input
            v-model="address.home"
            type="text"
            placeholder="Дом"
            class="bg-c-gray-1 p-4 pr-8  rounded-xl placeholder-c-gray-6 font-font-550 text-base w-full outline-none"
            @blur="homeBlurEvent"
          >
          <span
            v-if="homeMark"
            class="absolute font-black text-lg right-3 top-4 text-c-green-1"
          >
            ✓
          </span>
        </div>
        <div class="bg-c-gray-1 flex justify-between rounded-xl py-2 px-4 w-full">
          <div class="flex flex-col w-full">
            <label
              for="apartment"
              class="text-c-gray-5 text-xs font-font-550 w-full"
            >
              Квартира *
            </label>
            <input
              id="apartment"
              v-model="address.apartment"
              type="text"
              class="text-c-gray-6 font-font-550 text-base bg-transparent outline-none w-full"
            >
          </div>
          <img
            src="@/assets/icons/icon-remove.svg"
            @click=" address.apartment = '' "
          >
        </div>
      </div>
      <!-- Warn Home -->
      <div v-if="warns.home" class="font-semibold mt-2 ml-2 font-mono text-xs text-c-red-1">
        <span>{{ warns.home }}</span>
      </div>

      <div class="grid gap-2 grid-cols-2 mt-4">
        <!-- Подъезд -->
        <div class="bg-c-gray-1 flex justify-between rounded-xl py-2 px-4 w-full">
          <div class="flex flex-col w-full">
            <label
              for="podyezd"
              class="text-c-gray-5 text-xs font-font-550 w-full"
            >
              Подъезд
            </label>
            <input
              id="podyezd"
              v-model="address.entrance"
              type="text"
              class="text-c-gray-6 font-font-550 text-base bg-transparent outline-none w-full"
            >
          </div>
          <img
            src="@/assets/icons/icon-remove.svg"
            @click=" address.entrance = '' "
          >
        </div>
        <!-- Этаж -->
        <input
          v-model="address.level"
          type="text"
          placeholder="Этаж"
          class="bg-c-gray-1 p-4 rounded-xl placeholder-c-gray-6 font-font-550 text-base w-full outline-none"
        >
      </div>
      <!-- End Of Delivery Address -->
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { mapState, mapMutations, mapActions } from 'vuex'
import Checkout from '~/api/Checkout.js'
export default {
  data () {
    return {
      address: {
        region: '',
        district: '',
        home: '',
        street: '',
        apartment: '',
        entrance: '',
        level: ''
      },
      warns: {
        region: '',
        district: '',
        home: '',
        street: '',
        apartment: '',
        entrance: '',
        level: ''
      },
      selectedReg: false,
      selectedDist: false,
      streetMark: false,
      homeMark: false,
      districts: []
    }
  },
  async created(){
    this.address = this.$cookies.get('checkout-delivery-address') || {
      region: '',
      district: '',
      home: '',
      street: '',
      apartment: '',
      entrance: '',
      level: ''
    }
    
    if(this.address.region != ''){
      this.selectedReg = true
      this.districts = await Checkout.GetDistrict(this.address.region)
    }
    
    if(this.address.district != ''){
      this.selectedDist = true
    }
    
    if(this.address.street != ''){
      this.streetMark = true
    }
    
    if(this.address.home != ''){
      this.homeMark = true
    }
  },
  computed: {
    ...mapState('cart', {
      products: state => state.products
    }),
    ...mapState('order', {
      regions: state => state.regions
    })
  },

  watch: {
    'address.region' (last) {
      if (last) {
        this.warns.region = ''
      } else {
        this.warns.region = 'Iltimos viloyatingizni tanlang'
      }
      
      this.$cookies.set('checkout-delivery-address',this.address,{
        path: '/',
        maxAge: 60 * 60 * 24 * 7  
      })
    },
    'address.district' (last) {
      if (last) {
        this.warns.district = ''
      } else {
        this.warns.district = 'Iltimos tumaningizni tanlang'
      }
      
      this.$cookies.set('checkout-delivery-address',this.address,{
        path: '/',
        maxAge: 60 * 60 * 24 * 7  
      })
    },
    'address.street' (last) {
      this.streetMark = false
      if (last) {
        this.warns.street = ''
      } else {
        this.warns.street = 'Iltimos ko\'changiz nomini kiriting'
      }
      
      this.$cookies.set('checkout-delivery-address',this.address,{
        path: '/',
        maxAge: 60 * 60 * 24 * 7  
      })
    },
    'address.home' (last) {
      this.homeMark = false
      if (last) {
        this.warns.home = ''
      } else {
        this.warns.home = 'Iltimos uyingiz raqamini kiriting'
      }
      
      this.$cookies.set('checkout-delivery-address', this.address,{
        path: '/',
        maxAge: 60 * 60 * 24 * 7  
      })
    }
  },

  methods: {
    ...mapMutations('order', {
      setPaymentSystems: 'SET_PAYMENT_TYPES',
      setDeliveryAddress: 'SET_DELIVERY_ADDRESS'
    }),
    ...mapActions('order', {
      getDeliveries: 'GET_DELIVERIES'
    }),
    async selectedRegion (event) {
      this.address.district = ''
      const id = event.target.value

      if (event.target.value) {
        this.selectedReg = true
      } else {
        this.selectedReg = false
      }

      this.selectedDist = false
      this.districts = await Checkout.GetDistrict(id)
      await this.getPaymentTypes(id)
    },
    async getPaymentTypes (id) {
      await Checkout.GetPaymentTypes(id)
        .then((response) => {
          const data = response.data.data
          const payments = data.payments
          const paymentSystems = data.paymentSystems
          this.setPaymentSystems({ payments, paymentSystems })
        }).catch(err => console.log(err))
    },
    selectedDistrict (event) {
      const districtId = event.target.value
      const products = this.products.map((product) => {
        return {
          id: product.id,
          qty: product.qty
        }
      })

      if (event.target.value) {
        this.selectedDist = true
        this.getDeliveries({ districtId, products })
      } else {
        this.selectedDist = false
      }
    },
    streetBlurEvent (event) {
      if (event.target.value.length > 5) {
        this.streetMark = true
      } else {
        this.streetMark = false
      }
    },
    homeBlurEvent (event) {
      if (event.target.value.length > 5) {
        this.homeMark = true
      } else {
        this.homeMark = false
      }
    },
    disabledBeforeToday (date) {
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      return date < today
    },
    validateDeliveryOrderForms () {
      if (this.address.region === '') {
        this.warns.region = 'Iltimos viloyatingizni tanlang'
      } else {
        this.warns.region = ''
      }

      if (this.address.district === '') {
        this.warns.district = 'Iltimos tumaningizni tanlang'
      } else {
        this.warns.district = ''
      }

      if (this.address.street === '') {
        this.warns.street = 'Iltimos ko\'changiz nomini kiriting'
      } else {
        this.warns.street = ''
      }

      if (this.address.home === '') {
        this.warns.home = 'Iltimos uyingiz raqamini kiriting'
      } else {
        this.warns.home = ''
      }

      if (this.warns.region !== '' ||
            this.warns.district !== '' ||
            this.warns.street !== '' ||
            this.warns.home !== '') {
        return false
      }

      this.setDeliveryAddress({ address: this.address })
      return true
    }
  }

}
</script>

<style scoped>

</style>
