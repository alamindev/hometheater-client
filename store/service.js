export const state = () => ({
    categories: [],
    service_header: {}
});
export const mutations = {
    FETCH_SERVICE_CATEGORIES: (state, datas) => (state.categories = datas),
    FETCH_SERVICE_HEADER: (state, data) => (state.service_header = data)
};
export const actions = {
    /**
     *
     * @param {*} param0
     * Fetch data for blog
     */
    async fetchServiceCategory({ commit, dispatch }, query) {
        dispatch("loading/setLoading", null, { root: true });
        try {
            let { data } = await this.$axios.get("/service-lists", this.data);
            commit("FETCH_SERVICE_CATEGORIES", data.categories);
        } catch (e) {
            return;
        }
        dispatch("loading/clearLoading", null, { root: true });
    },
    /**
     *
     * @param {*} param0
     * Fetch data for service
     */
    async fetchServiceHeader({ commit, dispatch }, param) {
        try {
            dispatch("loading/setLoading", null, { root: true });
            let { data } = await this.$axios.get("/service-header");
            commit("FETCH_SERVICE_HEADER", data.header);
            dispatch("loading/clearLoading", null, { root: true });
        } catch (e) {
            return;
        }
    }
};