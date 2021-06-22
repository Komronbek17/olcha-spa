<template>
  <ul class="flex items-center">
    <li class="w-11 h-11 rounded-full bg-c-gray-1 flex items-center justify-center">
      <img src="~/assets/icons/telephone.svg" alt="telephone.svg">
    </li>
    <ol class="flex items-center justify-between w-full flex-nowrap ml-3">
      <li class="flex flex-col items-start">
        <span class="font-550 text-c-gray-5 text-sm leading-4 mb-1">
          Beeline
        </span>
        <span class="text-c-gray-6 text-base leading-5 font-550">
          +998 90 442 65 81
        </span>
      </li>
      <li>
        <span class="text-c-green-1  text-base leading-5 font-550">
          +500 сум
        </span>
      </li>
    </ol>
  </ul>
</template>

<script>
export default {
  name: 'BonusListItem'
}
</script>

<style scoped>

</style>
