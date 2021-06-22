import { findIndex, includes } from 'lodash'

export function TOGGLE (state, productId) {
  const existProduct = includes(state.compared_products, productId)
  if (!existProduct) {
    state.compared_products.push(productId)
  } else {
    state.favorites.slice(findIndex(state.favorites, productId), 1)
  }
}

export function CLEAR (state) {
  state.compared_products = []
}
