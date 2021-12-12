<template>
  <nav class="bg-gray-800">
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between h-16">
        <div class="flex-shrink-0 flex items-start">
          <a href="/"><CamphulLogo /></a>
        </div>
        <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <a
            href="https://github.com/Camphul/Camphul"
            target="_blank"
            alt="Github link"
            class="inline-flex items-center py-2 px-3 space-x-2 bg-gray-800 p-1 rounded-full text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white transition ease-in-out duration-100"
          >
            <GitHubLogo />
            <span>View on GitHub</span>
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
import CamphulLogo from '~/components/CamphulLogo'
export default {
  components: { CamphulLogo }
}
</script>
