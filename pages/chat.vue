<template>
  <v-row style="padding-top: 50px" align="center" justify="center">
    <v-col align="center" cols="3">
      <h1>Chat Now!</h1>
      <p v-if="token === null">You must login to chat</p>
      <div v-else>
        <v-btn v-if="!chatroom" @click="joinChat">Join Chatroom</v-btn>
        <div v-else>
          <v-list-item-group>
            <v-slide-y-transition v-if="messages.length > 0" class="py-0" group>
              <template v-for="(message, i) in messages">
                <v-divider v-if="i !== 0" :key="`${i}-divider`"></v-divider>
                <v-list-item :key="i">
                  <v-list-item-content>
                    <v-list-item-title v-text="message" />
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
      message: null,
      chatroom: false
    };
  },
  computed: {
    messages() {
      return this.$store.getters["chat/messages"];
    },
    token() {
      return this.$store.getters["users/token"];
    }
  },
  sockets: {
    hello: function(message) {
      this.$store.dispatch("chat/newMessage", message);
    },
    newMessage: function(message) {
      this.$store.dispatch("chat/newMessage", message);
    },
    unauthorized: function(error) {
      console.log(error);
      if (
        error.data.type == "UnauthorizedError" ||
        error.data.code == "invalid_token"
      ) {
        alert("Unauthorized");
      }
    },
    disconnect: function() {
      alert('Disconnecting')
    }
  },
  methods: {
    sendMessage() {
      if (this.message !== null && this.message.trim() !== "") {
        this.$socket.emit("chatMessage", { message: this.message });
        this.clearForm();
      }
    },
    clearForm() {
      this.message = null;
    },
    joinChat() {
      if (this.token !== null) {
        this.$socket.emit("authenticate", { token: this.token });
        this.chatroom = !this.chatroom;
      }
    }
  }
};
</script>