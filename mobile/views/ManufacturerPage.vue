<template>
  <div class="container mx-auto">
    <TitleContainer :title-text="$lang(manufacturer, 'name')" />
    <div class="grid grid-cols-1 gap-y-4">
      <div>
        <h1 class="mx-2 ml-4 font-bold text-2xl">
          Оффициальные товары
          бренда {{ $lang(manufacturer, 'name') }}
        </h1>
      </div>
      <div class="grid grid-rows-3 gap-4 grid-flow-col auto-cols-max md:auto-cols-min overflow-x-scroll">
        <manufacturer-category-cart
          v-for="category in categories"
          :key="category.id"
          :category="category"
          class="w-64"
          @on:click="pushAlias(category)"
        />
      </div>

      <div class="grid grid-rows-1 gap-4 grid-flow-col auto-cols-max md:auto-cols-min overflow-x-scroll">
        <card-banner
          v-for="banner in banners.top_banners"
          :key="banner.id"
          :banner="banner"
          class="rounded-xl"
        />
      </div>

      <div v-if="products.length > 0">
        <!--        <div class="grid grid-cols-5 gap-x-2">-->
        <!--          <dropdown-->
        <!--            class="col-span-3"-->
        <!--            :options="options"-->
        <!--          />-->
        <!--          <FilterSection-->
        <!--            class="col-span-2"-->
        <!--          />-->
        <!--        </div>-->

        <div class="grid grid-cols-2 gap-2 justify-items-stretch items-stretch mb-4">
          <product-card
            v-for="product in products"
            :key="product.id"
            :product="product"
          />
        </div>
        <div class="flex justify-center p-1.5">
          <pagination-bar
            :page-count="pagination.last_page"
            :value="pagination.current_page"
            @selected="selectPage"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TitleContainer from '../reusable/TitleContainer'
import Manufacturer from '~/api/Manufacturer'
import ManufacturerCategoryCart from '~/mobile/components/manufacturer/ManufacturerCategoryCart'
import CardBanner from '~/mobile/components/manufacturer/CardBanner'
import ProductCard from '~/mobile/components/partials/ProductCard'
import PaginationBar from '~/mobile/reusable/PaginationBar'

export default {
  name: 'ManufacturerPage',
  components: {
    PaginationBar,
    ProductCard,
    CardBanner,
    ManufacturerCategoryCart,
    TitleContainer
  },
  async asyncData ({
    params,
    $toast,
    query
  }) {
    return await Manufacturer.getManufacturer(params.alias)
      .then(async (res) => {
        const manufacturer = res.data.data.manufacturer
        const product = await Manufacturer.getProducts(params.alias, params.category, query)
          .then((res) => {
            return res.data.data
          }).catch(() => {
            return []
          })
        return {
          manufacturer,
          pagination: product.paginator,
          products: product.products,
          categories: await Manufacturer.getCategories(params.alias)
            .then((res) => {
              return res.data.data.categories
            }).catch(() => {
              return []
            }),
          banners: await Manufacturer.getBanners(params.alias)
            .then((res) => {
              return res.data.data
            }).catch(() => {
              return []
            })
        }
      }).catch((error) => {
        $toast.error(error.response.message)
        return []
      })
  },
  data () {
    return {
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
      ]
    }
  },
  methods: {
    pushAlias (category) {
      this.$router.push({
        name: 'manufacturer',
        params: {
          category: category.alias
        }
      })
    },
    async selectPage (e) {
      this.$router.push({
        name: 'manufacturer',
        params: {
          alias: this.$route.params.alias,
          category: this.$route.params.category
        },
        query: {
          page: e
        }
      })
      const product = await Manufacturer.getProducts(this.$route.params.alias,
        this.$route.params.category, { page: e })
        .then((res) => {
          return res.data.data
        }).catch(() => {
          return []
        })
      this.products = product.products
      this.pagination = product.paginator
    }
  }
}

</script>
