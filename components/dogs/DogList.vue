<template>
  <v-list>
    <div v-for="(dog, index) in dogs" :key="index">
      <v-list-item :to="`/dogs/${dog._id}`">
        <v-list-item-avatar :size="size" tile>
          <v-img :src="dog.imageUrl"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ dog.name }}</v-list-item-title>
          <v-list-item-subtitle>{{ dog.breed }}</v-list-item-subtitle>
          <v-list-item-subtitle>{{ dog.description }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider class="my-1" />
    </div>
  </v-list>
</template>

<script>
export default {
  props: ["dogs", "size"]
};
</script>
