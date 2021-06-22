<template>
  <ModalContainer>
    <div class="bg-white rounded-t-3xl p-6 absolute bottom-12 w-full">
      <div class="flex justify-between mb-2">
        <h3 class="text-c-gray-6 font-bold text-xl sm:text-2xl mx-2">
          Сохранение адреса
        </h3>
        <img
          src="~/assets/icons/icon-close.svg"
          class="mx-2"
          @click="changedDeliveryAddressComp('NewDeliveryAddress')"
        >
      </div>
      <FormsAddress :address-title="true" :need-loader="false" />
      <div
        class="block mt-4 bg-c-green-1 p-2 text-center rounded-lg text-white text-base font-font-550"
      >
        Сохранить
      </div>
    </div>
  </ModalContainer>
</template>

<script>
import { mapMutations } from 'vuex'
import ModalContainer from '../../../reusable/ModalContainer'
import FormsAddress from './FormsAddress'
export default {
  name: 'SaveDeliveryAddress',
  components: {
    ModalContainer,
    FormsAddress
  },
  methods: {
    ...mapMutations('order', ['changedDeliveryAddressComp'])
  }
}
</script>
