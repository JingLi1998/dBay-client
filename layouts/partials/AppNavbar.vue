<template>
  <div>
    <app-navbar-drawer :drawerOptions="drawerOptions" />
    <v-app-bar dark color="black" flat clipped-left fixed app>
      <v-app-bar-nav-icon @click.stop="drawerOptions.miniVariant = !drawerOptions.miniVariant" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn text v-if="!isLoggedIn" to="/login">Login</v-btn>
      <v-btn text v-if="!isLoggedIn" to="/signup">Signup</v-btn>
      <app-navbar-menu :currentUser="currentUser" v-else />
    </v-app-bar>
  </div>
</template>

<script>
import AppNavbarDrawer from "./AppNavbarDrawer.vue";
import AppNavbarMenu from "./AppNavbarMenu.vue";

export default {
  components: {
    AppNavbarDrawer,
    AppNavbarMenu
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