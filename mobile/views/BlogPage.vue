<template>
  <div class=" font-helvetica">
    <title-container :title-text="$lang(blog, 'title')" />
    <main class="container mx-auto">
      <div
        class="bg-gray-100 m-auto h-60 bg-no-repeat bg-center bg-cover rounded-3xl"
        :style="{ backgroundImage: `url('${ $lang(blog, 'image') }' )` }"
      />
      <div class="bg-c-gray-1 py-3 px-4 rounded-lg w-max my-4 flex">
        <img
          src="~/assets/icons/icon-eye.svg"
          class="w-4"
        >
        <p class="text-sm font-font-550 text-c-gray-5 ml-2 mr-4">
          {{ blog.view_amount }}
        </p>
        <!--        <img-->
        <!--          src="~/assets/icons/icon-date.svg"-->
        <!--          class="w-4"-->
        <!--        >-->
        <!--        <p class="text-sm font-font-550 text-c-gray-5 ml-2">-->
        <!--          02.10.20-->
        <!--        </p>-->
      </div>
      <div class="max-w-3xl">
        <h3 class="text-c-gray-6 font-bold text-2xl">
          {{ $lang(blog, 'title') }}
        </h3>
        <!-- eslint-disable -->
        <p class="text-c-gray-6 text-base mt-4 mb-6" v-html="$lang(blog, 'description')" />
        <p class="bg-c-gray-1 py-6 px-4 rounded-2xl text-c-gray-6 text-base font-font-550 mt-6 mb-8">
          Возможность подключить VK Donut в любом сообществе появится в ближайшие дни, отмечают в пресс-службе
          ВКонтакте.
        </p>
      </div>
      <!--      <div class="mt-14 mb-10 w-max">
              <h2 class="mb-4 text-c-gray-6 font-bold text-2xl">
                Новости
              </h2>
              <div class="flex">
                <div class="relative mr-4">
                  <img
                    src="@/assets/images/news.png"
                    class=""
                    width="322"
                  >
                  <div class="p-4 absolute top-0 flex flex-col justify-center">
                    <p class="text-sm text-c-gray-2 opcity-70 font-font-550">
                      Смартфоны
                    </p>
                    <p class="text-xl text-white font-bold mt-2 mb-4">
                      Продолжаем знакомство с телефонами Samsung!
                    </p>
                    <p class="text-sm text-c-gray-2 opcity-70 font-font-550">
                      05.02.20
                    </p>
                  </div>
                </div>
                <div class="relative">
                  <img
                    src="@/assets/images/news.png"
                    class=""
                    width="322"
                  >
                  <div class="p-4 absolute top-0 flex flex-col justify-center">
                    <p class="text-sm text-c-gray-2 opcity-70 font-font-550">
                      Смартфоны
                    </p>
                    <p class="text-xl text-white font-bold mt-2 mb-4">
                      Продолжаем знакомство с телефонами Samsung!
                    </p>
                    <p class="text-sm text-c-gray-2 opcity-70 font-font-550">
                      05.02.20
                    </p>
                  </div>
                </div>
              </div>
            </div>-->
    </main>
    <div class="bg-c-blue-4 pt-6 pb-5 px-6 flex">
      <img
        src="~/assets/icons/icon-tg.svg"
        class="h-full"
      >
      <div class=" ml-6">
        <p class="text-white font-font-550 text-base mb-3">
          Узнавайте первыми о новостях в нашем Telegram-канале
        </p>
        <a
          target="_blank"
          href="https://t.me/olchauz"
          class="text-black font-font-550 text-base px-4 py-2 bg-white w-max rounded-md"
        >Подписаться</a>
      </div>
    </div>
  </div>
</template>

<script>
import Blog from '~/api/Blog'
import TitleContainer from '~/mobile/reusable/TitleContainer'

export default {
  name: 'BlogPage',
  components: { TitleContainer },
  async asyncData ({ params }) {
    return await Blog.getPromoBlog(params.alias)
      .then((res) => {
        /* eslint-disable */
        console.log(res)
        return {
          blog: res.data.data.blog
        }
      }).catch(() => {
        return []
      })
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>
