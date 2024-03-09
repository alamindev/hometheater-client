export const state = () => ({
    carts: [],
    cartobj: {
        'services' : [],
        'products' : []
    },
    rate: 9,
    payment: "online",
    promocode: "",
    percent_val: null,
    percent: null,
    sub_total: null,
    grand_total: null,
    sub_total_with_addons: null,
    is_promo: false,
    zipcode: "",
    success: "",
    is_next: false,
    questions: [],
    answer: [],
    feature_price: null,
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
    is_loggedin: false,
    is_register_form: false,
    is_required_field: false,
    is_loading: false, 
    is_register_form: false, 
    checkQuetions: [],
    suggests: [],
    limited_duration: false,
    stripe_key: {
        publisher: null,
        secret: null,
        payment_id: null
    },
    loading_stripe: false,
    address: {
        address: "",
        city: "",
        state: "",
        zipcode: "",
    }
});

export const getters = {
    cartDataCount(state) {
        return state.carts.map(x => +x.item).reduce((a, b) => a + b, 0);
    },
    cartMainItem(state) {
        return state.carts.length;
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
        let maps = state.carts.map(el => parseFloat(el.price));
        if (maps.length > 0) {
            let total = maps.reduce((a, b) => a + b); 
            return +total.toFixed(2);
        }
        return 0;
    },
      
    getPromoCode(state) {
        return state.promocode;
    }
};

export const mutations = {
    FETCH_SUGGEST_SERVICES: (state, datas) => (state.suggests = datas),
    FETCH_STRIPE_KEY: (state, data) => (state.stripe_key = data),
    LIMITED_DURATION: (state, data) => (state.limited_duration = data),
    FETCH_DATA: (state, datas) => {
        if (datas.length > 0) { 
            for (let i = 0; i < datas.length; i++) {
              if (datas[i].type === 0) {
                state.cartobj.services = datas.filter((el) => el.type === 0);
              } else {
                state.cartobj.products = datas.filter((el) => el.type === 1);
              }
            }  
        } else {
            state.cartobj = {
                    'services' : [],
                    'products' : []
            };
        } 
        return;
    },
    FETCH_DATA_CARTS: (state, datas) => (state.carts = datas),
    INCREMENT: (state, { id, install_time, type }) => { 
        if (type === 0) { 
            if (state.is_item === false) {
                const newcarts = state.carts.filter(cart => {
                    if (cart.id === id) {
                        if (cart.item >= 1 && cart.item <= 2) {
                            cart.item++;
                            cart.price =  +(+cart.price + +cart.original_price).toFixed(2);
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
        } else {
            const newcarts = state.carts.filter(cart => {
                if (cart.id === id) { 
                        cart.item++;
                        cart.price =  +(+cart.price + +cart.original_price).toFixed(2);
                        let ids = [];
                        for (let i = 0; i < cart.item; i++) {
                            ids.push(cart.id);
                        }
                    cart.ids = ids;  
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
                    cart.price = +(+cart.price - +cart.original_price).toFixed(2);
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
    SET_CART_DATAS: (state, cart) => {
        state.carts.push(cart); 
        if (cart.type === 0) {
            state.cartobj?.services.push(cart);
        } else {
            state.cartobj?.products.push(cart);
        }
        return;
    },
    REMOVE_CART: (state, id) => {
        state.carts = state.carts.filter(cart => cart.id !== id);
      
        state.cartobj.services = state.cartobj?.services.filter(cart => cart.id !== id);
    
        state.cartobj.products = state.cartobj?.products.filter(cart => cart.id !== id);
        return;
    } ,
    UPDATE_PROMOCODE: (state, val) => (state.promocode = val),
    UPDATE_PAYMENT: (state, val) => (state.payment = val),
    PERCENT: (state, percent) => (state.percent = percent),
    PERCENT_VAL: (state, percent_val) => (state.percent_val = percent_val),
    SUB_TOTAL: (state, total) => (state.sub_total = total),
    GRAND_TOTAL: (state, total) => (state.grand_total = total),
    IS_PROMO: (state, bool) => (state.is_promo = bool),
    UPDATE_ZIPCODE: (state, val) => (state.zipcode = val),
    ZIPCODE_SUCCESS: (state, val) => (state.success = val),
    IS_NEXT: (state, bool) => (state.is_next = bool),
    FETCH_QUESTIONS: (state, datas) => (state.questions = datas),
    UPDATE_TAXES: (state, data) => (state.rate = data),
    CHECK_QUESTION: (state, datas) => (state.checkQuetions = datas),
    FINISH_STEP_LOADING: (state, bool) => (state.finish_loading = bool),
    LOADING_STRIPE: (state, bool) => (state.loading_stripe = bool),
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
    IS_AJAXERR: (state, bool) => (state.ajaxerr = bool),
    UPDATE_SUBTOTAL_WITH_ADDONS: (state, sub_total_with_addons) => (state.sub_total_with_addons = sub_total_with_addons),
    IS_LOADING: (state, bool) => (state.is_loading = bool),
    IS_LOGGEDIN: (state, bool) => (state.is_loggedin = bool),
    IS_REQUIRED_FIELD: (state, bool) => (state.is_required_field = bool), 
    IS_REGISTER_FORM: (state, bool) => (state.is_register_form = bool), 
    UPDATE_ADDRESS: (state, value) => (state.address.address = value ), 
    UPDATE_CITY: (state, value) => (state.address.city = value ), 
    UPDATE_STATE: (state, value) => (state.address.state = value ), 
    UPDATE_ADDRESS_ZIPCODE: (state, value) => (state.address.zipcode = value ), 
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
        await commit("FETCH_DATA_CARTS", services);
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
    async FetchTax({ commit, state }) {
        const { data } = await this.$axios.get("/cart/taxes");
        if (data.success == true) {
          commit("UPDATE_TAXES", data.taxes);
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
            let cart_wrappers = state.cartobj?.services.map(x => x.ids);
            let allitems = [];
            for (let ids of cart_wrappers) {
                for (let id of ids) {
                    let filtered = state.cartobj?.services.filter(el => el.id == id);
                    allitems.push(filtered);
                }
            }
            let duration = allitems
                .flat()
                .map(el => +el.duration)
                .reduce((a, b) => a + b, 0);
            let another_time_check = duration + cartData.duration * +cartData.item;

            if (duration <= 8 && another_time_check <= 8) {
                let item = state.cartobj?.services.map(x => x.item).reduce((a, b) => a + b, 0);
                let count = parseFloat(item) + parseFloat(cartData.item);
                if (item > 4 || count > 4) {
                    commit("IS_ITEM", true);
                } else {
                    commit("IS_ITEM", false);
                }
                if (state.is_item === false) { 
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
                  this.$router.push(`/cart`);
                  commit("LIMITED_DURATION", false);
                } else {
                    this.$swal({
                        toast: true,
                        position: "top-end",
                        icon: "error",
                        title: "You can book up to 4 (count with quantity of items) services max. Please checkout first and then add new service/s to cart.",
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


    setProductCartDatas({ commit, state }, cartData) {
        let services = [];

        if (localStorage.getItem("services")) {
            services = JSON.parse(localStorage.getItem("services"));
        }
        let mapped = services.map(ele => ele.id);
        let found = mapped.includes(cartData.id);
     
        if (!found) {   
                services.push(cartData); 
                localStorage.setItem("services", JSON.stringify(services));
                commit("SET_CART_DATAS", cartData);
                this.$swal({
                    toast: true,
                    position: "top-end",
                    icon: "success",
                    title: "Product Added to cart!",
                    showConfirmButton: false,
                    timer: 3000
                }); 
                this.$router.push(`/cart`);
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
    increment({ commit, state, getters, dispatch }, { id, install_time, type }) {
       
        if (type === 0) {
            
            let cart_wrappers = state.cartobj?.services.map(x => x.ids);
            let allitems = [];
            for (let ids of cart_wrappers) {
                for (let id of ids) {
                    let filtered = state.cartobj?.services.filter(el => el.id == id);
                    allitems.push(filtered);
                }
            }
            let duration = allitems
                .flat()
                .map(el => +el.duration)
                .reduce((a, b) => a + b, 0);
            let another_time_check = duration + install_time;
            if (duration <= 8 && another_time_check <= 8) {
                let item = state.cartobj?.services.map(x => x.item).reduce((a, b) => a + b, 0);
                
                if (item > 3 ) {
                    commit("IS_ITEM", true);
                } else {
                    commit("IS_ITEM", false);
                } 
                if (state.is_item === false) {
                    commit("INCREMENT", { id, install_time, type });
                    dispatch("fetchQuestions"); 
                    commit("UPDATE_ANSWER", []);
                    let maps = state.carts.map(el => +el.price);
                    if (maps.length > 0) {
                        let total = maps.reduce((a, b) => a + b);  
                        commit("UPDATE_SUBTOTAL_WITH_ADDONS", +total.toFixed(2));
                        commit("SUB_TOTAL", +total.toFixed(2));
                        dispatch("updatePromo");  
                    }
                    commit("FEATURE_PRICE", null);
                } else {
                    this.$swal({
                        toast: true,
                        position: "top-end",
                        icon: "error",
                        title: "You can book up to 4 (count with quantity of items) services max. Please checkout first and then add new service/s to cart.",
                        showConfirmButton: false,
                        timer: 10000
                    });
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
        } else { 
            let proudcts = state.cartobj?.products;
            let available = proudcts.some(el => {
                if (el.id === id && el.item < el.quantity_available) {
                    return true;
                }
                return false;
            });
 
            if (available) {
                commit("INCREMENT", { id, install_time, type });
                dispatch("fetchQuestions");
                commit("UPDATE_ANSWER", []);
                let maps = state.carts.map(el => parseFloat(el.price));
                if (maps.length > 0) {
                    let total = maps.reduce((a, b) => a + b);
                    commit("UPDATE_SUBTOTAL_WITH_ADDONS", +total.toFixed(2));
                    commit("SUB_TOTAL", +total.toFixed(2));
                    dispatch("updatePromo");
                }
                commit("FEATURE_PRICE", null);
            } else {
                this.$swal({
                    toast: true,
                    position: "top-end",
                    icon: "error",
                    title: "Limited Stock!",
                    showConfirmButton: false,
                    timer: 10000
                });
            }
        }
    },
    /**
     * decrement item quantity
     * @param {*} param0
     * @param {*} id
     */
    decrement({ commit, state, getters, dispatch }, { id, install_time }) {
        commit("DECREMENT", { id, install_time }); 
        dispatch("fetchQuestions");
        commit("UPDATE_ANSWER", []);
        commit("FEATURE_PRICE", null);
        commit("IS_ITEM", false);
        let maps = state.carts.map(el => parseFloat(el.price));
        if (maps.length > 0) {
            let total = maps.reduce((a, b) => a + b);  
            commit("UPDATE_SUBTOTAL_WITH_ADDONS", +total.toFixed(2));
            commit("SUB_TOTAL", +total.toFixed(2));
            dispatch("updatePromo");
        }
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
                commit("SUB_TOTAL", null); 
                dispatch("updatePromo");
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


    async applyPromo({ commit, state, getters, dispatch }) {
        try { 
            let { data } = await this.$axios.post("/promo/match", {
                promocode: state.promocode
            });
            if (data.success == true) {
                commit("PERCENT", data.percent);
                dispatch("updatePromo");
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


    updatePromo({ commit, state, getters }) {  
        if(state.percent){
            if (state.sub_total_with_addons) {
                commit(
                    "PERCENT_VAL",
                    ((state.percent / 100) * +state.sub_total_with_addons).toFixed(2)
                );
                commit("SUB_TOTAL", +state.sub_total_with_addons - +state.percent_val);
            } else {
                commit(
                    "PERCENT_VAL",
                    ((state.percent / 100) * getters.getTotal).toFixed(2)
                );
                commit("SUB_TOTAL", +getters.getTotal - +state.percent_val);
                }
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
    UpdateAnswer({ commit, state, getters,dispatch }, obj) {
        commit("UPDATE_ANSWER", obj);
        
        let maps = state.answer.map(el => parseFloat(el.price));
        if (maps.length > 0) {
            let sum = maps.reduce((a, b) => a + b);
            commit("FEATURE_PRICE", +sum.toFixed(2)); 
            
            if(state.feature_price > 0){
                commit(
                    "UPDATE_SUBTOTAL_WITH_ADDONS",
                    parseFloat(getters.getTotal) + parseFloat(state.feature_price)
                );
                commit(
                "SUB_TOTAL",
                    +getters.getTotal - +state.percent_val + +state.feature_price
                ); 
                dispatch("updatePromo");
            } else {
                commit(
                    "SUB_TOTAL",
                        null
                    ); 
            }
        }  
    },
    /**
     *  fetch questions
     * @param {services id} param1
     */
    async finishedCheckout({ commit, state, getters }, newData) {
     
        const datas = {
            carts: state.carts,
            cartdata: state.cartobj, 
            images: state.images,
            datetime: state.datetime,
            payment: state.payment, 
            addon_price: state.feature_price,
            discount: state.percent,
            user_id:  this.$auth.loggedIn ?? this.$auth.user.id,
            answer: state.answer,
            grand_total: state.grand_total, 
            taxes: state.rate, 
        };
         
        let { data } = await this.$axios.post("/order/store", newData ? newData : datas ); 
        
        if (data.success == true) {
            localStorage.removeItem("services");
            localStorage.removeItem("confirm_data");
            commit("FETCH_DATA_CARTS", []);
            commit("FETCH_DATA", []);
            commit("UPDATE_ZIPCODE", null);
            commit("ZIPCODE_SUCCESS", null);
            commit("SUB_TOTAL", null);
            commit("GRAND_TOTAL", null);
            commit("FINISH_STEP_LOADING", false);
            return {
                success: data.success,
                type: data.type
            };
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
    // add data to local storage
    async AddDataLocalStorage({ commit, state, getters }) {
        localStorage.removeItem("confirm_data");
        const datas = {
            carts: state.carts,
            cartdata: state.cartobj, 
            images: state.images,
            datetime: state.datetime,
            payment: state.payment, 
            addon_price: state.feature_price,
            discount: state.percent,
            user_id: this.$auth.user.id,
            answer: state.answer,
            grand_total: state.grand_total, 
            taxes: state.rate, 
            address: state.address
        };
        
       await localStorage.setItem("confirm_data", JSON.stringify(datas));
       
       if (localStorage.getItem("confirm_data")) {
           return true;
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
                let some = arr.some(el => el.question_id == obj.question_id);
                if (!some) {
                    arr.push(obj); 
                }
            }
            return {
                id: el.id,
                question: arr
            };
        });

        commit("CHECK_QUESTION", maped);
    }, 
    async showCart({ commit, state, getters }) {
        try { 
            commit("IS_LOADING", true); 
          let { data } = await this.$axios.get(
            `/auth/check-fields/${this.$auth.user.id}`
          );
          if (data.success === true) {
            commit("IS_REQUIRED_FIELD", false); 
            commit("IS_LOGGEDIN", false);
            commit("IS_AUTH", true);
          } else { 
             commit("IS_REQUIRED_FIELD", true);
             commit("IS_AUTH", false);
          }
          commit("IS_LOADING", false); 
        } catch (e) {
          return;
        }
      },
  /**
     *  fetch stripe key
     * @param {services id} param1
     */
    async GetStripeKey({ commit, state, rootState }) {
        commit("LOADING_STRIPE", true);
        const datas = {
            grand_total: state.grand_total,
            name:  rootState.auth.user.first_name + " " +
            rootState.auth.user.last_name,
            email: rootState.auth.user.email, 
        }
        let { data } = await this.$axios.post("/order/payment-intents", datas);
        if (data.success == true) { 
            commit(
                "FETCH_STRIPE_KEY",
                {
                    publisher: data.publisher,
                    secret: data.secret,
                    payment_id: data.payment_id
                }
            );
            commit("LOADING_STRIPE", false);
            return true;
        }
    },
};
