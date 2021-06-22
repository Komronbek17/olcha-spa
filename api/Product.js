import Api from '~/api/core/Api'

class Product extends Api {
  static async getProduct (query) {
    return await super.get('/products/view', { params: query })
  }

  static async getProductByVariation (data) {
    return await super.post('/products/variation', data)
  }

  static async getFilteredProduct (query) {
    return await super.get('/products', { params: query })
  }

  static async getCompared (ids) {
    return await super.get('/products/compare', {
      params: {
        products: ids
      }
    })
  }

  static async setFavorite (productId) {
    return await super.get(`/favorites/${productId}`)
  }
}

export default Product
