<template>
  <div>
    <vue-clock-picker
      mode="24"
      :default-hour="defaultHour"
      :default-minute="defaultMinute"
      :on-time-change="timeChangeHandler"
    />
  </div>
</template>

<script>
import VueClockPicker from 'vue-clock-picker'

export default {
  name: 'TimePicker',
  components: {
    VueClockPicker
  },
  data () {
    return {
      defaultHour: new Date().getHours(),
      defaultMinute: new Date().getMinutes()
    }
  },
  methods: {
    timeChangeHandler (e) {
      console.log(e)
    }
  }
}
</script>

<style scoped>

</style>
