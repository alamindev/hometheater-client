export const state = () => ({
    contact: {}
});

export const mutations = {
    FETCH_CONTACT_DATA: (state, data) => (state.contact = data)
};

export const actions = {
    /**
     *
     * @param {*} param0
     * Fetch data for blog
     */
    async fetchContactData({ commit, dispatch }) {
        dispatch("loading/setLoading", null, { root: true });
        const { data } = await this.$axios.get("contact");
        commit("FETCH_CONTACT_DATA", data.contact);
        dispatch("loading/clearLoading", null, { root: true });
    }
};