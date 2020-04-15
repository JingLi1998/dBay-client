<template>
  <v-app dark>
    <Nav v-bind:isLoggedIn="isLoggedIn" v-bind:currentUser="currentUser" />
    <nuxt />
    <!-- <Foot /> -->
  </v-app>
</template>

<script>
import Nav from "./partials/nav.vue";
import Foot from "./partials/foot.vue";
import jwtDecode from "jwt-decode";
import { mapGetters } from "vuex";

export default {
  components: { Nav, Foot },
  computed: {
    ...mapGetters("users", ["isLoggedIn", "currentUser"])
  },
  async beforeMount() {
    const token = localStorage.getItem("user-token");
    if (token) {
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);
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
