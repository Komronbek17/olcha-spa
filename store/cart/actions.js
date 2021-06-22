/* eslint-disable */
import Checkout from '~/api/Checkout'
export default {
  add ({ commit }, product) {
    commit('ADD', product)
  },
  remove ({ commit }, productId) {
    commit('REMOVE', productId)
  },
  clear ({ commit }) {
    commit('CLEAR')
  },
  async INIT_USER_BONUS ({ commit }) {
    await Checkout.GetUserBonus()
      .then((response) => {
        const bonus = parseInt(response.data.data.bonus)
        commit('SET_USER_BONUS',bonus)
      }).catch(err => console.log(err))
  },
  async GET_INST_CHECKOUT_INFO( { commit } , inst_checkout_info){
    commit('SET_INST_CHECKOUT_INFO',inst_checkout_info)
  }
}
