<template>
  <drawer title="Фильтр" :show="openDrawer" @close="close">
    <template #header>
      <button
        class="text-xs sm:text-sm text-c-red-1 font-font-550"
        @click="clearFilters"
      >
        Сбросить фильтр
      </button>
    </template>
    <div class="filter bg-white z-10 top-0 w-full h-screen flex-col justify-between">
      <div class="w-full">
        <ul class="divide-y divide-gray-2 ">
          <li
            class="flex justify-between items-center py-4"
            @click="openPriceBottomSheet = true"
          >
            <button
              class="filter-link font-font-550 text-sm sm:text-base text-c-gray-6 focus:outline-none"
            >
              Цена
            </button>

            <p class="font-font-550 text-sm sm:text-base  text-c-orange-1 line-clamp-1">
              {{ selectedPrices }}
            </p>
          </li>
          <li
            v-for="feature in features"
            :key="feature.id"
            class="grid grid-cols-2 gap-x-2 py-4"
            @click="showFeaturesBottomSheet(feature)"
          >
            <button
              class="text-left filter-link font-font-550 text-sm sm:text-base text-c-gray-6 line-clamp-2"
            >
              {{ $lang(feature, 'name') }}
            </button>
            <p class="font-font-550 text-right text-sm sm:text-base text-c-orange-1 line-clamp-1">
              {{ selectedValues(feature.id) || 'Не указано' }}
            </p>
          </li>
          <li
            class="grid grid-cols-2 gap-x-2 py-4"
            @click="showManufacturersBottomSheet"
          >
            <button
              class="text-left filter-link font-font-550 text-sm sm:text-base text-c-gray-6 line-clamp-2"
            >
              {{ $t('id97') }}
            </button>
            <p class="font-font-550 text-right text-sm sm:text-base text-c-orange-1 line-clamp-1">
              {{ selectedManufacturers || 'Не указано' }}
            </p>
          </li>
        </ul>
      </div>
      <div class="py-6 px-4 text-center w-full">
        <button
          class="w-full bg-c-red-1 p-3 rounded-xl text-white font-bold text-sm sm:text-base"
        >
          Показать {{ productsCount }} товара
        </button>
      </div>
      <features-bottom-sheet
        :show="openFeaturesBottomSheet"
        :feature="selectedFeature"
        :products-count="productsCount"
        @close="openFeaturesBottomSheet = $event"
      />
      <manufacturers-bottom-sheet
        :show="openManufacturersBottomSheet"
        :manufacturers="manufacturers"
        @close="openManufacturersBottomSheet = $event"
      />
      <price-filter
        :show="openPriceBottomSheet"
        :clear="clearPrices"
        @select="selectPrice"
        @close="openPriceBottomSheet = $event"
      />
    </div>
  </drawer>
</template>

<script>
import VueTypes from 'vue-types'
import { mapGetters } from 'vuex'
import { filter, flatMap, join } from 'lodash'
import Drawer from '~/mobile/reusable/Drawer'
import FeaturesBottomSheet from '~/mobile/components/category-components/FeaturesBottomSheet'
import PriceFilter from '~/mobile/components/category-components/PriceFilter'
import ManufacturersBottomSheet from '~/mobile/components/category-components/ManufacturersBottomSheet'

export default {
  name: 'FilterDrawer',
  components: {
    ManufacturersBottomSheet,
    PriceFilter,
    FeaturesBottomSheet,
    Drawer
  },
  props: {
    openDrawer: VueTypes.bool.def(false),
    features: VueTypes.array,
    manufacturers: VueTypes.array,
    productsCount: VueTypes.number
  },
  data () {
    return {
      selectedFeature: {},
      openFeaturesBottomSheet: false,
      openPriceBottomSheet: false,
      openManufacturersBottomSheet: false,
      selectedPrices: 'Не указано',
      clearPrices: false
    }
  },
  computed: {
    selectedManufacturers () {
      const manufacturers = this.getManufacturers
      const selectedValues = flatMap(flatMap(manufacturers, (manufacturer) => {
        return filter(this.manufacturers, (item) => {
          return item.id === manufacturer
        })
      }), (item) => {
        return this.$lang(item, 'name')
      })
      return join(selectedValues, ', ')
    },
    ...mapGetters({
      getSelectedValues: 'filters/selectedValues',
      getManufacturers: 'filters/getManufacturers'
    })
  },
  methods: {
    close () {
      this.$emit('close', !this.openDrawer)
    },
    selectedValues (featureId) {
      const features = this.getSelectedValues(featureId)
      const selectedValues = flatMap(flatMap(features, (feature) => {
        return flatMap(this.features, (item) => {
          return filter(item.values, ['id', feature.value])
        })
      }), (item) => {
        return this.$lang(item, 'name')
      })
      return join(selectedValues, ', ')
    },

    showFeaturesBottomSheet (feature) {
      this.selectedFeature = feature
      this.openFeaturesBottomSheet = true
    },
    showManufacturersBottomSheet () {
      this.openManufacturersBottomSheet = true
    },
    showPriceBottomSheet () {
      this.openPriceBottomSheet = true
    },
    selectPrice (e) {
      this.$emit('select:price', e)
      this.selectedPrices = `От: ${e.price_min || 0} сум / До: ${e.price_max || 0} сум`
    },
    clearFilters () {
      this.$store.dispatch('filters/clear')
      this.$emit('select:price', {})
      this.clearPrices = true
      this.selectedPrices = 'Не указано'
    }
  }
}
</script>

<style scoped>

</style>
