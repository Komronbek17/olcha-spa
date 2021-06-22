<template>
  <component :is="isComponent" :product="product" />
</template>

<script>
import VueTypes from 'vue-types'
import ProductCard from '../components/partials/ProductCard'
import ProductListCard from '../components/partials/ProductListCard'

export default {
  name: 'ProductCardContainer',
  components: {
    ProductCard,
    ProductListCard
  },
  props: {
    cardType: VueTypes.string.def('grid'),
    product: VueTypes.object.def({})
  },
  computed: {
    isComponent () {
      return this.cardType === 'list' ? 'ProductListCard' : 'ProductCard'
    }
  }
}
</script>
.
