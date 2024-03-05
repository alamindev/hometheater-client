export const state = () => ({
    product: null,
    booking: null,
    user: null,
    booking_count: "",
    product_count: "",
    review_count: "",
    total_span: ""
});

export const mutations = {
    RECENT_PRODUCT: (state, product) =>
        (state.product = product),
        RECENT_BOOKING: (state, booking) =>
        (state.booking = booking),
    BOOKING_COUNT: (state, data) => (state.booking_count = data),
    USER: (state, data) => (state.user = data),
    PRODUCT_COUNT: (state, data) => (state.product_count = data),
    REVIEW_COUNT: (state, data) => (state.review_count = data),
    TOTAL_SPAN: (state, data) => (state.total_span = data),
    UPDATE_BOOKINGS: (state, id) =>   (state.recent_booking = state.recent_booking.filter(el => el.id !== id))
};

export const actions = {
    async fetchAllRequiredDatas({ commit, dispatch }) {
        dispatch("loading/setLoading", null, { root: true });
        const { data } = await this.$axios.get(
            "users/dashboard/" + this.$auth.user.id
        ); 
        commit("PRODUCT_COUNT", data.product_count);
        commit("BOOKING_COUNT", data.booking_count);
        commit("REVIEW_COUNT", data.reviews_count);
        commit("TOTAL_SPAN", data.total_span);
        dispatch("loading/clearLoading", null, { root: true });
    },
    
    async fetchRecentOrder({ commit, dispatch }) { 
        const { data } = await this.$axios.get(
            "users/recent-orders/" + this.$auth.user.id
        );
        if (data.success) {
            commit("RECENT_PRODUCT", data.product);
            commit("RECENT_BOOKING", data.booking);
            commit("USER", data.user);
       }
       
    },
    async delete({ commit, state }, id) {
        const { data } = await this.$axios.post(`booking/delete`, { id: id });
        if (data.success == true) {
            commit("UPDATE_BOOKINGS",  id );
        }
    }
};