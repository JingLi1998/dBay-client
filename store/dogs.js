import Vue from "vue";

export const state = () => ({
  errors: null,
  dogs: [],
  dog: null,
  owner: null,
  comments: null,
  likes: null
});

export const getters = {
  errors(state) {
    return state.errors;
  },
  dogs(state) {
    return state.dogs;
  },
  dog(state) {
    return state.dog;
  },
  comments(state) {
    return state.comments;
  },
  likes(state) {
    return state.likes;
  },
  owner(state) {
    return state.owner;
  }
};

export const mutations = {
  SET_DOGS(state, dogs) {
    Vue.set(state, "dogs", [...dogs]);
  },
  SET_DOG(state, dog) {
    state.dog = dog;
  },
  DELETE_DOG(state, index) {
    state.dogs.splice(index, 1);
  },
  SET_OWNER(state, user) {
    state.owner = user;
  },
  SET_COMMENTS(state, comments) {
    Vue.set(state, "comments", [...comments]);
  },
  SET_COMMENT(state, comment) {
    state.comments.push(comment);
  },
  DELETE_COMMENT(state, index) {
    state.comments.splice(index, 1);
  },
  SET_LIKES(state, likes) {
    Vue.set(state, "likes", [...likes]);
  },
  SET_LIKE(state, like) {
    state.likes.append(like);
  },
  DELETE_LIKE(state, index) {
    state.likes.splice(index, 1);
  },
  INCREMENT_LIKE(state, index) {
    state.dogs[index].likeCount++;
  },
  DECREMENT_LIKE(state, index) {
    state.dogs[index].likeCount--;
  }
};

export const actions = {
  async setDogs({ commit, dispatch }) {
    try {
      dispatch("ui/setLoading", null, { root: true });
      const res = await this.$axios.get("dogs");
      commit("SET_DOGS", res.data);
      dispatch("ui/stopLoading", null, { root: true });
    } catch (error) {
      console.log(error);
      dispatch("ui/stopLoading", null, { root: true });
    }
  },
  async setDog({ commit, dispatch }, id) {
    try {
      dispatch("ui/setLoading", null, { root: true });
      const res = await this.$axios.get(`dogs/${id}`);
      commit("SET_DOG", res.data.dog);
      commit("SET_OWNER", res.data.user);
      commit("SET_COMMENTS", res.data.comments);
      commit("SET_LIKES", res.data.likes);
      dispatch("ui/stopLoading", null, { root: true });
    } catch (error) {
      console.log(error);
      dispatch("ui/stopLoading", null, { root: true });
    }
  },
  async deleteDog({ commit, dispatch }, { id, index }) {
    try {
      dispatch("ui/setLoading", null, { root: true });
      await this.$axios.delete(`dogs/${id}`);
      commit("DELETE_DOG", index);
      dispatch("ui/stopLoading", null, { root: true });
    } catch (error) {
      console.log(error);
      dispatch("ui/stopLoading", null, { root: true });
    }
  },
  async postComment({ commit, dispatch }, { id, comment }) {
    try {
      dispatch("ui/setButtonLoading", null, { root: true });
      const res = await this.$axios.post(`/dogs/${id}/comments`, comment);
      commit("SET_COMMENT", res.data);
      dispatch("ui/stopButtonLoading", null, { root: true });
    } catch (error) {
      console.log(error);
      dispatch("ui/stopButtonLoading", null, { root: true });
    }
  },
  async deleteComment({ commit, dispatch }, { dogId, commentId, index }) {
    try {
      dispatch("ui/setButtonLoading", null, { root: true });
      const res = await this.$axios.delete(
        `dogs/${dogId}/comments/${commentId}`
      );
      commit("DELETE_COMMENT", index);
      dispatch("ui/stopButtonLoading", null, { root: true });
    } catch (error) {
      console.log(error);
      dispatch("ui/stopButtonLoading", null, { root: true });
    }
  },
  async likeDog({ commit, dispatch }, { dogId, index }) {
    try {
      const res = await this.$axios.get(`/dogs/${dogId}/like`);
      dispatch("users/setLike", res.data.like, { root: true });
      commit("INCREMENT_LIKE", index);
    } catch (error) {
      console.log(error);
    }
  },
  async unlikeDog({ commit, dispatch }, { dogId, index }) {
    try {
      const res = await this.$axios.get(`/dogs/${dogId}/unlike`);
      console.log(res);
      dispatch("users/deleteLike", dogId, { root: true });
      commit("DECREMENT_LIKE", index);
    } catch (error) {
      console.log(error);
    }
  }
};
