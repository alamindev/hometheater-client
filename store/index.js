export const state = () => ({
    services: [],
    topheader: {},
    header_service: {},
    choose_us: [],
    choose_us_header: {},
    affiliation: [],
    affiliation_header: {},
    portfolio: [],
    portfolio_header: {},
    review: [],
    review_header: {},
    setting: {},
    pages: []
});
export const getters = {
    authenticated(state) {
        return state.auth.loggedIn;
    },
    user(state) {
        return state.auth.user;
    }
};
export const mutations = {
    FETCH_SETTING: (state, data) => (state.setting = data),
    FETCH_SERVICES: (state, datas) => (state.services = datas),
    FETCH_TOP_HEADER: (state, data) => (state.topheader = data),
    FETCH_HEADER_SERVICE: (state, data) => (state.header_service = data),
    FETCH_CHOOSE_US: (state, datas) => (state.choose_us = datas),
    FETCH_CHOOSE_US_HEADER: (state, data) => (state.choose_us_header = data),
    FETCH_AFFILIATION: (state, datas) => (state.affiliation = datas),
    FETCH_AFFILIATION_HEADER: (state, data) => (state.affiliation_header = data),
    FETCH_PORTFOLIO: (state, datas) => (state.portfolio = datas),
    FETCH_PORTFOLIO_HEADER: (state, data) => (state.portfolio_header = data),
    FETCH_REVIEW: (state, datas) => (state.review = datas),
    FETCH_REVIEW_HEADER: (state, datas) => (state.review_header = datas),
    FETCH_COMPANY_PAGES: (state, datas) => (state.company_pages = datas),
    FETCH_SERVICE_PAGES: (state, datas) => (state.service_pages = datas)
};
export const actions = {
    /**
     *
     * @param {*} param0
     * Fetch fetchSetting
     */
    async fetchSetting({ commit, dispatch }) {
        const { data } = await this.$axios.get("/setting");
        commit("FETCH_SETTING", data.setting);
        commit("FETCH_COMPANY_PAGES", data.company_pages);
        commit("FETCH_SERVICE_PAGES", data.service_pages);
    },
    /**
     *
     * @param {*} param0
     * Fetch fetchServices
     */
    async fetchServices({ commit, dispatch }) {
        const { data } = await this.$axios.get("/services-home");
        commit("FETCH_SERVICES", data.services);
    },
    /**
     *
     * @param {*} param0
     * Fetch fetchHomePageData
     */
    async fetchHomePageData({ commit, dispatch }) {
        dispatch("loading/setLoading", null, { root: true });
        const { data } = await this.$axios.get("/fetch/data");
        commit("FETCH_TOP_HEADER", data.topheader);
        commit("FETCH_HEADER_SERVICE", data.header_service);
        commit("FETCH_CHOOSE_US", data.choose_us);
        commit("FETCH_CHOOSE_US_HEADER", data.choose_us_header);
        commit("FETCH_AFFILIATION", data.affiliation);
        commit("FETCH_AFFILIATION_HEADER", data.affiliation_header);
        commit("FETCH_PORTFOLIO", data.portfolio);
        commit("FETCH_PORTFOLIO_HEADER", data.portfolio_header);
        commit("FETCH_REVIEW", data.review);
        commit("FETCH_REVIEW_HEADER", data.review_header);
        dispatch("loading/clearLoading", null, { root: true });
    },

    /**
     *
     * @param {*} param0
     * Fetch fetchHomePageData
     */
    async checkRequireFields({ commit, dispatch }) {
        const { data } = await this.$axios.get(
            `/auth/check-fields/${this.$auth.user.id}`
        );
        if (data.success === true) {
            return true;
        }
        return false;
    }
};
