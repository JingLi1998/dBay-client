<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col justify="center" align="center">
        <div v-if="loading">Loading...</div>
        <dog-info v-else />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DogInfo from "../../components/dogs/DogInfo.vue";
import { mapState } from "vuex";

export default {
  transition: "fade",
  components: {
    DogInfo
  },
  computed: {
    ...mapState("ui", ["loading"])
  },
  mounted() {
    this.$store.dispatch("dogs/setDog", this.$route.params.id);
  }
};
</script>
