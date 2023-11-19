export const state = () => ({
    edit_booking: {},
    images: [],
    datetime: [],
    newimages: [],
    booking: {},
    bookings: {},
    order_details_loading: false
});

export const mutations = {
    FETCH_BOOKING: (state, data) => (state.edit_booking = data),
    FETCH_IMAGES: (state, datas) => {
        state.images = datas.map(el => {
            return {
                id: el.id,
                src: process.env.imgUrl + el.src
            };
        });
    },
    UPDATE_IMAGE: (state, obj) => {
        let images = [...state.images];
        if (obj.id !== null) {
            state.images = images.map(el => {
                if (+el.id === +obj.id) {
                    el.src = obj.src;
                }
                return el;
            });
            // for new object second object
            if (state.newimages.length > 0) {
                let mapped = state.newimages.map(ele => ele.id);
                let found = mapped.includes(obj.id);
                if (!found) {
                    state.newimages.push(obj);
                }
            } else {
                state.newimages[0] = obj;
            }
        } else {
            let newobj = {
                id: Math.floor(100000 + Math.random() * 900000),
                src: obj.src
            };
            state.images.push(newobj);
            // for new object second object
            if (state.newimages.length > 0) {
                state.newimages.push(newobj);
            } else {
                state.newimages[0] = newobj;
            }
        }
        Math.floor(100000 + Math.random() * 900000);
    },
    UPDATE_DELETE_IMG: (state, id) => {
        let images = [...state.images];
        state.images = images.filter(el => {
            if (+el.id !== +id) {
                return el;
            }
        });
    },
    UPDATE_NEWIMG: (state, val) => (state.newimages = val),
    DATETIME_UPDATE: (state, val) => (state.datetime = val),
    BOOKING_DETAILS: (state, val) => (state.booking = val),
    FETCH_BOOKINGS: (state, datas) => (state.bookings = datas),
    ORDER_DETAILS_LOADING: (state, data) => (state.order_details_loading = data),
    UPDATE_BOOKINGS: (state, id) =>
        (state.bookings.data = state.bookings.data.filter(el => el.id !== id))
};

export const actions = {
    /**
     *
     * @param {*} param0
     * Fetch  edit booking details
     */
    async fetchBooking({ commit, dispatch }, id) {
        dispatch("loading/setLoading", null, { root: true });
        const { data } = await this.$axios.get(`booking/${id}/edit`);
        commit("FETCH_BOOKING", data.booking);
        if (data.booking) {
            commit("FETCH_IMAGES", data.booking.images);
        }
        dispatch("loading/clearLoading", null, { root: true });
    },
    /**
     *
     * @param {*} param0
     * Fetch  edit booking details
     */
    async fetchBookings({ commit, dispatch }) {
        dispatch("loading/setLoading", null, { root: true });
        const { data } = await this.$axios.get(`bookings/${this.$auth.user.id}`);
        commit("FETCH_BOOKINGS", data.bookings);
        dispatch("loading/clearLoading", null, { root: true });
    },
    async fetchBookingPage({ commit, dispatch }, pageNum) {
        const { data } = await this.$axios.get(
            `bookings/${this.$auth.user.id}?page=${pageNum}`
        );
        commit("FETCH_BOOKINGS", data.bookings);
    },
    /**
     *
     * @param {*} param0
     * Fetch booking details
     */
    async fetchBookingDetails({ commit, dispatch }, id) {
        commit("ORDER_DETAILS_LOADING", true);
        const { data } = await this.$axios.get(
            `booking/${id}/details?auth_id=${this.$auth.user.id}`
        );
        commit("BOOKING_DETAILS", data.booking);
        commit("ORDER_DETAILS_LOADING", false);
    },
    DeleteImg({ commit }, id) {
        commit("UPDATE_DELETE_IMG", id);
    },
    async UpdateBooking({ commit, state }) {
        let obj = {
            id: state.edit_booking.id,
            image_ids: state.images.map(el => el.id),
            new_images: state.newimages,
            datetime: state.datetime,
            user_id: this.$auth.user.id
        };
        const { data } = await this.$axios.post(`booking/update`, obj);
        if (data.success == true) {
            return true;
        }
    },
    async canceled({ commit, state }, id) {
        let obj = {
            id: id,
            user_id: this.$auth.user.id
        };
        const { data } = await this.$axios.post(`booking/canceled`, obj);
        if (data.success == true) {
            commit("BOOKING_DETAILS", data.booking);
        }
    },
    async delete({ commit, state }, id) {
        const { data } = await this.$axios.post(`booking/delete`, { id: id });
        if (data.success == true) {
            commit("UPDATE_BOOKINGS", id);
        }
    }
};
