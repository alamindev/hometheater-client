<template>
  <section
    class="sm:px-4 lg:px-16 sm:pt-6 pb-20 cart--page"
    :class="carts.length ? 'bg-custom' : 'empty-cart-gradient'"
    v-if="!loading"
  >
    <div class="container mx-auto" v-if="carts.length || step === 6">
      <div class="hidden lg:block"><Breadcrum :step="step" /></div>
      <div class="block lg:hidden"><BreadcrumMobile :step="step" /></div>

      <div class="bg-white shadow-lg rounded-md">
        <!-- cart for desktop -->
        <div class="hidden lg:block" v-if="step !== 6">
          <div class="flex">
            <div class="w-9/12 px-10 py-12">
              <CartItems :header="true" v-if="step === 1" />
              <ZipCode :header="true" v-if="step === 2" @prev="prev" />
              <Questions :header="true" v-show="step === 3" @prev="prev" />
              <UploadImage :header="true" v-show="step === 4" @prev="prev" />
              <Calendar
                :header="true"
                v-if="step === 5"
                @prev="prev"
                :err="calendarerr"
              />
            </div>
            <div class="w-3/12 font-rubik">
              <OrderSummery
                @calendarErr="calendarErr"
                @finishedCheckout="finishedCheckout"
                @Checkout="Checkout"
                @cryptoCheckout="cryptoCheckout"
                :isCheckout="isDisabled"
                @next="next"
                :step="step"
              />
            </div>
          </div>
          <div></div>
        </div>
        <!-- cart for mobile  -->
        <div class="block lg:hidden px-4 sm:px-10 py-8" v-if="step !== 6">
          <div class="flex justify-between sm:mb-5 border-b sm:-mx-10 sm:px-10">
            <button
              :class="
                current == 'shopping-cart'
                  ? 'border-b-4 text-gray-800 font-bold'
                  : 'text-gray-500'
              "
              type="button"
              @click="CartTab('shopping-cart')"
              class="border-0 py-2 border-brand-color"
            >
              Shopping Cart
            </button>
            <button
              type="button"
              @click="CartTab('order-summary')"
              class="border-0 py-2 border-brand-color"
              :class="
                current == 'order-summary'
                  ? 'border-b-4 text-gray-800 font-bold'
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
            <CartItems :header="false" v-if="step === 1" />
            <ZipCodeMobile :header="false" v-if="step === 2" @prev="prev" />
            <Questions :header="false" v-show="step === 3" @prev="prev" />
            <UploadImage :header="false" v-show="step === 4" @prev="prev" />
            <Calendar
              :header="false"
              v-if="step === 5"
              @prev="prev"
              :err="calendarerr"
            />
          </div>
          <div
            class=""
            :class="current == 'order-summary' ? 'block' : 'hidden'"
          >
            <div class="sm:-ml-10 sm:-mr-10">
              <OrderMobileSummary />
            </div>
          </div>
          <div class="pt-10">
            <MobileFooter
              @calendarErr="calendarErr"
              @finishedCheckout="finishedCheckout"
              @Checkout="Checkout"
              :isCheckout="isDisabled"
              @next="mobileNext"
              :step="step"
              :currentTab="current"
            />
          </div>
        </div>
        <!-- last cart for success  -->
        <div
          class="flex px-10 py-20 flex-col items-center font-rubik"
          v-if="step === 6"
        >
          <div class="flex flex-col justify-center items-center">
            <i class="fas fa-check-circle text-2xl text-brand-color"></i>
            <h3 class="text-brand-color text-3xl font-medium">Success!</h3>
          </div>
          <p class="text-gray-400 pt-8 pb-3">Your appointment is booked for</p>

          <div class="pb-10">
            <h1 class="font-bold text-dark-sm text-xl pb-3">
              {{ date }}
            </h1>
          </div>
          <nuxt-link
            to="users/dashboard"
            class="py-3 px-10 bg-brand-color hover:bg-brand-color-hover text-white rounded-md"
            >View Dashboard</nuxt-link
          >
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
          Go back to the services page and add up to 4 items to your shopping
          cart
        </p>
        <div class="flex justify-center pt-3">
          <nuxt-link
            to="/booking"
            class="flex items-center px-5 text-white py-2 bg-brand-color hover:bg-brand-color-hover rounded-md shadow-md"
          >
            <i class="fas fa-long-arrow-alt-left text-2xl pr-3"></i> Add
            Services to Cart
          </nuxt-link>
        </div>
      </div>
    </div>
    <modal
      name="dialog"
      class="relative"
      :clickToClose="false"
      :scrollable="true"
      :adaptive="true"
      height="auto"
    >
      <div
        @click="hidemodal"
        class="cursor-pointer ml-auto mr-2 mt-2 w-6 h-6 bg-gray-300 rounded-full flex justify-center items-center"
      >
        <i class="fas fa-times"></i>
      </div>
      <h2 class="py-2 text-semibold text-dark-sm text-lg text-center">
        Secure Checkout: Please enter your card info.
      </h2>
      <div class="px-12 pt-3">
        <figure>
          <img
            loading="lazy"
            class="w-full"
            src="/images/credit-card-icons.png"
            alt="credit-card-icons.png"
          />
        </figure>
      </div>
      <div class="w-full flex px-4 sm:px-12 pt-8 pb-16">
        <SquarePayment @processPayment="processPayment" />
      </div>
    </modal>
    <modal
      name="cryptoDialog"
      class="relative"
      :clickToClose="false"
      :scrollable="true"
      :adaptive="true"
      height="auto"
    >
      <div
        @click="hidecryptoDialog"
        class="cursor-pointer ml-auto mr-2 mt-2 w-6 h-6 bg-gray-300 rounded-full flex justify-center items-center"
      >
        <i class="fas fa-times"></i>
      </div>
      <div
        class="w-full flex justify-center items-center flex-col px-4 sm:px-12 pt-8 pb-16"
      >
        <button
          id="btn"
          class="pay--with-crypto py-2 px-5 bg-brand-color hover:bg-brand-color-hover text-white rounded-md"
        >
          Pay with crypto currency
        </button>

        <p id="pay" class="pt-5"></p>
      </div>
    </modal>
  </section>

  <div v-else class="loader-parent mt-16 mb-20">
    <div class="loader"></div>
  </div>
</template>

<script>
import Breadcrum from "@/components/Cart/Breadcrum";
import BreadcrumMobile from "@/components/Cart/BreadcrumMobile";
import Calendar from "@/components/Cart/Calendar";
import CartItems from "@/components/Cart/CartItems";
import MobileFooter from "@/components/Cart/MobileFooter";
import OrderMobileSummary from "@/components/Cart/OrderMobileSummary";
import OrderSummery from "@/components/Cart/OrderSummery";
import Questions from "@/components/Cart/Questions";
import UploadImage from "@/components/Cart/UploadImage";
import ZipCode from "@/components/Cart/ZipCode";
import ZipCodeMobile from "@/components/Cart/ZipCodeMobile";
import SquarePayment from "@/components/SquarePayment";

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
    SquarePayment,
    ZipCodeMobile,
    Breadcrum,
    BreadcrumMobile,
  },
  data() {
    return {
      is_cart: false,
      step: 1,
      calendarerr: "",
      current: "shopping-cart",
      is_next: false,
      checkout: false,
    };
  },
  computed: {
    carts() {
      return this.$store.state.cart.carts;
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
  head() {
    return {
      title: "Cart | Home Theater Proz",
      script: [
        {
          src: "https://commerce.coinbase.com/v1/checkout.js?version=201807",
          body: true,
        },
      ],
    };
  },
  methods: {
    prev() {
      this.step--;
      this.is_next = false;
      if (this.step === 3) {
        this.$store.commit("cart/STEP_3_ACTIVE", true);
      } else {
        this.$store.commit("cart/STEP_3_ACTIVE", false);
      }
    },
    mobileNext() {
      if (this.step == 1 && this.is_next == false) {
        this.current = "order-summary";
        this.is_next = true;
      } else {
        this.step++;
        this.current = "shopping-cart";
      }
      if (this.step === 3) {
        this.$store.commit("cart/STEP_3_ACTIVE", true);
      } else {
        this.$store.commit("cart/STEP_3_ACTIVE", false);
      }
    },
    next() {
      this.step++;
      if (this.step === 3) {
        this.$store.commit("cart/STEP_3_ACTIVE", true);
      } else {
        this.$store.commit("cart/STEP_3_ACTIVE", false);
      }
    },
    calendarErr() {
      this.calendarerr = "Please choose date and time";
    },
    hidemodal() {
      this.$modal.hide("dialog");
    },
    hidecryptoDialog() {
      this.$modal.hide("cryptoDialog");
    },
    Checkout() {
      if (!this.authenticated) {
        this.$router.push("login?redirect=cart?step=3");
      }
      this.current = "shopping-cart";
      this.checkout = true;
      this.$modal.show("dialog");
    },
    cryptoCheckout() {
      if (!this.authenticated) {
        this.$router.push("login?redirect=cart?step=3");
      }
      this.current = "shopping-cart";
      this.checkout = true;
      this.$modal.show("cryptoDialog");
      setTimeout(() => {
        const btn = document.getElementById("btn");
        const pay = document.getElementById("pay");

        let obj = {
          name: this.user_name,
          description: this.cart_title,
          amount: this.price,
        };
        btn.onclick = async () => {
          const res = await this.$axios.post("crepto/createCharge", obj);
          pay.innerHTML = `<a href="https://commerce.coinbase.com/checkout/${res.data}" class="buy-with-crypto px-5 py-2 bg-green-400 text-white rounded-md ">Pay Now!</a>`;
        };
      }, 1000);
    },
    processPayment(obj) {
      this.$store.dispatch("cart/finishedCheckout", obj).then((res) => {
        if (res == true) {
          this.step = 6;
          this.$modal.hide("dialog");
          this.$store.commit("cart/IS_NEXT", false);
        }
      });
    },
    finishedCheckout() {
      if (!this.authenticated) {
        this.$router.push("login?redirect=cart?step=3");
      }
      this.$store.dispatch("cart/finishedCheckout").then((res) => {
        if (res == true) {
          this.step = 6;
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
    this.$store.commit("cart/FEATURE_PRICE", "");
    this.$store.commit("cart/SUB_TOTAL", "");
    this.$store.commit("cart/PERCENT_VAL", "");
    this.$store.commit("cart/PERCENT", "");
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
    setTimeout(() => {
      BuyWithCrypto.registerCallback("onSuccess", function (e) {
        this.$store.dispatch("cart/finishedCheckout").then((res) => {
          if (res == true) {
            this.step = 6;
            this.$modal.hide("cryptoDialog");
            this.$store.commit("cart/IS_NEXT", false);
          }
        });
      });
    }, 5000);

    this.$store.dispatch("cart/suggestData");
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
