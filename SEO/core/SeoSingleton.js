class SeoSingleton {
  static i18n = null;

  static getInstance ($i18n = null) {
    if (this.i18n === null) {
      this.i18n = $i18n
    }
    return this.i18n
  }

  static get (object, property) {
    return object[property + '_' + this.i18n.locale]
  }

  static getImageURL (url = '', size) {
    if (url) {
      const regexp = /original/gi
      return url.replace(regexp, size)
    } else {
      return url
    }
  }

  static getLocal () {
    return this.i18n.locale
  }
}

export default SeoSingleton
