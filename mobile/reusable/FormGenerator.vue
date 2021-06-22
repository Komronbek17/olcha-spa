<template>
  <div>
    <form>
      <input v-for="field in fields" :type="field.type" :name="field.name" :placeholder="field.placeholder">
    </form>
  </div>
</template>

<script>
export default {
  name: 'FormGenerator'
}
</script>

<style scoped>

</style>
