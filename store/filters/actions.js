export function toggle ({ commit }, payload) {
  commit('TOGGLE', payload)
}

export function addPrices ({ commit }, payload) {
  commit('ADD_PRICES', payload)
}

export function addManufacturers ({ commit }, payload) {
  commit('TOGGLE_MANUFACTURERS', payload)
}

export function clearByParent ({ commit }, payload) {
  commit('CLEAR_BY_PARENT', payload)
}

export function clearManufacturers ({ commit }) {
  commit('CLEAR_MANUFACTURERS')
}

export function clear ({ commit }) {
  commit('CLEAR')
}
