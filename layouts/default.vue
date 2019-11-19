<template>
  <div>
    <Navigation />
    <!-- <h1 class="site-title">
      <nuxt-link :to="{ path: '/' }" class="site-title__link">
        Nuxt Demo
      </nuxt-link>
    </h1> -->
    <nuxt />
  </div>
</template>

<script>
import Navigation from "../components/Navigation.vue"

export default {
  components: {
    Navigation
  },
}
</script>

<style>

</style>
