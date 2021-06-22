export function toggle ({ commit }, productId) {
  commit('TOGGLE', productId)
}

export function remove ({ commit }, productId) {
  commit('REMOVE', productId)
}

export function clear ({ commit }) {
  commit('CLEAR')
}
