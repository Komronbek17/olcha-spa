import Api from '~/api/core/Api'

class Banner extends Api {
  static async GET_SLIDER_BANNER_TOP () {
    return await super.get('extra/sliders')
  }

  static async GET_BANNER_TOP () {
    return await super.get('mobile_advertise/top')
  }

  static async GET_BANNER_MIDDLE () {
    return await super.get('mobile_advertise/middle')
  }

  static async GET_BANNER_BOTTOM () {
    return await super.get('mobile_advertise/bottom')
  }
}

export default Banner
