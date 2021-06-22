import Api from '~/api/core/Api'

class Manufacturer extends Api {
  static async getAllManufacturers () {
    return await super.get('manufacturers')
  }

  static async getManufacturer (alias) {
    return await super.get(`manufacturers/${alias}`)
  }

  static async getCategories (alias) {
    return await super.get(`manufacturers/${alias}/categories`)
  }

  static async getBanners (alias) {
    return await super.get(`manufacturers/${alias}/sliders`)
  }

  static async getProducts (alias, category = '', query = {}) {
    return await super.get(`manufacturers/products/${alias}/${category}`, { params: query })
  }
}

export default Manufacturer
