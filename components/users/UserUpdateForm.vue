<template>
  <v-row style="padding-top: 50px" align="center" justify="center">
    <v-col align="center" cols="3">
      <h1>Update Your Profile</h1>
      <v-form v-if="currentUser !== null" ref="updateUserForm" @submit.prevent="submitUserUpdate">
        <v-text-field label="Location" v-model="currentUser.location" required />
        <v-text-field label="Bio" v-model="currentUser.bio" required />
        <v-file-input
          v-model="userImage"
          label="Image File"
          accept="image/*"
          validate-on-blur
          :prepend-icon="null"
          required
        />
        <br />
        <v-btn type="submit" :disabled="loading" :loading="loading">Update Details</v-btn>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      userImage: null
    };
  },
  computed: {
    loading() {
      return this.$store.getters["ui/loading"];
    },
    currentUser() {
      return Object.assign({}, this.$store.getters["users/currentUser"]);
    }
  },
  methods: {
    async submitUserUpdate() {
      if (this.userImage !== null) {
        const imageFormData = new FormData();
        imageFormData.append("userImages", this.userImage);
        await this.$store.dispatch("users/updateUserData", {
          user: this.currentUser,
          image: imageFormData
        });
      } else {
        await this.$store.dispatch("users/updateUserData", {
          user: this.currentUser,
          image: null
        });
      }
      this.$refs.updateUserForm.reset();
      this.userImage = null;
    }
  }
};
</script>