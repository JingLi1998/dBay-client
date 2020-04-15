<template>
  <v-card align="left" style="width:100%" class="px-5">
    <v-card-title>Comments</v-card-title>
    <v-card-subtitle class="pb-0">Show us what you think of the pupper!</v-card-subtitle>
    <comment-list :comments="comments" :currentUser="currentUser" />
    <comment-form v-if="isLoggedIn" />
  </v-card>
</template>

<script>
import CommentForm from "../comments/CommentForm";
import CommentList from "../comments/CommentList";

export default {
  components: {
    CommentForm,
    CommentList
  },
  props: {
    comments: { type: Array, required: true },
    currentUser: { type: Object, default: null },
    isLoggedIn: { type: Boolean, required: true }
  }
};
</script>