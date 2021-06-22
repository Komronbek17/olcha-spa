<template>
  <bottom-sheet
    :show="open"
    title="Изменение адреса"
    @close="close"
  >
    <div>
      <ul class="grid grid-cols-1 gap-y-4 mb-4">
        <!--        <li>-->
        <!--          <o-input v-model="data.name" holder="Название адреса" />-->
        <!--        </li>-->
        <li>
          <!--          <o-input v-model="data" holder="Город доставки" />-->
          <span v-show="errors.first('region')" class="text-sm text-c-red-1">{{ errors.first('region') }}</span>
          <div class="inline-block w-full text-gray-700">
            <select
              v-model="newData.region_id"
              v-validate="'required'"
              name="region"
              class="w-full rounded-lg appearance-none bg-c-gray-1 px-4 py-3 flex items-center rounded-xl"
            >
              <option v-for="region in regions" :key="region.id" :value="region.id">
                {{ $lang(region, 'name') }}
              </option>
            </select>
          </div>
        </li>
        <li>
          <!--          <o-input v-model="data" holder="Район" />-->
          <span v-show="errors.first('district')" class="text-sm text-c-red-1">{{ errors.first('district') }}</span>
          <div class="inline-block w-full text-gray-700">
            <select
              v-model="newData.district_id"
              v-validate="'required'"
              name="district"
              class="w-full rounded-lg appearance-none bg-c-gray-1 px-4 py-3 flex items-center rounded-xl"
            >
              <option v-for="district in districts" :key="district.id" :value="district.id">
                {{ $lang(district, 'name') }}
              </option>
            </select>
          </div>
        </li>
        <li>
          <o-input v-model="newData.street" holder="Улица" />
        </li>
      </ul>
      <ul class="grid grid-cols-2 gap-x-4 gap-y-4 mb-4">
        <!--        <li>-->
        <!--          <o-input v-model="newData.house_number" holder="Дом" />-->
        <!--        </li>-->
        <li>
          <o-input v-model="newData.house_number" holder="Квартира" />
        </li>
        <li>
          <o-input v-model="newData.entrance" holder="Подъезд" />
        </li>
        <li>
          <o-input v-model="newData.floor" holder="Этаж" />
        </li>
      </ul>
      <button
        class="py-2 px-3 mb-6 rounded-xl bg-c-red-1 bg-opacity-5 text-base font-550 leading-5 text-c-red-1 w-full"
        @click="deleteAddress"
      >
        Удалить
      </button>
      <button
        class="py-3 px-4 rounded-xl bg-c-green-1 text-base font-550 leading-5 text-white w-full"
        @click="resetAddress"
      >
        Сохранить
      </button>
    </div>
  </bottom-sheet>
</template>

<script>
import VueTypes from 'vue-types'
import OInput from '~/mobile/components/partials/OInput'
import BottomSheet from '~/mobile/reusable/BottomSheet'
import User from '~/api/User'

export default {
  name: 'AddressesInputGroup',
  components: {
    BottomSheet,
    OInput
  },
  props: {
    change: VueTypes.bool.def(false),
    address: VueTypes.object,
    open: VueTypes.bool.def(false)
  },
  data () {
    return {
      data: {},
      newData: {}
    }
  },
  watch: {
    address: {
      immediate: true,
      handler (newVal) {
        this.data = newVal
      }
    }
  },
  asyncComputed: {
    async regions () {
      return await User.getRegions()
        .then((res) => {
          return res.data.data.regions
        })
        .catch((err) => {
          this.$toast.error(err.data.message)
        })
    },
    async districts () {
      if (this.newData.region_id) {
        return await User.getDistricts(this.newData.region_id)
          .then((res) => {
            return res.data.data.districts
          })
          .catch((err) => {
            this.$toast.error(err.data.message)
          })
      }
    }
  },
  methods: {
    close (event) {
      this.$emit('close', event)
    },
    resetAddress () {
      this.$validator.validate()
        .then((valid) => {
          if (valid) {
            const data = this.newData
            this.close(false)
            return this.$emit('save', {
              id: this.address.id,
              data
            })
          }
        })
    },
    deleteAddress () {
      this.close(false)
      return this.$emit('delete', this.address.id)
    }
  }
}
</script>

<style scoped>

</style>
