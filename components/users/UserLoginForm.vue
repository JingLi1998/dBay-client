<template>
  <v-form ref="loginForm" @submit.prevent="login" class="my-9">
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
      type="password"
      required
    />
    <v-btn :disabled="loading" :loading="loading" style="min-width:150px" type="submit">Login</v-btn>
    <v-fade-transition>
      <v-card-subtitle
        v-if="errors !== null"
        transition="fade"
        class="error--text"
      >Errors: {{errors.error}}</v-card-subtitle>
    </v-fade-transition>
  </v-form>
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
      return this.$store.getters["ui/loading"];
    },
    errors() {
      return this.$store.getters["users/errors"];
    }
  },
  methods: {
    async login() {
      if (this.$refs.loginForm.validate())
        await this.$store.dispatch("users/loginUser", this.loginData);
    }
  },
  beforeMount() {
    this.$store.dispatch("users/clearErrors");
  }
};
</script>