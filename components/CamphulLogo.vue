<template>
  <a href="#" @click.prevent="$router.push('/index')">
    <span class="pl-2 flex w-full justify-center items-center">
      <img id="camphul-logo" class="h-8 w-auto" content="eager" alt="logo" :src="baseUrlLogo">
      <p class="pl-2 font-medium"><slot></slot></p>
    </span>
  </a>
</template>
<script>
export default {
  computed: {
    baseUrl () {
      return (process.env.NODE_ENV !== 'production' ? process.env.baseUrl : 'https://camphul.github.io/Camphul')
    },
    baseUrlLogo () {
      return (process.env.NODE_ENV !== 'production' ? process.env.baseUrl : 'https://camphul.github.io/Camphul') + '/logo.png'
    }
  }
}
</script>
