<template>
  <span
    class="flex items-center p-4 bg-gray-800 p-1 text-gray-300 hover:text-white  hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 transition ease-in-out duration-200"
    @click="setOpen(false)"
  >
    <span v-show="hasIcon" class="mr-2">
      <slot>
        <HomeIcon />
      </slot>
    </span>
    <span>{{ name }}</span>
  </span>
</template>
<script>
import HomeIcon from '~/components/icons/HomeIcon'
export default {
  components: { HomeIcon },
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
