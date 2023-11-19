export const state = () => ({
  user: {}
});

export const mutations = {
  FETCH_USER: (state, data) => (state.user = data)
};

export const actions = {
  /**
   *
   * @param {*} param0
   * Fetch category for gallery sidebar
   */
  async fetchUser({ commit }, id) {
    const { data } = await this.$axios.get(`user/${id}/profile`);
    commit("FETCH_USER", data.user);
  }
};
