export const state = () => ({
  errors: null,
  token: null,
  currentUser: null,
  isLoggedIn: false
});

export const getters = {
  errors(state) {
    return state.errors;
  },
  token(state) {
    return state.token;
  },
  currentUser(state) {
    return state.currentUser === null ? null : state.currentUser;
  },
  isLoggedIn(state) {
    return state.isLoggedIn;
  }
};

export const mutations = {
  SET_ERRORS(state, errors) {
    state.errors = errors;
  },
  CLEAR_ERRORS(state) {
    state.errors = null;
  },
  SET_TOKEN(state, token) {
    state.token = token;
  },
  SET_CURRENT_USER(state, user) {
    state.currentUser = user;
  },
  CLEAR_CURRENT_USER(state) {
    state.currentUser = null;
  },
  SET_IS_LOGGED_IN(state) {
    state.isLoggedIn = true;
  },
  SET_IS_LOGGED_OUT(state) {
    state.isLoggedIn = false;
  }
};

export const actions = {
  async signupUser({ dispatch }, signupDetails) {
    try {
      dispatch("clearErrors");
      dispatch("ui/setLoading", null, { root: true });
      await this.$axios.post("user/signup", signupDetails);
      const res = await this.$axios.post("user/login", {
        email: signupDetails.email,
        password: signupDetails.password
      });
      localStorage.setItem("user-token", res.data.token);
      dispatch("setToken", res.data.token);
      dispatch("getUserData");
      dispatch("setIsLoggedIn");
      this.$router.push("/");
      setTimeout(() => {
        dispatch("ui/stopLoading", null, { root: true });
      }, 500);
    } catch (error) {
      console.log(error.response);
      dispatch("setErrors", error.response.data);
      dispatch("ui/stopLoading", null, { root: true });
    }
  },
  async loginUser({ dispatch }, loginDetails) {
    try {
      dispatch("clearErrors");
      dispatch("ui/setLoading", null, { root: true });
      const res = await this.$axios.post("user/login", loginDetails);
      localStorage.setItem("user-token", res.data.token);
      dispatch("setToken", res.data.token);
      dispatch("getUserData");
      dispatch("setIsLoggedIn");
      this.$router.push("/");
      setTimeout(() => {
        dispatch("ui/stopLoading", null, { root: true });
      }, 500);
    } catch (error) {
      dispatch("setErrors", error.response.data);
      dispatch("ui/stopLoading", null, { root: true });
    }
  },
  async logoutUser({ dispatch }) {
    try {
      dispatch("ui/setLoading", null, { root: true });
      dispatch("clearCurrentUser");
      dispatch("setIsLoggedOut");
      localStorage.removeItem("user-token");
      this.$router.push("/");
      dispatch("ui/stopLoading", null, { root: true });
    } catch (error) {
      console.log(error);
      dispatch("ui/stopLoading", null, { root: true });
    }
  },
  async getUserData({ commit }) {
    try {
      const res = await this.$axios.get("user/profile");
      commit("SET_CURRENT_USER", res.data.user);
    } catch (error) {
      console.log(error);
    }
  },
  async updateUserData({ commit, dispatch }, { user, image }) {
    try {
      dispatch("ui/setLoading", null, { root: true });
      let res = await this.$axios.put("/user/profile", user);
      if (image !== null) {
        res = await this.$axios.post("/user/profile/uploadImage", image);
      }
      commit("SET_CURRENT_USER", res.data.user);
      console.log(res.data);
      dispatch("ui/stopLoading", null, { root: true });
    } catch (error) {
      console.log(error);
      dispatch("ui/stopLoading", null, { root: true });
    }
  },
  setErrors({ commit }, errors) {
    commit("SET_ERRORS", errors);
  },
  clearErrors({ commit }) {
    commit("CLEAR_ERRORS");
  },
  setToken({ commit }, token) {
    this.$axios.setToken(token, "Bearer");
    commit("SET_TOKEN", token);
  },
  setIsLoggedIn({ commit }) {
    commit("SET_IS_LOGGED_IN");
  },
  setIsLoggedOut({ commit }) {
    commit("SET_IS_LOGGED_OUT");
  },
  clearCurrentUser({ commit }) {
    commit("CLEAR_CURRENT_USER");
  }
};
