<template>
  <v-card align="left" class="px-8">
    <br />
    <v-list>
      <v-list-item>
        <v-list-item-avatar size="80">
          <v-icon v-if="!owner.imageUrl">mdi-account-circle</v-icon>
          <v-img v-else :src="owner.imageUrl" alt="userImage" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ owner.username }}</v-list-item-title>
          <v-list-item-subtitle>Breeder of Dogs</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider class="my-5" />
      <h4 class="ml-4">View some of this breeder's other dogs!</h4>
      <v-divider class="mt-5 mb-1" />
      <div v-if="owner.dogs.length > 5">
        <div v-for="(dog, index) in owner.dogs.slice(0, 5)" :key="index">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>{{ dog.name }}</v-list-item-title>
              <v-list-item-subtitle>{{ dog.breed }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider class="my-1" />
        </div>
      </div>
      <div v-else>
        <dog-list v-bind:dogs="owner.dogs" size="80" />
      </div>
    </v-list>
  </v-card>
</template>

<script>
import DogList from "./DogList.vue";

export default {
  components: {
    DogList
  },
  props: {
    owner: { type: Object, required: true }
  }
};
</script>