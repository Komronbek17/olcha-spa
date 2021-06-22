<template>
  <div
    class="banner text-center pt-2 px-4 flex items-center justify-center"
  >
    <div v-if="sliders.length">
      <SliderTemplate
        :settings-slider="settingsSlider"
        :custom-size="customSize"
        class="rounded-2xl h-auto w-full"
      >
        <template #default>
          <div
            v-for="(product, index) in sliders"
            :key="index"
            class="rounded-2xl"
          >
            <img
              class="mx-auto w-80"
              :src="$lang(product,'image')"
              alt="sale50"
              data-not-lazy
            >
          </div>
        </template>
      </SliderTemplate>
    </div>
  </div>
</template>

<script>
import VueTypes from 'vue-types'
import SliderTemplate from '../../reusable/SliderTemplate'
export default {
  components: {
    SliderTemplate
  },
  props: {
    sliders: VueTypes.array.def([])
  },
  data () {
    return {
      // Settings Slider
      settingsSlider: {
        arrows: false,
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 500,
        autoplaySpeed: 2000,
        cssEase: 'linear',
        dotsClass: 'custom-slick'
      },
      // Custom Size
      customSize: {
        width: '90vw',
        height: 'auto'
      }
    }
  }
}
</script>

<style>
@import '~/assets/css/home-main-slider.css';
</style>
