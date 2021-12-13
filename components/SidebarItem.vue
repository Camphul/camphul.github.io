<template>
  <span
    class="flex items-center p-4 bg-gray-800 p-1 text-gray-300 hover:text-white  hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 transition ease-in-out duration-200"
    @click="setOpen(false)"
  >
    <span v-show="hasIcon" class="mr-2">
      <slot name="icon">
        <svg
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          viewBox="0 0 24 24"
          class="w-6 h-6"
        >
          <path
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      </slot>
    </span>
    <span>{{ name }}</span>
  </span>
</template>
<script>
export default {
  props: {
    isOpen: {
      type: Boolean,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    hasIcon: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  methods: {
    setOpen (val) {
      this.$emit('itemClick', val)
    }
  }
}
</script>
