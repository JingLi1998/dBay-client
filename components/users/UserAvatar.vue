<template>
  <v-list-item-avatar>
    <v-icon :size="size" v-if="!imageUrl">mdi-account-circle</v-icon>
    <v-img v-else :src="imageUrl" alt="userImage" />
  </v-list-item-avatar>
</template>

<script>
export default {
  props: {
    imageUrl: {
      type: String
    },
    size: {
      type: Number,
      default: 40
    }
  }
};
</script>