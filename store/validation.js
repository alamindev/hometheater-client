export const state = () => ({
  errors: {},
  success: {}
});

export const getters = {
  errors(state) {
    return state.errors;
  },
  success(state) {
    return state.success;
  }
};

export const mutations = {
  SET_VALIDATION_ERRORS(state, errors) {
    state.errors = errors;
  },
  SET_VALIDATION_SUCCESS(state, success) {
    state.success = success;
  }
};

export const actions = {
  setErrors({ commit }, errors) {
    commit("SET_VALIDATION_ERRORS", errors);
  },
  clearErrors({ commit }) {
    commit("SET_VALIDATION_ERRORS", {});
  },
  setSuccess({ commit }, success) {
    commit("SET_VALIDATION_SUCCESS", success);
  },
  clearSuccess({ commit }) {
    commit("SET_VALIDATION_SUCCESS", {});
  }
};
