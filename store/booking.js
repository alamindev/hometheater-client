export const state = () => ({
    services: [],
    service: {},
    suggests: [],
    service_header: {},
    reviews: [],
    booking: {},
    allreviews: []
});

export const mutations = {
    FETCH_SERVICES: (state, datas) => (state.services = datas),
    FETCH_SERVICE: (state, data) => (state.service = data),
    FETCH_SUGGEST_SERVICES: (state, datas) => (state.suggests = datas),
    FETCH_SERVICE_HEADER: (state, data) => (state.service_header = data),
    FETCH_REVIEWS: (state, datas) => (state.reviews = datas),
    FETCH_ALL_REVIEWS: (state, datas) => (state.allreviews = datas),
    FETCH_REVIEW: (state, data) => (state.review = data)
};

export const actions = {
    /**
     *
     * @param {*} param0
     * Fetch category for gallery sidebar
     */
    async fetchServices({ commit, dispatch }) {
        dispatch("loading/setLoading", null, { root: true });
        const { data } = await this.$axios.get("/services");
        commit("FETCH_SERVICES", data.services);
        commit("FETCH_SERVICE_HEADER", data.header);
        dispatch("loading/clearLoading", null, { root: true });
    },
    /**
     *
     * @param {*} param0
     * Fetch category for gallery sidebar
     */
    async fetchService({ commit, dispatch }, slug) {
        const { data } = await this.$axios.get("/service-details/" + slug);
      if (data.success == true) {
            commit("FETCH_SERVICE", data.service);
            commit("FETCH_SUGGEST_SERVICES", data.suggests);
            commit("FETCH_REVIEWS", data.reviews);
            commit("FETCH_ALL_REVIEWS", data.allreviews);
            return true;
        }
        return false;
    },
    async fetchReviewPage({ commit, dispatch }, { slug, pageNum }) {
        const { data } = await this.$axios.get(
            `/fetch-reviews/${slug}?page=${pageNum}`
        );
        if (data.success === true) {
            if (data.data.length > 0) {
                commit("FETCH_REVIEWS", data.reviews);
            }
        }
    },
    /**
     *
     * @param {*} param0
     * Fetch booking reviews
     */
    async fetchReview({ commit, dispatch }, id) {
        const { data } = await this.$axios.get("/review/" + id);
        if (data.success == true) {
            commit("FETCH_REVIEW", data.review);
            return true;
        } else {
            return false;
        }
    }
};
