<template>
  <div class="without-login">
    <FormsAddress />
  </div>
</template>

<script>
import FormsAddress from './FormsAddress'
export default {
  name: 'DefaultDeliveryAddress',
  components: {
    FormsAddress
  },
  data () {
    return {
      address: {
        city: 'Ташкентская область',
        street: 'Улица',
        home: 'Дом',
        flat: 34,
        porch: 1,
        level: 'Этаж'
      }
    }
  }
}
</script>
