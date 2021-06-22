<template>
  <div class="container mx-auto h-full pt-2">
    <ul v-if="notifications" class="grid grid-cols-1 gap-y-2 ">
      <notification-card
        v-for="notification in notifications.data"
        :key="notification.id"
        :notification="notification"
        @on:click="deleteNotify(notification.id)"
      />
    </ul>
    <div v-else class="flex flex-col items-center mt-10">
      <img
        :src="require('~/assets/images/EmptyFavorite.svg')"
        alt=""
      >
      <div class="mb-6 text-center">
        <p class="font-bold text-xl leading-6 text-black mb-2">
          Уведомлений нет
        </p>
        <p class="font-550 text-sm leading-6 text-c-gray-5  ">
          Здесь вы будете получать уведомления
        </p>
      </div>

      <nuxt-link
        :to="{ name: 'home' }"
        tag="button"
        class="w-full rounded-lg bg-c-red-1 leading-4 text-base font-bold text-white py-3 mb-4"
      >
        На главную
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { remove } from 'lodash'
import NotificationCard from '~/mobile/components/profile-components/NotificationCard'
import User from '~/api/User'

export default {
  name: 'NotificationsPage',
  components: { NotificationCard },
  async asyncData () {
    return await User.getNotifications()
      .then((res) => {
        return {
          notifications: res.data.data.notifications
        }
      }).catch(() => {
        return true
      })
  },
  methods: {
    async deleteNotify (id) {
      return await User.deleteNotify(id)
        .then((res) => {
          this.notifications.data = remove(this.notifications.data, (item) => {
            return item.id !== id
          })
          this.$toast.success(res.data.message)
        })
        .catch((err) => {
          this.$toast.error(err.data.message)
        })
    }
  }
}
</script>

<style scoped>

</style>
