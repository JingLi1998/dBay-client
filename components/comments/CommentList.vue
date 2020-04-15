<template>
  <v-list>
    <v-divider class="my-1" />
    <div v-for="(comment, index) in comments" :key="index">
      <v-list-item>
        <v-list-item-avatar :size="size">
          <v-icon :size="size" v-if="!comment.imageUrl">mdi-account-circle</v-icon>
          <v-img v-else :src="comment.imageUrl" alt="userImage" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>
            {{ comment.body }} -
            {{ comment.username }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{
            convertDate(comment.created)
            }}
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-row align="center" justify="end">
          <v-menu left offset-y>
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" icon>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-if="isOwner(comment.username)"
                @click.prevent="deleteComment(comment._id, index)"
              >
                <v-list-item-title>Delete</v-list-item-title>
              </v-list-item>
              <v-list-item v-else>
                <v-list-item-title>Unauthorized</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-row>
      </v-list-item>
      <v-divider class="my-1" />
    </div>
  </v-list>
</template>

<script>
import moment from "moment";

export default {
  props: {
    comments: Array,
    currentUser: { type: Object, default: null },
    size: { type: Number, default: 40 }
  },
  methods: {
    deleteComment(commentId, index) {
      this.$store.dispatch("dogs/deleteComment", {
        dogId: this.dog._id,
        commentId,
        index
      });
    },
    isOwner(username) {
      if (this.currentUser)
        return username === this.currentUser.username ? true : false;
    },
    convertDate(created) {
      return moment(created).fromNow();
    }
  }
};
</script>
