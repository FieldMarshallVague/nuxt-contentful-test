<template>
  <nav class="main">
    <ul v-if="true" role="menu">
      <li v-for="(navItem, index) in navItems" :key="index">
        <nuxt-link :to="navItem.fields.slug.trim()" role="menuitem">{{ navItem.fields.name }}</nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import {mapState} from 'vuex';

export default {
  name: 'Navigation',
  computed: {

    ...mapState('navItems', [
      'navItems'
    ]),
    // navItems() {
    //   return this.$store.state.navItems.navItems
    // }
  },
  mounted() {
    this.$store.dispatch("navItems/getNavItems");
  },
  // async fetch({ store, params }) {
  //   await store.dispatch('navItems/getNavItems')
  // }
}
</script>
