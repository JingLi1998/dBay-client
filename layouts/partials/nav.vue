<template>
  <div>
    <nav-drawer v-bind:drawerOptions="drawerOptions" />
    <v-app-bar dark color="black" flat clipped-left fixed app>
      <v-app-bar-nav-icon @click.stop="drawerOptions.miniVariant = !drawerOptions.miniVariant" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn text v-if="!isLoggedIn" to="/login">Login</v-btn>
      <v-btn text v-if="!isLoggedIn" to="/signup">Signup</v-btn>
      <nav-menu v-bind:currentUser="currentUser" v-else />
    </v-app-bar>
  </div>
</template>

<script>
import NavDrawer from "./navDrawer.vue";
import NavMenu from "./navMenu.vue";

export default {
  components: {
    NavDrawer,
    NavMenu
  },
  props: ["isLoggedIn", "currentUser"],
  data() {
    return {
      drawerOptions: {
        miniVariant: true
      },
      title: "dBay"
    };
  }
};
</script>