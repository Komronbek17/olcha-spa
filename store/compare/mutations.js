import { find, findIndex } from 'lodash'

export function TOGGLE (state, product) {
  const existProduct = find(state.compared_products, ['product_id', product.id])
  if (!existProduct) {
    state.compared_products.push({
      product_id: product.id,
      product_alias: product.alias,
      category: product.category
    })
  } else {
    state.compared_products.splice(findIndex(state.compared_products, ['product_id', product.id]))
  }
}

export function REMOVE (state, id) {
  state.compared_products.splice(findIndex(state.compared_products, ['product_id', id]))
}

export function CLEAR (state) {
  state.compared_products = []
}
