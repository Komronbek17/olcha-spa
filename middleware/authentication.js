export default function (context) {
  console.log('is middleware')
  context.userAgent = process.server
    ? context.req.headers['user-agent']
    : navigator.userAgent
}
