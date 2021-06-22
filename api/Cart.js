import Api from '~/api/core/Api'

class Cart extends Api {
  static async GetCost (products) {
    const res = await super.post('checkout/get-cost', products)
    const { data } = res.data
    return data
  }
}

export default Cart
