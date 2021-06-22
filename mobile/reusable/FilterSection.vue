<template>
  <button
    class="font-font-550 text-c-gray-6 px-4 py-2 text-xs bg-c-gray-1 rounded-lg"
    @click="showFilters"
  >
    <div class="grid grid-cols-2 text-center">
      <img
        src="~/assets/icons/icon-filter.svg"
        class="icon-filter"
      >
      <span>
        Фильтры
      </span>
    </div>
  </button>
</template>

<script>
export default {
  methods: {
    showFilters () {
      this.$emit('open:filter-drawer', true)
    }
  }
}
</script>
