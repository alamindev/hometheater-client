export const state = () => ({
    blogs: [],
    services: []
});
export const mutations = {
    FETCH_SEARCHES_BLOG: (state, datas) => (state.blogs = datas),
    FETCH_SEARCHES_SERVICE: (state, datas) => (state.services = datas)
};
export const actions = {
    /**
     *
     * @param {*} param0
     * Fetch data for blog
     */
    async fetchSearchesBlog({ commit, dispatch }, query) {
        dispatch("loading/setLoading", null, { root: true });
        const { data } = await this.$axios.get("blog/search?search=" + query);
        commit("FETCH_SEARCHES_BLOG", data.posts);
        dispatch("loading/clearLoading", null, { root: true });
    },
    /**
     *
     * @param {*} param0
     * Fetch data for service
     */
    async fetchSearchesService({ commit, dispatch }, param) {
        dispatch("loading/setLoading", null, { root: true });
        const { data } = await this.$axios.get("service/search?search=" + param);
        commit("FETCH_SEARCHES_SERVICE", data.services);
        dispatch("loading/clearLoading", null, { root: true });
    }
};