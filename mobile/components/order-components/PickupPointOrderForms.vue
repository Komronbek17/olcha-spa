<template>
  <!-- Pickup Address -->
  <div class="my-4 relative">
    <!-- Город доставки -->
    <div class="relative">
      <select
        v-model="pickupAddress.region"
        class="appearance-none mt-2 bg-c-gray-1 flex items-center justify-between px-4 py-3 rounded-xl w-full outline-none"
        @change="selectedPickupPointRegion"
      >
        <option
          class="font-550 flex items-center justify-between text-base bg-transparent outline-none"
          value=""
        >
          <span>Город для самовывоза</span>
        </option>

        <option
          v-for="region in pickupRegions"
          :key="region.id"
          class="py-1 select-option-class font-550 flex items-center justify-between text-base bg-transparent outline-none"
          :value="region.id"
        >
          <span>{{ $lang(region,'name') }}</span>
        </option>
      </select>
      <!-- Warn Select -->
      <span
        v-if="selectedPickupReg"
        class="absolute font-black text-lg right-4 top-2 text-c-green-1"
      >
        ✓
      </span>
      <span
        v-else
        class="absolute font-black text-lg right-4 top-4 text-c-green-1"
      >
        <img src="~/assets/icons/icon-info.svg" alt="">
      </span>
      <!-- Warn Region -->
      <div class="font-semibold mt-2 ml-2 font-mono text-xs text-c-red-1">
        <span>{{ warns.pickupAddress.region }}</span>
      </div>
    </div>
    <div>
      <!-- Район -->
      <div class="relative">
        <select
          v-model="pickupAddress.district"
          class="appearance-none mt-4 bg-c-gray-1 flex items-center justify-between px-4 py-3 rounded-xl w-full outline-none"
          @change="selectedPickupDistrict"
        >
          <option
            class="select-option-class font-550 flex items-center justify-between text-base bg-transparent outline-none"
            value=""
          >
            <span>Пункт самовывоза</span>
          </option>
          <option
            v-for="district in pickupDistricts"
            :key="district.id"
            class="py-1 select-option-class font-550 flex items-center justify-between text-base bg-transparent outline-none"
            :value="district.id"
          >
            <span>{{ $lang(district,'name') }}</span>
          </option>
        </select>
        <!-- Warn Select -->
        <span
          v-if="!selectedPickupDist && selectedPickupReg"
          class="absolute font-black text-lg right-4 top-4 text-c-green-1"
        >
          <img src="~/assets/icons/icon-info.svg" alt="">
        </span>
        <span
          v-if="selectedPickupDist"
          class="absolute font-black text-lg right-4 top-2 text-c-green-1"
        >
          ✓
        </span>
        <!-- Warn District -->
        <div v-if="warns.pickupAddress.district" class="font-semibold mt-2 ml-2 font-mono text-xs text-c-red-1">
          <span>{{ warns.pickupAddress.district }}</span>
        </div>
        <!-- PickupInfo -->
        <div
          v-if="selectedPickupDist"
          class="h-24 flex flex-col justify-around w-full mt-3 bg-c-green-2 rounded-lg bg-opacity-20 p-2"
        >
          <p class="text-c-gray-6 font-bold">
            {{ $lang(pickupInfo,'address') }}
          </p>
          <div class="flex justify-between itemc-center">
            <p>Режим работы пункта</p>
            <p>{{ $lang(pickupInfo,'work_time') }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { mapMutations,mapActions, mapState } from 'vuex'
import Checkout from '~/api/Checkout.js'
export default {
  data () {
    return {
      pickupDistricts: [],
      selectedPickupReg: false,
      selectedPickupDist: false,
      pickupAddress: {
        region: '',
        district: ''
      },
      warns: {
        pickupAddress: {
          region: '',
          district: ''
        }
      }
    }
  },
  async created () {
    this.pickupAddress = this.$cookies.get('pickupAddress') || {
      region: '',
      district: ''
    }
    
    if(this.pickupAddress.region != ''){
      this.selectedPickupReg = true
      const pickupRegions = this.pickupRegions
      const selectedPickupRegion = 
        pickupRegions.filter(region => region.id === this.pickupAddress.region)
      this.pickupDistricts = selectedPickupRegion[0].pickups || []
    }
    
    if(this.pickupAddress.district != ''){
      this.selectedPickupDist = true 
      const pickupInfo = this.pickupDistricts.filter(district => district.id === this.pickupAddress.district)[0]
      this.setPickupInfo(pickupInfo)
    }
  },
  computed: {
    ...mapState('order', {
      pickupRegions: state => state.pickupRegions,
      pickupInfo: 'pickupInfo'
    })
  },
  watch: {
    'pickupAddress.region' (last) {
      if (last) {
        this.warns.pickupAddress.region = ''
      } else {
        this.warns.pickupAddress.region = 'Iltimos viloyatingizni tanlang'
      }
      
      this.$cookies.set('pickupAddress', this.pickupAddress,{
        path: '/',
        maxAge: 60 * 60 * 24 * 7
      })
    },
    'pickupAddress.district' (last) {
      if (last) {
        this.warns.pickupAddress.district = ''
      } else {
        this.warns.pickupAddress.district = 'Iltimos tumaningizni tanlang'
      }
      
      this.$cookies.set('pickupAddress', this.pickupAddress,{
        path: '/',
        maxAge: 60 * 60 * 24 * 7
      })
    }
  },
  methods: {
    ...mapMutations('order', {
      setPaymentSystems: 'SET_PAYMENT_TYPES',
      setPickupInfo: 'SET_PICKUP_INFO',
      setPickupPointAddress: 'SET_PICKUP_POINT_ADDRESS'
    }),
    selectedPickupPointRegion (event) {
      const id = parseInt(event.target.value)

      if (event.target.value) {
        this.selectedPickupReg = true
      } else {
        this.selectedPickupReg = false
      }

      const pickupRegions = this.pickupRegions

      const selectedPickupRegion = pickupRegions.filter(region => region.id === id)

      this.pickupDistricts = selectedPickupRegion[0].pickups || []

      this.selectedPickupDist = false
    },
    async selectedPickupDistrict (event) {
      const districtId = parseInt(event.target.value)
      if (event.target.value) {
        const pickupInfo = this.pickupDistricts.filter(district => district.id === this.pickupAddress.district)[0]
        this.setPickupInfo(pickupInfo)
        this.selectedPickupDist = true
        await this.getPaymentTypes(districtId)
      } else {
        this.selectedPickupDist = false
      }
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
    validatePickupPointForms () {
      if (this.pickupAddress.region === '') {
        this.warns.pickupAddress.region = 'Iltimos viloyatingizni tanlang'
      } else {
        this.warns.pickupAddress.region = ''
      }

      if (this.pickupAddress.district === '') {
        this.warns.pickupAddress.district = 'Iltimos tumaningizni tanlang'
      } else {
        this.warns.pickupAddress.district = ''
      }

      if (this.warns.pickupAddress.region !== '' ||
          this.warns.pickupAddress.district !== '') {
        return false
      } else {
        this.setPickupPointAddress({ pickupAddress: this.pickupAddress })
        return true
      }
    }
  }
}
</script>

<style scoped>

</style>
