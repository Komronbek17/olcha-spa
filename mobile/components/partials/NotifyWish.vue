<template>
  <div class="flex bg-black items-center py-5 px-4 mx-5 justify-between rounded-xl absolute opacity-0">
    <p class="text-base leading-5 font-medium text-white">
      Товар добавлен в избранные
    </p>
    <nuxt-link
      :to="{ name: 'favorite' }"
      class="text-base leading-6 font-medium text-c-pink"
    >
      Закрыть
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: 'NotifyCompare'
}
</script>
