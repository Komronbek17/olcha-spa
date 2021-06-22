<template>
  <div class="container mx-auto py-2">
    <div class="grid grid-cols-1 gap-y-2">
      <compare-category-card
        v-for="category in categories"
        :key="category.id"
        :category="category"
        :count="category.count"
      />
    </div>
  </div>
</template>

<script>
import { groupBy, map, take } from 'lodash'
import CompareCategoryCard from '~/mobile/components/CompareCategoryCard'

export default {
  name: 'ComparePage',
  components: { CompareCategoryCard },
  asyncData ({ store }) {
    const data = store.getters['compare/getProducts']
    if (data.length > 0) {
      const categories = map(groupBy(data, 'category.id'), (value, key) => {
        const newKey = value[0].category
        const aliases = take(map(value, 'product_alias'), 3)
        return {
          ...newKey,
          aliases,
          count: value.length
        }
      })
      return {
        categories
      }
    }
    return {
      categories: []
    }
  }
}
</script>

<style scoped>

</style>
