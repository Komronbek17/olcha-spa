<template>
  <div class="container mx-auto bg-c-gray-3 h-full overflow-y-scroll">
    <div class="py-4">
      <address-card
        v-for="address in addresses.data"
        :key="address.id"
        class="mb-4"
        :address="address"
        @change="showBottomSheet"
      />
    </div>
    <addresses-input-group
      :address="selectedAddress"
      :open="openBottomSheet"
      @close="openBottomSheet = $event"
      @save="resetAddress"
      @delete="deleteAddress"
    />
  </div>
</template>

<script>
import { map, remove } from 'lodash'
import AddressCard from '~/mobile/components/profile-components/AddressCard'
import AddressesInputGroup from '~/mobile/components/profile-components/AddressesInputGroup'
import User from '~/api/User'

export default {
  name: 'AddressPage',
  components: {
    AddressesInputGroup,
    AddressCard
  },
  async asyncData () {
    return await User.getUserAddresses()
      .then((res) => {
        return {
          addresses: res.data.data
        }
      })
      .catch(() => {
        return true
      })
  },
  data () {
    return {
      openBottomSheet: false,
      selectedAddress: {}
    }
  },
  methods: {
    open () {
      this.openBottomSheet = !this.openBottomSheet
    },
    showBottomSheet (address) {
      this.openBottomSheet = !this.openBottomSheet
      this.selectedAddress = address
    },
    async resetAddress (e) {
      return await User.updateAddress(e.id, e.data)
        .then((res) => {
          this.addresses.data = map(this.addresses.data, (item) => {
            if (item.id === e.id) {
              item = res.data.data.new_address
            }
            return item
          })
          return this.$toast.success(res.data.message)
        }).catch((err) => {
          this.$toast.error(err.data.message)
        })
    },
    async deleteAddress (id) {
      return await User.deleteAddress(id)
        .then((res) => {
          this.addresses.data = remove(this.addresses.data, ['id', id])
          return this.$toast.success(res.data.message)
        }).catch((err) => {
          this.$toast.error(err.data.message)
        })
    }

  }
}
</script>

<style scoped>

</style>
