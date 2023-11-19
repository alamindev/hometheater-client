export const state = () => ({
    page: {}
});
export const mutations = {
    FETCH_PAGE_DATA: (state, data) => (state.page = data)
};
export const actions = {
    /**
     *
     * @param {*} param0
     * Fetch data for blog
     */
    async fetchPage({ commit, dispatch }, slug) {
        dispatch("loading/setLoading", null, { root: true });
        const { data } = await this.$axios.get("page/" + slug);
        commit("FETCH_PAGE_DATA", data.page);
        dispatch("loading/clearLoading", null, { root: true });
    }
};