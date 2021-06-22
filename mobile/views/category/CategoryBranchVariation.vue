<template>
  <div class="container mx-auto">
    <TitleContainer :title-text="categoryName" />
    <div class=" grid grid-cols-5 gap-x-2">
      <dropdown
        class="col-span-3"
        :options="options"
        @selected="selectedValue = $event.value"
      />
      <FilterSection
        class="col-span-2"
        @open:filter-drawer="openFilterDrawer = $event"
      />
    </div>
    <div v-if="products">
      <div class="my-10 grid grid-cols-1 gap-y-4">
        <product-card-container
          v-for="product in products"
          :key="product.id"
          :product="product"
          card-type="list"
          class="relative"
        />
      </div>
      <div class="flex justify-center p-1.5">
        <pagination-bar
          :page-count="pagination.last_page"
          :value="pagination.current_page"
          @selected="page = $event"
        />
      </div>
    </div>
    <div v-else>
      <div class="flex flex-col items-center container mt-10">
        <img
          :src="require('~/assets/images/products-notfound.png')"
          alt="products-notfound.png"
        >
        <p class="font-bold text-center text-xl leading-6 text-black">
          {{ $t('id94') }}
        </p>
      </div>
    </div>
    <filter-drawer
      :features="features"
      :manufacturers="manufacturers"
      :products-count="products.length"
      :open-drawer="openFilterDrawer"
      @select:price="priceFilters = $event"
      @close="openFilterDrawer = $event"
    />
  </div>
</template>

<script>
import { find, flatMap, groupBy, mapValues } from 'lodash'
import { mapGetters } from 'vuex'
import TitleContainer from '../../reusable/TitleContainer'
import FilterSection from '../../reusable/FilterSection'
import Product from '~/api/Product'
import ProductCardContainer from '~/mobile/reusable/ProductCardContainer'
import FilterDrawer from '~/mobile/components/category-components/FilterDrawer'
import Dropdown from '~/mobile/reusable/Dropdown'
import Categories from '~/api/Categories'
import PaginationBar from '~/mobile/reusable/PaginationBar'
import Seo from '~/SEO/Seo'

const routes = {
  'installments/variation': {
    has_installment: true
  },
  'discounts/variation': {
    has_discount: true
  }
}
export default {
  name: 'CategoryBranchVariation',
  components: {
    PaginationBar,
    Dropdown,
    FilterDrawer,
    ProductCardContainer,
    TitleContainer,
    FilterSection
  },
  async asyncData ({
    params,
    store,
    route
  }) {
    await store.dispatch('filters/clear')
    const filter = routes[route.name]
    const query = route.query
    const category = params.variation
    return await Product.getFilteredProduct({
      category,
      ...filter,
      ...query
    }).then(async (res) => {
      return await Categories.getFeature(params.variation)
        .then((response) => {
          return {
            products: res.data.data.products,
            seo_settings: res.data.data.seo_settings,
            features: response.data.data.features,
            manufacturers: response.data.data.manufacturers,
            pagination: res.data.data.paginator,
            alias: params.variation
          }
        }).catch((err) => {
          return err
        })
    }).catch((err) => {
      return err
    })
  },
  data () {
    return {
      titles: {
        'installments/variation': this.$t('id1603'),
        'discounts/variation': this.$t('id114')
      },
      options: [
        {
          label: 'Сначала подешевле',
          value: 'price'
        },
        {
          label: 'Сначала дорогие',
          value: '-price'
        },
        {
          label: 'Сначала новые',
          value: '-date'
        },
        {
          label: 'Сначала со скидкой',
          value: ''
        }
      ],
      selectedValue: '',
      openFilterDrawer: false,
      page: 0,
      prices: {}
    }
  },
  head () {
    return Seo.catalog(this.seo_settings, this.$route.path)
  },
  asyncComputed: {
    async categoryName () {
      if (this.categories) {
        const category = await find(
          find(this.categories, ['alias', this.$route.params.alias]).children,
          ['alias', this.$route.params.variation]
        )
        return this.titles[this.$route.name]
          ? `${this.titles[this.$route.name]} ${this.$lang(category, 'name')}`
          : this.$lang(category, 'name')
      } else {
        const currentCategory = await Categories.GET_ALL_CATEGORY()
          .then((res) => {
            this.$store.dispatch('category/add', res)
            return find(
              find(res, ['alias', this.$route.params.alias]).children,
              ['alias', this.$route.params.variation]
            )
          }).catch((err) => {
            return err
          })
        return this.titles[this.$route.name]
          ? `${this.titles[this.$route.name]} ${this.$lang(currentCategory, 'name')}`
          : this.$lang(currentCategory, 'name')
      }
    },
    ...mapGetters({
      feature: 'filters/getFeatures',
      manufacturer: 'filters/getManufacturers',
      categories: 'category/getCategories'
    })
  },
  watch: {
    priceFilters: {
      deep: true,
      handler (newVal) {
        if (newVal) {
          this.getProducts()
        }
      }
    },
    selectedValue: {
      deep: true,
      handler (newVal) {
        if (newVal) {
          this.getProducts()
        }
      }
    },
    feature: {
      deep: true,
      handler (newVal, oldVal) {
        if (newVal.length > 0 || oldVal) {
          this.getProducts()
        }
      }
    },
    manufacturer: {
      deep: true,
      handler (newVal, oldVal) {
        if (newVal.length > 0 || oldVal) {
          this.getProducts()
        }
      }
    },
    page: {
      deep: true,
      handler (newVal) {
        if (newVal) {
          const queries = this.$route.query
          this.$router.push({
            query: {
              ...queries,
              page: newVal
            }
          })
          this.getProducts()
        }
      }
    }
  },
  methods: {
    async getProducts () {
      const {
        priceFilters,
        feature,
        page,
        manufacturer
      } = this
      const featuresValues = await mapValues(groupBy(feature, 'parent'), (item) => {
        return flatMap(item, 'value')
      })
      const query = {
        category: this.alias,
        features: featuresValues,
        ...priceFilters
      }
      if (page) {
        query.page = page
      }
      if (this.selectedValue) {
        query.sort_by = this.selectedValue
      }
      query.manufacturer = manufacturer
      return await Product.getFilteredProduct(query)
        .then((res) => {
          this.products = res.data.data.products
          this.pagination = res.data.data.paginator
          return res.data.data.products
        }).catch((err) => {
          return err
        })
    }

  }

}
</script>
