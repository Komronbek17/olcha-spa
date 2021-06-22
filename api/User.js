import Api from '~/api/core/Api'

class User extends Api {
  static async register (data) {
    return await super.post('register', data)
  }

  static async getProfileData () {
    return await super.get('user/profile')
  }

  static async updateProfileData (data) {
    return await super.post('users', data)
  }

  static async updateProfilePassword (data) {
    return await super.post('users/password', data)
  }

  static async getOrders () {
    return await super.get('user/orders/active')
  }

  static async trackOrder (id) {
    return await super.get(`user/order/${id}`)
  }

  static async getFavorites () {
    return await super.get('favorites')
  }

  static async getBonuses () {
    return await super.get('user/bonus')
  }

  static async getNotifications () {
    return await super.get('user/notifications')
  }

  static async getUserAddresses () {
    return await super.get('user/address')
  }

  static async getRegions () {
    return await super.get('user/address/form ')
  }

  static async getDistricts (id) {
    return await super.get('order/districts',
      {
        params: {
          region_id: id
        }
      }
    )
  }

  static async updateAddress (id, data) {
    return await super.put(`user/address/update/${id}`, data)
  }

  static async deleteAddress (id) {
    return await super.get(`user/address/delete/${id}`)
  }

  static async feedback (data) {
    return await super.post('feedback', data)
  }

  static async deleteNotify (id) {
    return await super.get(`user/notifications/${id}/delete`)
  }

  static async getHistoryViews () {
    return await super.get('history')
  }
}

export default User
