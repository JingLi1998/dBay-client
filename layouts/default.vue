<template>
  <v-app dark>
    <app-navbar :isLoggedIn="isLoggedIn" :currentUser="currentUser" />
    <nuxt />
  </v-app>
</template>

<script>
import AppNavbar from "./partials/AppNavbar.vue";
import jwtDecode from "jwt-decode";
import { mapState } from "vuex";

export default {
  components: { AppNavbar },
  computed: {
    ...mapState("users", ["isLoggedIn", "currentUser"])
  },
  async beforeMount() {
    const token = localStorage.getItem("user-token");
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 > Date.now()) {
        await this.$store.dispatch("users/setToken", token);
        await this.$store.dispatch("users/getUserData");
        await this.$store.dispatch("users/setIsLoggedIn");
      } else {
        await this.$store.dispatch("users/logoutUser");
        await this.$router.push("/login");
      }
    }
  }
};
</script>
