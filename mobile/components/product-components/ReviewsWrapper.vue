<template>
  <div>
    <div class="mb-4">
      <p class="text-lg text-black font-bold leading-6">
        {{ $t('id86') }} <span class="text-c-gray-5">( {{ comments.length || 0 }} )</span>
      </p>
      <div class="py-4 flex items-center">
        <rating
          :max="5"
          :rating="rating"
        />
        <p class="font-bold text-lg leading-6 text-black">
          {{ rating }} / 5
        </p>
      </div>
      <button
        class="w-full font-bold rounded-lg bg-c-green-1 text-white focus:outline-none border-0 px-4 py-2"
        @click="$emit('leave-review', true)"
      >
        {{ $t('id87') }}
      </button>
    </div>
    <div v-if="comments.length">
      <scroll-x class="grid grid-flow-col auto-cols-min m-0 gap-x-4">
        <review-card v-for="comment in comments" :key="comment.id" :comment="comment" />
      </scroll-x>
      <nuxt-link
        tag="button"
        :to="{
          name: 'reviews',
          params: {
            id: productId
          }
        }"
        class="mt-4 flex items-center justify-center py-2 px-4 w-full rounded-lg bg-c-gray-1 border-0 focus:outline-none"
      >
        <span class="text-base font-medium leading-5 text-black mr-2">
          {{ $t('id88') }}
        </span>
        <img
          :src="require('~/assets/icons/Iconarrow-right.svg')"
          alt=""
        >
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import VueTypes from 'vue-types'
import ReviewCard from '~/mobile/components/review-components/ReviewCard'
import Rating from '~/mobile/components/partials/Rating'
import ScrollX from '~/mobile/reusable/ScrollX'

export default {
  name: 'ReviewsWrapper',
  components: {
    ScrollX,
    Rating,
    ReviewCard
  },
  props: {
    productId: VueTypes.number,
    rating: VueTypes.oneOfType([
      VueTypes.number,
      VueTypes.string
    ]).def(0),
    comments: VueTypes.arrayOf(
      VueTypes.object
    )
  }
}
</script>

<style scoped>

</style>
