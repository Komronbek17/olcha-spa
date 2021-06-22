<template>
  <drawer title="Фильтр" :show="openDrawer" @close="close">
    <div class="filter bg-white z-10 top-0 w-full h-screen flex-col justify-between">
      <div class="w-full h-full">
        <ul class="h-full divide-y divide-gray-2 grid grid-cols-1">
          <li
            v-for="category in data"
            :key="category.id"
            class="relative border-b border-gray-200 pb-4"
          >
            <button
              type="button"
              class="w-full px-2 py-4 text-left focus:outline-none"
              @click="category.collapse = !category.collapse"
            >
              <div class="flex items-center justify-between">
                <h4 class="font-bold text-c-gray-6 text-xl">
                  {{ $lang(category, 'name') }}
                </h4>
              </div>
            </button>

            <transition
              enter-active-class="transition-all ease-out duration-100"
              enter-from-class="h-0"
              enter-to-class="h-auto"
              leave-active-class="transition-all ease-in duration-75"
              leave-from-class="h-auto"
              leave-to-class="h-0"
            >
              <div
                v-show="category.collapse"
                class="relative overflow-hidden transition-all duration-700"
              >
                <div class="px-4 grid grid-cols-1 gap-y-2">
                  <nuxt-link
                    v-for="child in category.children"
                    :key="child.id"
                    :to="{
                      name: $route.name,
                      params: {
                        parent: category.alias,
                        child: child.alias
                      }
                    }"
                    class="font-550 text-base text-c-gray-6"
                  >
                    {{ $lang(child, 'name') }}
                  </nuxt-link>
                </div>
              </div>
            </transition>
          </li>
        </ul>
      </div>
    </div>
  </drawer>
</template>

<script>
import VueTypes from 'vue-types'
import Drawer from '~/mobile/reusable/Drawer'

export default {
  name: 'InstallmentsFilterDrawer',
  components: {
    Drawer
  },
  props: {
    openDrawer: VueTypes.bool.def(false),
    categories: VueTypes.array
  },
  data () {
    return {
      data: []
    }
  },
  watch: {
    categories: {
      immediate: true,
      handler (newVal) {
        this.data = newVal
      }
    }
  },
  methods: {
    close () {
      this.$emit('close', !this.openDrawer)
    }
  }
}
</script>

<style scoped>

</style>
