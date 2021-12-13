<template>
  <article>
    <div class="space-y-10 sm:space-y-12 lg:space-y-20 xl:space-y-24">
      <NuxtContent
        :document="blogPost"
        class="prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto leading-3"
      />
    </div>
  </article>
</template>

<script>
export default {
  props: {
    blogPost: {
      type: Object,
      required: true
    }
  }
}
</script>
