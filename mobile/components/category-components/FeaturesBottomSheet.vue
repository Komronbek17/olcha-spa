<template>
  <bottom-sheet
    :title="$lang(feature, 'name')"
    :show="show"
    :close-btn="false"
    @close="close"
  >
    <template #closeBtn>
      <button class="font-550 text-base leading-4 text-c-red-1" @click="clearCurrentFilters">
        Сбросить
      </button>
    </template>
    <ul class="grid grid-cols-1 gap-y-4 px-2">
      <label v-for="value in selectedValues" :key="value.id" class="flex items-center">
        <input
          v-model="value.selected"
          type="checkbox"
          :value="value.id"
          class="form-checkbox h-5 sm:h-6 w-5 sm:w-6 text-c-green-1 border-2 border-solid border-c-gray-3"
          @input="select(value.id)"
        >
        <p class="text-c-gray-6 text-base sm:text-lg font-font-550 ml-4">
          {{ $lang(value, 'name') }}
        </p>
      </label>
    </ul>
    <template #footer>
      <button
        class="w-full bg-c-red-1 p-3 rounded-xl text-white font-bold text-sm sm:text-base"
        @click="close"
      >
        {{ $t('id1409') }}
      </button>
    </template>
  </bottom-sheet>
</template>

<script>
import VueTypes from 'vue-types'
import { mapGetters } from 'vuex'
import { map } from 'lodash'
import BottomSheet from '~/mobile/reusable/BottomSheet'

export default {
  name: 'FeaturesBottomSheet',
  components: { BottomSheet },
  props: {
    show: VueTypes.bool.def(false),
    feature: VueTypes.object,
    productsCount: VueTypes.number
  },
  data () {
    return {
      selected: []
    }
  },
  computed: {
    selectedValues () {
      return map(this.feature.values, (item) => {
        const selected = this.hasValue(item.id)
        return {
          ...item,
          selected
        }
      })
    },
    ...mapGetters({
      values: 'filters/getFiltersById',
      hasValue: 'filters/hasFeature'
    })
  },
  watch: {
    feature: {
      immediate: true,
      handler (newVal, oldVal) {
        if (newVal !== oldVal) {
          this.selected = []
        }
      }
    }
  },
  methods: {
    close () {
      this.$emit('close', !this.show)
    },
    select (id) {
      this.$store.dispatch('filters/toggle', {
        parent: this.feature.id,
        value: id
      })
    },
    clearCurrentFilters () {
      this.$store.dispatch('filters/clearByParent', this.feature.id)
    }
  }
}
</script>

<style scoped>

</style>
