<template>
  <nav class="pl-2 flex fixed w-full items-center justify-between px-6 h-16 bg-gray-800 z-10">
    <div class="flex-shrink-0 flex items-start">
      <button class="mr-2" aria-label="Open Menu" @click="drawer">
        <svg
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          viewBox="0 0 24 24"
          class="w-8 h-8"
        >
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <CamphulLogo><span class="invisible font-medium text-lg font-sans md:text-xl md:visible md:text-white justify-center md:font-bold">Camphul</span></CamphulLogo>
    </div>
    <div class="relative flex items-center justify-end h-16 w-full">
      <div class="absolute inset-y-0 right-0 flex items-center pr-0 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
        <a
          href="https://github.com/Camphul/Camphul"
          target="_blank"
          alt="Github link"
          class="inline-flex items-center py-2 bg-gray-800 p-2 mr-0 rounded-md text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white transition ease-in-out duration-100"
        >
          <GitHubLogo />
          <span class="pl-1">View on GitHub</span>
        </a>
      </div>
      <aside
        class="transform top-0 left-0 w-64 bg-gray-800 fixed h-full overflow-auto ease-in-out transition-all duration-300 z-30"
        :class="isOpen ? 'translate-x-0' : '-translate-x-full'"
      >
        <span
          class="flex w-full items-center p-4 bg-gray-800"
          @click="isOpen = false"
        >
          <button class="mr-2" aria-label="Open Menu" @click="drawer">
            <svg
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              class="w-8 h-8"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <CamphulLogo class="text-white font-sans text-lg md:text-xl">
            Camphul
          </CamphulLogo>
          <!--          <CamphulLogo class="h-auto w-32 mx-auto"></CamphulLogo>-->
        </span>
        <SidebarItem name="Home" :is-open="isOpen" @itemClick="setIsOpen(false);$router.push('/index')" />
        <template v-for="blog in blogs">
          <SidebarItem
            :key="'blog-'+blog"
            :name="blog.slug"
            :is-open="isOpen"
            :has-icon="false"
            class="transition ease-in duration-100"
            @itemClick="openBlog(blog)"
          />
        </template>
        <div class="fixed bottom-0 w-full">
          <!--          <SidebarItem name="Bottom Item" :is-open="isOpen" :has-icon="false" @itemClick="setIsOpen" />-->
        </div>
      </aside>
    </div>
  </nav>
</template>
<script>
import CamphulLogo from '~/components/CamphulLogo'
import SidebarItem from '~/components/SidebarItem'

export default {
  components: { SidebarItem, CamphulLogo },
  data () {
    return {
      isOpen: false,
      blogs: []
    }
  },
  watch: {
    isOpen: {
      immediate: true,
      handler (isOpen) {
        if (process.client) {
          if (isOpen) {
            document.body.style.setProperty('overflow', 'hidden')
          } else {
            document.body.style.removeProperty('overflow')
          }
        }
      }
    }
  },
  async mounted () {
    this.$root.$on('onMainContentClick', (event) => {
      this.setIsOpen(false)
    })
    this.blogs = await this.$content('a', { deep: true }).only('slug').limit(20).fetch()
      // eslint-disable-next-line node/handle-callback-err
      .catch((err) => {
        alert('Could not fetch content')
      })
    document.addEventListener('keydown', (e) => {
      if (e.keyCode === 27 && this.isOpen) {
        this.isOpen = false
      }
    })
  },
  methods: {
    openBlog (blog) {
      this.setIsOpen(false)
      this.$router.push(blog.path)
    },
    drawer () {
      this.isOpen = !this.isOpen
    },
    setIsOpen (value) {
      this.isOpen = value
    }
  }
}
</script>
