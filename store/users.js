// const getDefaultState = () => {
//   return {
//     errors: null,
//     loading: false
//   };
// };

// export const state = getDefaultState();

export const state = () => ({
  errors: null,
  loading: false,
  token: null
});
export const getters = {
  isLoading(state) {
    return state.loading;
  },
  errors(state) {
    return state.errors;
  },
  token(state) {
    return state.token;
  }
};

export const mutations = {
  SET_ERRORS(state, errors) {
    state.errors = errors;
  },
  CLEAR_ERRORS(state) {
    state.errors = null;
  },
  SET_LOADING(state) {
    state.loading = true;
  },
  STOP_LOADING(state) {
    state.loading = false;
  },
  SET_TOKEN(state, token) {
    state.token = token;
  }
};

export const actions = {
  async signupUser({ commit }, signupDetails) {
    try {
      commit("CLEAR_ERRORS");
      commit("SET_LOADING");
      await this.$axios.post("user/signup", signupDetails);
      const res = await this.$axios.post("user/login", {
        email: signupDetails.email,
        password: signupDetails.password
      });
      commit("SET_TOKEN", res.data.token);
      localStorage.setItem("user-token", res.data.token);
      this.$axios.setToken(res.data.token, "Bearer");
      this.$router.push("/");
      setTimeout(() => {
        commit("STOP_LOADING");
      }, 500);
    } catch (error) {
      commit("SET_ERRORS", error.response.data);
      commit("STOP_LOADING");
    }
  },
  async loginUser({ commit }, loginDetails) {
    try {
      commit("CLEAR_ERRORS");
      commit("SET_LOADING");
      const res = await this.$axios.post("user/login", loginDetails);
      commit("SET_TOKEN", res.data.token);
      localStorage.setItem("user-token", res.data.token);
      this.$axios.setToken(res.data.token, "Bearer");
      this.$router.push("/");
      setTimeout(() => {
        commit("STOP_LOADING");
      }, 500);
    } catch (error) {
      commit("SET_ERRORS", error.response.data);
      commit("STOP_LOADING");
    }
  },
  clearErrors({ commit }) {
    commit("CLEAR_ERRORS");
  }
};
