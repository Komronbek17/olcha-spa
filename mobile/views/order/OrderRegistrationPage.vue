<template>
  <keep-alive>
    <div class="z-20">
      <div>
        <!-- FORM WIZARD -->
        <form-wizard
          color="#12bf6c"
          error-color="#a94442"
          class="mb-4"
          finish-button-text="Pay"
          @on-complete="payCommand"
        >
          <!-- FIRST STEP -->

          <tab-content :before-change="validateStepOne" icon="ti-check">
            <CheckoutStepOne ref="checkoutStepOne" />
          </tab-content>

          <!-- END OF FIRST STEP -->

          <!-- SECOND STEP -->
          <tab-content :before-change="validateStepTwo" icon="ti-check">
            <CheckoutStepTwo ref="checkoutStepTwo" />
          </tab-content>
          <!-- END OF SECOND STEP -->

          <!-- eslint-disable -->

          <!-- THIRD STEP -->
          <tab-content icon="ti-check" :before-change="validateStepThree">
            <CheckoutStepThree ref="checkoutStepThree" />
          </tab-content>

          <!-- END OF THIRD STEP -->

          <!-- FOURTH STEP -->
          <tab-content icon="ti-settings">
            <CheckoutStepFour />
          </tab-content>
          <!-- END OF FOURTH STEP -->
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
import CheckoutStepOne from "./CheckoutStepOne";
import CheckoutStepTwo from "./CheckoutStepTwo";
import CheckoutStepThree from "./CheckoutStepThree";
import CheckoutStepFour from "./CheckoutStepFour";
import Checkout from "~/api/Checkout.js";
import commonMixins from "~/mixins/_mixin.js";
export default {
  name: "OrderRegistrationPage",
  components: {
    FormWizard,
    TabContent,
    CheckoutStepOne,
    CheckoutStepTwo,
    CheckoutStepThree,
    CheckoutStepFour
  },
  async asyncData({ store, app }) {
    if (app.$auth.loggedIn) {
      store.dispatch("cart/INIT_USER_BONUS");
      await store.dispatch("order/GET_DELIVER_HISTORY_ADDRESS");
      await store.dispatch("order/GET_PICKUP_POINT_REGIONS");
    }
  },
  beforeRouteLeave(to, from, next) {
    this.$cookies.remove("person-name");
    this.$cookies.remove("mobile-number");
    this.$cookies.remove("checkout-comment");
    this.$cookies.remove("selected-history-address");
    this.$cookies.remove("checkout-show-new-form");
    this.$cookies.remove("checkout-delivery-address");
    this.$cookies.remove("checkout-payment-method");
    this.$cookies.remove("pickupAddress");
    this.$cookies.remove("selectOrderMethod");
    next();
  },
  mixins: [commonMixins],
  computed: {
    ...mapState("cart", {
      products: state => state.products
    }),
    ...mapState("order", {
      selectOrderMethod: state => state.selectOrderMethod,
      paymentSystems: state => state.paymentSystems,
      payments: state => state.payments,
      paymentMethod: state => state.paymentMethod,
      deliveryType: state => state.deliveryType
    }),
    ...mapGetters("cart", {
      getPrice: "getPrice",
      couponCode: "couponCode",
      bonusPrice: "bonusPrice"
    }),
    ...mapGetters("order", {
      getDeliveryOrderInfo: "getDeliveryOrderInfo",
      getPickupPointOrderInfo: "getPickupPointOrderInfo"
    })
  },
  watch: {
    // 'selectOrderMethod.id' (last) {
    //   console.log(last)
    // },
    // pickupPointTime (last) {
    //   if (last != null) {
    //     this.warns.pickupPointTime = ''
    //   } else {
    //     this.warns.pickupPointTime = 'Iltimos olib ketish sanasini tanlang'
    //   }
    //   /* eslint-disable */
    //   const time = new Date(last)
    //   const date=time.getDate() < 10 ? `0${time.getDate()}` : time.getDate()
    //   const month = time.getMonth() < 10 ? `0${time.getMonth()}` : time.getMonth()
    //   const year = time.getFullYear()
    //   console.log(`${date}.${month}.${year}`);
    // },
  },
  methods: {
    ...mapMutations({
      setOrderDetail: "order/SET_ORDER_DETAIL",
      clearCartProducts: "cart/CLEAR"
    }),
    validateStepOne() {
      return this.$refs.checkoutStepOne.validateStepOne();
    },
    validateStepTwo() {
      console.log(this.$refs.checkoutStepTwo.validateStepTwo());
      return this.$refs.checkoutStepTwo.validateStepTwo();
    },
    validateStepThree() {
      return this.$refs.checkoutStepThree.validateStepThree();
    },
    async payCommand() {
      const products = this.products.map(product => {
        return {
          id: product.id,
          qty: product.qty
        };
      });

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
      
      await Checkout.CreateNewOrder(paymentInformation)
        .then((response) => {
          // clear cart products
          this.$cookies.remove('cart-products')
          
          const order = response.data.data.order
          const paymentType =
            this.paymentSystems.some(paymentSys =>
              paymentSys.alias.toLowerCase() === this.paymentMethod.toLowerCase()
            )

            if (paymentType) {
              this.$router.push({
                name: 'pay',
                params: {
                  order_id: order.id,
                  order

                }
              })
            } else {
              this.$router.push({
                name: 'success',
                params: {
                  order,
                }
              })
            }
        }).catch(err => console.log(err))
    }
  }
};
</script>

<style>
@import "~/assets/css/vue-form-wizard.css";
</style>
