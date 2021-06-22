import Api from '~/api/core/Api'

class Installment extends Api {
  static async checkUser () {
    return await super.get('installment/profile/is-validated')
  }

  static async installmentStepFirst (data) {
    return await super.post('installment/profile/step-by-step/first', data)
  }

  static async installmentStepSecond (data) {
    return await super.post('installment/profile/step-by-step/second', data)
  }

  static async installmentStepFour (data) {
    return await super.post('installment/profile/step-by-step/four', data)
  }

  static async installmentStepFifth (data) {
    return await super.post('installment/profile/step-by-step/five', data)
  }

  static async deleteCard () {
    return await super.get('installment/profile/step-by-step/five/delete')
  }

  static async sendVerifyCode (data) {
    return await super.post('installment/verify-number', data)
  }

  static async verifyCode (data) {
    return await super.post('installment/verify-number-check', data)
  }

  static async getStep (step) {
    return await super.get(`installment/profile/step-by-step/${step}`)
  }

  static async getCurrentStep () {
    return await super.get('installment/profile/get-step')
  }

  static async getInstallmentValidation () {
    return await super.get('installment/profile/is-validated')
  }

  static async CreateInstallmentOrder (data) {
    return await super.post('installment/checkout', data)
  }

  static async createRequest (data) {
    return await super.post('installment/request', data)
  }

  static async getUserInstallmentOrder (installmentId) {
    return await super.get(`/user/installment/${installmentId}`)
  }
}

export default Installment
