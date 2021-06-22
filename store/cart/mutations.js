/* eslint-disable */
export default {
  InitCartProducts (state, products) {
    state.products = products
  },

  SET_USER_BONUS (state, bonus) {
    state.bonus = bonus
    state.bonusDefault = bonus
  },

  ACTIVATE_USER_BONUS (state, { bonusUsage }) {
    state.bonus = state.bonus - bonusUsage
  },

  BACKUP_BONUS_USAGE_PRICE (state, backupPrice) {
    state.bonus = state.bonus + backupPrice
  },

  INIT_COUPON (state) {
    state.coupon = 0
  },

  ADD (state, product) {
    // let validate = Cart.GetCost()
    const products = this.$cookies.get('cart-products')
      ? this.$cookies.get('cart-products')
      : []
    const existProduct = products.findIndex(
      storeProduct => storeProduct.id === product.id
    )
    const {
      /* eslint-disable */
            main_image,
            id,
            name_uz,
            name_ru,
            name_oz,
            total_price,
            discount_price
        } = product;

        if (existProduct === -1) {
            const data = {
                main_image,
                id,
                name_uz,
                name_ru,
                name_oz,
                total_price,
                discount_price,
                qty: 1
            };
            products.push(data);
            this.$cookies.set("cart-products", JSON.stringify(products), {
                path: "/",
                maxAge: 60 * 60 * 24 * 7
            });
            state.products = this.$cookies.get("cart-products");
        }
    },

    REMOVE(state, productId) {
        const products = this.$cookies.get("cart-products");
        const existProduct = products.findIndex(
            storeProduct => storeProduct.id === productId
        );
        if (existProduct !== -1) {
            const changedPro = products.filter(product => product.id !== productId);
            this.$cookies.set("cart-products", JSON.stringify(changedPro), {
                path: "/",
                maxAge: 60 * 60 * 24 * 7
            });
            state.products = changedPro;
        }
    },

    changedQty(state, { productId, qty }) {
        const products = this.$cookies.get("cart-products");
        const index = products.findIndex(
            storeProduct => storeProduct.id === productId
        );
        products[index].qty = qty;
        state.products = products;
        /* eslint-disable */
        console.log(products);

        this.$cookies.set("cart-products", JSON.stringify(products), {
            path: "/",
            maxAge: 60 * 60 * 24 * 7
        });
    },

    ADD_COUPON(state, coupon) {
        const products = state.products || [];
        const cost = products.reduce((acc, product) => {
            return acc + product.total_price * product.qty;
        }, 0);

        if (coupon === 400) {
            state.coupon = 0;
        } else {
            if (coupon.apply_discount === "amount") {
                state.coupon = coupon.value;
                state.couponCode = coupon.code;
            }
            if (coupon.apply_discount === "percent") {
                state.coupon = (cost * coupon.value) / 100;
                state.couponCode = coupon.code;
            }
        }
        console.log("state.coupon", state.coupon);
    },

    SET_ADDITIONAL_PRICE(state, { deliveryPrice, paymentPrice }) {
        state.deliveryPrice = deliveryPrice;
        state.paymentPrice = paymentPrice;
    },
    
    CLEAR(state) {
        state.products = [];
        this.$cookies.remove("cart-products");
    },
    
    SET_INST_CHECKOUT_INFO(state,inst_checkout_info){
        state.inst_checkout_info = inst_checkout_info
    }
}