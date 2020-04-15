<template>
  <v-form ref="commentForm" @submit.prevent="postComment">
    <v-textarea v-model="comment" outlined class="px-1 mt-1" label="Post a comment" required></v-textarea>
    <v-card-actions class="mb-2">
      <v-spacer></v-spacer>
      <v-btn
        type="submit"
        :loading="buttonLoading"
        :disabled="buttonLoading || disabled"
      >Post Comment</v-btn>
    </v-card-actions>
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      comment: null
    };
  },
  computed: {
    buttonLoading() {
      return this.$store.getters["ui/buttonLoading"];
    },
    disabled() {
      return this.comment ? false : true;
    }
  },
  methods: {
    postComment() {
      if (this.$refs.commentForm.validate()) {
        this.$store.dispatch("dogs/postComment", {
          id: this.$route.params.id,
          comment: { body: this.comment }
        });
        this.$refs.commentForm.reset();
      }
    }
  }
};
</script>