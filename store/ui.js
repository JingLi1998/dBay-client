export const state = () => ({
  loading: false,
  buttonLoading: false
});

export const getters = {
  loading(state) {
    return state.loading;
  },
  buttonLoading(state) {
    return state.buttonLoading;
  }
};

export const mutations = {
  SET_LOADING(state) {
    state.loading = true;
  },
  STOP_LOADING(state) {
    state.loading = false;
  },
  SET_BUTTON_LOADING(state) {
    state.buttonLoading = true;
  },
  STOP_BUTTON_LOADING(state) {
    state.buttonLoading = false;
  }
};

export const actions = {
  setLoading({ commit }) {
    commit("SET_LOADING");
  },
  stopLoading({ commit }) {
    commit("STOP_LOADING");
  },
  setButtonLoading({ commit }) {
    commit("SET_BUTTON_LOADING");
  },
  stopButtonLoading({ commit }) {
    commit("STOP_BUTTON_LOADING");
  }
};
