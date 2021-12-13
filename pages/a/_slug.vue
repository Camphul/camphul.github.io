<template>
  <NuxtContent
    :document="page"
    class="prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto"
  />
</template>

<script>
export default {
  async asyncData ({ $content, params, error }) {
    const slug = params.slug || 'index'
    const page = await $content('/a/' + slug).fetch()
      // eslint-disable-next-line node/handle-callback-err
      .catch((err) => {
        error({ statusCode: 404, message: 'Page not found' })
      })
    return {
      page
    }
  }
}
</script>
