<template>
  <div class="flex-row">
    <InstallmentBanner />
    <DiscountTemplate />
  </div>
</template>

<script>
import InstallmentBanner from './smallContainers/InstallmentBanner'
import DiscountTemplate from './smallContainers/DiscountTemplate'
export default {
  components: {
    InstallmentBanner,
    DiscountTemplate
  }
}
</script>

<style scoped>
.flex-row{
  display: flex;
}
</style>
