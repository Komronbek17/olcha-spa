<template>
  <client-only>
    <VueSlickCarousel
      ref="carousel"
      v-bind="settingsSlider"
      :style="{width:customSize.width , height:customSize.height}"
    >
      <slot />
    </VueSlickCarousel>
  </client-only>
</template>
<script>
// import VueSlickCarousel from 'vue-slick-carousel'

// import 'vue-slick-carousel/dist/vue-slick-carousel.css'
// optional style for arrows & dots
// import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

export default {
  // components: {
  //   VueSlickCarousel
  // },
  props: {
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
