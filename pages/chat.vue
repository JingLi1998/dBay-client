<template>
  <v-row style="padding-top: 50px" align="center" justify="center">
    <v-col align="center" cols="3">
      <h1>Chat Now!</h1>
      <v-btn v-if="socket === null" @click="joinChat">Join Chatroom</v-btn>
      <div v-else>
        <v-list-item-group>
          <v-slide-y-transition v-if="sentMessages.length > 0" class="py-0" group>
            <template v-for="(sentMessage, i) in sentMessages">
              <v-divider v-if="i !== 0" :key="`${i}-divider`"></v-divider>
              <v-list-item :key="i">
                <v-list-item-content>
                  <v-list-item-title v-text="sentMessage" />
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-slide-y-transition>
          <v-list-item v-else>
            <v-list-item-content>
              <v-list-item-title v-text="'No messages'" />
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
        <v-form ref="chatForm" @submit.prevent="sendMessage" class="my-9">
          <v-text-field v-model="message" label="Type Something!" />
          <v-btn type="submit">Send Message</v-btn>
        </v-form>
      </div>
      <v-list>
        <v-list-item></v-list-item>
      </v-list>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      loginData: {
        email: null,
        password: null
      },
      message: null,
      socket: null,
      messages: []
    };
  },
  computed: {
    sentMessages() {
      return this.messages;
    },
    token() {
      return this.$store.getters["users/token"];
    }
  },
  methods: {
    sendMessage() {
      if (this.message !== null && this.message.trim() !== "") {
        this.socket.emit("chat message", { message: this.message });
        this.clearForm();
      }
    },
    clearForm() {
      this.message = null;
    },
    joinChat() {
      if (this.token !== null) {
        this.socket = this.$nuxtSocket({
          name: "home",
          reconnection: false
        });
        this.socket.on("connect", () => {
          this.socket.emit("authenticate", { token: this.token });
        });
        this.socket.on("new message", message => {
          this.messages.push(message.message);
        });
      }
    }
  }
};
</script>