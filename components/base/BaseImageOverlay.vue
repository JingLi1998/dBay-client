<template>
  <v-hover v-slot:default="{ hover }">
    <v-img class="white--text align-end radius" transition="none" height="250px" :src="imageUrl">
      <template v-slot:placeholder>
        <div style="height:100%; width: 100%; background-color:grey" />
      </template>
      <v-fade-transition>
        <div v-if="hover" class="overlay" />
      </v-fade-transition>
    </v-img>
  </v-hover>
</template>

<script>
export default {
  props: {
    imageUrl: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.overlay {
  background-color: black;
  height: 100%;
  width: 100%;
  color: grey;
  opacity: 0.25;
  position: absolute;
  bottom: 0;
}
.radius {
  border-radius: 5px;
}
</style>