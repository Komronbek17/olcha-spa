<template>
  <div class="container mx-auto h-full bg-c-gray-1 overflow-auto">
    <title-container :title-text="$t('id714')" />
    <ul class="grid grid-rows-1 grid-flow-col gap-x-2 overflow-x-scroll">
      <li
        v-for="product in products"
        :key="product.id"
        class=""
      >
        <div v-show="removeable" class="text-center">
          <button
            class="border-0 focus:outline-none bg-transparent"
            @click="removeProduct(product.id)"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M13.414 11.9998L17.707 7.70676C18.098 7.31576 18.098 6.68376 17.707 6.29276C17.316 5.90176 16.684 5.90176 16.293 6.29276L12 10.5858L7.70701 6.29276C7.31601 5.90176 6.68401 5.90176 6.29301 6.29276C5.90201 6.68376 5.90201 7.31576 6.29301 7.70676L10.586 11.9998L6.29301 16.2928C5.90201 16.6838 5.90201 17.3158 6.29301 17.7068C6.48801 17.9018 6.74401 17.9998 7.00001 17.9998C7.25601 17.9998 7.51201 17.9018 7.70701 17.7068L12 13.4138L16.293 17.7068C16.488 17.9018 16.744 17.9998 17 17.9998C17.256 17.9998 17.512 17.9018 17.707 17.7068C18.098 17.3158 18.098 16.6838 17.707 16.2928L13.414 11.9998Z"
                fill="#C1C1C1"
              />
            </svg>
          </button>
        </div>
        <compare-card
          :product="product"
          class="bg-white"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import { findIndex, flatMap, groupBy, map } from 'lodash'
import Product from '~/api/Product'
import CompareCard from '~/mobile/components/compare-components/CompareCard'
import TitleContainer from '~/mobile/reusable/TitleContainer'

export default {
  name: 'CompareProductPage',
  components: { TitleContainer, CompareCard },
  async asyncData ({ store, params, from, query }) {
    let ids
    if (from.name === 'compare') {
      const data = store.getters['compare/getProducts']
      if (data.length > 0) {
        ids = map(groupBy(data, 'category.id')[query.category], 'product_id')
      }
    } else {
      ids = map(params, (value, _) => value)
    }
    return await Product.getCompared(ids)
      .then((res) => {
        const products = map(res.data.data.products, (product) => {
          const features = {}
          flatMap(res.data.data.features, (value, key) => {
            features[key] = value[product.id] || '-'
          })
          return {
            ...product,
            features
          }
        })
        return {
          products,
          removeable: true
        }
      })
      .catch((err) => {
        return err
      })
  },
  methods: {
    removeProduct (id) {
      this.products.splice(findIndex(this.products, ['id', id]))
      this.$store.dispatch('compare/remove', id)
    }
  }
}
</script>

<style scoped>

</style>
