export default {
  SET_REGIONS (state, payload) {
    state.regions = payload
  },
  SET_ORDER_DETAIL (state, payload) {
    state.orderDetail = payload
  },
  SET_PICKUP_POINT_REGIONS (state, payload) {
    state.pickupRegions = payload
  },
  CHANGE_ORDER_METHOD (state, payload) {
    state.selectOrderMethod = payload
  },
  SET_PAYMENT_TYPES (state, { payments, paymentSystems }) {
    state.payments = payments
    state.paymentSystems = paymentSystems
  },
  SET_DELIVERIES (state, deliveries) {
    state.deliveries = deliveries
    state.deliveryType = deliveries[0]
  },
  SET_DELIVERY_TYPE (state, deliveryType) {
    state.deliveryType = deliveryType
  },
  SET_PAYMENT_METHOD (state, paymentMethod) {
    state.paymentMethod = paymentMethod
  },
  SET_PICKUP_INFO (state, pickupInfo) {
    state.pickupInfo = pickupInfo
  },
  SET_STEP_ONE_CHARACTERS (state, { name, phone }) {
    state.phone = phone
    state.name = name
  },
  SET_COMMENT (state, { comment }) {
    state.comment = comment
  },
  SET_DELIVERY_ADDRESS (state, { address }) {
    state.address = address
  },
  SET_PICKUP_POINT_ADDRESS (state, { pickupAddress }) {
    state.pickupAddress = pickupAddress
  },
  SET_STEP_THREE_CHARACTERS (state, { pickupAddress, address }) {
    state.pickupAddress = pickupAddress
    state.address = address
  },
  SET_DELIVER_HISTORY_ADDRESS (state, address) {
    const beginIndex = address.length > 3 ? address.length - 3 : 0
    const cutThreeAddress = address.slice(beginIndex)
    state.historyAddress = cutThreeAddress
  }
}
