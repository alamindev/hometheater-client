export const state = () => ({
    categories: [],
  galleries: [],
    albums: [],
    gallery: {},
    suggestGalleries: [],
    comments: [],
    count_comments: "",
    count_likes: "",
    likes: [],
    count_shares: "",
  category_name: '',
    album_name: ''
});
export const getters = {};

export const mutations = {
    FETCH_CATEGORIES: (state, datas) => (state.categories = datas),
    FETCH_GALLERIES: (state, datas) => (state.galleries = datas),
    FETCH_ALBUMS: (state, datas) => (state.albums = datas),
    FETCH_SINGLE_GALLERY: (state, data) => (state.gallery = data),
    FETCH_SUGGEST_GALLERIES: (state, datas) => (state.suggestGalleries = datas),
    FETCH_COMMENTS: (state, datas) => (state.comments = datas),
    STORE_SINGLE_COMMENT: (state, data) => state.comments.push(data),
    INCREMENT_COMMENTS: (state, data) => (state.count_comments = data),
    INCREMENT_LIKES: (state, data) => (state.count_likes = data),
    INCREMENT_SHARES: (state, data) => (state.count_shares = data),
    FETCH_LIKES: (state, data) => (state.likes = data),
    FETCH_CATEGORY_NAME: (state, data) => (state.category_name = data),
    FETCH_ALBUM_NAME: (state, data) => (state.album_name = data),
    UPDATE_GALLERIES_COMMENT: (state, id) =>
        (state.comments = state.comments.filter(el => el.id !== id))
};

export const actions = {
    /**
     *
     * @param {*} param0
     * Fetch category for gallery sidebar
     */
    async fetchCategories({ commit }) {
        const { data } = await this.$axios.get("/categories");
        if (data.success == true) {
            commit("FETCH_CATEGORIES", data.categories);
            let categories = data.categories;
            if (categories.length > 0) {
                if (typeof this.$cookies.get("slug") === "undefined") {
                    this.$cookies.set("slug", categories[0].slug);
                }
            }
        }
    },

    /**
     *
     * @param {1?} param slug not mendotory
     * Fetch Album by album id
     */

    async fetchAlbum({ commit, dispatch }, slug = "") {
      dispatch("loading/setLoading", null, { root: true });
        let data = "";
      data = await this.$axios.get(`albums/${slug}`);
        commit("FETCH_ALBUMS", data.data.albums);
        commit("FETCH_CATEGORY_NAME", data.data.category_name);
        dispatch("loading/clearLoading", null, { root: true });
  },

     /**
     *
     * @param {1?} param slug not mendotory
     * Fetch gallery data by album id
     */
    async fetchGalleryData({ commit, dispatch }, slug = "") {
        dispatch("loading/setLoading", null, { root: true });
        let data = "";
        if (slug !== "") {
            data = await this.$axios.get(`galleries/${slug}`);
        } else {
            data = await this.$axios.get(`galleries`);
        }
      commit("FETCH_GALLERIES", data.data.galleries);
         commit("FETCH_ALBUM_NAME", data.data.album_name);
        dispatch("loading/clearLoading", null, { root: true });
    },

    /**
     *
     * @param {1} param slug is required
     * Fetch gallery data when click sidebar category
     */
    async ChangeCate({ commit, dispatch }, slug) {
        dispatch("loading/setLoading", null, { root: true });
        const { data } = await this.$axios.get(`filterbycategory/${slug}`);
        commit("FETCH_ALBUMS", data.albums);
        commit("FETCH_CATEGORY_NAME", data.category_name);
        dispatch("loading/clearLoading", null, { root: true });
    },

    /**
     *
     * @param {2} param slug is required also category slug need for correct data
     *  Sort gallery data
     */
    async fetchSortChange({ commit, dispatch }, { slug, categorySlug }) {
        dispatch("loading/setLoading", null, { root: true });
        const { data } = await this.$axios.get(`sortby/${slug}/${categorySlug}`);
        commit("FETCH_GALLERIES", data.galleries);
        dispatch("loading/clearLoading", null, { root: true });
    },
    /**
     *
     * @param {1} param slug is required
     *  fatch gallery image when click on image for details
     */
    async fetchImage({ commit }, {slug,album_slug}) {
        const { data } = await this.$axios.get(`gallery/${slug}/${album_slug}`);
        commit("FETCH_SINGLE_GALLERY", data.gallery);
        commit("FETCH_COMMENTS", data.gallery.comments);
        commit("INCREMENT_LIKES", data.gallery.like_counts);
        commit("INCREMENT_COMMENTS", data.gallery.comment_counts);
        commit("FETCH_LIKES", data.gallery.likes);
      commit("INCREMENT_SHARES", data.gallery.share_counts);
      return data;
    },

    /**
     *
     * @param {1} param slug is required
     *  fatch gallery image when click on image for details
     */
    async suggestGalleries({ commit }, slug) {
        const { data } = await this.$axios.get(`suggest/${slug}`);
        commit("FETCH_SUGGEST_GALLERIES", data.suggestGalleries);
    },
    /**
     *
     * @param {1} param data required for post method
     *  for sumbit new comments.
     */
    async submitComment({ commit }, datas) {
        const { data } = await this.$axios.post(`comment/store`, datas);
        commit("STORE_SINGLE_COMMENT", data.comment);
        if (data.comment_counts != "") {
            commit("INCREMENT_COMMENTS", data.comment_counts);
        }
    },
    /**
     *
     * @param {1} param data required for post method
     *  for sumbit new Like and disliked.
     */
    async submitLiked({ commit }, datas) {
        const { data } = await this.$axios.post(`like/store`, datas);
        commit("INCREMENT_LIKES", data.like_counts);
        commit("FETCH_LIKES", data.likes);
    },
    /**
     *
     * @param {1} param data required for post method
     *  for sumbit new share count
     */
    async ShareCount({ commit }, datas) {
        const { data } = await this.$axios.post(`share-count/store`, datas);
        commit("INCREMENT_SHARES", data.share_counts);
    },
    deleteComment({ commit, state }, id) {
        this.$swal({
            title: "Are you sure?",
            text: "Delete this comment?",
            icon: "warning",
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!"
        }).then(result => {
            if (result.isConfirmed) {
                this.$axios.post(`gallery/delete`, { id: id }).then(res => {
                    if (res.data.success == true) {
                        this.$swal({
                            toast: true,
                            position: "top-end",
                            icon: "success",
                            title: "Comment has been deleted.",
                            showConfirmButton: false,
                            timer: 3000
                        });
                        commit("UPDATE_GALLERIES_COMMENT", id);
                    } else {
                        this.$swal({
                            toast: true,
                            position: "top-end",
                            icon: "error",
                            title: "Comment not delete!",
                            showConfirmButton: false,
                            timer: 3000
                        });
                    }
                });
            }
        });
    }
};
