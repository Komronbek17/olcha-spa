export default async function ({ $auth }) {
  if ($auth.loggedIn) {

  } else {
    return await $auth.loginWith('getToken', {
      data: {
        grant_type: process.env.GRANT_TYPES_GHOST,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.API_SECRET
      }
    })
  }
}
