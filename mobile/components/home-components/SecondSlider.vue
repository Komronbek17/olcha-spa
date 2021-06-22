<template>
  <div class="banner text-center pt-2 px-4 pb-8 relative flex items-center justify-center">
    <SliderTemplate
      :settings-slider="settingsSlider"
      :custom-size="customSize"
    >
      <template #default>
        <div
          v-for="(product,index) in 5"
          :key="index"
          class="flex items-center justify-center"
        >
          <div class="electro my-10 max-w-md px-2">
            <img
              src="~/assets/images/electro-instruments.png"
              class="electro__img w-full h-full"
            >
          </div>
        </div>
      </template>
    </SliderTemplate>
  </div>
</template>

<script>
import SliderTemplate from '../../reusable/SliderTemplate'
export default {
  components: {
    SliderTemplate
  },
  data () {
    return {
      // Settings Slider
      settingsSlider: {
        arrows: false,
        dots: false,
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
        width: '90vw',
        height: 'auto'
      }
    }
  }
}
</script>
