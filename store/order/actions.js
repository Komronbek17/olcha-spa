import Checkout from '~/api/Checkout'
/* eslint-disable */
export default {
  async GET_REGIONS ({ commit }) {
      await Checkout.GetRegions()
        .then(response => {
          commit('SET_REGIONS', response.data.data.districts)
        }).catch(err => console.log(err))
  },
  async GET_PICKUP_POINT_REGIONS ({ commit,state }) {
      await Checkout.GetPickupPointRegions()
        .then((response) => {
          const { regions } = response.data.data
          if(!state.pickupRegions.length){
            commit('SET_PICKUP_POINT_REGIONS', regions)
          }
        }).catch(err => console.log(err))
  },
  async GET_DELIVERIES({ commit } , {districtId, products}){
    await Checkout.GetDeliveryType(districtId, products)
    .then(async (response) => {
      const deliveries = response.data.data.deliveries
      commit('SET_DELIVERIES',deliveries)
    })
    .catch(err => console.log(err))
  },
  async GET_DELIVER_HISTORY_ADDRESS({ commit }){
    await Checkout.DeliverHistoryAddress()
    .then((response) => {
      const address = response.data.data.data
      commit('SET_DELIVER_HISTORY_ADDRESS',address)
    }).catch(err => console.log(err))
  }
}
