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
      <v-hover v-slot:default="{ hover }">
        <v-icon :color="hover ? 'red' : 'blue'" class="mr-1">mdi-heart</v-icon>
      </v-hover>
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
    }
  },
  computed: {
    isOwner() {
      if (this.currentUser) {
        if (this.currentUser.username === this.dog.owner) return true;
      }
      return false;
    }
  },
  methods: {
    deleteDog() {
      this.$store.dispatch("dogs/deleteDog", {
        id: this.dog._id,
        index: this.index
      });
    }
  }
};
</script>