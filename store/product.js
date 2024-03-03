export const state = () => ({
    products: [],
    product: {},
    suggests: [],
    product_header: {},
    reviews: [],
    booking: {},
    allreviews: []
});

export const mutations = {
    FETCH_PRODUCTS: (state, datas) => (state.products = datas),
    FETCH_PRODUCT: (state, data) => (state.product = data),
    FETCH_SUGGEST_PRODUCTS: (state, datas) => (state.suggests = datas),
    FETCH_PRODUCT_HEADER: (state, data) => (state.product_header = data),
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
    async fetchProducts({ commit, dispatch }) {
        dispatch("loading/setLoading", null, { root: true });
        const { data } = await this.$axios.get("/products");
        commit("FETCH_PRODUCTS", data.products);
        commit("FETCH_PRODUCT_HEADER", data.header);
        dispatch("loading/clearLoading", null, { root: true });
    },
    /**
     *
     * @param {*} param0
     * Fetch category for gallery sidebar
     */
    async fetchProduct({ commit, dispatch }, slug) {
        const { data } = await this.$axios.get("/product-details/" + slug);
      if (data.success == true) {
          commit("FETCH_PRODUCT", data.product);    
            commit("FETCH_SUGGEST_PRODUCTS", data.suggests);
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
