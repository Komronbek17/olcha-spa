<template>
  <bottom-sheet
    :show="open"
    title="Выберите время"
    @close="$emit('close', !open)"
  >
    <ul class="grid grid-cols-2 gap-x-2">
      <li>
        <o-input class="appearance-none" :with-icon="false" type="time" holder="С" />
      </li>
      <li>
        <o-input class="appearance-none" :with-icon="false" type="time" holder="До" />
      </li>
    </ul>
    <button class="py-3 px-4 mt-6 rounded-xl bg-c-green-1 text-base font-550 leading-5 text-white w-full">
      Сохранить
    </button>
  </bottom-sheet>
</template>

<script>
import VueTypes from 'vue-types'
import BottomSheet from '~/mobile/reusable/BottomSheet'
import OInput from '~/mobile/components/partials/OInput'

export default {
  name: 'ChangeFeedbackTime',
  components: { OInput, BottomSheet },
  props: {
    open: VueTypes.bool.def(false)
  }
}
</script>

<style scoped>

</style>
