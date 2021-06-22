<template>
  <keep-alive>
    <div class="z-20">
      <div>
        <!-- FORM WIZARD -->
        <form-wizard
          color="#12bf6c"
          error-color="#a94442"
          class="mb-4 mt-1"
          finish-button-text="Pay"
          @on-complete="payCommand"
        >
          <!-- FIRST STEP -->
          <tab-content :before-change="validateStepOne" icon="ti-check">
            <div class="mb-12">
              <InstCheckoutStepOne
                ref="InstCheckoutStepOne"
                :product="product"
              />
              <CheckoutStepTwo ref="checkoutStepTwo" />
            </div>
          </tab-content>
          <!-- END OF FIRST STEP -->

          <!-- SECOND STEP -->
          <tab-content icon="ti-check" :before-change="validateStepThree">
            <CheckoutStepThree ref="checkoutStepThree" />
          </tab-content>
          <!-- END OF SECOND STEP -->

          <!-- THIRD STEP -->
          <tab-content icon="ti-settings">
            <InstCheckoutStepFour />
          </tab-content>
          <!-- END OF THIRD STEP -->
        </form-wizard>
        <!-- END OF FORM WIZARD -->
      </div>
    </div>
  </keep-alive>
</template>
<script>
/* eslint-disable */
import "vue2-datepicker/index.css";
import { mapGetters, mapMutations, mapState } from "vuex";
import { FormWizard, TabContent } from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";
import InstCheckoutStepOne from "./InstCheckoutStepOne";
import CheckoutStepTwo from "../../order/CheckoutStepTwo";
import CheckoutStepThree from "../../order/CheckoutStepThree";
import InstCheckoutStepFour from "./InstCheckoutStepFour";
import Checkout from "~/api/Checkout.js";
import Installment from "~/api/Installment.js";
import Product from "~/api/Product";
import commonMixins from "~/mixins/_mixin.js";
export default {
  name: "InstallmentCheckout",
  components: {
    FormWizard,
    TabContent,
    InstCheckoutStepOne,
    CheckoutStepTwo,
    CheckoutStepThree,
    InstCheckoutStepFour
  },
  beforeRouteLeave (to, from, next) {
    this.$cookies.remove("person-name");
    this.$cookies.remove("mobile-number");
    this.$cookies.remove("checkout-comment");
    this.$cookies.remove("selected-history-address");
    this.$cookies.remove("checkout-show-new-form");
    this.$cookies.remove("checkout-delivery-address");
    this.$cookies.remove("checkout-payment-method");
    this.$cookies.remove("pickupAddress");
    this.$cookies.remove("selectOrderMethod");
    next()
  },
  beforeRouteEnter (to, from, next) {
    next((vm) => {
      vm.$cookies.remove("person-name");
      vm.$cookies.remove("mobile-number");
      vm.$cookies.remove("checkout-comment");
      vm.$cookies.remove("selected-history-address");
      vm.$cookies.remove("checkout-show-new-form");
      vm.$cookies.remove("checkout-delivery-address");
      vm.$cookies.remove("checkout-payment-method");
      vm.$cookies.remove("pickupAddress");
      vm.$cookies.remove("selectOrderMethod");
    })
  },
  async asyncData({ store, app, params }) {
    await store.dispatch("order/GET_DELIVER_HISTORY_ADDRESS");
    await store.dispatch("order/GET_PICKUP_POINT_REGIONS");
    return await Installment.getUserInstallmentOrder( params.installment_id )
      .then( async (response) => {
        const {
          first_fee_sum,
          inst_pay_time,
          product
        } = response.data.order
        
        const inst_checkout_info = {
          first_fee_sum,
          inst_pay_time
        }
        
        await store.dispatch('cart/GET_INST_CHECKOUT_INFO',inst_checkout_info)
        
        return { 
          product  
        }
      }).catch((err) => console.log(err))
  },
  mixins: [commonMixins],
  computed: {
    ...mapState("order", {
      selectOrderMethod: state => state.selectOrderMethod,
      paymentSystems: state => state.paymentSystems,
      payments: state => state.payments,
      paymentMethod: state => state.paymentMethod,
      deliveryType: state => state.deliveryType
    }),
    ...mapGetters("order", {
      getDeliveryOrderInfo: "getDeliveryOrderInfo",
      getPickupPointOrderInfo: "getPickupPointOrderInfo"
    }),
    ...mapGetters('cart',{
      couponCode: 'couponCode',
      bonusPrice:'bonusPrice'
    }),
  },
  methods: {
    validateStepOne() {
      const isFirstReady = this.$refs.InstCheckoutStepOne.validateStepOne();
      const isSecondReady = this.$refs.checkoutStepTwo.validateStepTwo();
      return isFirstReady && isSecondReady
    },
    validateStepThree() {
      return this.$refs.checkoutStepThree.validateStepThree();
    },
    async payCommand() {
      const products = [
        {
          id: this.product.id,
          qty: 1
        }
      ]

      let paymentInformation;

      if (this.selectOrderMethod.id === 1) {
        paymentInformation = {
          ...this.getDeliveryOrderInfo,
          coupon: this.couponCode,
          bonus: this.bonusPrice,
          products
        };
      } else {
        paymentInformation = {
          ...this.getPickupPointOrderInfo,
          coupon: this.couponCode,
          bonus: this.bonusPrice,
          products
        };
      }
      
      await Installment.CreateInstallmentOrder(paymentInformation)
        .then(response => {
          const order = response.data.data.order;
        
          this.$router.push({
              name: 'installment/checkout/pay',
              params: {
                order_id: order.id,
              }
          });

        })
        .catch(err => console.log(err));
    }
  }
};
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
  display: none;
}
</style>
