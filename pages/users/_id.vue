<template>
  <v-row align="center" justify="center">
    <v-col cols="6">
      <v-card v-if="currentUser !== null">
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
                  <v-list-item-title class="title">
                    {{
                    currentUser.username
                    }}
                  </v-list-item-title>
                  <v-list-item-subtitle>{{ currentUser.bio }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-col>
          </v-row>
        </div>
        <div style="height: 50px; width:100%; background-color:white"></div>
      </v-card>
      <br />
      <dog-list :dogs="currentUser.dogs" />
    </v-col>
  </v-row>
</template>

<script>
import moment from "moment";
import DogList from "../../components/dogs/DogList.vue";

export default {
  components: {
    DogList
  },
  computed: {
    currentUser() {
      return this.$store.getters["users/currentUser"];
    }
  },
  methods: {
    convertDate(created) {
      return moment(created).fromNow();
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
