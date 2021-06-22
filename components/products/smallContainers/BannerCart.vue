<template>
  <div class="banner-cart">
    <img
      :src="getImage(product.image_ru,350,200)"
      alt=""
    >
  </div>
</template>

<script>
import myMixin from '@/mixins/_mixin'
export default {
  mixins: [myMixin],
  props: {
    product: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
