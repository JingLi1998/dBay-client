<template>
  <v-content>
    <v-row style="padding-top: 50px" align="center" justify="center">
      <v-col align="center" cols="3">
        <h1>Login</h1>
        <user-login-form />
      </v-col>
    </v-row>
  </v-content>
</template>

<script>
import UserLoginForm from "../components/users/UserLoginForm.vue";

export default {
  components: { UserLoginForm }
};
</script>