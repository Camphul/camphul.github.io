<template>
  <MarkdownBlogpost :blog-post="page" />
</template>

<script>
import getBlogEntry from '~/utils/getBlogEntry'

export default {
  async asyncData ({ $content, route, error }) {
    const page = await getBlogEntry($content, route.path || 'index', error)
    const title = page.title + ' | Camphul\'s Blog'
    return {
      page,
      title
    }
  },
  data () {
    return {
      page: {},
      title: 'Camphul\'s GitHub pages blog'
    }
  },
  head () {
    return {
      title: this.title
    }
  }
}
</script>
