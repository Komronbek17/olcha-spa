<template>
  <div>
    <TitleContainer
      title-text="Акции и Скидки"
      class="ml-2"
    />
    <div class="py-5 grid grid-cols-1 place-items-center w-screen gap-2 md:grid-cols-2">
      <div
        v-for="i in 5"
        :key="i"
        class="w-full flex items-center justify-center"
      >
        <NuxtLink :to="{ name: 'proms-discounts-branch' }">
          <PromsDiscountsCart />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
import TitleContainer from '../../reusable/TitleContainer'
import PromsDiscountsCart from '../../components/partials/proms-discount-partials/PromsDiscountsCart'
export default {
  components: {
    TitleContainer,
    PromsDiscountsCart
  }
}
</script>
