<template>
  <div>
    <div class="product-cart">
      <div>
        <v-img
          :src="getImage(product.image,100,100)"
        />
      </div>
      <div>
        <p style="white-space:false">
          {{ product['name_'+setLang] }}
        </p>
      </div>
    </div>
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
.product-cart{
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem;
  width: 15rem;
}
</style>
