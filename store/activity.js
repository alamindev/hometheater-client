export const state = () => ({
    activities: [],
    user_activities: [],
    loading_activity: false
});
export const getters = {};

export const mutations = {
    FETCH_ACTIVITY: (state, datas) => (state.activities = datas),
    FETCH_USER_ACTIVITY: (state, datas) => (state.user_activities = datas),
    LOADING_ACTIVITY: (state, bool) => (state.loading_activity = bool)
};

export const actions = {
    /**
     *
     * @param {*} param0
     * Fetch  all activities
     */
    async fetchActivities({ commit, dispatch }) {
        const { data } = await this.$axios.get("activities");
        commit("FETCH_ACTIVITY", data.activities);
    },
    /**
     *
     * @param {*} param0
     * Fetch Activities by user
     */
    async fetchUserActivity({ commit, dispatch }, id) {
        commit("LOADING_ACTIVITY", true);
        const { data } = await this.$axios.get(`activity/user/${id}`);
        commit("FETCH_USER_ACTIVITY", data.user_activities);
        commit("LOADING_ACTIVITY", false);
    }
};
