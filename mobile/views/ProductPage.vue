<template>
  <div>
    <div v-if="product" class="bg-white ">
      <TitleContainer title-text="" />
      <div class="pb-4">
        <div v-if="product.images.length">
          <SliderTemplate
            :settings-slider="settingsSlider"
            :custom-size="customSize"
          >
            <template #default>
              <div v-for="(image, index) in product.images" :key="index" class="mx-auto">
                <img :src="$aspect(image, '410x310')" :alt="image" class="mx-auto">
              </div>
            </template>
          </SliderTemplate>
        </div>
      </div>
      <div class="container mx-auto">
        <div class="grid grid-cols-1 gap-y-6">
          <h2 class="font-bold text-2xl text-black my-4">
            {{ $lang(product, 'name') }}
          </h2>
          <option-group :variations="variations" @selected:value="getProductByVariation" />
          <product-info
            :total-price="product.total_price"
            :monthly-repayment="product.monthly_repayment"
            :short-description="$lang(product, 'short_description')"
            :has-express="product.isStock"
          />
          <div>
            <div class="flex items-center  -mt-4 -ml-4">
              <button
                class="mt-4 ml-4 flex items-center justify-center py-2 w-1/2 rounded-lg border-0 focus:outline-none"
                :class="product.is_favorite ? 'bg-c-red-1 text-white' : 'bg-c-gray-1 text-c-gray-6'"
                @click="setFavorite"
              >
                <svg
                  width="19"
                  height="16"
                  viewBox="0 0 19 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M5.3173 2.25C4.5613 2.25 3.85255 2.54225 3.3223 3.07337C2.22155 4.17587 2.22155 5.9705 3.32318 7.07475L9.4998 13.2619L15.6773 7.07475C16.7789 5.9705 16.7789 4.17587 15.6773 3.07337C14.6168 2.01025 12.7478 2.012 11.6873 3.07337L10.1193 4.644C9.7903 4.97388 9.2093 4.97388 8.8803 4.644L7.3123 3.0725C6.78205 2.54225 6.07418 2.25 5.3173 2.25ZM9.4998 15.375C9.26792 15.375 9.0448 15.2831 8.88117 15.1177L2.08417 8.31025C0.302672 6.52525 0.302672 3.62112 2.08417 1.83612C2.94517 0.975125 4.09317 0.5 5.3173 0.5C6.54142 0.5 7.6903 0.975125 8.55042 1.83612L9.4998 2.78725L10.4492 1.837C11.3102 0.975125 12.4582 0.5 13.6832 0.5C14.9064 0.5 16.0553 0.975125 16.9154 1.83612C18.6978 3.62112 18.6978 6.52525 16.9163 8.31025L10.1193 15.1186C9.9548 15.2831 9.73255 15.375 9.4998 15.375Z"
                    :fill="product.is_favorite ? '#ffffff' :'#EB1537'"
                  />
                </svg>
                <span
                  class="text-base font-medium leading-5 ml-2"
                >{{ $t('id74') }}</span>
              </button>
              <button
                class="mt-4 ml-4 flex items-center  justify-center py-2 w-1/2 rounded-lg bg-c-gray-1 border-0 focus:outline-none"
                :class="isCompared(product.id) ? 'bg-c-green-1 text-white' : 'bg-c-gray-1 text-c-gray-6'"
                @click="addToCompare"
              >
                <svg
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M5.375 9.375V8.5C5.375 7.05275 6.55275 5.875 8 5.875H8.875V2.95863C8.875 2.63663 8.61337 2.375 8.29138 2.375H2.45863C2.13663 2.375 1.875 2.63663 1.875 2.95863V8.79138C1.875 9.11337 2.13663 9.375 2.45863 9.375H5.375ZM5.375 11.125H2.45863C1.1715 11.125 0.125 10.0785 0.125 8.79138V2.95863C0.125 1.6715 1.1715 0.625 2.45863 0.625H8.29138C9.5785 0.625 10.625 1.6715 10.625 2.95863V5.875H13.25C14.6973 5.875 15.875 7.05275 15.875 8.5V13.75C15.875 15.1973 14.6973 16.375 13.25 16.375H8C6.55275 16.375 5.375 15.1973 5.375 13.75V11.125ZM7.125 8.5C7.125 8.01788 7.51788 7.625 8 7.625H13.25C13.733 7.625 14.125 8.01788 14.125 8.5V13.75C14.125 14.2321 13.733 14.625 13.25 14.625H8C7.51788 14.625 7.125 14.2321 7.125 13.75V8.5Z"
                    :fill="isCompared(product.id) ? '#ffffff' :'#EB1537'"
                  />
                </svg>
                <span
                  class="text-base font-medium leading-5 ml-2"
                >{{ $t('id711') }}</span>
              </button>
            </div>
            <nuxt-link
              tag="button"
              :to="{
                name: 'manufacturer',
                params: {
                  alias: product.manufacturer.slug
                }
              }"
              class="mt-4 flex items-center justify-center py-2 w-full rounded-lg bg-c-gray-1 border-0 focus:outline-none"
            >
              <span
                class="text-base font-medium leading-5 text-black mr-2"
              >
                {{ $t('id75') }} {{ $lang(product.manufacturer, 'name') }}
              </span>
              <img
                :src="require('~/assets/icons/Iconarrow-right.svg')"
                alt="Iconarrow-right.svg"
              >
            </nuxt-link>
          </div>
          <div class="">
            <delivery-info
              :has-stock="product.quantity !== 0"
            />
            <div class="py-8">
              <button
                class="w-full bg-c-red-1 text-base font-bold leading-5 text-white border-0 focus:outline-none rounded-lg py-3 px-4 mb-3"
                @click="addToCart(product)"
              >
                {{ $t('id81') }}
              </button>
              <nuxt-link
                v-if="product.has_installment"
                :to="{
                  name: 'product/installment',
                  params: {
                    id: product.id
                  }
                }"
                tag="button"
                class="w-full bg-c-gray-1 text-base font-bold leading-5 text-black border-0 focus:outline-none rounded-lg py-3 px-4"
              >
                {{ $t('id82') }}
              </nuxt-link>
            </div>
          </div>
          <characteristic-wrapper
            :features="features"
            :description="$lang(product, 'description') "
          />
          <div class="">
            <reviews-wrapper
              :comments="comments"
              :rating="productRating"
              :product-id="product.id"
              @leave-review="leaveReviewDrawer = $event"
            />
          </div>
        </div>
      </div>
      <notify-wish />
      <notify-compare />
      <leave-review
        :product="product"
        :open="leaveReviewDrawer"
        @close="leaveReviewDrawer = $event"
        @save:review="leaveReview"
      />
    </div>
    <div v-else>
      Product not found
    </div>

    <!-- Popup . When Product Added To Cart  -->
    <div
      v-if="isAddToCart"
      class="z-20 bg-c-gray-6 py-3 px-6 rounded-xl flex justify-between items-center fixed max-w-full left-6 right-6 bottom-48"
    >
      <p class="text-white font-font-550 text-xs">
        Товар добавлен в корзину
      </p>
      <div
        class="text-c-green-1 font-font-550 text-xs"
        @click="removeAddedProduct"
      >
        Возвращаться
      </div>
    </div>
  </div>
</template>

<script>
import { sumBy } from 'lodash'
import { mapGetters } from 'vuex'
import TitleContainer from '../reusable/TitleContainer'
import SliderTemplate from '../reusable/SliderTemplate'
import OptionGroup from '../reusable/OptionGroup'
import NotifyCompare from '../components/partials/NotifyCompare'
import NotifyWish from '../components/partials/NotifyWish'
// import AddCartNotify from '../components/partials/AddCartNotify'
import ProductInfo from '~/mobile/components/product-components/ProductInfo'
import DeliveryInfo from '~/mobile/components/product-components/DeliveryInfo'
import CharacteristicWrapper from '~/mobile/components/product-components/CharacteristicWrapper'
import ReviewsWrapper from '~/mobile/components/product-components/ReviewsWrapper'
import LeaveReview from '~/mobile/components/review-components/LeaveReview'
import Product from '~/api/Product'
import Comment from '~/api/Comment'
import Seo from '~/SEO/Seo'

export default {
  name: 'ProductPage',
  components: {
    LeaveReview,
    SliderTemplate,
    TitleContainer,
    ReviewsWrapper,
    CharacteristicWrapper,
    DeliveryInfo,
    ProductInfo,
    OptionGroup,
    NotifyCompare,
    NotifyWish
    // AddCartNotify
  },
  // middleware: 'ghost',
  async asyncData ({
    params,
    error
  }) {
    return await Product.getProduct({
      alias: params.alias
    }).then(async (res) => {
      return {
        comments: await Comment.getReviews(res.data.data.product.id)
          .then((response) => {
            return response.data.data.comments
          }).catch(() => {
            return []
          }),
        product: res.data.data.product,
        seo_settings: res.data.data.seo_settings,
        features: res.data.data.feature_groups,
        variations: res.data.data.variations
      }
    }).catch((err) => {
      if (err.status === 504) {
        error({
          statusCode: 504,
          message: ' We had a problem with our server. Try again later.'
        })
      }
      return err
    })
  },
  data () {
    return {
      // Settings Slider
      settingsSlider: {
        arrows: false,
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        speed: 500,
        autoplaySpeed: 2000,
        cssEase: 'linear',
        swipe: true,
        swipeToSlide: true,
        touchMove: true,
        dotsClass: 'product-slider-dots'
      },
      // Custom Sizea
      customSize: {
        width: '90vw',
        height: 'auto'
      },
      leaveReviewDrawer: false,
      isAddToCart: false
    }
  },
  head () {
    return Seo.product(this.seo_settings, this.product, this.$route.path)
  },
  computed: {
    productRating () {
      const comments = this.comments
      const reviewsCount = comments.length
      const totalRating = sumBy(comments, 'rating')
      return reviewsCount === 0 ? 0 : (totalRating / reviewsCount).toFixed(1)
    },
    ...mapGetters({
      isCompared: 'compare/hasProduct'
    })
  },
  watchQuery: true,
  methods: {
    async leaveReview (event) {
      this.leaveReviewDrawer = false
      if (this.$auth.loggedIn) {
        this.$nuxt.$loading.start()
        return await Comment.createReview(event)
          .then((res) => {
            this.$nuxt.$loading.finish()
            this.comments.push(res.data.data.comment)
          }).catch(() => {
            this.$nuxt.$loading.finish()
          })
      }
    },
    async getProductByVariation (ids) {
      this.$nuxt.$loading.start()
      await Product.getProductByVariation({
        product_id: this.product.parent_product,
        options: [
          {
            value_id: ids.value,
            feature_id: ids.feature
          }
        ]
      }).then((res) => {
        this.$nuxt.$loading.finish()
        this.$router.push(res.data.data.product.alias)
      }).catch(() => {
        this.$nuxt.$loading.finish()
      })
    },
    async setFavorite () {
      if (this.$auth.loggedIn) {
        await Product.setFavorite(this.product.id)
          .then((res) => {
            this.product.is_favorite = !this.product.is_favorite
            this.$toast.success(res.data.message)
          }).catch((error) => {
            this.$toast.error(error.data.message)
          })
      }
    },
    addToCart () {
      this.activateAddingPopup()
      this.$store.dispatch('cart/add', this.product)
    },
    activateAddingPopup () {
      this.isAddToCart = true
      setTimeout(() => {
        this.isAddToCart = false
      }, 3000)
    },
    removeAddedProduct () {
      this.isAddToCart = false
      this.$store.commit('cart/REMOVE', this.product.id)
    },
    addToCompare () {
      this.activateAddingPopup()
      this.$store.dispatch('compare/toggle', this.product)
    }
  }
}
</script>

<style lang="scss">
.product-slider-dots {
  display: flex !important;
  justify-content: center;
  margin: 0;
  padding: 1rem 0;
  list-style-type: none;

  ul {
    display: flex;
  }

  li {
    margin: 0 0.25rem;
    outline: none;
  }

  button {
    display: block;
    width: 0.5rem;
    height: 0.5rem;
    padding: 0;
    border: none;
    border-radius: 100%;
    background-color: #e0e0e0;
    text-indent: -9999px;
    outline: none;
  }

  button:focus {
    outline: none;
  }

  li.slick-active button {
    background-color: red;
    outline: none;
    border: none;
  }
}
</style>
