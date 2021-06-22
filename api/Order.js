import Api from '~/api/core/Api'

class Order extends Api {
  static async getAllOrders () {
    return await super.get('user/orders/all')
  }

  static async getActiveOrders (query) {
    return await super.get('user/orders/active', { params: query })
  }

  static async getCompleteOrders (query) {
    return await super.get('user/orders/complete', { params: query })
  }

  static async getInstallmentOrders (query) {
    return await super.get('user/installments', { params: query })
  }

  static async getInstallmentGraph (id) {
    return await super.get(`user/installment/${id}`)
  }
}

export default Order
