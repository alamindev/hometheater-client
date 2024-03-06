<template>
  <section
    class="sm:px-4 lg:px-16 sm:pt-6 pb-20 cart--page"
    :class="carts.length ? 'bg-custom' : 'empty-cart-gradient'"
    v-if="!loading"
  >
    <div
      class="container mx-auto"
      v-if="carts.length || is_success || step === 7"
    >
      <div class="bg-white shadow-lg rounded-md">
        <div v-show="!is_loading">
          <div v-if="!is_loggedin && !is_required_field">
            <!-- cart for desktop -->
            <div v-if="!is_success && step !== 7">
              <div class="flex flex-col lg:flex-row items-start">
                <div class="w-full px-4 py-4 lg:w-9/12 lg:px-10 lg:py-12">
                  <div
                    class="lg:hidden flex justify-between lg:mb-5 border-b sm:-mx-4 sm:px-10"
                  >
                    <button
                      :class="
                        current == 'shopping-cart'
                          ? 'border-b-4 text-gray-800 font-medium  text-sm sm:text-base'
                          : 'text-gray-500'
                      "
                      type="button"
                      @click="CartTab('shopping-cart')"
                      class="border-0 py-2 border-brand-color"
                    >
                      <span v-if="step === 1">Cart Items</span>
                      <span
                        v-if="
                          step === 2 &&
                          Object.keys(cartdata.services).length === 0
                        "
                        >Payment Process</span
                      >
                      <span
                        v-if="
                          step === 2 &&
                          Object.keys(cartdata.services).length !== 0
                        "
                        >Zipcode Checker</span
                      >
                      <span
                        v-if="
                          step === 3 &&
                          Object.keys(cartdata.services).length !== 0
                        "
                        >Extra Addons</span
                      >
                      <span
                        v-if="
                          step === 4 &&
                          Object.keys(cartdata.services).length !== 0
                        "
                        >Upload Images</span
                      >
                      <span
                        v-if="
                          step === 5 &&
                          Object.keys(cartdata.services).length !== 0
                        "
                        >Booking Date & Time</span
                      >
                      <span
                        v-if="
                          step === 6 &&
                          Object.keys(cartdata.services).length !== 0
                        "
                        >Checkout</span
                      >
                    </button>
                    <button
                      type="button"
                      @click="CartTab('order-summary')"
                      class="border-0 py-2 border-brand-color text-sm sm:text-base"
                      :class="
                        current == 'order-summary'
                          ? 'border-b-4 text-gray-800 font-medium'
                          : 'text-gray-500'
                      "
                    >
                      Order Summary
                    </button>
                  </div>

                  <div
                    class=""
                    :class="current == 'shopping-cart' ? 'block' : 'hidden'"
                  >
                    <CartItems v-if="step === 1" />
                    <div v-if="Object.keys(cartdata.services).length !== 0">
                      <div v-if="!is_check_zipcode">
                        <ZipCode v-if="step === 2" @prev="prev" />
                      </div>
                      <Questions v-show="step === 3" @prev="prev" />
                      <UploadImage v-show="step === 4" @prev="prev" />
                      <Calendar
                        v-if="step === 5"
                        @prev="prev"
                        :err="calendarerr"
                      />
                      <finalStep
                        v-if="step === 6"
                        @prev="prev"
                        :is_confirmation="false"
                      />
                    </div>
                    <div class="" v-else>
                      <FinalStep v-if="step === 3" @prev="prev" />
                    </div>
                  </div>

                  <div
                    class="lg:hidden"
                    :class="current == 'order-summary' ? 'block' : 'hidden'"
                  >
                    <div class="sm:-ml-4 sm:-mr-4">
                      <OrderMobileSummary />
                    </div>
                  </div>
                  <div class="lg:pt-10 lg:hidden">
                    <MobileFooter
                      @PaymentForm="PaymentForm"
                      @finishedCheckout="finishedCheckout"
                      :isCheckout="isDisabled"
                      @next="mobileNext"
                      :step="step"
                      :currentTab="current"
                    />
                  </div>
                </div>
                <div
                  class="hidden lg:block lg:w-3/12 font-rubik top-0 sticky h-full"
                >
                  <OrderSummery
                    @PaymentForm="PaymentForm"
                    @finishedCheckout="finishedCheckout"
                    :isCheckout="isDisabled"
                    @next="next"
                    :step="step"
                  />
                </div>
              </div>
            </div>
            <!-- last cart for success  -->
            <div
              class="flex px-10 py-20 flex-col items-center font-rubik"
              v-if="is_success || step === 7"
            >
              <div class="flex flex-col justify-center items-center">
                <i class="fas fa-check-circle text-2xl text-brand-color"></i>
                <h3 class="text-brand-color text-3xl font-medium">Success!</h3>
              </div>
              <div v-if="!only_product">
                <p class="text-gray-400 pt-8 pb-3">
                  Your Product & Services Ordered successfully Completed!
                </p>
                <div class="pb-10">
                  <h1 class="text-dark-sm text-xl pb-3">
                    Appointement Date:
                    <span class="font-bold"> {{ date }}</span>
                  </h1>
                </div>
              </div>
              <div v-else>
                <p class="text-gray-400 pt-8 pb-3">
                  Your Product Ordered successfully Completed!
                </p>
              </div>
              <nuxt-link
                to="users/dashboard"
                class="py-3 px-10 bg-brand-color hover:bg-brand-color-hover text-white rounded-md"
                >View Dashboard</nuxt-link
              >
            </div>
          </div>
          <div v-else class="">
            <div class="px-4 lg:px-10 pt-8">
              <h1
                class="text-xl sm:text-2xl font-bold font-rubik text-gray-600 border-b pb-1"
              >
                Login or Register to Continue
              </h1>
            </div>
            <div class="py-4 sm:py-12">
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
            </div>
          </div>
        </div>
        <div
          v-show="is_loading"
          class="min-h-[400px] flex justify-center items-center"
        >
          <div class="loader-parent mt-16 mb-20">
            <div class="loader"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-center" v-else>
      <div class="">
        <div class="flex justify-center">
          <img
            loading="lazy"
            class="w-8/12"
            src="images/cart-is-empty.svg"
            alt="cart-is-empty.svg"
          />
        </div>
        <h1 class="text-center text-2xl text-dark-sm font-bold -mt-10">
          Your Cart is Empty!
        </h1>
        <p class="text-brand-gray pt-2 font-medium text-center">
          Go back to add items to your shopping cart
        </p>
        <div class="flex flex-wrap justify-center gap-4 pt-3">
          <nuxt-link
            to="/booking"
            class="flex items-center px-5 text-white py-2 bg-brand-color hover:bg-brand-color-hover rounded-md shadow-md"
          >
            <i class="fas fa-long-arrow-alt-left text-2xl pr-3"></i>
            Services
          </nuxt-link>
          <nuxt-link
            to="/shop"
            class="flex items-center px-5 text-white py-2 bg-brand-color hover:bg-brand-color-hover rounded-md shadow-md"
          >
            <i class="fas fa-long-arrow-alt-left text-2xl pr-3"></i> Shop Now
          </nuxt-link>
        </div>
      </div>
    </div>

    <PaymentForm
      @finishedCheckout="finishedCheckout"
      @hideModal="hideModal"
      :paymentModal="paymentModal"
    />
  </section>

  <div v-else class="loader-parent mt-16 mb-20">
    <div class="loader"></div>
  </div>
</template>

<script>
import { getCookie } from "@/Utils/Cookie";
import Calendar from "@/components/Cart/Calendar";
import CartItems from "@/components/Cart/CartItems";
import FinalStep from "@/components/Cart/FinalStep.vue";
import Login from "@/components/Cart/Login";
import MobileFooter from "@/components/Cart/MobileFooter";
import OrderMobileSummary from "@/components/Cart/OrderMobileSummary";
import OrderSummery from "@/components/Cart/OrderSummery";
import Questions from "@/components/Cart/Questions";
import Register from "@/components/Cart/Register";
import RequiredFields from "@/components/Cart/RequiredFields";
import UploadImage from "@/components/Cart/UploadImage";
import ZipCode from "@/components/Cart/ZipCode";
import PaymentForm from "../components/Cart/PaymentForm.vue";

export default {
  name: "Cart",
  components: {
    OrderSummery,
    OrderMobileSummary,
    MobileFooter,
    CartItems,
    ZipCode,
    Questions,
    UploadImage,
    Calendar,
    FinalStep,
    PaymentForm,
    Login,
    Register,
    RequiredFields,
  },
  data() {
    return {
      is_cart: false,
      step: 1,
      calendarerr: "",
      current: "shopping-cart",
      is_next: false,
      paymentModal: false,
      is_check_zipcode: false,
      is_success: false,
      only_product: false,
    };
  },
  computed: {
    carts() {
      return this.$store.state.cart.carts;
    },
    is_loading() {
      return this.$store.state.cart.is_loading;
    },
    cartdata() {
      return this.$store.state.cart.cartobj;
    },
    loading() {
      return this.$store.state.loading.loading;
    },
    total_price() {
      return this.$store.state.cart.sub_total;
    },
    isDisabled() {
      if (this.carts.length > 0) return false;
      return true;
    },
    step_active() {
      return this.$store.state.cart.step_3_active;
    },
    is_loggedin() {
      if (this.step_active) {
        return this.$store.state.cart.is_loggedin;
      }
      return false;
    },
    is_register_form() {
      return this.$store.state.cart.is_register_form;
    },
    is_required_field() {
      if (this.step_active) {
        return this.$store.state.cart.is_required_field;
      }
      return false;
    },
    date() {
      let datetime = [...this.$store.state.cart.datetime];
      if (datetime.length > 0) {
        if (datetime.length > 1) {
          let first = datetime.shift();
          let last = datetime.pop();
          return (
            this.$moment(first.date).format("L") +
            ", " +
            this.$moment(first.time, ["h:mm"]).format("ha") +
            "-" +
            this.$moment(last.time, ["h:mm"]).format("ha")
          );
        } else {
          return (
            this.$moment(datetime[0].date).format("L") +
            ", " +
            this.$moment(datetime[0].time, ["h:mm"]).format("ha")
          );
        }
      }
      return "";
    },
    cart_title() {
      let carts = this.$store.state.cart.carts;

      if (carts.length > 0) {
        let title = carts.map((el) => el.title);
        if (title.length === 1) return title[0];
        const firsts = title.slice(0, title.length - 1);
        const last = title[title.length - 1];
        return firsts.join(", ") + " and " + last;
      }
    },
    user_name() {
      return (
        this.$store.state.auth.user.first_name +
        " " +
        this.$store.state.auth.user.last_name
      );
    },
    price() {
      return this.$store.state.cart.sub_total;
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
  head() {
    return {
      title: "Cart | Home Theater Proz",
      script: [
        {
          src: "https://js.stripe.com/v3/",
          body: true,
        },
      ],
    };
  },
  methods: {
    GotoLogin() {
      this.$store.commit("cart/IS_REGISTER_FORM", false);
    },
    showRegisterForm() {
      this.$store.commit("cart/IS_REGISTER_FORM", true);
    },
    showLoginForm() {
      this.$store.commit("cart/IS_REGISTER_FORM", false);
    },
    hideModal() {
      this.paymentModal = false;
      this.$store.commit("cart/FINISH_STEP_LOADING", false);
    },
    prev() {
      if (this.is_check_zipcode && this.step === 3) {
        this.step = 1;
      } else {
        this.step--;
      }
      this.is_next = false;
      if (this.step === 3) {
        this.$store.commit("cart/STEP_3_ACTIVE", true);
      } else {
        this.$store.commit("cart/STEP_3_ACTIVE", false);
      }
    },
    checkZipcodeCookie() {
      let is_zipcode = getCookie("is_zipcode_checked");
      if (is_zipcode) {
        this.is_check_zipcode = true;
      }
    },
    mobileNext() {
      if (this.step == 1 && this.is_next == false) {
        this.current = "order-summary";
        this.is_next = true;
      } else {
        if (
          this.is_check_zipcode &&
          this.step === 1 &&
          Object.keys(this.cartdata.services).length !== 0
        ) {
          this.step = 3;
        } else {
          if (Object.keys(this.cartdata.services).length === 0) {
            this.step = 3;
          } else {
            this.step++;
          }
        }
        this.current = "shopping-cart";
      }
      if (this.step === 3) {
        this.$store.commit("cart/STEP_3_ACTIVE", true);
      } else {
        this.$store.commit("cart/STEP_3_ACTIVE", false);
      }
      document.documentElement.scrollTop = 0;
    },
    next() {
      if (
        this.is_check_zipcode &&
        this.step === 1 &&
        Object.keys(this.cartdata.services).length !== 0
      ) {
        this.step = 3;
      } else {
        if (Object.keys(this.cartdata.services).length === 0) {
          this.step = 3;
        } else {
          this.step++;
        }
      }
      if (this.step === 3) {
        this.$store.commit("cart/STEP_3_ACTIVE", true);
      } else {
        this.$store.commit("cart/STEP_3_ACTIVE", false);
      }
      document.documentElement.scrollTop = 0;
    },
    calendarErr() {
      this.calendarerr = "Please choose date and time";
    },
    PaymentForm() {
      this.current = "shopping-cart";
      this.paymentModal = true;
    },
    finishedCheckout(token) {
      this.$store.dispatch("cart/finishedCheckout", { token }).then((res) => {
        if (res.success == true) {
          if (
            this.step === 2 &&
            Object.keys(this.cartdata.services).length === 0
          ) {
            this.is_success = true;
          } else {
            this.step = 7;
          }
          if (res.type === 1) {
            this.only_product = true;
          }
          this.paymentModal = false;
          this.$store.commit("cart/IS_NEXT", false);
          this.$swal({
            toast: true,
            position: "top-end",
            icon: "success",
            title: "Your booking has been successfully completed!",
            showConfirmButton: false,
            timer: 6000,
          });
        }
      });
    },
    CartTab(param) {
      this.current = param;
    },
  },
  created() {
    this.step = 1;
    this.$store.commit("cart/UPDATE_DATETIME", []);
    this.$store.commit("cart/UPDATE_ANSWER", []);
    this.$store.commit("cart/FEATURE_PRICE", null);
    this.$store.commit("cart/SUB_TOTAL", null);
    this.$store.commit("cart/PERCENT_VAL", null);
    this.$store.commit("cart/PERCENT", null);
    this.$store.commit("cart/IS_FINISHED", false);
    this.$store.commit("cart/IS_PROMO", false);
    this.$store.commit("cart/IS_ITEM", false);
    if (typeof this.$route.query.step !== "undefined") {
      if (!this.authenticated) {
        this.$router.push("login?redirect=cart?step=3");
      }
      this.step = +this.$route.query.step;
    }
  },
  mounted() {
    this.$store.dispatch("cart/suggestData");
    this.$store.dispatch("cart/FetchTax");
    this.checkZipcodeCookie();
  },
};
</script>

<style lang="scss"  scoped>
.bg-custom {
  background: transparent
    linear-gradient(
      343deg,
      rgba(255, 255, 255, 1) 15%,
      rgba(73, 110, 225, 0.05) 100%
    );
}
.custom_ul span {
  color: #24364a;
}
.text--color {
  color: #999595;
}
.icon--color {
  color: #999595;
}
.number--bg {
  color: #999595;
}
</style>
