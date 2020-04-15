<template>
  <v-card class="px-5 py-2" align="left" style="width: 100%">
    <v-card-title class="headline">{{ dog.name }} - {{ dog.breed }}</v-card-title>
    <v-card-subtitle class="title">${{ dog.price }}</v-card-subtitle>
    <v-divider class="my-1" />
    <v-card-text class="body-1">{{ dog.description }}</v-card-text>
  </v-card>
</template>

<script>
export default {
  props: { dog: { type: Object, required: true } }
};
</script>