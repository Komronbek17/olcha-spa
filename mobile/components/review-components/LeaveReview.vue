<template>
  <drawer
    :show="open"
    title="Оставьте отзыв"
    @close="close"
  >
    <div class="container mx-auto ">
      <div class="flex items-center justify-between py-6 border-b-2 border-c-gray-2">
        <img
          :src="product.main_image"
          :alt="product.main_image"
          class="mr-4 w-15 h-15"
        >
        <p class="text-base font-550 text-black">
          {{ $lang(product, 'name') }}
        </p>
      </div>
      <div class="py-6">
        <p class="font-550 text-base leading-5 text-c-gray-6 mb-2">
          Оцените товар
        </p>
        <rating
          mode="outline"
          :readonly="false"
          @change:rating="saveRating"
        />
      </div>
      <textarea
        v-model="comment"
        placeholder="Введите отзыв"
        class="rounded-xl bg-c-gray-1 w-full p-4 h-44 resize-none focus:outline-none"
      />
      <div>
        <ul v-if="uploadedImages" class="grid grid-cols-6 gap-x-4 py-4">
          <li
            v-for="image in uploadedImages"
            :key="image.index"
          >
            <img :src="image.src" :alt="image.name" class="w-12 h-12 rounded">
          </li>
        </ul>
        <label
          class="flex items-center justify-center mb-4 w-full font-bold rounded-lg bg-c-gray-1 text-c-gray-6 focus:outline-none border-0 px-4 py-2"
        >
          <input
            type="file"
            accept="image/*"
            multiple
            class="hidden"
            @change="changeFiles"
          >
          <img
            src="~/assets/icons/upload-image.svg"
            alt="upload-image.svg"
            class="mr-2"
          >
          <span>Добавить фото</span>
        </label>
        <button
          class="w-full font-bold rounded-lg bg-c-red-1 text-white focus:outline-none border-0 px-4 py-2"
          @click="submit"
        >
          Оставить отзыв
        </button>
      </div>
    </div>
    <div class="flex flex-col items-center container mt-10 hidden">
      <div class="rounded-full p-8 shadow-1 mb-10">
        <img
          src="~/assets/icons/review-star.svg"
          alt="review-star.svg"
        >
      </div>
      <p class="font-bold text-xl leading-6 text-black mb-6">
        Спасибо за ваш отзыв
      </p>
      <p class="text-base leading-5 font-550 text-c-gray-6">
        Пожалуйста подаждите несколько дней, для того что-бы наши сотрудники смогли подтвердить ваши документы
      </p>
      <nuxt-link
        :to="{ name: 'home' }"
        tag="button"
        class="w-full rounded-lg bg-c-red-1 leading-4 text-base font-bold text-white mt-10 py-3 mb-4"
      >
        На главную
      </nuxt-link>
    </div>
  </drawer>
</template>

<script>
import VueTypes from 'vue-types'
import { forEach } from 'lodash'
import Drawer from '~/mobile/reusable/Drawer'
import Rating from '~/mobile/components/partials/Rating'

export default {
  name: 'LeaveReview',
  components: { Rating, Drawer },
  props: {
    open: VueTypes.bool.def(false),
    product: VueTypes.object
  },
  data () {
    return {
      files: [],
      uploadedImages: [],
      rating: 0,
      comment: ''
    }
  },
  methods: {
    close (event) {
      this.$emit('close', event)
    },
    saveRating (e) {
      this.rating = e
    },
    changeFiles (event) {
      const files = event.target.files
      this.files = files
      forEach(files, (item, index) => {
        this.uploadedImages.push({
          src: URL.createObjectURL(item),
          index,
          name: item.name
        })
      })
    },
    submit () {
      const formData = new FormData()
      formData.append('product_id', this.product.id)
      formData.append('review', this.comment)
      formData.append('rating', this.rating)
      forEach(this.files, (file) => {
        formData.append('files[]', file)
      })
      this.$emit('save:review', formData)
    }
  }
}
</script>

<style scoped>

</style>
