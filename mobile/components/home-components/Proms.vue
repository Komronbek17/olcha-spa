<template>
  <div class="proms overflow-x-scroll">
    <div class="block-text">
      <h2 class="text-title">
        Акции
      </h2>
    </div>
    <div v-if="promoBlogs.length">
      <SliderTemplate
        :settings-slider="settingsSlider"
        :custom-size="customSize"
      >
        <template #default>
          <div
            v-for="(blog,index) in promoBlogs"
            :key="index"
            class="w-max"
          >
            <div class="mb-10 mx-2 text-center focus:outline-none">
              <NuxtLink :to="{name: 'blog/view',params:{ alias : blog.alias }}">
                <PromsCart :promo="blog" class="mx-0.5" />
              </NuxtLink>
            </div>
          </div>
        </template>
      </SliderTemplate>
    </div>
  </div>
</template>

<script>
import VueTypes from 'vue-types'
import SliderTemplate from '../../reusable/SliderTemplate'
import PromsCart from '../partials/home-partials/PromsCart'

export default {
  components: {
    PromsCart,
    SliderTemplate
  },
  props: {
    promoBlogs: VueTypes.array.def([])
  },
  data () {
    return {
      // Settings Slider
      settingsSlider: {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        focusOnSelect: true,
        swipe: true,
        swipeToSlide: true,
        autoplay: true
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
