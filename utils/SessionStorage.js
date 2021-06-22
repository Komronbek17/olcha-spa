class SessionStorage {
  static tokenKey = 'session_token'
  static tokenType = 'session_token_type'

  static saveToken (token, tokenType) {
    sessionStorage.setItem(this.tokenKey, token)
    sessionStorage.setItem(this.tokenType, tokenType)
  }

  static getToken () {
    return {
      token_type: sessionStorage.getItem(this.tokenType),
      token: sessionStorage.getItem(this.tokenKey)
    }
  }
}

export default SessionStorage
