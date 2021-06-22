<template>
  <div class="cats__card flex w-80 items-center justify-center bg-c-gray-1 rounded-lg">
    <img
      :src="category.main_image"
      class="cats__card-img w-20"
    >
    <p class="cats__card-text text-base text-c-gray-6 py-3 pr-4 pl-2 font-550">
      {{ $lang(category,'name') }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    category: {
      type: Object,
      required: true,
      default () {
        return {}
      }
    }
  }
}
</script>
