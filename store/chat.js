export const state = () => ({
  user: {},
  messages: [],
  users: []
});

export const getters = {
  messages(state) {
    return state.messages;
  }
};

export const mutations = {
  SET_USER(state, user) {
    state.user = user;
  },
  NEW_MESSAGE(state, msg) {
    state.messages.push(msg);
  },
  UPDATE_USERS(state, users) {
    state.users = users;
  },
  CLEAR_DATA(state) {
    state.user = {};
    state.messages = [];
    state.users = [];
  }
};

export const actions = {
  setUser({ commit }, user) {
    commit("SET_USER", user);
  },
  newMessage({ commit }, message) {
    commit("NEW_MESSAGE", message);
  },
  updateUsers({ commit }, users) {
    commit("UPDATE_USERS", users);
  },
  clearData({ commit }) {
    commit("CLEAR_DATA");
  }
};
