<template>
  <div>
    <h1>Товары на распродаже</h1>
    <div class="grid-container">
      <div
        v-for="(product,index) in discountProducts"
        :key="index"
      >
        <DiscountCart :product="product" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import DiscountCart from './DiscountCart'
export default {
  components: {
    DiscountCart
  },
  computed: {
    ...mapGetters(['discountProducts'])
  }
}
</script>

<style lang="scss" scoped>
.grid-container{
  display: grid;
  grid-template-columns: repeat(4,minmax(200px,1fr));
  grid-gap: 1rem;
}
</style>
