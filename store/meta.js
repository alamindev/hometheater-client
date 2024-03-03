export const state = () => ({
    home: {},
    service: {},
    booking: {},
    blog: {},
    gallery: {},
    contact: {},
    login: {},
    portfolio: {},
    register: {},
    product: {}
});
export const mutations = {
    FETCH_HOME_DATA: (state, data) => (state.home = data),
    FETCH_SERVICE_DATA: (state, data) => (state.service = data),
    FETCH_BOOKING_DATA: (state, data) => (state.booking = data),
    FETCH_BLOG_DATA: (state, data) => (state.blog = data),
    FETCH_GALLERY_DATA: (state, data) => (state.gallery = data),
    FETCH_CONTACT_DATA: (state, data) => (state.contact = data),
    FETCH_LOGIN_DATA: (state, data) => (state.login = data),
    FETCH_PORTFOLIO_DATA: (state, data) => (state.portfolio = data),
    FETCH_REGISTER_DATA: (state, data) => (state.register = data),
    FETCH_PRODUCT_DATA: (state, data) => (state.product = data)
};
export const actions = {
    /**
     *
     * @param {*} param0
     * Fetch data for blog
     */
    async fetchMetaInfo({ commit, dispatch }, type) {
        const { data } = await this.$axios.get("fetch-meta/" + type);
        if (data.success == true) {
            if (data.type == "home") {
                commit("FETCH_HOME_DATA", data.meta);
            } else if (data.type == "service") {
                commit("FETCH_SERVICE_DATA", data.meta);
            } else if (data.type == "booking") {
                commit("FETCH_BOOKING_DATA", data.meta);
            } else if (data.type == "blog") {
                commit("FETCH_BLOG_DATA", data.meta);
            } else if (data.type == "gallery") {
                commit("FETCH_GALLERY_DATA", data.meta);
            } else if (data.type == "contact") {
                commit("FETCH_CONTACT_DATA", data.meta);
            } else if (data.type == "login") {
                commit("FETCH_LOGIN_DATA", data.meta);
            } else if (data.type == "register") {
                commit("FETCH_REGISTER_DATA", data.meta);
            } else if (data.type == "portfolio") {
                commit("FETCH_PORTFOLIO_DATA", data.meta); 
            } else if (data.type == "product") {
                commit("FETCH_PRODUCT_DATA", data.meta);
            }
        }
    }
};
