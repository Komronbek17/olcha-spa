<template>
  <div class="m-5">
    <div
      class="grid grid-cols-1 gap-y-4"
    >
      <CategoryBranchCart
        v-for="category in childCategories"
        :key="category.id"
        :category="category"
        :to="{
          name: 'category/variation',
          params: {
            alias: $route.params.alias,
            variation: category.alias
          }
        }"
      />
    </div>
    <div class="flex justify-center bg-c-gray-1 mt-6 p-1.5 rounded-lg">
      <p>Смотреть все товары</p>
    </div>
  </div>
</template>

<script>
import VueTypes from 'vue-types'
import CategoryBranchCart from '../partials/category-partials/CategoryBranchCart'

export default {
  components: {
    CategoryBranchCart
  },
  props: {
    childCategories: VueTypes.arrayOf(
      VueTypes.object
    )
  }
}
</script>
