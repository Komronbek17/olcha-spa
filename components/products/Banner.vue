<template>
  <div class="banner-container">
    <div v-if="mainSlider.length" class="banner-left">
      <SliderTemplate
        :settings-slider="settingsSlider"
        :custom-size="customSize"
      >
        <template #default>
          <div
            v-for="(product,index) in mainSlider"
            :key="index"
          >
            <BannerCart
              :product="product"
              style="text-align:center"
            />
          </div>
        </template>
      </SliderTemplate>
    </div>
    <div class="banner-right" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SliderTemplate from './smallContainers/SliderTemplate'
import BannerCart from './smallContainers/BannerCart'
export default {
  components: {
    SliderTemplate,
    BannerCart
  },
  data () {
    return {
      // Settings Slider
      settingsSlider: {
        arrows: true,
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 500,
        autoplaySpeed: 2000,
        cssEase: 'linear'
      },
      // Custom Size
      customSize: {
        width: '50vw',
        height: '300px'
      }
    }
  },
  computed: {
    ...mapGetters(['mainSlider'])
  }
}
</script>

<style lang="scss" scoped>
.banner-container{
  display: grid;
  justify-content: center;
  align-items: center;
  grid-template-areas: 'a a a b';
  width: 100vw;
  margin: 5rem;
  align-items: center;
}
.banner-left{
  grid-area: a;
  height: 100%;
}
.banner-right{
  grid-area: b;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 100%;
  margin-left: 3rem;
  margin-right: 3rem;
  flex-grow: 1;
  color: #fff;
  background: #15159b;
}
</style>
