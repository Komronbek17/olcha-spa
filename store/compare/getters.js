import { find } from 'lodash'

export function getProducts (state) {
  return state.compared_products
}

export function hasProduct (state) {
  return id => find(state.compared_products, ['product_id', id])
}
