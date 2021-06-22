<template>
  <ul
    class="flex h-12 font-medium rounded-full bg-gray-200"
  >
    <li
      v-if="!(firstPageSelected() && hidePrevNext)"
      :class="[prevClass, firstPageSelected() ? disabledClass : '']"
    >
      <button
        :class="prevLinkClass"
        :tabindex="firstPageSelected() ? -1 : 0"
        @click="prevPage()"
        @keyup.enter="prevPage()"
      >
        <slot name="prev" />
      </button>
    </li>

    <li
      v-for="page in pages"
      :key="page.content"
      class="w-12 flex justify-center items-center cursor-pointer
      leading-5 transition duration-150 ease-in  rounded-full"
      :class="page.content === value ? 'bg-c-red-1 text-white' : ''"
    >
      <button
        v-if="page.breakView"
        tabindex="0"
        class="w-full h-full focus:outline-none border-0"
      >
        <slot name="breakViewContent">
          {{ breakViewText }}
        </slot>
      </button>
      <button
        v-else-if="page.disabled"
        class="w-full h-full focus:outline-none border-0"
        tabindex="0"
      >
        {{ page.content }}
      </button>
      <button
        v-else
        class="w-full h-full focus:outline-none border-0"
        tabindex="0"
        @click="handlePageSelected(page.index + 1)"
        @keyup.enter="handlePageSelected(page.index + 1)"
      >
        {{ page.content }}
      </button>
    </li>
  </ul>
</template>

<script>
import VueTypes from 'vue-types'

export default {
  props: {
    value: {
      type: Number,
      default: 1
    },
    pageCount: {
      type: Number,
      required: true
    },
    forcePage: {
      type: Number,
      default: 1
    },
    clickHandler: {
      type: Function,
      default: () => {
      }
    },
    pageRange: {
      type: Number,
      default: 3
    },
    marginPages: {
      type: Number,
      default: 1
    },
    prevButton: VueTypes.string,
    nextButton: VueTypes.string,
    breakViewText: {
      type: String,
      default: '…'
    },
    containerClass: {
      type: String,
      default: ''
    },
    pageClass: {
      type: String,
      default: ''
    },
    pageLinkClass: {
      type: String,
      default: ''
    },
    prevClass: {
      type: String,
      default: ''
    },
    prevLinkClass: {
      type: String,
      default: ''
    },
    nextClass: {
      type: String,
      default: ''
    },
    nextLinkClass: {
      type: String,
      default: ''
    },
    breakViewClass: {
      type: String,
      default: ''
    },
    breakViewLinkClass: {
      type: String,
      default: ''
    },
    activeClass: {
      type: String,
      default: 'active'
    },
    disabledClass: {
      type: String,
      default: 'disabled'
    },
    noLiSurround: {
      type: Boolean,
      default: false
    },
    firstLastButton: {
      type: Boolean,
      default: false
    },
    firstButtonText: {
      type: String,
      default: 'First'
    },
    lastButtonText: {
      type: String,
      default: 'Last'
    },
    hidePrevNext: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      innerValue: 1
    }
  },
  computed: {
    selected: {
      get () {
        return this.value || this.innerValue
      },
      set (newValue) {
        this.innerValue = newValue
      }
    },
    pages () {
      const items = {}
      if (this.pageCount <= this.pageRange) {
        for (let index = 0; index < this.pageCount; index++) {
          items[index] = {
            index,
            content: index + 1,
            selected: index === (this.selected - 1)
          }
        }
      } else {
        const halfPageRange = Math.floor(this.pageRange / 2)
        const setPageItem = (index) => {
          items[index] = {
            index,
            content: index + 1,
            selected: index === (this.selected - 1)
          }
        }
        const setBreakView = (index) => {
          items[index] = {
            disabled: true,
            breakView: true
          }
        }
        // 1st - loop thru low end of margin pages
        for (let i = 0; i < this.marginPages; i++) {
          setPageItem(i)
        }
        // 2nd - loop thru selected range
        let selectedRangeLow = 0
        if (this.selected - halfPageRange > 0) {
          selectedRangeLow = this.selected - 1 - halfPageRange
        }
        let selectedRangeHigh = selectedRangeLow + this.pageRange - 1
        if (selectedRangeHigh >= this.pageCount) {
          selectedRangeHigh = this.pageCount - 1
          selectedRangeLow = selectedRangeHigh - this.pageRange + 1
        }
        for (let i = selectedRangeLow; i <= selectedRangeHigh && i <= this.pageCount - 1; i++) {
          setPageItem(i)
        }
        // Check if there is breakView in the left of selected range
        if (selectedRangeLow > this.marginPages) {
          setBreakView(selectedRangeLow - 1)
        }
        // Check if there is breakView in the right of selected range
        if (selectedRangeHigh + 1 < this.pageCount - this.marginPages) {
          setBreakView(selectedRangeHigh + 1)
        }
        // 3rd - loop thru high end of margin pages
        for (let i = this.pageCount - 1; i >= this.pageCount - this.marginPages; i--) {
          setPageItem(i)
        }
      }
      return items
    }
  },
  beforeUpdate () {
    if (this.forcePage === undefined) {
      return
    }
    if (this.forcePage !== this.selected) {
      this.selected = this.forcePage
    }
  },
  methods: {
    handlePageSelected (selected) {
      if (this.selected === selected) {
        return
      }
      this.innerValue = selected
      this.$emit('selected', selected)
      this.clickHandler(selected)
    },
    prevPage () {
      if (this.selected <= 1) {
        return
      }
      this.handlePageSelected(this.selected - 1)
    },
    nextPage () {
      if (this.selected >= this.pageCount) {
        return
      }
      this.handlePageSelected(this.selected + 1)
    },
    firstPageSelected () {
      return this.selected === 1
    },
    lastPageSelected () {
      return (this.selected === this.pageCount) || (this.pageCount === 0)
    },
    selectFirstPage () {
      if (this.selected <= 1) {
        return
      }
      this.handlePageSelected(1)
    },
    selectLastPage () {
      if (this.selected >= this.pageCount) {
        return
      }
      this.handlePageSelected(this.pageCount)
    }
  }
}
</script>

<style lang="css" scoped>
a {
  cursor: pointer;
}
</style>
