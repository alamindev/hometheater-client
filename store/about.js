export const state = () => ({
    sliders: [],
    information: {},
    members: [],
    counters: [],
    about: {},
    header: {}
});
export const mutations = {
    FETCH_SLIDER: (state, datas) => (state.sliders = datas),
    FETCH_INFORMATION: (state, data) => (state.information = data),
    FETCH_MEMBERS: (state, datas) => (state.members = datas),
    FETCH_COUNTERS: (state, datas) => (state.counters = datas),
    FETCH_ABOUT: (state, data) => (state.about = data),
    FETCH_HEADER: (state, data) => (state.header = data)
};
export const actions = {
    /**
     *
     * @param {*} param0
     * Fetch data for blog
     */
    async fetchAboutData({ commit, dispatch }, query) {
        dispatch("loading/setLoading", null, { root: true });
        const { data } = await this.$axios.get("fetch/about");
        commit("FETCH_SLIDER", data.sliders);
        commit("FETCH_INFORMATION", data.information);
        commit("FETCH_MEMBERS", data.members);
        commit("FETCH_COUNTERS", data.counters);
        commit("FETCH_ABOUT", data.about);
        commit("FETCH_HEADER", data.header);
        dispatch("loading/clearLoading", null, { root: true });
    }
};