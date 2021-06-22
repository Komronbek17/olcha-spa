<template>
  <div>
    <h1>Популярные товары</h1>
    <div v-if="popularProducts.length">
      <SliderTemplate
        :settings-slider="settingsSlider"
      >
        <template #default>
          <div
            v-for="(product,index) in popularProducts"
            :key="index"
          >
            <CartContainer :product="product" />
          </div>
        </template>
      </SliderTemplate>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SliderTemplate from './smallContainers/SliderTemplate'
import CartContainer from './smallContainers/CartContainer'
export default {
  components: {
    SliderTemplate,
    CartContainer
  },
  data () {
    return {
      settingsSlider: {
        arrows: true,
        dots: true,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        speed: 500,
        autoplaySpeed: 2000,
        cssEase: 'linear'
      }
    }
  },
  computed: {
    ...mapGetters(['popularProducts'])
  }
}
</script>

<style lang="scss" scoped>

</style>
