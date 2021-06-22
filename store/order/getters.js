export default {
  getDeliveryOrderInfo: (state) => {
    return {
      name: state.name,
      phone: state.phone,
      region_id: state.address.region,
      district_id: state.address.district,
      street: state.address.street,
      house_number: state.address.home,
      entrance: state.address.entrance,
      apartment: state.address.apartment,
      floor: state.address.level,
      payment_type: state.paymentMethod,
      checkout_type: state.deliveryType.checkout_type,
      comment: state.comment,
      delivery_id: state.deliveryType.id
    }
  },
  getPickupPointOrderInfo: (state) => {
    return {
      name: state.name,
      phone: state.phone,
      pickup_address_id: state.pickupAddress.district,
      payment_type: state.paymentMethod,
      checkout_type: 'pickup',
      comment: state.comment
    }
  }
}
