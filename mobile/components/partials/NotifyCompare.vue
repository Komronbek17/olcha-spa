<template>
  <div class="flex bg-black items-center py-5 px-4 mx-5 justify-between rounded-xl absolute right-0 left-0 opacity-0">
    <p class="text-base leading-5 font-medium text-white">
      Товар добавлен в сравнение
    </p>
    <nuxt-link
      :to="{ name: 'compare' }"
      class="text-base leading-6 font-medium text-c-green-1"
    >
      Перейти
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: 'NotifyCompare'
}
</script>
