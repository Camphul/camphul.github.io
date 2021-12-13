<template>
  <div class="antialiased text-gray-900">
    <BlogNavbar />
    <div
      class="px-4 py-20 md:py-24 max-w-3xl mx-auto sm:px-6 sm:py-12 lg:max-w-4xl lg:py-16 lg:px-8 xl:max-w-6xl"
      @click="contentClickHandle"
    >
      <Nuxt />
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    contentClickHandle (event) {
      this.$root.$emit('onMainContentClick', event)
    }
  }
}
</script>
