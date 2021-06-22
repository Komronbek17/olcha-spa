<template>
  <li class="bg-c-gray-1 rounded-2xl p-4">
    <div class="mb-3 flex items-center justify-between">
      <span class="font-550 text-sm text-c-gray-5 leading-4">
        {{ notification.created_at }}
      </span>
      <button
        @click="$emit('on:click')"
      >
        <img
          src="~/assets/icons/close.svg"
          alt="close.svg"
        >
      </button>
    </div>
    <p class="font-550 text-base leading-5 text-c-gray-6">
      {{ notification.text }}
    </p>
  </li>
</template>

<script>
import VueTypes from 'vue-types'

export default {
  name: 'NotificationCard',
  props: {
    notification: VueTypes.object
  }
}
</script>

<style scoped>

</style>
