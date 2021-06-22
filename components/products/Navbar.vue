<template>
  <div class="navbar">
    <btn @click="changeLang('uz')">
      Ўзб
    </btn>
    <btn @click="changeLang('oz')">
      O‘zb
    </btn>
    <btn @click="changeLang('ru')">
      Рус
    </btn>
  </div>
</template>

<script>
import myMixin from '@/mixins/_mixin'
export default {
  mixins: [myMixin],
  methods: {
    changeLang (lang) {
      this.replaceLangUrl(lang)
    }
  }
}
</script>

<style scoped>
.navbar {
  display: flex;
  /* position: absolute;
    top:1%;
    left: 1%; */
}
</style>
