<template>
  <div>
    <div class="cats">
      <div class="cats__text block-text max-w-md">
        <h2 class="cats__text-title text-title">
          {{ $t('id14') }}
        </h2>
        <a
          href="#"
          class="cats__text-see text-see"
        >{{ $t('id34') }}</a>
      </div>
    </div>
    <div class="grid grid-rows-3 gap-x-10 gap-5 grid-flow-col auto-cols-max md:auto-cols-min overflow-x-scroll">
      <div
        v-for="(category,index) in allCategories"
        :key="index"
      >
        <SmallRowCart :category="category" />
      </div>
    </div>
  </div>
</template>

<script>
import VueTypes from 'vue-types'
import SmallRowCart from '../../reusable/SmallRowCart'
export default {
  components: {
    SmallRowCart
  },
  props: {
    allCategories: VueTypes.array.def([])
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/customScroll.scss';
</style>
