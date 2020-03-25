<template>
  <v-row style="padding-top: 50px" align="center" justify="center">
    <v-col align="center" cols="3">
      <h1>Login</h1>
      <v-form ref="loginForm" class="my-9">
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
      </v-form>
      <v-btn style="min-width:150px" @click="login">
        <v-progress-circular v-if="loading" indeterminate color="primary" />
        <div v-else>Login here</div>
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
        email: null,
        password: null
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
        return this.$store.dispatch("users/loginUser", this.loginData);
    }
  },
  beforeMount() {
    this.$store.dispatch("users/clearErrors");
  }
};
</script>