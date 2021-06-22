<template>
  <div>
    <h1>{{ $t('id14') }}</h1>
    <div v-if="categoriesProduct.length" class="flex-container">
      <SliderTemplate
        :custom-size="customSize"
        :settings-slider="settingsSlider"
      >
        <template #default>
          <div
            v-for="(product,index) in categoriesProduct"
            :key="index"
          >
            <CategoryCart :product="product" />
          </div>
        </template>
      </SliderTemplate>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SliderTemplate from './smallContainers/SliderTemplate'
import CategoryCart from './smallContainers/CategoryCart'
export default {
  components: {
    SliderTemplate,
    CategoryCart
  },
  data () {
    return {
      settingsSlider: {
        // dots: true,
        focusOnSelect: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        // slidesToScroll: 1,
        // touchThreshold: 5,
        swipeToSlide: true
      },
      customSize: {
        width: '1200px',
        height: '150px'
      }
    }
  },
  computed: {
    ...mapGetters(['categoriesProduct'])
  }
}
</script>

<style lang="scss" scoped>

.flex-container {
  display: flex;
  overflow-x: scroll;
}

/* custom scrollbar */
::-webkit-scrollbar {
  width: 0;
  height: 0;
}

::-webkit-scrollbar-track {
  background-color: transparent;
}

::-webkit-scrollbar-thumb {
  background-color: #d6dee1;
  border-radius: 20px;
  border: 6px solid transparent;
  background-clip: content-box;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #a8bbbf;
}
</style>
