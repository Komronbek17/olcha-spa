<template>
  <div
    v-if="loading"
    class="z-50 fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center"
    :value="overlay"
  >
    <div class="sk-chase">
      <div class="sk-chase-dot" />
      <div class="sk-chase-dot" />
      <div class="sk-chase-dot" />
      <div class="sk-chase-dot" />
      <div class="sk-chase-dot" />
      <div class="sk-chase-dot" />
    </div>
  </div>

  <!--  <div class="example">-->
  <!--    <div class="sk-bounce">-->
  <!--      <div class="sk-bounce-dot"></div>-->
  <!--      <div class="sk-bounce-dot"></div>-->
  <!--    </div>-->
  <!--  </div>-->
</template>

<script>
export default {
  name: 'Loader',
  data () {
    return {
      loading: false,
      overlay: false
    }
  },
  methods: {
    start () {
      this.loading = true
      this.overlay = true
    },
    finish () {
      this.loading = false
      this.overlay = false
    },
    fail () {
      // console.log(error);
    },
    increase () {
      // console.log(num)
    }
  }
}
</script>

<style scoped>

</style>
