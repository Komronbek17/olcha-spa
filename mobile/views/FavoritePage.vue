<template>
  <div class="bg-white h-full">
    <div v-if="products" class="container h-full mx-auto  ">
      <!--      <dropdown :options="options" />-->
      <div class="grid grid-cols-2 gap-4 mt-4">
        <product-card-container
          v-for="product in products"
          :key="product.id"
          :product="product"
        />
      </div>
    </div>
    <div v-else class="flex flex-col h-full items-center container mt-10 ">
      <img
        :src="require('~/assets/images/EmptyFavorite.svg')"
        alt=""
      >
      <p class="font-bold text-xl leading-6 text-black mb-6">
        Тут пока пусто
      </p>
      <nuxt-link
        :to="{ name: 'home' }"
        tag="button"
        class="w-full rounded-lg bg-c-red-1 leading-4 text-base font-bold text-white mt-10 py-3 mb-4"
      >
        На главную
      </nuxt-link>
    </div>
  </div>
</template>

<script>

import ProductCardContainer from '~/mobile/reusable/ProductCardContainer'
import User from '~/api/User'
// import Dropdown from '~/mobile/reusable/Dropdown'

export default {
  name: 'FavoritePage',
  components: {
    // Dropdown,
    ProductCardContainer
  },
  async asyncData ({ $auth }) {
    if ($auth.loggedIn) {
      return await User.getFavorites()
        .then((res) => {
          return {
            products: res.data.data.products
          }
        })
        .catch(() => {
          return true
        })
    }
  },
  data () {
    return {
      menuOpened: false
    }
  }
}
</script>
