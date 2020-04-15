<template>
  <v-card style="width: 100%">
    <v-img height="600px" :src="imageUrl" />
  </v-card>
</template>

<script>
export default {
  props: { imageUrl: { type: String, default: null } }
};
</script>