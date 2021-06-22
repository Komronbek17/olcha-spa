export default {
  SET_STATE_VAR (state, { name, value }) {
    /* eslint-disable */
    console.log(name,value)
    state[name] = value
  }
}
