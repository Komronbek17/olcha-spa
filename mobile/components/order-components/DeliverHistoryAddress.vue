<template>
  <div>
    <div v-if="!showNewAddressField">
      <h3 class="text-c-gary-6 mt-8 ml-2 font-bold text-xl sm:text-2xl">
        Адрес доставки
      </h3>
      <div>
        <div v-for="address in historyAddress" :key="address.key">
          <label
            :for="address.id"
            class="bg-c-gray-1 p-4 bg-opacity-70 rounded-xl mt-4 flex"
          >
            <input
              :id="address.id"
              v-model="addressId"
              type="radio"
              name="historyAddress"
              :value="address.id"
              class="form-radio h-6 w-6 text-c-green-1 border-2 border-solid border-c-gray-3"
            >
            <div class="ml-4">
              <p class="text-c-gray-6 font-bold text-base">{{ address.house_number }}</p>
              <p class="text-c-gray-5 font-font-550 text-sm">{{ address.full_name }}</p>
            </div>
          </label>
        </div>

        <div
          class="block mt-4 mb-2 bg-c-green-1 p-2 text-center rounded-lg text-white text-base font-font-550"
          @click="showNewAddressField = true"
        >
          Ввести новый адрес
        </div>
      </div>
    </div>
    <div v-else>
      <div
        class="flex mt-8 items-center bg-c-gray-1 py-2 px-4 rounded-lg w-max mb-6"
        @click="showNewAddressField = false"
      >
        <img src="@/assets/icons/icon-left.svg">
        <div
          class="block text-c-gray-6 font-font-550 text-sm ml-4"
        >
          Выбрать из сохраненных
        </div>
      </div>
      <DeliveryOrderForms ref="deliveryOrderForms" />
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import VueTypes from 'vue-types'
import { mapState, mapMutations, mapActions } from 'vuex'
import Checkout from '~/api/Checkout.js'
import DeliveryOrderForms from '../../components/order-components/DeliveryOrderForms'
export default {
  components: {
    DeliveryOrderForms
  },
  props: {
    historyAddress: VueTypes.array.def([])
  },
  created(){
    this.addressId = this.$cookies.get('selected-history-address') || this.historyAddress[0].id
    this.showNewAddressField = this.$cookies.get('checkout-show-new-form') || false
  },
  computed:{
    ...mapState('cart', {
      products: state => state.products
    }),
  },
  data () {
    return {
      showNewAddressField: false,
      addressId: Number
    }   
  },
  watch: {
    addressId (last) {
      this.$cookies.set('selected-history-address',last,{
        path: '/',
        maxAge: 60 * 60 * 24 * 7
      })
      
      const products = this.products.map((product) => {
        return {
          id: product.id,
          qty: product.qty
        }
      })
      
      const currentAddress = this.currentAddress()
      this.getDeliveries({ districtId:currentAddress.district, products })
      this.getPaymentTypes(currentAddress.region)
    },
    showNewAddressField(last){
      this.$cookies.set('checkout-show-new-form',last,{
        path: '/',
        maxAge: 60 * 60 * 24 * 7
      })
    }
  },
  methods: {
    ...mapMutations('order', {
      setDeliveryAddress: 'SET_DELIVERY_ADDRESS'
    }),
    ...mapMutations('order', {
      setPaymentSystems: 'SET_PAYMENT_TYPES',
      setDeliveryAddress: 'SET_DELIVERY_ADDRESS'
    }),
    ...mapActions('order', {
      getDeliveries: 'GET_DELIVERIES'
    }),
    async getPaymentTypes (id) {
      await Checkout.GetPaymentTypes(id)
        .then(response => {
            const data = response.data.data
            const payments = data.payments
            const paymentSystems = data.paymentSystems
            this.setPaymentSystems({ payments, paymentSystems })
        }).catch((err) => console.log(err))
    },
    currentAddress() {
        const currentAddress = this.historyAddress.filter(address => address.id === this.addressId)[0]
        const makeAddress = {
            region:currentAddress.region.id,
            district:currentAddress.district.id,
            home:currentAddress.house_number,
            street:currentAddress.street,
            apartment:currentAddress.apartment,
            entrance:currentAddress.entrance,
            level:currentAddress.floor
        }
        
        return makeAddress
    },
    validationHistoryForm () {
        if(this.showNewAddressField){
            return this.$refs.deliveryOrderForms.validateDeliveryOrderForms()
        }
        else{
            this.setDeliveryAddress({ address: this.currentAddress() })
            return true
        }
    }
  }
}
</script>
