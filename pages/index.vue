<template>
  <div>
    <div v-if="$device.isMobile" />
    <div v-if="$device.isDesktop" />
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'Index',
  loading: true,
  watchQuery: ['page']

}
</script>

<style scoped>

</style>
