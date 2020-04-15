<template>
  <v-container>
    <v-row no-gutters v-if="loading">
      <v-col class="py-3" v-for="index in 8" :key="index" cols="3">
        <v-card class="mx-0" flat max-width="400">
          <div style="width:100%; height: 250px; background-color: grey"></div>
          <v-card-actions>
            <v-list-item-avatar to="/login" color="grey darken-3">
              <v-icon dark>mdi-account-circle</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <div>
                <div style="height:20px; background-color:grey"></div>
              </div>
              <div>
                <div style="height:20px; background-color:grey"></div>
              </div>
            </v-list-item-content>
            <v-row align="center" justify="end">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col class="py-3" v-for="(dog, index) in dogs" :key="index" cols="3">
        <dog-gallery-card :dog="dog" :index="index" :currentUser="currentUser" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DogGalleryCard from "./DogGalleryCard.vue";

export default {
  components: {
    DogGalleryCard
  },
  computed: {
    dogs() {
      return this.$store.getters["dogs/dogs"];
    },
    currentUser() {
      return this.$store.getters["users/currentUser"];
    },
    loading() {
      return this.$store.getters["ui/loading"];
    }
  },
  created() {
    this.$store.dispatch("dogs/setDogs");
  }
};
</script>
