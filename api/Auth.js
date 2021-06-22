import Api from '~/api/core/Api'

class Auth extends Api {
  static async sendSMSCode (phoneNumber) {
    return await super.post('sendsms', {
      phone: phoneNumber
    })
  }

  static async verifySMSCode (phoneNumber, smsCode) {
    return await super.post('checksms', {
      phone: phoneNumber,
      code: smsCode
    })
  }

  static async login (phoneNumber, password) {
    return await super.post('https://mobile.olcha.uz/oauth/token', {
      grant_type: process.env.GRANT_TYPES_CLIENT,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.API_SECRET,
      username: phoneNumber,
      password
    })
  }

  static async passwordRecover (phoneNumber) {
    return await super.post('password/recover', {
      phone: phoneNumber
    })
  }

  static async resetPassword (data) {
    return await super.post('password/renew', data)
  }

  static async verifyPassRecoverCode (phoneNumber, smsCode) {
    return await super.post('password/checksms', {
      phone: phoneNumber,
      code: smsCode
    })
  }
}

export default Auth
