<template>
  <v-form ref="signupForm" @submit.prevent="signup" class="my-9">
    <v-text-field
      v-model="signupData.username"
      :rules="[v => !!v || 'Username is required']"
      label="Username"
      required
    />
    <v-text-field
      v-model="signupData.email"
      :rules="[v => !!v || 'Email is required']"
      label="Email"
      required
    />
    <v-text-field
      v-model="signupData.password"
      :rules="[v => !!v || 'Password is required']"
      label="Password"
      required
    />
    <v-text-field
      v-model="signupData.confirmPassword"
      :rules="[
        v => (!!v && v) === signupData.password || 'Passwords do not match'
      ]"
      label="Confirm Password"
      required
    />
    <v-btn
      type="submit"
      :disabled="loading"
      :loading="loading"
      style="min-width:150px"
      >Signup</v-btn
    >
    <v-fade-transition>
      <v-card-subtitle
        v-if="errors !== null"
        transition="fade"
        class="error--text"
        >Errors: {{ errors.error }}</v-card-subtitle
      >
    </v-fade-transition>
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      signupData: {
        username: null,
        email: null,
        password: null,
        confirmPassword: null
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
    async signup() {
      if (this.$refs.signupForm.validate())
        return this.$store.dispatch("users/signupUser", this.signupData);
    }
  },
  beforeMount() {
    this.$store.dispatch("users/clearErrors");
  }
};
</script>
