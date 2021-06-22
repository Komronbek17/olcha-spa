class AxiosSingleton {
  static instance = null

  static getInstance ($axios = null) {
    if (this.instance === null) {
      this.instance = $axios
    }
    return this.instance
  }
}

export default AxiosSingleton
