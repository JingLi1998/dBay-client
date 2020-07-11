<template>
  <div>
    <!-- <app-navbar-drawer :drawerOptions="drawerOptions" /> -->
    <v-app-bar dark color="black" flat clipped-left fixed app>
      <!-- <v-app-bar-nav-icon @click.stop="drawerOptions.miniVariant = !drawerOptions.miniVariant" /> -->
      <v-toolbar-title v-text="title" class="pl-9 headline" />
      <v-spacer />
      <v-tooltip bottom v-for="item in items" :key="item.id">
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" :to="item.to">
            <v-icon>{{ item.icon }}</v-icon>
          </v-btn>
        </template>
        <span>{{ item.title }}</span>
      </v-tooltip>
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
      title: "dBay",
      items: [
        {
          icon: "mdi-home",
          title: "Home",
          to: "/"
        },
        {
          icon: "mdi-dog",
          title: "Dogs",
          to: "/dogs"
        },
        {
          icon: "mdi-paw",
          title: "New Dog",
          to: "/dogs/new"
        }
      ]
    };
  }
};
</script>