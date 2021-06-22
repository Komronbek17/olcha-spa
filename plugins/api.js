import AxiosSingleton from '~/api/core/AxiosSingleton'

export default function ({ $axios }) {
  console.log($axios)
  return AxiosSingleton.getInstance($axios)
}
