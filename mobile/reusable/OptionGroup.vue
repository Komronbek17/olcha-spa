<template>
  <div class="option-group">
    <div
      v-for="(variation, key, index) in options"
      :key="index"
    >
      <p class="text-c-gray-5 font-medium leading-6 mb-5">
        <span class="option-name"> {{ $lang(variation, 'name') }}: </span>
        <span class="font-medium text-base text-black">
          {{ $lang(variation.defaultValue, 'name') }}
        </span>
      </p>
      <label
        v-for="value in variation.values"
        :key="value.id"
        class="w-24  mr-3 font-medium
        leading-6 text-lg text-black
        border-2 rounded-lg inline-flex
        items-center justify-center p-2"
        :for="value.id"
        :class="variation.defaultValue.id === value.id ? 'border-c-red-1' : 'border-c-gray-2'"
      >
        <input
          :id="value.id"
          v-model="selected"
          type="radio"
          :value="value.id"
          name=""
          class="hidden"
          @change="selectVariation(value)"
        >
        {{ $lang(value, 'name') }}
      </label>
    </div>
  </div>
</template>

<script>
import { filter, flatMap } from 'lodash'
import VueTypes from 'vue-types'

export default {
  name: 'OptionGroup',
  props: {
    variations: VueTypes.arrayOf(
      VueTypes.object
    ).def([{}])
  },
  data () {
    return {
      selected: '',
      selectedValue: ''
    }
  },
  computed: {
    options () {
      const data = flatMap(this.variations, (variation) => {
        const defValue = filter(variation.values, 'default')
        return {
          ...variation,
          defaultValue: defValue[0]
        }
      })
      return data
    }
  },
  watch: {
    selected: {
      handler (newVal) {
        // this.selectedValue = filter(this.options2, ['id', newVal])[0].value
      }
    }
  },
  methods: {
    selectVariation (value) {
      const variation = flatMap(this.variations, (item) => {
        return {
          feature: item.id,
          value: filter(item.values, ['id', value.id])[0].id
        }
      })
      this.$emit('selected:value', variation[0])
    }
  }
}
</script>
