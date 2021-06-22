// import { includes } from 'lodash'

export default function ({ isHMR, app, store, route, params, error, redirect }) {
  const defaultLocale = app.i18n.defaultLocale
  if (isHMR) {
    return
  }
  const locale = params.lang || defaultLocale
  // if (!includes(app.i18n.locales, ['code', locale])) {
  //   return error({ message: 'This page could not be found.', statusCode: 404 })
  // }
  // localStorage.setItem('SET_LANG', locale)
  // app.i18n.locale = localStorage.getItem('SET_LANG')
  app.i18n.locale = locale
}
