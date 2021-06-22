<template>
  <div class="h-full overflow-y-scroll">
    <div class="container mx-auto  pb-4   bg-c-gray-1">
      <profile-header :user-data="$auth.user" :is-registered="$auth.loggedIn" />
      <div>
        <div v-if="$auth.loggedIn">
          <div>
            <p class="text-c-gray-5 text-base font-550">
              Мой Профиль
            </p>
            <div class="bg-white rounded-2xl mt-2">
              <profile-links :links="profileLinks" />
            </div>
          </div>
          <!--          <bonus-account-cart class="my-4" :bonus="bonus" />-->
        </div>
        <div>
          <p class="text-c-gray-5  text-base font-550">
            Прочее
          </p>
          <div class="bg-white rounded-2xl mt-2">
            <profile-links :links="otherLinks">
              <nuxt-link
                :to="{ name: 'compare' }"
                class="py-5 px-6 flex w-full flex-nowrap items-center font-550 text-base text-black leading-5"
              >
                <img
                  src="~/assets/icons/star-red.svg"
                  alt="star-red.svg"
                  class="mr-4"
                >
                <div class="flex flex-nowrap justify-between items-center w-full">
                  <span>Список сравнения</span>
                  <span
                    class="w-6 h-6 flex items-center justify-center rounded-full bg-c-red-1 text-white text-sm font-medium leading-4"
                  >
                    2
                  </span>
                </div>
              </nuxt-link>
              <button
                class="py-5 px-6 flex w-full flex-nowrap items-center font-550 text-base text-black leading-5"
              >
                <img
                  src="~/assets/icons/star-red.svg"
                  alt="star-red.svg"
                  class="mr-4"
                >
                <span>Выйти</span>
              </button>
            </profile-links>
          </div>
        </div>
        <div class="rounded-2xl bg-white p-4 mt-4">
          <p class="font-bold text-base text-black">
            Есть вопросы? Звоните!
          </p>
          <a
            class="font-bold text-2xl text-black leading-8"
            href="tel:+998 (71) 202-202-1"
          >+998 (71) 202-202-1</a>
          <nuxt-link
            :to="{
              name: 'feedback'
            }"
            tag="button"
            class="w-full py-2 px-4 mt-6 rounded-lg bg-c-red-1 text-white font-medium text-base leading-5"
          >
            Запросить звонок
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProfileHeader from '~/mobile/components/profile-components/ProfileHeader'
import ProfileLinks from '~/mobile/components/profile-components/ProfileLinks'
// import BonusAccountCart from '~/mobile/components/profile-components/BonusAccountCart'

export default {
  name: 'CabinetPage',
  components: {
    // BonusAccountCart,
    ProfileLinks,
    ProfileHeader
  },
  // async asyncData ({
  //   $toast,
  //   store
  // }) {
  //   return await User.getProfileData()
  //     .then(async (res) => {
  //       await store.dispatch('auth/addUserData', res.data.data.user)
  //       return await User.getBonuses()
  //         .then((res) => {
  //           return {
  //             bonus: res.data.data.bonus
  //           }
  //         }).catch((err) => {
  //           return err
  //         })
  //     })
  //     .catch(() => {
  //       return true
  //     })
  // },
  data () {
    return {
      profileLinks: [
        {
          label: this.$t('id1215'),
          icon: 'user-profile.svg',
          to: { name: 'profile' }
        },
        {
          label: 'Транзакции в OlchaPay',
          icon: 'arrows-horizontal-red.svg',
          to: '/#!'
        },
        {
          label: this.$t('id1306'),
          icon: 'map-marker-red.svg',
          to: {
            name: 'address'
          }
        },
        // {
        //   label: 'История заказов',
        //   icon: 'history.svg',
        //   to: {
        //     name: 'orders-history'
        //   }
        // },
        {
          label: this.$t('id1305'),
          icon: 'history.svg',
          to: {
            name: 'orders'
          }
        },
        {
          label: this.$t('id1307'),
          icon: 'star-red.svg',
          to: {
            name: 'favorite'
          }
        }

      ],
      otherLinks: [
        {
          label: this.$t('id1312'),
          icon: 'user-profile.svg',
          to: {
            name: 'track-order'
          }
        },
        {
          label: this.$t('id1803'),
          icon: 'arrows-horizontal-red.svg',
          to: {
            name: 'notification'
          }
        },
        /* {
          label: 'Пункты выдачи',
          icon: 'map-marker-red.svg',
          to: '/#!'
        }, */
        {
          label: this.$t('id1901'),
          icon: 'history.svg',
          to: {
            name: 'setting'
          }
        },
        {
          label: 'Помощь',
          icon: 'star-red.svg',
          to: {
            name: 'help'
          }
        }

      ]
    }
  }

}
</script>
