<template>
  <div>
    <TitleContainer
      :title-text="$lang(category, 'name')"
    />
    <CategoryBranchContainer :child-categories="category.children" />
  </div>
</template>

<script>
import { filter } from 'lodash'
import TitleContainer from '../../reusable/TitleContainer'
import CategoryBranchContainer from '../../components/category-components/CategoryBranchContainer.vue'
import Categories from '~/api/Categories'
import Seo from '~/SEO/Seo'

export default {
  name: 'CategoryBranch',
  components: {
    CategoryBranchContainer,
    TitleContainer
  },
  async asyncData ({ store, params }) {
    const categories = store.state.category.categories
    if (categories.length > 0) {
      const category = filter(categories, ['alias', params.alias])[0]
      const seoSettings = {
        seo_description_oz: category.meta_description_oz,
        seo_description_ru: category.meta_description_ru,
        seo_description_uz: category.meta_description_uz,
        seo_keyword_oz: '',
        seo_keyword_ru: '',
        seo_keyword_uz: '',
        seo_title_oz: category.meta_title_oz,
        seo_title_ru: category.meta_title_ru,
        seo_title_uz: category.meta_title_uz
      }
      return { category, seo_settings: seoSettings }
    } else {
      return await Categories.GET_ALL_CATEGORY()
        .then((res) => {
          store.dispatch('category/add', res)
          return { category: filter(res, ['alias', params.alias])[0] }
        }).catch((err) => {
          return err
        })
    }
  },
  head () {
    return Seo.catalog(this.seo_settings, this.$route.path)
  }
}
</script>
