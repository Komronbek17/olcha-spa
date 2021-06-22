<template>
  <div class="grid grid-cols-1 gap-y-6">
    <div v-if="features.length || description">
      <p class="font-bold text-lg text-black leading-6 mb-4">
        {{ $t('id83') }}
      </p>
      <ellipsis-container

        btn-label-closed="Читать далее"
        btn-label-opened="Скрыть"
        :min-height="128"
      >
        <p v-if="description" class="text-base leading-5 text-black py-2" v-html="description " />
        <div
          class="grid grid-cols-1 gap-y-4"
        >
          <characteristic-item
            v-for="featureGroup in features"
            :key="featureGroup.id"
            :feature="featureGroup"
          />
        </div>
      </ellipsis-container>
    </div>

    <!--    <div>
          <ellipsis-container
            :min-height="300"
            :btn-label-closed="$t('id89')"
            :btn-label-opened="$t('id85')"
          >
            <compare-card-container :bordered="true" />
          </ellipsis-container>
        </div>-->
  </div>
</template>

<script>
import VueTypes from 'vue-types'
import EllipsisContainer from '~/mobile/components/partials/EllipsisContainer'
// import CompareCardContainer from '~/mobile/reusable/CompareCardContainer'
import CharacteristicItem from '~/mobile/components/partials/CharacteristicItem'

export default {
  name: 'CharacteristicWrapper',
  components: {
    CharacteristicItem,
    // CompareCardContainer,
    EllipsisContainer
  },
  props: {
    description: VueTypes.string.def(''),
    features: VueTypes.array
  }
}
</script>

<style scoped>

</style>
