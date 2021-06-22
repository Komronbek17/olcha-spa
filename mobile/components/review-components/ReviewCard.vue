<template>
  <div class="rounded-2xl bg-c-gray-1 p-4">
    <div class="flex justify-between items-center">
      <p class="font-medium mr-2 text-black text-lg leading-6 line-clamp-1">
        {{ comment.user.name }} {{ comment.user.lastname }}
      </p>
      <span class="text-sm leading-4 font-550 text-c-gray-5">
        21.06.2020
      </span>
    </div>
    <rating
      :max="5"
      :rating="comment.rating"
      class="my-2"
      size="sm"
    />
    <p class="text-black text-base leading-5 line-clamp-6">
      {{ comment.review }}
    </p>
    <ul v-if="withButtons" class="grid grid-cols-2 gap-x-2 mt-4">
      <li>
        <button
          class="flex focus:outline-none justify-center items-center py-3  px-4 bg-c-gray-2 w-full rounded-md"
          @click="setLike"
        >
          <img src="~/assets/icons/like.svg" alt="like.svg">
          <span>{{ comment.comment_rating.like }}</span>
        </button>
      </li>
      <li>
        <button
          class="flex focus:outline-none justify-center items-center py-3  px-4 bg-c-gray-2 w-full rounded-md"
          @click="setDisLike"
        >
          <img src="~/assets/icons/dislike.svg" alt="dislike.svg">
          <span>{{ comment.comment_rating.dislike }}</span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import VueTypes from 'vue-types'
import Rating from '../partials/Rating.vue'

export default {
  name: 'ReviewCard',
  components: {
    Rating
  },
  props: {
    withButtons: VueTypes.bool.def(false),
    comment: VueTypes.object
  },
  methods: {
    setLike () {
      this.$emit('set:like', this.comment.id)
    },
    setDislike () {
      this.$emit('set:disLike', this.comment.id)
    }
  }
}
</script>
