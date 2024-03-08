<template>
  <div class="bg-light-blue-cart h-full px-5 py-12">
    <h2
      class="font-medium custom--text-order-title text-gray-700 border-b pb-4 text-center"
    >
      Order Summary
    </h2>
    <div class="flex justify-between py-4">
      <p class="text-base uppercase" v-if="count === 1">ITEM {{ count }}</p>
      <p class="text-base uppercase" v-else>ITEMS {{ count }}</p>
      <p class="text-base">${{ total }}</p>
    </div>

    <div class="pt-5 pb-8">
      <label
        for="promocode"
        class="pb-2 inline-block upercase text-base font-medium rounded-sm !text-dark"
        >PROMO CODE</label
      >
      <input
        class="border w-full text-gray-500 bg-white border-gray-200 rounded-sm disabled:bg-gray-200"
        name="promocode"
        id="promocode"
        type="text"
        v-model="promoCode"
        placeholder="Enter code here"
        :disabled="isDisabledInput"
      />
      <div class="text-red-500 text-xs" v-if="errors.message">
        {{ errors.message }}
      </div>
      <button
        type="button"
        @click="applyPromo"
        :disabled="isDisabled"
        class="bg-red-400 hover:bg-red-500 disabled:opacity-75 text-white text-base px-6 py-3 mt-3 rounded-md"
      >
        Apply
      </button>
    </div>
    <div class="py-4 border-t">
      <div class="w-full">
        <div class="flex justify-between pb-2">
          <h2 class="uppercase text-gray-500 text-base font-medium">
            <span v-if="subTotal">Sub Total</span>
            <span v-else>Total</span>
          </h2>
          <p class="text-gray-500 font-medium">${{ total }}</p>
        </div>
        <div class="flex justify-between pb-2" v-if="feature_price">
          <h2 class="uppercase text-gray-500 text-base font-medium">
            ADDON EXTRAS
          </h2>
          <p class="text-gray-500 font-medium">+ ${{ feature_price }}</p>
        </div>
        <div class="" v-if="is_promo">
          <div class="flex justify-between pb-2">
            <h2 class="uppercase text-gray-500 text-base font-medium">
              {{ percent }}% Discount
            </h2>
            <p class="text-gray-500 font-medium">- ${{ percentVal }}</p>
          </div>
        </div>
      </div>
      <div class="" v-if="subTotal">
        <hr />
        <div class="flex justify-between pb-6 pt-3">
          <h2 class="uppercase text-gray-500 text-base font-medium">Total</h2>
          <p class="text-gray-500 font-medium">${{ subTotal }}</p>
        </div>
      </div>
    </div>
    <button
      type="button"
      class="disabled:opacity-50 py-3 px-5 text-base sm:text-xl text-white bg-brand-color hover:bg-brand-color-hover flex items-center justify-between w-full rounded-md"
      :disabled="isCheckout == true"
      @click="onClickNext"
      v-if="step === 1"
    >
      <i class="fas fa-luggage-cart"></i>
      <p class="uppercase">CHECKOUT</p>
      <i class="fas fa-arrow-right"></i>
    </button>

    <div v-if="Object.keys(cartdata.services).length !== 0">
      <button
        type="button"
        class="disabled:opacity-50 py-3 px-5 text-base sm:text-xl text-white bg-brand-color hover:bg-brand-color-hover flex items-center justify-between w-full rounded-md"
        :disabled="is_next == false"
        @click="onClickNext"
        v-if="step === 2"
      >
        <p class="uppercase"></p>
        <p class="uppercase">Next</p>
        <i class="fas fa-arrow-right"></i>
      </button>
      <div class="" v-if="step === 3">
        <div class="" v-if="question_main.length > 0">
          <button
            v-if="activeStep + 1 < question_main.length"
            @click="nextQuestion"
            type="button"
            :disabled="isQuestionCheck(activeStep)"
            class="disabled:opacity-50 py-3 px-5 text-base sm:text-xl text-white bg-brand-color hover:bg-brand-color-hover flex items-center justify-between w-full rounded-md"
          >
            <p class="uppercase"></p>
            <p class="uppercase">Next</p>
            <i class="fas fa-arrow-right"></i>
          </button>
          <button
            v-if="activeStep + 1 === question_main.length"
            type="button"
            class="disabled:opacity-50 py-3 px-5 text-base sm:text-xl text-white bg-brand-color hover:bg-brand-color-hover flex items-center justify-between w-full rounded-md"
            @click="onClickNext"
            :disabled="isQuestionCheck(activeStep)"
          >
            <p class="uppercase"></p>
            <p class="uppercase">Next</p>
            <i class="fas fa-arrow-right"></i>
          </button>
        </div>
        <button
          v-else
          type="button"
          class="disabled:opacity-50 py-3 px-5 text-base sm:text-xl text-white bg-brand-color hover:bg-brand-color-hover flex items-center justify-between w-full rounded-md"
          @click="onClickNext"
        >
          <p class="uppercase"></p>
          <p class="uppercase">Next</p>
          <i class="fas fa-arrow-right"></i>
        </button>
      </div>
      <button
        type="button"
        class="disabled:opacity-50 py-3 px-5 text-base sm:text-xl text-white bg-brand-color hover:bg-brand-color-hover flex items-center justify-between w-full rounded-md"
        @click="onClickNext"
        v-if="step === 4"
      >
        <p class="uppercase"></p>
        <p class="uppercase">Next</p>
        <i class="fas fa-arrow-right"></i>
      </button>
      <button
        type="button"
        class="disabled:opacity-50 py-3 px-5 text-base sm:text-xl text-white bg-brand-color hover:bg-brand-color-hover flex items-center justify-between w-full rounded-md"
        @click="onClickNext"
        :disabled="is_finished == false"
        v-if="step === 5"
      >
        <p class="uppercase"></p>
        <p class="uppercase">Next</p>
        <i class="fas fa-arrow-right"></i>
      </button>
      <div v-if="Object.keys(cartdata.products).length !== 0">
        <button
          type="button"
          class="disabled:opacity-50 py-3 px-5 text-base sm:text-xl text-white bg-brand-color hover:bg-brand-color-hover flex items-center justify-center w-full rounded-md"
          @click="PaymentForm"
          v-if="step === 6"
        >
          <span v-if="!loading_stripe" class="uppercase">Pay Now</span>
          <Loader v-if="loading_stripe" />
        </button>
      </div>
      <div v-else>
        <button
          type="button"
          class="disabled:opacity-50 py-3 px-5 text-base sm:text-xl text-white bg-brand-color hover:bg-brand-color-hover flex items-center justify-center w-full rounded-md"
          @click="PaymentForm"
          v-if="payment === 'online' && step === 6"
        >
          <span v-if="!loading_stripe" class="uppercase">Pay Now</span>
          <Loader v-if="loading_stripe" />
        </button>
        <button
          type="button"
          :disabled="finish_loading"
          class="disabled:opacity-50 py-3 px-5 text-base sm:text-xl text-white bg-brand-color hover:bg-brand-color-hover flex items-center justify-center w-full rounded-md"
          @click="SubmitLocalPayment"
          v-if="payment === 'local' && step === 6"
        >
          <span v-if="!finish_loading" class="uppercase"> Place Order</span>
          <Loader v-if="finish_loading" />
        </button>
      </div>
    </div>
    <div v-else>
      <button
        type="button"
        class="disabled:opacity-50 py-3 px-5 text-base sm:text-xl text-white bg-brand-color hover:bg-brand-color-hover flex items-center justify-center w-full rounded-md"
        @click="PaymentForm"
        v-if="step === 3"
      >
        <span v-if="!loading_stripe" class="uppercase">Pay Now</span>
        <Loader v-if="loading_stripe" />
      </button>
    </div>
  </div>
</template>

<script>
import Loader from "@/components/Loader/Loading-white";
import { mapGetters } from "vuex";
export default {
  props: ["isCheckout", "step"],
  name: "OrderSummery",
  data() {
    return {
      item: 1,
      imgurl: process.env.imgUrl,
    };
  },
  components: {
    Loader,
  },
  computed: {
    ...mapGetters({
      count: "cart/cartMainItem",
      total: "cart/getTotal",
      promoCode: "cart/getPromoCode",
    }),
    promoCode: {
      get() {
        return this.$store.state.cart.promocode;
      },
      set(value) {
        this.$store.commit("cart/UPDATE_PROMOCODE", value);
      },
    },

    carts() {
      return this.$store.state.cart.carts;
    },
    cartdata() {
      return this.$store.state.cart.cartobj;
    },
    percent() {
      return this.$store.state.cart.percent;
    },
    percentVal() {
      return this.$store.state.cart.percent_val;
    },
    subTotal() {
      return this.$store.state.cart.sub_total;
    },
    is_promo() {
      return this.$store.state.cart.is_promo;
    },
    is_next() {
      return this.$store.state.cart.is_next;
    },
    is_fields() {
      return this.$store.state.cart.is_fields;
    },
    is_finished() {
      return this.$store.state.cart.is_finished;
    },
    is_auth() {
      return this.$store.state.cart.is_auth;
    },
    feature_price() {
      return this.$store.state.cart.feature_price;
    },
    payment() {
      return this.$store.state.cart.payment;
    },
    isDisabled() {
      if (this.promoCode != "") return false;
      return true;
    },
    isDisabledInput() {
      if (this.carts.length > 0) return false;
      return true;
    },
    datetime() {
      return this.$store.state.cart.datetime;
    },
    payment() {
      return this.$store.state.cart.payment;
    },
    question_main() {
      return this.$store.state.cart.questions;
    },
    activeStep() {
      return this.$store.state.cart.activeStep;
    },
    finish_loading() {
      return this.$store.state.cart.finish_loading;
    },
    loading_stripe() {
      return this.$store.state.cart.loading_stripe;
    },
    checkQuetions() {
      return this.$store.state.cart.checkQuetions;
    },
    isQuestionCheck() {
      return (activeStep) => {
        let queArr = [...this.checkQuetions];
        let quemainArr = [...this.question_main];
        let arr = queArr[activeStep];
        let arrmain = quemainArr[activeStep];
        if (arrmain.questions.length > arr.question.length) {
          return true;
        } else {
          return false;
        }
      };
    },
  },
  methods: {
    nextQuestion() {
      this.$store.commit("cart/UPDATE_STEP_NEXT");
    },

    async applyPromo() {
      if (!this.authenticated) {
        this.$router.push("login?redirect=cart");
      }
      this.$store.dispatch("cart/applyPromo");
    },
    onClickNext() {
      this.$emit("next");
    },
    PaymentForm() {
      this.$emit("PaymentForm");
    },
    SubmitLocalPayment() {
      this.$store.commit("cart/FINISH_STEP_LOADING", true);
      this.$emit("finishedCheckout", null);
    },
  },
};
</script>

<style scoped>
.custom--text-order-title {
  font-size: 1.7rem;
  font-weight: 700;
}
</style>
