<template>
  <div>
    <div>
      <!-- SELECT DELIVERY METHOD -->
      <div>
        <label
          for="delivery"
          class="flex items-center justify-center bg-c-gray-1 py-2 px-4 bg-opacity-70 rounded-xl mt-4 w-full"
        >
          <input
            id="delivery"
            v-model="selectOrderMethod.id"
            :value="1"
            type="radio"
            name="payment"
            class="form-radio h-6 w-6 text-c-green-1 border-2 border-solid border-c-gray-3"
            checked="checked"
          >
          <div class="ml-4">
            <p class="text-c-gray-6 mb-2 font-bold text-base sm:text-lg">
              Доставка
            </p>
            <p class="text-c-gray-5 mb-2 font-font-550 text-base sm:text-xs">
              Доставка до вашего дома в течении определенного времени и типа такого
            </p>
          </div>
        </label>
      </div>
      <div>
        <label
          for="pickup"
          class="flex items-center justify-center bg-c-gray-1 py-2 px-4 bg-opacity-70 rounded-xl mt-4 w-full"
        >
          <input
            id="pickup"
            v-model="selectOrderMethod.id"
            :value="2"
            type="radio"
            name="payment"
            class="form-radio h-6 w-6 text-c-green-1 border-2 border-solid border-c-gray-3"
          >
          <div class="ml-4">
            <p class="text-c-gray-6 mb-2 font-bold text-base sm:text-lg">
              Самовывоз
            </p>
            <p class="text-c-gray-5 mb-2 font-font-550 text-base sm:text-xs">
              Забрать товар самому из доступного
              списка Pick Up Point
            </p>
          </div>
        </label>
      </div>
    </div>

    <!-- PICKUP -->
    <div v-if=" selectOrderMethod.id === 2 ">
      <PickupPointOrderForms ref="pickupPointOrderForms" />
    </div>

    <!-- DELIVERY -->
    <div v-if=" selectOrderMethod.id === 1 ">
      <div v-if="historyAddress.length">
        <DeliverHistoryAddress ref="deliverHistoryAddress" :history-address="historyAddress" />
      </div>
      <div v-else>
        <DeliveryOrderForms ref="deliveryOrderForms" />
      </div>
    </div>

    <!-- Kомментарий -->
    <div>
      <textarea
        v-model="comment"
        form="comment"
        rows="2"
        placeholder="Оставьте комментарий к заказу"
        class="w-full mt-2 mb-0 p-4 bg-c-gray-1 rounded-xl outline-none placeholder-c-gray-6 font-font-550 text-base"
      />
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { mapActions, mapMutations, mapState } from 'vuex'
import Checkout from '~/api/Checkout.js'
import DeliveryOrderForms from '../../components/order-components/DeliveryOrderForms'
import DeliverHistoryAddress from '../../components/order-components/DeliverHistoryAddress'
import PickupPointOrderForms from '../../components/order-components/PickupPointOrderForms'
export default {
  components: {
    DeliveryOrderForms,
    DeliverHistoryAddress,
    PickupPointOrderForms
  },
  data () {
    return {
      selectOrderMethod: {
        id: 1,
        name: 'delivery'
      },
      loggedIn: this.$auth.loggedIn,
      comment: ''
    }
  },
  async created () {
    await this.getDeliverHistoryAddress()
    this.selectOrderMethod = this.$cookies.get('selectOrderMethod') || {
      id: 1,
      name: 'delivery'
    }
    
    this.comment = this.$cookies.get('checkout-comment') || ''
  },
  watch: {
    /* eslint-disable */
    comment(last){
      this.$cookies.set('checkout-comment', last ,{
        path: '/',
        maxAge: 60 * 60 * 24 * 7
      })
    },
    'selectOrderMethod.id' (last) {
      let name
      if (last === 1) {
        name = 'delivery'
      }

      if (last === 2) {
        name = 'pickup'
      }
      
      this.selectOrderMethod.name = name
      
      this.$cookies.set('selectOrderMethod',{ name, id:last },{
        path: '/',
        maxAge: 60 * 60 * 24 * 7
      })
      
      this.changeOrderMethodFunction()
    },
  },
  computed:{
    ...mapState('order',{
      historyAddress:'historyAddress'
    })
  },
  methods:{
    ...mapMutations('order',{
      changeOrderMethod:'CHANGE_ORDER_METHOD',
      setPaymentSystems:'SET_PAYMENT_TYPES',
      setStepTwoCharacters: 'SET_STEP_TWO_CHARACTERS',
      setComment:'SET_COMMENT'
    }),
    ...mapActions('order',{
      getDeliverHistoryAddress:'GET_DELIVER_HISTORY_ADDRESS'
    }),
    changeOrderMethodFunction(){
      const id = this.selectOrderMethod.id
      const name = this.selectOrderMethod.name
      this.changeOrderMethod({ id , name })
    },
    validateStepTwo () {
      this.setComment({ comment:this.comment })
      if (this.selectOrderMethod.id === 1) {
        console.log(this.historyAddress.length)
        if(this.historyAddress.length){
          return this.$refs.deliverHistoryAddress.validationHistoryForm()
        }
          return this.$refs.deliveryOrderForms.validateDeliveryOrderForms()
      }

      if (this.selectOrderMethod.id === 2) {
        return this.$refs.pickupPointOrderForms.validatePickupPointForms()
      }
    },
  }
}
</script>

<style scoped>

</style>
