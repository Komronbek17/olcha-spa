export function getProducts (state) {
  return state.products
}

export function getPrice (state) {
  const products = state.products || []
  const cost = products.reduce((acc, product) => {
    return acc + product.total_price * product.qty
  }, 0)

  const discount = 0

  const paymentPrice = state.paymentPrice

  const deliveryPrice = state.deliveryPrice

  const coupon = state.coupon

  const userBonus = state.bonusDefault - state.bonus

  const total = (cost + deliveryPrice - userBonus - discount - state.coupon) * (paymentPrice + 100) / 100

  return {
    cost,
    coupon,
    discount,
    deliveryPrice,
    total
  }
}

export function couponCode (state) {
  return state.couponCode
}

export function bonusPrice (state) {
  return state.bonusDefault - state.bonus
}

export function getInstCheckoutPrice (state) {
  /* eslint-disable */
  const {
    first_fee_sum,
    inst_pay_time
  } = state.inst_checkout_info
  
  const discount = 0

  const paymentPrice = state.paymentPrice

  const deliveryPrice = state.deliveryPrice

  const userBonus = state.bonusDefault - state.bonus

  const total = (first_fee_sum + deliveryPrice - userBonus - discount) * (paymentPrice + 100) / 100

  return {
    first_fee_sum,
    inst_pay_time,
    userBonus,
    discount,
    deliveryPrice,
    paymentPrice,
    total
  }
}
