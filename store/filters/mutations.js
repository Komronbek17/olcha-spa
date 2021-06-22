import { find, includes, isEmpty } from 'lodash'

export function TOGGLE (state, features) {
  const feature = find(state.features, ['value', features.value])

  if (feature) {
    state.features.splice(state.features.findIndex(item => item.value === features.value), 1)
  } else {
    state.features.push(features)
  }
}

export function ADD_PRICES (state, prices) {
  state.prices = prices
}

export function TOGGLE_MANUFACTURERS (state, id) {
  const manufacturer = includes(state.manufacturers, id)
  if (manufacturer) {
    state.manufacturers.splice(state.manufacturers.findIndex(item => item === id), 1)
  } else {
    state.manufacturers.push(id)
  }
}

export function CLEAR_BY_PARENT (state, parentID) {
  state.features
    .splice(state.features
      .findIndex(item => item.parent === parentID))
}

export function CLEAR_MANUFACTURERS (state) {
  if (!isEmpty(state.manufacturers)) {
    state.manufacturers = []
  }
}

export function CLEAR (state) {
  state.features = []
  state.prices = {}
  state.manufacturers = []
}
