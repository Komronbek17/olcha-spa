<template>
  <div class="container mx-auto py-2">
    <ul class="divide-y p-4">
      <li class="py-4 flex items-center justify-between">
        <span class="font-550 text-c-gray-6 text-base leading-5">Местоположение</span>
        <span class="font-550 text-c-red-1 text-base leading-5">Ташкент</span>
      </li>
      <li class="py-4 flex items-center justify-between">
        <span class="font-550 text-c-gray-6 text-base leading-5">Язык приложения</span>
        <span class="font-550 text-c-red-1 text-base leading-5">Ташкент</span>
      </li>
      <li class="py-4 flex items-center justify-between">
        <span class="font-550 text-c-gray-6 text-base leading-5">Определение локации</span>
        <switch-button />
      </li>
      <li class="py-4 flex items-center justify-between">
        <span class="font-550 text-c-gray-6 text-base leading-5">Push уведомления</span>
        <switch-button />
      </li>
    </ul>
  </div>
</template>

<script>
import SwitchButton from '~/mobile/reusable/SwitchButton'

export default {
  name: 'SettingPage',
  components: { SwitchButton }
}
</script>

<style scoped>

</style>
