export function toggle ({ commit }, productId) {
  commit('TOGGLE', productId)
}

export function clear ({ commit }) {
  commit('CLEAR')
}
