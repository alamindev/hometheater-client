<template>
  <div class="h-full py-2">
    <div class="w-full">
      <div class="">
        <div class="flex justify-between pb-3">
          <h2 class="uppercase text-gray-500 text-base font-medium">
            sub total:
          </h2>
          <p class="text-gray-700 font-bold">${{ total }}</p>
        </div>
        <div class="" v-if="is_promo">
          <div class="flex justify-between pb-2">
            <h2 class="uppercase text-gray-500 text-base font-medium">
              {{ percent }}% Discount
            </h2>
            <p class="text-gray-700 font-bold">- ${{ percentVal }}</p>
          </div>
        </div>
        <div class="flex justify-between pb-2" v-if="feature_price">
          <h2 class="uppercase text-gray-500 text-base font-medium">
            ADDON EXTRAS
          </h2>
          <p class="text-gray-700 font-bold">+ ${{ feature_price }}</p>
        </div>
      </div>
      <div class="w-full pb-6 pt-2" v-if="subTotal != ''">
        <hr />
        <div class="flex justify-between pt-1">
          <h2 class="uppercase text-gray-500 text-base font-medium">
            Total Cost:
          </h2>
          <p class="text-gray-700 font-bold">${{ subTotal }}</p>
        </div>
      </div>
    </div>
    <div class="w-full">
      <button
        type="button"
        class="disabled:opacity-50 py-3 px-5 text-center text-xl text-white bg-brand-color hover:bg-brand-color-hover flex items-center justify-between w-full rounded-md"
        :disabled="isCheckout == true"
        @click="onClickNext"
        v-if="step === 1 && currentTab == 'shopping-cart'"
      >
        <p class="uppercase text-center w-full">NEXT - GO TO SUMMARY</p>
      </button>
      <button
        type="button"
        class="disabled:opacity-50 py-3 px-5 text-center text-xl text-white bg-brand-color hover:bg-brand-color-hover flex items-center justify-between w-full rounded-md"
        :disabled="isCheckout == true"
        @click="onClickNext"
        v-if="step === 1 && currentTab == 'order-summary'"
      >
        <p class="uppercase text-center w-full">NEXT</p>
      </button>
      <button
        type="button"
        class="disabled:opacity-50 py-3 px-5 text-xl text-white bg-brand-color hover:bg-brand-color-hover flex items-center justify-between w-full rounded-md"
        :disabled="is_next == false"
        @click="onClickNext"
        v-if="step === 2"
      >
        <p class="uppercase"></p>
        <p class="uppercase">Next</p>
        <i class="fas fa-arrow-right"></i>
      </button>
      <div class="" v-if="step === 3">
        <div v-if="is_auth">
          <div class="" v-if="question_main.length > 0">
            <button
              v-if="activeStep + 1 < question_main.length"
              @click="nextQuestion"
              type="button"
              :disabled="isQuestionCheck(activeStep)"
              class="disabled:opacity-50 py-3 px-5 text-xl text-white bg-brand-color hover:bg-brand-color-hover flex items-center justify-between w-full rounded-md"
            >
              <p class="uppercase"></p>
              <p class="uppercase">Next</p>
              <i class="fas fa-arrow-right"></i>
            </button>
            <button
              v-if="activeStep + 1 === question_main.length"
              type="button"
              :disabled="isQuestionCheck(activeStep)"
              class="disabled:opacity-50 py-3 px-5 text-xl text-white bg-brand-color hover:bg-brand-color-hover flex items-center justify-between w-full rounded-md"
              @click="onClickNext"
            >
              <p class="uppercase"></p>
              <p class="uppercase">Next</p>
              <i class="fas fa-arrow-right"></i>
            </button>
          </div>
          <button
            v-else
            type="button"
            class="disabled:opacity-50 py-3 px-5 text-xl text-white bg-brand-color hover:bg-brand-color-hover flex items-center justify-between w-full rounded-md"
            @click="onClickNext"
          >
            <p class="uppercase"></p>
            <p class="uppercase">Next</p>
            <i class="fas fa-arrow-right"></i>
          </button>
        </div>
        <button
          v-else
          type="button"
          :disabled="!is_auth"
          class="disabled:opacity-50 py-3 px-5 text-xl text-white bg-brand-color hover:bg-brand-color-hover flex items-center justify-between w-full rounded-md"
        >
          <p class="uppercase"></p>
          <p class="uppercase">Next</p>
          <i class="fas fa-arrow-right"></i>
        </button>
      </div>
      <button
        type="button"
        class="disabled:opacity-50 py-3 px-5 text-xl text-white bg-brand-color hover:bg-brand-color-hover flex items-center justify-between w-full rounded-md"
        @click="onClickNext"
        v-if="step === 4"
      >
        <p class="uppercase"></p>
        <p class="uppercase">Next</p>
        <i class="fas fa-arrow-right"></i>
      </button>
      <button
        type="button"
        class="disabled:opacity-50 py-3 px-5 text-xl text-white bg-brand-color hover:bg-brand-color-hover flex items-center justify-center w-full rounded-md"
        @click="finishToCheckout"
        v-if="step === 5"
      >
        <p class="uppercase">Finish</p>
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: ["isCheckout", "step", "currentTab"],
  name: "OrderSummery",
  data() {
    return {
      item: 1,
      imgurl: process.env.imgUrl,
    };
  },
  computed: {
    ...mapGetters({
      total: "cart/getTotal",
    }),
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
    is_auth() {
      return this.$store.state.cart.is_auth;
    },
    feature_price() {
      return this.$store.state.cart.feature_price;
    },
    isDisabled() {
      if (this.promoCode != "") return false;
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
    onClickNext() {
      if (this.currentTab == "order-summary") {
        this.$emit("next");
      } else {
        this.$emit("next");
      }
    },
    finishToCheckout() {
      if (this.datetime != "") {
        if (this.payment == "online") {
          this.$emit("Checkout");
        } else {
          this.$emit("finishedCheckout");
        }
      } else {
        this.$emit("calendarErr");
        this.$swal({
          icon: "error",
          title: `Please choose date and time`,
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 5000,
        });
      }
    },
  },
};
</script>

<style>
</style>
