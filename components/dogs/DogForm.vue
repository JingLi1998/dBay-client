<template>
  <v-row style="padding-top: 50px" align="center" justify="center">
    <v-col align="center" cols="3">
      <h1>Post a New Dog</h1>
      <v-form ref="newDogForm" @submit.prevent="submitNewDog">
        <v-text-field
          label="Name"
          v-model="formData.name"
          :rules="[v => !!v || 'Name is required']"
          required
        />
        <v-text-field
          label="Breed"
          v-model="formData.breed"
          :rules="[v => !!v || 'Breed is required']"
          required
        />
        <v-select
          label="Gender"
          v-model="formData.gender"
          :items="['Male', 'Female']"
          :rules="[v => !!v || 'Gender is required']"
          required
        />
        <v-text-field
          label="Age"
          v-model="formData.age"
          :rules="[v => !!v || 'Age is required']"
          required
        />
        <v-text-field
          label="Price"
          v-model="formData.price"
          :rules="[v => !!v || 'Price is required']"
          required
        />
        <v-text-field
          label="Description"
          v-model="formData.description"
          :rules="[v => !!v || 'Description is required']"
          required
        />
        <v-file-input
          v-model="dogImage"
          label="Image File"
          accept="image/*"
          :rules="[v => !!v || 'Image is required']"
          validate-on-blur
          :prepend-icon="null"
          required
        />
        <br />
        <v-btn type="submit" :disabled="loading" :loading="loading">Post Dog</v-btn>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        name: null,
        breed: null,
        gender: null,
        age: null,
        price: null,
        description: null
      },
      dogImage: null,
      loading: false
    };
  },

  methods: {
    async submitNewDog() {
      if (this.$refs.newDogForm.validate())
        try {
          this.loading = true;
          // prepare form data for submission
          const formData = {
            ...this.formData,
            age: parseInt(this.formData.age),
            price: parseInt(this.formData.price)
          };
          const imageFormData = new FormData();
          imageFormData.append("dogImages", this.dogImage);
          // make axios posts
          let res = await this.$axios.post("/dogs", formData);
          res = await this.$axios.post(
            `/dogs/${res.data.dog._id}/uploadImage`,
            imageFormData
          );
          this.$refs.newDogForm.reset();
          this.loading = false;
        } catch (error) {
          console.log(error);
          this.loading = false;
        }
    }
  }
};
</script>