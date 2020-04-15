<template>
  <v-navigation-drawer
    dark
    color="black"
    clipped
    :mini-variant="drawerOptions.miniVariant"
    fixed
    app
  >
    <v-list>
      <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
        <v-list-item-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title v-text="item.title" />
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: ["drawerOptions"],
  data() {
    return {
      items: [
        {
          icon: "mdi-home",
          title: "Welcome",
          to: "/"
        },
        {
          icon: "mdi-dog",
          title: "Dogs",
          to: "/dogs"
        },
        {
          icon: "mdi-paw",
          title: "New Dog",
          to: "/dogs/new"
        }
      ]
    };
  }
};
</script>