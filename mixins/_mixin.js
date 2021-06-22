export default {
  computed: {
    setLang () {
      const path = this.$route.path
      const langs = ['uz', 'oz', 'ru']
      let currentLang
      for (let i = 0; i < langs.length; i++) {
        const regex = new RegExp(langs[i], 'gi')
        const logic = regex.test(path)
        if (logic) {
          currentLang = langs[i]
          break
        }
      }
      if (!currentLang) {
        return 'ru'
      } else { return currentLang }
    }
  },
  methods: {
    numberFormatter (x) {
      const dollarUSLocale = Intl.NumberFormat('en-US')
      const price = dollarUSLocale.format(x)
      const res = price.toLocaleString().replace(/,/g, '  ')
      return res
    },
    getImage (url, width, height) {
      const test = /(\d{3}x\d{3})|original/g
      const image = url.toString().replace(test, `${width}x${height}`)
      return image
    },
    replaceLangUrl (lang) {
      // const langs = ['uz', 'oz', 'ru']
      // const replaceLang = routePath.toString()
      // const regex = new RegExp(lang, 'gi')
      // const logic = regex.test(replaceLang)
      // if (!logic) {
      // }
      // console.log(lang);
      // console.log(replaceLang.replace(regex, lang))
      this.$i18n.locale = lang
      const path = this.$route.path
      const langs = ['uz', 'oz', 'ru']
      let currentLang = ''
      for (let i = 0; i < langs.length; i++) {
        const regex = new RegExp(langs[i], 'gi')
        const logic = regex.test(path)
        if (logic) {
          currentLang = langs[i]
          break
        }
      }
      if (currentLang !== lang) {
        this.$router.push(path.replace(currentLang, lang))
      }
    }
  }
}
