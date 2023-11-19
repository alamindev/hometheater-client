export const state = () => ({
  loading: false
});

export const getters = {
  loading(state) {
    return state.loading;
  }
};

export const mutations = {
  SET_LOADING(state, bool) {
    state.loading = bool;
  }
};

export const actions = {
  setLoading({ commit }) {
    commit("SET_LOADING", true);
  },
  clearLoading({ commit }) {
    commit("SET_LOADING", false);
  }
};
