<template>
  <div>
    <div
      class="flex items-center bg-c-gray-1 py-2 px-4 rounded-lg w-max mb-6"
      @click="changedDeliveryAddressComp('HistoryDeliveryAddress')"
    >
      <img src="@/assets/icons/icon-left.svg">
      <div
        class="block text-c-gray-6 font-font-550 text-sm ml-4"
      >
        Выбрать из сохраненных
      </div>
    </div>
    <FormsAddress />
    <div
      class="block mt-4 bg-c-green-1 p-2 text-center rounded-lg text-white text-base font-font-550"
      @click="changedDeliveryAddressComp('SaveDeliveryAddress')"
    >
      Сохранить данный адрес
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import FormsAddress from './FormsAddress'
export default {
  name: 'NewDeliveryAddress',
  components: {
    FormsAddress
  },
  methods: {
    ...mapMutations('order', ['changedDeliveryAddressComp'])
  }
}
</script>
