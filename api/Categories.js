import Api from '~/api/core/Api'

class Categories extends Api {
  static async GET_ALL_CATEGORY () {
    return await super.get('/categories')
  }

  static async GET_PARENT_CATEGORIES () {
    const res = await super.get('/parent-categories')
    const categories = res.data.data.parent_categories
    return categories
  }

  static async GET_OFTEN_NEEDED () {
    return await super.get('/products?often_needed')
  }

  static async GET_NEW_PRODUCTS () {
    return await super.get('/products?is_new')
  }

  static async GET_INSTALLMENT_PRODUCTS () {
    return await super.get('/products?has_installment')
  }

  static async GET_INSTALLMENT_ADVANTAGE () {
    return await super.get('/products?has_installment')
  }

  static async GET_INTERESTING_PRODUCTS () {
    return await super.get('/products?is_sale')
  }

  static async GET_BLOGS () {
    return await super.get('/blogs')
  }

  static async GET_PROMS () {
    const res = await super.get('/products?has_discount')
    const { products } = res.data.data
    return products
  }

  static async getFeature (id) {
    return await super.get(`/categories/${id}/features`)
  }
}

export default Categories
