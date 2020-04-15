<template>
  <v-content>
    <v-row style="padding-top: 50px" align="center" justify="center">
      <v-col align="center" cols="3">
        <h1>Signup</h1>
        <user-signup-form />
      </v-col>
    </v-row>
  </v-content>
</template>

<script>
import UserSignupForm from "../components/users/UserSignupForm.vue";

export default {
  components: { UserSignupForm }
};
</script>