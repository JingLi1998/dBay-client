<template>
  <div>
    <v-row v-if="dog !== null" justify="center">
      <v-col cols="6">
        <v-row>
          <dog-info-image :imageUrl="dog.imageUrl" />
        </v-row>
        <v-divider class="my-5" />
        <v-row>
          <dog-info-text :dog="dog" />
        </v-row>
        <v-divider class="my-5" />
        <v-row>
          <dog-info-comment
            :comments="comments"
            :currentUser="currentUser"
            :isLoggedIn="isLoggedIn"
          />
        </v-row>
      </v-col>
      <v-col cols="3">
        <dog-info-owner :owner="owner" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
import DogInfoText from "./DogInfoText.vue";
import DogInfoImage from "./DogInfoImage.vue";
import DogInfoComment from "./DogInfoComment.vue";
import DogInfoOwner from "./DogInfoOwner.vue";

export default {
  components: {
    DogInfoText,
    DogInfoImage,
    DogInfoComment,
    DogInfoOwner
  },
  computed: {
    ...mapState("dogs", ["dog", "owner", "comments", "likes"]),
    ...mapState("users", ["currentUser", "isLoggedIn"])
  }
};
</script>
