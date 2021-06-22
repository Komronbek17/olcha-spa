<template>
  <div class="news2 my-3 w-max">
    <h2 class="news2__title text-title mb-4">
      {{ $t('id19') }}
    </h2>
    <div v-if="blogs.length">
      <SliderTemplate
        :settings-slider="settingsSlider"
        :custom-size="customSize"
      >
        <template #default>
          <div
            v-for="(blog,index) in blogs"
            :key="index"
            class="w-max"
          >
            <div class="flex items-center justify-center">
              <NuxtLink :to="{name: 'blog/view',params:{ alias : blog.alias }}">
                <NewsCart :blog="blog" class="mx-0.5" />
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
import NewsCart from '../../reusable/NewsCart'

export default {
  components: {
    NewsCart,
    SliderTemplate
  },
  props: {
    blogs: VueTypes.array.def([])
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
        cssEase: 'linear',
        swipe: true,
        swipeToSlide: true,
        touchMove: true
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

<style scoped>
@import '@/assets/scss/hideScroll.scss';
</style>
