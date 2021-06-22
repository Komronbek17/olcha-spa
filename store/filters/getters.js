import { filter, find, includes } from 'lodash'

export function getFiltersById (state) {
  return featureID => filter(state.features, ['value', featureID])
}

export function getFeatures (state) {
  return state.features
}

export function getManufacturers (state) {
  return state.manufacturers
}

export function getPrices (state) {
  return state.prices
}

export function hasFeature (state) {
  return valueId => !!find(state.features, ['value', valueId])
}

export function hasManufacturers (state) {
  return manufacturerId => includes(state.manufacturers, manufacturerId)
}

export function selectedValues (state) {
  return featureId => filter(state.features, ['parent', featureId])
}
