export const state = () => ({
    carts: [],
    payment: "local",
    promocode: "",
    percent_val: "",
    percent: "",
    sub_total: "",
    is_promo: false,
    zipcode: "",
    success: "",
    is_next: false,
    questions: [],
    answer: [],
    feature_price: "",
    images: [],
    datetime: [],
    attributes: [],
    activeStep: 0,
    is_item: false,
    is_finished: false,
    finish_loading: false,
    ziperr: false,
    ajaxerr: false,
    step_3_active: false,
    is_auth: false,
  checkQuetions: [],
  suggests: [],
         limited_duration: false
});

export const getters = {
    cartDataCount(state) {
        return state.carts.map(x => +x.item).reduce((a, b) => a + b, 0);
    },
    getDatas(state) {
        return state.carts.map(el => {
            if (el) return el.id;
        });
    },
    getCartDatas(state) {
        return state.carts;
    },
    getTotal(state) {
        let maps = state.carts.map(el => parseInt(el.price));
        if (maps.length > 0) {
            return maps.reduce((a, b) => a + b);
        }
        return 0;
    },
    getPromoCode(state) {
        return state.promocode;
    }
};

export const mutations = {
    FETCH_SUGGEST_SERVICES: (state, datas) => (state.suggests = datas),
    LIMITED_DURATION: (state, data) => (state.limited_duration = data),
    FETCH_DATA: (state, datas) => (state.carts = datas),
    INCREMENT: (state, { id, install_time }) => {
        if (state.is_item === false) {
            const newcarts = state.carts.filter(cart => {
                if (cart.id === id) {
                    if (cart.item >= 1 && cart.item <= 2) {
                        cart.item++;
                        cart.price = cart.price + cart.original_price;
                        let ids = [];
                        for (let i = 0; i < cart.item; i++) {
                            ids.push(cart.id);
                        }
                        cart.ids = ids;
                    }
                    cart.totalHour = +cart.duration * +cart.item;
                }
                return cart;
            });
            localStorage.setItem("services", JSON.stringify(newcarts));
            return newcarts;
        }
    },
    DECREMENT: (state, { id, install_time }) => {
        const newcarts = state.carts.filter(cart => {
            if (cart.id === id) {
                if (cart.item > 1) {
                    cart.item--;
                    cart.price = cart.price - cart.original_price;
                    let ids = [];
                    for (let i = 0; i < cart.item; i++) {
                        ids.push(cart.id);
                    }
                    cart.ids = ids;
                    cart.totalHour = +cart.duration * +cart.item;
                }
            }
            return cart;
        });
        localStorage.setItem("services", JSON.stringify(newcarts));
        return newcarts;
    },
    SET_CART_DATAS: (state, cart) => state.carts.push(cart),
    REMOVE_CART: (state, id) =>
        (state.carts = state.carts.filter(cart => cart.id !== id)),
    UPDATE_PROMOCODE: (state, val) => (state.promocode = val),
    UPDATE_PAYMENT: (state, val) => (state.payment = val),
    PERCENT: (state, percent) => (state.percent = percent),
    PERCENT_VAL: (state, percent_val) => (state.percent_val = percent_val),
    SUB_TOTAL: (state, total) => (state.sub_total = total),
    IS_PROMO: (state, bool) => (state.is_promo = bool),
    UPDATE_ZIPCODE: (state, val) => (state.zipcode = val),
    ZIPCODE_SUCCESS: (state, val) => (state.success = val),
    IS_NEXT: (state, bool) => (state.is_next = bool),
    FETCH_QUESTIONS: (state, datas) => (state.questions = datas),
    CHECK_QUESTION: (state, datas) => (state.checkQuetions = datas),
    FINISH_STEP_LOADING: (state, bool) => (state.finish_loading = bool),
    STEP_3_ACTIVE: (state, bool) => (state.step_3_active = bool),
    IS_AUTH: (state, bool) => (state.is_auth = bool),
    UPDATE_ANSWER: (state, obj) => {
        if (!Array.isArray(obj)) {
            if (state.answer.length > 0) {
                const question_id = state.answer.findIndex(
                    e => e.question_id === obj.question_id && e.index === obj.index
                );
                if (question_id === -1) {
                    state.answer.push(obj);
                } else {
                    state.answer = state.answer.map(el => {
                        if (el.question_id === obj.question_id && el.index === obj.index) {
                            return (el = obj);
                        }
                        return el;
                    });
                }
            } else {
                state.answer[0] = obj;
            }
        } else {
            state.answer = [];
        }
    },
    FEATURE_PRICE: (state, price) => (state.feature_price = price),
    UPLOAD_IMAGES: (state, image) => {
        if (state.images.length > 0) {
            state.images.push(image);
        } else {
            state.images[0] = image;
        }
    },
    DELETE_IMAGES: (state, imgObj) => {
        imgObj.forEach(
            val => (state.images = state.images.filter(el => el.name !== val.name))
        );
    },
    UPDATE_DATETIME: (state, arr) => {
        if (Array.isArray(arr)) {
            state.datetime = arr;
        }
    },
    FETCH_ATTRIBUTES: (state, arr) => (state.attributes = arr),
    UPDATE_STEP_NEXT: (state, val) => (state.activeStep = state.activeStep + 1),
    UPDATE_ACTIVE_STEP: (state, val) => (state.activeStep = val),
    UPDATE_STEP_PREV: (state, val) => (state.activeStep = state.activeStep - 1),
    IS_ITEM: (state, bool) => (state.is_item = bool),
    IS_FINISHED: (state, bool) => (state.is_finished = bool),
    IS_ZIPERR: (state, bool) => (state.ziperr = bool),
    IS_AJAXERR: (state, bool) => (state.ajaxerr = bool)
};

export const actions = {
    async fetchData({ commit, dispatch }) {
        dispatch("loading/setLoading", null, { root: true });
        let services = await [];
        if (process.browser) {
            if (localStorage.getItem("services")) {
              services = await JSON.parse(localStorage.getItem("services"));
            }
        }
        await commit("FETCH_DATA", services);
        dispatch("loading/clearLoading", null, { root: true });
  },

  async suggestData({ commit, state }) {
    if(!state.limited_duration){
      if (process.browser) {
            if (localStorage.getItem("services")) {
              let service_ids = JSON.parse(localStorage.getItem("services")).map(el => el.id);
              if (service_ids.length > 0) {
                const { data } = await this.$axios.post("/cart/suggest", { service_id: service_ids});
                  if (data.success == true) {
                    commit("FETCH_SUGGEST_SERVICES", data.suggests);
                  }
              }

            }
      }
      }
    },
    setCartDatas({ commit, state }, cartData) {
        let services = [];

        if (localStorage.getItem("services")) {
            services = JSON.parse(localStorage.getItem("services"));
        }
        let mapped = services.map(ele => ele.id);
        let found = mapped.includes(cartData.id);

        if (!found) {
            //for durations limit
            let cart_wrappers = state.carts.map(x => x.ids);
            let allitems = [];
            for (let ids of cart_wrappers) {
                for (let id of ids) {
                    let filtered = state.carts.filter(el => el.id == id);
                    allitems.push(filtered);
                }
            }
            let duration = allitems
                .flat()
                .map(el => +el.duration)
                .reduce((a, b) => a + b, 0);
            let another_time_check = duration + cartData.duration * +cartData.item;

            if (duration <= 8 && another_time_check <= 8) {
                let item = state.carts.map(x => x.item).reduce((a, b) => a + b, 0);
                let count = parseInt(item) + parseInt(cartData.item);
                if (item > 4 || count > 4) {
                    commit("IS_ITEM", true);
                } else {
                    commit("IS_ITEM", false);
                }
                if (state.is_item === false) {
                    if (services.length > 0) {
                        services.push(cartData);
                        localStorage.setItem("services", JSON.stringify(services));
                        commit("SET_CART_DATAS", cartData);
                        this.$swal({
                            toast: true,
                            position: "top-end",
                            icon: "success",
                            title: "Service Added to cart!",
                            showConfirmButton: false,
                            timer: 3000
                        });
                    } else {
                        services.push(cartData);
                        localStorage.setItem("services", JSON.stringify(services));
                        commit("SET_CART_DATAS", cartData);
                        this.$swal({
                            toast: true,
                            position: "top-end",
                            icon: "success",
                            title: "Service Added to cart!",
                            showConfirmButton: false,
                            timer: 3000
                        });
                    }
                  this.$router.push(`/cart`);
                  commit("LIMITED_DURATION", false);
                } else {
                    this.$swal({
                        toast: true,
                        position: "top-end",
                        icon: "error",
                        title: "You can book up to 4 services max. Please checkout first and then add new service/s to cart.",
                        showConfirmButton: false,
                        timer: 6000
                    });
                }
            } else {
               commit("LIMITED_DURATION", true);
                this.$swal({
                    toast: true,
                    position: "top-end",
                    icon: "error",
                    title: "Service Duration limited! Please checkout selected item first.",
                    showConfirmButton: false,
                    timer: 10000
                });
            }
        } else {
            this.$swal({
                toast: true,
                position: "top-end",
                icon: "error",
                title: "Item already added!",
                showConfirmButton: false,
                timer: 3000
            });
        }
    },
    /**
     * increment item quantity
     * @param {*} param0
     * @param {*} id
     */
    increment({ commit, state, getters, dispatch }, { id, install_time }) {
        let cart_wrappers = state.carts.map(x => x.ids);
        let allitems = [];
        for (let ids of cart_wrappers) {
            for (let id of ids) {
                let filtered = state.carts.filter(el => el.id == id);
                allitems.push(filtered);
            }
        }
        let duration = allitems
            .flat()
            .map(el => +el.duration)
            .reduce((a, b) => a + b, 0);
        let another_time_check = duration + install_time;
        if (duration <= 8 && another_time_check <= 8) {
            let item = state.carts.map(x => +x.item).reduce((a, b) => a + b, 0);
            if (item === 3) {
                commit("IS_ITEM", true);
            }
            if (state.is_item === false) {
                commit("INCREMENT", { id, install_time });
                dispatch("fetchQuestions");
                commit(
                    "PERCENT_VAL",
                    ((state.percent / 100) * getters.getTotal).toFixed(2)
                );
                if (state.percent != "") {
                    commit("SUB_TOTAL", getters.getTotal - state.percent_val);
                }
                commit("UPDATE_ANSWER", []);
                commit("FEATURE_PRICE", "");
            }
        } else {
            this.$swal({
                toast: true,
                position: "top-end",
                icon: "error",
                title: "Service Duration limited! Please checkout selected item first.",
                showConfirmButton: false,
                timer: 10000
            });
        }
    },
    /**
     * decrement item quantity
     * @param {*} param0
     * @param {*} id
     */
    decrement({ commit, state, getters, dispatch }, { id, install_time }) {
        commit("DECREMENT", { id, install_time });
        commit(
            "PERCENT_VAL",
            ((state.percent / 100) * getters.getTotal).toFixed(2)
        );
        if (state.percent != "") {
            commit("SUB_TOTAL", getters.getTotal - state.percent_val);
        }
        dispatch("fetchQuestions");
        commit("UPDATE_ANSWER", []);
        commit("FEATURE_PRICE", "");
        commit("IS_ITEM", false);
    },

    /**
     * remove items from cart
     * @param {*} param0
     * @param {*} id
     */
    removeCart({ commit, state, getters, dispatch }, id) {
        this.$swal({
            title: "Are you sure?",
            text: "Delete this item from cart!",
            icon: "warning",
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!"
        }).then(result => {
            if (result.isConfirmed) {
                this.$swal({
                    toast: true,
                    position: "top-end",
                    icon: "success",
                    title: "Cart item has been deleted.",
                    showConfirmButton: false,
                    timer: 3000
                });
                let services = JSON.parse(localStorage.getItem("services"));
                services = services.filter(service => service.id !== id);
                localStorage.setItem("services", JSON.stringify(services));
                commit("REMOVE_CART", id);
                commit(
                    "PERCENT_VAL",
                    ((state.percent / 100) * getters.getTotal).toFixed(2)
                );
                commit("SUB_TOTAL", getters.getTotal - state.percent_val);
                if (!getters.getCartDatas.length > 0) {
                    commit("IS_PROMO", false);
                }
                if (state.questions.length > 0) {
                    let questions = state.questions.filter(
                        question => question.service_id !== id
                    );
                    commit("FETCH_QUESTIONS", questions);
                }
              commit("UPDATE_ANSWER", []);
              dispatch("suggestData");
            }
        });
    },
    async applyPromo({ commit, state, getters }) {
        try {
            let { data } = await this.$axios.post("/promo/match", {
                promocode: state.promocode
            });
            if (data.success == true) {
                commit("PERCENT", data.percent);
                commit(
                    "PERCENT_VAL",
                    ((data.percent / 100) * getters.getTotal).toFixed(2)
                );
                commit("SUB_TOTAL", getters.getTotal - state.percent_val);

                commit("UPDATE_PROMOCODE", "");
                commit("IS_PROMO", true);
            } else {
                commit("IS_PROMO", false);
            }
        } catch (e) {
            commit("IS_PROMO", false);
            return;
        }
    },
    /**
     *  check zipcode that service available
     * @param {zipcode and user_id} param2
     * @returns
     */
    async CheckZipcode({ commit, state, getters }) {
        if (state.zipcode.length >= 5 && state.zipcode.length <= 5) {
            commit("IS_ZIPERR", false);
            commit("IS_AJAXERR", true);
            commit("IS_NEXT", false);
            try {
                let total = getters.getTotal;
                let { data } = await this.$axios.post("/check/zipcode", {
                    zipcode: state.zipcode,
                    amount: total
                });
                if (state.zipcode.length >= 5 && state.zipcode.length <= 5) {
                    if (data.success == true) {
                        commit("ZIPCODE_SUCCESS", data.message);
                        commit("IS_NEXT", true);
                    } else {
                        commit("ZIPCODE_SUCCESS", "");
                        commit("IS_NEXT", false);
                    }
                } else {
                    commit("IS_ZIPERR", true);
                    commit("IS_AJAXERR", false);
                    commit("IS_NEXT", false);
                }
            } catch (e) {
                commit("ZIPCODE_SUCCESS", "");
                commit("IS_NEXT", false);
                return;
            }
        } else {
            commit("IS_ZIPERR", true);
            commit("IS_AJAXERR", false);
            commit("IS_NEXT", false);
        }
    },
    /**
     *  fetch questions
     * @param {services id} param1
     */
    async fetchQuestions({ commit, state }) {
        let carts = state.carts.map(val => {
            return {
                id: val.id,
                item: val.item
            };
        });
        let { data } = await this.$axios.post("/service/questions", {
            carts
        });
        if (data.success == true) {
            commit("FETCH_QUESTIONS", data.questions);
            commit(
                "CHECK_QUESTION",
                data.questions.map(el => {
                    return {
                        id: el.id,
                        question: []
                    };
                })
            );
        }
    },
    /**
     *  fetch questions
     * @param {services id} param1
     */
    UpdateAnswer({ commit, state, getters }, obj) {
        commit("UPDATE_ANSWER", obj);
        let maps = state.answer.map(el => parseInt(el.price));
        if (maps.length > 0) {
            commit(
                "FEATURE_PRICE",
                maps.reduce((a, b) => a + b)
            );
            commit(
                "SUB_TOTAL",
                getters.getTotal - state.percent_val + state.feature_price
            );
        }
    },
    /**
     *  fetch questions
     * @param {services id} param1
     */
    async finishedCheckout({ commit, state, getters }, obj = null) {
        commit("FINISH_STEP_LOADING", true);
        let { data } = await this.$axios.post("/order/store", {
            carts: state.carts,
            total_price: state.sub_total,
            sub_total: getters.getTotal,
            images: state.images,
            datetime: state.datetime,
            payment: state.payment,
            discount_price: state.percent_val,
            addon_price: state.feature_price,
            discount: state.percent,
            user_id: this.$auth.user.id,
            answer: state.answer,
            nonce: obj ? obj.nonce : "",
            location_id: obj ? obj.location_id : ""
        });
        if (data.success == true) {
            localStorage.removeItem("services");
            commit("FETCH_DATA", []);
            commit("UPDATE_ZIPCODE", "");
            commit("ZIPCODE_SUCCESS", "");
            commit("FINISH_STEP_LOADING", false);
            return true;
        } else {
            commit("FINISH_STEP_LOADING", false);
            this.$swal({
                toast: true,
                position: "top-end",
                icon: "error",
                title: data.message,
                showConfirmButton: false,
                timer: 6000
            });
        }
    },
    /**
     *  fetch questions
     * @param {services id} param1
     */
    async fetchAttributes({ commit, state, getters }) {
        let { data } = await this.$axios.get("/calendar/attributes");
        if (data.success == true) {
            return data.dates;
        } else {
            return false;
        }
    },
    /**
     *  fetch questions
     * @param {services id} param1
     */
    async fetchTime({ commit, state, getters }, date) {
        let { data } = await this.$axios.post("/calendar/time", {
            date
        });
        if (data.success == true) {
            return data.times;
        } else {
            return false;
        }
    },
    checkAnswer({ commit, state, getters }, { id, obj }) {
        let arrays = [...state.checkQuetions];
        let maped = arrays.map(el => {
            let arr = [...el.question];
            if (el.id === id) {
                arr.push(obj);
            }
            return {
                id: el.id,
                question: arr
            };
        });

        commit("CHECK_QUESTION", maped);
    }
};
