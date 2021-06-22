// import Vue from 'vue'

export default ({ app }, inject) => {
  inject('aspect', (url = '', size) => {
    if (url) {
      const regexp = /original/gi
      const newUrl = url.replace(regexp, size)
      return newUrl
    } else {
      return url
    }
  }
  )
}
