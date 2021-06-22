<template>
  <div class="often-needed">
    <div class="left-side" />
    <div class="right-side">
      <h1>{{ $t('id18') }}</h1>
      <div v-if="oftenNeeded.length">
        <SliderTemplate
          :custom-size="customSize"
          :settings-slider="settingsSlider"
        >
          <template #default>
            <div
              v-for="(product,index) in oftenNeeded"
              :key="index"
            >
              <CartContainer :product="product" />
            </div>
          </template>
        </SliderTemplate>
      </div>
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
        dots: true,
        focusOnSelect: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1
      },
      customSize: {
        width: '700px',
        height: '300px'
      }
    }
  },
  computed: {
    ...mapGetters(['oftenNeeded'])
  }
}
</script>

<style scoped>
.often-needed{
    height: 300px;
    width: 100%;
    display: grid;
    grid-template-areas: 'a b';
}
.right-side{
    grid-area: b;
    margin-left: 1rem;
}
.left-side{
    grid-area: a;
    background: rgb(34, 69, 224);
}
</style>
