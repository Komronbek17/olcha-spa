<template>
  <div class="cart">
    <div class="slide-image">
      <img
        :src="getImage(product.main_image,100,100)"
        :alt="product['name_'+setLang]"
      >
    </div>
    <div class="product-name">
      <p>{{ product.category['name_'+setLang] }}</p>
    </div>
    <div
      class="description"
      style="white-space:true"
    >
      <p>{{ product['name_'+setLang] }}</p>
    </div>
    <div class="ratings">
      <div class="text-center">
        <v-rating
          :v-model="5"
          background-color="purple lighten-3"
          color="purple"
          small
        />
      </div>
      <div class="price">
        <p>{{ product.price }} сум</p>
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
.description,
.product-name{
  padding-left: 1rem;
  padding-right: 1rem;
  text-overflow: ellipsis;
  word-break: break-word;
   overflow: hidden;
   text-overflow: ellipsis;
   display: -webkit-box;
   line-height: 16px; /* fallback */
   max-height: 32px; /* fallback */
   -webkit-line-clamp: 2; /* number of lines to show */
   -webkit-box-orient: vertical;
}

img{
  width:100px;
}

.cart{
  padding:1rem 3rem;
  width:18vw;
  height: 100%;
}
.cart > div{
  margin:0.5rem auto;
  font-size: 0.8rem;
}

</style>
