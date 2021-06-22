<template>
  <div class="flex -mt-2 -ml-2">
    <compare-card
      :class="bordered ? 'border border-c-gray-2' : 'border-0'"
      class="w-1/2 bg-white  mt-2 ml-2"
    />
    <compare-card
      :class="bordered ? 'border border-c-gray-2' : 'border-0'"
      class="w-1/2 bg-white  mt-2 ml-2"
    />
    <!-- <compare-card /> -->
    <!-- <compare-card /> -->
  </div>
</template>

<script>
import VueTypes from 'vue-types'
import CompareCard from '../components/compare-components/CompareCard'

export default {
  name: 'CompareCardContainer',
  components: {
    CompareCard
  },
  props: {
    bordered: VueTypes.bool.def(false)
  }

}
</script>
