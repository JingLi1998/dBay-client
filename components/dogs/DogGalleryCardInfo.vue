<template>
  <v-list-item class="grow">
    <nuxt-link to="/" style="cursor:pointer" tag="div">
      <user-avatar :imageUrl="dog.ownerImageUrl" />
    </nuxt-link>
    <v-list-item-content>
      <v-list-item-title>{{ dog.name }} - {{ dog.breed }}</v-list-item-title>
      <v-list-item-subtitle>{{ dog.owner }}</v-list-item-subtitle>
    </v-list-item-content>
    <v-row align="center" justify="end">
      <v-icon
        :color="isLiked ? 'red' : 'blue'"
        class="mr-1"
        @click="isLiked ? unlikeDog({dogId: dog._id, index}) : likeDog({dogId: dog._id, index})"
      >mdi-heart</v-icon>
      <span class="subheading mr-2">{{ dog.likeCount }}</span>
      <v-icon class="mr-1">mdi-comment</v-icon>
      <span class="subheading mr-2">{{ dog.commentCount }}</span>
      <v-menu left offset-y>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" icon>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-if="isOwner" @click.prevent="deleteDog">
            <v-list-item-title>Delete</v-list-item-title>
          </v-list-item>
          <v-list-item v-else>
            <v-list-item-title>Unauthorized</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-row>
  </v-list-item>
</template>
<script>
import UserAvatar from "../users/UserAvatar.vue";
import { mapActions } from "vuex";

export default {
  components: {
    UserAvatar
  },
  props: {
    dog: {
      type: Object
    },
    currentUser: {
      type: Object
    },
    index: {
      type: Number,
      required: true
    }
  },
  computed: {
    isOwner() {
      if (this.currentUser) {
        return this.currentUser.username === this.dog.owner ? true : false;
      }
      return false;
    },
    isLiked() {
      if (this.currentUser) {
        return this.currentUser.likes.filter(
          like => like.dogId === this.dog._id
        ).length !== 0
          ? true
          : false;
      }
    }
  },
  methods: {
    ...mapActions("dogs", ["likeDog", "unlikeDog"]),
    deleteDog() {
      this.$store.dispatch("dogs/deleteDog", {
        id: this.dog._id,
        index: this.index
      });
    }
  }
};
</script>