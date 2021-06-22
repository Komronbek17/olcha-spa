<template>
  <div class="outer">
    <div class="image-site">
      <img
        :src="getImage(product.main_image,150,100)"
        alt=""
      >
    </div>
    <div class="title">
      <p>{{ product['name_'+setLang] }}</p>
    </div>
    <div class="month-price">
      <p>{{ product.MR }} сум/мес</p>
    </div>
    <div class="whole-price">
      <p>{{ product.price }} сум</p>
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
.image-site img{
  width:150px;
}

.outer>div{
  margin: 0.5rem auto;
}
</style>
