<template>
  <v-card class="mx-0" flat max-width="400">
    <nuxt-link :to="`dogs/${dog._id}`">
      <base-image-overlay :imageUrl="dog.imageUrl" />
    </nuxt-link>
    <v-card-actions>
      <dog-gallery-card-info :dog="dog" :currentUser="currentUser" :index="index" />
    </v-card-actions>
  </v-card>
</template>

<script>
import BaseImageOverlay from "../base/BaseImageOverlay.vue";
import DogGalleryCardInfo from "./DogGalleryCardInfo.vue";

export default {
  components: { BaseImageOverlay, DogGalleryCardInfo },
  props: ["dog", "currentUser", "index"]
};
</script>


