import Api from '~/api/core/Api'

class Blog extends Api {
  static async getPromoBlogs () {
    return await super.get('blogs/promo')
  }

  static async getPromoBlog (alias) {
    return await super.get(`blogs/${alias}`)
  }
}

export default Blog
