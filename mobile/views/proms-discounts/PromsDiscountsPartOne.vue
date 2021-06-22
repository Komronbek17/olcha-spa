<template>
  <div>
    <TitleContainer :title-text="$lang(blog, 'title')" />
    <div>
      <div
        class="bg-gray-100 m-auto w-screen h-60 bg-no-repeat bg-center bg-cover"
        :style="{ backgroundImage: `url('${$lang(blog, 'image')}')` }"
      />
    </div>
    <div class="mx-2">
      <!--      <FilterBySelection />-->
    </div>
    <div class="container mx-auto my-4">
      <div class="grid grid-cols-2 gap-2">
        <product-card-container
          v-for="i in 16"
          :key="i"
        />
      </div>
    </div>
  </div>
</template>

<script>
import TitleContainer from '../../reusable/TitleContainer'
// import FilterBySelection from '../../reusable/FilterBySelection'
import ProductCardContainer from '~/mobile/reusable/ProductCardContainer'
import Blog from '~/api/Blog'

export default {
  components: {
    ProductCardContainer,
    TitleContainer
    // FilterBySelection
  },
  async asyncData ({ params }) {
    return await Blog.getPromoBlog(params.alias)
      .then((res) => {
        return {
          blog: res.data.data.blog
        }
      }).catch(() => {
        return []
      })
  },
  data () {
    return {
      options: [
        'Показать все',
        'Сначала подешевле',
        'Сначала дорогие',
        'Сначала новые',
        'Сначала со скидкой'
      ]
    }
  }
}
</script>
