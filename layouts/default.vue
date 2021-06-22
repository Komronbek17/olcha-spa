<template>
  <div class="overflow-hidden h-screen">
    <toolbar
      v-if="navPOS.showSearchBar"
      class="bg-white sticky top-0 left-0 right-0"
    />
    <div class="h-full overflow-scroll mb-40 pb-40">
      <Nuxt />
    </div>
    <bottom-navbar
      v-if="navPOS.showBottomBar"
      class="bg-white sticky bottom-0 left-0 right-0"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import BottomNavbar from '~/mobile/reusable/BottomNavbar.vue'
import Toolbar from '~/mobile/reusable/Toolbar.vue'

export default {
  name: 'Default',
  components: {
    BottomNavbar,
    Toolbar
  },
  middleware ({ store, app }) {
    const cartProducts = app.$cookies.get('cart-products') || []
    store.commit('cart/InitCartProducts', cartProducts)
  },
  computed: {
    ...mapGetters({ navPOS: 'toolbar/getNavPos' })
  }
}
</script>
