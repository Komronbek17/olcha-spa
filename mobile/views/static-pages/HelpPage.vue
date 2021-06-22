<template>
  <div class="container mx-auto py-4">
    <TitleContainer title-text="Часто задаваемые вопросы" class="mb-6" />
    <ul class="grid grid-cols-1 gap-2 mb-6">
      <li
        v-for="item in help"
        :key="item.id"
        class="flex items-center justify-between bg-c-gray-1 rounded-lg py-3 px-4"
        @click="openDrawer = !openDrawer, faq.question = $lang(item, 'question'), faq.answer = $lang(item, 'answer')"
      >
        {{ $lang(item, 'question') }}
        <img
          src="~/assets/icons/Iconarrow-right.svg"
          alt="Iconarrow-right.svg"
        >
      </li>
    </ul>
    <p class="text-c-gray-5 font-550 text-sm leading-4 text-center px-2">
      Возникли вопросы насчет доставки? Свяжитесь с нами:
      <a
        href="tel:722022021"
        target="_blank"
        class="text-c-green-1"
      >
        72-202-202-1
      </a>
    </p>
    <drawer
      :show="openDrawer"
      title="Справка"
      @close="openDrawer = $event"
    >
      <p class="text-base font-550 text-c-gray-6 leading-5 mb-5">
        {{ faq.question }}
      </p>
      <p class="text-base font-normal text-c-gray-6 leading-5">
        {{ faq.answer }}
      </p>
    </drawer>
  </div>
</template>

<script>
import Help from '~/api/Help'
import Drawer from '~/mobile/reusable/Drawer'
import TitleContainer from '~/mobile/reusable/TitleContainer'
/* eslint-disable */
export default {
  name: 'HelpPage',
  components: {
    Drawer,
    TitleContainer
  },
  async asyncData () {
    return await Help.GET_HELP()
      .then((response) => {
        return {
          help: response.data.data.help
        }
      }).catch(err => console.log(err))
  },
  data () {
    return {
      openDrawer: false,
      faq: {
        question: '',
        answer: ''
      }
    }
  }
}
</script>

<style scoped>

</style>
