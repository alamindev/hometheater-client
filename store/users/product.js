export const state = () => ({ 
    products: {}, 
});

export const mutations = { 
    FETCH_PRODUCTS: (state, datas) => (state.products = datas), 
};

export const actions = {
    
    /**
     *
     * @param {*} param0
     * Fetch  edit booking details
     */
    async fetchProducts({ commit, dispatch }) {
        dispatch("loading/setLoading", null, { root: true });
        const { data } = await this.$axios.get(`products/${this.$auth.user.id}`);
        commit("FETCH_PRODUCTS", data.products);
        dispatch("loading/clearLoading", null, { root: true });
    }, 
    async fetchProductPage({ commit, dispatch }, pageNum) {
        const { data } = await this.$axios.get(
            `products/${this.$auth.user.id}?page=${pageNum}`
        );
        commit("FETCH_PRODUCTS", data.products);
    }, 
};
