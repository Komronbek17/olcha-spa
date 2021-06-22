<template>
  <div>
    <div v-if="selectOrderMethod.id == 1" class="mt-2">
      <h3 class="text-c-gary-6 font-bold text-xl sm:text-2xl mb-4">
        Способ доставки
      </h3>
    </div>
    <!-- Delivery Method -->
    <div
      v-if="deliveryType && selectOrderMethod.id == 1"
      class="bg-c-gray-1 p-4 rounded-xl flex justify-between cursor-pointer"
      @click=" showDeliveryMethod = true "
    >
      <div class="mr-2">
        <div>
          <p class="text-c-gray-6 mb-2 font-bold text-base sm:text-lg">
            {{ $lang(deliveryType,'name') }}
          </p>
        </div>
        <p class="text-c-gray-5 mb-2 font-font-550 text-base sm:text-xs">
          <span>{{ $t('id1243') }} : </span>
          <span>{{ $lang(deliveryType,'delivered_time') }}</span>
        </p>
        <p class="text-c-gray-5 font-font-550 text-base sm:text-xs">
          <span>{{ $t('id2005') }} :</span>
          <span>{{ numberFormatter(deliveryType.price) }} {{ $t('id2307') }}</span>
        </p>
      </div>
      <img src="~/assets/icons/icon-right.svg">
    </div>
    <!-- End Of Delivery Method -->
    <PaymentMethod
      :payment-systems="paymentSystems"
      :payments="payments"
    />
    <!-- Warn Home -->
    <div v-if="warns.paymentMethod" class="font-semibold mb-2 ml-2 font-mono text-xs text-c-red-1">
      <span>{{ warns.paymentMethod }}</span>
    </div>
    <ModalContainer v-if="showDeliveryMethod">
      <div
        class="absolute bottom-16 left-0"
      >
        <DeliveryOrderType
          :deliveries="deliveries"
          @hide-delivery-method=" showDeliveryMethod = false "
          @selected-delivery-type=" selectedDeliveryType "
        />
      </div>
    </ModalContainer>

    <!-- Activate User Bonus -->
    <div class="rounded-2xl bg-gradient-to-b from-c-green-1 to-c-green-3 p-4 mb-4">
      <ul class="grid grid-cols-1 gap-y-2">
        <div class="font-bold text-white text-xl leading-8">
          Баланс :
        </div>
        <div class="font-bold text-white text-xl leading-8">
          Бонусный счет : {{ numberFormatter(bonus) }} сум
        </div>
        <div>
          <input
            v-model="bonusUsage"
            type="number"
            placeholder="Введите сумму"
            class="bg-c-gray-1 px-4 py-2 rounded-xl placeholder-c-gray-6 font-font-550 text-base w-full outline-none mt-4"
          >
        </div>
        <div
          class="bg-c-gray-7 border-white border-2 text-white px-4 text-center py-2 rounded-xl font-font-550 text-base w-full outline-none mt-4"
          @click="userActivatedBonus"
        >
          Использовать бонус
        </div>
      </ul>
    </div>

    <!-- Popup -->
    <div
      v-if="isActivateBonus"
      class="bg-c-gray-6 py-3 px-6 rounded-xl flex justify-between items-center fixed max-w-full left-6 right-6 bottom-20"
    >
      <p class="text-white font-font-550 text-sm">
        Из бонуса освоено {{ bonusUsage }} сумов.
      </p>
      <div
        class="text-c-green-1 font-font-550 text-sm"
        @click="unActivateBonus"
      >
        Возвращаться
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import PaymentMethod from '../../components/order-components/PaymentMethod'
import DeliveryOrderType from '../../components/order-components/DeliveryOrderType'
import ModalContainer from '../../reusable/ModalContainer'
import commonMixins from '~/mixins/_mixin.js'

export default {
  components: {
    PaymentMethod,
    DeliveryOrderType,
    ModalContainer
  },
  mixins: [commonMixins],
  emits: ['hide-delivery-method', 'selected-delivery-type'],
  data () {
    return {
      showDeliveryMethod: false,
      isActivateBonus: false,
      bonusUsage: '',
      warns: {
        paymentMethod: ''
      }
    }
  },
  computed: {
    ...mapState('order', {
      selectOrderMethod: 'selectOrderMethod',
      paymentMethod: 'paymentMethod',
      deliveries: 'deliveries',
      deliveryType: 'deliveryType',
      paymentSystems: 'paymentSystems',
      payments: 'payments'
    }),
    ...mapState('cart', {
      bonus: 'bonus'
    })
  },
  watch: {
    paymentMethod (last) {
      if (last.length > 0) {
        this.warns.paymentMethod = ''
      }
    }
  },
  methods: {
    ...mapMutations('order', {
      setDeliveryType: 'SET_DELIVERY_TYPE'
    }),
    ...mapMutations('cart', {
      setAdditionalPrice: 'SET_ADDITIONAL_PRICE',
      activateUserBonus: 'ACTIVATE_USER_BONUS',
      BackUpBonusUsagePrice: 'BACKUP_BONUS_USAGE_PRICE'
    }),
    activateBonusNotify () {
      this.isActivateBonus = true
      setTimeout(() => {
        this.isActivateBonus = false
        this.bonusUsage = ''
      }, 1000)
    },
    userActivatedBonus () {
      const bonusUsage = parseInt(this.bonusUsage)
      const bonus = this.bonus
      if (bonusUsage > 0 && bonus >= bonusUsage) {
        this.activateUserBonus({ bonusUsage })

        this.activateBonusNotify()
      }
    },
    unActivateBonus () {
      const backupPrice = parseInt(this.bonusUsage)
      this.BackUpBonusUsagePrice(backupPrice)
    },
    selectedDeliveryType (event) {
      const deliveryType = Object.assign(event)
      this.setDeliveryType(deliveryType)
      this.showDeliveryMethod = false
    },
    validateStepThree () {
      if (this.paymentMethod === '') {
        this.warns.paymentMethod = 'Iltimos to\'lov turini kiriting'
      } else {
        this.warns.paymentMethod = ''
      }
      const paymentPrice = this.calculateAdditionalCost()

      let deliveryPrice = 0

      if (this.selectOrderMethod.id === 1) {
        deliveryPrice = this.deliveryType.price
      }

      /* mutations */
      this.setAdditionalPrice({ paymentPrice, deliveryPrice })

      if (this.warns.paymentMethod !== '') {
        return false
      } else {
        return true
      }
    },
    calculateAdditionalCost () {
      const payments = this.payments
      const paymentType = payments.filter(payment => payment.alias === this.paymentMethod)
      let additionalCost = 0
      if (paymentType.length) {
        additionalCost = paymentType[0].additional_cost
      }
      return additionalCost
    }
  }
}
</script>

<style scoped>

</style>
