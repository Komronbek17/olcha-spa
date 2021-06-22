import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  createPersistedState({
    key: 'compare',
    paths: ['compare.compared_products']
  })(store)
}
