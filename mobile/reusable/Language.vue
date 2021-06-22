<template>
  <!--  <div class="text-xs">-->
  <!--    <select class="appearance-none font-bold px-4 text-c-red-1 focus:outline-none" @change="setLang">-->
  <!--      <option ref="ru" value="ru">-->
  <!--        RU-->
  <!--      </option>-->
  <!--      <option ref="uz" value="uz">-->
  <!--        UZ-->
  <!--      </option>-->
  <!--      <option ref="oz" value="oz">-->
  <!--        OZ-->
  <!--      </option>-->
  <!--    </select>-->
  <!--  </div>-->

  <div class="flex text-xs pt-1" @click="setLang">
    <option ref="ru" value="ru" class="font-bold text-c-red-1 px-2">
      RU
    </option>
    <option ref="uz" value="uz" class="font-bold px-2">
      UZ
    </option>
    <option ref="oz" value="oz" class="font-bold px-2">
      OZ
    </option>
  </div>
</template>

<script>
export default {
  name: 'Language',
  methods: {
    setLang (event) {
      this.$i18n.locale = event.target.value
      // this.$route.params.lang = this.$i18n.locale
      // this.$router.replace({ params: { lang: this.$i18n.locale } })
      /* eslint-disable */
      for (let refProp in this.$refs) {
        this.$refs[refProp].style.color = '#000';
      }
      this.$refs[event.target.value].style.color = '#eb1537';
    },
  },
};
</script>
