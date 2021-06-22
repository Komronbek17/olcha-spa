import SeoSingleton from '~/SEO/core/SeoSingleton'

export default ({ app }) => {
  return SeoSingleton.getInstance(app.i18n)
}
