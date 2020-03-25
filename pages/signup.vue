<template>
  <v-row style="padding-top: 50px" align="center" justify="center">
    <v-col align="center" cols="3">
      <h1>Signup</h1>
      <v-form ref="loginForm" class="my-9">
        <v-text-field
          v-model="loginData.username"
          :rules="[v => !!v || 'Username is required']"
          label="Username"
          required
        />
        <v-text-field
          v-model="loginData.email"
          :rules="[v => !!v || 'Email is required']"
          label="Email"
          required
        />
        <v-text-field
          v-model="loginData.password"
          :rules="[v => !!v || 'Password is required']"
          label="Password"
          required
        />
        <v-text-field
          v-model="loginData.confirmPassword"
          :rules="[v => (!!v && v) === loginData.password ||'Passwords do not match']"
          label="Confirm Password"
          required
        />
      </v-form>
      <v-btn style="min-width:150px" @click="login">
        <v-progress-circular v-if="loading" indeterminate color="primary" />
        <div v-else>Signup here</div>
      </v-btn>
      <v-fade-transition>
        <v-card-subtitle
          v-if="errors !== null"
          transition="fade"
          class="error--text"
        >Errors: {{errors.error}}</v-card-subtitle>
      </v-fade-transition>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      loginData: {
        username: null,
        email: null,
        password: null,
        confirmPassword: null
      }
    };
  },
  computed: {
    loading() {
      return this.$store.getters["users/isLoading"];
    },
    errors() {
      return this.$store.getters["users/errors"];
    }
  },
  methods: {
    async login() {
      if (this.$refs.loginForm.validate())
        return this.$store.dispatch("users/signupUser", this.loginData);
    }
  },
  beforeMount() {
    this.$store.dispatch("users/clearErrors");
  }
};
</script>