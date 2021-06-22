<template>
  <div v-show="show" class="w-screen h-screen bg-black fixed left-0 top-0 right-0 z-20 bottom-0">
    <div class="relative w-full h-full">
      <div class="absolute top-0 left-0 right-0 text-left z-40">
        <button class="w-11 h-11 bg-white text-black " @click="close">
          xasa
        </button>
      </div>
      <video
        ref="video"
        autoplays
        class="absolute top-0 left-0 right-0 bottom-0 w-screen h-screen z-30"
        playsinline
      />
      <div class="absolute bottom-0 left-0 right-0 z-40">
        <div class="w-full text-center">
          <button class="w-24 h-24 border-8 border-white bg-c-gray-2 rounded-full" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueTypes from 'vue-types'

export default {
  name: 'CameraFrame',
  props: {
    show: VueTypes.bool.def(false)
  },
  data () {
    return {
      isCaptured: false
    }
  },
  watch: {
    show: {
      immediate: true,
      handler (newVal) {
        if (newVal) {
          this.getAccess()
        }
      }
    }
  },
  beforeDestroy () {
    this.disableCamera()
  },
  methods: {
    close () {
      console.log('asdasdsda')
      this.$emit('on:close', !this.show)
      this.disableCamera()
    },
    getAccess () {
      navigator.mediaDevices.getUserMedia({
        video: true
      }).then((stream) => {
        this.$refs.video.srcObject = stream
        console.log(this.$refs.video.srcObject)
      }).catch(() => {
        return false
      })
    },
    disableCamera () {
      this.$refs.video.srcObject.getVideoTracks().forEach((track) => {
        track.stop()
      })
    }
  }
}
</script>

<style scoped>

</style>
