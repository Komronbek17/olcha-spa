<template>
  <div>
    <div class="vue-slick-outer">
      <vue-slick-carousel
        v-if="accordingItems.length"
        ref="carousel"
        v-bind="settingsSlider"
        :style="{width:customSize.width , height:customSize.height}"
        class="vue_carousel"
      >
        <slot />
      </vue-slick-carousel>
    </div>
  </div>
</template>
<script>
import VueSlickCarousel from 'vue-slick-carousel'

import 'vue-slick-carousel/dist/vue-slick-carousel.css'
// optional style for arrows & dots
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
export default {
  components: {
    VueSlickCarousel
  },
  props: {
    // According Items
    accordingItems: {
      type: Array,
      required: true,
      default () {
        return []
      }
    },
    // Settings Slider
    settingsSlider: {
      type: Object,
      required: true,
      default () {
        return {
          arrows: true,
          dots: true,
          infinite: true,
          slidesToShow: 3,
          slidesToScroll: 1,
          autoplay: true,
          speed: 2000,
          autoplaySpeed: 2000,
          cssEase: 'linear'
        }
      }
    },
    // Custom Size
    customSize: {
      type: Object,
      default () {
        return {
          width: '90vw',
          height: 'auto'
        }
      }
    }
  }
}
</script>

<style lang="scss">
.slick-next:before,
.slick-prev:before {
  color: crimson;
  font-size: 30px;
}

.vue_carousel{
  text-align: center;
  margin: 1rem auto;
  width: 80vw;
}

.slick-prev,
.slick-next {
  position: absolute;
  display: block;
  height: 20px;
  width: 30px;
  line-height: 0px;
  font-size: 0px;
  cursor: pointer;
  background: transparent;
  color: transparent;
  top: 50%;
  margin-top: -10px;
  padding: 0;
  border: none;
  outline: none;
}
</style>
