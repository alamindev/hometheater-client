import { v4 as uuid } from "uuid";
export const state = () => ({
    order_services: [],
    rating_loading: false,
    reviews: [],
    edit_review: {},
    review: {},
    images: [],
    review_loading: false
});

export const getters = {
    getNotes(state) {
        return state.notes;
    }
};
export const mutations = {
    FETCH_ORDER_SERVICES: (state, data) => (state.order_services = data),
    ERROR_SERVICE_REVIEW: (state, obj) => {
        state.order_services = [...state.order_services].map(el => {
            if (+obj.id === +el.id) {
                return {
                    ...el,
                    message: obj.message
                };
            }
            return el;

        });
    },
    RATING_LOADING: (state, data) => (state.rating_loading = data),
    FETCH_REVIEWS: (state, datas) => {
        state.reviews = datas;
    },
    EDIT_REVIEW: (state, data) => (state.edit_review = data),
    DETAILS_REVIEW: (state, data) => (state.review = data),
    FETCH_DEFAULT_FORM: (state, data) => {
        if (!Array.isArray(data)) {
            if (state.images.length > 0) {
                state.images.push(data);
            } else {
                state.images[0] = data;
            }
        } else {
            state.images = [];
        }
    },

    ADD_NEW_FORM: (state, data) => state.images.push(data),
    UPDATE_IMAGE_FORM(state, obj) {
        const index = state.images.findIndex(n => n.id === obj.id);
        if (index > -1) {
            if (Object.keys(obj).includes("title")) {
                state.images[index].title = obj.title;
            }
            if (Object.keys(obj).includes("description")) {
                state.images[index].description = obj.description;
            }
            if (Object.keys(obj).includes("image")) {
                state.images[index].image = obj.image;
            }
        }
    },
    DELETE_IMAGE_FORM(state, id) {
        const index = state.images.findIndex(n => n.id === id);
        if (index > -1) {
            state.images.splice(index, 1);
        }
    },
    FETCH_REVIEW_IMAGE: (state, datas) => (state.images = datas),
    UPDATE_LOADING: (state, bool) => (state.review_loading = bool)
};

export const actions = {
    add_new_form({ commit, state }, obj) {
        if (state.images.length > 0) {
            let newImages = state.images.filter(
                el => el.service_id == obj.service_id
            );
            if (newImages.length < 4) {
                commit("ADD_NEW_FORM", obj);
            } else {
                this.$swal({
                    toast: true,
                    position: "top-end",
                    icon: "error",
                    title: "You only upload maximum 4 images!",
                    showConfirmButton: false,
                    timer: 8000
                });
            }
        } else {
            commit("ADD_NEW_FORM", obj);
        }
    },
    /**
     *
     * @param {*} param0
     * Fetch fetch order services
     */
    async OrderServices({ commit }, id) {
        commit("RATING_LOADING", true);
        const { data } = await this.$axios.get(`booking/${id}/orderservice`);
        if (data.success === true) {
            commit("FETCH_ORDER_SERVICES", data.order_services);
            commit("RATING_LOADING", false);
        } else {
            this.$swal({
                icon: "error",
                timer: 5000,
                title: "Something went wrong!"
            });
        }
    },
    /**
     *
     * @param {*} param0
     * Fetch  reviews
     */
    async fetchReview({ commit, dispatch }, id) {
        dispatch("loading/setLoading", null, { root: true });
        const { data } = await this.$axios.get(`booking/reviews/${id}`);
        if (data.success === true) {
            commit("FETCH_REVIEWS", data.reviews);
            dispatch("loading/clearLoading", null, { root: true });
        } else {
            this.$swal({
                icon: "error",
                timer: 5000,
                title: "Something went wrong!"
            });
        }
    },
    async fetchReviewPage({ commit }, { id, pageNum }) {
        const { data } = await this.$axios.get(
            `booking/reviews/${id}?page=${pageNum}`
        );
        if (data.success === true) {
            commit("FETCH_REVIEWS", data.reviews);
        } else {
            this.$swal({
                icon: "error",
                timer: 5000,
                title: "Something went wrong!"
            });
        }
    },
    /**
     *
     * @param {obj} obj
     *  Save rating
     */

    async SaveRating({ commit, state }, obj) {
        commit("UPDATE_LOADING", true);
        if (typeof obj !== "undefined") {
            let datas = {
                ...obj,
                images: state.images
            };
            const { data } = await this.$axios.post(`booking/rating/store`, datas);

            if (data.success === true) {
                commit("FETCH_ORDER_SERVICES", data.order_services);
                commit("UPDATE_LOADING", false);
            } else {
                this.$swal({
                    icon: "error",
                    timer: 5000,
                    title: "Something went wrong!"
                });
            }
        }
    },
    async EditReview({ commit, dispatch }, id) {
        dispatch("loading/setLoading", null, { root: true });
        const { data } = await this.$axios.get(`booking/review/edit/${id}`);
        if (data.success === true) {
            commit("EDIT_REVIEW", data.review);
          commit("FETCH_REVIEW_IMAGE", data.review.review_images.map(el => {
              return {
                ...el,
                service_id: data.review.service_id
                }
            }));
            dispatch("loading/clearLoading", null, { root: true });
        } else {
            this.$swal({
                icon: "error",
                timer: 5000,
                title: "Something went wrong!"
            });
        }
    },

    async updateReview({ commit, state }, obj) {
        commit("UPDATE_LOADING", true);
        let datas = {
            ...obj,
            images: state.images
        };
        const { data } = await this.$axios.post(`booking/review/update`, datas);
        if (data.success === true) {
            this.$swal({
                toast: true,
                position: "top-right",
                icon: "success",
                timer: 5000,
                showConfirmButton: false,
                title: "Review Updated!"
            });
            this.$router.push("/users/review");
            commit("UPDATE_LOADING", false);
        } else {
            this.$swal({
                icon: "error",
                timer: 5000,
                title: "Something went wrong!"
            });
        }
    },
    async ReviewDtails({ commit }, id) {
        const { data } = await this.$axios.get(`booking/review/details/${id}`);
        if (data.success === true) {
            commit("DETAILS_REVIEW", data.review);
        } else {
            this.$swal({
                icon: "error",
                timer: 5000,
                title: "Something went wrong!"
            });
        }
    },
    async delete__image({ commit }, id) {
        const { data } = await this.$axios.get(`booking/review/delete-image/${id}`);
        if (data.success === true) {
            this.$swal({
                toast: true,
                position: "top-right",
                icon: "success",
                timer: 5000,
                showConfirmButton: false,
                title: "Image deleted successfully!"
            });
        } else {
            this.$swal({
                toast: true,
                position: "top-right",
                icon: "error",
                timer: 5000,
                showConfirmButton: false,
                title: "Something went wrong!"
            });
        }
    }
};
