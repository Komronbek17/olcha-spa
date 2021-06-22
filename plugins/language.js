import Vue from 'vue'

export default ({ app }, inject) => {
  inject('lang', (obj, attr) => {
    return Vue.observable(obj[attr + '_' + app.i18n.locale])
  }
  )
  //   context.$lang = (obj, attr) => obj[attr + '_' + i18n.locale]
}
