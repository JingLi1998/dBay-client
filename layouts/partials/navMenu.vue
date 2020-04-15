<template>
  <v-menu v-model="menu" :close-on-content-click="true" offset-y>
    <template v-slot:activator="{ on }">
      <v-avatar>
        <v-icon v-on="on">mdi-account-circle</v-icon>
      </v-avatar>
    </template>
    <v-card v-if="currentUser !== null">
      <v-list>
        <v-list-item>
          <v-list-item-avatar>
            <v-icon size="44" v-if="!currentUser.imageUrl">mdi-account-circle</v-icon>
            <v-img v-else :src="currentUser.imageUrl" alt="userImage" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{currentUser.username}}</v-list-item-title>
            <v-list-item-subtitle>Breeder of Dogs</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list>
        <v-list-item @click="$router.push('/profile')">View Profile</v-list-item>
        <v-list-item @click="$router.push('/profile/update')">Update Details</v-list-item>
        <v-list-item @click="logout">Logout</v-list-item>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  props: ["currentUser"],
  data() {
    return {
      menu: false
    };
  },
  methods: {
    logout() {
      this.menu = false;
      return this.$store.dispatch("users/logoutUser");
    }
  }
};
</script>