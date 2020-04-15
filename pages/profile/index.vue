<template>
  <v-row align="center" justify="center">
    <div v-if="loading">Loading...</div>
    <v-col v-else-if="currentUser !== null" cols="6">
      <v-card>
        <div style="height: 300px; width:100%; background-color:grey">
          <v-row align="end" class="fill-height">
            <v-col align-self="end" class="pa-0" cols="3">
              <v-avatar class="profile" size="200">
                <v-img :src="currentUser.imageUrl"></v-img>
              </v-avatar>
            </v-col>
            <v-col class="py-0">
              <v-list-item class="pl-0" color="rgba(0, 0, 0, .4)" dark>
                <v-list-item-content>
                  <v-list-item-title class="title">{{
                    currentUser.username
                  }}</v-list-item-title>
                  <v-list-item-subtitle>
                    {{ currentUser.bio }}</v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>
            </v-col>
          </v-row>
        </div>
        <div style="height: 50px; width:100%; background-color:white">
          <v-tabs hide-slider style="margin-left: 23.25%">
            <v-tab @click="tab = 'dogs'">Dogs</v-tab>
            <v-tab @click="tab = 'comments'">Comments</v-tab>
            <!-- <v-tab @click="tab = 'likes'">Likes</v-tab> -->
          </v-tabs>
        </div>
      </v-card>
      <br />
      <dog-list
        v-show="tab === 'dogs'"
        v-bind:dogs="currentUser.dogs"
        size="200"
      />
      <comment-list
        v-show="tab === 'comments'"
        v-bind:comments="currentUser.comments"
      />
      <!-- <like-list v-bind:likes="currentUser.likes" /> -->
    </v-col>
  </v-row>
</template>

<script>
import moment from "moment";
import DogList from "../../components/dogs/DogList.vue";
import CommentList from "../../components/comments/CommentList.vue";

export default {
  components: {
    DogList,
    CommentList
  },
  data() {
    return {
      tab: "dogs"
    };
  },
  computed: {
    loading() {
      return this.$store.getters["ui/loading"];
    },
    currentUser() {
      return this.$store.getters["users/currentUser"];
    }
  },
  methods: {
    clickTab() {
      alert(this.tab);
    }
  }
};
</script>

<style lang="scss" scoped>
.profile {
  position: absolute;
  top: 125px;
  left: 10px;
  border: solid white 5px;
}
</style>
