import qs from 'qs'

export default function ({
  $axios
}) {
  $axios.onRequest((config) => {
    config.paramsSerializer = (params) => {
      return qs.stringify(params, {
        arrayFormat: 'indices',
        skipNulls: true
      })
    }
    return config
  })
  $axios.onResponse((response) => {
    return response
  })
}
