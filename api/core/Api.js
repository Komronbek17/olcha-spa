import AxiosSingleton from '~/api/core/AxiosSingleton'

class Api {
  // static _axios
  //
  // constructor () {
  //   Api._axios = AxiosSingleton.getInstance()
  // }

  static async get (url, data) {
    const _axios = AxiosSingleton.getInstance()
    return await _axios.get(url, data)
  }

  static async post (url, data) {
    const _axios = AxiosSingleton.getInstance()

    return await _axios.post(url, data)
  }

  static async put (url, data) {
    const _axios = AxiosSingleton.getInstance()

    return await _axios.put(url, data)
  }
}

export default Api
