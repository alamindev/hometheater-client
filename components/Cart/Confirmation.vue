<template>
  <div class="relative">
    <div class="" v-if="!is_loading">
      <div v-if="!is_loggedin && !is_required_field">
        <finalStep @prev="onClickPrevious" :is_confirmation="true" />
      </div>
      <div v-else>
        <Register
          v-if="is_register_form && !is_required_field"
          @GotoLogin="GotoLogin"
          @showLoginForm="showLoginForm"
        />
        <Login
          v-if="!is_register_form && !is_required_field"
          @showRegisterForm="showRegisterForm"
        />
        <RequiredFields v-if="is_required_field" />
        <button class="flex items-center" v-else @click="onClickPrevious">
          <i class="fas fa-long-arrow-alt-left"></i>
          <span class="pl-3 font-medium">Go Back </span>
        </button>
      </div>
    </div>
    <div class="pt-32 pb-32" v-else>
      <div class="loader-parent">
        <div class="loader"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Login from "@/components/Cart/Login";
import Register from "@/components/Cart/Register";
import RequiredFields from "@/components/Cart/RequiredFields";
import FinalStep from "./FinalStep.vue";

export default {
  name: "Confirmation",
  components: {
    Login,
    Register,
    RequiredFields,
    FinalStep,
  },
  computed: {
    is_loading() {
      return this.$store.state.cart.is_loading;
    },
    is_loggedin() {
      return this.$store.state.cart.is_loggedin;
    },
    is_register_form() {
      return this.$store.state.cart.is_register_form;
    },
    is_required_field() {
      return this.$store.state.cart.is_required_field;
    },
    step_active() {
      return this.$store.state.cart.step_3_active;
    },
  },
  watch: {
    step_active: function (val, newVal) {
      if (val === true) {
        if (!this.authenticated) {
          this.$store.commit("cart/IS_LOGGEDIN", true);
          this.$store.commit("cart/IS_AUTH", false);
          this.$swal({
            icon: "error",
            text: "Please login or register to continue.",
            showConfirmButton: true,
            timer: 6000,
          });
        } else {
          this.$store.dispatch("cart/showCart");
        }
      }
    },
  },
  methods: {
    onClickPrevious() {
      this.$emit("prev");
    },
    GotoLogin() {
      this.$store.commit("cart/IS_REGISTER_FORM", false);
    },
    showRegisterForm() {
      this.$store.commit("cart/IS_REGISTER_FORM", true);
    },
    showLoginForm() {
      this.$store.commit("cart/IS_REGISTER_FORM", false);
    },
  },
  created() {
    this.$store.commit("cart/UPDATE_ACTIVE_STEP", 0);
    if (!this.authenticated) {
      this.$store.commit("cart/IS_LOGGEDIN", true);
      this.$store.commit("cart/IS_AUTH", false);
    } else {
      this.$store.dispatch("cart/showCart");
    }
  },
};
</script>

<style>
.question--heading span {
  color: #4e81ee;
  font-weight: bold;
  padding-left: 10px;
}
.question--step {
  display: none;
}
.question--step.activestep {
  display: block;
}
input[type="radio"] {
  width: 1.5em;
  height: 1.5em;
}
</style>
