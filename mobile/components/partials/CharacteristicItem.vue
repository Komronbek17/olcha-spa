<template>
  <div>
    <h2 class="text-c-gray-6 font-bold text-32px">
      {{ $lang(feature, 'name') }}
    </h2>
    <ul class="w-full px-3">
      <li
        v-for="(value, index) in feature.features"
        :key="index"
        class="grid grid-cols-2 gap-x-2 list-none py-2 border-b border-dashed border-c-gray-2"
      >
        <p class="text-c-gray-6 text-sm text-left">
          {{ $lang(value.feature, 'name') }}
        </p>
        <p class="text-c-gray-6 text-sm text-right">
          {{ $lang(value.value, 'name') }}
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
import VueTypes from 'vue-types'

export default {
  name: 'CharacteristicItem',
  props: {
    feature: VueTypes.object
  }
}
</script>

<style scoped>

</style>
