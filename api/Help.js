import Api from '~/api/core/Api'

class Help extends Api {
  static async GET_HELP () {
    return await super.get('/help')
  }
}

export default Help
