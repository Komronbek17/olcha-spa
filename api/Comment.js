import Api from '~/api/core/Api'

class Comment extends Api {
  static async createReview (formData) {
    return await super.post('comments', formData)
  }

  static async getReviews (productId) {
    return await super.get(`products/${productId}/comments`)
  }

  static async setLike (data) {
    return await super.post('comments/like', data``)
  }

  static async setDisLike (data) {
    return await super.post('comments/dislike', data``)
  }
}

export default Comment
