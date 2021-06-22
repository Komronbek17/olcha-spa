<template>
  <div class="container mx-auto">
    <div class="m-3">
      <h1 class="mb-3 text-2xl font-bold">
        Каталог товаров
      </h1>
      <div
        class="grid grid-cols-2 gap-2 justify-items-stretch items-stretch sm:min-width-280 md:grid-cols-3 "
      >
        <CategoryCart
          v-for="category in categories"
          :key="category.id"
          :category="category"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CategoryCart from '../components/category-components/CategoryCart'
import Categories from '~/api/Categories'

export default {
  name: 'CategoryPage',
  components: {
    CategoryCart
  },
  middleware: 'authentication',
  async asyncData ({
    store
  }) {
    const categories = store.state.category.categories
    if (categories.length > 0) {
      return { categories }
    }
    return await Categories.GET_ALL_CATEGORY()
      .then((res) => {
        store.dispatch('category/add', res)
        return { categories: res }
      }).catch((err) => {
        return err
      })
  }
}
</script>
