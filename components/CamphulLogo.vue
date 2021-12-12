<template>
  <img id="camphul-logo" class="block h-8 w-auto" content="eager" alt="logo" :src="baseUrlLogo">
</template>
<script>
export default {
  computed: {
    baseUrlLogo () {
      return (process.env.NODE_ENV !== 'production' ? process.env.BASE_URL : 'https://camphul.github.io/Camphul') + '/logo.png'
    }
  }
}
</script>
