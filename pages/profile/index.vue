<template>
  <v-row align="center" justify="center">
    <div v-if="loading">Loading...</div>
    <v-col v-else-if="currentUser !== null" cols="6">
      <user-info :user="currentUser" :currentUser="currentUser" />
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from "vuex";
import UserInfo from "../../components/users/UserInfo.vue";

export default {
  components: {
    UserInfo
  },
  computed: {
    ...mapState("ui", ["loading"]),
    ...mapState("users", ["currentUser"])
  }
};
</script>
