<template>
  <div>
    <h1>{{ $t('id1603') }}</h1>
    <div v-if="recommendedProducts.length">
      <SliderTemplate
        :settings-slider="settingsSlider"
      >
        <template #default>
          <div
            v-for="(product,index) in recommendedProducts"
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
        centerMode: true,
        centerPadding: '20px',
        focusOnSelect: true,
        infinite: true,
        slidesToShow: 5,
        speed: 500
      }
    }
  },
  computed: {
    ...mapGetters(['recommendedProducts'])
  }
}
</script>

<style lang="scss" scoped>

</style>
