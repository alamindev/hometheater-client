export const state = () => ({
    posts: [],
    post: {},
    recent_posts: [],
    categories: [],
    comments: [],
    count_comments: "",
    count_likes: "",
    likes: [],
    loading_post: true,
    loading_recent_post: true,
    blog_header: {}
});
export const getters = {};

export const mutations = {
    FETCH_POST: (state, data) => (state.post = data),
    LOADING_POST: (state, bool) => (state.loading_post = bool),
    FETCH_CATEGORIES: (state, datas) => (state.categories = datas),
    FETCH_SINGLE_POST: (state, data) => (state.post = data),
    FETCH_CATEGORIES_POSTS: (state, datas) => (state.posts = datas),
    FETCH_RECENT_POST: (state, datas) => (state.recent_posts = datas),
    LOADING_RECENT_POST: (state, bool) => (state.loading_recent_post = bool),
    FETCH_COMMENTS: (state, datas) => (state.comments = datas),
    STORE_SINGLE_COMMENT: (state, data) => state.comments.push(data),
    INCREMENT_COMMENTS: (state, data) => (state.count_comments = data),
    FETCH_LIKES: (state, data) => (state.likes = data),
    FETCH_BLOG_HEADER: (state, data) => (state.blog_header = data)
};

export const actions = {
    /**
     *
     * @param {*} param0
     * Fetch Single post
     */
    async fetchPost({ commit, dispatch }) {
        commit("LOADING_POST", true);
        const { data } = await this.$axios.get("post/random");
        commit("FETCH_POST", data.post);
        commit("FETCH_LIKES", data.post.likes);
        commit("LOADING_POST", false);
        commit("FETCH_BLOG_HEADER", data.header);
    },

    /**
     *
     * @param {*} param0
     * Fetch category for gallery sidebar
     */
    async fetchCategories({ commit }) {
        const { data } = await this.$axios.get("post/categories");
        commit("FETCH_CATEGORIES", data.categories);
    },

    /**
     *
     * @param {*} param0
     * Fetch recent blog post
     */
    async recentPost({ commit }) {
        commit("LOADING_RECENT_POST", true);
        const { data } = await this.$axios.get("post/recent");
        commit("FETCH_RECENT_POST", data.posts);
        commit("LOADING_RECENT_POST", false);
    },

    /**
     *
     * @param {1?} param slug not mendotory
     * Fetch gallery data
     */

    async fetchPostData({ commit, dispatch }, slug = "") {
        dispatch("loading/setLoading", null, { root: true });
        let data = "";
        if (slug !== "") {
            data = await this.$axios.get(`posts/${slug}`);
        } else {
            data = await this.$axios.get(`posts`);
        }
        commit("FETCH_CATEGORIES_POSTS", data.data.posts);

        dispatch("loading/clearLoading", null, { root: true });
    },

    /**
     *
     * @param {1} param slug is required
     * Fetch gallery data when click sidebar category
     */
    async ChangeCate({ commit, dispatch }, slug) {
        dispatch("loading/setLoading", null, { root: true });
        const { data } = await this.$axios.get(`postbycategory/${slug}`);
        commit("FETCH_CATEGORIES_POSTS", data.posts);
        dispatch("loading/clearLoading", null, { root: true });
    },

    /**
     *
     * @param {1} param slug is required
     *  fatch Single post when click on image for details
     */
    async fetchSinglePost({ commit }, slug) {
        const { data } = await this.$axios.get(`post/${slug}`);
        commit("FETCH_SINGLE_POST", data.post);
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
        const { data } = await this.$axios.post(`post/like`, datas);
        commit("FETCH_LIKES", data.likes);
    }
};
