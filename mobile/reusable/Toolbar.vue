<template>
  <div class="z-10">
    <div class="py-3 px-2 bg-white">
      <div class="mx-2">
        <Language />
      </div>
      <div class="py-2 px-5 bg-white">
        <div class="flex items-center justify-between  py-1">
          <div
            class="search-input w-full rounded-lg bg-c-gray-1 px-3 py-1 mr-3 flex items-center"
          >
            <input
              v-model="search"
              class="focus:outline-none border-0 bg-transparent w-full"
              type="text"
              name="query"
              placeholder="Искать в Olcha..."
              @focusin="focused = true"
            >
            <button class=" flex items-center justify-center border-0 w-8 h-8">
              <img
                :src="require('/assets/icons/Iconsearch.svg')"
                alt=""
              >
            </button>
          </div>
          <div>
            <button v-if="!focused" class="flex items-center justify-center border-0 w-8 h-8 focus:outline-none">
              <img
                :src="require('/assets/icons/Iconbell.svg')"
                alt=""
              >
            </button>
            <button
              v-else
              class="flex items-center justify-center border-0 w-8 h-8 focus:outline-none"
              @click="focused = false"
            >
              <img
                :src="require('/assets/icons/close.svg')"
                alt=""
              >
            </button>
          </div>
        </div>
      </div>
      <div v-if="focused" class="w-screen h-screen bg-white z-50">
        <div class="container mx-auto">
          <ul v-if="result.manufacturers" class="divide-y">
            <li
              v-for="manufacturer in result.manufacturers"
              :key="manufacturer.id"
              @click="focused = false"
            >
              <category-search-card :manufacturer="manufacturer" />
            </li>
          </ul>
          <ul v-if="result.products" class="divide-y">
            <li
              v-for="product in result.products"
              :key="product.id"
              @click="focused = false"
            >
              <product-search-card :product="product" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { debounce } from 'lodash'
import CategorySearchCard from '~/mobile/components/search-components/CategorySearchCard'
import ProductSearchCard from '~/mobile/components/search-components/ProductSearchCard'
import Language from '~/mobile/reusable/Language'

export default {
  name: 'Toolbar',
  components: {
    ProductSearchCard,
    CategorySearchCard,
    Language
  },
  data () {
    return {
      focused: false,
      search: '',
      result: []
    }
  },
  watch: {
    search: {
      handler (newVal, oldVal) {
        this.debouncedLoadModel()
      }
    }
  },
  created () {
    this.debouncedLoadModel = debounce(this.getResult, 2000)
  },
  methods: {
    async getResult () {
      await this.$axios.get('/api/extra/suggestion', {
        params: {
          q: this.search
        }
      }).then((res) => {
        this.result = res.data.data
      }).catch(() => {
        return this.result
      })
    }
  }

}
</script>
