<template>
  <div>
    <dog-gallery />
  </div>
</template>

<script>
import DogGallery from "../../components/dogs/DogGallery.vue";

export default {
  transition: "fade",
  components: {
    DogGallery
  }
};
</script>
